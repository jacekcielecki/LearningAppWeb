import { CategoryDto } from '../../Models/Category/CategoryDto'
import { useEffect, useState } from 'react';
import { getCategories } from '../../Services/CategoryService';
import { deleteCategory } from '../../Services/CategoryService';
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
import CreateCategoryModal from '../../Components/Modals/CreateCategoryModal';
import React from 'react';

export const Dashboard = () => {
    const [categories, setCategories] = useState<CategoryDto[] | null>(null);
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    useEffect(() => {
        getData();
    }, [handleDelete])

    async function getData() {
        const categories = await getCategories();
        setCategories(categories);
    }

    async function handleDelete(categoryId : number) {
        deleteCategory(categoryId);
        setSnackbarMessage('Category deleted sucesfully!');
        setSnackbarVisible(true);
    }

    const handleHideSnackbar = () => {
        setSnackbarVisible(false);
      };

    return (
        <>
            <div>
                <Box display="flex" justifyContent="space-between" sx={{ py: 1 }}>
                    <h2>Categories</h2>
                    <div><CreateCategoryModal /></div>
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

            <Snackbar open={snackbarVisible} autoHideDuration={6000} onClose={handleHideSnackbar}>
                <Alert onClose={handleHideSnackbar} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}