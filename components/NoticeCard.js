import Link from 'next/link';

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateValue));
}

export default function NoticeCard({ notice, onDelete }) {
  return (
    <article className={`notice-card ${notice.priority === 'Urgent' ? 'urgent-card' : ''}`}>
      {notice.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="notice-image" src={notice.imageUrl} alt={notice.title} />
      ) : null}

      <div className="notice-content">
        <div className="card-topline">
          <span className="category-pill">{notice.category}</span>
          {notice.priority === 'Urgent' ? <span className="urgent-badge">Urgent</span> : null}
        </div>

        <h2>{notice.title}</h2>
        <p>{notice.body}</p>

        <div className="card-footer">
          <span>Publish: {formatDate(notice.publishDate)}</span>
          <div className="card-actions">
            <Link href={`/notices/${notice.id}/edit`} className="edit-link">
              Edit
            </Link>
            <button type="button" className="delete-link" onClick={() => onDelete(notice.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
