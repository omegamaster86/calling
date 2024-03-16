import { useCompanyAndAttackLogsData } from './useSWRAttackLog';
import { useRouter } from 'next/router';

interface AttackLog {
  calling_start: string;
  call_result: string;
  call_content: string;
}

interface Company {
  id: string | number;
  name: string;
  attackLogs: AttackLog[];
}

export const AttackLogCallHistory = () => {
  const { mergedData, isLoading, isError } = useCompanyAndAttackLogsData();
  const router = useRouter();
  const { company: companyId } = router.query; 
  const formatDateTime = ((dateTimeStr: string) => {
    if (!Date.parse(dateTimeStr)) {
      return '日時フォーマット変更前';
    }
    const dateObj = new Date(dateTimeStr);
    const formattedDate = new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
    return formattedDate; // '2024/02/17 17:52' の形式で返す
  });
  
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
                {/* // TODO　対話内容を文字数に応じてポップアップかスライド形式で表示するか検討、優先度低め */}
                <th className='border-2 w-44'>対話内容</th>
            </tr>
            </thead>
            <tbody className='border-solid border-2'>
            {filteredData.map((company: Company, index: number) => (
               company.attackLogs.map((log: AttackLog, logIndex: number) => (
                <tr key={`${index}-${logIndex}`} className={logIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className='border-2 text-nowrap truncate'>{formatDateTime(log.calling_start)}</td>
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
// index は会社のインデックス（外側の .map() から）、
// logIndex はアタックログのインデックス（内側の .map() から）
// この組み合わせにより、各 <tr> 要素に一意のキーを割り当てる
// 内側、外側はそれぞれの配列のインデックスを表す