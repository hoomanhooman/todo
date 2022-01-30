import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { TodoContext } from "../Todo/contextProvider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorSnack = () => {
  const { state, hideErrorSnack } = useContext(TodoContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    hideErrorSnack();
  };
  return (
    <Snackbar
      open={state.error.showDialog}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {state.error.message || ""}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnack;
