import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app/App';
import Error from './error/Error';
import Landing from './auth/Landing';
import Suitcase from './suitcase/Suitcase';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyCkGzYPNnBN1wgojYpMlid9S3yvDU52BsY",
  authDomain: "voyagr-59d3e.firebaseapp.com",
  databaseURL: "https://voyagr-59d3e.firebaseio.com",
  projectId: "voyagr-59d3e",
  storageBucket: "voyagr-59d3e.appspot.com",
  messagingSenderId: "903756024411",
  appId: "1:903756024411:web:11c69bb6e537dd6a214d7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Landing/>,
      },
      {
        path: "/suitcase",
        element: <Suitcase/>,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
