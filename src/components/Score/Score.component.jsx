import React from 'react'
import '../../screens/GameScreen/GameScreen.styles.scss'
import {motion} from 'framer-motion'
import circle from '../../images/circle.png'
import cross from '../../images/cross.png'

function Score ({ winner, showScore}) {
    
    const renderScore=()=>{        
        return( 
                            <div className = 'game__result'>
                            <h1> {winner === 'd' ?
                                <div className = 'image__wrapper image__wrapper__draw'>
                                    <img alt = 'O' src = {circle}/><img alt = 'X' src = {cross}/>
                                    <h3>DRAW!</h3>
                                </div>  : winner !== null &&  <div className = 'image__wrapper'><img src = {winner} alt= {winner}/><h3>WINNER!</h3></div>}</h1>
                         
                            </div>
        )
                            
        
    }
    
    return (
        <div>
            {showScore &&
                <div className = 'board__wrapper'>
                <div className = 'board'>
                        {renderScore()}
                        </div>
                </div>
            }
        </div>
    )
}

export default Score;
