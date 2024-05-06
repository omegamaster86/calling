import type { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export type CardType = {
	id: string;
	title: string;
};

export const Card: FC<CardType> = ({ id, title }) => {
	const { attributes, listeners, setNodeRef, transform } = useSortable({
		id: id,
	});

	return (
		// attributes、listenersはDOMイベントを検知するために利用します。
		// listenersを任意の領域に付与することで、ドラッグするためのハンドルを作ることもできます。
		<div
			className="m-3 p-3 opacity-100 text-gray-900 bg-white"
			style={{ transform: CSS.Transform.toString(transform) }}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
		>
			<div id={id}>
				<p>{title}</p>
			</div>
		</div>
	);
};
