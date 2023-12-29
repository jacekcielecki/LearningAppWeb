import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from "react";
import { login, register } from '../../Services/AccountService';
import { LoginDto } from '../../Models/Account/LoginDto';
import { CreateUserRequest } from '../../Models/Account/CreateUserRequest';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

    const navigate = useNavigate(); 
    const navigateToDashboard = () =>{ 
      navigate('/dashboard');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRegisterMode) {
            await handleRegister(e);
        }
        else {
            await handleLogin(e);
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginRequest: LoginDto = ({
            email: email,
            password: password
        });

        const accessToken = await login(loginRequest);
        if (accessToken !== "") {
            localStorage.setItem("token", accessToken);
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
        
        var isSuccess = await register(registerRequest);

        if (isSuccess) {
            navigateToDashboard()
        }else{
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    const ToggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
    }

    return (
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
    );
}