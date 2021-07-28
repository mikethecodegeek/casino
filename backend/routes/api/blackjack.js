const express = require('express');
const asyncHandler = require('express-async-handler');

const { Profile } = require('../../db/models');
const Deck = require('../api/deck');

const router = express.Router();

const checkBlackJack = hand => {
    console.log(hand)
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
      checkBlackJack(currentHand.dealersHand);
      return res.json({
        dealer:dealerHand[0],
        player: playerHand
      });
    }),
  );


module.exports = router;