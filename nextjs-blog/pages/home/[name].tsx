import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import { useGetTodosQuery } from "../../lib/todosApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/dist/client/router";
import Pagination from "../../components/pagination";
import TodoForm from "../../components/submit-form";
import axios from "axios";

// Partial because first render (will get empty props while `getStaticProps` runs)
export default function TodosHome() {
  const router = useRouter();

  const name = router.query.name;
  // console.log(name);
  interface MyObject {
    id: number;
    title: string;
  }
  const result = useGetTodosQuery(typeof name === "string" ? name : skipToken, {
    // If the page is not yet generated, router.isFallback will be true
    // initially until getStaticProps() finishes running
    skip: router.isFallback,
  });
  const { isLoading, error, data } = result;
  // console.log(data && Object.keys(data).length);
  // console.log(isLoading);

  const [dataProducts, setDataProducts] = useState(data);
  const [pageIndex, setPageIndex] = useState(1);
  const [counter, setCounter] = useState(1);
  const [todos, setTodos] = useState([]);

  const handleSuccess = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setTodos(response.data);
  };

  const onHandlePlus = () => {
    const add = Number(counter) + 1;
    setCounter(add);
    const tempCount = pageIndex + 1;
    setPageIndex(tempCount);
  };
  const onHandleMin = () => {
    let min = Number(counter) - 1;
    const tempCount = pageIndex - 1;
    setPageIndex(tempCount);
    if (counter === 1) {
      setCounter(1);
    } else {
      setCounter(min);
    }
  };

  const allDatas = dataProducts || 0;
  const pageSize = 10;
  let page = pageIndex;
  let totalPages = Math.ceil(allDatas.length / pageSize);

  const pageData = dataProducts
    ? dataProducts.slice(page * pageSize - pageSize, page * pageSize)
    : [];

  return (
    <Layout>
      <Head>
        <title>TODO-LIST</title>
      </Head>
      <article className="article-style">
        {error ? (
          <>Oh no, there was an error</>
        ) : router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>UserId</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody className="styled-subtable">
                {pageData &&
                  (pageData as unknown as any[]).map((element, idx) => {
                    return (
                      <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.userId}</td>
                        <td>{element.id}</td>
                        <td>{element.title}</td>
                        <td>{`${element.completed}`}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        ) : null}
      </article>
      <div className="butttons">
        <button disabled={counter === 1 ? true : false} onClick={onHandleMin}>
          prev
        </button>
        <button
          disabled={pageIndex === totalPages ? true : false}
          onClick={onHandlePlus}
        >
          next
        </button>
      </div>
      <div>
        <h1>Todos Form Input</h1>

        <TodoForm onSuccess={handleSuccess} />
      </div>
    </Layout>
  );
}
