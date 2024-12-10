import firebase from "../../Services/firebaseconnection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../Styles/scss/savesStyle.scss";
import LoadingScreen from "../../Components/LoadingScreen";

export default function Saves() {
  const [animeSave, setAnimeSave] = useState([]);
  const [userState, setUserState] = useState(null); // Começa como null
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserState(user);
        setLoading(false); // Usuário logado, desabilita o loading
      } else {
        setUserState(null);
        setLoading(false); // Sem usuário logado
      }
    });

    return () => unsubscribe(); // Limpa o listener quando o componente desmonta
  }, []);

  useEffect(() => {
    if (!userState) return; // Só carrega se o userState estiver definido

    const unsubscribe = firebase
      .firestore()
      .collection("favorites")
      .doc(userState.uid)
      .collection("animes")
      .onSnapshot((snapshot) => {
        let myAnimes = [];
        snapshot.forEach((doc) => {
          myAnimes.push({
            animeName: doc.data().animeName,
            idAnime: doc.data().idAnime,
          });
        });
        setAnimeSave(myAnimes);
      });

    return () => unsubscribe(); // Limpa o listener quando o componente desmonta
  }, [userState]);

  async function handleDelete(id) {
    await firebase
      .firestore()
      .collection("favorites")
      .doc(userState.uid)
      .collection("animes")
      .doc(id.toString())
      .delete()
      .then(() => {
        toast.success("Anime successfully deleted", {
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
      });
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div id="my-animes">
      <h1>My Anime List</h1>
      {animeSave.length === 0 && (
        <span className="nothing">
          <i className="bi bi-emoji-frown" style={{ fontSize: "1.5rem" }}></i>
          You have no anime saved
        </span>
      )}
      <ul className="animelist">
        {animeSave.map((anime) => (
          <li key={anime.idAnime}>
            <span>{anime.animeName}</span>
            <div>
              <button
                className="edit-btn"
                onClick={() => {
                  navigate(`/detail/${anime.idAnime}`);
                }}
              >
                <i className="bi bi-eye-fill"></i>
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  handleDelete(anime.idAnime);
                }}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}