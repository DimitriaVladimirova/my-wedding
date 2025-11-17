import { Link } from "react-router";

export default function Header() {

    return (
        <header className="header">

            <div className="header__left">
                <img
                  src="/images/logo.jpg" 
                  alt="My Wedding Logo"
                  className="header__logo"
                />
                <h1 className="header__title">
                    <Link className="home" to="/">My Wedding</Link>
                </h1>
            </div>

            <nav className="header__nav">
                <Link className="nav-btn" to="/">Home</Link>
                <Link className="nav-btn" to="/my-wedding">My Wedding</Link>
                <Link className="nav-btn" to="/design">Design Choices</Link>
                <Link className="nav-btn" to="/about">About</Link>

                <div id="user" className="nav-group">
                    <Link className="nav-btn nav-btn--highlight" to="/logout">
                        Logout
                    </Link>
                   
                </div>

                <div id="guest" className="nav-group">
                    <Link className="nav-btn nav-btn--highlight" to="/login">Login</Link>
                    <Link className="nav-btn nav-btn--highlight" to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
}
