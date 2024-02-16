import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountService from '../../services/AccountService';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateUserRequest } from '../../interfaces/Account/CreateUserRequest';
import { LoginDto } from '../../interfaces/Account/LoginDto';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [isLoading] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [user, setUser] = useState<CreateUserRequest>({
        username: '',
        password: '',
        confirmPassword: '',
        emailAddress: '',
        profilePictureUrl: ''
    });

    const navigateToDashboard = () =>{ 
        navigate('/dashboard');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isRegisterMode ? await handleRegister(e) : await handleLogin(e);
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginRequest: LoginDto = ({
            email: user.emailAddress,
            password: user.password
        });
        AccountService.Login(loginRequest).then((response) =>{
            const token = response.data;
            localStorage.setItem('token', token);
            navigateToDashboard();
        }).catch((error) => {
            setUser({...user, username: '', emailAddress: '', password: '', confirmPassword: ''});
        });
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        AccountService.Register(user).then((response) =>{
            navigateToDashboard();
        }).catch((error) => {
            setUser({...user, username: '', emailAddress: '', password: '', confirmPassword: ''});
        });
    };

    const ToggleMode = () => {
        location.pathname === '/register' ? navigate('/login') : navigate('/register');
    }

    useEffect(() => {
        location.pathname === '/register' ? setIsRegisterMode(true) : setIsRegisterMode(false);
    }, [location.pathname]);

    return (
        <>
            {isLoading ? 
            <>
                <div className="loader-container">
                    <div className="loader loader-top-50">
                        <CircularProgress color="secondary" size={50} />
                    </div>
                </div>
            </> : 
            <>
                <div className='signin'>
                    <form onSubmit={handleSubmit}>
                        <Container component="main" maxWidth="xs">
                            {isRegisterMode ? (
                                <>
                                    <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 2 }}>
                                        Create new account
                                    </Typography>
                                    <TextField onChange={(e) => setUser({...user, username: e.target.value})} margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
                                    <TextField onChange={(e) => setUser({...user, emailAddress: e.target.value})} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                                    <TextField onChange={(e) => setUser({...user, password: e.target.value})} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                                    <TextField onChange={(e) => setUser({...user, confirmPassword: e.target.value})} margin="normal" required fullWidth name="confirmPassword" label="Confirm password" type="password" id="confirmPassword" autoComplete="current-password" />
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 4 }}>
                                        Sign In
                                    </Button>
                                </>
                            ) :
                                (
                                    <>
                                        <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 2 }}>
                                            Sign in
                                        </Typography>
                                        <TextField onChange={(e) => setUser({...user, emailAddress: e.target.value})} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                                        <TextField onChange={(e) => setUser({...user, password: e.target.value})} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 4 }}>
                                            Sign In
                                        </Button>
                                        <Link variant="body2" onClick={ToggleMode}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </>
                                )
                            }
                        </Container>
                    </form>
                </div>
            </>}
        </>
    );
};

export default Login;