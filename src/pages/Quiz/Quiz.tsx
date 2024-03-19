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
import { EAnswerStyle } from '../../enum/EAnswerStyle';
import UserProgressService from '../../services/UserProgressService';
import { EQuizDifficultyLevel } from '../../enum/EQuizDifficultyLevel';

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

type AnswersStyle = {
    a: EAnswerStyle;
    b: EAnswerStyle;
    c: EAnswerStyle;
    d: EAnswerStyle;
 }

const Quiz: FC = () => {
    const [questions, setQuestions] = useState<QuestionDto[] | null>(null);
    const [answerChecked, setAnswerChecked] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<null | 'a' | 'b' | 'c' | 'd'>(null);
    const [answerStyle, setAnswerStyle] = useState<AnswersStyle>({
        a: EAnswerStyle.None,
        b: EAnswerStyle.None,
        c: EAnswerStyle.None,
        d: EAnswerStyle.None,
    });

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

    const resetAnswerStyle = () => {
        setAnswerStyle({
            a: EAnswerStyle.None,
            b: EAnswerStyle.None,
            c: EAnswerStyle.None,
            d: EAnswerStyle.None,
        });
    };

    const selectAnswer = (answer: 'a' | 'b' | 'c' | 'd') => {
        if (answerChecked) return;

        resetAnswerStyle();

        if (selectedAnswer === answer) {
            setSelectedAnswer(null);
            return;
        }

        setSelectedAnswer(answer);
        setAnswerStyle((prev) => {
            return {
                ...prev,
                [answer]: EAnswerStyle.SelectedAnswer,
            };
        });
    };

    const completeQuiz = () => {
        if (!categoryId || !level) return;

        const category = parseInt(categoryId);
        const expGained = 5; //TODO: calculate exp gained based on quiz difficulty level and correct answered
        const lvl = EQuizDifficultyLevel.get(parseInt(level))

        if (!lvl) return;

        UserProgressService.CompleteQuiz(category, lvl, expGained).then((response) => {
            alert('Quiz completed');
            console.log(response.data);
        });
    };

    const showNextQuestion = () => {
        if (currentQuestion < (questions?.length ?? 0) - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            completeQuiz();
        }
        resetAnswerStyle();
        setSelectedAnswer(null);
        setAnswerChecked(false);
    };

    const handleNext = () => {
        if (answerChecked) {
            showNextQuestion();
        } else {
            checkAnswer();
            setAnswerChecked(true);
        }
    };

    const checkAnswer = () => {
        if (selectedAnswer === questions?.[currentQuestion].correctAnswer) {
            setAnswerStyle((prev) => {
                return {
                    ...prev,
                    [selectedAnswer as 'a' | 'b' | 'c' | 'd']: EAnswerStyle.CorrectAnswer,
                };
            });
        } else {
            setAnswerStyle((prev) => {
                return {
                    ...prev,
                    [selectedAnswer as 'a' | 'b' | 'c' | 'd']: EAnswerStyle.WrongAnswer,
                    [questions?.[currentQuestion].correctAnswer as 'a' | 'b' | 'c' | 'd']: EAnswerStyle.CorrectAnswer,
                };
            });
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
                            <Answer onClick={() => selectAnswer("a")} className={answerStyle.a}>
                                <b>1. </b>
                                {questions?.[currentQuestion].a}
                            </Answer>
                        </Grid>
                        <Grid item xs={6}>
                            <Answer onClick={() => selectAnswer("b")} className={answerStyle.b}>
                                <b>2. </b>
                                {questions?.[currentQuestion].b}
                            </Answer>
                        </Grid>
                        <Grid item xs={6}>
                            <Answer onClick={() => selectAnswer("c")} className={answerStyle.c}>
                                <b>3. </b>
                                {questions?.[currentQuestion].c}
                            </Answer>
                        </Grid>
                        <Grid item xs={6}>
                            <Answer onClick={() => selectAnswer("d")} className={answerStyle.d}>
                                <b>4. </b>
                                {questions?.[currentQuestion].d}
                            </Answer>
                        </Grid>

                        <Grid item xs={12} mt={3}>
                            <Divider/>
                            <Box mt={3} sx={{display: 'flex', justifyContent: 'end'}}>
                                <Button disabled={selectedAnswer === null} variant='contained' color='primary' disableElevation onClick={handleNext}>
                                    Next
                                </Button>
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