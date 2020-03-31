import React from 'react';
import { Card, Suit } from '../domain/card';

const suits = {
  'Hearts': '&hearts;',
  'Diamonds': '&diams;',
  'Clubs': '&clubs;',
  'Spades': '&spades;'
} as const

interface CardProps {
  card: Card
  onDragStart?: (e: React.DragEvent, item: Card) => void;
  onDragEnter?: (e: React.DragEvent, card: Card) => void;
  onDragExit?: () => void;
  onDragEnd?: () => void;
  highlighted?: boolean;
}

export const CardView = (props: CardProps) => {
  const {card, highlighted, onDragStart, onDragEnter, onDragExit, onDragEnd} = props;
  const color = card.suit === Suit.SPADE || card.suit === Suit.CLUB ? 'black' : 'red';

  const classes = ['playing-card', 'card-face'];
  if(highlighted){
    classes.push('highlight');
  }
  const icon = <span style={{color}} dangerouslySetInnerHTML={{__html:suits[card.suit]}}></span>
  return (
    <div
      draggable={true}
      onDragStart={(e) => onDragStart?.(e, card)}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDragEnter?.(e, card)}
      }
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDragExit?.()
      }}
      onDragEnd={(e) => {
        e.preventDefault();
        onDragEnd?.()
      }}
      // onDrop={(e) => {
      //   e.preventDefault();
      //   console.log('dropped!')
      //   onDragEnd?.()
      // }}
      className={classes.join(' ')}
    >
        {icon}
        <p>{card.rank}</p>
        {icon}
    </div>
  )
}
