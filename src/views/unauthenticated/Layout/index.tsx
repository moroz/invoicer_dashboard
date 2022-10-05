import { APP_NAME } from "@/config";
import useAuth from "@hooks/useAuth";
import Loader from "@views/Layout/Loader";
import React, { useEffect } from "react";
import ReactHelmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.sass";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className={styles.root}>
      <ReactHelmet>
        <title>
          {title} | {APP_NAME}
        </title>
      </ReactHelmet>
      <div className={clsx("card", styles.card)}>
        <div className="card-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
