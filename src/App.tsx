import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import Layout from './containers/Layout/Layout';
import MemoTask from './components/Task/Task';
import {fetchToDo} from './containers/Layout/ToDoThunks';
import {RootState} from './app/store';
import {ToDoState} from './containers/Layout/ToDoSlice';

const App = () => {
  const state: ToDoState = useSelector((state: RootState) => state.toDo);
  const dispatch: RootState = useDispatch();


  useEffect(() => {
    dispatch(fetchToDo());
  }, [dispatch]);

  console.log(state.list);
  const tasks = state.list.map((task) => (
    <MemoTask
      key={task.id}
      title={task.title}
      isDone={task.isDone}
    />))

  return (
    <Layout>
      {tasks}
    </Layout>
  );
};

export default App;
