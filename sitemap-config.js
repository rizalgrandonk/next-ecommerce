const siteUrl = "https://grandonkmerch.vercel.app";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/checkout" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/checkout"],
};
