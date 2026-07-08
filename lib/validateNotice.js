const allowedCategories = ['Exam', 'Event', 'General'];
const allowedPriorities = ['Normal', 'Urgent'];

export function validateNoticeInput(input = {}) {
  const errors = {};

  const title = typeof input.title === 'string' ? input.title.trim() : '';
  const body = typeof input.body === 'string' ? input.body.trim() : '';
  const category = input.category || 'General';
  const priority = input.priority || 'Normal';
  const publishDateValue = input.publishDate;
  const imageUrl = typeof input.imageUrl === 'string' ? input.imageUrl.trim() : '';

  if (!title) {
    errors.title = 'Title is required.';
  }

  if (!body) {
    errors.body = 'Body is required.';
  }

  if (!allowedCategories.includes(category)) {
    errors.category = 'Category must be Exam, Event, or General.';
  }

  if (!allowedPriorities.includes(priority)) {
    errors.priority = 'Priority must be Normal or Urgent.';
  }

  const publishDate = new Date(publishDateValue);
  if (!publishDateValue || Number.isNaN(publishDate.getTime())) {
    errors.publishDate = 'Publish date must be a valid date.';
  }

  if (imageUrl) {
    try {
      const url = new URL(imageUrl);
      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.imageUrl = 'Image URL must start with http or https.';
      }
    } catch (_error) {
      errors.imageUrl = 'Image URL must be valid.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      title,
      body,
      category,
      priority,
      publishDate,
      imageUrl: imageUrl || null
    }
  };
}
