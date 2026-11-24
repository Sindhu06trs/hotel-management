import{Link} from "react-router-dom";
import "./Navbar.css";
function Navbar(){
    return(
        <nav className = "navbar">
            <div className = "navbar-logo">
               🏩Hotel Management 
            </div>
            <div className = "navbar-links">
                <Link to = "/">Home</Link>
                <Link to = "/add-hotel" className = "add-hotel-btn">
                +Add Hotel</Link>
            </div>
        </nav>
    );
}
export default Navbar;