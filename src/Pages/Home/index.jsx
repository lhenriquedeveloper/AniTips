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
import { debounce } from "lodash"; // Para otimizar o filtro de gêneros

export default function Home() {
  const { animes, setAnimes } = useContext(AnimeContext);
  const { setUserLogged } = useContext(UserContext);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [slickConfig, setSlickConfig] = useState({});
  const [filterGenre, setFilterGenre] = useState(""); // Filtro de gênero
  const [loading, setLoading] = useState(false);
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

  // Carregar animes e aplicar filtro NSFW
  const loadAnimes = async (genreFilter = "") => {
    setLoading(true);
    try {
      const fetchedAnimes = await Promise.all(
        Array.from({ length: 12 }, (_, i) => i).map(async () => {
          const { data } = await api.get("/random/anime");

          const nsfwFilter = data.data.genres.some(
            (genre) => genre.name === "Hentai"
          );
          if (data.data.explicit_genres.length === 0 && !nsfwFilter) {
            // Filtro por gênero
            if (
              genreFilter &&
              !data.data.genres.some((g) => g.name === genreFilter)
            ) {
              return null;
            }
            return data.data;
          }
          return null;
        })
      );
      setAnimes(fetchedAnimes.filter(Boolean));
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
    setLoading(true);
    loadAnimes(filterGenre);
  };

  return (
    <>
      <div className="home-container">
        {/* Filtro de Gênero */}
        <div className="filter-container">
          <select
            className="genre-filter"
            value={filterGenre}
            onChange={(e) => {
              setFilterGenre(e.target.value);
              debouncedLoadAnimes(e.target.value); // Chamada otimizada
            }}
          >
            <option value="">Filtrar por Gênero</option>
            <option value="Ação">Ação</option>
            <option value="Comédia">Comédia</option>
            <option value="Drama">Drama</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Mistério">Mistério</option>
            {/* Adicione outros gêneros conforme necessário */}
          </select>
        </div>

        {/* Slider */}
        <div className="anime-slider">
          <Slider {...slickConfig}>
            {animes.map((anime) => (
              <div className="anime-card" key={anime.mal_id}>
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="anime-image"
                  onClick={() => navigate(`/detail/${anime.mal_id}`)}
                />
                <Link to={`/detail/${anime.mal_id}`} className="anime-title">
                  {anime.title}
                </Link>
              </div>
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
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <FiRefreshCw size={24} />
            )}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
