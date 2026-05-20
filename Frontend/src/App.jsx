import {RouterProvider} from 'react-router' // RouterProvider is used to provide the router instance to the application
import {router} from './app.routes.jsx'
import {AuthProvider} from './features/auth/auth.context.jsx' 
import { InterviewProvider } from './features/interview/interview.context.jsx'

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
