import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7280/api/Account/login',{
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login : email, password : password }),
            });
            const data: string = await response.text();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='signin'>
            <form onSubmit={handleSubmit}>
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 2 }}>
                    Sign in
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 4 }}
                    >
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