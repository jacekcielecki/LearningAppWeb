import Grid from '@mui/material/Grid';
import ilustrationUrl from '../../Assets/Images/home-ilustration.jpg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        const token = localStorage.getItem("token");
        if(token !== null && token !== ""){
            navigate("/dashboard");
        }else{
            navigate("/login");
        }
    }

    const handleRegisterRedirect = () => {
        const token = localStorage.getItem("token");
        if(token !== null && token !== ""){
            navigate("/dashboard");
        }else{
            navigate("/register");
        }
    }

    return (
        <> 
            <Grid container spacing={2} sx={{width: 'fit-content', alignItems: 'center', display: 'flex', justifyContent: 'center', mt: 4}}>
                <Grid item xs={6}>
                    <Box sx={{textAlign: 'left'}}>
                        <h3 style={{marginBottom: -20}}>Welcome to</h3>
                        <h1 style={{fontSize: 70, margin: 0}}>LearningApp</h1>
                        <p style={{fontSize: 16}}>
                            Learning has never been easier. Learn in just 5 minutes a day with game-like lessons,
                            or join other course creators and create your own learning course tailored for any subject of your choosing.
                        </p>
                        <div>
                            <Button variant="contained" size='medium' disableElevation onClick={handleLoginRedirect} color='secondary' sx={{mr: 2}}>Login</Button>
                            <Button variant="contained" size='medium' disableElevation onClick={handleRegisterRedirect} color='primary'>Register</Button>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                    <div>
                        <img src={ilustrationUrl} className='home-ilustration' alt=''/>
                    </div>
                </Grid>
            </Grid>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
                <h1>LearningApp Advantages</h1>
            </div>

            <Grid container spacing={4} sx={{width: 'fit-content', mt: 1}}>
                <Grid item xs={3}>
                    <Box>
                    <div style={{justifyContent: 'center', display: 'flex'}}>
                        <div style={{width: 90, height: 90}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                            </svg>
                        </div>
                    </div>
                    <h3>Tailored Learning Experience</h3>
                    <div>
                        LearningApp offers a personalized learning journey, adapting to each user's pace and style. Our platform employs advanced algorithms to understand your strengths and weaknesses, ensuring that you receive custom-tailored quizzes and content to optimize your learning potential.
                    </div>
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box>
                        <div style={{justifyContent: 'center', display: 'flex'}}>
                            <div style={{width: 90, height: 90}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>
                            </div>
                        </div>
                        <h3>Diverse Quiz Creation Tools</h3>
                        <div>
                            Unleash your creativity with our intuitive quiz creation tools! LearningApp empowers users to generate quizzes on any topic imaginable. Whether you're a student, educator, or enthusiast, you can craft engaging quizzes to share with the community, fostering a dynamic and diverse learning environment.
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box>
                        <div style={{justifyContent: 'center', display: 'flex'}}>
                            <div style={{width: 90, height: 90}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3>Community-driven Knowledge Hub</h3>
                        <div>
                            Join a vibrant community of learners and educators on LearningApp. Connect with like-minded individuals, discuss topics of interest, and access a vast repository of user-generated quizzes. Our platform is not just about quizzes; it's a collaborative space where knowledge is shared, discussed, and celebrated.
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box>
                    <div style={{justifyContent: 'center', display: 'flex'}}>
                        <div style={{width: 90, height: 90}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3>Real-time Progress Tracking</h3>
                        <div>
                            Stay motivated with our comprehensive progress tracking features. LearningApp provides real-time insights into your quiz performance, highlighting areas for improvement and celebrating your achievements. Whether you're aiming to master a subject or preparing for an exam, our tracking tools keep you informed and motivated on your learning journey.
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </>
     );
}