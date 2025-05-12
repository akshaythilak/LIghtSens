/* eslint-disable max-lines */
import React, { useState } from 'react';
import { AddCameraAction } from '../../components/table-custom-actions/TableCustomAction';
import { ButtonProps, Column, SearchResetButtonProps, User } from '../../types/type';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import ErrorBoundary from '../../ErrorBoundary';
import './DeviceTopology.css';
import VerticalTabs from '../../components/tabs/VerticalTabs';
import { CustomTabData } from '../../components/custom-tab-data/CustomTabData';
import Tabs from '../../components/tabs/Tabs';
import { CustomSelect } from '../../components/form-controls/CustomSelect';
import { CustomTabPanel } from '../../components/tabs/customTabPanel';

const handleCustomAction = () => {
  console.log('Custom clicked');
};

const userData: User[] = [
  {
    id: 1,
    name: 'Alice',
    age: 25,
    city: 'NY',
    email: 'alice@example.com',
    action: 'Edit',
  },
  {
    id: 2,
    name: 'Bob',
    age: 30,
    city: 'LA',
    email: 'bob@example.com',
    action: 'Delete',
  },
  {
    id: 3,
    name: 'Charlie',
    age: 35,
    city: 'London',
    email: 'charlie@example.com',
    action: 'View',
  },
];

const userColumns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  {
    key: 'age',
    label: 'Age',
    sortable: true,
    formatter: () => {
      return (
        <div>
          <AddCameraAction onClick={handleCustomAction} />
          <AddCameraAction />
        </div>
      );
    },
    isFrozen: true,
  },
];

const userColumns2: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'username', label: 'username', sortable: true },
  { key: 'height', label: 'height', sortable: true },
  {
    key: 'age',
    label: 'Age',
    sortable: true,
    formatter: () => {
      return (
        <div>
          <AddCameraAction onClick={handleCustomAction} />
          <AddCameraAction />
        </div>
      );
    },
    isFrozen: true,
  },
];

const MenuList = [
  { label: 'item1', val: 'item1' },
  { label: 'item2', val: 'item2' },
  { label: 'item3', val: 'item3' },
];

const MenuList2 = [
  { label: 'itemX1', val: 'item1' },
  { label: 'itemX2', val: 'item2' },
  { label: 'itemX3', val: 'item3' },
];

const resultsTabButtons: ButtonProps[] = [
  { label: 'Device Model', variant: 'contained', onClick: () => console.log('Modify clicked') },
  {
    label: 'Device Statistics',
    variant: 'contained',
    onClick: () => console.log('Modify clicked'),
  },
];

const searchResetButtons: SearchResetButtonProps[] = [
  {
    label: 'Advanced Filter',
    variant: 'outlined',
    onClick: () => console.log('Search clicked'),
  },
  {
    label: 'Import',
    variant: 'outlined',
    onClick: () => console.log('Search clicked'),
  },
  {
    label: 'Download Template',
    variant: 'outlined',
    onClick: () => console.log('Search clicked'),
  },
  {
    label: 'Reset',
    variant: 'outlined',
    onClick: () => console.log('Search clicked'),
  },
];

const searchResetButtons2: SearchResetButtonProps[] = [
  {
    label: 'Advanced Filter',
    variant: 'outlined',
    onClick: () => console.log('Search clicked'),
  },
  {
    label: 'Import',
    variant: 'outlined',
    onClick: () => console.log('Search clicked'),
  },
];

const groupedTabs = {
  IOT: [
    {
      title: 'Concentrator',
      menulist: MenuList2,
      outlinBtn: searchResetButtons2,
      tableData: userData,
    },
    { title: 'Power Box', menulist: MenuList, outlinBtn: searchResetButtons, tableData: userData },
    {
      title: 'Smart box',
      menulist: MenuList2,
      outlinBtn: searchResetButtons,
      columns: userColumns2,
      tableData: [],
    },
  ],
};

const groupedTabs1 = {
  IOT: [
    {
      title: 'Power Cabinet',
      menulist: MenuList2,
      outlinBtn: searchResetButtons,
      columns: userColumns2,
      tableData: [],
    },
    {
      title: 'Concentrator',
      menulist: MenuList2,
      outlinBtn: searchResetButtons2,
      tableData: userData,
    },
    { title: 'Power Box', menulist: MenuList, outlinBtn: searchResetButtons, tableData: userData },
  ],
};

const tabLabels = ['item1', 'item2'];

