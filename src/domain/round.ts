import { Deck, pickCard, placeCard } from "./deck";
import { Hand, CardPosition, swapCard } from "./hand";
import { cardValues } from "./card";
import { Player, Scores } from "./golf";
import { replaceAt } from "./util";

export type Discard = Deck;

export type Round = {
  deck: Deck;
  discard: Discard;
  hands: Hand[];
  turn: Player;
  knock?: Player
  canDraw: boolean;
  done: boolean;
  scores?: Scores;
}

export function dealCard(deck: Deck, hand: Hand): [Deck, Hand] {
  const [newDeck, card] = pickCard(deck);
  return [newDeck, [...hand, card]];
}

export function getCurrentPlayer(round: Round): Player {
  const { hands, turn } = round;
  return turn % hands.length;
}

export function getNextPlayer(round: Round): Player {
  const { hands, turn } = round;
  return (turn + 1) % hands.length;
}

export function nextCard(round: Round): Round {
  if (!round.canDraw) {
    return round;
  }
  const { deck, discard } = round;
  const [newDeck, card] = pickCard(deck);

  const newDiscard = placeCard(discard, card)
  return {
    ...round,
    deck: newDeck,
    discard: newDiscard,
    canDraw: false
  };
}

export function isRoundOver(round: Round): boolean {
  if (round.knock !== undefined && getNextPlayer(round) === round.knock) {
    return true;
  }
  return false;
}

export function passTurn(round: Round): Round {
  console.log('Turn passed without taking card');
  if (isRoundOver(round)) {
    return scoreRound({
      ...round,
      done: true
    });
  }

  return {
    ...round,
    turn: round.turn + 1,
    canDraw: true
  }
}

export function playDiscard(round: Round, swapPosition: CardPosition): Round {
  const { discard, hands } = round;
  const playerTurn = getCurrentPlayer(round);
  const currentHand = hands[playerTurn];
  const [newDiscard, card] = pickCard(discard);
  const [newHand, swappedCard] = swapCard(currentHand, swapPosition, card);

  return passTurn({
    ...round,
    discard: placeCard(newDiscard, swappedCard),
    hands: replaceAt(hands, playerTurn, newHand),
  });
}

export function knock(round: Round): Round {
  return passTurn({
    ...round,
    knock: getCurrentPlayer(round),
    canDraw: true
  })
}

export function scoreRound(round: Round) {
  const scores = [];
  for (let hand of round.hands) {

    let score = 0;
    for (let i = 0; i < hand.length; i++) {
      const rank = hand[i].rank;
      const cardValue = cardValues[rank];

      //0 1
      //2 3
      switch (i) {
        case 0:
        case 3:
          score += hand[1].rank === rank || hand[2].rank === rank ? 0 : cardValue;
          break;
        case 1:
        case 2:
          score += hand[0].rank === rank || hand[3].rank === rank ? 0 : cardValue;
          break;
      }
    }
    scores.push(score);
  }
  return {
    ...round,
    scores
  }
}
