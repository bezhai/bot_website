import React, { useState } from 'react';
import {
  Container,
  Tab,
  Tabs,
  Paper,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import TopTabs from '../common/components/TopTabs';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import TabPanel from './TabPanel';

const SignInSignUpPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <TopTabs disabled={true} />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 4, mb: 4, p: isSmallScreen ? 2 : 4 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="登录" />
            <Tab label="注册" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <SignInForm />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <SignUpForm setTabIndex={setTabIndex} />
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInSignUpPage;
