import { CategoryDto } from '../../Models/Category/CategoryDto'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Box, Button, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateCategoryModal from '../../Components/Modals/CreateCategoryModal';
import React from 'react';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import CategoryService from '../../Services/CategoryService';

export const Dashboard = () => {
    const [snackbar, setSnackbar] = React.useState({
        visible: false,
        message: '',
        severity: 'success'
      });
    const [categories, setCategories] = useState<CategoryDto[] | null>(null);
    const [categoryToDeleteId, setcategoryToDeleteId] = useState<number | null>(null);
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = React.useState<boolean>(false);
    const [createCategoryModalIsOpen, setCreateCategoryModalIsOpen] = React.useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        const categories = await CategoryService.GetAll();
        setCategories(categories);
    };

    async function handleDelete(categoryId : number) {
        setcategoryToDeleteId(categoryId);
        setConfirmationModalIsOpen(true);
    }

    const handleConfirmationDialogSubmit = async () => {
        if(categoryToDeleteId !== null){
            await CategoryService.Delete(categoryToDeleteId);
            setSnackbar({...snackbar, message: 'Category deleted sucesfully', visible: true, severity: 'success'});
            fetchCategories();
        }
        setConfirmationModalIsOpen(false);
    };

    const handleConfirmationDialogCancel = () => {
        setcategoryToDeleteId(null);
        setConfirmationModalIsOpen(false);
    };

    const handleCreateCategoryModalSubmit = () => {
        setCreateCategoryModalIsOpen(false);
        setSnackbar({...snackbar, visible: true, message: 'New category created succesfully', severity: 'success'});
    };

    const handleCreateCategoryModalCancel = () => {
        setCreateCategoryModalIsOpen(false);
    };

    const handleHideSnackbar = () => {
        setSnackbar({...snackbar, visible: false});
    };

    const handleOpenCreateCategoryModal = () => {
        setCreateCategoryModalIsOpen(true);
    };

    return (
        <>
            <CreateCategoryModal isOpen={createCategoryModalIsOpen} onDialogSubmit={handleCreateCategoryModalSubmit} onDialogCancel={handleCreateCategoryModalCancel} />
            <ConfirmationModal isOpen={confirmationModalIsOpen} onDialogSubmit={handleConfirmationDialogSubmit} onDialogCancel={handleConfirmationDialogCancel} header={'Confirm delete'} content={'Are you sure you want to do this?'} />

            <Snackbar open={snackbar.visible} autoHideDuration={2000} onClose={handleHideSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleHideSnackbar} variant="filled" severity="success" sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <div>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                    <h2>Categories</h2>
                    <div>
                        <Button variant="contained" color='secondary' size='medium' startIcon={<AddIcon />} onClick={handleOpenCreateCategoryModal}>
                            Create
                        </Button>
                    </div>
                </Box>
            </div>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {categories?.map((category) => (
                        <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{category.id}</TableCell>
                        <TableCell align="right">{category.name}</TableCell>
                        <TableCell align="right">{category.description}</TableCell>
                        <TableCell align="right">
                            <Tooltip title="Delete category" arrow placement="bottom">
                                <IconButton aria-label="delete" onClick={() => handleDelete(category.id)}>
                                    <DeleteIcon />
                                </IconButton>                        
                            </Tooltip>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}