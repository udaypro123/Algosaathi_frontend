import { Suspense } from 'react'
import './App.css'
import Loader from './common/Loader'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import AppThemeProvider from './common/ThemeContext'

function App() {
  return (
    <AppThemeProvider>
      <Suspense fallback={<Loader/>}>
        <RouterProvider router={router} />
      </Suspense>
    </AppThemeProvider>
  )
}

export default App
