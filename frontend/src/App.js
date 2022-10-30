import { Auth } from './auth/Auth'
import {Dashboard} from './dashboard/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state/store'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />,
    },
    { path: '/dashboard',
  element:<Dashboard/> },
])

function App() {

    return <Provider store={store}><RouterProvider router={router} /></Provider>
}

export default App
