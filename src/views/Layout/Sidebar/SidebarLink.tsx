import React from "react";
import { Link } from "react-router-dom";
import styles from "../Layout.module.sass";

interface Props {
  children: React.ReactNode;
  to: string;
}

const SidebarLink: React.FC<Props> = ({ children, to }) => {
  return (
    <Link to={to} className={styles.sidebarLink}>
      {children}
    </Link>
  );
};

export default SidebarLink;
