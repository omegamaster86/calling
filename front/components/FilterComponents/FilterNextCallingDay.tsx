import { Stack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FilterCompanyProps {
	filterNextCallingDay: string;
	onNextCallingDayChange: (companyIndustry: string) => void;
}

export const FilterNextCallingDay: React.FC<FilterCompanyProps> = ({
	filterNextCallingDay,
	onNextCallingDayChange,
}) => {
	const [NextCallingDay, setNextCallingDay] = useState(
		filterNextCallingDay || "",
	);

	useEffect(() => {
		setNextCallingDay(filterNextCallingDay || "");
	}, [filterNextCallingDay]);

	const handleNextCallingDayChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setNextCallingDay(event.target.value);
		onNextCallingDayChange(event.target.value);
	};

	return (
		<Stack ml="5">
			<Input
				placeholder="次回架電日"
				size="md"
				bg="Cyan 50"
				w="120px"
				value={NextCallingDay}
				onChange={handleNextCallingDayChange}
			/>
		</Stack>
	);
};
