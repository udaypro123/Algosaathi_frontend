import {
  Alert,
  type AlertColor,
  Snackbar,
} from "@mui/material";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface GlobalToastState {
  message: string;
  severity: AlertColor;
  duration: number;
}

interface GlobalToastContextValue {
  showToast: (
    message: string,
    severity?: AlertColor,
    duration?: number
  ) => void;
}

const GlobalToastContext = createContext<GlobalToastContextValue | null>(null);

export const GlobalToastProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [toast, setToast] = useState<GlobalToastState>({
    message: "",
    severity: "info",
    duration: 5000,
  });
  const [open, setOpen] = useState(false);

  const showToast = useCallback(
    (
      message: string,
      severity: AlertColor = "info",
      duration = 5000
    ) => {
      setToast({ message, severity, duration });
      setOpen(true);
    },
    []
  );

  const handleClose = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setOpen(false);
    },
    []
  );

  const value = useMemo(
    () => ({ showToast }),
    [showToast]
  );

  return (
    <GlobalToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={toast.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: "2rem" }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          elevation={6}
          variant="filled"
          sx={{ minWidth: 300, borderRadius: 2 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </GlobalToastContext.Provider>
  );
};

export const useGlobalToast = (): GlobalToastContextValue => {
  const context = useContext(GlobalToastContext);
  if (!context) {
    throw new Error(
      "useGlobalToast must be used inside GlobalToastProvider"
    );
  }
  return context;
};
