import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CustomSelectType } from '../../types/type';

export const CustomSelect = ({
  value,
  handleSelect,
  MenuList,
  inputLabel,
  width = 260,
  height = 46,
  marginRt = 10,
}: CustomSelectType) => {
  const labelOffsetY = typeof height === 'number' ? height / 4 : 12;
  return (
    <FormControl sx={{ minWidth: width, marginRight: marginRt }}>
      <InputLabel
        sx={{
          transform: `translate(18px, ${labelOffsetY}px) scale(1)`,
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        }}
      >
        {inputLabel}
      </InputLabel>
      <Select
        labelId="Lectronic"
        id="Lectronic"
        value={value}
        label={inputLabel}
        onChange={handleSelect}
        sx={{
          '& .MuiSelect-select': {
            padding: '11px 18px',
          },
          height: `${height + 'px'} !important`,
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {MenuList.map((val: any, index: number) => (
          <MenuItem key={index} value={val.val}>
            {val.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
