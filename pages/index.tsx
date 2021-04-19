import Link from "next/link";
import Head from "next/head";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const res = await fetch(`https://api.apiopen.top/getJoke?page=1&count=2&type=video`)
    const data = await res.json();

    return {
        props: {
            allPostsData,
            data
        }
    }
}

export default function Index({ allPostsData, data }) {
    return (
        <>
            <div className="container">
                <Head>
                    <title>Index</title>
                </Head>
                <div className="index">
                    <Link href="/posts/first-post">hello world!</Link>
                    <img src="/image.jpeg" alt="logo" />
                </div>
                <section className={utilStyles.headingMd}>...</section>
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <h2 className={utilStyles.headingLg}>Blog</h2>
                    <ul className={utilStyles.list}>
                        {allPostsData.map(({ id, date, title }) => (
                            <li className={utilStyles.listItem} key={id}>
                                <Link href={`/posts/${id}`}>
                                    <a>{ title }</a>
                                </Link>
                                <br />
                                <small className={utilStyles.lightText}>
                                    <Date dateString={date}/>
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
                <p className={utilStyles.p}>{ JSON.stringify(data) }</p>
            </div>
            <style jsx>{`
                .container {
                    max-width: 750px;
                    margin: 50px auto;
                }
            `}</style>
        </>
    )
};
