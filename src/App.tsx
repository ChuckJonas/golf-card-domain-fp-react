import React, { useState } from 'react';
import './App.css';
import { newGame, Game, newRound, makePlay, getCurrentRound } from './domain/golf';
import { GameView } from './components/gameView';
import { Round, getCurrentPlayer, passTurn, playDiscard, knock, nextCard } from './domain/round';
import { CardPosition } from './domain/hand';
import { RoundView } from './components/roundView';

function App() {
  let [game, setGame] = useState<Game>();
  let [logs, setLogs] = useState<string[]>([]);
  let content;

  const appendLog = (newLog: string[]) => setLogs(newLog)


  const playAI = (game: Game) => {
    const logs = []
    while (!getCurrentRound(game).done && getCurrentPlayer(getCurrentRound(game)) !== 0) {
      logs.push(`== Player ${getCurrentPlayer(getCurrentRound(game)) + 1} ==`)
      console.log(getCurrentRound(game));

      const AI = Math.floor(Math.random() * 10);
      let computerAction: (round: Round) => Round = passTurn;
      if (getCurrentRound(game).turn > 6 && AI === 9) {
        logs.push(`- Knocks!`);
        computerAction = knock;
      } else {
        const drawChoice = Math.floor(Math.random() * 3);
        if (drawChoice > 1) {
          logs.push(`- Draws new card`);
          game = makePlay(game, nextCard);
        }
        if (AI <= 3) {
          logs.push(`- Swaps Card`);
          computerAction = (round: Round) => playDiscard(round, AI as CardPosition);
        } else {
          logs.push(`- Passes Turn`);
        }
      }

      game = makePlay(game, computerAction);
    }
    if (logs.length) {
      appendLog(logs);
    }
    return game;
  }

  if (!game) {
    content = (
      <div style={{ height: 400, paddingTop: 60 }}>
        <button className='btn' onClick={() => setGame(playAI(newRound(newGame(4, 3))))}>
          <span>New Game</span>
        </button>
      </div>
    )
  } else {
    const handleRoundUpdate = (action: (round: Round) => Round) => {
      setGame(playAI(makePlay(game as Game, action)));
    }
    content = (
      <div>
      <GameView
        game={game}
        onRoundUpdate={handleRoundUpdate}
        onNextRound={() => setGame(playAI(newRound(game as Game)))}
      />
      <div >
      <h2>Game Log</h2>
      <textarea style={{width: 300}} rows={3} value={logs.join('\n')} />
      </div>
      </div>
    )
  }
  return (
    <div className="App">
      <div className="App-body">
        <div>{content}</div>
      </div>
    </div>
  );
}

export default App;
