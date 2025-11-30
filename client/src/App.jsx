import { Routes, Route } from "react-router"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Footer from "./components/footer/Footer"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import About from "./components/about/About"
import DesignChoices from "./components/design/DesignChoices"
import LocationDetails from "./components/design/locationDetails"
import LocationCreate from "./components/create/LocationCreate"
import MenuCreate from "./components/create/MenuCreate"
import ColorCreate from "./components/create/ColorCreate"

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/design" element={<DesignChoices/>}/>
            <Route path="/design/locations/:locationId" element={<LocationDetails />} />
            <Route path="/design/locations/create" element={<LocationCreate />} />
            <Route path="/design/menus/create" element={<MenuCreate />} />
            <Route path="/design/colors/create" element={<ColorCreate />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
