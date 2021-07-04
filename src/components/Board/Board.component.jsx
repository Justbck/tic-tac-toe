import React from 'react'
import './Board.styles.scss'
import {motion} from 'framer-motion'

function Board({ squares, onClick, winner, mode, turn, showSquares}) {
    
    const renderSquare=(i)=>{        
        return <button 
                    className = {`square square__${i}`} 
                    key = {i} 
                    onClick={() => { onClick(i) }}
                >{!squares[i] ? ' ' : 
                <motion.div
                    initial={{ scale: 0.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.1 }}
                >
                <img src = {squares[i]}/>
                </motion.div>
                
            
            }</button>
    }
    
    return (
        <div>
        <div className = "board__turn">
        {mode === false  ? 
        <div> {turn === 'X' &&  !winner ? 'X Turn' : 'O Turn'}</div>
        : <div>AI Mode</div>
        }
       </div>

            {showSquares &&
                <div className = 'board__wrapper'>
                <div className = 'board'>
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}

                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}

                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                        </div>
                </div>
            }
        </div>
    )
}

export default Board;
