import useAuth from "@hooks/useAuth";
import styles from "../Layout.module.sass";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { APP_NAME } from "@/config";

const Sidebar = () => {
  const { signOut, user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.title}>
        <h1 className="title">{APP_NAME}</h1>
      </Link>
      <nav>
        <SidebarLink to="/">Issue an invoice</SidebarLink>
        <SidebarLink to="/companies">Companies</SidebarLink>
      </nav>
      <section className={styles.userData}>
        <p>Current user:</p>
        <p className={styles.userName}>{user?.email}</p>
      </section>
      <button onClick={signOut} className={styles.logout}>
        Sign out
      </button>
    </aside>
  );
};

export default Sidebar;
