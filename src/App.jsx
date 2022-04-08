import "./Styles/css/globalStyle.css"
import Header from "./Components/Header";
import RoutesFile from "./Routes/routes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";



export default function App() {
  return (
    <div className="main-app">
      <Header />
      <ToastContainer />
      <RoutesFile />
    </div>
  )
}


