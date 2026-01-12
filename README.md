# 自动创建代理服务器

使用 Express 和 http-proxy-middleware 构建的 HTTP 代理服务器。

## 功能特性

- ✅ 基于 Express 的轻量级代理服务器
- ✅ 使用 http-proxy-middleware 中间件
- ✅ 支持多个代理路径配置
- ✅ CORS 跨域支持
- ✅ 请求/响应日志记录
- ✅ 环境变量配置
- ✅ 错误处理

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
PORT=3000
TARGET_API_URL=https://your-api-server.com
PROXY_TARGET_URL=https://your-target-server.com
```

### 3. 启动服务器

```bash
# 生产模式
npm start

# 开发模式（自动重启）
npm run dev
```

## 使用示例

### API 代理

请求：
```bash
curl http://localhost:3000/api/users
```

会被代理到：
```
https://jsonplaceholder.typicode.com/users
```

### 通用代理

请求：
```bash
curl http://localhost:3000/proxy/users
```

会被代理到：
```
https://api.github.com/users
```

## 代理配置说明

在 `server.js` 中可以配置多个代理路径：

```javascript
app.use('/api', createProxyMiddleware({
  target: 'https://your-api-server.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // 移除路径前缀
  }
}));
```

### 常用配置项

- `target`: 目标服务器地址
- `changeOrigin`: 修改请求头中的 origin 为目标 URL
- `pathRewrite`: 重写请求路径
- `onProxyReq`: 代理请求前的钩子
- `onProxyRes`: 代理响应后的钩子
- `onError`: 错误处理钩子

## 项目结构

```
auto-creator-proxy/
├── server.js          # 主服务器文件
├── package.json       # 项目配置
├── .env              # 环境变量（不提交到 git）
├── .env.example      # 环境变量示例
├── .gitignore        # Git 忽略文件
└── README.md         # 项目说明
```

## 技术栈

- **Express**: Web 框架
- **http-proxy-middleware**: HTTP 代理中间件
- **dotenv**: 环境变量管理
- **cors**: CORS 跨域支持
- **nodemon**: 开发模式自动重启

## License

MIT
