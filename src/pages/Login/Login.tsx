import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountService from '../../services/AccountService';
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
import { Snackbar, Alert } from '@mui/material';
import ISnackbarState from '../../interfaces/ISnackbarState';

const schema = yup.object({
    email: yup.string().email("Please provide your email address").required("Please provide your email address"),
    password: yup.string().required("Please provide your password"),
});

const Login = () => {
    const navigate = useNavigate(); 
    const [snackbar, setSnackbar] = useState<ISnackbarState>({visible: false, message: '', severity: undefined});
    const [loading, setLoading] = useState(false);

    const form = useForm<LoginDto>({
        defaultValues: { email: "", password: "" },
        resolver: yupResolver(schema) as any,
        mode: 'onChange'
    });
    const { register, handleSubmit, reset, formState: {errors, isSubmitSuccessful} } = form;
    
    const navigateToDashboard = useCallback(() => {
        navigate('/dashboard');
    }, []);

    const handleHideSnackbar = () => {
        setSnackbar({...snackbar, visible: false});
    };

    const onSubmit = async (form : LoginDto) => {
        setLoading(true);
        AccountService.Login(form).then((response) => {
            const token = response.data;
            localStorage.setItem('token', token);
            navigateToDashboard();
            setLoading(false);
        }).catch(() => {
            setSnackbar({...snackbar, visible: true, message: 'Invalid credentials', severity: 'error'});
            setLoading(false);
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
            <Snackbar open={snackbar.visible} autoHideDuration={2000} onClose={handleHideSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleHideSnackbar} variant="filled" severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <div style={{ display: 'flex', justifyContent: 'center', height: '80vh' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container component="main" maxWidth="md">
                        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                            Login to your account
                        </Typography>
                        <div className='register-content'>
                            <div style={{marginTop: '15%'}}>
                                <div>

                                    <TextField
                                        {...register("email")}
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
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

                                </div>
                            </div>
                            <Box sx={{ ml: 3, mt: 2 }}>
                                <img src={imgUrl} style={{ width: 400, height: 400 }} alt='' />
                            </Box>
                        </div>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 4 }}>Login</Button>
                    </Container>
                </form>
            </div>
        </>
    );
};

export default Login;