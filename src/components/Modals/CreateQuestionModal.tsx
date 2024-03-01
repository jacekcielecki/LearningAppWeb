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
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  questionContent: yup.string().required("Please fill in your question"),
  imageUrl: yup.string().trim().nullable().notRequired(),
  a: yup.string().required("Please fill in possible answer a"),
  b: yup.string().required("Please fill in possible answer b"),
  c: yup.string().required("Please fill in possible answer c"),
  d: yup.string().required("Please fill in possible answer d"),
  // correctAnswer: yup.string().required().oneOf(["a", "b", "c", "d"], "Invalid answer selected"),
  // level: yup.number().required().min(1).max(3),
});

const CreateQuestionModal: React.FC<IDialogHandle> = ({isOpen, onDialogCancel, onDialogSubmit}) => {

    const form = useForm<CreateQuestionRequest>({
      defaultValues: {
        questionContent: "",
        imageUrl: "",
        a: "",
        b: "",
        c: "",
        d: "",
        // correctAnswer: "a",
        // level: 1
      },
      resolver: yupResolver(schema) as any,
      mode: 'onChange'
    });
    const { register, handleSubmit, reset, formState: {errors, isSubmitSuccessful} } = form;

    const handleClose = () => {
      onDialogCancel();
      reset();
    };

    const onSubmit = async (form : CreateQuestionRequest) => {
      console.log("Form submited successfully", form);
      onDialogSubmit();
    };

    useEffect(() => {
      if (isSubmitSuccessful) {
        reset();
        console.log("Form submitted successfully");
      }
  }, [isSubmitSuccessful, reset]);

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth='sm'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add Question</DialogTitle>
            <DialogContent>

              <TextField error={!!errors.questionContent} helperText={errors.questionContent?.message} {...register("questionContent")} 
                autoFocus size='small' multiline rows={3} margin="dense" id="questionContent" label="Question" type="text" fullWidth variant="outlined"/>          
              <TextField error={!!errors.a} helperText={errors.a?.message} {...register("a")} sx={{mt: 3}} size='small' margin="dense" id="a" label="Answer A" type="text" fullWidth variant="outlined"/>
              <TextField error={!!errors.b} helperText={errors.b?.message} {...register("b")}  size='small' margin="dense" id="b" label="Answer B" type="text" fullWidth variant="outlined"/>
              <TextField error={!!errors.c} helperText={errors.c?.message} {...register("c")}  size='small' margin="dense" id="c" label="Answer C" type="text" fullWidth variant="outlined"/>
              <TextField error={!!errors.d} helperText={errors.d?.message} {...register("d")} size='small' margin="dense" id="d" label="Answer D" type="text" fullWidth variant="outlined"/>

              {/* <TextField error={!!errors.imageUrl} helperText={errors.imageUrl?.message} {...register("imageUrl")} size='small' margin="dense" id="d" label="Answer D" type="text" fullWidth variant="outlined"/> */}


              {/* <FormControl fullWidth sx={{mt: 3}} size='small'>
                <InputLabel id="correct-answer-input-label">Correct answer</InputLabel>
                <Select
                  {...register("correctAnswer")}
                  labelId="correct-answer-label"
                  id="correct-answer"
                  label="Correct answer"
                >
                  <MenuItem value={'a'}>A</MenuItem>
                  <MenuItem value={'b'}>B</MenuItem>
                  <MenuItem value={'c'}>C</MenuItem>
                  <MenuItem value={'d'}>D</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{mt: 2}} size='small'>
                <InputLabel id="difficulty-level-input-label">Difficulty level</InputLabel>
                <Select
                  {...register("level")}
                  labelId="difficulty-level-label"
                  id="difficulty-level"
                  label="Correct answer"
                >
                  <MenuItem value={1}>Easy</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>Hard</MenuItem>
                </Select>
              </FormControl> */}

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