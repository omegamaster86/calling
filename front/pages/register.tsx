import Head from "next/head";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { EmailPassword } from "../components/RegisterInfo";

export default function Register() {
	return (
		<Layout>
			<Head>
				<title>register</title>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">新規作成</h1>
				</div>
				<EmailPassword />

				<p className="flex flex-col text-gray-400 text-center">
					すでにアカウントをお持ちですか?{" "}
					<Link className=" text-blue-700 mt-4" href={"/login"}>
						Login
					</Link>
				</p>
			</section>
		</Layout>
	);
}
