import React from 'react';
import './NotFound.css'; 
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark dark:text-light">
      <div className="container text-center " style={{padding: "16.5rem"}}>
        <p className="not-found-number">404</p>
        <div className="space-y-2">
          <h1 id="pageTitle" className="page-title">
            Oops! Page not found.
          </h1>
          <p className="text-base font-normal text-gray-600 dark:text-gray-300">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/" // Use `to` instead of `href`
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Return to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
