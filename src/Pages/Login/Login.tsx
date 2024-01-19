import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { LoginDto } from '../../Models/Account/LoginDto';
import { CreateUserRequest } from '../../Models/Account/CreateUserRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountService from '../../Services/AccountService';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

export const Login = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [isLoading, setIsLoading] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);


    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const navigateToDashboard = () =>{ 
        navigate('/dashboard');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isRegisterMode ? await handleRegister(e) : await handleLogin(e);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginRequest: LoginDto = ({
            email: email,
            password: password
        });

        const authSuccess = await AccountService.Login(loginRequest);
        if (authSuccess) {
            navigateToDashboard();
        }
        else {
            alert('fail!');
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const registerRequest: CreateUserRequest = ({
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            emailAddress: email,
            profilePictureUrl: null
        });
        
        var registerSuccess = await AccountService.Register(registerRequest);

        if (registerSuccess) {
            navigateToDashboard()
        }else{
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    const ToggleMode = () => {
        location.pathname == '/register' ?
            navigate('/login') :
            navigate('/register');
    }

    useEffect(() => {
        location.pathname == '/register' ?
            setIsRegisterMode(true) :
            setIsRegisterMode(false);
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
                                    <TextField onChange={(e) => setUsername(e.target.value)} margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
                                    <TextField onChange={(e) => setEmail(e.target.value)} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                                    <TextField onChange={(e) => setPassword(e.target.value)} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                                    <TextField onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" required fullWidth name="confirmPassword" label="Confirm password" type="password" id="confirmPassword" autoComplete="current-password" />
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
                                        <TextField onChange={(e) => setEmail(e.target.value)} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                                        <TextField onChange={(e) => setPassword(e.target.value)} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
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
}