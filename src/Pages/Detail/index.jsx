import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Services/api";
import firebase from "../../Services/firebaseconnection";
import "../../Styles/scss/animeDetailStyle.scss";


export default function Detail() {
    //Contexts, States and Hooks
    const { id } = useParams();
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generos, setGeneros] = useState([]);


    //Load Anime Function
    useEffect(() => {
        async function loadAnime() {
            const response = await api.get(`/anime/${id}`);

            if (response.data.data.lenght === 0) {
                <Navigate to="*" replace />
                return;
            }
            else {
                setAnime(response.data.data);
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
        if (!anime.trailer.embed_url || window.innerWidth < 800) {
            return (
                <div className="i-box">
                    <img src={anime.images.jpg.image_url} alt={anime.title} />
                </div>
            )
        }
        else {
            return (
                <div className="i-box">
                    <img src={anime.images.jpg.image_url} alt={anime.title} />
                    <iframe src={anime.trailer.embed_url} frameBorder="0"></iframe>
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
            .doc(uniqueAnime.mal_id.toString())
            .set({
                animeName: anime.title,
                idAnime: anime.mal_id
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




    // const generosAni = anime.genres.map(obj => obj.name);
    // setGeneros(generosAni);
    // console.log(generos);




    return (
        <div>
            <div className="anime-info">
                <h1>{anime.title}</h1>
                <VerifyAnime />
                <h3>Synopsis:</h3>
                <p>{anime.synopsis}</p>
                <span>Aired In: {anime.aired.string}</span>
                <span>Number of Episodes: {anime.episodes}</span>
                <span>Genres: { }</span>
                <span>Score: {anime.score}/10</span>
                <div className="botoes">
                    <button onClick={saveAnime}> Save Anime </button>
                    <button>
                        <a
                            target="blank"
                            href={`https://www.youtube.com/results?search_query= ${anime.title} Trailer`}
                        >
                            Search Trailer on Youtube
                        </a>
                    </button>
                </div>
            </div>

        </div>
    )
}