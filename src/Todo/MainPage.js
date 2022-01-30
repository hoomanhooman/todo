import React, { useContext } from "react";
import { TodoContext } from "./contextProvider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AdjustIcon from "@mui/icons-material/Adjust";

const MainPage = (props) => {
  const {
    state,
    showAddTaskDialog,
    showEditTaskDialog,
    doneTodo,
    showDoneTaskDialog,
    showDetailTaskDialog,
  } = useContext(TodoContext);

  const handleDone = (id) => {
    doneTodo(id);
  };
  const handleEdit = (id) => {
    showEditTaskDialog(id);
  };
  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 3,
          mt: 2,
          p: 2,
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          showDoneTaskDialog();
        }}
      >
        View Done Tasks
      </Button>
      {state?.todoList?.length > 0 &&
        state.todoList
          .filter((todo) => !todo.done)
          .map((todo) => (
            <Paper
              key={todo.id}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                showDetailTaskDialog(todo.id);
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {todo.title}
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  {todo.description}
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={0} justifyContent={"flex-end"}>
                    <Button
                      variant="contained"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDone(todo.id);
                      }}
                    >
                      Done Task
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEdit(todo.id);
                      }}
                    >
                      Edit Task
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
      <Box sx={{ position: "fixed", bottom: 10, right: 10 }}>
        <Fab color="primary" aria-label="add" onClick={showAddTaskDialog}>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default MainPage;
