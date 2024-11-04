import React, { useEffect, useState } from 'react';
import styles from './pokemonList.module.css';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
                const data = await response.json();

                const detailedPokemon = await Promise.all(
                    data.results.map(async (poke) => {
                        const res = await fetch(poke.url);
                        return res.json();
                    })
                );

                setPokemon(detailedPokemon);
            } catch (e) {
                console.log("Error POKE!", e);
            }
        };

        fetchPokemon();
    }, []);

    return (
        <div className={styles.body}>
            {pokemon.map((poke) => (
                <div className={styles.container} key={poke.id}>
                    <img
                        src={poke.sprites.front_default}
                        alt={poke.name}
                        className={styles.image}
                    />
                    <h1 className={styles.name}>{poke.name}</h1>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;
