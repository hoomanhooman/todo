import React, { useContext, useEffect } from "react";
import { TodoContext } from "./contextProvider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  taskTitle: yup.string("Enter Task Title").required("Task Title is required"),
});

const AddTaskDialog = (props) => {
  const {
    state,
    addTodo,
    editTodo,
    showErrorSnack,
    hideAddTaskDialog,
    hideEditTaskDialog,
  } = useContext(TodoContext);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskTitle: state?.selectedRow?.title || "",
      taskDescription: state?.selectedRow?.description || "",
      kpi: state?.selectedRow?.kpi || "",
      priority: state?.selectedRow?.priority || "Low",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        if (state?.selectedRow?.id) {
          //edit row
          editTodo(
            state?.selectedRow?.id,
            values.taskTitle,
            values.taskDescription,
            values.kpi,
            values.priority
          );
          hideEditTaskDialog();
        } else {
          //add row
          addTodo(
            values.taskTitle,
            values.taskDescription,
            values.kpi,
            values.priority
          );
          hideAddTaskDialog();
        }
        resetForm();
      } catch (err) {
        showErrorSnack(err.message);
      }
    },
  });

  const {
    add: { showDialog: addShowDialog },
    edit: { showDialog: editShowDialog },
  } = state;
  const showDialog = addShowDialog || editShowDialog;
  const handleCancel = () => {
    hideAddTaskDialog();
  };

  useEffect(() => {}, [showDialog]);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={showDialog}
    >
      <DialogTitle>
        {state?.selectedRow?.id ? "Edit Todo" : "Add Todo"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ mt: 1 }}>
                <TextField
                  autoComplete="task"
                  name="taskTitle"
                  required
                  fullWidth
                  id="taskTitle"
                  label="Title"
                  autoFocus
                  value={formik.values.taskTitle}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.taskTitle && Boolean(formik.errors.taskTitle)
                  }
                  helperText={
                    formik.touched.taskTitle && formik.errors.taskTitle
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="task description"
                placeholder="Task Description"
                id="taskDescription"
                name="taskDescription"
                minRows={3}
                value={formik.values.taskDescription}
                onChange={formik.handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="kpi"
                name="kpi"
                fullWidth
                id="kpi"
                label="Gifts and KPI for this task ;)"
                value={formik.values.kpi}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="priority"
                name="priority"
                id="priority"
                row
                value={formik.values.priority}
                onChange={formik.handleChange}
              >
                {["Low", "Medium", "High"].map((option) => (
                  <FormControlLabel
                    value={option}
                    key={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container spacing={0} justifyContent={"flex-end"}>
            <Button autoFocus onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Ok</Button>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
