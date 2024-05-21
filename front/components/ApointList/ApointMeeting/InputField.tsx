import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
	Input,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";

interface InputFieldProps {
	label: string;
	name: string;
	id: string;
	type?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
	onInputChange: (field: string, value: string) => void;
}

const InputField: FC<InputFieldProps> = ({
	label,
	name,
	id,
	type = "text",
	value = "",
	onChange,
}) => {
	return (
		<div>
			<label className="text-sm font-semibold leading-6 text-sky-400">
				{label}
			</label>
			<div className="w-64 border-b-2">
				<input
					type={type}
					name={name}
					id={id}
					value={value}
					onChange={onChange}
					className="outline-none block rounded-md px-3.5 pt-2 text-gray-900 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>
	);
};

export const MeetingInput: FC<Props> = ({ onInputChange }) => {
	const router = useRouter();
	const company = router.query.company as string | string[] | undefined;
	const [meetingDay, setMeetingDay] = useState("");
	const [limitDay, setLimitDay] = useState("");
	const [salesman, setSalesman] = useState("");
	const [meetingUrl, setMeetingUrl] = useState("");

	// useEffect(() => {
	// 	if (!selectedCompany) return;

	// 	setNextCallDay(selectedCompany.next_call_day || "");
	// 	setSalesman(selectedCompany.latestSalesman || "");
	// 	setCallContent(selectedCompany.call_content || "");

	// 	onInputChange("nextCallDay", selectedCompany.next_call_day || "");
	// 	onInputChange("salesman", selectedCompany.latestSalesman || "");
	// 	onInputChange("callContent", selectedCompany.call_content || "");
	// }, [selectedCompany, onInputChange]);

	const handleLimitDayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLimitDay(e.target.value);
		onInputChange("LimitDay", e.target.value);
	};
	const handleMeetingDayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMeetingDay(e.target.value);
		onInputChange("meetingDay", e.target.value);
	};
	const handleSalesmanInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSalesman(e.target.value);
		onInputChange("salesman", e.target.value);
	};
	const handleMeetingUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMeetingUrl(e.target.value);
		onInputChange("meetingUrl", e.target.value);
	};

	return (
		<div className="w-3/4 mt-16 mx-28">
			<div className="flex justify-around mt-6">
				<div>
					<InputField
						label="担当者"
						name="salesman"
						id="salesman"
						value={salesman}
						onChange={handleSalesmanInputChange}
					/>
				</div>
				<div className="ml-12">
					<label className="text-sm font-bold leading-6 text-sky-400">
						期限日
					</label>
					<FormControl mb={5}>
						<FormLabel htmlFor="next_call_day" />
						<Input
							type="datetime-local"
							value={limitDay}
							onChange={handleLimitDayInputChange}
						/>
					</FormControl>
				</div>
			</div>
			<div className="flex justify-around mt-6">
				<div>
					<InputField
						label="商談URL"
						name="meetingURL"
						id="meetingURL"
						value={meetingUrl}
						onChange={handleMeetingUrlChange}
					/>
				</div>
				<div className="ml-12">
					<label className="text-sm font-semibold leading-6 text-sky-400">
						商談日
					</label>
					<FormControl mb={5}>
						<FormLabel htmlFor="next_call_day" />
						<Input
							type="datetime-local"
							value={meetingDay}
							onChange={handleMeetingDayInputChange}
						/>
					</FormControl>
				</div>
			</div>
		</div>
	);
};
