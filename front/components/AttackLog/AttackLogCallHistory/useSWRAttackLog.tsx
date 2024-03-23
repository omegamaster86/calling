import useSWR from "swr";
import type { Company, AttackLog } from "@/types/interface";

const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("An error occurred while fetching the data.");
	}
	return response.json();
};

export const useCompanyAndAttackLogsData = () => {
	const { data: companiesData, error: companiesError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/companies`,
		fetcher,
	);
	const { data: AttackLogsData, error: AttackLogsError } = useSWR(
		`${process.env.NEXT_PUBLIC_API_URL}/attack_logs`,
		fetcher,
	);

	if (companiesError || AttackLogsError) {
		console.error("Error fetching data:", companiesError || AttackLogsError);
		return { mergedData: null, isLoading: false, isError: true };
	}

	if (!companiesData || !AttackLogsData) {
		return { mergedData: null, isLoading: true, isError: false };
	}

	const mergedData = companiesData.map((company: Company) => {
		const relatedAttackLogs = AttackLogsData.filter(
			(attackLog: AttackLog) =>
				attackLog.company_id?.toString() === company.id.toString(),
		);
		// calling_dayがあるアタックログのみを含む企業のデータを返す
		return {
			...company,
			attackLogs: relatedAttackLogs,
		};
	});
	return { mergedData, isLoading: false, isError: false };
};
