import { SortableContext, useSortable } from "@dnd-kit/sortable";
import type { Column, Id, Task } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { Input, Button } from "@chakra-ui/react";

interface Props {
	column: Column;
	deleteColumn: (id: Id) => void;
	updateColumn: (id: Id, title: string) => void;
	createTask: (columnId: Id, content: string) => void;
	updateTask: (id: Id, content: string) => void;
	deleteTask: (id: Id) => void;
	tasks: Task[];
}

function ColumnContainer({
	column,
	deleteColumn,
	updateColumn,
	createTask,
	tasks,
	deleteTask,
}: Props) {
	const [editMode, setEditMode] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState<string>("");
	const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
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

  const handleAddCard = (columnId: Id, cardTitle: string) => {
  if (!cardTitle.trim()) return; // タイトルが空白の場合は何もしない
  createTask(columnId, cardTitle); 
  setNewCardTitle(""); 
  }
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
				className=" bg-gray-100 h-[500px] min-w-[200px] rounded-md flex flex-col"
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
								onChange={(e) => updateColumn(column.id, e.target.value)}
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
					<button
						type="button"
						onClick={() => {
							deleteColumn(column.id);
						}}
						className=" stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
					/>
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
			{column.title === "商談前" && (
				<div>
					<Input
						type="text"
						placeholder="新しいタイトル"
						bg="white"
						w={190}
						value={activeColumnId === column.id ? newCardTitle : ""}
						onChange={(e) => {
							setActiveColumnId(column.id.toString());
							setNewCardTitle(e.target.value);
						}}
						className="my-3"
					/>
					<Button
						type="submit"
						colorScheme="blue"
						mt={5}
						onClick={() => {
							createTask(column.id, newCardTitle);
							handleAddCard(column.id, newCardTitle);
						}}
					>
						カードを追加
					</Button>
				</div>
			)}
		</div>
	);
}

export default ColumnContainer;
