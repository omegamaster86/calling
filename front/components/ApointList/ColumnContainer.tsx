import { SortableContext, useSortable } from "@dnd-kit/sortable";
import type { Column, Id, Task } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  createTask: (columnId: Id, content: string) => void;
  updateTask: (taskId: Id, updates: { column_id: Id }) => void;
  deleteTask: (taskId: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  tasks,
  deleteTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      />
    );
  }

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-100 h-[600px] min-w-[200px] rounded-md flex flex-col"
      >
        {/* Column title */}
        <div
          {...attributes}
          {...listeners}
          onClick={() => {
            setEditMode(true);
          }}
          className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
        >
          <div className="flex gap-2">
            <div className="flex justify-center items-center px-2 py-1 text-sm rounded-full" />
            {!editMode && column.title}
            {editMode && (
              <input
                className="bg-black focus:border-rose-500 border rounded outline-none px-2"
                value={column.title}
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
        </div>

        {/* Column task container */}
        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}

export default ColumnContainer;
