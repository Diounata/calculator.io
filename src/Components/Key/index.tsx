import styles from './styles.module.scss';

interface KeyProps {
  children: string;
}

export default function Key({ children }: KeyProps) {
  return <div className={styles.keyContainer}>{children}</div>;
}
