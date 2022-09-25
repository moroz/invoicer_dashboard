import Layout from "..";
import styles from "./Loader.module.sass";

const Loader = () => {
  return (
    <div className={styles.root}>
      <h1 className="title">加載中</h1>
    </div>
  );
};

export const LayoutLoader = () => {
  return (
    <Layout padding={false} header={false}>
      <Loader />
    </Layout>
  );
};

export default Loader;
