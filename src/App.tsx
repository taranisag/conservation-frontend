import React from 'react'
import { Box } from 'taranis-ui/lib/components'
import taranisLogo from './assets/company-logos/taranis.svg'
import './App.css'

function App(): JSX.Element {
    return (
        <>
            <Box>
                <img src={taranisLogo} alt="Taranis logo" />
            </Box>
            <h1>Taranis Conservation</h1>
        </>
    )
}

export default App
