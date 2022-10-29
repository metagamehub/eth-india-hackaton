import { Auth } from './auth/Auth'
import {Dashboard} from './dashboard/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />,
    },
    { path: '/dashboard',
  element:<Dashboard/> },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
