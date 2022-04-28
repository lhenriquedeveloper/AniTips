import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Services/api";
import firebase from "../../Services/firebaseconnection";
import "../../Styles/css/animeDetailStyle.css";


export default function Detail() {
    //Contexts, States and Hooks
    const { id } = useParams();
    const [uniqueAnime, setUniqueAnime] = useState([]);
    const [loading, setLoading] = useState(true);


    //Load Anime Function
    useEffect(() => {
        async function loadAnime() {
            const response = await api.get(`v1/anime/${id}`);

            if (response.data.data.lenght === 0) {
                <Navigate to="*" replace />
                return;
            }
            else {
                setUniqueAnime(response.data.data);
                setLoading(false);
            }
        }
        loadAnime();
    }, []);


    //Rendering anime verification
    if (loading) {
        return (
            <div className="anime-loading">
                <h1>Loading your anime...</h1>
            </div>
        );
    }

    // Have Trailer? and Responsive Function
    const VerifyAnime = () => {
        if (!uniqueAnime.trailer_url || screen.width < 800) {
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


    //  Save Anime Function
    async function saveAnime() {
        const user = firebase.auth().currentUser;

        await firebase.firestore()
            .collection("favorites")
            .doc(user.uid)
            .collection("animes")
            .doc(uniqueAnime.id.toString())
            .set({
                animeName: uniqueAnime.titles.rj,
                idAnime: uniqueAnime.id
            })
            .then(() => {
                toast.success('Anime successfully saved', {
                    theme: "dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            })
    }


    return (
        <div>
            <div className="anime-info">
                <h1>{uniqueAnime.titles.rj}</h1>
                <VerifyAnime />
                <h3>Synopsis:</h3>
                <p>{uniqueAnime.descriptions.en.toString().replace(/<br>/g, "")}</p>
                <span>Year: {uniqueAnime.season_year}</span>
                <span>Number of Episodes: {uniqueAnime.episodes_count}</span>
                <span>Genres: {uniqueAnime.genres.toString().replace(/,/g, ", ")}</span>
                <span>Score: {uniqueAnime.score}/100</span>
                <div className="botoes">
                    <button onClick={saveAnime}> Save Anime </button>
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