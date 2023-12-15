import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Dialog, DialogActions, DialogTitle} from '@mui/material';
import {cancelIsDeleting, closeModal, ToDoState} from '../../containers/Layout/ToDoSlice';
import {RootState} from '../../app/store';
import {deleteTaskFromToDo, fetchToDo} from '../../containers/Layout/ToDoThunks';


const DeletingModal = () => {
  const state: ToDoState = useSelector((state: RootState) => state.toDo);
  const dispatch: RootState = useDispatch();

  const handleDelete = async () => {
    dispatch(closeModal());
    if (state.currentDeletingTask.id) {
      await dispatch(deleteTaskFromToDo(state.currentDeletingTask.id));
      dispatch(fetchToDo());
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
    dispatch(cancelIsDeleting());
  };

  return (
    <Dialog
      open={state.isOpenModal}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        {'Are you sure you want to delete?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleCancel} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletingModal;