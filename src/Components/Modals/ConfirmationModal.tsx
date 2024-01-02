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
    onCancel: () => void;
  }

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);

    useEffect(() => {
        setIsOpen(props.isOpen);
      }, [props.isOpen]);

    const handleCancel = () => {
        props.onCancel(); 
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={handleCancel} fullWidth={true} maxWidth='sm'>
            <DialogTitle>{props.header}</DialogTitle>
            <DialogContent>
                {props.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type='submit'>Submit</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmationModal;