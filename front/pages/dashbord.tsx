import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { AttackStatus } from "./components/AttackStatus";
import { AttackLog } from "./components/AttackLog";

export default function Dashbord(){
    return(
        <div>
            <Header/>
            <Filter/>
            <AttackStatus/>
            <AttackLog/>
        </div>
    )
}