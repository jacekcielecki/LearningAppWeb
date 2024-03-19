import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import ProgressBar from './ProgressBar';
import { useEffect, useState, FC } from 'react';
import QuestionDto from '../../interfaces/Question/QuestionDto';
import QuestionService from '../../services/QuestionService';
import { Button, Divider, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseOutlined } from '@mui/icons-material';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';

const Answer = styled(Paper)(({}) => ({
  backgroundColor: '#fff',
  padding: '18px',
  textAlign: 'left',
  color: grey[800],
  overflow: 'hidden',
  border: '1px solid',
  borderColor: grey[300],
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '400',
  boxShadow: 'none'
}));

const Quiz: FC = () => {
    const [questions, setQuestions] = useState<QuestionDto[] | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
    const { categoryId } = useParams();
    const { level } = useParams();
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        if (categoryId && level) {
            QuestionService.GetQuiz(parseInt(categoryId), 1).then((response) => {
                if (response.data === null || response.data.length === 0) {
                    navigate('/not found');
                } else {
                    setQuestions(response.data);
                }
            })
        }
    };

    const handleQuit = () => {
        setConfirmationModalOpen(false);
        navigate('/dashboard');
    };

    const nextQuestion = () => {
        if (questions === null) return;
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert('Quiz finished');
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

  return (
    <>
        <ConfirmationModal 
            header='Are you sure you want to quit?'
            content="Your progress won't be saved"
            isOpen={confirmationModalOpen}
            onDialogCancel={() => setConfirmationModalOpen(false)}
            onDialogSubmit={handleQuit}
        />
        
        {(questions && questions.length > 0) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '120px', marginBottom: '-60px' }}>
                <Box sx={{ width: '80%', maxWidth: '1400px', display: 'flex', padding: '20px', backgroundColor: '#fafaff', borderRadius: "20px" }}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '99%' }}>
                                    <ProgressBar questionsCount={questions?.length} currentQuestion={currentQuestion + 1} />
                                </Box>
                                <Box sx={{ marginTop: 1, marginLeft: 2 }}>
                                    <CloseOutlined sx={{ cursor: 'pointer' }} onClick={() => setConfirmationModalOpen(true)} />
                                </Box>
                            </Grid>

                        <Grid item xs={12}>
                            <h2>Select the correct answer</h2>
                            <Typography>{questions?.[currentQuestion].questionContent}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Answer>
                                <b>1. </b>
                                {questions?.[currentQuestion].a}
                            </Answer>
                        </Grid>
                        <Grid item xs={6}>
                            <Answer>
                                <b>2. </b>
                                {questions?.[currentQuestion].b}
                            </Answer>
                        </Grid>
                        <Grid item xs={6}>
                            <Answer>
                                <b>3. </b>
                                {questions?.[currentQuestion].c}
                            </Answer>
                        </Grid>
                        <Grid item xs={6}>
                            <Answer>
                                <b>4. </b>
                                {questions?.[currentQuestion].d}
                            </Answer>
                        </Grid>

                        <Grid item xs={12} mt={3}>
                            <Divider/>
                            <Box mt={3} sx={{display: 'flex', justifyContent: 'end'}}>
                                <Button variant='contained' color='primary' disableElevation onClick={nextQuestion}>Next</Button>
                            </Box>
                        </Grid>
                        
                    </Grid>
                </Box>
            </Box>
        )}
    </>
  );
}

export default Quiz;