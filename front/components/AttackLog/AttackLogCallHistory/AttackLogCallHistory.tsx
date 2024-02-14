import { useCompanyAndAttackLogsData } from './useSWRAttackLog';
import { useRouter } from 'next/router';
import { Company } from '@/types/interface';

export const AttackLogCallHistory = () => {
  const { mergedData, isLoading, isError } = useCompanyAndAttackLogsData();
  const router = useRouter();
  const { company: companyId } = router.query; 
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  const filteredData = mergedData.filter((company: Company) => company.id?.toString() === companyId);

  return (
    <div className='mt-5 mx-auto'>
        <h2 className='mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>架電履歴</h2>
        <div style={{ height: '700px', width: '700px', overflowX: 'auto', overflowY: 'auto' }}>
        <table className='mx-9 mt-8'>
            <thead>
            <tr>
                <th className='border-2 w-44'>アタック日</th>
                <th className='border-2 w-44'>架電結果</th>
                <th className='border-2 w-44'>対話内容</th>
            </tr>
            </thead>
            <tbody className='border-solid border-2'>
            {filteredData.map((company, index) => (
               company.attackLogs.map((log, logIndex) => (
                <tr key={`${index}-${logIndex}`} className={logIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className='border-2 text-nowrap truncate'>{log.calling_day}</td>
                  <td className='border-2 truncate'>{log.call_result}</td>
                  <td className='border-2 truncate'>{log.call_content}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
        </div>
    </div>
  );
}