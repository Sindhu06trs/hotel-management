import{ useSelector } from "react-redux";
import{ useParams , Link} from "react-router-dom";
import{ MapContainer , TileLayer , Marker , Popup } from "react-leaflet";
import { Helmet } from "react-helmet-async";
function HotelDetails(){
    const{ id } = useParams();
    const hotels = useSelector((state) => state.hotels.hotels);
    const hotel = hotels.find((item) => item.id === Number(id));
    if(!hotel){
        return(
        <div>
            <h1>Hotel Not FOund!</h1>
            <Link to = "/">Back to Home</Link>
        </div>
    );
    }
    return(
        <div className = "hotel-details-container">
            <Helmet>
                <title>{hotel.name} | Hotel Management</title>
                <meta name = "description" content = {hotel.description}
                />
            </Helmet>
            <img src={hotel.image}
            alt = {hotel.name}
            className = "hotel-details-image" />
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
            <h2>₹{hotel.price}/night</h2>
            <h3>Location Details: </h3>
            <p>Latitude:{hotel.latitude}</p>
            <p>Longitude:{hotel.longitude}</p>
            <MapContainer center = {[hotel.latitude , hotel.longitude]}
            zoom = {13}
            style = {{height : "400px" , width : "100%"}}>
            <TileLayer attribution = '&copy; OpenStreetMap contributors'
            url  = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
            <Marker position = {[hotel.latitude , hotel.longitude]}>
                <Popup>
                    <strong>{hotel.name}</strong>
                    <br />
                    ₹{hotel.price}/night
                </Popup>
            </Marker>
            </MapContainer>
            <Link to = "/">Back to Home</Link>
        </div>
    );
    
}
export default HotelDetails;