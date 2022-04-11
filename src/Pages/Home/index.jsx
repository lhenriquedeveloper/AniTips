import api from "../../Services/api";
import "../../Styles/css/homeStyle.css";
import { useContext, useEffect } from "react";
import { AnimeContext } from "../../Contexts/animes";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Home() {
  const { animes, setAnimes } = useContext(AnimeContext);

  useEffect(() => {
    async function loadAnimes() {
      const response = await api.get("/v1/random/anime/10");
      setAnimes(response.data.data);
    }
    loadAnimes();
  }, []);

  const settingsSlick = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
  return (
    <div className="container">
      <div className="lista-animes">
        <Slider {...settingsSlick}>
          {animes.map((anime) => {
            return (
              <div className="slick-container">
                <article key={anime.anilist_id}>
                  <img src={anime.cover_image} alt={anime.titles.rj} />
                  <Link to={() => {}}>{anime.titles.rj}</Link>
                </article>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
