import clsx from "clsx";
import React, { useCallback } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import useParsedQuery from "../../hooks/useParsedQuery";
import { PageInfo } from "@api/interfaces";
import PageDescription from "../PageDescription";
import styles from "./Pagination.module.sass";

interface Props {
  pageInfo?: PageInfo;
}

const Pagination: React.FC<Props> = ({ pageInfo }) => {
  const [params] = useParsedQuery();
  const [, updateSearchParams] = useSearchParams();

  const onChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      updateSearchParams({
        ...params,
        page: selected + 1
      });
    },
    [params, updateSearchParams]
  );

  if (!pageInfo || !pageInfo.totalEntries) return null;
  const { totalPages, page } = pageInfo;

  return (
    <div className={styles.root}>
      <nav
        className={clsx("pagination")}
        role="navigation"
        aria-label="pagination"
      >
        <ReactPaginate
          pageCount={totalPages}
          disableInitialCallback
          onPageChange={onChangePage}
          initialPage={page - 1}
          pageLinkClassName="pagination-link"
          containerClassName="pagination-list"
          previousLinkClassName="pagination-previous"
          nextLinkClassName="pagination-next"
          activeLinkClassName="is-current"
          previousLabel={page === 1 ? null : "< 上一頁"}
          nextLabel={page === totalPages ? null : "下一頁 >"}
        />
      </nav>
      <PageDescription pageInfo={pageInfo} />
    </div>
  );
};

export default Pagination;
