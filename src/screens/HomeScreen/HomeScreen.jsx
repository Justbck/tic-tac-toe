import React from 'react'
import './HomeScreen.styles.scss'

function HomeScreen({ clickMultiplayer, clickAIPlayer}) {
    return (
        <div className = 'homescreen__wrapper'>
            <div className = 'homescreen'>
            <h1 className = 'title'>Tic Tac Toe</h1>
            <button className = 'mode__button' onClick={clickMultiplayer}>Two Players</button>
            <button className = 'mode__button' onClick={clickAIPlayer}>One Player</button>
            </div>
        </div>
    )
}

export default HomeScreen;
