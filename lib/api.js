export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
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

export async function getToken(body) {
  const requestURL = getStrapiURL(`/orders/token`);
  const response = await fetch(requestURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

export async function createOrder(body) {
  const requestURL = getStrapiURL(`/orders`);
  try {
    const response = await fetch(requestURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
}

export async function getOrder(orderId, email) {
  const requestURL = getStrapiURL(`/orders/${orderId}`);
  const response = await fetch(requestURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return data;
}
