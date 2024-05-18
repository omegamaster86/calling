import { SortableContext, useSortable } from "@dnd-kit/sortable";
import type { Column, Id, Task } from "./types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Input, Button } from "@chakra-ui/react";
import { useCompanyAndKeyPersonsData } from "../CompanyList/useSWRCompanyList";

interface Props {
	column: Column;
	createTask: (columnId: Id, content: string) => void;
	updateTask: (taskId: Id, updates: string) => void;
	deleteTask: (taskId: Id) => void;
	tasks: Task[];
}

function ColumnContainer({
	column,
	tasks,
	createTask,
	updateTask,
	deleteTask,
}: Props) {
	const [editMode, setEditMode] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState<string>("");
	const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
	// const { mergedData, isLoading, isError } = useCompanyAndKeyPersonsData();
	const tasksIds = useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	// 最終架電結果がアポイントの企業名を取得できるコード
	// しかしドラック&ドロップした際に商談前に情報が残り続けてしまう
	// useEffect(() => {
	//   if (isLoading || isError) {
	//     return;
	//   }

	//   if (column.title === "商談前") {
	//     const appointmentCompanies = mergedData.filter(
	//       company => company.latestCallResult === "アポイント"
	//     );

	//     // 既存のタスクタイトルのリストを作成
	//     const existingTaskTitles = new Set(tasks.map(task => task.content));

	//     for (const company of appointmentCompanies) {
	//       const taskTitle = `${company.company_name}`;
	//       // 既に存在するタスクタイトルでない場合にのみタスクを作成
	//       if (!existingTaskTitles.has(taskTitle)) {
	//         createTask(column.id, taskTitle);
	//       }
	//     }
	//   }
	// }, [column, isLoading, isError, mergedData, createTask, tasks]);

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
						onClick={() => {}}
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
								updateTask={updateTask}
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
