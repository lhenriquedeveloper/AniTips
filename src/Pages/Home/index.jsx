import api from "../../Services/api";
import "../../Styles/css/homeStyle.css";
import firebase from "../../Services/firebaseconnection";
import { useContext, useEffect } from "react";
import { AnimeContext } from "../../Contexts/animes";
import { UserContext } from "../../Contexts/user";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Home() {
  const { animes, setAnimes } = useContext(AnimeContext);
  const { setUserLogged } = useContext(UserContext);

  useEffect(() => {
    async function loadAnimes() {
      const response = await api.get("/v1/random/anime/10/false");
      setAnimes(response.data.data);
    }
    loadAnimes();
  }, []);

  useEffect(() => {
    async function verifyLogin() {
      await firebase.auth()
        .onAuthStateChanged((user) => {
          if (user) {
            //online
            setUserLogged(true);
          }
          else {
            //offline
            setUserLogged(false);
          }
        })
    }
    verifyLogin();
  }, [])


  const settingsSlick = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500
  };

  return (
    <div className="container">
      <div className="lista-animes">
        <Slider {...settingsSlick}>
          {animes.map((anime) => {
            return (
              <div className="slick-container" key={anime.id}>
                <article>
                  <img src={anime.cover_image} alt={anime.titles.rj} />
                  <Link to={`/detail/${anime.id}`}>{anime.titles.rj}</Link>
                </article>
              </div>
            );
          })}
        </Slider>
      </div>
      <button className="refresh-button" onClick={() => { location.reload() }}>REFRESH</button>
    </div>
  );
}
