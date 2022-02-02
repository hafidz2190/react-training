const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:8000/' }));
  app.use('/hub', createProxyMiddleware({ target: 'http://localhost:8000/', ws: true }));
};
