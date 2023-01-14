import '../assets/styles/navbar.css'
import { Link } from 'react-router-dom'
import { auth, provider } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Login } from './login'
import { useEffect, useState, useRef } from 'react'
import { signInWithPopup } from 'firebase/auth'


export const Navbar = () => {
    const [user] = useAuthState(auth);
    const [isvisible, setIsVisible] = useState(false);

    // Sign out function
    const signin = async () => {
        await signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const handler = (e) => {
            if (e.target.className !== 'dp' && !e.target.classList.contains('no')) {
                setIsVisible(false);
                console.log(e.target.className)
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }
    })

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
                {user ?
                    <div className='user'>
                        <div className='profile-pic' onClick={() => setIsVisible(!isvisible)}>
                            <img src={user.photoURL} alt="display profile" className='dp' />
                        </div>
                        {isvisible &&
                            <Login dp={user.photoURL} userName={user.displayName} />
                        }
                    </div>
                    :
                    <button onClick={signin} className="signinBtn">Sign In</button>
                }
            </div>
        </header >
    )
}