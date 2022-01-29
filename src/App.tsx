import React, { Fragment, useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks)
  };

  return (
    <Fragment>
      <div className="row p-4">
        <div className="col-11 col-md-5 m-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  autoFocus
                />
                <button className="btn btn-secondary mt-2">Añadir Tarea</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-11 col-md-6 m-2">
          <ul className="list-group">
            {tasks.map((t: ITask, i: number) => {
              return (
                <li className="list-group-item list-group-item-action" key={i}>
                  <button className="btn btn-primary mx-2" onClick={() => toggleDoneTask(i)}>
                    {t.done ? (
                      <i className="text-warning far fa-check-circle"></i>
                    ) : (
                      <i className="text-warning far fa-circle"></i>
                    )}
                  </button>

                  <span
                    className="text-primary"
                    style={{ textDecoration: t.done ? "line-through" : "" }}
                  >
                    {t.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
