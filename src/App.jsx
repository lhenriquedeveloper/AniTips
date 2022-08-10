import "./Styles/scss/globalStyle.scss";
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Components/Header";
import RoutesFile from "./Routes/routes";
import { ToastContainer } from "react-toastify";
import UserProvider from "./Contexts/user";
import AnimeProvider from "./Contexts/animes";

export default function App() {
  return (
    <div>
      <AnimeProvider>
        <UserProvider>
          <Header />
          <ToastContainer />
          <RoutesFile />
        </UserProvider>
      </AnimeProvider>
    </div>
  )
}


