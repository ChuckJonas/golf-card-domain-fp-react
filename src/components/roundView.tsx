import React, { useState, useRef } from 'react';
import { Round, getCurrentPlayer } from '../domain/round';
import { CardView } from './cardView';
import { HandView } from './handView';
import { CardPosition } from '../domain/hand';
import { Card } from '../domain/card';

interface RoundViewProps {
  round: Round;
  onDraw: () => any;
  onKnock: () => any;
  onSwap: (cardPosition: CardPosition) => any;
  onSkip: () => any;
  onNextRound: () => any;
}

export const RoundView = (props: RoundViewProps) => {
  const newRef = useRef<Card>();
  const [draggedOverCard, setDraggedOverCard] = useState<Card>();

  const {round, onDraw, onKnock, onSwap, onSkip, onNextRound} = props;
  const hand = round.hands[getCurrentPlayer(round)];
  const swapIndex = hand.findIndex(c => c===draggedOverCard) as CardPosition;

  const handleDragStart = (e: any, item: Card) => {
    console.log('Started Dragging ' + item.rank + ' of ' + item.suit);
    newRef.current = item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }

  const handleDragEnter = (e: React.DragEvent, draggedOverItem: Card) => {
    e.preventDefault();
    setDraggedOverCard(draggedOverItem);
    // draggedItem = draggedOverItem;

    // const index = this.state.vars.findIndex((v) => v === draggedOverItem);
    // const card = this.state.vars.filter((v) => v !== this.draggedItem);
    // const newDraggedItem = { ...this.draggedItem };
    // this.draggedItem = newDraggedItem;
    // if (this.draggedItem.group !== draggedOverItem.group) {
    //   newDraggedItem.group = draggedOverItem.group;
    //   newDraggedItem.hasChanges = true;
    // }
    // vars.splice(index, 0, newDraggedItem);
    // this.setState({ vars });
  }

  const handleDragExit = () => {
    console.log('drag leave');
    setDraggedOverCard(undefined);
    // console.log('ENDED DRAGGING!');
    // console.log(currentDraggedOverItem)
    // currentDraggedOverItem = undefined;
  }

  const handleDragEnd = () => {
    if(draggedOverCard){
      let swapIndex = hand.findIndex(c => c===draggedOverCard) as CardPosition;
      console.log('Swapping card', swapIndex);
      setDraggedOverCard(undefined);
      onSwap(swapIndex);

    }else{
      console.log('DONT SWAP');
    }

  }

  if(round.done){
    return (
      <div>
        <h2>Round Score</h2>
        {round.scores?.sort().map((s, i) => <p>Player {i + 1}: {s}</p>)}
        <button onClick={onNextRound}>Next Round</button>
      </div>
    )
  }

  const discard = draggedOverCard ? draggedOverCard : round.discard[0]
  return (
    <div>
      <div style={{display:'flex'}}>
        <div>
          <CardView onDragStart={handleDragStart} onDragEnd={handleDragEnd} card={discard} />
        </div>
        <div className="playing-card card-back" onClick={onDraw}>
          {round.canDraw && 'DRAW'}
        </div>
      </div>
      <h2>Player {getCurrentPlayer(round) + 1}</h2>
      <div style={{display: 'flex'}}>
        {round.knock === undefined && <button className='btn' onClick={onKnock}><span>Knock</span></button>}
        <button className='btn orange' onClick={onSkip}><span>Skip</span></button>
        {round.knock !== undefined && <div>Last Turn!</div>}
      </div>
      <HandView
        hand={hand}
        newCard={round.discard[0]}
        toReplace={swapIndex}
        onDragEnter={handleDragEnter}
        onDragExit={handleDragExit}
        onSwap={onSwap}
      />

    </div>
  )
}


  // // Drag & Drop

  // public handleDragEnd = () => {
  //   this.draggedItem = null;
  // }

  // public handleDragOverNoGroup = (group: string) => {
  //   const index = this.state.vars.findIndex((v) => v === this.draggedItem);
  //   const newDraggedItem = { ...this.draggedItem };
  //   this.draggedItem = newDraggedItem;
  //   if (this.draggedItem.group !== group) {
  //     newDraggedItem.group = group;
  //     newDraggedItem.hasChanges = true;
  //   }
  //   const vars = [...this.state.vars];
  //   vars[index] = newDraggedItem;
  //   const groups = [...this.state.groups];
  //   this.setState({ vars, groups });
  // }
