import styles from "./Home.module.scss";

const TITLE = "Домашняя";

const Header = ({ title, Icon, user }) => {
  return (
    <div className={styles.header}>
      <Icon className={styles.icon} />
    </div>
  );
};

const Home = () => {
  return <div>Home</div>;
};

export default Home;
