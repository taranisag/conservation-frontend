import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { ThemeLight } from 'taranis-ui/lib/theme'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { PlansPage } from './pages/PlansPage'
import App from './App'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/plans',
        element: <PlansPage />,
    },
    // Catch-all route to redirect any invalid paths home page
    {
        path: '*',
        element: <Navigate to="/" />,
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={ThemeLight}>
            <CssBaseline />
            <StyledEngineProvider injectFirst>
                <RouterProvider router={router} />
            </StyledEngineProvider>
        </ThemeProvider>
    </StrictMode>
)
