import api from "../../Services/api";
import "../../Styles/scss/homeStyle.scss";
import firebase from "../../Services/firebaseconnection";
import Slider from "react-slick";
import { useContext, useEffect, useState } from "react";
import { AnimeContext } from "../../Contexts/animes";
import { UserContext } from "../../Contexts/user";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import { FiRefreshCw } from "react-icons/fi";
import { debounce } from "lodash";
import AnimeCard from "../../Components/AnimeCard/index";
import LoadingScreen from "../../Components/LoadingScreen";

export default function Home() {
  const { animes, setAnimes } = useContext(AnimeContext);
  const { setUserLogged } = useContext(UserContext);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [slickConfig, setSlickConfig] = useState({});
  const [filterGenre, setFilterGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  let navigate = useNavigate();

  // Verificar Login
  useEffect(() => {
    const verifyLogin = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        setUserLogged(!!user);
      });
    };
    verifyLogin();
  }, [setUserLogged]);

  const loadAnimes = async (genreFilter = "", pageNumber = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw&page=${pageNumber}&type=${genreFilter}`
      );
      setAnimes(data.data);
    } catch (error) {
      console.error("Error fetching animes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função debounce para evitar chamadas excessivas ao API
  const debouncedLoadAnimes = debounce(loadAnimes, 500);

  useEffect(() => {
    loadAnimes(filterGenre);
  }, [filterGenre]);

  // Configuração responsiva para o Slider
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const settings =
      screenSize < 800
        ? {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
          }
        : {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 4000,
          };
    setSlickConfig(settings);
  }, [screenSize]);

  // Função para atualizar os animes
  const handleRefresh = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      loadAnimes(filterGenre, nextPage);
      return nextPage;
    });
  };

  return (
    <>
      {loading ? (
        <LoadingScreen /> // Exibe o carregamento
      ) : (
        <div className="home-container">
          {/* Filtro de Gênero */}
          <div className="filter-container">
            <label htmlFor="genre-filter" className="filter-label">
              <span className="filter-title">Choose an Anime Type</span>
              <select
                id="genre-filter"
                className="genre-filter"
                value={filterGenre}
                onChange={(e) => {
                  setFilterGenre(e.target.value);
                  debouncedLoadAnimes(e.target.value); // Chamada otimizada
                }}
              >
                <option value="">Filter by Type</option>
                <option value="tv">Anime for TV</option>
                <option value="movie">Movies</option>
                <option value="ova">OVA</option>
                <option value="special">Specials</option>
                <option value="music">Musicals</option>
              </select>
            </label>
          </div>

          {/* Slider */}
          <div className="anime-slider">
            <Slider {...slickConfig}>
              {animes.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime}></AnimeCard>
              ))}
            </Slider>
          </div>

          {/* Botão de atualização */}
          <div className="refresh-container">
            <button
              className="refresh-button"
              onClick={handleRefresh}
              disabled={loading}
            >
              <FiRefreshCw size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
