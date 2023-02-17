import React from "react";
import { todosApi, useGetTodosQuery } from "../lib/todosApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/dist/client/router";

export default function Pagination() {
  const router = useRouter();

  const name = router.query.name;
  // console.log(name);
  const { data, isFetching } = useGetTodosQuery(
    typeof name === "string" ? name : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    }
  );
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / 10);
  console.log(totalItems);

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handlePageChange(pageNumber: number) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    todosApi.endpoints.getTodos.initiate({ page: pageNumber });
  }

  return (
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => handlePageChange(pageNumber)}
                // disabled={data?.page === pageNumber}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
