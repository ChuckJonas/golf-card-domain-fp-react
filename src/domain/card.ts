export enum Suit {
  CLUB = 'Clubs', DIAMOND = 'Diamonds', HEART = 'Hearts', SPADE = 'Spades'
}
export enum Rank {
  ACE = 'Ace',
  TWO = 'Two',
  THREE = 'Three',
  FOUR = 'Four',
  FIVE = 'Five',
  SIX = 'Six',
  SEVEN = 'Seven',
  EIGHT = 'Eight',
  NINE = 'Nine',
  TEN = 'Ten',
  JACK = 'Jack',
  QUEEN = 'Queen',
  KING = 'King'
}

export const cardValues = {
  'Ace': 1,
  'Two': 2,
  'Three': 3,
  'Four': 4,
  'Five': 5,
  'Six': 6,
  'Seven': 7,
  'Eight': 8,
  'Nine': 9,
  'Ten': 10,
  'Jack': 10,
  'Queen': 10,
  'King': 0,
} as const

export type Card = {
  suit: Suit;
  rank: Rank;
}
