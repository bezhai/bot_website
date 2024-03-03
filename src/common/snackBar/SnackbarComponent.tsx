import React, { CSSProperties } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarSeverityType } from "./types";

interface SnackbarComponentProps {
  open: boolean;
  message: string;
  severity: SnackbarSeverityType;
  onClose: () => void;
  style?: CSSProperties;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  open,
  message,
  severity,
  onClose,
  style,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={(_event, reason) => {
        if (reason !== 'clickaway') {
          onClose();
        }
      }}
      style={style}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;