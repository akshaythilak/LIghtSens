import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './Tabs.css';
import { TabProps } from '../../types/type';

export default function BasicTabs({
  value,
  handleChangeTab,
  tabLabels,
  tabLabelsColor,
  customClass = 'Tabs-box',
}: TabProps) {
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
    };
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        className={customClass} // <-- dynamically applied class
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} {...a11yProps(index)} sx={{ bgcolor: tabLabelsColor }} />
        ))}
      </Tabs>
    </Box>
  );
}
