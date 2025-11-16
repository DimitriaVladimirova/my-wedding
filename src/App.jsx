import { Routes, Route } from "react-router"
import Header from "./components/header/Header"
import Home from "./components/home/Home"

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
            <Route index element={<Home />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
