import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CategoryService from '../../services/CategoryService';
import { IDialogHandle } from '../../interfaces/IDialogHandle';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateCategoryRequest from '../../interfaces/Category/CreateCategoryRequest';

const schema = yup.object({
  name: yup.string().required("Please fill in category name").min(1, "Name is too short").max(40, "Name must be at most 40 characters"),
  description: yup.string().required("Please fill in category description").max(140, "Description must be at most 140 characters"),
  iconUrl: yup.string().notRequired(),
  questionsPerQuiz: yup.number().integer().required("Questions per quiz must be at least 5").min(5, "Questions per quiz must be at least 5").max(20, "Questions per quiz must be at most 20"),
  quizPerLevel: yup.number().integer().required("Quiz per level must be at least 2").min(2, "Quiz per level must be at least 2").max(5, "Quiz per level must be at most 5")
});

const CreateCategoryModal: React.FC<IDialogHandle> = ({isOpen, onDialogCancel, onDialogSubmit}) => {

  const form = useForm<CreateCategoryRequest>({
    defaultValues: { name: "", description: "", iconUrl: "", questionsPerQuiz: 10, quizPerLevel: 5 },
    resolver: yupResolver(schema) as any,
    mode: 'onChange'
  });
  const { register, handleSubmit, reset, formState: {errors, isSubmitSuccessful} } = form;

  const onSubmit = async (form : CreateCategoryRequest) => {
    CategoryService.Create(form).then(() => {
      onDialogSubmit();
    });
  };

  const onCancel = () => {
    onDialogCancel();
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth={true} maxWidth='sm'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create category</DialogTitle>
        <DialogContent>

          <TextField 
            autoFocus
            {...register("name")}
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField 
            {...register("description")} 
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            error={!!errors.description} 
            helperText={errors.description?.message}
          />

          <TextField 
            autoFocus
            {...register("questionsPerQuiz")}
            sx={{mt: 2}}
            margin="dense"
            id="questionsPerQuiz"
            label="Questions per quiz"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.questionsPerQuiz}
            helperText={errors.questionsPerQuiz?.message}
          />

          <TextField
            autoFocus
            {...register("quizPerLevel")}
            margin="dense"
            id="quizPerLevel"
            label="Quiz per level"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.quizPerLevel}
            helperText={errors.quizPerLevel?.message}
          />
        
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={onCancel}>Cancel</Button>
          <Button color='primary' type='submit'>Submit</Button>
        </DialogActions>
      </form>
    </Dialog>  
  );
};

export default CreateCategoryModal;