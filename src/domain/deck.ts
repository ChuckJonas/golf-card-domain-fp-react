import { Card, Suit, Rank } from "./card";

export type Deck = Card[];

export function newDeck(): Deck {
  let deck: Deck = [];
  for (let suite in Suit) {
      for (let rank in Rank) {
          deck.push({
            suit: Suit[suite as keyof typeof Suit],
            rank: Rank[rank as keyof typeof Rank]
          });
      }
  }
  return deck;
}

export function shuffleDeck(deck: Deck): Deck {
  return [...deck].sort(() => Math.random() - 0.5);
}

export function pickCard(deck: Deck): [Deck, Card] {
  const card = deck[0];
  return [deck.filter((_, i) => i !== 0), card];
}

export function placeCard(deck: Deck, card: Card): Deck {
  return [card].concat(deck);
}
