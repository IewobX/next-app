import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout"

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <div>
                <Link href="/">{`First Post!`}</Link>
            </div>
        </Layout>
        
    );
}