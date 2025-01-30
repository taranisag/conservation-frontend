import React, { useState } from 'react'
import { Box, IconPlus, SearchTextField, TaranisButton, Text } from 'taranis-ui'

import styles from './style.module.scss'

export const PlansHeader: React.FC = () => {
    const [textValue, setTextValue] = useState<string>('')

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.target.value)
    }

    const onClear = () => {
        setTextValue('')
    }

    return (
        <Box className={styles.container}>
            <Text variant="body2" fontWeight={500}>
                Conservation Plan Assets
            </Text>
            <Box className={styles.searchTextFieldContainer}>
                <SearchTextField
                    textValue={textValue}
                    onChange={onChange}
                    onClear={onClear}
                />
            </Box>
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
