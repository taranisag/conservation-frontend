import React from 'react'
import { Box, Text } from 'taranis-ui'

import styles from './style.module.scss'
import { PlansHeader } from './components/PlansHeader'

export const PlansPage: React.FC = () => (
    <Box className={styles.container}>
        <Box className={styles.midContainer}>
            <PlansHeader />
            <Text> Plans Table</Text>
        </Box>
    </Box>
)
