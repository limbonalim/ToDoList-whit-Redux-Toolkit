import React from 'react';

interface Props {
  title: string;
  isDone: boolean;
}

const MemoTask: React.FC<Props> = React.memo(function Task({title, isDone}) {
  const handleChange = () => {
    console.log('change');
  };

  const handleDelete = () => {
    console.log('deleting');
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