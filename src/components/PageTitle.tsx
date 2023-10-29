import React from 'react';
import Divider from './Divider';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className='my-3'>
      <h1 className='text-xl my-2'>
        <b>{title}</b>
      </h1>
      <Divider />
    </div>
  );
};

export default PageTitle;
