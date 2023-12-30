import Todos from "./Todos";
import CreateTodoForm from "../components/CreateTodoForm"

interface Props {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {

    return (
        <div className="flex h-screen bg-blue-400">
            <div className="m-auto bg-slate-50 rounded-md w-3/5 grid lg:grid-cols-2">
                <div className="bg-green-400">
                    <Todos/>
                    <CreateTodoForm />
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                       {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
