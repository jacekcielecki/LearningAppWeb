import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from "react";
import { Login as login } from '../../Services/AccountService';
import { LoginDto } from '../../Models/Account/LoginDto';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const loginRequest : LoginDto = ({
          email: email,
          password: password
        });
    
        const accessToken = await login(loginRequest);
        if(accessToken != null){
            alert(accessToken);
        }
        else{
            alert('fail!');
        }
      };

    return (
        <div className='signin'>
            <form onSubmit={handleLogin}>
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 2 }}>
                        Sign in
                    </Typography>
                    <TextField onChange={(e) => setEmail(e.target.value)} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                    <TextField onChange={(e) => setPassword(e.target.value)} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 4 }}>
                        Sign In
                    </Button>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Container>
            </form>
        </div>
    );
}