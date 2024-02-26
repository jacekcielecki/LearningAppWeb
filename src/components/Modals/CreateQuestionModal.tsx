import { useEffect, useState } from 'react';
import { IDialogHandle } from '../../interfaces/IDialogHandle';
import Dialog from '@mui/material/Dialog/Dialog';
import Button from '@mui/material/Button/Button';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import CreateQuestionRequest from '../../interfaces/Question/CreateQuestionRequest';
import TextField from '@mui/material/TextField/TextField';
import FormControl from '@mui/material/FormControl/FormControl';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { Select, SelectChangeEvent } from '@mui/material';

const CreateQuestionModal: React.FC<IDialogHandle> = ({isOpen, onDialogCancel, onDialogSubmit}) => {
  
    const [open, setOpen] = useState(isOpen);
    const [createQuestionRequest, setCreateQuestionRequest] = useState<CreateQuestionRequest>({
      questionContent: '',
      imageUrl: '',
      a: '',
      b: '',
      c: '',
      d: '',
      correctAnswer: '',
      level: 1
    });

    const clearInputValues = () => {
      setCreateQuestionRequest({
        questionContent: '',
        imageUrl: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correctAnswer: '',
        level: 1
      });
    };

    const handleClose = () => {
        clearInputValues();
        onDialogCancel();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onDialogSubmit();
        clearInputValues();
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add Question</DialogTitle>
            <DialogContent>

              <TextField autoFocus value={createQuestionRequest.questionContent} size='small' multiline rows={3} margin="dense" id="questionContent" label="Question" type="text" fullWidth variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCreateQuestionRequest({...createQuestionRequest, questionContent: event.target.value });}}/>
              <TextField value={createQuestionRequest.a} sx={{mt: 3}} size='small' margin="dense" id="a" label="Answer A" type="text" fullWidth variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCreateQuestionRequest({...createQuestionRequest, a: event.target.value });}}/>
              <TextField value={createQuestionRequest.b} size='small' margin="dense" id="b" label="Answer B" type="text" fullWidth variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCreateQuestionRequest({...createQuestionRequest, b: event.target.value });}}/>
              <TextField value={createQuestionRequest.c} size='small' margin="dense" id="c" label="Answer C" type="text" fullWidth variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCreateQuestionRequest({...createQuestionRequest, c: event.target.value });}}/>
              <TextField value={createQuestionRequest.d} size='small' margin="dense" id="d" label="Answer D" type="text" fullWidth variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setCreateQuestionRequest({...createQuestionRequest, d: event.target.value });}}/>

              <FormControl fullWidth sx={{mt: 3}} size='small'>
                <InputLabel id="correct-answer-input-label">Correct answer</InputLabel>
                <Select
                  labelId="correct-answer-label"
                  id="correct-answer"
                  value={createQuestionRequest.correctAnswer}
                  label="Correct answer"
                  onChange={(event: SelectChangeEvent) => {
                  setCreateQuestionRequest({...createQuestionRequest, correctAnswer: event.target.value});}}
                >
                  <MenuItem value={'a'}>A</MenuItem>
                  <MenuItem value={'b'}>B</MenuItem>
                  <MenuItem value={'c'}>C</MenuItem>
                  <MenuItem value={'c'}>D</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{mt: 2}} size='small'>
                <InputLabel id="difficulty-level-input-label">Difficulty level</InputLabel>
                <Select
                  labelId="difficulty-level-label"
                  id="difficulty-level"
                  value={createQuestionRequest.level}
                  label="Correct answer"
                  onChange={(event: SelectChangeEvent<number>) => {
                  setCreateQuestionRequest({...createQuestionRequest, level: 
                  +event.target.value });}}
                >
                  <MenuItem value={1}>Easy</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>Hard</MenuItem>
                </Select>
              </FormControl>

            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={handleClose}>Cancel</Button>
              <Button color='primary' type='submit'>Submit</Button>
            </DialogActions>
          </form>
        </Dialog>  
      );
};

export default CreateQuestionModal;