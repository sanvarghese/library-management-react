import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BookSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce effect: triggers after 1s of no typing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 1000); // 1000ms = 1 second

        return () => clearTimeout(handler); // clear on next keystroke
    }, [query]);

    // Trigger search when debouncedQuery updates
    useEffect(() => {
        if (debouncedQuery !== '') {
            onSearch(debouncedQuery);
        }
    }, [debouncedQuery, onSearch]);

    const handleManualSearch = () => {
        onSearch(query.trim());
    };

    return (
        <TextField
            fullWidth
            label="Search books..."
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleManualSearch} edge="end">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default BookSearch;
