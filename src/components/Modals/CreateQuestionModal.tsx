import { useEffect, useState } from 'react';
import { IDialogHandle } from '../../interfaces/IDialogHandle';
import Dialog from '@mui/material/Dialog/Dialog';
import Button from '@mui/material/Button/Button';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogActions from '@mui/material/DialogActions/DialogActions';

const CreateQuestionModal: React.FC<IDialogHandle> = ({isOpen, onDialogCancel, onDialogSubmit}) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        onDialogCancel();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onDialogSubmit();
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add Question</DialogTitle>
            <DialogContent>
                {/* Add the form here */}
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={handleClose} >Cancel</Button>
              <Button color='primary' type='submit'>Submit</Button>
            </DialogActions>
          </form>
        </Dialog>  
      );
};

export default CreateQuestionModal;