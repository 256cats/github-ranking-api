import * as promBundle from 'express-prom-bundle';

export const promMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  autoregister: false,
  promClient: {
    collectDefaultMetrics: {},
  },
  bypass: {
    onRequest: (req) =>
      req.url.includes('/docs') || req.url.includes('/metrics'),
  },
});
