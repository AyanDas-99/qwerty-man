import '../assets/styles/loader.css'
import arrow from '../assets/images/loader.gif'


export const Loader = () => {
    return <div className="loader-container">
        <img src={arrow} alt="loading animation" />
    </div>
}