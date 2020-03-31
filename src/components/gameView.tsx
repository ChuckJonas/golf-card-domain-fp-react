import React, { useState } from 'react';
import { Game, scoreGame } from '../domain/golf';
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

  let scoreBoard: any;
  if(round.done && game.rounds.length > 1){

    scoreBoard =  (
      <div>
        <h2>Game Score</h2>

        {scoreGame(game).sort().map((s, i) => <p>Player {i + 1}: {s}</p>)}
        <button onClick={onNextRound}>Next Round</button>
      </div>
    )
  }
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
      {scoreBoard}
    </div>
  )
}
