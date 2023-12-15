import {useDispatch, useSelector} from 'react-redux';
import {JSX, ReactNode, useEffect, useState} from 'react';
import {Alert, CircularProgress} from '@mui/material';
import Layout from './containers/Layout/Layout';
import MemoTask from './components/Task/Task';
import {fetchToDo} from './containers/Layout/ToDoThunks';
import {RootState} from './app/store';
import {closeError, ToDoState} from './containers/Layout/ToDoSlice';
import DeletingModal from './components/DeletingModal/DeletingModal';

const App = () => {
  const state: ToDoState = useSelector((state: RootState) => state.toDo);
  const dispatch: RootState = useDispatch();
  const [tasks, setTasks] = useState<ReactNode[]>([]);

  useEffect(() => {
    dispatch(fetchToDo());
  }, [dispatch]);

  useEffect(() => {
    setTasks(state.list.map((task) => (
      <MemoTask
        key={task.id}
        id={task.id}
        title={task.title}
        isDone={task.isDone}
        isDeleting={task.isDeleting}
      />)));
  }, [state.list]);

  const loading = (
    <div className="d-flex justify-content-center my-3"><CircularProgress color="success"/></div>
  );

  const error = (
    <Alert
      severity="error"
      onClose={() => dispatch(closeError())}
    >{state.errorMessage}</Alert>
  );

  let list: JSX.Element | ReactNode[] = tasks;

  if (tasks.length === 0) {
    list = (<p className="text-secondary text-center fs-4">Ops there's nothing</p>);
  }

  return (
    <>
      <DeletingModal></DeletingModal>
      {state.isError ? error : null}
      <Layout>
        {state.isLoading ? loading : list}
      </Layout>
    </>
  );
};

export default App;
