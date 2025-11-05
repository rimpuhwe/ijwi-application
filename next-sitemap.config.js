/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://www.ijwihub.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/about"),
    await config.transform(config, "/services"),
    await config.transform(config, "/portfolio"),
    await config.transform(config, "/contact"),
  ],
};
