import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import ProgressBar from './ProgressBar';
import { useEffect, useState, FC } from 'react';
import QuestionDto from '../../interfaces/Question/QuestionDto';
import QuestionService from '../../services/QuestionService';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

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

    useEffect(() => {
        fetchQuestions();
    }, []);

  return (
    <>
        {(questions && questions.length > 0) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
            <Box sx={{ width: '80%', maxWidth: '1400px', display: 'flex', padding: '12px' }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={12}>
                        <ProgressBar questionsCount={questions?.length} currentQuestion={1} />
                    </Grid>

                    <Grid item xs={12}>
                        <h2>Select the correct answer</h2>
                        <Typography>{questions?.[0].questionContent}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Answer>
                            <b>1. </b>
                            {questions?.[0].a}
                        </Answer>
                    </Grid>
                    <Grid item xs={6}>
                        <Answer>
                            <b>2. </b>
                            {questions?.[0].b}
                        </Answer>
                    </Grid>
                    <Grid item xs={6}>
                        <Answer>
                            <b>3. </b>
                            {questions?.[0].c}
                        </Answer>
                    </Grid>
                    <Grid item xs={6}>
                        <Answer>
                            <b>4. </b>
                            {questions?.[0].d}
                        </Answer>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        )}
    </>
  );
}

export default Quiz;