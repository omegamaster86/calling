import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FilterCallingResult {
	filterCallingResult: string;
	onCallingResultChange: (value: string) => void;
}

export const FilterCallingResult: React.FC<FilterCallingResult> = ({
	filterCallingResult,
	onCallingResultChange,
}) => {
	const [callingResult, setCallingResult] = useState(filterCallingResult || "");

	useEffect(() => {
		setCallingResult(filterCallingResult || "");
	}, [filterCallingResult]);

	const handleCallingResultChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setCallingResult(e.target.value);
		onCallingResultChange(e.target.value);
	};

	return (
		<Select
			placeholder="架電結果"
			bg="Cyan 50"
			ml="5"
			w="110"
			value={callingResult}
			onChange={handleCallingResultChange}
		>
			<option value="アポイント">アポイント</option>
			<option value="コンタクト">コンタクト</option>
			<option value="資料送付">資料送付</option>
			<option value="キーマンNG">キーマンNG</option>
			<option value="受付NG">受付NG</option>
			<option value="不在">不在</option>
			<option value="不通">不通</option>
			<option value="現アナ">現アナ</option>
			<option value="テスト">テスト</option>
		</Select>
	);
};
