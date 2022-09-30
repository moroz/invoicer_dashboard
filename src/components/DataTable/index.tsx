import React from "react";
import styles from "./DataTable.module.sass";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  clickable?: boolean;
}

const DataTable: React.FC<Props> = ({ children, clickable }) => {
  return (
    <table
      className={clsx(
        "table is-fullwidth is-bordered",
        styles.table,
        clickable && [styles.clickable, "is-hoverable"]
      )}
    >
      {children}
    </table>
  );
};

export default DataTable;
