import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NoticeForm from '../../../components/NoticeForm';

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Edit Notice · Reno Notice Board</title>
      </Head>
      <main className="container narrow-container">
        <Link href="/" className="back-link">← Back to notices</Link>
        <div className="page-header">
          <p className="eyebrow">Update</p>
          <h1>Edit Notice</h1>
        </div>
        {id ? <NoticeForm mode="edit" noticeId={id} /> : <p className="muted">Loading...</p>}
      </main>
    </>
  );
}
