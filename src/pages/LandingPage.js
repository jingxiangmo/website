import "./LandingPage.css";
import NavBar from "../components/NavBar";
import logo from "../images/logo-jxm.svg";
import AboutCard from "../components/AboutCard";

function LandingPage(){
    return(
        <>
            <NavBar/>

            <div className="about-block">
                <img className="logo-img" src={logo} alt="logo"/>
                <div className="about-writing-block">
                    <h2> Hi, I'm jingxiang Mo</h2>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed urna, magna tristique bibendum non nullam dolor.</p>
                </div>
            </div>


            <div className="story-block">
                <div>
                    <h1> Currently </h1>
                    <AboutCard/>
                </div>


                <div>
                    <h1> Previously </h1>
                </div>

            </div>



            <h1> Contact Me </h1>

        </>
    );
}

export default LandingPage;