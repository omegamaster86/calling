import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { CompanyList } from "./components/CompanyList";
import { AttackLog } from "./components/AttackLog";

export default function Dashbord(){
    return(
        <div>
            <Header/>
            <Filter/>
            <CompanyList/>
            <AttackLog/>
        </div>
    )
}