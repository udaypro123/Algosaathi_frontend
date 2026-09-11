import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleClearCacheAndReload = () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isChunkError =
        this.state.error?.message?.includes("Failed to fetch dynamically imported module") ||
        this.state.error?.message?.includes("Loading chunk") ||
        this.state.error?.message?.includes("ChunkLoadError");

      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f4f9fb 0%, #ffffff 50%, #f2f8fa 100%)",
            px: 3,
          }}
        >
          <Box
            sx={{
              maxWidth: 520,
              textAlign: "center",
              background: "#ffffff",
              borderRadius: 4,
              boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
              p: { xs: 4, md: 6 },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, color: "#043b52", mb: 2 }}
            >
              AlgoSaathi is updating
            </Typography>

            <Typography
              sx={{ color: "#475569", lineHeight: 1.8, mb: 3 }}
            >
              {isChunkError
                ? "We've released a new version of AlgoSaathi. Please reload the page to continue."
                : "Something went wrong while loading AlgoSaathi. Please try again."}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
                sx={{
                  background: "linear-gradient(135deg, #075d7e, #096381)",
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Reload Page
              </Button>

              {isChunkError && (
                <Button
                  variant="outlined"
                  onClick={this.handleClearCacheAndReload}
                  sx={{
                    borderColor: "#075d7e",
                    color: "#075d7e",
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Clear Cache
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;