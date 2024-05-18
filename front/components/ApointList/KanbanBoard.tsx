import axios from "axios";
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
import { Input, Button } from "@chakra-ui/react";

const defaultCols: Column[] = [
	{
		id: 1,
		title: "商談前",
	},
	{
		id: 2,
		title: "1次商談",
	},
	{
		id: 3,
		title: "2次商談",
	},
	{
		id: 4,
		title: "3次商談",
	},
	{
		id: 5,
		title: "成約",
	},
	{
		id: 6,
		title: "失注",
	},
];

function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>(defaultCols);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newCardTitle, setNewCardTitle] = useState<string>("");
	const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
	const [isClient, setIsClient] = useState(false);
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
		// fetchColumns();
	}, []);

	const createTask = async (columnId: Id, content: string) => {
		if (!content) {
			alert("カード名が未入力です");
			return;
		}
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/tasks`,
				{
					task: {
						column_id: columnId,
						content,
					},
				},
			);
			setTasks([...tasks, response.data]);
		} catch {
			alert("カードの作成に失敗しました");
		}
	};

	const updateTask = async (taskId, updates) => {
		try {
			const response = await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
				updates,
			);
			setTasks(
				tasks.map((task) => (task.id === taskId ? response.data : task)),
			);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	const deleteTask = async (taskId) => {
		try {
			await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`);
			setTasks(tasks.filter((task) => task.id !== taskId));
		} catch (error) {
			console.error("Error deleting task:", error);
		}
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
			<div className="mb-4">
				<Input
					type="text"
					placeholder="新しいカードのタイトル"
					value={newCardTitle}
					onChange={(e) => setNewCardTitle(e.target.value)}
				/>
				<Button
					colorScheme="blue"
					onClick={() => {
						createTask(1, newCardTitle); // 商談前カラムにカードを追加
						setNewCardTitle(""); // インプットをクリア
					}}
				>
					カードを追加
				</Button>
			</div>
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
									tasks={tasks.filter((task) => task.columnId === col.id)}
									createTask={createTask}
									updateTask={updateTask}
									deleteTask={deleteTask}
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
										createTask={createTask}
										updateTask={updateTask}
										deleteTask={deleteTask}
										tasks={tasks.filter(
											(task) => task.columnId === activeColumn.id,
										)}
									/>
								) : activeTask ? (
									<TaskCard
										task={activeTask}
										updateTask={updateTask}
										deleteTask={deleteTask}
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
