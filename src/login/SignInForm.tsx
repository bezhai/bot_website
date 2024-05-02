import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { login } from '../common/api';
import { useAtom } from 'jotai';
import { showMessageAtom } from '../common/snackBar/snackbarAtoms';
import { useNavigate } from 'react-router-dom';
const SignInForm: React.FC = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [, showMessage] = useAtom(showMessageAtom);
  const navigate = useNavigate();

  // 登录逻辑
  const handleLogin = async () => {
    if (!loginUsername || !loginPassword) {
      setLoginError('用户名和密码均不能为空');
      return;
    }
    try {
      const response = await login(loginUsername, loginPassword);
      if (response.status === 200 && response.data.code === 0 && response.data.data !== undefined) {
        showMessage({ message: '登录成功', severity: 'success' });
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('refresh_token', response.data.data.refresh_token);
        navigate('/');
      } else {
        setLoginError('登录失败，请检查用户名和密码是否正确');
      }
    } catch (error) {
      console.error(error);
      setLoginError('登录失败，请检查用户名和密码是否正确');
    }
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        登录
      </Typography>
      <TextField
        label="用户名"
        variant="outlined"
        fullWidth
        margin="normal"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <TextField
        label="密码"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <Typography color="error" variant="body2">
        {loginError}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
        disabled={!loginUsername || !loginPassword}
      >
        登录
      </Button>
    </>
  );
};
export default SignInForm;
