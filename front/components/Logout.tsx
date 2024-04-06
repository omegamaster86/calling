import { useRouter } from "next/router";
import axios from "axios";

export const LogoutButton = () => {
	const router = useRouter();

	const Logout = async () => {
		try {
			await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
				withCredentials: true, // セッションCookieをリクエストに含める
			});
			localStorage.removeItem("userName");
			router.push("/login");
		} catch (error) {
			alert("ログアウトに失敗しました。");
		}
	};

	return (
		<div className="text-white pr-4 text-xl">
			<button onClick={Logout} type="button">
				ログアウト
			</button>
		</div>
	);
};
