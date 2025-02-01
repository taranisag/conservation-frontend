import React from 'react'
import { Box, Text } from 'taranis-ui'
import TableCell from '@mui/material/TableCell'
import Link from '@mui/material/Link'

import { Plan } from '../../../../types/plan/plan'

import styles from './style.module.scss'

const statusColors: Record<Plan['status'], string> = {
    Completed: 'success',
    Failed: 'error',
    'In progress': 'action',
}

type PlanRowProps = {
    plan: Plan
    onRowClick: (plan: Plan) => void
}

export const PlanRow: React.FC<PlanRowProps> = ({ plan, onRowClick }) => {
    const { id, caseNumber, client, jobStartDate, AppendixLink, status } = plan

    return (
        <React.Fragment key={id}>
            <TableCell onClick={() => onRowClick(plan)}>
                <Box className={styles.caseRow}>
                    <Text variant="body2" fontWeight={500}>
                        {caseNumber}
                    </Text>
                </Box>
            </TableCell>
            <TableCell>
                <Text variant="body2" fontWeight={500}>
                    {client.name}
                </Text>
            </TableCell>
            <TableCell>
                <Text variant="body2" fontWeight={500}>
                    {jobStartDate}
                </Text>
            </TableCell>
            <TableCell>
                {AppendixLink ? (
                    <Link
                        href={AppendixLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                    >
                        <Text variant="body2" fontWeight={500}>
                            {AppendixLink}
                        </Text>
                    </Link>
                ) : (
                    <Text variant="body2" fontWeight={500}>
                        N/A
                    </Text>
                )}
            </TableCell>
            <TableCell>
                <Box display="inline">
                    <Text
                        variant="body2"
                        fontWeight={500}
                        color={statusColors[status]}
                    >
                        {status}
                    </Text>
                </Box>
            </TableCell>
        </React.Fragment>
    )
}
