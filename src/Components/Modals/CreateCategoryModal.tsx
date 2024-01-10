import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createCategory } from '../../Services/CategoryService';
import { CreateCategoryRequest } from '../../Models/Category/CreateCategoryRequest';
import { lapTheme } from '../../theme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onDialogCancel: () => void;
  onDialogSubmit: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = (props) => {
  const [category, setCategory] = useState<CreateCategoryRequest>({
    name: '',
    description: '',
    iconUrl: '',
    questionsPerQuiz: 5,
    quizPerLevel: 5
  });
  const [open, setOpen] = useState(props.isOpen);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createSuccess = await createCategory(category);
    if (createSuccess) {
      props.onDialogSubmit();
    } else {
      props.onDialogCancel();
    }
  };

  const handleClose = () => {
    props.onDialogCancel();
  };

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create category</DialogTitle>
        <DialogContent>
          <TextField autoFocus value={category.name} margin="dense" id="name" label="Name" type="text" fullWidth variant="outlined" onChange={(e) =>
              setCategory((prevCategory) => ({...prevCategory, name: e.target.value}))}/>
          <TextField value={category.description} sx={{mt: 2}} margin="dense" id="description" label="Description" type="text" fullWidth variant="outlined" multiline rows={3}
              onChange={(e) => setCategory((prevCategory) => ({...prevCategory, description: e.target.value}))}/>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose} >Cancel</Button>
          <Button color='primary' type='submit'>Submit</Button>
        </DialogActions>
      </form>
    </Dialog>  
  );
};

export default CreateCategoryModal;
