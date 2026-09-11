import { Suspense } from 'react'
import './App.css'
import Loader from './common/Loader'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import AppThemeProvider from './common/ThemeContext'
import { GlobalToastProvider } from './common/GlobalToast'
import ErrorBoundary from './common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AppThemeProvider>
        <GlobalToastProvider>
          <Suspense fallback={<Loader/>}>
            <RouterProvider router={router} />
          </Suspense>
        </GlobalToastProvider>
      </AppThemeProvider>
    </ErrorBoundary>
  )
}

export default App