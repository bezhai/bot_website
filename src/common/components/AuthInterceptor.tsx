import React, { useEffect, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { setupInterceptors, setupRefreshInterceptor } from '../utils/apiClient'; // 导入 apiClient
import { showMessageAtom } from '../snackBar/snackbarAtoms';

const AuthInterceptor: React.FC = () => {
  const navigate = useNavigate();
  const [, showMessage] = useAtom(showMessageAtom);
  const [failCount, setFailCount] = useState(0);

  const addFailCount = useCallback(() => {
    setFailCount((prevFailCount) => {
      const newFailCount = prevFailCount + 1;
      if (newFailCount === 1) {
        showMessage({ message: '登录过期，请重新登录', severity: 'error' });
      }
      return newFailCount;
    });
  }, [showMessage]);

  useEffect(() => {
    const onUnauthorized = () => {
      addFailCount();
      setTimeout(() => {
        navigate('/login');
        setFailCount(() => 0);
      }, 3000);
    };
    setupRefreshInterceptor(onUnauthorized);
    setupInterceptors(onUnauthorized);

  }, [navigate, addFailCount, failCount]);

  return null;
};

export default AuthInterceptor;
