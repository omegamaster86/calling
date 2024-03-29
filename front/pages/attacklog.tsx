import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import useSWR from "swr";
import { AttackLogInfo } from "../components/AttackLog/AttackLogInfo";
import { AttackLogCallHistory } from "../components/AttackLog/AttackLogCallHistory/AttackLogCallHistory";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";

const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

const createQueryParams = (router: NextRouter) =>
	new URLSearchParams({
		filterCallingResult: Array.isArray(router.query.filterCallingResult)
			? router.query.filterCallingResult[0]
			: router.query.filterCallingResult || "",
		filterCompanyName: Array.isArray(router.query.filterCompanyName)
			? router.query.filterCompanyName[0]
			: router.query.filterCompanyName || "",
		filterCompanyNumber: Array.isArray(router.query.filterCompanyNumber)
			? router.query.filterCompanyNumber[0]
			: router.query.filterCompanyNumber || "",
		filterCompanyIndustry: Array.isArray(router.query.filterCompanyIndustry)
			? router.query.filterCompanyIndustry[0]
			: router.query.filterCompanyIndustry || "",
		filterSalesman: Array.isArray(router.query.filterSalesman)
			? router.query.filterSalesman[0]
			: router.query.filterSalesman || "",
		filterNextCallingDay: Array.isArray(router.query.filterNextCallingDay)
			? router.query.filterNextCallingDay[0]
			: router.query.filterNextCallingDay || "",
	}).toString();

export default function AttackLog() {
	const router = useRouter();
	const { company, filteredIds } = router.query;
	const { data: companiesData, error: companiesError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/companies`,
		fetcher,
	);
	const filteredCompanyIds: number[] =
		typeof filteredIds === "string"
			? filteredIds.split(",").map((id: string) => Number.parseInt(id, 10))
			: Array.isArray(filteredIds)
			  ? filteredIds.map((id: string) => Number.parseInt(id, 10))
			  : [];

	const goToNextCompany = () => {
		if (typeof company === "string") {
			// parseInt関数は文字列を数値に変換するために使われ、第二引数の10は10進数
			const currentId = Number.parseInt(company, 10);
			// indexOfメソッドは、指定された要素が配列内で最初に見つかった位置のインデックスを返す。
			// このインデックスは、次に表示すべき会社を決定するために使用されます。
			const currentIndex = filteredCompanyIds.indexOf(currentId);
			// 配列のループ処理
			const nextIdIndex =
				currentIndex + 1 === filteredCompanyIds.length ? 0 : currentIndex + 1;
			const nextId = filteredCompanyIds[nextIdIndex];
			const queryParams = createQueryParams(router);

			router.push(
				`/attacklog?company=${nextId}&filteredIds=${filteredIds}&${queryParams}`,
			);
		}
	};

	const goToPrevCompany = () => {
		if (typeof company === "string") {
			const currentId = Number.parseInt(company, 10);
			const currentIndex = filteredCompanyIds.indexOf(currentId);
			const prevIdIndex =
				currentIndex - 1 < 0 ? filteredCompanyIds.length - 1 : currentIndex - 1;
			const prevId = filteredCompanyIds[prevIdIndex];
			const queryParams = createQueryParams(router);

			router.push(
				`/attacklog?company=${prevId}&filteredIds=${filteredIds}&${queryParams}`,
			);
		}
	};
	// 会社IDとフィルター条件を保持するクエリパラメーターを詳細ページに持ってくる、リダイレクト画面に戻る（一般的）
	const closeAttackLog = () => {
		const queryParams = createQueryParams(router);
		router.push(`/dashboard?${queryParams}`);
	};

	if (companiesError) return <div>データの取得に失敗しました。</div>;
	if (!companiesData) return <div>ローディング中...</div>;

	return (
		<div className=" pt-8">
			<div className="border-b-2 pb-8 flex items-center justify-around">
				<div className="font-extrabold pl-7">アタックログ</div>
				<div className="flex ">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: ここではキーボードアクションを無効 */}
					<div
						className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold  hover:opacity-50 hover:cursor-pointer"
						onClick={goToPrevCompany}
					>
						<ArrowLeftIcon color="white.500" />
						<div className="pl-3">前</div>
					</div>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: ここではキーボードアクションを無効 */}
					<div
						className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold  hover:opacity-50 hover:cursor-pointer"
						onClick={goToNextCompany}
					>
						<div className="pr-3">次</div>
						<ArrowRightIcon color="white.500" />
					</div>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: ここではキーボードアクションを無効 */}
					<div
						className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold  hover:opacity-50 hover:cursor-pointer"
						onClick={closeAttackLog}
					>
						<CloseIcon color="white.500" />
						<div className="pl-3">閉</div>
					</div>
				</div>
			</div>
			<div className="flex">
				<AttackLogInfo onSubmit={() => {}} />
				<AttackLogCallHistory />
			</div>
		</div>
	);
}
