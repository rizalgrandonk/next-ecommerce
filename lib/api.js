export function getStrapiURL(path = "") {
  return `${process.env.STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

export function getMediaURL(media) {
  if (typeof media !== "undefined") {
    if (media === null) {
      return "";
    }
    const imageURL = media.url.startsWith("/")
      ? getStrapiURL(media.url)
      : media.url;

    return imageURL;
  } else {
    return "";
  }
}

export async function getProducts(params = "") {
  const requestURL = getStrapiURL(`/products${params}`);
  const respons = await fetch(requestURL);
  const data = await respons.json();
  return data;
}

export async function getCategories(params = "") {
  const requestURL = getStrapiURL(`/categories${params}`);
  const respons = await fetch(requestURL);
  const data = await respons.json();
  return data;
}
