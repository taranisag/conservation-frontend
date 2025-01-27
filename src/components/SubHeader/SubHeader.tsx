import { NavLink } from 'react-router-dom'
import { Box, Text } from 'taranis-ui'

import styles from './style.module.scss'

interface SubHeaderProps {
    pages: {
        label: string
        path: string
    }[]
}

export const SubHeader: React.FC<SubHeaderProps> = ({ pages }) => (
    <Box className={styles.container}>
        {pages.map((page) => (
            <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                    isActive ? styles.active : styles.inActive
                }
            >
                {({ isActive }) => (
                    <Box className={styles.txtContainer}>
                        <Text variant="body2" fontWeight={isActive ? 700 : 400}>
                            {page.label}
                        </Text>
                        {isActive && <Box className={styles.rectangle} />}
                    </Box>
                )}
            </NavLink>
        ))}
    </Box>
)
