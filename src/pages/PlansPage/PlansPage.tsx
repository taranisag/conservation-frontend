import React, { useRef } from 'react'
import { Box, TableVirtuosoEnhanced, Text } from 'taranis-ui'
import TableCell from '@mui/material/TableCell'
import Link from '@mui/material/Link/Link'

import { Plan } from '../../types/plan/plan'

import styles from './style.module.scss'
import { PlansHeader } from './components/PlansHeader'
import { WIZARD_STEP2_RESPONSE } from './mockedData/mockedData'

export const PlansPage: React.FC = () => {
    const headings = useRef([
        { id: 'case', label: 'Case Number' },
        { id: 'client', label: 'Grower name' },
        { id: 'jobStartDate', label: 'Job Start Date' },
        { id: 'Appendix', label: 'Appendix Link' },
        { id: 'status', label: 'Status' },
    ]).current

    const statusColors: Record<Plan['status'], string> = {
        Completed: 'success',
        Failed: 'error',
        'In progress': 'action',
    }

    const handleRowClick = (row: Plan) => {
        console.log('Open modal for:', row)
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.midContainer}>
                <PlansHeader />
                <Box className={styles.tableContent}>
                    <TableVirtuosoEnhanced
                        sortBy=""
                        data={WIZARD_STEP2_RESPONSE}
                        headings={headings}
                        tableContainerSX={{
                            marginTop: '20px',
                        }}
                        onRowClickHandler={(row) => {
                            handleRowClick(row)
                        }}
                        renderTableRow={(item: Plan) => {
                            const {
                                id,
                                caseNumber,
                                client,
                                jobStartDate,
                                AppendixLink,
                                status,
                            } = item

                            return (
                                <React.Fragment key={id}>
                                    <TableCell>
                                        <Box className={styles.caseRow}>
                                            <Text
                                                variant="body2"
                                                fontWeight={500}
                                            >
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
                                                <Text
                                                    variant="body2"
                                                    fontWeight={500}
                                                >
                                                    View Appendix
                                                </Text>
                                            </Link>
                                        ) : (
                                            <Text
                                                variant="body2"
                                                fontWeight={500}
                                            >
                                                N/A
                                            </Text>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Box display="inline">
                                            <Text
                                                variant="body2"
                                                fontWeight={500}
                                                color={
                                                    statusColors[item.status]
                                                }
                                            >
                                                {status}
                                            </Text>
                                        </Box>
                                    </TableCell>
                                </React.Fragment>
                            )
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
