import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CategoryService from '../../services/CategoryService';
import CreateCategoryRequest from '../../interfaces/Category/CreateCategoryRequest';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onDialogCancel: (...args: any[]) => any;
  onDialogSubmit: (...args: any[]) => any;
}

const CATEGORY_NAME_MAX_LENGTH = 20;
const CATEGORY_DESCRIPTION_MAX_LENGTH = 100;

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = (props) => {
  const [category, setCategory] = useState<CreateCategoryRequest>({
    name: '',
    description: '',
    iconUrl: '',
    questionsPerQuiz: 5,
    quizPerLevel: 5
  });
  const [open, setOpen] = useState(props.isOpen);
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameError || descriptionError) {
      // Do not submit if there is a validation error
      return;
    }
    const createSuccess = await CategoryService.Create(category);
    if (createSuccess) {
      props.onDialogSubmit();
    } else {
      props.onDialogCancel();
    }
  };

  const handleClose = () => {
    props.onDialogCancel();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setCategory((prevCategory) => ({ ...prevCategory, name: newName }));

    // Validate the name length
    if (newName.length > CATEGORY_NAME_MAX_LENGTH) {
      setNameError(`Name must be at most ${CATEGORY_NAME_MAX_LENGTH} characters`);
    }
    else if(newName.length === 0){
      setNameError('Name cannot be empty');
    } 
    else {
      setNameError(null);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescritpion = e.target.value;
    setCategory((prevCategory) => ({ ...prevCategory, description: newDescritpion }));

    // Validate the descritpion length
    if (newDescritpion.length > CATEGORY_DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(`Description must be at most ${CATEGORY_DESCRIPTION_MAX_LENGTH} characters`);
    }
    else {
      setDescriptionError(null);
    }
  };

  useEffect(() => {
    setOpen(props.isOpen);
    setNameError(null);
    setDescriptionError(null);
    setCategory({...category, name: '', description: ''})
  }, [props.isOpen]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create category</DialogTitle>
        <DialogContent>
          <TextField autoFocus value={category.name} margin="dense" id="name" label="Name" type="text" fullWidth variant="outlined" 
              onChange={handleNameChange} error={!!nameError} helperText={nameError}/>
          <TextField value={category.description} sx={{mt: 2}} margin="dense" id="description" label="Description" type="text" fullWidth variant="outlined" multiline rows={3}
              onChange={handleDescriptionChange} error={!!descriptionError} helperText={descriptionError}/>
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
