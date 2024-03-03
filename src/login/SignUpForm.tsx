import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { register } from '../common/api';
import { useAtom } from 'jotai';
import { showMessageAtom } from '../common/snackBar/snackbarAtoms';
import { validateUsername, validatePassword } from './validation';

const SignUpForm: React.FC<{ setTabIndex: (index: number) => void }> = ({
  setTabIndex,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [, showMessage] = useAtom(showMessageAtom);

  useEffect(() => {
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    const doPasswordsMatch = password === confirmPassword;
    setUsernameError(isUsernameValid ? '' : '用户名必须是3-50位的字母或数字');
    setPasswordError(
      isPasswordValid
        ? doPasswordsMatch
          ? ''
          : '两次密码输入不一致'
        : '密码必须是8-30位的字母、数字或特殊字符(!@#$%^&*()_+)'
    );
    setIsFormValid(isUsernameValid && isPasswordValid && doPasswordsMatch);
  }, [username, password, confirmPassword]);
  const handleRegister = async () => {
    if (!isFormValid) return;
    try {
      const response = await register(username, password);
      if (response.status === 200 && response.data.code === 0) {
        showMessage({ message: '注册成功', severity: 'success' });
        setTabIndex(0);
      } else {
        showMessage({
          message: `注册失败：${response.data.msg}`,
          severity: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({ message: '注册失败', severity: 'error' });
    }
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        注册
      </Typography>
      <TextField
        label="用户名"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={username !== '' && !!usernameError}
        helperText={usernameError}
      />
      <TextField
        label="密码"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError && !confirmPassword}
        helperText={passwordError && !confirmPassword ? passwordError : ''}
      />
      <TextField
        label="确认密码"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!passwordError && confirmPassword !== ''}
        helperText={passwordError && confirmPassword ? passwordError : ''}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleRegister}
        disabled={!isFormValid}
      >
        注册
      </Button>
    </>
  );
};
export default SignUpForm;
