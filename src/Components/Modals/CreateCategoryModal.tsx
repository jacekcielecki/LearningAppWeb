import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createCategory } from '../../Services/CategoryService';
import { CreateCategoryRequest } from '../../Models/Category/CreateCategoryRequest';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onDialogCancel: () => void;
  onDialogSubmit: () => void;
}

const CreateCategoryModal : React.FC<CreateCategoryModalProps> = (props) => {
  const [open, setOpen] = React.useState(props.isOpen);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory : CreateCategoryRequest = ({
      name: name,
      description: description,
      iconUrl: '',
      questionsPerQuiz: 5,
      quizPerLevel: 5
    });

    const createSuccess = await createCategory(newCategory);
    if(createSuccess){
      props.onDialogSubmit();
    }else{
      props.onDialogCancel();
    }
  };

  const handleClose = () => {
    props.onDialogCancel();
  };

  React.useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);
  
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create category</DialogTitle>
          <DialogContent>
            <TextField autoFocus value={name} onChange={event => {setName(event.target.value);}} margin="dense" id="name" label="Name" type="text" fullWidth variant="standard"/>
            <TextField value={description} onChange={event => {setDescription(event.target.value);}} margin="dense" id="description" label="Description" type="text" fullWidth variant="standard"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CreateCategoryModal;