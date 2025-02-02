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

export const PlansPage: React.FC = () => (
    <Box className={styles.container}>
        <Box className={styles.midContainer}>
            <PlansHeader />
            <Box className={styles.tableContent}>
                <TableVirtuosoEnhanced
                    sortBy="jobStartDate"
                    data={WIZARD_STEP2_RESPONSE}
                    headings={headings}
                    tableContainerSX={{ marginTop: '20px' }}
                    renderTableRow={(plan: Plan) => (
                        <PlanRow key={plan.id} plan={plan} />
                    )}
                />
            </Box>
        </Box>
    </Box>
)
