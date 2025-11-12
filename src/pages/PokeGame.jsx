import { useState, useEffect } from "react";
import { fetchPokemon } from "../api/api";
import NewGameButton from "../components/NewGameButton";
import OptionButton from "../components/OptionButton";
import PokemonImage from "../components/PokemonImage";

const PokeGame = () => {
    const [currentPokemon, setCurrentPokemon] = useState({});
    const [options, setOptions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [loading, setLoading] = useState(true);

    const getRandomPokemonId = () => Math.floor(Math.random() * 151) + 1;

    const fetchNewPokemon = async (id) => {
        try {
            const res = await fetchPokemon(id);
            return res;
        } catch (error) {
            console.error("Error fetching pokemon:", error);
            throw error;
        }
    };

    const startNewGame = async () => {
        setLoading(true);
        setSelectedAnswer(null);
        setIsCorrect(null);

        try {
            const correctPokemonId = getRandomPokemonId();
            const correctPokemon = await fetchNewPokemon(correctPokemonId);
            setCurrentPokemon(correctPokemon);

            const wrongIds = new Set();
            while (wrongIds.size < 3) {
                const id = getRandomPokemonId();
                if (id !== correctPokemonId) {
                    wrongIds.add(id);
                }
            }

            const wrongPokemons = await Promise.all(
                Array.from(wrongIds).map((id) => fetchNewPokemon(id))
            );

            const allOptions = [
                correctPokemon?.name,
                ...wrongPokemons?.map((p) => p.name),
            ];

            const shuffled = allOptions.sort(() => Math.random() - 0.5);
            setOptions(shuffled);
        } catch (error) {
            console.error("Error loading pokemon:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        startNewGame();
    }, []);

    const handleAnswer = (answer) => {
        if (selectedAnswer) return;

        setSelectedAnswer(answer);
        setIsCorrect(answer === currentPokemon?.name);
    };

    const imageStyle = {
        height: '12rem',
        width: '12rem',
        objectFit: 'contain',
        filter: selectedAnswer ? 'none' : 'brightness(0) saturate(100%)',
        transition: 'filter 300ms ease, opacity 300ms ease'
    };

    if (loading || !currentPokemon) {
        return (
            <div style={{
                display: 'flex',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    fontSize: '1.25rem',
                    lineHeight: '1.75rem',
                }}>Cargando...</div>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            boxSizing: 'border-box',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '4rem',
            overflow: 'hidden'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '28rem',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '1.875rem',
                    lineHeight: '2.25rem',
                    fontWeight: '700',
                }}>
                    ¿Quién es este pokémon?
                </h1>

                <div style={{
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <PokemonImage currentPokemon={currentPokemon}
                        imageStyle={imageStyle} />
                </div>

                <div style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    {options.map((option) => (
                        <OptionButton selectedAnswer={selectedAnswer}
                            handleAnswer={handleAnswer}
                            option={option} />
                    ))}
                </div>

                {selectedAnswer && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <p style={{
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                            fontWeight: '600',
                        }}>
                            {isCorrect
                                ? `Correcto, ${currentPokemon.name}`
                                : `Oops, era ${currentPokemon.name}`}
                        </p>
                        <NewGameButton startNewGame={startNewGame} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokeGame;
