import React, { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import {isLoggedIn} from "../../utils/tokenTools";
import {Link, useNavigate} from "react-router-dom";
import { FaSync } from 'react-icons/fa';

const ROWS = 6;
const COLUMNS = 7;

const Game = ({ username }) => {
  const initialBoard = Array(ROWS)
    .fill(null)
    .map(() => Array(COLUMNS).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const hasLogined = isLoggedIn()
  const navigate = useNavigate()
  const checkHorizontal = (board, rowIndex, player) => {
    let count = 0;
    for (let i = 0; i < COLUMNS; i++) {
      if (board[rowIndex][i] === player) {
        count++;
      } else {
        count = 0;
      }
      if (count === 4) {
        return true;
      }
    }
    return false;
  };

  const checkVertical = (board, columnIndex, player) => {
    let count = 0;
    for (let i = 0; i < ROWS; i++) {
      if (board[i][columnIndex] === player) {
        count++;
      } else {
        count = 0;
      }

      if (count === 4) {
        return true;
      }
    }
    return false;
  };

  const checkDiagonal = (board, player) => {
    // Check top-left to bottom-right diagonals
    for (let i = 0; i < ROWS - 3; i++) {
      for (let j = 0; j < COLUMNS - 3; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j + 1] === player &&
          board[i + 2][j + 2] === player &&
          board[i + 3][j + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check top-right to bottom-left diagonals
    for (let i = 0; i < ROWS - 3; i++) {
      for (let j = 3; j < COLUMNS; j++) {
        if (
          board[i][j] === player &&
          board[i + 1][j - 1] === player &&
          board[i + 2][j - 2] === player &&
          board[i + 3][j - 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setPlayer('red');
    setWinner(null);
  };

  const handleDrop = (columnIndex) => {
    if (winner !== null || !hasLogined ) { // check if game is disabled
      return;
    }

    const newBoard = board.map((row) => [...row]);

    // Find the first available row in the clicked column
    let rowIndex;
    for (let i = ROWS - 1; i >= 0; i--) {
      if (newBoard[i][columnIndex] === null) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex !== undefined) {
      newBoard[rowIndex][columnIndex] = player;
      setBoard(newBoard);

      const horizontalWinner = checkHorizontal(newBoard, rowIndex, player);
      const verticalWinner = checkVertical(newBoard, columnIndex, player);
      const diagonalWinner = checkDiagonal(newBoard, player);

      if (horizontalWinner || verticalWinner || diagonalWinner) {
        setWinner(player);
      } else {
        setPlayer(player === 'red' ? 'yellow' : 'red');
      }
    }
  };

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className={styles.content}>
      { !!hasLogined ?
        <>
          {winner === null && <h3 className={styles.heading}>Great! {username} has joined the game!</h3>}
        </> : <>
          <h3 className={ styles.heading }>Hey! Dare to play the Game of Four?</h3>
          <button className={styles.popup} onClick={ handleRegister }>
            <Link to='/login' className={styles.navLink}>
              Yes! I want to join the game!
            </Link>
          </button>
        </> }
      <div className={ cn(styles.game, {[styles.disabled]: !hasLogined })}>
        <div className={cn(styles.intro, styles[`${player}`])}>
          {winner === null ?
            (<>
              <span className={styles.text}>Your next move is:  </span>
              <span className={cn(styles.circle, styles.bouncing ,styles[`${player}`])}/>
            </>) :
            (<>{winner === 'tie' ?
                <span className={ styles.text }>Break even!!!</span> :
                <>
                  <span>TEAM </span>
                  <span className={cn(styles.circle, styles[`${player}`])}/>
                  <span>WINS!</span>
                    <button className={cn(styles.resetBtn, {[styles.show]: winner !== null})} onClick={handleReset}>
                      <FaSync />
                    </button>
                </>}
              </>)}
        </div>
        <div className={styles.board}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className={ styles.row }>
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  className={cn(styles.cell, styles[`${cell}`])}
                  onClick={() => handleDrop(columnIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Game