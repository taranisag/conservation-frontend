/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { IconTaranisConservation, IconAvatar } from 'taranis-ui'
import { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'

import './styles.scss'

export const MainHeader: React.FC = () => {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })

    return (
        <Box>
            <Box data-cy="main-header" className="mainHeader">
                <IconTaranisConservation sx={{ width: 225, height: 26 }} />
                <IconAvatar {...bindTrigger(popupState)} />
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                </Menu>
            </Box>

            <Box data-cy="page-body">
                <Outlet />
            </Box>
        </Box>
    )
}
