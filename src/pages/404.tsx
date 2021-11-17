import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import styles from '@styles/index.module.scss';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return <div className={styles.container}></div>;
}
