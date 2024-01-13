export default () => ({
  githubRanking: {
    cacheTTLMs: parseInt(process.env.CACHE_TTL_MS, 10) || 600000, // 10 minutes
  },
});
