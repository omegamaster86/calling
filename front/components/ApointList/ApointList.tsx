import {
	closestCorners,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from "./Column";
import type { ColumnType } from "./Column";
import { useState, useEffect } from "react";
import { useCompanyAndKeyPersonsData } from "../CompanyList/useSWRCompanyList";
import type { ExtendedCompanyWithKeyPerson } from "@/types/interface";

export default function ApointListAll() {
	const initialData: ColumnType[] = [
		{
			id: "Column1",
			title: "商談前",
			cards: [
				{
					id: "Card1",
					title: "Card1",
				},
				{
					id: "Card2",
					title: "Card2",
				},
			],
		},
		{
			id: "Column3",
			title: "1次商談",
			cards: [],
		},
		{
			id: "Column4",
			title: "2次商談",
			cards: [],
		},
		{
			id: "Column5",
			title: "3次商談",
			cards: [],
		},
		{
			id: "Column6",
			title: "成約",
			cards: [],
		},
		{
			id: "Column7",
			title: "失注",
			cards: [],
		},
	];

	// const { mergedData, isLoading, isError } = useCompanyAndKeyPersonsData();
	const [columns, setColumns] = useState<ColumnType[]>(initialData);
	const [newCardTitle, setNewCardTitle] = useState<string>("");
	const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

	const generateId = () => {
		return Math.floor(Math.random() * 10001);
	};

	const handleAddCard = (columnId: string, title: string) => {
		setColumns((prevState) =>
			prevState.map((column) => {
				if (column.id === columnId) {
					const newCard = {
						id: `Card${generateId()}`,
						title,
					};
					return {
						...column,
						cards: [...column.cards, newCard],
					};
				}
				return column;
			})
		);
	};
	

	// useEffect(() => {
	// 	if (!isLoading && mergedData) {
	// 		// 最終架電結果が「アポイント」の企業を抽出
	// 		const appointmentCompanies = mergedData.filter(
	// 			(company: ExtendedCompanyWithKeyPerson) =>
	// 				company.latestCallResult === "アポイント",
	// 		);

	// // 		// カードの分割
	// 		const column1Cards = appointmentCompanies.map((company) => ({
	// 			id: company.id,
	// 			title: `${company.company_name}`,
	// 		}));

	// 		const newColumns = [
	// 			{
	// 				...initialData[0],
	// 				cards: column1Cards,
	// 			},
	// 			{
	// 				...initialData[1],
	// 				cards: [],
	// 			},
	// 		];

	// 		setColumns(newColumns);
	//  	}
	// }, [isLoading, mergedData]);

	const findColumn = (unique: string | null) => {
		if (!unique) {
			return null;
		}
		if (columns.some((c) => c.id === unique)) {
			return columns.find((c) => c.id === unique) ?? null;
		}
		const id = String(unique);
		const itemWithColumnId = columns.flatMap((c) =>
			c.cards.map((i) => ({ itemId: i.id, columnId: c.id })),
		);
		const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
		return columns.find((c) => c.id === columnId) ?? null;
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over, delta } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumn = findColumn(activeId);
		const overColumn = findColumn(overId);
		if (!activeColumn || !overColumn || activeColumn === overColumn) {
			return;
		}

		setColumns((prevState) => {
			const activeItems = activeColumn.cards;
			const overItems = overColumn.cards;
			const activeIndex = activeItems.findIndex((i) => i.id === activeId);
			const overIndex = overItems.findIndex((i) => i.id === overId);
			const newIndex = () => {
				const putOnBelowLastItem =
					overIndex === overItems.length - 1 && delta.y > 0;
				const modifier = putOnBelowLastItem ? 1 : 0;
				return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
			};
			return prevState.map((c) => {
				if (c.id === activeColumn.id) {
					return {
						...c,
						cards: activeItems.filter((i) => i.id !== activeId),
					};
				}
				if (c.id === overColumn.id) {
					return {
						...c,
						cards: [
							...overItems.slice(0, newIndex()),
							activeItems[activeIndex],
							...overItems.slice(newIndex(), overItems.length),
						],
					};
				}
				return c;
			});
		});
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumn = findColumn(activeId);
		const overColumn = findColumn(overId);
		if (!activeColumn || !overColumn) {
			return;
		}
		const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
		const overIndex = overColumn.cards.findIndex((i) => i.id === overId);

		setColumns((prevState) =>
			prevState.map((column) => {
				if (column.id === activeColumn.id) {
					if (column.id === overColumn.id) {
						return {
							...column,
							cards: arrayMove(column.cards, activeIndex, overIndex),
						};
					}
				} else if (column.id === overColumn.id) {
					const newCards = [...column.cards];
					const [removed] = activeColumn.cards.splice(activeIndex, 1);
					newCards.splice(overIndex, 0, removed);
					column.cards = newCards;
				}
				return column;
			}),
		);
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
		>
			<div className="flex flex-row p-5 font-sans text-center">
				{columns.map((column) => (
					<div key={column.id} className="flex flex-col">
						<Column id={column.id} title={column.title} cards={column.cards} />
						<input
							type="text"
							placeholder="新しいカードのタイトル"
							value={activeColumnId === column.id ? newCardTitle : ""}
							onChange={(e) => {
								setActiveColumnId(column.id);
								setNewCardTitle(e.target.value);
							}}
							className="mb-2"
						/>
						<button
							type="button"
							onClick={() => {
								handleAddCard(column.id, newCardTitle);
								setNewCardTitle("");
							}}
							disabled={!newCardTitle || activeColumnId !== column.id}
						>
							カード追加
						</button>
					</div>
				))}
			</div>
		</DndContext>
	);
}
