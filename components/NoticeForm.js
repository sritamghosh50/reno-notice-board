import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  body: '',
  category: 'General',
  priority: 'Normal',
  publishDate: new Date().toISOString().split('T')[0],
  imageUrl: ''
};

function toDateInputValue(dateValue) {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
}

export default function NoticeForm({ mode = 'create', noticeId }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    if (mode !== 'edit' || !noticeId) return;

    async function loadNotice() {
      try {
        const response = await fetch(`/api/notices/${noticeId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Unable to load notice.');
        }

        setForm({
          title: result.notice.title || '',
          body: result.notice.body || '',
          category: result.notice.category || 'General',
          priority: result.notice.priority || 'Normal',
          publishDate: toDateInputValue(result.notice.publishDate),
          imageUrl: result.notice.imageUrl || ''
        });
      } catch (error) {
        setPageError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadNotice();
  }, [mode, noticeId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setPageError('');

    const url = mode === 'edit' ? `/api/notices/${noticeId}` : '/api/notices';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        throw new Error(result.message || 'Unable to save notice.');
      }

      router.push('/');
    } catch (error) {
      setPageError(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="muted">Loading notice...</p>;
  }

  return (
    <form className="notice-form" onSubmit={handleSubmit} noValidate>
      {pageError ? <div className="error-box">{pageError}</div> : null}

      <label>
        Title <span>*</span>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Example: Semester exam timetable published"
        />
        {errors.title ? <small>{errors.title}</small> : null}
      </label>

      <label>
        Body <span>*</span>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          rows="6"
          placeholder="Write the full notice details here..."
        />
        {errors.body ? <small>{errors.body}</small> : null}
      </label>

      <div className="form-grid">
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
            <option value="General">General</option>
          </select>
          {errors.category ? <small>{errors.category}</small> : null}
        </label>

        <label>
          Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
          {errors.priority ? <small>{errors.priority}</small> : null}
        </label>
      </div>

      <label>
        Publish Date <span>*</span>
        <input type="date" name="publishDate" value={form.publishDate} onChange={handleChange} />
        {errors.publishDate ? <small>{errors.publishDate}</small> : null}
      </label>

      <label>
        Image URL <em>(optional bonus)</em>
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/notice-image.jpg"
        />
        {errors.imageUrl ? <small>{errors.imageUrl}</small> : null}
      </label>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : mode === 'edit' ? 'Update Notice' : 'Create Notice'}
        </button>
        <button type="button" className="secondary" onClick={() => router.push('/')} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}
