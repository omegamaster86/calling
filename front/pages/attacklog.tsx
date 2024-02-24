import { AttackLogInfo } from "../components/AttackLog/AttackLogInfo";
import { AttackLogCallHistory } from "../components/AttackLog/AttackLogCallHistory/AttackLogCallHistory";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';


export default function AttackLog(){

    return(
        <div className=" pt-8">
            <div className="border-b-2 pb-8 flex items-center justify-around">
                <div className="font-extrabold pl-7">アタックログ</div>
                <div className="flex ">
                    <div className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold">
                        <ArrowLeftIcon color="white.500"/>
                        <div className="pl-3">前</div>
                    </div>
                    <div className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold">
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