import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import api from "../../Services/api";
import "../../Styles/css/animeDetailStyle.css";


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
            <div className="anime-loading">
                <h1>Loading your anime...</h1>
            </div>
        );
    }

    const VerifyAnime = () => {
        if (!uniqueAnime.trailer_url) {
            return (
                <div className="i-box">
                    <img src={uniqueAnime.cover_image} alt={uniqueAnime.titles.rj} />
                </div>
            )
        }
        else {
            return (
                <div className="i-box">
                    <img src={uniqueAnime.cover_image} alt={uniqueAnime.titles.rj} />
                    <iframe src={uniqueAnime.trailer_url} frameBorder="0"></iframe>
                </div>
            )
        }
    }

    return (
        <div>

            <div className="anime-info">
                <h1>{uniqueAnime.titles.rj}</h1>
                <VerifyAnime />
                <h3>Synopsis:</h3>
                <p>{uniqueAnime.descriptions.en}</p>
                <p><span>Year:</span> {uniqueAnime.season_year}</p>
                <p><span>Number of Episodes:</span> {uniqueAnime.episodes_count}</p>
                <p><span>Genres:</span> {uniqueAnime.genres.toString()}</p>
                <p><span>Score:</span> {uniqueAnime.score}</p>
                <div className="botoes">
                    <button onClick={() => { }}> Save Anime </button>
                    <button>
                        <a
                            target="blank"
                            href={`https://www.youtube.com/results?search_query= ${uniqueAnime.titles.rj} Trailer`}
                        >
                            Search Trailer on Youtube
                        </a>
                    </button>
                </div>
            </div>

        </div>
    )
}