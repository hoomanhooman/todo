import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { TodoContext } from "./contextProvider";
import { DialogActions } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";

const DetailTaskDialog = () => {
  const {
    state,
    hideDetailTaskDialog,
    showEditTaskDialog,
    deleteTodo,
    doneTodo,
  } = useContext(TodoContext);
  const todo = state.selectedRow;
  const handleEdit = () => {
    if (todo?.id) showEditTaskDialog(todo?.id);
    hideDetailTaskDialog();
  };
  const handleDelete = () => {
    if (todo?.id) deleteTodo(todo?.id);
    hideDetailTaskDialog();
  };
  const handleDone = () => {
    if (todo?.id) doneTodo(todo?.id);
    hideDetailTaskDialog();
  };
  const {
    detail: { showDialog },
  } = state;
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={showDialog}
    >
      <DialogTitle>Done Todo</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            "& > :not(style)": {
              // m: 3,
              mt: 1,
              p: 1,
            },
          }}
        >
          <Paper key={todo.id} elevation={0}>
            <Grid container justifyContent={"flex-start"}>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-end"
              >
                {todo?.priority}
                &nbsp;
                <AdjustIcon
                  color={
                    todo?.priority === "Low"
                      ? "success"
                      : todo?.priority === "Medium"
                      ? "secondary"
                      : "primary"
                  }
                />
              </Grid>
              <Grid
                item
                xs={9}
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Typography variant="h6" component="div">
                  {todo?.title}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                sx={{ p: 3 }}
              >
                {todo?.description}
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                sx={{ p: 3 }}
              >
                {todo?.kpi}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" onClick={handleDone}>
          Done
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={hideDetailTaskDialog}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailTaskDialog;
