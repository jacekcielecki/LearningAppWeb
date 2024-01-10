import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { createCategory } from '../../Services/CategoryService';
import { Alert, Snackbar } from '@mui/material';
import { CreateCategoryRequest } from '../../Models/Category/CreateCategoryRequest';

export default function CreateCategoryModal() {
  const [snackbarState, setSnackbarState] = React.useState({
    visible: false,
    message: '',
    severity: 'success'
  });
  const [open, setOpen] = React.useState(false);
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
      setName('');
      setDescription('');
      setSnackbarState({...snackbarState, message: 'New category created succesfully!', visible: true, severity: 'success'});
    }else{
      setSnackbarState({...snackbarState, message: 'Something went wrong', visible: true, severity: 'danger'});
    }

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHideSnackbar = () => {
    setSnackbarState({...snackbarState, visible: false});
  };
  
  return (
    <div>
      <Button variant="contained" className='btn-orange' size='medium' startIcon={<AddIcon />} onClick={handleClickOpen}>
            Create
        </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create category</DialogTitle>
          <DialogContent>
            <TextField autoFocus value={name} onChange={event => {setName(event.target.value);}} margin="dense" id="name" label="Name" type="text" fullWidth variant="standard"/>
            <TextField value={description} onChange={event => {setDescription(event.target.value);}} margin="dense" id="description" label="Description" type="text" fullWidth variant="standard"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpen(false)}}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={snackbarState.visible} autoHideDuration={2000} onClose={handleHideSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={handleHideSnackbar} variant="filled" severity="success" sx={{ width: '100%' }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
}