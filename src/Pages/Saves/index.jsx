import firebase from "../../Services/firebaseconnection"
import { SentimentDissatisfiedIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



const [animeSave, setAnimeSave] = useState();


useEffect(() => {
    async function loadSaveAnime() {
        const user = firebase.auth().currentUser
        await firebase.firestore()
            .collection("favorites")
            .doc(user.uid)
            .collection("animes")
            .onSnapshot((doc) => {
                let myAnimes = [];
                doc.forEach((anime) => {
                    myAnimes.push({
                        animeName: anime.data().animeName,
                        idAnime: anime.data().idAnime
                    });
                });
            });
        setAnimeSave(myAnimes);
    }
    loadSaveAnime();
}, [])

function handleDelete(id) {
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


export default function Saves() {
    return (
        <div id="my-animes">
            <h1> My animes: </h1>


            {animeSave.length === 0 && (
                <span className="nothing">
                    <SentimentDissatisfiedIcon sx={{ fontSize: 20 }} />
                    You have no anime saved
                    <SentimentDissatisfiedIcon sx={{ fontSize: 20 }} />
                </span>
            )}

            <ul>
                {
                    animeSave.map((anime) => {
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