const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// 启用 CORS
app.use(cors());



// 代理配置示例 1: 代理 /api 路径到目标服务器
app.use('/api', createProxyMiddleware({
  target: process.env.TARGET_API_URL || 'https://app-api.autochuang.com',
  changeOrigin: true,
  cookieDomainRewrite: '', // 移除 cookie 的 domain 限制
  selfHandleResponse: false, // 自己处理响应以便打印内容
  onProxyReq: (proxyReq, req) => {
    // 添加固定的 cookie
    const existingCookie = proxyReq.getHeader('Cookie');
    const newCookie = '_sd_token=9083b0867ecd4fb0a01113e92cafaf02';

    if (existingCookie) {
      proxyReq.setHeader('Cookie', `${existingCookie}; ${newCookie}`);
    } else {
      proxyReq.setHeader('Cookie', newCookie);
    }

    console.log(`[代理请求] ${req.method} ${req.url} -> ${proxyReq.path}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('[代理错误]', err);
    res.status(500).json({
      error: '代理请求失败',
      message: err.message
    });
  }
}));

app.use("*", express.static("login"));




// // 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    error: '服务器内部错误',
    message: err.message
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`代理服务器已启动`);
  console.log(`监听端口: ${PORT}`);
  console.log(`本地地址: http://localhost:${PORT}`);
  console.log(`========================================\n`);
  console.log(`代理配置:`);
  console.log(`  /api -> ${process.env.TARGET_API_URL || 'https://app-api.autochuang.com'}`);
  console.log(`\n========================================\n`);
});
