import { Button, Textarea } from "@chakra-ui/react";
import { MeetingInput } from "./InputField"
import { useState } from "react";

export const ApointMeetingRecord = () => {
	const [inputValues, setInputValues] = useState<Record<string, string>>({});

	const handleInputChange = (field: string, value: string) => {
		setInputValues(prevValues => ({
			...prevValues,
			[field]: value,
		}));
	};

	return (
		<div className="">
			<div className="flex items-center justify-around font-bold">
				<h2>カードの企業名を表示</h2>
				<Button colorScheme="red">削除</Button>
			</div>
      <div className="mt-12 mx-28">
        <h2 className="mb-5 text-sm font-bold leading-6 text-sky-400">商談内容</h2>
        <Textarea
        placeholder='商談内容'
        size='md'
        height="300px"
        border="2px"
        />
      </div>
      <MeetingInput onInputChange={handleInputChange}/>
		</div>
	);
};
