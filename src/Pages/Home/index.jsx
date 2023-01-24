import api from "../../Services/api";
import "../../Styles/scss/homeStyle.scss";
import firebase from "../../Services/firebaseconnection";
import Slider from "react-slick";
import { useContext, useEffect, useState } from "react";
import { AnimeContext } from "../../Contexts/animes";
import { UserContext } from "../../Contexts/user";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import { FiRefreshCw } from 'react-icons/fi';

export default function Home() {
  //Contexts
  const { animes, setAnimes } = useContext(AnimeContext);
  const { setUserLogged } = useContext(UserContext);
  const [screenSize, setScreenSize] = useState();
  const [slickConfig, setSlickConfig] = useState();
  let navigate = useNavigate();

  //Verify Login Functions
  useEffect(() => {
    async function verifyLogin() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //online
          setUserLogged(true);
        } else {
          //offline
          setUserLogged(false);
        }
      });
    }
    verifyLogin();
  }, []);

  // Load Animes Function + NSFW Filter
  useEffect(() => {
    async function loadAnimes() {
      const animes = await Promise.all(
        Array.from({ length: 12 }, (v, i) => i).map(async () => {
          const { data } = await api.get("/random/anime");

          var nsfwFilter = data.data.genres.filter(function (obj) {
            return obj.name == 'Hentai'
          })
          if (data.data.explicit_genres.length === 0 && nsfwFilter.length === 0) {
            return data.data;
          }
          return null;
        })
      );
      setAnimes(animes.filter((a) => !!a));
    }
    loadAnimes();
  }, []);

  // Responsive Function
  useEffect(() => {
    function sizeOfThings() {
      setScreenSize(window.innerWidth);
    }

    sizeOfThings();

    if (screenSize < 800) {
      const settingsSlick = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
      };
      setSlickConfig(settingsSlick);
    } else {
      const settingsSlick = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 4000,
      };
      setSlickConfig(settingsSlick);
    }
  }, [screenSize]);

  return (
    <>
      <div className="container">
        <div className="lista-animes">
          <Slider {...slickConfig}>
            {animes.map((anime) => {
              return (
                <div className="slick-container" key={anime.mal_id}>
                  <article>
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      onClick={() => {
                        navigate(`/detail/${anime.mal_id}`);
                      }}
                    />
                    <Link to={`/detail/${anime.mal_id}`}>{anime.title}</Link>
                  </article>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="button-area">
          <button
            className="refresh-button"
            onClick={() => {
              location.reload();
            }}
          >
            <FiRefreshCw size={25} />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
