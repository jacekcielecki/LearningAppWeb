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
import React from 'react';
import CategoryService from '../../services/CategoryService';
import CreateCategoryModal from '../../components/Modals/CreateCategoryModal';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { CategoryDto } from '../../interfaces/Category/CategoryDto';
import CreateQuestionModal from '../../components/Modals/CreateQuestionModal';
import { PlayArrow } from '@mui/icons-material';

export const Dashboard = () => {
    const [snackbar, setSnackbar] = React.useState({
        visible: false,
        message: '',
        severity: 'success'
      });
    const [categories, setCategories] = useState<CategoryDto[] | null>(null);
    const [categoryId, setCategoryId] = useState<number>(0);

    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = React.useState<boolean>(false);
    const [createCategoryModalIsOpen, setCreateCategoryModalIsOpen] = React.useState<boolean>(false);
    const [createQuestionModalOpen, setCreateQuestionModalOpen] = React.useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        CategoryService.GetAll().then((response) => {
            setCategories(response.data);
        });
    };

    async function handleDelete(categoryId : number) {
        setCategoryId(categoryId);
        setConfirmationModalIsOpen(true);
    }

    const handleConfirmationDialogSubmit = async () => {
        await CategoryService.Delete(categoryId);
        setSnackbar({...snackbar, message: 'Category deleted sucesfully', visible: true, severity: 'success'});
        fetchCategories();
        setConfirmationModalIsOpen(false);
    };

    const handleConfirmationDialogCancel = () => {
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

    const showCreateQuestionModal = (categoryId: number) => {
        setCategoryId(categoryId);
        setCreateQuestionModalOpen(true);
    };

    const handleCreateQuestionModalSubmit = () => {
        setCreateQuestionModalOpen(false);
        setSnackbar({...snackbar, visible: true, message: 'New question added succesfully', severity: 'success'});
        fetchCategories();
    };

    const handleCreateQuestionModalCancel = () => {
        setCreateQuestionModalOpen(false);
    };
    
    return (
        <>
            <CreateQuestionModal categoryId={categoryId} isOpen={createQuestionModalOpen} onDialogSubmit={handleCreateQuestionModalSubmit} onDialogCancel={handleCreateQuestionModalCancel} />
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
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Created Questions</TableCell>
                        <TableCell align="left">Author</TableCell>
                        <TableCell align="right">Play</TableCell>
                        <TableCell align="right">Delete</TableCell>
                        <TableCell align="right">Add Question</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {categories?.map((category) => (
                        <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{width: 130, overflow: 'hidden'}} align="left" component="th" scope="row">{category.id}</TableCell>
                            <TableCell sx={{width: 200, overflow: 'hidden'}} align="left"><b>{category.name}</b></TableCell>
                            <TableCell sx={{width: 300, overflow: 'hidden'}} align="left">{category.description}</TableCell>
                            <TableCell sx={{width: 200, overflow: 'hidden', fontSize: 14}} align="left">
                                {`Easy: ${category.questions.filter(q => q.level === 1).length}/${category.quizPerLevel}`} <br/>
                                {`Medium: ${category.questions.filter(q => q.level === 2).length}/${category.quizPerLevel}`} <br/>
                                {`Hard: ${category.questions.filter(q => q.level === 3).length}/${category.quizPerLevel}`}
                            </TableCell>
                            <TableCell sx={{width: 160, overflow: 'hidden'}} align="left">{category.creator?.emailAddress}</TableCell>

                            <TableCell align="right">
                                <Tooltip title="Start quiz" arrow placement="bottom">
                                    <IconButton aria-label="start quiz">
                                        <PlayArrow />
                                    </IconButton>                        
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Delete category" arrow placement="bottom">
                                    <IconButton aria-label="delete" onClick={() => handleDelete(category.id)}>
                                        <DeleteIcon />
                                    </IconButton>                        
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Add Question" arrow placement="bottom">
                                    <IconButton aria-label="add question" onClick={() => showCreateQuestionModal(category.id)}>
                                        <AddIcon />
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