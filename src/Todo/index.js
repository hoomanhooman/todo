import React from "react";
import Provider from "./contextProvider";
import AddEditTaskDialog from "./AddEditTaskDialog";
import MainPage from "./MainPage";
import ErrorSnack from "../components/ErrorSnack";
import DoneTaskDialog from "./DoneTaskDialog";
import DetailTaskDialog from "./DetailTaskDialog";

const index = (props) => {
  return (
    <Provider>
      <ErrorSnack />
      <AddEditTaskDialog />
      <DoneTaskDialog />
      <DetailTaskDialog />
      <MainPage />
    </Provider>
  );
};

export default index;
