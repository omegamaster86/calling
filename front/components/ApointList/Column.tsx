import type { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Card } from "./Card";
import type { CardType } from "./Card";
import dynamic from "next/dynamic";

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

type ColumnProps = {
  id: string;
  title: string;
  cards: CardType[];
  deleteTask: (id: string) => void;
};

export const Column: FC<ColumnProps> = ({ id, title, cards, deleteTask }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    // ソートを行うためのContextです。
    // strategyは4つほど存在しますが、今回は縦・横移動可能なリストを作るためrectSortingStrategyを採用
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div className="w-48 bg-gray-100 mr-4" ref={setNodeRef}>
        <p className="py-5 px-3 text-left font-medium text-gray-700">{title}</p>
        {cards.map((card) => (
          <Card key={card.id} id={card.id} title={card.title} deleteTask={deleteTask} />
        ))}
      </div>
    </SortableContext>
  );
};