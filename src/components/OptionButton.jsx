import React from 'react'

const OptionButton = ({handleAnswer, selectedAnswer, option}) => {
    return (
        <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            style={{
                width: '100%',
                backgroundColor: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                opacity: selectedAnswer !== null ? 1 : undefined,
                borderRadius: '0.5rem',
                border: '1px solid hsl(var(--border))',
                padding: '0.6em 1.2em',
                fontSize: '1em',
                fontWeight: '500',
                cursor: selectedAnswer !== null ? 'default' : 'pointer',
                transition: 'background-color 0.2s, color 0.2s'
            }}
            onMouseEnter={(e) => {
                if (selectedAnswer === null) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
                    e.currentTarget.style.color = 'hsl(var(--accent-foreground))';
                }
            }}
            onMouseLeave={(e) => {
                if (selectedAnswer === null) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--card))';
                    e.currentTarget.style.color = 'hsl(var(--card-foreground))';
                }
            }}
        >
            {option}
        </button>
    )
}

export default OptionButton