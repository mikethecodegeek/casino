const express = require('express');
const asyncHandler = require('express-async-handler');

const { Profile } = require('../../db/models');
const Deck = require('../api/deck');

const router = express.Router();

const checkBlackJack = hand => {
    // console.log(hand)
    let total = 0;;
    let ace = false
    hand.forEach(card => {
        console.log(card.value.val)
        if (card.value.val == 1) ace = true;
        if (card.value.val <= 10) {
            total+= card.value.val;
        } else {
            total+=10;
        }
    })
    console.log(total)
    console.log(total ==  11 && ace == true)
    return (total == 11 && ace == true) ? true :false;

}

router.get(
    '/newhand',
    asyncHandler(async (req, res) => {
      
      const currentHand = new Deck;
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
      checkBlackJack(playerHand);
      return res.json({
        dealer:dealerHand[0],
        player: playerHand
      });
    }),
  );


module.exports = router;