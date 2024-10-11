import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    loading && (
      <div className="loader-parent">
        <div className="loader" role="status">
          
        </div>
      </div>
    )
  );
};

export default Loader;