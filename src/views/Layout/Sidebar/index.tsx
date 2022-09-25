import useAuth from "@hooks/useAuth";
import styles from "../Layout.module.sass";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { signOut, user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.title}>
        <h1 className="title">{"invoicer"}</h1>
      </Link>
      <nav>
        <SidebarLink to="/">編輯藝術作品</SidebarLink>
        <SidebarLink to="/exhibition">展覽設定</SidebarLink>
        <SidebarLink to="/exhibitions" admin>
          展覽列表
        </SidebarLink>
        <SidebarLink to="/users" admin>
          用戶管理
        </SidebarLink>
      </nav>
      <section className={styles.userData}>
        <p>現在使用者：</p>
        <p className={styles.userName}>{user?.email}</p>
      </section>
      <button onClick={signOut} className={styles.logout}>
        登出
      </button>
    </aside>
  );
};

export default Sidebar;
