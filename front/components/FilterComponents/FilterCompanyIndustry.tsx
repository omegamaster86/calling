import { Stack, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface FilterCompanyProps {
	filterCompanyIndustry: string;
	onCompanyIndustryChange: (companyIndustry: string) => void;
}

export const FilterIndustryCompany: React.FC<FilterCompanyProps> = ({
	filterCompanyIndustry,
	onCompanyIndustryChange,
}) => {
	const [companyIndustry, setCompanyIndustry] = useState(
		filterCompanyIndustry || "",
	);

	useEffect(() => {
		setCompanyIndustry(filterCompanyIndustry || "");
	}, [filterCompanyIndustry]);

	const handleIndustryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyIndustry(event.target.value);
		onCompanyIndustryChange(event.target.value);
	};

	return (
		<Stack ml="5">
			<Input
				placeholder="業界"
				size="md"
				bg="Cyan 50"
				w="110px"
				value={companyIndustry}
				onChange={handleIndustryChange}
			/>
		</Stack>
	);
};
