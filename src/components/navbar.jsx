import '../assets/styles/navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <header>
            <div className='nav-container'>
                <Link to={'/'}>
                    <div className='main-logo'>QWERTY-MAN</div>
                </Link>
                <nav className='navbar'>
                    <Link to={'/timeline'}>Timeline</Link>
                    <Link to={'/about'}>About Us</Link>
                    <Link to={'/contact'}>Talk To Us</Link>
                </nav>
                <div className='user'>
                    <div className='profile-pic'></div>
                </div>
            </div>
        </header>
    )
}