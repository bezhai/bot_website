import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { closeSnackbarAtom } from '../snackBar/snackbarAtoms';

const RouteChangeHandler: React.FC = () => {
  const location = useLocation();
  const [, closeSnackbar] = useAtom(closeSnackbarAtom);

  useEffect(() => {
    // 每当路由发生变化时，关闭所有 Snackbar
    closeSnackbar();
  }, [location, closeSnackbar]);

  return null; // 此组件不渲染任何东西
};

export default RouteChangeHandler;