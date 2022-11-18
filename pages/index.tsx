import useSWR from 'swr';

import styles from '../styles/Home.module.css';

const fetcher = (url: string): Promise<any> =>
  fetch(url, { headers: new Headers({ 'Content-Type': 'application/json' }) }).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/hello', fetcher);

  return <div className={styles.container}>{JSON.stringify(data ?? error)}</div>;
}
