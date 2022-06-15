import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};