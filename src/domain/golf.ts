import { Deck, newDeck, pickCard, shuffleDeck } from "./deck";
import { Hand } from "./hand";
import { dealCard, Round } from "./round";
import { replaceAt } from "./util";

export type Player = number;
export type Scores = number[];

export type Participants = number;


export type Game = {
  players: Participants;
  totalRounds: number;
  dealer: Player;
  rounds: Round[];
  deck: Deck;
}

export function newGame(players: Participants, totalRounds: number): Game {
  return { deck: newDeck(), players, dealer: 0, rounds: [], totalRounds }
}

export function newRound(game: Game): Game {
  let { deck, players, dealer } = game;
  deck = shuffleDeck(deck);

  let hands: Hand[] = [];
  for (let j = 0; j < players; j++) {
    hands.push([]);
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < players; j++) {
      let [newDeck, newHand] = dealCard(deck, hands[j]);
      deck = newDeck;
      hands[j] = newHand;
    }
  }
  const [newDeck, discard] = pickCard(deck)

  return {
    ...game,
    dealer: game.dealer + 1 % game.players,
    rounds: [
      ...game.rounds,
      {
        deck: newDeck,
        hands,
        discard: [discard],
        turn: dealer + 1,
        canDraw: true,
        done: false
      }
    ]
  }
}

export function getCurrentRound(game: Game): Round {
  return game.rounds[game.rounds.length - 1];
}

export function makePlay(game: Game, play: (round: Round) => Round){
  const currentRoundIndex = game.rounds.length -1;
  const round = play(game.rounds[currentRoundIndex]);
  return {...game, rounds: replaceAt(game.rounds, currentRoundIndex, round ) }
}

export function scoreGame(game: Game): Scores {
  return game.rounds.reduce<Scores>((scores, round) => {
    if (round.scores) {
      round.scores.forEach((s, i) => {
        scores[i] = scores[i] ? s + scores[i] : s;
      })
    }
    return scores;
  }, [])
}


export function printScores(scores: Scores) {
  return scores.sort().map((s, i) => `Player ${i + 1}: ${s}`).join('\n')
}
