import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmationModalProps {
    header: string;
    content: string;
    isOpen: boolean;
    onDialogCancel: (...args: any[]) => any;
    onDialogSubmit: (...args: any[]) => any;
  }

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    useEffect(() => {
        setIsOpen(props.isOpen);
      }, [props.isOpen]);

    const handleDialogSubmit = (isCanceled : boolean) => {
        if(isCanceled){
            props.onDialogCancel();
        }else{
            props.onDialogSubmit();
        }
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={() => handleDialogSubmit(true)} fullWidth={true} maxWidth='sm'>
                <DialogTitle>{props.header}</DialogTitle>
                <DialogContent>
                    {props.content}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogSubmit(true)}>Cancel</Button>
                    <Button onClick={() => handleDialogSubmit(false)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmationModal;