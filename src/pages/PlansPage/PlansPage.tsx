import React from 'react'
import { Box, TableVirtuosoEnhanced } from 'taranis-ui'

import { Plan } from '../../types/plan/plan'

import { PlansHeader } from './components/PlansHeader'
import { WIZARD_STEP2_RESPONSE } from './mockedData/mockedData'
import { PlanRow } from './components/PlanRow'
import styles from './style.module.scss'

const headings = [
    { id: 'case', label: 'Case Number' },
    { id: 'client', label: 'Grower name' },
    { id: 'jobStartDate', label: 'Job Start Date' },
    { id: 'Appendix', label: 'Appendix Link' },
    { id: 'status', label: 'Status' },
]

export const PlansPage: React.FC = () => {
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
                        tableContainerSX={{ marginTop: '20px' }}
                        onRowClickHandler={handleRowClick}
                        renderTableRow={(plan: Plan) => (
                            <PlanRow
                                key={plan.id}
                                plan={plan}
                                onRowClick={handleRowClick}
                            />
                        )}
                    />
                </Box>
            </Box>
        </Box>
    )
}
