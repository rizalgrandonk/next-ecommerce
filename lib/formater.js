import en from "lang/en";
import id from "lang/id";

export const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const localize = (locale, string) => {
  const translate = locale == "en" ? en : id;

  return translate[string];
};
