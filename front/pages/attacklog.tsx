import { useRouter } from 'next/router';
import useSWR from 'swr';
import { AttackLogInfo } from "../components/AttackLog/AttackLogInfo";
import { AttackLogCallHistory } from "../components/AttackLog/AttackLogCallHistory/AttackLogCallHistory";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return response.json();
};

export default function AttackLog(){
    const router = useRouter();
    const { company, filteredIds } = router.query;
    const { data: companiesData, error: companiesError } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/companies`, fetcher);
    const filteredCompanyIds: number[] = typeof filteredIds === 'string' ? filteredIds.split(',').map((id: string) => parseInt(id, 10)) : 
    Array.isArray(filteredIds) ? filteredIds.map((id: string) => parseInt(id, 10)) : [];

    const goToNextCompany = () => {
      if (typeof company === "string") {
        // parseInt関数は文字列を数値に変換するために使われ、第二引数の10は10進数
        const currentId = parseInt(company, 10);
        // indexOfメソッドは、指定された要素が配列内で最初に見つかった位置のインデックスを返す。
        // このインデックスは、次に表示すべき会社を決定するために使用されます。
        const currentIndex = filteredCompanyIds.indexOf(currentId);
        // 配列のループ処理
        const nextIdIndex = currentIndex + 1 === filteredCompanyIds.length ? 0 : currentIndex + 1;
        const nextId = filteredCompanyIds[nextIdIndex];
        router.push(`/attacklog?company=${nextId}&filteredIds=${filteredIds}`);
      } else {
        router.push(`/attacklog?company=${filteredCompanyIds[0]}&filteredIds=${filteredIds}`);
      }
    };

    const goToPrevCompany = () => {
      if(typeof company === "string") {
        const currentId = parseInt(company, 10);
        const currentIndex = filteredCompanyIds.indexOf(currentId);
        const prevIdIndex = currentIndex - 1 < 0 ? filteredCompanyIds.length - 1 : currentIndex - 1;
        const prevId = filteredCompanyIds[prevIdIndex];
        router.push(`/attacklog?company=${prevId}&filteredIds=${filteredIds}`);
      } else {
        router.push(`/attacklog?company=${filteredCompanyIds[filteredCompanyIds.length - 1]}&filteredIds=${filteredIds}`);
      }
    };

    const closeAttackLog = () => {
        router.push(`/dashboard`);
    };

    if (companiesError) return <div>データの取得に失敗しました。</div>;
    if (!companiesData) return <div>ローディング中...</div>;

    return(
        <div className=" pt-8">
            <div className="border-b-2 pb-8 flex items-center justify-around">
                <div className="font-extrabold pl-7">アタックログ</div>
                <div className="flex ">
                    <div className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold" onClick={goToPrevCompany}>
                        <ArrowLeftIcon color="white.500"/>
                        <div className="pl-3" >前</div>
                    </div>
                    <div className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold" onClick={goToNextCompany}>
                        <div className="pr-3">次</div>
                        <ArrowRightIcon color="white.500"/>
                    </div>
                    <div className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold" onClick={closeAttackLog}>
                        <CloseIcon color="white.500"/>
                        <div className="pl-3">閉</div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <AttackLogInfo onSubmit={() => {}}/>
                <AttackLogCallHistory/>
            </div>
        </div>
    )
}