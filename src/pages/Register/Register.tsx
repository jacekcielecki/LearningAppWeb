import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountService from '../../services/AccountService';
import CreateUserRequest from '../../interfaces/Account/CreateUserRequest';
import validToken from '../../services/token';
import imgUrl from '../../assets/images/login-ilustration.jpg';
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box/Box';
import LoginDto from '../../interfaces/Account/LoginDto';
import Loading from '../../components/Loading/Loading';

const schema = yup.object({
    username: yup.string().required("Please fill in a username you want to use").min(6, "Name is too short").max(40, "Name must be at most 40 characters"),
    password: yup.string().required("Please set your password").min(6, "Password is too short").max(40, "Password must be at most 40 characters"),
    confirmPassword: yup.string().required("Please confirm your password").equals([yup.ref('password'), null], "Passwords must match").required("Please confirm your password"),
    emailAddress: yup.string().email("Please fill in a valid email address").required("Please fill in your email address"),
    profilePictureUrl: yup.string().notRequired()
});

const Register = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);

    const form = useForm<CreateUserRequest>({
        defaultValues: { username: "", password: "", confirmPassword: "", emailAddress: "", profilePictureUrl: "" },
        resolver: yupResolver(schema) as any,
        mode: 'onChange'
    });
    const { register, handleSubmit, reset, formState: {errors, isSubmitSuccessful} } = form;
    
    const navigateToDashboard = useCallback(() => {
        navigate('/dashboard');
    }, []);

    const onSubmit = async (form : CreateUserRequest) => {
        setLoading(true);
        AccountService.Register(form).then(() => {
            const loginDto : LoginDto = { email: form.emailAddress, password: form.password };
            AccountService.Login(loginDto).then((response) => {
                const token = response.data;
                localStorage.setItem('token', token);
                setLoading(false);
                navigateToDashboard();
            });
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
        <>
            {loading && <Loading />}
            <div style={{ display: 'flex', justifyContent: 'center', height: '80vh' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container component="main" maxWidth="md">
                        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
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
                                    id="emailAddress"
                                    label="Email"
                                    name="emailAddress"
                                    variant="outlined"
                                    error={!!errors.emailAddress}
                                    helperText={errors.emailAddress?.message}
                                />

                                <TextField
                                    {...register("password")}
                                    type='password'
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
                                    type='password'
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
                                <img src={imgUrl} style={{ width: 400, height: 400 }} alt='' />
                            </Box>
                        </div>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 4 }}>Register</Button>
                    </Container>
                </form>
            </div>
        </>
    );
};

export default Register;