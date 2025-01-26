/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Outlet, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import { IconTaranisConservation, IconAvatar } from 'taranis-ui'
import { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'

import { SubHeader } from '../SubHeader/SubHeader'
import { Routes } from '../../utils/constants/navigation'

import styles from './style.module.scss'

export const MainHeader: React.FC = () => {
    const location = useLocation()
    const showSubHeader = ['/plans'].includes(location.pathname)
    const SubHeaderPages = [{ label: 'Plans', path: Routes.plans }]

    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })

    if (location.pathname === '/login') return null

    return (
        <Box>
            <Box data-cy="main-header" className={styles.mainHeader}>
                <IconTaranisConservation sx={{ width: 225, height: 26 }} />
                <IconAvatar {...bindTrigger(popupState)} />
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                </Menu>
            </Box>
            {showSubHeader && <SubHeader pages={SubHeaderPages} />}

            <Box data-cy="page-body">
                <Outlet />
            </Box>
        </Box>
    )
}
