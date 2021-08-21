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
  const response = await fetch(requestURL);
  const data = await response.json();
  return data;
}

export async function getCategories(params = "") {
  const requestURL = getStrapiURL(`/categories${params}`);
  const response = await fetch(requestURL);
  const data = await response.json();
  return data;
}

export async function getProvince(params = "") {
  const requestURL = getStrapiURL(`/orders/province/${params}`);
  const response = await fetch(requestURL);
  const data = await response.json();
  return data;
}

export async function getCity(params = "") {
  const requestURL = getStrapiURL(`/orders/city/${params}`);
  const response = await fetch(requestURL);
  const data = await response.json();
  return data;
}

export async function getCost(cityId) {
  const requestURL = getStrapiURL(`/orders/cost/${cityId}`);
  const response = await fetch(requestURL);
  const data = await response.json();
  return data;
}
