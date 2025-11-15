export const GET_CATEGORIES = `*[_type == "category"]{
  _id,
  title,
  "slug": slug.current,
  icon,
  description,
}`;
