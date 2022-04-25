import firebase from "../../Services/firebaseconnection"
import { SentimentDissatisfied } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Saves() {
    const [animeSave, setAnimeSave] = useState([]);
    const [userState, setUserState] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function verifyLogin() {
            await firebase.auth()
                .onAuthStateChanged((user) => {
                    if (user) {
                        //online
                        setUserState(user);
                        setLoading(false);
                    }
                    else {
                        //offline
                        setLoading(true);
                    }
                })
        }
        verifyLogin();
    }, [userState]);

    const loadSaveAnime = async () => {
        const response = firebase.firestore()
            .collection("favorites")
            .doc(userState.uid)
            .collection("animes");
        const data = await response.get();
        data.docs.forEach(item => {
            setAnimeSave([item.data()])
        })
    }

    useEffect(() => {
        loadSaveAnime();
    }, []);

    if (loading) {
        return (
            <div className="anime-loading">
                <h1>Loading your saved anime...</h1>
            </div>
        );
    }

    async function handleDelete(id) {
        const user = firebase.auth().currentUser;
        await firebase.firestore()
            .collection("favorites")
            .doc(user.uid)
            .collection("animes")
            .doc(id)
            .then(() => {
                toast.sucess('Anime successfully deleted', {
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

    // Inicio do Return
    return (
        <div id="my-animes">
            <h1> My animes: </h1>
            {animeSave.length === 0 && (
                <span className="nothing">
                    <SentimentDissatisfied sx={{ fontSize: 20 }} />
                    You have no anime saved
                    <SentimentDissatisfied sx={{ fontSize: 20 }} />
                </span>
            )}

            <ul>
                {
                    animeSave && animeSave.map((anime) => {
                        return (
                            <li key={anime.idAnime}>
                                <span>{anime.animeName}</span>

                                <div>
                                    <Link to={`/detail/${anime.idAnime}`}> <EditIcon /> </Link>
                                    <button>
                                        <DeleteIcon
                                            sx={{ fontSize: 27 }}
                                            color="primary"
                                            className="delete-icon"
                                            onClick={() => {
                                                handleDelete(anime.idAnime);
                                            }}
                                        />
                                    </button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}