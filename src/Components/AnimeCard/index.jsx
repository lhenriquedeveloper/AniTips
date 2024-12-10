import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/scss/CardStyle.scss";

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();

  return (
    <div className="anime-card">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="anime-image"
        onClick={() => navigate(`/detail/${anime.mal_id}`)}
      />
      <div className="anime-info">
        <div
          className={`status ${
            anime.status === "Currently Airing" ? "status-currently-airing" : ""
          }`}
        >
          {anime.status}
        </div>
        <div className="details">
          Fall {anime.aired.prop.from.year} • {anime.episodes} episodes
        </div>
        <h3 className="anime-title">
          <Link to={`/detail/${anime.mal_id}`}>{anime.title}</Link>
        </h3>
        <div className="rating">
          <span className="score">⭐ {anime.score}</span>
          <span className="ranking"># {anime.rank}</span>
        </div>
        <div className="genres">
          {anime.genres.slice(0, 2).map((genre) => (
            <span key={genre.mal_id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>
        <div className="age-rating">{anime.rating}</div>
      </div>
    </div>
  );
};

export default AnimeCard;
