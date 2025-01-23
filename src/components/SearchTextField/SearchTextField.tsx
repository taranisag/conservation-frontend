import React from 'react'
import { Box, IconClose, IconSearch } from 'taranis-ui'

import styles from './style.module.scss'

type SearchTextFieldProps = {
    textValue: string
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClear?: () => void
    placeholder?: string
}

export const SearchTextField: React.FC<SearchTextFieldProps> = (props) => {
    const {
        textValue,
        onFocus,
        onChange,
        onClear,
        placeholder = 'search',
    } = props

    return (
        <Box className={styles.container}>
            <Box className={styles.searchTextFieldContainer}>
                <Box className={styles.searchTextFieldPrefix}>
                    <IconSearch sx={{ width: 16, height: 16 }} />
                </Box>

                <input
                    data-cy="Text-Field-Search"
                    value={textValue}
                    onFocus={onFocus}
                    onChange={onChange}
                    className={styles.searchTextField}
                    placeholder={placeholder}
                />
            </Box>
            {onClear && (
                <Box className={styles.searchTextFieldPostfix}>
                    {textValue && (
                        <IconClose
                            sx={{ width: 12, height: 12, cursor: 'pointer' }}
                            onClick={onClear}
                        />
                    )}
                </Box>
            )}
        </Box>
    )
}