const DeviceTopology = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [lectronicValues, setLectronicValues] = useState<Record<number, string>>({});
  const [verticalTabValues, setVerticalTabValues] = useState<Record<number, number>>({
    0: 0,
    1: 0,
  });
  const [Lectronic, setLectronic] = useState('');

  const handleChange = (index: number) => (event: SelectChangeEvent) => {
    setLectronicValues((prev) => ({
      ...prev,
      [index]: event.target.value,
    }));
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChangeTab = (tabKey: number) => (_event: React.SyntheticEvent, newValue: number) => {
    setVerticalTabValues((prev) => ({
      ...prev,
      [tabKey]: newValue,
    }));
  };

  const handleChangeUser = (event: SelectChangeEvent) => {
    setLectronic(event.target.value);
  };

  let tabIndex = -1;
  let tabIndexx = -1;

  return (
    <React.Fragment>
      {/* <Box className="my-3 flex justify-between"></Box> */}
      <Box sx={{ height: '100%' }}>
        <CustomTabPanel value={activeTab} index={0}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <ErrorBoundary>
              <Grid size={{ xs: 12, md: 2 }} className="flex flex-col gap-3.5">
                <CustomSelect
                  MenuList={MenuList}
                  value={Lectronic}
                  handleSelect={handleChangeUser}
                  inputLabel="Lectronic"
                  marginRt={0}
                  width={0}
                />
                <div className="device-grid p-2.5 bg-white">
                  <VerticalTabs
                    value={verticalTabValues[0]}
                    handleChangeTab={handleChangeTab(0)}
                    groupedTabs={groupedTabs}
                  />
                </div>
              </Grid>
            </ErrorBoundary>
            <ErrorBoundary>
              <Grid size={{ xs: 12, md: 10 }} className="device-grid flex flex-col gap-3">
                <Tabs
                  value={activeTab}
                  handleChangeTab={handleTabChange}
                  tabLabels={tabLabels}
                  tabLabelsColor={'white'}
                  customClass="tabs-custom-style"
                />
                {groupedTabs &&
                  Object.entries(groupedTabs).map(([group, labels]) => {
                    return labels.map((val, index) => {
                      tabIndex += 1;
                      return (
                        <CustomTabData
                          key={`${group}-${index}`}
                          value={verticalTabValues[0]}
                          index={tabIndex}
                          MenuList={val.menulist}
                          Lectronic={lectronicValues[tabIndex] || ''}
                          handleChange={handleChange(tabIndex)}
                          searchResetButtons={val.outlinBtn}
                          resultsTabButtons={resultsTabButtons}
                          userData={val.tableData}
                          userColumns={val.columns ? val.columns : userColumns}
                          enableActionBtn={false}
                          enableOutlieBtn={false}
                        />
                      );
                    });
                  })}
              </Grid>
            </ErrorBoundary>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <ErrorBoundary>
              <Grid size={{ xs: 12, md: 2 }} className="flex flex-col gap-3.5">
                <CustomSelect
                  MenuList={MenuList}
                  value={Lectronic}
                  handleSelect={handleChangeUser}
                  inputLabel="Lectronic"
                  marginRt={0}
                  width={0}
                />
                <div className="device-grid p-2.5 bg-white">
                  <VerticalTabs
                    value={verticalTabValues[1]}
                    handleChangeTab={handleChangeTab(1)}
                    groupedTabs={groupedTabs1}
                  />
                </div>
              </Grid>
            </ErrorBoundary>
            <ErrorBoundary>
              <Grid size={{ xs: 12, md: 10 }} className="device-grid flex flex-col gap-3">
                <Tabs
                  value={activeTab}
                  handleChangeTab={handleTabChange}
                  tabLabels={tabLabels}
                  tabLabelsColor={'white'}
                  customClass="tabs-custom-style"
                />
                {groupedTabs1 &&
                  Object.entries(groupedTabs1).map(([group, labels]) => {
                    return labels.map((val, index) => {
                      tabIndexx += 1;
                      return (
                        <CustomTabData
                          key={`${group}-${index}`}
                          value={verticalTabValues[1]}
                          index={tabIndexx}
                          MenuList={val.menulist}
                          Lectronic={lectronicValues[tabIndexx] || ''}
                          handleChange={handleChange(tabIndexx)}
                          searchResetButtons={val.outlinBtn}
                          resultsTabButtons={resultsTabButtons}
                          userData={val.tableData}
                          userColumns={val.columns ? val.columns : userColumns}
                          enableActionBtn={false}
                          enableOutlieBtn={false}
                        />
                      );
                    });
                  })}
              </Grid>
            </ErrorBoundary>
          </Grid>
        </CustomTabPanel>
      </Box>
    </React.Fragment>
  );
};

export default DeviceTopology;
