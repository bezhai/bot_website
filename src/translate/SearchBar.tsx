import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// 定义组件的 Props 类型
interface SearchBarProps {
  searchKey: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleSearchIconClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchKey,
  handleSearchChange,
  handleKeyDown,
  handleSearchIconClick,
}) => {
  return (
    <Box
      sx={{
        mb: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <TextField
        label="Search for words"
        value={searchKey}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchIconClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            paddingRight: '8px',
          },
        }}
        sx={{
          width: '50%',
          '.MuiOutlinedInput-root': {
            borderRadius: '50px',
          },
          '.MuiInputLabel-outlined:not(.Mui-focused):not(.MuiInputLabel-shrink)': {
            marginLeft: '14px',
          },
          '.MuiOutlinedInput-input': {
            padding: '16px 28px',
          },
          '.MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(18px, -8px) scale(0.75)',
          },
          '.MuiInputAdornment-root .MuiIconButton-root': {
            marginRight: '8px',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;