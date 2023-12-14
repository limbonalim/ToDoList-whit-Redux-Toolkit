import MemoTask from './components/Task/Task';
import Layout from './containers/Layout/Layout';

const App = () => {


  return (
    <Layout>
      <MemoTask title="Title" isDone={true}/>
    </Layout>
  );
};

export default App;
