import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOption(props){
  const [sort, setSort] = useState(props.start || props.options[0].value);

  const handleChange = (event) => {
    setSort(event.target.value);
    props.handleSelect(event.target.value)
  };

  const optionElements = props.options.map(option => 
    (<MenuItem sx={{color: "#1976d2"}}key={option.value} value={option.value}>{option.title}</MenuItem>)
  );

  return(
    <Box sx={{ maxWidth: 160}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.selection}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={handleChange}
          sx={{color: "#1976d2"}}
        >
          {optionElements}
        </Select>
      </FormControl>
    </Box>
  )
}