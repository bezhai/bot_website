export type SnackbarSeverityType = "success" | "info" | "warning" | "error";

export interface SnackbarMessage {
    key: string;
    message: string;
    severity: SnackbarSeverityType;
  }