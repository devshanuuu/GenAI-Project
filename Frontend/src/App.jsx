import {RouterProvider} from 'react-router' // RouterProvider is used to provide the router instance to the application
import {router} from './app.routes.jsx'

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
