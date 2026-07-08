const categories = ["EXAM", "EVENT", "GENERAL"];
const priorities = ["NORMAL", "URGENT"];

export function validateNoticeInput(data: any) {
  const errors: Record<string, string> = {};

  const title = String(data.title || "").trim();
  const body = String(data.body || "").trim();
  const category = String(data.category || "GENERAL").toUpperCase();
  const priority = String(data.priority || "NORMAL").toUpperCase();
  const publishDate = new Date(data.publishDate);
  const imageUrl = data.imageUrl ? String(data.imageUrl).trim() : null;

  if (!title) errors.title = "Title is required";
  if (!body) errors.body = "Body is required";
  if (!categories.includes(category)) errors.category = "Invalid category";
  if (!priorities.includes(priority)) errors.priority = "Invalid priority";
  if (Number.isNaN(publishDate.getTime())) {
    errors.publishDate = "Valid publish date is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      title,
      body,
      category,
      priority,
      publishDate,
      imageUrl,
    },
  };
}