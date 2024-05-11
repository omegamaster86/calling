import { useState } from "react";
import { Delete } from "./Icons";
import type { Id, Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
	task: Task;
	deleteTask: (id: Id) => void;
}

function TaskCard({ task, deleteTask }: Props) {
	const [mouseIsOver, setMouseIsOver] = useState(false);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
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
				className="opacity-30 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative"/>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-white p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
			onMouseEnter={() => {
				setMouseIsOver(true);
			}}
			onMouseLeave={() => {
				setMouseIsOver(false);
			}}
		>
			<p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
				{task.content}
			</p>
			{mouseIsOver && (
				<button
					type="button"
					onClick={() => {
						deleteTask(task.id);
					}}
					className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100">
					<Delete />
				</button>
			)}
		</div>
	);
}

export default TaskCard;
