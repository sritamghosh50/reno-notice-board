import Head from 'next/head';
import Link from 'next/link';
import NoticeForm from '../../components/NoticeForm';

export default function NewNoticePage() {
  return (
    <>
      <Head>
        <title>Add Notice · Reno Notice Board</title>
      </Head>
      <main className="container narrow-container">
        <Link href="/" className="back-link">← Back to notices</Link>
        <div className="page-header">
          <p className="eyebrow">Create</p>
          <h1>Add Notice</h1>
        </div>
        <NoticeForm mode="create" />
      </main>
    </>
  );
}
