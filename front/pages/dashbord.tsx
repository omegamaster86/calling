import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { CompanyList } from "./components/CompanyList";

export default function Dashbord(){
    return(
        <div>
            <Header/>
            <Filter/>
            <CompanyList/>
        </div>
    )
}