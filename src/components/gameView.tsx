import React, { useState } from 'react';
import { Game } from '../domain/golf';
import { RoundView } from './roundView';
import { Round, nextCard, knock, playDiscard, passTurn } from '../domain/round';

interface GameProps {
  game: Game;
  onRoundUpdate: (action: (round: Round) => Round) => void;
  onNextRound: () => void
}

export const GameView = (props: GameProps) => {
  const {game, onRoundUpdate, onNextRound} = props;
  const round = game.rounds[game.rounds.length-1];
  return (
    <div>
      <h2>Round: {game.rounds.length}</h2>
      <p>Dealer: {game.dealer}</p>
      <RoundView
        round={round}
        onDraw={()=>onRoundUpdate(nextCard)}
        onKnock={()=>onRoundUpdate(knock)}
        onSwap={(cardPosition)=>onRoundUpdate(()=>playDiscard(round, cardPosition))}
        onSkip={()=>onRoundUpdate(passTurn)}
        onNextRound={onNextRound}
      />
    </div>
  )
}
