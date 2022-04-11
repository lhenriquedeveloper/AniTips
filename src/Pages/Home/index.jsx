import api from "../../Services/api";
import { useContext, useEffect } from 'react';
import { AnimeContext } from '../../Contexts/animes';
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
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div className="container">
            <div className="lista-animes">
                <Slider {...settingsSlick}>
                    <div>
                        <img></img>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        </div>
    )
}