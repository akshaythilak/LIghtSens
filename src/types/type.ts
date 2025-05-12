export type AppHeaderProps = {
  open: boolean;
  handleDrawerOpen?: () => void;
  setOpen?: any;
};

export interface Column<T> {
  key: keyof T;
  label: string;
  formatter?: (value: T) => React.ReactNode;
  sortable?: boolean;
  isFrozen?: boolean;
}

export interface CustomActionprops {
  onClick?: () => void;
  savePending?: boolean;
}

export interface Column<T> {
  key: keyof T;
  label: string;
  isFrozen?: boolean;
  sortable?: boolean;
  formatter?: (row: T) => React.ReactNode;
}

export interface CommonTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey?: keyof T;
  showCheckbox?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  onSortChange?: (sortConfig: { key: keyof T; direction: 'asc' | 'desc' }) => void;
}

export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  city: string;
  action: string;
  username?: string;
  height?: string;
}

export interface CustomSelectType {
  value: any;
  handleSelect: (e: any) => void;
  MenuList: any;
  inputLabel: string;
  width?: number;
  height?: number;
  marginRt?: number;
}

export interface ButtonProps {
  label: string;
  onClick: (e: any) => void;
  variant?: 'text' | 'outlined' | 'contained';
}

export interface ActionButtonsProps {
  buttons: ButtonProps[];
  spacing?: number;
  backgroundColor?: string;
  borderRadius?: number;
  fontSize?: number;
}

export interface SearchResetButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
}

export interface SearchResetButtonsProps {
  buttons: SearchResetButtonProps[];
}

export interface TabProps {
  value: number;
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
  tabLabels?: string[];
  groupedTabs?: any;
  tabLabelsColor?: string;
  customClass?: string;
}

export interface CustomTabDataType {
  value: any;
  index: number;
  MenuList: any;
  Lectronic: any;
  handleChange: any;
  searchResetButtons: any;
  resultsTabButtons: any;
  userData: any;
  userColumns: any;
  enableActionBtn?: boolean;
  enableOutlieBtn?: boolean;
}
