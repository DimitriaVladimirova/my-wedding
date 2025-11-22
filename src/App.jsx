import { Routes, Route } from "react-router"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Footer from "./components/footer/Footer"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import About from "./components/about/About"

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
