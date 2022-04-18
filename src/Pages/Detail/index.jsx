import { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import api from "../../Services/api";


export default function Detail() {
    const { id } = useParams();


    const [uniqueAnime, setUniqueAnime] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadAnime() {
            const response = await api.get(`v1/anime/${id}`);

            if (response.data.data.lenght === 0) {
                <Navigate to="/home" replace />
                return;
            }
            else {
                setUniqueAnime(response.data.data);
                setLoading(false);
            }
        }
        loadAnime();
    }, []);

    useEffect(() => {
        console.log(uniqueAnime)
    }, [uniqueAnime])

    if (loading) {
        return (
            <div className="filme-loading">
                <h1>Carregando seu filme...</h1>
            </div>
        );
    }

    return (
        <div>
            <div className="anime-info">

                <h1>{uniqueAnime.titles.rj}</h1>
                <img src={uniqueAnime.cover_image} alt={uniqueAnime.titles.rj} />
                <h3>Synopsis:</h3>
                <p>{uniqueAnime.descriptions.rj}</p>
                <p>Year: {uniqueAnime.season_year}</p>
                <p>Number of Episodes: {uniqueAnime.episodes_count}</p>
                <p>Genres: {uniqueAnime.genres}</p>
                <p>Score: {uniqueAnime.score}</p>

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