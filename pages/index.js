import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NoticeCard from '../components/NoticeCard';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadNotices() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/notices');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to load notices.');
      }

      setNotices(result.notices);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  async function handleDelete(noticeId) {
    const confirmed = window.confirm('Are you sure you want to delete this notice?');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/notices/${noticeId}`, { method: 'DELETE' });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to delete notice.');
      }

      setNotices((current) => current.filter((notice) => notice.id !== noticeId));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <Head>
        <title>Reno Notice Board</title>
        <meta name="description" content="Notice Board CRUD assignment built with Next.js, Prisma and MySQL." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">Reno Platforms · Engineering</p>
            <h1>Notice Board</h1>
            <p className="hero-text">
              Create, read, update and delete institutional notices. Urgent notices are displayed first.
            </p>
          </div>
          <Link href="/notices/new" className="primary-link">
            + Add Notice
          </Link>
        </section>

        {error ? <div className="error-box">{error}</div> : null}
        {loading ? <p className="muted">Loading notices...</p> : null}

        {!loading && notices.length === 0 ? (
          <section className="empty-state">
            <h2>No notices yet</h2>
            <p>Add your first notice to test create, edit and delete.</p>
            <Link href="/notices/new" className="primary-link">
              Create Notice
            </Link>
          </section>
        ) : null}

        <section className="notice-grid" aria-label="Notice list">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} onDelete={handleDelete} />
          ))}
        </section>
      </main>
    </>
  );
}
