import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/Login"
import Signup from './components/Signup'
import Home from './components/Home'
import HistoryPage from './components/HistoryPage'

const App = () => {
  const myAppRouter = createBrowserRouter([
    {
      path : "/",
      element: <Login/>
    },
    {
      path : "/signup",
      element: <Signup/>
    },
    {
      path : "/home",
      element: <Home/>
    },
    {
      path : "/history",
      element: <HistoryPage/>
    }
  ])

  return <RouterProvider router={myAppRouter} ></RouterProvider>
}

export default App;
