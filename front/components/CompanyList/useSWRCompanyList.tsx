import { Company, KeyPerson } from '@/types/interface';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
};

export const useCompanyAndKeyPersonsData = () => {
  const { data: companiesData, error: companiesError } = useSWR('http://localhost:3000/companies', fetcher);
  const { data: keyPersonsData, error: keyPersonsError } = useSWR('http://localhost:3000/key_persons', fetcher);

  if (companiesError || keyPersonsError) {
    console.error('Error fetching data:', companiesError || keyPersonsError);
    return { mergedData: null, isLoading: false, isError: true };
  }

  if (!companiesData || !keyPersonsData) {
    return { mergedData: null, isLoading: true, isError: false };
  }

  const mergedData = companiesData.map((company: Company) => ({
    ...company,
    keyPerson: keyPersonsData.find((kp: KeyPerson) => kp.company_id === company.id)
  }));

  return { mergedData, isLoading: false, isError: false };
};
