import type { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { IconButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";

export type CardType = {
  id: string;
  title: string;
};

type CardProps = {
  id: string;
  title: string;
  deleteTask: (id: string) => void;
};

export const Card: FC<CardProps> = ({ id, title, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  });

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDeleteClick = () => setIsAlertOpen(true);
  const confirmDelete = () => {
    deleteTask(id);
    setIsAlertOpen(false);
  };
  const cancelDelete = () => setIsAlertOpen(false);

  return (
    <div
      className="m-3 p-3 opacity-100 text-gray-900 bg-white flex justify-between items-center"
      style={{ transform: CSS.Transform.toString(transform) }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <p>{title}</p>
      <IconButton
        aria-label="Delete card"
        icon={<DeleteIcon />}
        onClick={handleDeleteClick}
      />

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={cancelDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              カードを削除
            </AlertDialogHeader>

            <AlertDialogBody>
              本当に削除しますか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancelDelete}>
                キャンセル
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                削除する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};
