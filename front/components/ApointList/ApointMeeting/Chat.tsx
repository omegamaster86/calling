import { useState } from "react";
import { Input, Button } from '@chakra-ui/react'

interface Comment {
	id: number;
	text: string;
	replies?: Comment[];
}

const initialComments: Comment[] = [];

export const Chat = () => {
	const [comments, setComments] = useState<Comment[]>(initialComments);
	const [newComment, setNewComment] = useState("");

	const handleCommentSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const nextId = comments.length + 1;
		setComments([...comments, { id: nextId, text: newComment }]);
		setNewComment("");
	};

	const renderComments = (comments: Comment[]) => {
		return comments.map((comment) => (
			<div key={comment.id}>
				<p>{comment.text}</p>
				{comment.replies && (
					<div className="ml-4">{renderComments(comment.replies)}</div>
				)}
			</div>
		));
	};

	return (
		<div className="mt-6 mx-28">
			<h3 className="mb-4 text-sm font-semibold leading-6 text-sky-400">チャットスペース</h3>
			<div className="border-solid border-2 border-black h-48">
				<div>{renderComments(comments)}</div>
			</div>
			<form className="mt-5" onSubmit={handleCommentSubmit}>
				<Input
					type="text"
          w={200}
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="チャット"
          className="border-solid border-2 border-black"
				/>
				<Button ml={5} colorScheme="blue" type="submit">送信</Button>
			</form>
		</div>
	);
};
