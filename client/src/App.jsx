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
import LocationEdit from "./components/edit/LocationEdit"
import MenuEdit from "./components/edit/MenuEdit"
import MyWedding from "./components/myWeddingProfile/MyWedding"
import RequireAuth from "./components/guards/AuthGuard"
import RequireAdmin from "./components/guards/AdminGuard"
import RequireGuest from "./components/guards/GuestGuard"

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design" element={<DesignChoices />} />
          <Route path="/design/locations/:locationId" element={<LocationDetails />} />
          <Route path="/about" element={<About />} />

          <Route element={<RequireAdmin />}>
            <Route path="/design/locations/create" element={<LocationCreate />} />
            <Route path="/design/locations/:locationId/edit" element={<LocationEdit />} />
            <Route path="/design/menus/create" element={<MenuCreate />} />
            <Route path="/design/menus/:menuId/edit" element={<MenuEdit />} />
            <Route path="/design/colors/create" element={<ColorCreate />} />
          </Route>
          
          <Route element={<RequireAuth />}>
            <Route path="/my-wedding" element={<MyWedding />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route element={<RequireGuest />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
