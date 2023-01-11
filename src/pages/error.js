import { Link } from 'react-router-dom';
import errorImage from '../assets/page-not-found 1.png';
import '../assets/styles/error.css'

export const Error = () => {
    return (
        <div className="error-container">
            <h1>Page Not Found</h1>
            <div className="notFoundImage">
                <img src={errorImage} alt="Error" />
            </div>
            <p>You might want to go to <strong><Link to={'/'}>Home Page</Link></strong></p>
        </div>
    )
}