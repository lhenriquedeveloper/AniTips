import { useState, createContext } from "react";

export const AnimeContext = createContext({});

function AnimeProvider({ children }) {
    const [animes, setAnimes] = useState([]);
    return (
        <AnimeContext.Provider value={{ animes, setAnimes }}>
            {children}
        </AnimeContext.Provider>
    )
}
export default AnimeProvider;
