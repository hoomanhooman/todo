import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TodoContext } from "./contextProvider";
import { DialogActions } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import Typography from "@mui/material/Typography";

const DoneTaskDialog = () => {
  const { state, hideDoneTaskDialog } = useContext(TodoContext);
  const {
    done: { showDialog },
  } = state;
  const doneTodoList = state?.todoList.filter((todo) => todo.done) || [];
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
              mt: 1,
              p: 1,
            },
          }}
        >
          {doneTodoList.length > 0 ? (
            doneTodoList.map((todo) => (
              <Paper key={todo.id}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" component="div">
                      <strong>Title: </strong>
                      {todo.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container justifyContent={"flex-end"}>
                      {todo.priority} &nbsp;
                      <AdjustIcon
                        color={
                          todo.priority === "Low"
                            ? "success"
                            : todo.priority === "Medium"
                            ? "secondary"
                            : "primary"
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>description: </strong>
                      {todo.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <span>Nothing have done!</span>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            hideDoneTaskDialog();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DoneTaskDialog;
