const express = require('express');
const asyncHandler = require('express-async-handler');

const { Profile } = require('../../db/models');
const Deck = require('../api/deck');

const router = express.Router();

const checkBlackJack = hand => {
    let total = 0;;
    let ace = false
    hand.forEach(card => {
        if (card.value.val == 1) ace = true;
        if (card.value.val <= 10) {
            total+= card.value.val;
        } else {
            total+=10;
        }
    })
    return (total == 11 && ace == true) ? true :false;
}

const calculateHand = hand => {
    let total = 0;
    let ace = false;
    hand.forEach(card => {
        if (card.value.val == 1) ace = true;
        if (card.value.val <= 10) {
            if (card.value.val == 1 && total+11 <=21) {
                total+=11;
            } else {
                total+= card.value.val;
            }
        } else {
            total+=10;
        }
    })
    return total;
}


router.get(
    '/newhand',
    asyncHandler(async (req, res) => { 
      let currentHand = new Deck;
      currentHand.createDeck();
      currentHand.shuffleDeck()
      let cards = currentHand.getNumCards(4); 
      let dealerHand = [];
      let playerHand = []; 
      for (let a=0; a<2; a++) {
          let d = cards.shift();
          dealerHand.push(d);
          let p = cards.shift();
          playerHand.push(p);
          currentHand.dealToPlayer(d)
          currentHand.dealToDealer(p)
      }  
      const pBlackJack = checkBlackJack(playerHand);

      const dealerValue = dealerHand[0].value.val < 11 ? dealerHand[0].value.val : 10;
      const playerValue = calculateHand(playerHand);

      if (dealerHand[0].value.val == 1) {
          return res.json({
            dealer:dealerHand[0],
            player: playerHand,
            blackJack: pBlackJack,
            insurance: "Would you like insurance?",
            dealerVal: dealerValue,
            playerValue: playerValue,
            deckData: currentHand
          });
      } else {
          return res.json({
            dealer:dealerHand[0],
            player: playerHand,
            blackJack: pBlackJack,
            dealerVal: dealerValue,
            playerValue: playerValue,
            deckData: currentHand
          });
      }

    }),
  );

  router.post(
    '/hitme',
    asyncHandler(async (req, res) => {
       
        const {deckData,discardPile,dealersHand,hand} = req.body;
        const deck = new Deck(deckData,discardPile,dealersHand,hand)
        let dealerHand = dealersHand.map(v => v.value.val);
        // let playerHand = hand.map(v => v.value.val);
        deck.dealToPlayer();
       
        let playerValue = calculateHand(deck.getPlayersHand())
        let dealerValue = dealerHand[0] > 10 ? 10 : dealerHand[0];

        return res.json({
            dealer:dealerHand[0],
            player: deck.getPlayersHand(),
            dealerVal: dealerValue,
            playerValue: playerValue,
            deckData: deck.getCurrentDeck()
        });
       

    }),
  );






module.exports = router;