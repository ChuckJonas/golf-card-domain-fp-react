import React from 'react';
import { Hand, CardPosition } from '../domain/hand';
import { CardView } from './cardView';
import { Card } from '../domain/card';


interface HandView{
  hand: Hand;
  newCard: Card;
  toReplace: number;
  onSwap: (cardPosition: CardPosition) => any;
  onDragEnter: (e: React.DragEvent, card: Card) => any;
  onDragExit: () => any;
}

export const HandView = (props: HandView) => {
  const { hand, newCard, toReplace, onSwap, onDragEnter, onDragExit } = props;

  const handleOnDragEnter = (e: React.DragEvent, position: number) => {
    onDragEnter(e, hand[position]);
  }

  const handleOnDragLeave = () => {
    onDragExit();
  }

  const getCard = (i: number) => {
    return toReplace === i ? newCard : hand[i];
  }
  const renderCard = (i: CardPosition) => {
   return (
    <div onClick={() => onSwap(i)}>
      <CardView highlighted={toReplace === i} onDragEnter={(e)=>handleOnDragEnter(e, i)} onDragExit={handleOnDragLeave} card={getCard(i)} />
    </div>
   )
  }
  return (
    <div className="flex-grid">
      <div className="col">
        {renderCard(0)}
        {renderCard(1)}
      </div>
      <div className="col">
        {renderCard(2)}
        {renderCard(3)}
      </div>
    </div>
  )
}

