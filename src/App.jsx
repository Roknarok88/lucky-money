import {Route, Routes, useLocation} from "react-router-dom";
import { useLayoutEffect } from "react";
import './main.scss'

import NavBar from "./components/NavBar/NavBar.jsx"
import Home from "./pages/Home/Home.jsx"
import Footer from "./components/Footer/Footer.jsx";
import HowToPlay from "./pages/HowToPlay/HowToPlay.jsx";
import CurrentCompetition from "./pages/CurrentCompetition/CurrentCompetition.jsx";
import PastCompetition from "./pages/PastCompetition/PastCompetition.jsx";
import TermsConditions from "./pages/TermsConditions/TermsConditions.jsx";
import LiveCompetitions from "./pages/LiveCompetitions/LiveCompetitions.jsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.jsx";
import PaymentCancel from "./pages/PaymentCancel/PaymentCancel.jsx";

function App() {


  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo({top: 0, behavior: "instant"});
    }, [location.pathname]);
    return children
  }

  return (
    <>
      <NavBar/>
      <div className="main-content">
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/how-to-play" element={<HowToPlay />}/>
            <Route path="/live-competitions" element={<LiveCompetitions />}/>
            <Route path="/past-competition" element={<PastCompetition />}/>
            <Route path="/terms-and-conditions" element={<TermsConditions />}/>
            <Route path="/live-competitions/:id" element={<CurrentCompetition />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
          </Routes>
        </Wrapper>
      </div>
      <Footer/>
    </>
  )
}

export default App
