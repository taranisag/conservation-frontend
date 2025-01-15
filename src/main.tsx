import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { ThemeLight } from 'taranis-ui/lib/theme'

import App from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={ThemeLight}>
            <CssBaseline />
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>
        </ThemeProvider>
    </StrictMode>
)
