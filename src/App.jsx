import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import CoinDetails from "./pages/CoinDetails";
import Coins from "./pages/Coins";
import Exchanges from "./pages/Exchanges";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home"
import "./styles/Index.css"
function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/>
        <Route path="/coin/:id" element={<CoinDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;
