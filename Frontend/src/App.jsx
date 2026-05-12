import {RouterProvider} from 'react-router' // RouterProvider is used to provide the router instance to the application
import {router} from './app.routes.jsx'
import {AuthProvider} from './features/auth/auth.context.jsx' 

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
