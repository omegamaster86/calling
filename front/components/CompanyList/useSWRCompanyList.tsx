import type { Company, KeyPerson, AttackLog } from "@/types/interface";
import useSWR from "swr";

const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

export const useCompanyAndKeyPersonsData = () => {
	const { data: companiesData, error: companiesError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/companies`,
		fetcher,
	);
	const { data: keyPersonsData, error: keyPersonsError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/key_persons`,
		fetcher,
	);
	const { data: attackLogsData, error: attackLogsError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/attack_logs`,
		fetcher,
	);

	if (companiesError || keyPersonsError || attackLogsError) {
		console.error(
			"Error fetching data:",
			companiesError || keyPersonsError || attackLogsError,
		);
		return { mergedData: null, isLoading: false, isError: true };
	}

	if (!companiesData || !keyPersonsData || !attackLogsData) {
		return { mergedData: null, isLoading: true, isError: false };
	}
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false, // 24時間表示
		};
		// ロケールを日本に設定しても良いですが、ブラウザのデフォルト設定を使用しても構いません
		return new Intl.DateTimeFormat("ja-JP", options)
			.format(date)
			.replace(/\//g, "/");
	};

	const mergedData = companiesData.map((company: Company) => {
		const companyAttackLogs = attackLogsData.filter(
			(log: AttackLog) => log.company_id?.toString() === company.id.toString(),
		);
		// 最新のログを取得するために、日付でソート（仮にcreated_atを使用）
		const latestLog = companyAttackLogs.sort(
			(a: AttackLog, b: AttackLog) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		)[0]; // 最新のものが先頭に来るようにして、先頭の要素を取得

		return {
			...company,
			keyPerson: keyPersonsData.find(
				(kp: KeyPerson) => kp.company_id?.toString() === company.id.toString(),
			),
			latestCallResult: latestLog ? latestLog.call_result : "",
			latestSalesman: latestLog ? latestLog.salesman : "",
			nextCallDay: latestLog ? formatDate(latestLog.next_call_day) : "",
		};
	});
	return { mergedData, isLoading: false, isError: false };
};
