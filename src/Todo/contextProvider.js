import { useReducer, createContext, memo } from "react";

export const TodoContext = createContext();

const initialState = {
  // main data
  todoList: [],

  selectedRow: {},

  // control AddTaskDialog
  add: {
    showDialog: false,
  },

  //control EditTaskDialog
  edit: {
    showDialog: false,
  },

  //control DetailTaskDialog
  detail: {
    showDialog: false,
  },

  //control DoneTaskDialog
  done: {
    showDialog: false,
  },

  //control ErrorSnack
  error: {
    showDialog: false,
    message: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add_todo":
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: Math.random(),
            title: action.title,
            description: action.description,
            kpi: action.kpi,
            priority: action.priority,
            done: false,
          },
        ],
      };
    case "edit_todo":
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.id) {
            return {
              ...todo,
              title: action.title,
              description: action.description,
              kpi: action.kpi,
              priority: action.priority,
            };
          }
          return todo;
        }),
      };
    case "delete_todo":
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.id),
      };
    case "done_todo":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, done: true } : todo
        ),
      };
    case "add/show":
      return {
        ...state,
        add: { ...state.add, showDialog: true },
        selectedRow: {},
      };
    case "add/hide":
      return {
        ...state,
        add: { ...state.add, showDialog: false },
        edit: { ...state.edit, showDialog: false },
      };
    case "edit/show":
      return {
        ...state,
        edit: {
          ...state.edit,
          showDialog: true,
        },
        selectedRow: state.todoList.find((todo) => todo.id === action.id),
      };
    case "edit/hide":
      return { ...state, edit: { ...state.edit, showDialog: false } };
    case "detail/show":
      return {
        ...state,
        detail: {
          ...state.detail,
          showDialog: true,
        },
        selectedRow: state.todoList.find((todo) => todo.id === action.id),
      };
    case "detail/hide":
      return { ...state, detail: { ...state.detail, showDialog: false } };
    case "done/show":
      return { ...state, done: { ...state.done, showDialog: true } };
    case "done/hide":
      return { ...state, done: { ...state.done, showDialog: false } };
    case "error/show":
      return {
        ...state,
        error: {
          ...state.error,
          showDialog: true,
          message: action.message,
        },
      };
    case "error/hide":
      return {
        ...state,
        error: {
          ...state.error,
          showDialog: false,
          message: "",
        },
      };
    default:
      return state;
  }
};

export default memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = (title, description, kpi, priority) => {
    const index = state.todoList.findIndex((todo) => todo.title === title);
    if (index >= 0) {
      throw new Error("Title should be unique");
    }
    dispatch({ type: "add_todo", title, description, kpi, priority });
  };

  const editTodo = (id, title, description, kpi, priority) => {
    const index = state.todoList.findIndex(
      (todo) => todo.title === title && todo.id !== id
    );
    if (index >= 0) {
      throw new Error("Title should be unique");
    }
    dispatch({ type: "edit_todo", id, title, description, kpi, priority });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "delete_todo", id });
  };

  const doneTodo = (id) => {
    dispatch({ type: "done_todo", id });
  };

  const showAddTaskDialog = () => {
    dispatch({ type: "add/show" });
  };

  const hideAddTaskDialog = () => {
    dispatch({ type: "add/hide" });
  };

  const showEditTaskDialog = (id) => {
    console.log("handleEdit id:", id);
    dispatch({ type: "edit/show", id });
    console.log("state:", state);
  };

  const hideEditTaskDialog = () => {
    dispatch({ type: "edit/hide" });
  };

  const showDetailTaskDialog = (id) => {
    dispatch({ type: "detail/show", id });
  };

  const hideDetailTaskDialog = (id, title) => {
    dispatch({ type: "detail/hide" });
  };

  const showDoneTaskDialog = (id, title) => {
    dispatch({ type: "done/show" });
  };

  const hideDoneTaskDialog = (id, title) => {
    dispatch({ type: "done/hide" });
  };

  const showErrorSnack = (message) => {
    dispatch({ type: "error/show", message });
  };

  const hideErrorSnack = () => {
    dispatch({ type: "error/hide" });
  };
  return (
    <TodoContext.Provider
      value={{
        state,
        addTodo,
        editTodo,
        deleteTodo,
        doneTodo,
        showAddTaskDialog,
        hideAddTaskDialog,
        showEditTaskDialog,
        hideEditTaskDialog,
        showDetailTaskDialog,
        hideDetailTaskDialog,
        showDoneTaskDialog,
        hideDoneTaskDialog,
        showErrorSnack,
        hideErrorSnack,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
});
