import React, { useState } from 'react';
import {
  Container,
  Tab,
  Tabs,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import TopTabs from '../common/components/TopTabs';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
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
            <Typography variant="h6" gutterBottom>
              登录
            </Typography>
            <TextField
              label="用户名"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="密码"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              登录
            </Button>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Typography variant="h6" gutterBottom>
              注册
            </Typography>
            <TextField
              label="用户名"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="密码"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
            />
            <TextField
              label="确认密码"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              注册
            </Button>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};
export default SignInSignUpPage;
