import React from 'react'

function ExitButton({clikExit, className}) {
    return (
        <div className="Exit">
            <button onClick = {clikExit} className = {className}>Change mode</button>
        </div>
    )
}

export default ExitButton;
