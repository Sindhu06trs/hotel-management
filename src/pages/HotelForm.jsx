import{ useState , useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import{ useNavigate , useParams } from "react-router-dom";
import { addHotel , editHotel } from "../features/hotels/hotelSlice";
import { toast } from "react-toastify";
import "./HotelForm.css";
import { Helmet } from "react-helmet-async";
function HotelForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const hotels = useSelector((state) => state.hotels.hotels);
    const existingHotel = hotels.find((hotel) => hotel.id === Number(id));
    const [formData , setFormData] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        price: "",
        image: "",
    });
    useEffect(() => {
        if(existingHotel){
            setFormData(existingHotel);
        }
    }, [existingHotel]);
    const handleChange = (event) => {
        const { name , value } = event.target;
        setFormData((prev) => ({...prev , [name] : value , }));
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({...prev , image: reader.result, }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (event) => {
        console.log("Submit button clicked!");
        event.preventDefault();
        const hotelData = { ...formData , id : id ? Number(id) : Date.now() , latitude: Number(formData.latitude) , longitude : Number(formData.longitude), price: Number(formData.price),};
        if(id){
            dispatch(editHotel(hotelData));
            toast.success("Hotel updated successfully");
        }
        else{
            dispatch(addHotel(hotelData));
            toast.success("Hotel added successfully");
        }

        navigate("/");
    }

    return(
        <div className = "hotel-form-container">
            <Helmet>
                <title>
                    {id ? "Edit Hotel | Hotel Management " : "Add Hotel | Hotel Management"}
                </title>
                <meta name = "description" content = {
                    id ? "Update  hotel information , pricing , images and location details."
                       : "Add a new hotel with its details , images , pricing and location."
                }
                />  
           </Helmet>
            <h1>{id ? "Edit Hotel" : "Add New Hotel"} </h1>
            <p> {id ? "Update the hotel details below." : "Enter the hotel details below."} 
            </p>
            <form className = "hotel-form" onSubmit ={ handleSubmit }>
                <div className = "form-group">
                    <label>Hotel Image</label>
                    <input type = "file" accept = "image/*" onChange = {handleImageChange} required = {!id} />
                    {formData.image && ( <img src={formData.image} alt = "Hotel Preview" className = "image-preview" /> )}
                </div>
                <div className = "form-group">
                    <label>Hotel Name</label>
                    <input type = "text" name = "name" placeholder = "Enter hotel name" value= {formData.name} onChange={handleChange}
                    required />
                </div>
                <div className = "form-group">
                    <label>Description</label>
                    <textarea name = "description" placeholder = "Enter hotel description" rows = "4" value= {formData.description} onChange={handleChange}
                    required />
                </div>
                <div className = "form-group">
                    <label>Latitude</label>
                    <input type = "number" name = "latitude" step = "any" placeholder = "Enter latitude" min = "-90" max = "90"  value= {formData.latitude} onChange={handleChange}
                    required />
                </div>
                <div className = "form-group">
                    <label>Longitude</label>
                    <input type = "number" name = "longitude" step = "any" placeholder = "Enter longitude" min = "-180" max = "180" value= {formData.longitude} onChange={handleChange}
                    required /> 
                </div>
                <div className = "form-group">
                    <label>Price per Night (₹)</label>
                    <input type = "number" name = "price" placeholder = "Enter price" min = "1" value={formData.price} onChange={handleChange}
                    required />
                </div>
                <button type = "submit" className = "submit-button">
                    {id ? "Update Hotel" : "Add Hotel"}
                </button>
            </form>
        </div>
    );
}
export default HotelForm;