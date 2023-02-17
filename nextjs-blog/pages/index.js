import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>Please Click Link Below</h2>
        <ul>
          <li>
            Todos <Link href="/home/ssr/todos">SSR</Link>{" "}
          </li>
        </ul>
      </section>
    </Layout>
  );
}
