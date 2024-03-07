import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountService from '../../services/AccountService';
import CreateUserRequest from '../../interfaces/Account/CreateUserRequest';
import validToken from '../../services/token';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box/Box';

const schema = yup.object({
    username: yup.string().required("Please fill in a username you want to use").min(6, "Name is too short").max(40, "Name must be at most 40 characters"),
    password: yup.string().required("Please set your password").min(6, "Password is too short").max(40, "Password must be at most 40 characters"),
    confirmPassword: yup.string().required("Please confirm your password").equals([yup.ref('password'), null], "Passwords must match").required("Please confirm your password"),
    emailAddress: yup.string().required("Please fill in your email address").email("Please fill in a valid email address"),
    profilePictureUrl: yup.string().notRequired()
});

const Register = () => {
    const navigate = useNavigate(); 

    const form = useForm<CreateUserRequest>({
        defaultValues: { username: "", password: "", confirmPassword: "", emailAddress: "", profilePictureUrl: "" },
        resolver: yupResolver(schema) as any,
        mode: 'onChange'
    });
    const { register, handleSubmit, reset, formState: {errors, isSubmitSuccessful} } = form;
    
    const navigateToDashboard = () => { 
        navigate('/dashboard');
    }

    const navigateToLogin = () => { 
        navigate('/login');
    }

    const onSubmit = async (form : CreateUserRequest) => {
        AccountService.Register(form).then(() => {
            navigateToLogin();
        });
    };

    useEffect(() => {
        if (validToken()){
            navigateToDashboard();
        }
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset, navigateToDashboard]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container component="main" maxWidth="md">
                    <Typography component="h1" variant="h4" sx={{ mt: 2, mb: 2 }}>
                        Register Account
                    </Typography>
                    <div className='register-content'>
                        <div>
                            <TextField
                                autoFocus
                                {...register("username")}
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                variant="outlined"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />

                            <TextField
                                {...register("emailAddress")}
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                variant="outlined"
                                error={!!errors.emailAddress}
                                helperText={errors.emailAddress?.message}
                            />

                            <TextField
                                {...register("password")}
                                margin="normal"
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                variant="outlined"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />

                            <TextField
                                {...register("confirmPassword")}
                                margin="normal"
                                fullWidth
                                id="confirmPassword"
                                label="Confirm password"
                                name="confirmPassword"
                                variant="outlined"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </div>
                        <Box sx={{ ml: 3, mt: 2 }}>
                            <img src="https://via.placeholder.com/400" alt="Create new account" />
                        </Box>
                    </div>

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 4 }}>Register</Button>
                </Container>
            </form>
        </div>
    );
};

export default Register;