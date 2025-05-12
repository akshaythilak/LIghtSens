import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import RecognitionRulesGrid from '../../components/tabs/RecognitionRulesGrid';
import RecognitionResultsGrid from '../../components/tabs/RecognitionResultsGrid';
import Tabs from '../../components/tabs/Tabs';
import { CustomTabPanel } from '../../components/tabs/customTabPanel';
import ActionButtons from '../../components/buttoncontrols/ActionButtons';
import SearchResetButtons from '../../components/buttoncontrols/SearchResetButtons';
import { ButtonProps, SearchResetButtonProps } from '../../types/type';

interface RecognitionRule {
  id: number;
  ruleName: string;
  ruleType: string;
}

interface RecognitionResult {
  id: number;
  ruleType: string;
  module?: string;
  uidPolNumber: string;
}

const SystemManagement = () => {
  const [lectronic, setLectronic] = useState('');
  const [ruleType, setRuleType] = useState('');
  const [module, setModule] = useState('');
  const [uidPolNumber, setUidPolNumber] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const lectronicOptions = ['Test1', 'Test2', 'Other'];
  const ruleTypeOptions = ['All', 'LCU', 'Other'];
  const moduleOptions = ['Module A', 'Module B', 'Module C'];

  const handleReset = () => {
    setLectronic('');
    setRuleType('');
    setModule('');
    setUidPolNumber('');
  };

  const recognitionRulesData: RecognitionRule[] = [
    { id: 1, ruleName: 'Test1', ruleType: 'LCU' },
    { id: 2, ruleName: 'Test2', ruleType: 'LCU' },
  ];

  const recognitionResultsData: RecognitionResult[] = [
    { id: 1, ruleType: 'Type A', module: 'Module X', uidPolNumber: 'UID123' },
    { id: 2, ruleType: 'Type B', uidPolNumber: 'POL456' },
  ];

  const tabLabels = ['Recognition Rules', 'Recognition Results'];
  const tabLabelsColor = 'white !important';

  const rulesTabButtons: ButtonProps[] = [
    { label: 'Add', variant: 'contained', onClick: () => console.log('Add clicked') },
    { label: 'Delete', variant: 'contained', onClick: () => console.log('Delete clicked') },
  ];

  const resultsTabButtons: ButtonProps[] = [
    { label: 'Modify Model', variant: 'contained', onClick: () => console.log('Modify clicked') },
    {
      label: 'Confirm Information',
      variant: 'contained',
      onClick: () => console.log('Confirm clicked'),
    },
    { label: 'Delete', variant: 'contained', onClick: () => console.log('Delete clicked') },
  ];

  const searchResetButtons: SearchResetButtonProps[] = [
    {
      label: 'Search',
      variant: 'outlined',
      onClick: () => console.log('Search clicked'),
    },
    {
      label: 'Reset',
      variant: 'outlined',
      onClick: handleReset,
    },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Tabs
        value={activeTab}
        handleChangeTab={handleTabChange}
        tabLabels={tabLabels}
        tabLabelsColor={tabLabelsColor}
        customClass="tabs-custom-style" // dynamically passed
      />

      <Box sx={{ mt: 3 }}>
        <CustomTabPanel value={activeTab} index={0}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
              backgroundColor: '#fff',
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <FormControl size="medium" sx={{ minWidth: 250, mb: 2 }}>
              <InputLabel id="lectronic-rules-label">Lectronic</InputLabel>
              <Select
                labelId="lectronic-rules-label"
                id="lectronic-rules-select"
                value={lectronic}
                onChange={(e) => setLectronic(e.target.value)}
                label="Lectronic"
              >
                {lectronicOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ p: 2, backgroundColor: '#f8f9fc', borderRadius: 2, boxShadow: 1 }}>
            <ActionButtons buttons={rulesTabButtons} />
            <RecognitionRulesGrid rows={recognitionRulesData} />
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={activeTab} index={1}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
              backgroundColor: '#fff',
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <FormControl size="medium" sx={{ minWidth: 250, mb: 2 }}>
              <InputLabel id="lectronic-results-label">Lectronic</InputLabel>
              <Select
                labelId="lectronic-results-label"
                id="lectronic-results-select"
                value={lectronic}
                onChange={(e) => setLectronic(e.target.value)}
                label="Lectronic"
              >
                {lectronicOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160, mb: 2 }}>
              <InputLabel id="rule-type-label">Rule Type</InputLabel>
              <Select
                labelId="rule-type-label"
                id="rule-type-select"
                value={ruleType}
                onChange={(e) => setRuleType(e.target.value)}
                label="Rule Type"
              >
                {ruleTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160, mb: 2 }}>
              <InputLabel id="module-label">Module</InputLabel>
              <Select
                labelId="module-label"
                id="module-select"
                value={module}
                onChange={(e) => setModule(e.target.value)}
                label="Module"
              >
                {moduleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="UID/Pol. Number"
              value={uidPolNumber}
              onChange={(e) => setUidPolNumber(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />
            <SearchResetButtons buttons={searchResetButtons} />
          </Box>

          <Box sx={{ p: 2, backgroundColor: '#f8f9fc', borderRadius: 2, boxShadow: 1 }}>
            <ActionButtons buttons={resultsTabButtons} />
            <RecognitionResultsGrid rows={recognitionResultsData} />
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default SystemManagement;
