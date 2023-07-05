import "./styles.css";
import { useState } from "react";

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({ id: -1, show: false, todo: "" });

  // add todo
  const addTodo = () => {
    setTodos((prev) => [inputVal, ...prev]);
    setInputVal("");
  };

  // delete todo
  const deleteTodo = (_idx) => {
    const todo = todos.filter((each, idx) => _idx !== idx);
    setTodos((prev) => todo);
  };

  // update todo
  const updateTodo = (_idx) => {
    const todo = todos.map((each, idx) => {
      if (_idx === idx) return edit.todo;
      else return each;
    });
    setEdit((prev) => ({ id: -1, show: false, todo: "" }));
    setTodos((prev) => todo);
  };

  return (
    <div className="App">
      <h1>To Do App</h1>

      <input
        type="text"
        value={inputVal}
        onChange={(e) => {
          setInputVal((prev) => e.target.value);
        }}
      />
      <button
        disabled={inputVal.length === 0 ? true : false}
        onClick={() => {
          addTodo();
        }}
        style={{
          cursor: inputVal.length === 0 ? "not-allowed" : "pointer",
          backgroundColor: inputVal.length === 0 ? "grey" : "blue"
        }}
        className="add-btn"
      >
        Add{" "}
      </button>
      <div style={{ marginTop: "12px" }}>
        {todos.length === 0 ? (
          <p className="nothing-here-text">Nothing here !</p>
        ) : (
          todos.map((each, _idx) => {
            return (
              <div className="list-styling" key={_idx}>
                {edit.show && edit.id === _idx ? (
                  <input
                    defaultValue={each}
                    onChange={(e) => {
                      setEdit((prev) => ({ ...prev, todo: e.target.value }));
                    }}
                  />
                ) : (
                  <h4>{each}</h4>
                )}

                <div className={"flex-1"}></div>
                {edit.show && edit.id === _idx ? (
                  <button
                    disabled={edit?.todo?.length === 0 ? true : false}
                    onClick={() => {
                      updateTodo(_idx);
                    }}
                    style={{
                      cursor:
                        edit?.todo?.length === 0 ? "not-allowed" : "pointer",
                      backgroundColor:
                        edit?.todo?.length === 0 ? "grey" : "green"
                    }}
                    className={"edit-btn"}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEdit((prev) => ({ id: _idx, show: true }));
                    }}
                    className={"edit-btn"}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteTodo(_idx);
                  }}
                  className={"delete-btn"}
                >
                  delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
