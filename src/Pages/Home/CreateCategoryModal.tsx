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

export default function CreateCategoryModal() {
  const [open, setOpen] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSubmit = async () => {
    const newCategory = ({
      name: name,
      description: description,
      iconUrl: '',
      questionsPerLesson: 5,
      quizPerLevel: 5
    });

    const result = await createCategory(newCategory);
    if(result !== null){
      setName('');
      setDescription('');
      setSnackbarMessage("New category created succesfully!");
      setSnackbarVisible(true);
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
    setSnackbarVisible(false);
  };
  
  return (
    <div>
      <Button variant="contained" size='small' startIcon={<AddIcon />} onClick={handleClickOpen}>
            Create
        </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
        <DialogTitle>Create category</DialogTitle>
        <DialogContent>
          <TextField autoFocus value={name} onChange={event => {setName(event.target.value);}} margin="dense" id="name" label="Name" type="text" fullWidth variant="standard"/>
          <TextField value={description} onChange={event => {setDescription(event.target.value);}} margin="dense" id="description" label="Description" type="text" fullWidth variant="standard"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarVisible} autoHideDuration={6000} onClose={handleHideSnackbar}>
        <Alert onClose={handleHideSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}