import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} to="/dashboard">Dashboard</Link>
      <Link className={styles.link} to="/add">Adicionar Sensor</Link>
      <Link className={styles.link} to="/import">Importar</Link>
      <Link className={styles.link} to="/export">Exportar</Link>
      <Link className={styles.link} to="/login">Sair</Link>
    </nav>
  );
}