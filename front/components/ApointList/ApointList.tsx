import type { ExtendedCompanyWithKeyPerson } from "@/types/interface";
import { useCompanyAndKeyPersonsData } from "../CompanyList/useSWRCompanyList";

export const ApoList = () => {
	const { mergedData, isLoading, isError } = useCompanyAndKeyPersonsData();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading data.</div>;

	const filteredCompanies = mergedData.filter(
		(company: ExtendedCompanyWithKeyPerson) =>
			company.latestCallResult === "アポイント",
	);

	return (
    <div className="pt-5 pl-10">
    <h3 className="pb-3 font-bold">アポイント獲得企業</h3>
    <table>
      <tbody>
        {filteredCompanies.map((company: ExtendedCompanyWithKeyPerson) => (
          <tr key={company.id}>
            <td className="border-2">{company.company_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
	);
};
