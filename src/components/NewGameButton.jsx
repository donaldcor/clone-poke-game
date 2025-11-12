import React from 'react'

const NewGameButton = ({startNewGame}) => {
    return (
        <button
            onClick={startNewGame}
            style={{
                backgroundColor: 'hsl(var(--muted))',
                color: 'hsl(var(--muted-foreground))',
                borderRadius: '0.5rem',
                border: '1px solid hsl(var(--border))',
                padding: '0.6em 1.2em',
                fontSize: '1em',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
                e.currentTarget.style.color = 'hsl(var(--accent-foreground))';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
            }}
        >
            Nuevo Juego
        </button>
    )
}

export default NewGameButton