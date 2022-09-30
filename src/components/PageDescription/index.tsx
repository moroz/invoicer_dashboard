import React from "react";
import { PageInfo } from "@api/interfaces";

interface Props {
  pageInfo: PageInfo | null | undefined;
}

const PageDescription: React.FC<Props> = ({ pageInfo }) => {
  if (!pageInfo) return null;

  const { totalEntries, page, pageSize } = pageInfo;

  if (totalEntries === 0) {
    return <p>No results</p>;
  }

  const startingIndex = (page - 1) * pageSize + 1;
  const endIndex =
    page * pageSize > totalEntries ? totalEntries : page * pageSize;

  return (
    <p>
      Listing results <strong>{startingIndex}</strong>&ndash;
      <strong>{endIndex}</strong>. (<strong>{totalEntries}</strong> entries in
      total)
    </p>
  );
};

export default PageDescription;
