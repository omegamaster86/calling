import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Company } from '../types/interface';
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
    const { company } = router.query;
    const { data: companiesData, error: companiesError } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/companies`, fetcher);
    const companyIds = companiesData?.map((company: Company) => company.id) || [];

    const goToNextCompany = () => {
      // companyがundefinedまたはstring[]型の場合の処理
      const companyIdString = typeof company === 'string' ? company : Array.isArray(company) ? company[0] : '0';
      // 現在のcompanyIDを数値に変換
      const currentId = parseInt(companyIdString, 10);
      // companyIdsの中で現在のIDの次のIDを見つける
      const currentIndex = companyIds.indexOf(currentId);
      const nextIdIndex = currentIndex + 1 === companyIds.length ? 0 : currentIndex + 1;

      const nextId = companyIds[nextIdIndex];
      router.push(`/attacklog?company=${nextId}`);
    };

    const goToPrevCompany = () => {
      const companyIdString = typeof company === 'string' ? company : Array.isArray(company) ? company[0] : '0';
      const currentId = parseInt(companyIdString, 10);

      const currentIndex = companyIds.indexOf(currentId);
      const prevIdIndex = currentIndex - 1 < 0 ? companyIds.length - 1 : currentIndex - 1;
  
      const prevId = companyIds[prevIdIndex];
      router.push(`/attacklog?company=${prevId}`);
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
                    <div className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold">
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