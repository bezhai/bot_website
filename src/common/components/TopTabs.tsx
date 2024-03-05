import React from 'react';
import { Tabs, Tab, AppBar, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

type TabRoute = {
  label: string;
  path: string;
};

interface TopTabsProps {
  disabled?: boolean;
}

const tabRoutes: TabRoute[] = [
  // { label: '配置', path: '/conf' },
  { label: '翻译', path: '/translate' },
  { label: '图库', path: '/images' },
];
const TopTabs: React.FC<TopTabsProps> = ({ disabled = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab =
    tabRoutes.findIndex((tab) => tab.path === location.pathname) ?? 0;
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(tabRoutes[newValue].path);
  };
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          background: `url(${require('../../assets/tab.png')}) no-repeat center center`,
          backgroundSize: 'cover',
          borderRadius: 1,
          boxShadow: 'none',
          color: 'white',
          height: `calc(100vw / 8)`, // Adjusted AppBar height
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none', // 隐藏指示器
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: 'left',
              paddingLeft: 2, // Added padding to the left side
              paddingTop: 1,
            },
            '& .MuiTab-root': {
              minWidth: 100, // Set your minimum width for a Tab
              padding: '6px 12px', // Added padding to the Tab for sizing
              marginRight: 2, // Added space between Tabs
              opacity: 1, // Ensure Tabs are fully opaque
              textTransform: 'none', // Optional: Prevents uppercase transformation
            },
          }}
        >
          {tabRoutes.map((tab, index) => (
            <Tab key={index} label={tab.label} disabled={disabled} />
          ))}
        </Tabs>
      </AppBar>
    </Box>
  );
};
export default TopTabs;
