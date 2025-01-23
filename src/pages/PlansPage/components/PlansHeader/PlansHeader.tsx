import React, { useState } from 'react'
import { Box, IconPlus, TaranisButton, Text } from 'taranis-ui'

import { SearchTextField } from '../../../../components/SearchTextField'

import styles from './style.module.scss'

export const PlansHeader: React.FC = () => {
    // State to store the input value
    const [textValue, setTextValue] = useState<string>('')

    // Handler function to update state on input change
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.target.value)
    }

    const onClear = () => {
        setTextValue('')
    }

    return (
        <Box className={styles.container}>
            <Text variant="body2" fontWeight={400}>
                Conservation Plan Assets
            </Text>
            <SearchTextField
                textValue={textValue}
                onChange={onChange}
                onClear={onClear}
            />
            <TaranisButton
                variant="contained"
                size="medium"
                startIcon={<IconPlus sx={{ fontSize: 20 }} />}
            >
                Generate Plan Assets
            </TaranisButton>
        </Box>
    )
}
