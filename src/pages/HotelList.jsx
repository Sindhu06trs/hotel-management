import { useState } from "react";
import{useSelector , useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import{ deleteHotel } from "../features/hotels/hotelSlice";
import "./HotelList.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
function HotelList(){
        const [searchTerm , setSearchTerm] = useState("");
        const [priceFilter , setPriceFilter] = useState("");  
        const[currentPage , setCurrentPage] = useState(1);  
        const hotelsPerPage = 6;
        const hotels = useSelector((state) => state.hotels.hotels);
        const dispatch = useDispatch();
        const handleDelete = (id) => {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this hotel?"
            );
            if(confirmDelete){
               dispatch(deleteHotel(id));
               toast.success("Hotel deleted successfully"); 
            }
        };
        const filteredHotels = hotels.filter((hotel) => {
            const matchesSearch =  hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = priceFilter === "" || 
            (priceFilter === "low" && hotel.price < 2000) ||
            (priceFilter === "medium" && hotel.price >= 2000 && hotel.price <=5000) || 
            (priceFilter === "high" && hotel.price > 5000);
        return matchesSearch && matchesPrice;
        }   
    );
    const indexOfLastHotel = currentPage * hotelsPerPage;
            const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
            const currentHotels = filteredHotels.slice(
                indexOfFirstHotel,
                indexOfLastHotel
            );
            const  totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
    return(
        <> 
        <Helmet>
            <title>Explore Hotels | Hotel Management</title>
            <meta name = "description" content = "Explore a wide range of hotels , compare prices , and find the perfect place for your next stay."/>
        </Helmet>
        <div className = "hotel-list-container">
            <div className = "hotel-list-header">
                <div>
                    <h1>Explore Hotels</h1>
                    <p>Find the perfect place for your next stay.</p>
                </div>
            </div>
            <div className = "hotel-filters">
                <input type = "text" placeholder = "Search hotels by name..." className = "search-input" value = {searchTerm} onChange={(event) => { setSearchTerm(event.target.value);
                    setCurrentPage(1);
                }} />
                <select className = "price-filter" value= {priceFilter} onChange= {(event) => {setPriceFilter(event.target.value);
                setCurrentPage(1);
                }}>
                    <option value = "" >All prices</option>
                    <option value = "low">Below ₹2000</option>
                    <option value = "medium">₹2000 - ₹5000</option>
                    <option value = "high">Above ₹5000</option>
                </select>
            </div>
            <div className = "hotel-cards">
                { filteredHotels.length === 0 ? (
                    <p className = "empty-message">
                    No matching hotels found.
                </p>
                ) : (
                    currentHotels.map((hotel) => (
                        <div className = "hotel-card" key = {hotel.id}>
                            <img src={hotel.image} alt={hotel.name} className = "hotel-card-image" />
                            <div className = "hotel-card-content">
                                <h2>{hotel.name}</h2>
                                <p>{hotel.description}</p>
                                <h3>₹{hotel.price}/night</h3>
                                <div className = "hotel-card-actions">
                                    <Link to = { `/hotel/${hotel.id}`}>
                                    View Details</Link>
                                    <Link to = {`/edit-hotel/${hotel.id}`} className = "edit-button">Edit</Link>
                                    <button onClick = {() => handleDelete(hotel.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
            </div>
            <div className = "pagination">
                <button onClick = {() => setCurrentPage(currentPage - 1)}
                disabled = {currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick = {() => setCurrentPage(currentPage + 1)}
                    disabled = {currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
        </div>
    </>
    );
}
export default HotelList;