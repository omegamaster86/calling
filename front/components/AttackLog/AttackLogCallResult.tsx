import { useEffect, useState, useMemo } from "react";
import type { FC, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { FilterCallingResult } from "../FilterComponents/FilterCallingResult";
import {
	Textarea,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/react";
import type { AttackLog, Company } from "@/types/interface";
import useSWR from "swr";

interface InputFieldProps {
	label: string;
	name: string;
	id: string;
	type?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
}

interface AttackLogCallResultProps {
	onInputChange: (field: string, value: string) => void;
	errors: Record<string, string>;
}

const InputField: FC<InputFieldProps> = ({
	label,
	name,
	id,
	type = "text",
	value = "",
	onChange,
	errorMessage,
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
			{errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
		</div>
	);
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const AttackLogCallResult: FC<AttackLogCallResultProps> = ({
	onInputChange,
	errors,
}) => {
	const router = useRouter();
	const company = router.query.company as string | string[] | undefined;
	const [callingStart, setCallingStart] = useState("");
	const [callResult, setCallResult] = useState("");
	const [nextCallDay, setNextCallDay] = useState("");
	const [salesman, setSalesman] = useState("");
	const [callContent, setCallContent] = useState("");

	const { data: companiesData, error: companiesError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/companies`,
		fetcher,
	);
	const { data: AttackLogsData, error: AttackLogsError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/attack_logs`,
		fetcher,
	);

	if (companiesError || AttackLogsError)
		return <div>データの読み込みに失敗しました。</div>;

	const selectedCompany = useMemo(() => {
		if (!companiesData || !AttackLogsData) return null;
		const mergedData = companiesData.map((company: Company) => {
			const companyAttackLogs = AttackLogsData.filter(
				(log: AttackLog) =>
					log.company_id?.toString() === company.id.toString(),
			);
			// 最新のログを取得するために、日付でソート（仮にcreated_atを使用）
			const latestLog = companyAttackLogs.sort(
				(a: AttackLog, b: AttackLog) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
			)[0]; // 最新のものが先頭に来るようにして、先頭の要素を取得

			return {
				...company,
				keyPerson: AttackLogsData.find(
					(at: AttackLog) =>
						at.company_id?.toString() === company.id.toString(),
				),
				latestSalesman: latestLog ? latestLog.salesman : "",
			};
		});
		return (
			mergedData.find((comp: Company) => comp.id.toString() === company) || null
		);
	}, [companiesData, AttackLogsData, company]);

	useEffect(() => {
		if (!selectedCompany) return;

		setCallingStart(selectedCompany.calling_start || "");
		setCallResult(selectedCompany.call_result || "");
		setNextCallDay(selectedCompany.next_call_day || "");
		setSalesman(selectedCompany.latestSalesman || "");
		setCallContent(selectedCompany.call_content || "");

		onInputChange("callingStart", selectedCompany.calling_start || "");
		onInputChange("callResult", selectedCompany.call_result || "");
		onInputChange("nextCallDay", selectedCompany.next_call_day || "");
		onInputChange("salesman", selectedCompany.latestSalesman || "");
		onInputChange("callContent", selectedCompany.call_content || "");
	}, [selectedCompany, onInputChange]);

	const handleCallingStartInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCallingStart(e.target.value);
		onInputChange("callingStart", e.target.value);
	};
	const handleCallResultChange = (value: string) => {
		setCallResult(value);
		onInputChange("callResult", value);
	};
	const handleNextCallDayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNextCallDay(e.target.value);
		onInputChange("nextCallDay", e.target.value);
	};
	const handleSalesmanInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSalesman(e.target.value);
		onInputChange("salesman", e.target.value);
	};
	const handleCallContentTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCallContent(e.target.value);
		onInputChange("callContent", e.target.value);
	};

	return (
		<div>
			<h2 className=" mt-9 mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2">
				アタックログ<span className=" ml-4 text-red-600">必須項目</span>
			</h2>
			<div className="w-1/2 mx-9 my-5">
				<div className="flex mx-auto">
					<div>
						<label className="text-sm font-semibold leading-6 text-sky-400">
							架電結果
						</label>
						<div className="w-64 mt-2 -ml-5 mr-5">
							<FilterCallingResult
								onCallingResultChange={handleCallResultChange}
								filterCallingResult={callResult}
							/>
						</div>
					</div>
					<div className="ml-12">
						<label className="text-sm font-semibold leading-6 text-sky-400">
							架電開始時間
						</label>
						<FormControl isInvalid={!!errors.callResult} mb={5}>
							<FormLabel htmlFor="calling_start_at" />
							<Input
								type="datetime-local"
								value={callingStart}
								onChange={handleCallingStartInputChange}
							/>
							<FormErrorMessage>{errors.callingStart}</FormErrorMessage>
						</FormControl>
					</div>
				</div>
				<div className="flex mx-auto mt-6">
					<div>
						<InputField
							label="担当者"
							name="salesman"
							id="salesman"
							errorMessage={errors.salesman}
							value={salesman}
							onChange={handleSalesmanInputChange}
						/>
					</div>
					<div className="ml-12">
						<label className="text-sm font-semibold leading-6 text-sky-400">
							次回架電日
						</label>
						<FormControl isInvalid={!!errors.callResult} mb={5}>
							<FormLabel htmlFor="next_call_day" />
							<Input
								type="datetime-local"
								value={nextCallDay}
								onChange={handleNextCallDayInputChange}
							/>
							<FormErrorMessage>{errors.callingStart}</FormErrorMessage>
						</FormControl>
					</div>
				</div>
				<div className="mx-auto mt-8">
					<label className="text-sm font-semibold leading-6 text-sky-400">
						対話内容
					</label>
					<div className="w-96 border-b-2">
						<FormControl isInvalid={!!errors.callContent}>
							<FormLabel htmlFor="call_content" />
							<Textarea
								name="call_content"
								value={callContent}
								onChange={handleCallContentTextChange}
							/>
							<FormErrorMessage>{errors.callingStart}</FormErrorMessage>
						</FormControl>
					</div>
				</div>
			</div>
		</div>
	);
};
