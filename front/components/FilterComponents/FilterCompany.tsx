import { Stack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FilterCompanyProps {
	filterCompanyName: string;
	onCompanyChange: (companyName: string) => void;
}

export const FilterCompany: React.FC<FilterCompanyProps> = ({
	filterCompanyName,
	onCompanyChange,
}) => {
	const [companyName, setCompanyName] = useState(filterCompanyName || "");

	useEffect(() => {
		setCompanyName(filterCompanyName || "");
	}, [filterCompanyName]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyName(event.target.value);
		onCompanyChange(event.target.value);
	};

	return (
		<Stack ml="5">
			<Input
				placeholder="会社名"
				size="md"
				bg="Cyan 50"
				w="110px"
				value={companyName}
				onChange={handleInputChange}
			/>
		</Stack>
	);
};
