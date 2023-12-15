import React from 'react';
import {useDispatch} from 'react-redux';
import {RootState} from '../../app/store';
import {changeOldTaskInToDo, deleteTaskFromToDo, fetchToDo} from '../../containers/Layout/ToDoThunks';

interface Props {
  id: string;
  title: string;
  isDone: boolean;
}

const MemoTask: React.FC<Props> = React.memo(function Task({id, title, isDone}) {
  const dispatch: RootState = useDispatch();

  const handleChange = async () => {
    await dispatch(changeOldTaskInToDo(id));
    dispatch(fetchToDo());
  };

  const handleDelete = async () => {
    await dispatch(deleteTaskFromToDo(id));
    dispatch(fetchToDo());
  };

  return (
    <div className="d-flex justify-content-between border border-2 rounded p-3">
      {title}
      <div className="d-flex gap-3 align-items-center">
        <button
          className="btn btn-outline-danger"
          onClick={handleDelete}
        >Delete
        </button>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isDone}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
});

export default MemoTask;