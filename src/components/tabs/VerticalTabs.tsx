import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabProps } from '../../types/type';
import { Typography } from '@mui/material';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ value, handleChangeTab, groupedTabs }: TabProps) {
  let tabIndex = -1;
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        height: 224,
        flexDirection: 'column',
      }}
    >
      {groupedTabs &&
        Object.entries(groupedTabs).map(([group, labels]: any) => {
          const startIndex = tabIndex + 1; // where this group starts
          const endIndex = startIndex + labels.length - 1; // where it ends

          return (
            <Box key={group}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, ml: 1 }}>
                {group}
              </Typography>
              <Box sx={{ borderLeft: '1px solid #e0e0e0', ml: 1 }}>
                <Tabs
                  orientation="vertical"
                  value={value >= startIndex && value <= endIndex ? value : false} // 👈 only apply value when it's in range
                  onChange={handleChangeTab}
                  TabIndicatorProps={{ style: { display: 'none' } }}
                  sx={{
                    '.MuiTabs-flexContainer': {
                      gap: 0.5,
                      pt: 0.5,
                      pb: 1,
                    },
                  }}
                >
                  {labels.map((label: any) => {
                    tabIndex += 1;
                    const isSelected = value === tabIndex;
                    return (
                      <Tab
                        key={label.title}
                        label={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              position: 'relative',
                              width: '100%',
                            }}
                          >
                            {isSelected && (
                              <Box
                                sx={{
                                  width: 4,
                                  height: '70%',
                                  bgcolor: '#2C3E90',
                                  borderRadius: 2,
                                  position: 'absolute',
                                  left: -17,
                                  top: '15%',
                                }}
                              />
                            )}
                            <Box sx={{ ml: 1 }}>{label.title}</Box>
                          </Box>
                        }
                        value={tabIndex}
                        {...a11yProps(tabIndex)}
                        sx={{
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          borderRadius: 2,
                          bgcolor: isSelected ? '#2C3E90' : 'transparent',
                          color: isSelected ? 'white !important' : '#000',
                          minHeight: 36,
                          pl: 2.5,
                          pr: 1.5,
                          mx: -0.5,
                        }}
                      />
                    );
                  })}
                </Tabs>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
