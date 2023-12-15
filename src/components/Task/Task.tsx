import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {changeOldTaskInToDo, fetchToDo} from '../../containers/Layout/ToDoThunks';
import {openModal, setIsDeleting, ToDoState} from '../../containers/Layout/ToDoSlice';
import {DeletingTask} from '../../types';

interface Props {
  id: string;
  title: string;
  isDone: boolean;
  isDeleting: boolean;
}

const MemoTask: React.FC<Props> = React.memo(function Task({id, title, isDone, isDeleting}) {
  const dispatch: RootState = useDispatch();
  const state: ToDoState = useSelector((state: RootState) => state.toDo);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const handleChange = async () => {
    setIsChanging(true);
    await dispatch(changeOldTaskInToDo(id));
    dispatch(fetchToDo());
  };

  const handleDelete = async () => {
    const index: number = state.list.findIndex((task) => task.id === id);
    if (index >= 0) {
      const task: DeletingTask = {
        index,
        id
      };
      dispatch(setIsDeleting(task));
    }
    dispatch(openModal(id));
  };

  return (
    <div className="d-flex justify-content-between border border-2 rounded p-3">
      {title}
      <div className="d-flex gap-3 align-items-center">
        <button
          className="btn btn-outline-danger"
          onClick={handleDelete}
          disabled={isDeleting}
        >Delete
        </button>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isDone}
            onChange={handleChange}
            disabled={isChanging}
          />
        </div>
      </div>
    </div>
  );
});

export default MemoTask;