import { Box, SelectChangeEvent } from '@mui/material';
import Tabs from '../../components/tabs/Tabs';
import './Dashboard.css';
import { useState } from 'react';
import { CustomTabPanel } from '../../components/tabs/customTabPanel';
import PieChartGraph from '../../components/pie-chart/PieChart';
import Grid from '@mui/material/Grid';
import ToggleOn from '../../svg/toggle-on-circle.svg?react';
import ToggleOff from '../../svg/toggle-off-circle.svg?react';
import Money from '../../svg/money-4.svg?react';
import ErrorBoundary from '../../ErrorBoundary';
import { CustomSelect } from '../../components/form-controls/CustomSelect';

const Dashboard = () => {
  const [Lectronic, setLectronic] = useState('');
  const [value, setValue] = useState(0);
  const data = [
    { value: 5, label: 'A', labelMarkType: 'square' as const },
    { value: 10, label: 'B', labelMarkType: 'square' as const },
    { value: 15, label: 'C', labelMarkType: 'square' as const },
    { value: 20, label: 'D', labelMarkType: 'square' as const },
  ];

  const MenuList = [
    { label: 'item1', val: 'item1' },
    { label: 'item2', val: 'item2' },
    { label: 'item3', val: 'item3' },
  ];

  const data2 = [{ value: 5, label: 'A', labelMarkType: 'square' as const }];

  const size = {
    width: 200,
    height: 200,
  };
  const tabLabels = ['item1', 'item2'];
  const tabLabelsColor = 'white !important';

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLectronic(event.target.value);
  };

  return (
    <Box className="dashboard-container">
      <Box className="title-bar">
        <CustomSelect
          MenuList={MenuList}
          value={Lectronic}
          handleSelect={handleChange}
          inputLabel="TempSelect"
        />
        <ErrorBoundary>
          <Tabs
            value={value}
            handleChangeTab={handleChangeTab}
            tabLabels={tabLabels}
            tabLabelsColor={tabLabelsColor}
          />
        </ErrorBoundary>
      </Box>
      <Box className="status-bar">
        <Grid container spacing={4} sx={{ padding: '20px' }}>
          <Grid size={{ xs: 12, md: 4 }} className="flex flex-row">
            <Box className="total-line common-width "></Box>
            <Box className="total-box w-full status-box-title ">
              <Box className="flex items-center flex-col">
                TOTAL(Individual)
                <span className="box-number">5</span>
              </Box>
              <Box>
                <Money />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} className="flex flex-row">
            <Box className="enable-line common-width "></Box>
            <Box className="enable-box w-full status-box-title ">
              <Box className="flex items-center flex-col">
                ENABLE(Individual)<span className="box-number">5</span>
              </Box>
              <Box>
                <ToggleOff />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} className="flex flex-row">
            <Box className="inactive-line common-width "></Box>
            <Box className="inactive-box w-full status-box-title ">
              <Box className="flex items-center flex-col">
                INACTIVE(Individual)<span className="box-number">5</span>
              </Box>
              <Box>
                <ToggleOn />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="tab-view">
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              <ErrorBoundary>
                <Grid size={{ xs: 12, md: 4 }} className="grid-pie">
                  <PieChartGraph data={data} size={size} Innerlabel="Online Rate" title="Enabled" />
                </Grid>
              </ErrorBoundary>
              <ErrorBoundary>
                <Grid size={{ xs: 12, md: 4 }} className="grid-pie">
                  <PieChartGraph
                    data={data2}
                    size={size}
                    Innerlabel="Lighting"
                    title="Lighting Rate Of Online Device"
                  />
                </Grid>
              </ErrorBoundary>
              <ErrorBoundary>
                <Grid size={{ xs: 12, md: 4 }} className="grid-pie">
                  <PieChartGraph
                    data={data}
                    size={size}
                    Innerlabel="Offline"
                    title="Offline Device"
                  />
                </Grid>
              </ErrorBoundary>
            </Grid>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }} className="grid-pie">
                <PieChartGraph data={data} size={size} Innerlabel="Online Rate" title="Enabled" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} className="grid-pie">
                <PieChartGraph
                  data={data}
                  size={size}
                  Innerlabel="Offline"
                  title="Offline Device"
                />
              </Grid>
            </Grid>
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default Dashboard;
