import firebase from "../../Services/firebaseconnection"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { SentimentDissatisfied } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Styles/scss/savesStyle.scss";

export default function Saves() {
    // States  
    const [animeSave, setAnimeSave] = useState([]);
    const [userState, setUserState] = useState({});
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    // Verify Login Function
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
    }, []);

    // List Function
    useEffect(() => {
        async function loadSaveAnime() {
            await firebase.firestore()
                .collection("favorites")
                .doc(userState.uid)
                .collection("animes")
                .onSnapshot((doc) => {
                    let myAnimes = [];
                    doc.forEach((item) => {
                        myAnimes.push({
                            animeName: item.data().animeName,
                            idAnime: item.data().idAnime,
                        })
                    })
                    setAnimeSave(myAnimes);
                }
                )
        }
        loadSaveAnime();
    }, [userState]);

    // Delete Function
    async function handleDelete(id) {
        await firebase.firestore()
            .collection("favorites")
            .doc(userState.uid)
            .collection("animes")
            .doc(id.toString())
            .delete()
            .then(() => {
                toast.success('Anime successfully deleted', {
                    theme: "dark",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            })
            .catch((e) => {
                console.log(e);
            })
    }


    // Loading Save Anime Verify
    if (loading) {
        return (
            <div className="rendering-display">
                <h1 className="rendering-message">Loading your saved anime...</h1>
            </div>
        );
    }

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
            <ul className="animelist">
                {
                    animeSave.map((anime) => {
                        return (
                            <li key={anime.idAnime}>
                                <span>{anime.animeName}</span>
                                <div>
                                    <button>
                                        <EditIcon
                                            sx={{ fontSize: 27 }}
                                            className="goto-icon"
                                            onClick={() => { navigate(`/detail/${anime.idAnime}`) }}
                                        />
                                    </button>
                                    <button>
                                        <DeleteIcon
                                            sx={{ fontSize: 27 }}
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