import { Box } from 'taranis-ui/lib/components'

import taranisLogo from './assets/company-logos/taranis.svg'
import './App.scss'

function App(): JSX.Element {
    return (
        <Box className="container">
            <Box>
                <img src={taranisLogo} alt="Taranis logo" />
            </Box>
            <h1>Taranis Conservation</h1>
        </Box>
    )
}

export default App
