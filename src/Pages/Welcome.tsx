import image from '../Images/landing-page-img.jpg';
import { Link } from "react-router-dom";

export const Welcome = () => {
    return (
        <div className='Home'>
            <header className="App-header">
                <img src={image} className='App-logo' alt='image'></img>
                <h2>Welcome to the LearningApp</h2>
                <p>
                    <Link to='/login'>Login</Link>
                    &nbsp; If you already have a account or &nbsp;
                    <Link to='/create-account'>Create Account</Link>
                    &nbsp; to continue
                </p>
        </header>
        </div>
     );
}