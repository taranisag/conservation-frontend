import { Box } from 'taranis-ui/lib/components'

import taranisLogo from './assets/company-logos/taranis.svg'
import './App.scss'

const App = (): JSX.Element => (
    <Box className="container">
        <Box>
            <img src={taranisLogo} alt="Taranis logo" />
        </Box>
        <h1>Taranis Conservation</h1>
    </Box>
)

export default App
