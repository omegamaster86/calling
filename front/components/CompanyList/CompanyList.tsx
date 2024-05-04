import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@chakra-ui/react";
import { FilterCallingResult } from "../FilterComponents/FilterCallingResult";
import { FilterCompany } from "../FilterComponents/FilterCompany";
import { FilterCompanyNumber } from "../FilterComponents/FilterCompanyNumber";
import { FilterIndustryCompany } from "../FilterComponents/FilterCompanyIndustry";
import { FilterSalesman } from "../FilterComponents/FilterSalesman";
import { FilterNextCallingDay } from "../FilterComponents/FilterNextCallingDay";
import { useCompanyAndKeyPersonsData } from "./useSWRCompanyList";
import type {
	Company,
	ExtendedCompany,
	ExtendedCompanyWithKeyPerson,
} from "../../types/interface";
import { useRouter } from "next/router";

export const CompanyList = () => {
	const [filterCallingResult, setFilterCallingResult] = useState("");
	const [filterCompanyName, setFilterCompanyName] = useState("");
	const [filterCompanyNumber, setFilterCompanyNumber] = useState("");
	const [filterCompanyIndustry, setFilterCompanyIndustry] = useState("");
	const [filterSalesman, setFilterSalesman] = useState("");
	const [filterNextCallingDay, setNextCallingDay] = useState("");
	const { mergedData, isLoading, isError } = useCompanyAndKeyPersonsData();
	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const query = router.query;
			// 各クエリパラメータを文字列に変換し、配列やundefinedの場合はデフォルト値を設定
			const filterCallingResult =
				typeof query.filterCallingResult === "string"
					? decodeURIComponent(query.filterCallingResult)
					: "";
			const filterCompanyName =
				typeof query.filterCompanyName === "string"
					? decodeURIComponent(query.filterCompanyName)
					: "";
			const filterCompanyNumber =
				typeof query.filterCompanyNumber === "string"
					? decodeURIComponent(query.filterCompanyNumber)
					: "";
			const filterCompanyIndustry =
				typeof query.filterCompanyIndustry === "string"
					? decodeURIComponent(query.filterCompanyIndustry)
					: "";
			const filterSalesman =
				typeof query.filterSalesman === "string"
					? decodeURIComponent(query.filterSalesman)
					: "";
			const filterNextCallingDay =
				typeof query.filterNextCallingDay === "string"
					? decodeURIComponent(query.filterNextCallingDay)
					: "";

			setFilterCallingResult(filterCallingResult);
			setFilterCompanyName(filterCompanyName);
			setFilterCompanyNumber(filterCompanyNumber);
			setFilterCompanyIndustry(filterCompanyIndustry);
			setFilterSalesman(filterSalesman);
			setNextCallingDay(filterNextCallingDay);
		}
	}, [router.isReady, router.query]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading data</div>;

	const handleCallingResultChange = (newValue: string) => {
		setFilterCallingResult(newValue);
	};
	const handleCompanyChange = (companyName: string) => {
		setFilterCompanyName(companyName);
	};
	const handleInputNumberChange = (companyNumber: string) => {
		setFilterCompanyNumber(companyNumber);
	};
	const handleIndustryChange = (companyIndustry: string) => {
		setFilterCompanyIndustry(companyIndustry);
	};
	const handleSalesmanChange = (Salesman: string) => {
		setFilterSalesman(Salesman);
	};
	const handleNextCallingDayChange = (NextCallingDay: string) => {
		setNextCallingDay(NextCallingDay);
	};

	const filteredCompanies = mergedData
		.filter(
			(company: ExtendedCompany) =>
				filterCallingResult === "" ||
				company.latestCallResult
					?.toLowerCase()
					.includes(filterCallingResult.toLowerCase()),
		)
		.filter(
			(company: Company) =>
				filterCompanyName === "" ||
				company.company_name
					.toLowerCase()
					.includes(filterCompanyName.toLowerCase()),
		)
		.filter(
			(company: Company) =>
				filterCompanyNumber === "" ||
				company.telephone_number === filterCompanyNumber,
			10,
		)
		// nullが入っている場合、下記のようにする
		.filter(
			(company: Company) =>
				filterCompanyIndustry === "" ||
				company.industry
					.toLowerCase()
					.includes(filterCompanyIndustry.toLowerCase()),
		)
		.filter(
			(company: ExtendedCompany) =>
				filterSalesman === "" ||
				company.latestSalesman
					?.toLowerCase()
					.includes(filterSalesman.toLowerCase()),
		)
		.filter(
			(company: ExtendedCompany) =>
				filterNextCallingDay === "" ||
				company.nextCallDay
					?.toLowerCase()
					.includes(filterNextCallingDay.toLowerCase()),
		);
	const filteredCompanyIds = filteredCompanies.map(
		(company: Company) => company.id,
	);

	return (
		<div>
			<div className="flex h-[70px] bg-cyan-400 items-center justify-around">
				<div className="flex">
					<FilterCallingResult
						filterCallingResult={filterCallingResult}
						onCallingResultChange={handleCallingResultChange}
					/>
					<FilterCompany
						filterCompanyName={filterCompanyName}
						onCompanyChange={handleCompanyChange}
					/>
					<FilterCompanyNumber
						filterCompanyNumber={filterCompanyNumber}
						onCompanyNumberChange={handleInputNumberChange}
					/>
					<FilterIndustryCompany
						filterCompanyIndustry={filterCompanyIndustry}
						onCompanyIndustryChange={handleIndustryChange}
					/>
					<FilterSalesman
						filterSalesman={filterSalesman}
						onCompanySalesmanChange={handleSalesmanChange}
					/>
					<FilterNextCallingDay
						filterNextCallingDay={filterNextCallingDay}
						onNextCallingDayChange={handleNextCallingDayChange}
					/>
					<Button colorScheme="blue" mx="5" type="submit" px="3">
						<Link href={"/company-resister"}>企業登録フォームへ</Link>
					</Button>
				</div>
			</div>
			<Card>
				<CardBody>
				<div
					className="flex justify-around rounded-lg"
					style={{
						width: "100%",
						overflowX: "auto",
						overflowY: "auto",
					}}
				>
					<table>
						<thead>
							<tr>
								<th className="border-2 w-44">架電結果</th>
								<th className="border-2 w-44">営業担当者</th>
								<th className="border-2 w-44">次回予定日</th>
								<th className="border-2 w-44">業界</th>
								<th className="border-2 w-44">会社名</th>
								<th className="border-2 w-44">電話番号</th>
								<th className="border-2 w-44">名前</th>
								<th className="border-2 w-44">部署</th>
								<th className="border-2 w-44">特記事項</th>
							</tr>
						</thead>
						<tbody className="border-solid border-2">
							{filteredCompanies.map(
								(company: ExtendedCompanyWithKeyPerson, index: number) => {
									const params = new URLSearchParams({
										company: company.id.toString(),
										filteredIds: filteredCompanyIds.join(","),
										filterCallingResult,
										filterCompanyName,
										filterCompanyNumber,
										filterCompanyIndustry,
										filterSalesman,
										filterNextCallingDay,
									}).toString();
									return (
										<tr
											key={company.id}
											className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
										>
											<td className="border-2">{company.latestCallResult}</td>
											<td className="border-2">{company.latestSalesman}</td>
											<td className="border-2">{company.nextCallDay}</td>
											<td className="border-2">{company.industry}</td>
											<td className="border-2 text-indigo-600 hover:underline underline-offset-2">
												<Link href={`/attacklog?${params}`}>
													{company.company_name}
												</Link>
											</td>
											<td className="border-2">{company.telephone_number}</td>
											<td className="border-2">
												{company.keyPerson ? company.keyPerson.name : ""}
											</td>
											<td className="border-2">
												{company.keyPerson ? company.keyPerson.department : ""}
											</td>
											<td className="border-2">
												{company.keyPerson ? company.keyPerson.note : ""}
											</td>
										</tr>
									);
								},
							)}
						</tbody>
					</table>
				</div>
				</CardBody>
			</Card>
		</div>
	);
};
