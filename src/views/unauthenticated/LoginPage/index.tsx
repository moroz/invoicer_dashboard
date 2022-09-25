import React from "react";
import styles from "./LoginPage.module.sass";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  return (
    <div className={styles.root}>
      <p>Hello world!</p>
    </div>
  );
};

export default LoginPage;
