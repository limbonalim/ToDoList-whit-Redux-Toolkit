import React, {PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {

}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className="container">
      <form>
        <div className="input-group my-3 w-50">
          <input
            className="form-control"
            placeholder="Title"
          />
          <button
            className="btn btn-outline-success"
            type="button"
          >Add
          </button>
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