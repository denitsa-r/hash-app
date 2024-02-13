import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Hash from "./views/Hash";
import Statistics from "./views/Statistics";
import History from "./views/History";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/hash"/>
      },
      {
        path: '/history',
        element: <History/>
      },
      {
        path: '/statistics',
        element: <Statistics/>
      },
      {
        path: '/hash',
        element: <Hash/>
      },
      // {
      //   path: '/users/new',
      //   element: <UserForm key="userCreate" />
      // },
      // {
      //   path: '/users/:id',
      //   element: <UserForm key="userUpdate" />
      // }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
