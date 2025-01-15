import taranisLogo from './assets/company-logos/taranis.svg'
import './App.css'
import { Box } from 'taranis-ui/lib/components'

function App() {
    return (
        <>
            <Box>
                <img src={taranisLogo} />
            </Box>
            <h1>Taranis Conservation</h1>
        </>
    )
}

export default App
