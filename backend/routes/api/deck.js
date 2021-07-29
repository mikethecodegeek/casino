class Deck {
    constructor(deck=[],pile=[],dealer=[],player=[]) {
        this.deck = deck;
        this.discardPile = pile;
        this.dealersHand = dealer;
        this.hand = player;
    }
    
    createDeck = () => {
        this.deck = [];
        const suits = { 
            Hearts: {
                suit: "Hearts",
                pic: "TBD"
            },
            Spades: {
                suit: "Spades",
                pic: "TBD"
            },
            Diamonds: {
                suit: "Diamonds",
                pic: "TBD"
            },
            Clubs: {
                suit: "Clubs",
                pic: "TBD"
            },
        }

        const vals = {
            A: {
                val: 1,
                pic: "TBD"
            },
            2: {
                val: 2,
                pic: "TBD"
            },
            2: {
                val: 2,
                pic: "TBD"
            },
            3: {
                val: 3,
                pic: "TBD"
            },
            4: {
                val: 4,
                pic: "TBD"
            },
            5: {
                val: 5,
                pic: "TBD"
            },
            6: {
                val: 6,
                pic: "TBD"
            },
            7: {
                val: 7,
                pic: "TBD"
            },
            8: {
                val: 8,
                pic: "TBD"
            },
            9: {
                val: 9,
                pic: "TBD"
            },
            10: {
                val: 10,
                pic: "TBD"
            },
            J: {
                val: 11,
                pic: "TBD"
            },
            Q: {
                val: 12,
                pic: "TBD"
            },
            K: {
                val: 13,
                pic: "TBD"
            },
        }

        for (let v in vals) {
            for (let s in suits) {
                this.deck.push(
                    {
                      suit: suits[s],
                      value: vals[v] 
                    }
                )
            }
        }
    }

    getDeck = () => {
        if (this.deck.length) {
            return this.deck;
        } else {
            this.createDeck();
            return this.deck;
        }
    }

    shuffleDeck = () => {
        if (!this.deck.length) {
            this.createDeck();
        }
        for (var i = this.deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }

        return this.deck;
    }

    dealTopCard = () => {
        let card = this.deck.shift()
        return card;
    }

    discardIntoPile = card => {
        this.discardPile.push(card)
    }

    returnDiscardPile = () => {
       while (this.discardPile.length) {
           this.deck.push(this.discardPile.shift())
       }
       return this.deck;
    }

    getNumCards = cardAmt => {
        const chosenCards = [];
        for (let a =0; a< cardAmt; a++) {
            chosenCards.push(this.dealTopCard())
        }
        return chosenCards;
    }

    resetDeck = () => {
        this.returnDiscardPile();
        this.shuffleDeck();
        return this.deck;
    }

    dealToPlayer = () => {
        
        this.hand.push(this.dealTopCard())
    }

    dealToDealer = () => {
        this.dealersHand.push(this.dealTopCard())
    }

    getPlayersHand = () => {
        return this.hand;
    }

    getDealersHand = () => {
        return this.dealersHand;
    }

    getCurrentDeck = () => {
        return this.deck;
    }


}

module.exports = Deck;