import React, { ReactNode } from "react";
import { useAtom } from "jotai";
import { snackbarsAtom } from "./snackbarAtoms";
import SnackbarComponent from "./SnackbarComponent";

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbars, setSnackbars] = useAtom(snackbarsAtom);
  const snackbarHeight = 48;
  const snackbarMargin = 8;
  return (
    <>
      {children}
      {snackbars.map((snackbar, index) => (
        <SnackbarComponent
          open={true}
          key={snackbar.key}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => {
            setSnackbars((prevSnackbars) =>
              prevSnackbars.filter((s) => s.key !== snackbar.key)
            );
          }}
          style={{
            bottom: `${(index + 1) * (snackbarHeight + snackbarMargin)}px`,
          }}
        />
      ))}
    </>
  );
};
