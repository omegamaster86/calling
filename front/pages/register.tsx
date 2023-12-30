import Head from "next/head"
import { Layout } from "./components/layout";
import Link from "next/link";
import { EmailPassword } from "./components/RegisterInfo"

export default function Register(){


    return (
        <Layout>
        <Head>
            <title>register</title>
        </Head>
            <section className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
                    <p className=" w-3/4 mx-auto text-gray-400">HHKBHHKBHHKBHHKBHHKBHHKB</p>
                </div>
                <EmailPassword/>

                <p className="text-gray-400 text-center">
                    Have an account ?  <Link className=" text-blue-700" href={'/login'}>Sign In</Link>
                </p>
            </section>
        </Layout>
    )
}