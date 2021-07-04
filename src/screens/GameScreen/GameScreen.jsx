import React,{useState,useEffect} from 'react'
import HomeScreen from '../HomeScreen/HomeScreen'
import Board from '../../components/Board/Board.component'
import {checkWinner,AImove} from '../../helper/game';
import './GameScreen.styles.scss'
import ExitButton from '../../components/Button/ExitButton.component';
import circle from '../../images/circle.png';
import cross from '../../images/cross.png';
import useSound from '../../helper/useSound';
import {GiSoundOn} from 'react-icons/gi'
import {GiSoundOff} from 'react-icons/gi'
import Audio from '../../components/audio/audio'
import win from '../../sounds/win.wav';


function GameScreen() {
    const [playing, toggle] = useSound(null);
    const [square, setSquare] = useState(Array(9).fill(null));
    const [mode, setMode] = useState(null)
    const [turn, setTurn] = useState(null)
    const [AI, setAI] = useState(null)
    const [xScore, setXScore] = useState(0)
    const [oScore, setOScore] = useState(0)
    const [winner, setWinner] = useState(null)
    const [showSquares, setShowSquares] = useState(true)


    useEffect(() => {
        if (mode && AI === turn) {
            handleClick(AImove(square, AI, AI === 'X' ? 'O' : 'X'))
        }
        const winner = checkWinner(square)
        setWinner(winner?winner[0]:winner)
        
    }, [square]);


    useEffect(() => {
        if(winner==='X')
        {
            setXScore(xScore=>xScore+1)
        }
        else
        if(winner==='O')
        {
            setOScore(oScore =>oScore+1)
        }
    }, [winner])

    const handleClick=(i)=>{
        const squares = square.slice()
        if (squares[i] || winner) {
            return;
        }
        squares[i] = turn === 'X' ? cross : circle
        setSquare(squares) 
        changeTurn()
    }

    let changeTurn=()=>{
        if(turn==='X')
            setTurn('O')
        else
        if(turn==='O')
            setTurn('X')
    }

    const clickMultiplayer = ()=>{
        setMode(false)
        setTurn('X')
        setAI('O')
    }

    const clickAIPlayer = () => {
        setMode(true)
        setTurn('X')
        setAI('O')
    }

    const playAgain=()=>{
        setSquare(Array(9).fill(null));
        setShowSquares(true)
    }

    const clikExit=()=>{
        setOScore(0);
        setXScore(0);
        setShowSquares(true);
        setWinner(null);
        setSquare(Array(9).fill(null));
        setTurn('X');
        setMode(null);
    }

    const renderSound = () => {
        if(winner) {
            return (
                <Audio sound = {win}/>
            )
        }
    }
    
    return (
        <div className = 'game__wrapper'>
        <div className = 'game__audio' onClick = {toggle}>
            {playing ? <GiSoundOn/> : <GiSoundOff/>}
        </div>
            {
                mode === null ? 
                    <HomeScreen 
                        clickMultiplayer = {clickMultiplayer} 
                        clickAIPlayer = {clickAIPlayer} 
                    />
                    :  <div className = 'game__board'>
                        {winner ? 
                            <div className = 'game__result'>
                            <h1> {winner === 'd' ?
                                <div className = 'image__wrapper image__wrapper__draw'>
                                    <img alt = 'O' src = {circle}/><img alt = 'X' src = {cross}/>
                                    <h3>DRAW!</h3>
                                </div>  : winner !== null &&  <div className = 'image__wrapper'><img src = {winner} alt= {winner}/><h3>WINNER!</h3></div>}</h1>
                         
                            </div>
                        : 
                        <Board 
                        clikExit={clikExit} 
                        playAgain={playAgain} 
                        showSquares={showSquares} 
                        mode={mode} 
                        winner={winner} 
                        turn={turn} 
                        AI={AI} 
                        squares={square} 
                        onClick={handleClick} 
                        xScore={xScore} 
                        oScore={oScore} 
                        />
                        
                        }
                        
                        <div className = 'board__buttons'>
                                <button className = 'board__button' onClick={playAgain}>Play Again</button>
                                <ExitButton clikExit={clikExit} className = {'board__button'}/>
                               
                            </div>
                        </div>
                                    
                                  
            }
        
        </div>
    )
}

export default GameScreen;
