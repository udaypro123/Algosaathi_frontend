import { Suspense } from 'react'
import './App.css'
import Loader from './common/Loader'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
function App() {


  return (
    <>
      <Suspense fallback={<Loader/>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
