import React, {ChangeEvent, FormEvent, PropsWithChildren, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {change, refresh, ToDoState} from './ToDoSlice';
import {RootState} from '../../app/store';
import {addTaskInToDo, fetchToDo} from './ToDoThunks';

interface Props extends PropsWithChildren {

}

const Layout: React.FC<Props> = ({children}) => {
  const state: ToDoState = useSelector((state: RootState) => state.toDo);
  const dispatch: RootState = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    dispatch(change(value));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    await dispatch(addTaskInToDo());
    await dispatch(fetchToDo());
    dispatch(refresh());
    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="my-3 col-12 col-md-6">
          <div className="input-group ">
            <input
              onChange={onChange}
              value={state.task.title}
              className="form-control"
              placeholder="Title"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={isSubmitting}
            >Add
            </button>
          </div>
        </div>
      </form>
      <h1>To Do List:</h1>
      <div className="d-flex flex-column-reverse gap-2 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;