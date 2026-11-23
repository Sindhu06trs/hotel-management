import {BrowserRouter, Routes , Route} from "react-router-dom";
import HotelList from "./pages/HotelList";
import HotelForm from "./pages/HotelForm";
import HotelDetails from "./pages/HotelDetails";
import NotFound from "./pages/NotFound";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/"  element = {<HotelList />} />
                <Route path = "/add-hotel" element = {<HotelForm />} />
                <Route path = "/edit-hotel/:id" element = {<HotelForm />} />
                <Route path = "/hotel/:id" element = {<HotelDetails />} />
                <Route path = "*" element = {<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;