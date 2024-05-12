import { useRouter } from 'next/router';
import { AddIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";

export const PlusIcon = () => {
	return (
		<div>
			<AddIcon />
		</div>
	);
};

export const Delete = () => {
	return (
		<div>
			<DeleteIcon />
		</div>
	);
};

export const LinkMark = () => {
	const router = useRouter();
	const handleClick = () => {
    router.push('/apoint-meeting');
  };
	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      router.push('/apoint-meeting');
    }
  };

	return (
		<div onClick={handleClick} onKeyDown={handleKeyDown}>
			<LinkIcon />
		</div>
	);
};
