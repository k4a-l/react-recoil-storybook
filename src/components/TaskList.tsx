import React from "react";

import Task, { EventProps } from "./Task";

import { useTasksState, useTasksMutators } from "../stores/taskStore";

type Props = {
  loading: boolean;
} & EventProps;

const LoadingRow = (
  <div className="loading-item">
    <span className="glow-checkbox" />
    <span className="glow-text">
      <span>Loading</span> <span>cool</span> <span>state</span>
    </span>
  </div>
);

const TaskList: React.FC<Props> = (props) => {
  const [tasks, setTasks] = [useTasksState(), useTasksMutators()];
  const events = {
    onPinTask: props.onPinTask,
    onArchiveTask: props.onArchiveTask,
  };

  if (props.loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items">
      {[
        ...tasks.filter((t) => t.state === "TASK_PINNED"),
        ...tasks.filter((t) => t.state !== "TASK_PINNED"),
      ].map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

export default TaskList;
