import { Card } from "./card";
import { replaceAt } from "./util";

export type Hand = Card[];

export type CardPosition = 0 | 1 | 2 | 3;

export function swapCard(hand: Hand, position: CardPosition, card: Card): [Hand, Card] {
  const discard = hand[position];
  const newHand = replaceAt(hand, position, card);
  return [newHand, discard];
}
