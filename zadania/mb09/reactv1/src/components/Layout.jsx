import { Outlet, Link, NavLink } from 'react-router-dom'
import Footer from './Footer.jsx'

function Layout() {
    return (
        <>
            <nav className="navbar navbar-expand bg-body-tertiary border-bottom">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">Galeria Podróży</Link>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>Galeria</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dodaj">Dodaj zdjęcie</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />

            <Footer />
        </>
    )
}

export default Layout