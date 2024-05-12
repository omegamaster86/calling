import { useMemo, useState, useEffect } from "react";
import type { Column, Id, Task } from "./types";
import ColumnContainer from "./ColumnContainer";
import {
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import type {
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols: Column[] = [
	{
		id: "col1",
		title: "商談前",
	},
	{
		id: "col2",
		title: "1次商談",
	},
	{
		id: "col3",
		title: "2次商談",
	},
	{
		id: "col4",
		title: "3次商談",
	},
	{
		id: "col5",
		title: "成約",
	},
	{
		id: "col6",
		title: "失注",
	},
];

const defaultTasks: Task[] = [
	{
		id: "1",
		columnId: "col1",
		content: "テスト1",
	},
	{
		id: "2",
		columnId: "col1",
		content: "テスト2",
	},
];

function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>(defaultCols);
	const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
	const [isClient, setIsClient] = useState(false);
	const [tasks, setTasks] = useState<Task[]>(defaultTasks);
	const [activeColumn, setActiveColumn] = useState<Column | null>(null);
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
	);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const generateId = () => {
		return Math.floor(Math.random() * 10001);
	};

	const createTask = (columnId: Id, content: string) => {
		const newTask: Task = {
			id: generateId(),
			columnId,
			content: content,
		};
		setTasks([...tasks, newTask]);
	};

	const updateTask = (id: Id, content: string) => {
		const newTasks = tasks.map((task) => {
			if (task.id !== id) return task;
			return { ...task, content };
		});
		setTasks(newTasks);
	};

	const updateColumn = (id: Id, title: string) => {
		const newColumns = columns.map((col) => {
			if (col.id !== id) return col;
			return { ...col, title };
		});
		setColumns(newColumns);
	};

	const onDragStart = (event: DragStartEvent) => {
		if (event.active.data.current?.type === "Column") {
			setActiveColumn(event.active.data.current.column);
			return;
		}
		if (event.active.data.current?.type === "Task") {
			setActiveTask(event.active.data.current.task);
			return;
		}
	};

	const onDragEnd = (event: DragEndEvent) => {
		setActiveColumn(null);
		setActiveTask(null);
		const { active, over } = event;
		if (!over) return;
		const activeId = active.id;
		const overId = over.id;
		if (activeId === overId) return;
		const isActiveAColumn = active.data.current?.type === "Column";
		if (!isActiveAColumn) return;
		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
			const overColumnIndex = columns.findIndex((col) => col.id === overId);
			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	};

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;
		const activeId = active.id;
		const overId = over.id;
		if (activeId === overId) return;
		const isActiveATask = active.data.current?.type === "Task";
		const isOverATask = over.data.current?.type === "Task";
		if (!isActiveATask) return;
		if (isActiveATask && isOverATask) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				const overIndex = tasks.findIndex((t) => t.id === overId);
				if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
					tasks[activeIndex].columnId = tasks[overIndex].columnId;
					return arrayMove(tasks, activeIndex, overIndex - 1);
				}
				return arrayMove(tasks, activeIndex, overIndex);
			});
		}
		const isOverAColumn = over.data.current?.type === "Column";
		if (isActiveATask && isOverAColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				tasks[activeIndex].columnId = overId;
				console.log("DROPPING TASK OVER COLUMN", { activeIndex });
				return arrayMove(tasks, activeIndex, activeIndex);
			});
		}
	};

	return (
		<div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				<div className="m-auto flex gap-4">
					<div className="flex gap-4">
						<SortableContext items={columnsId}>
							{columns.map((col) => (
								<ColumnContainer
									key={col.id}
									column={col}
									updateColumn={updateColumn}
									createTask={createTask}
									updateTask={updateTask}
									tasks={tasks.filter((task) => task.columnId === col.id)}
								/>
							))}
						</SortableContext>
					</div>
				</div>

				{isClient
					? createPortal(
							<DragOverlay>
								{activeColumn ? (
									<ColumnContainer
										column={activeColumn}
										updateColumn={updateColumn}
										createTask={createTask}
										updateTask={updateTask}
										tasks={tasks.filter(
											(task) => task.columnId === activeColumn.id,
										)}
									/>
								) : activeTask ? (
									<TaskCard
										task={activeTask}
									/>
								) : null}
							</DragOverlay>,
							document.body,
					  )
					: null}
			</DndContext>
		</div>
	);
}
export default KanbanBoard;
