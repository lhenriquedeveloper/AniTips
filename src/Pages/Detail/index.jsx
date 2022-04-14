import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import api from "../../Services/api";


export default function Detail() {
    const { id } = useParams();


    const [uniqueAnime, setUniqueAnime] = useState([]);

    // useEffect(() => {
    //     async function loadAnime() {
    //         const response = await api.get(`v1/anime/${id}`);
    //         setUniqueAnime(response.data);
    //     }
    //     loadAnime();
    //     console.log(uniqueAnime);
    // }, [])

    return (
        <div>
            <div className="anime-info">
                {/* <h1>{uniqueAnime.titles.en}</h1> */}
                {/* <img src={uniqueAnime.banner_image} alt={uniqueAnime.titles.en} />
                <h3>Synopsis:</h3>
                <p>{uniqueAnime.descriptions.en}</p>
                <p>Year: {uniqueAnime.season_year}</p>
                <p>Number of Episodes: {uniqueAnime.episodes_count}</p>
                <p>Genres: {uniqueAnime.genres}</p>
                <p>Score: {uniqueAnime.score}</p> */}

                <div className="botoes">
                    <button onClick={() => { }}> Save Anime </button>
                    <button>
                        <a
                            target="blank"
                        // href={`https://www.youtube.com/results?search_query= ${uniqueAnime.titles.en} Trailer`}
                        >
                            Trailer
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}