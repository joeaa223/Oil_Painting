# 油画艺术展厅 - Oil Painting Gallery

一个现代化的油画展示平台，使用Vue.js + Tailwind CSS前端，Node.js后端，MongoDB数据库构建，部署在Vercel平台。

## 🎨 项目特色

- **现代化设计**: 使用Tailwind CSS打造的响应式设计
- **Vue.js前端**: 基于Vue 3 + Vue Router + Pinia的现代前端架构
- **Node.js后端**: RESTful API服务，支持画作管理和联系表单
- **MongoDB数据库**: 灵活的文档数据库存储
- **Vercel部署**: 一键部署到Vercel平台

## 📁 项目结构

```
oilpainting/
├── client/                 # Vue.js 前端
│   ├── src/
│   │   ├── components/     # Vue 组件
│   │   ├── views/         # 页面组件
│   │   ├── services/      # API 服务
│   │   └── router/        # 路由配置
│   ├── public/            # 静态资源
│   └── package.json       # 前端依赖
├── server/                # Node.js 后端
│   ├── models/           # MongoDB 模型
│   ├── routes/           # API 路由
│   ├── middleware/       # 中间件
│   ├── scripts/          # 脚本文件
│   └── package.json      # 后端依赖
├── vercel.json           # Vercel 部署配置
└── package.json          # 根项目配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- MongoDB (本地或MongoDB Atlas)
- Git

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd oilpainting
```

### 2. 安装依赖

```bash
npm run install:all
```

### 3. 环境配置

复制环境变量模板并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# MongoDB连接字符串
MONGODB_URI=mongodb://localhost:27017/oilpainting

# 服务器端口
PORT=3001

# 环境
NODE_ENV=development
```

### 4. 初始化数据库（可选）

运行种子脚本来添加示例数据：

```bash
cd server
npm run dev & node scripts/seed.js
```

### 5. 启动开发服务器

```bash
npm run dev
```

这会同时启动：
- 前端开发服务器: http://localhost:3000
- 后端API服务器: http://localhost:3001

## 📋 功能特性

### 前端功能

- **首页**: 精美的英雄区域和精选作品展示
- **画廊**: 分类浏览、搜索和详情查看
- **关于**: 项目介绍和团队信息
- **联系**: 联系表单和联系信息
- **Admin面板**: 作品上传和管理功能
- **响应式设计**: 支持桌面和移动设备

### 后端功能

- **画作管理API**: CRUD操作，支持分类和搜索
- **文件上传API**: 支持图片上传和存储
- **联系表单API**: 处理用户消息提交
- **数据验证**: 使用Joi进行输入验证
- **错误处理**: 统一的错误处理机制
- **安全性**: 使用Helmet和CORS保护

## 🌐 部署到Vercel

### 1. 准备MongoDB Atlas

1. 注册 [MongoDB Atlas](https://www.mongodb.com/atlas)
2. 创建集群和数据库
3. 获取连接字符串

### 2. 部署到Vercel

1. 推送代码到GitHub仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 设置环境变量：
   - `MONGODB_URI`: MongoDB Atlas连接字符串
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: 随机字符串（未来功能使用）

### 3. 环境变量配置

在Vercel项目设置中添加以下环境变量：

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oilpainting
NODE_ENV=production
JWT_SECRET=your-super-secret-key
```

### 4. 部署

Vercel会自动构建和部署项目。每次推送到main分支都会触发自动部署。

## 🛠️ 开发命令

```bash
# 安装所有依赖
npm run install:all

# 启动开发服务器（前端+后端）
npm run dev

# 只启动前端
npm run dev:client

# 只启动后端
npm run dev:server

# 构建前端
npm run build

# 启动生产服务器
npm start
```

## 🎨 Admin面板使用说明

### 访问Admin面板

1. 启动项目后，访问 `http://localhost:3000/admin`
2. 无需登录，直接进入管理界面

### 上传新作品

1. **基本信息**:
   - 作品标题（必填）
   - 艺术家姓名（必填）
   - 创作年份（必填）
   - 作品分类（必填）

2. **尺寸信息**:
   - 高度（cm/inch）
   - 宽度（cm/inch）
   - 深度（cm/inch）
   - 单位选择

3. **详细信息**:
   - 作品描述（必填）
   - 材质（默认：Oil on canvas）
   - 是否带框
   - 是否设为精选作品
   - 标签（用逗号分隔）

4. **图片上传**:
   - 支持 JPG、PNG、GIF、WebP 格式
   - 文件大小限制：10MB
   - 点击上传区域或拖拽文件

### 管理现有作品

- 查看所有已上传的作品
- 显示作品缩略图、标题、艺术家、尺寸和分类
- 删除不需要的作品

## 📚 API文档

### 画作相关API

- `GET /api/paintings` - 获取所有画作
- `GET /api/paintings/:id` - 获取单个画作
- `GET /api/paintings/categories/list` - 获取分类列表
- `POST /api/paintings/upload` - 上传画作（包含图片）
- `POST /api/paintings` - 创建画作（管理员）
- `PUT /api/paintings/:id` - 更新画作（管理员）
- `DELETE /api/paintings/:id` - 删除画作（管理员）

### 联系表单API

- `POST /api/contact` - 提交联系表单
- `GET /api/contact` - 获取所有消息（管理员）
- `PUT /api/contact/:id/status` - 更新消息状态（管理员）

## 🎨 技术栈

### 前端
- **Vue.js 3** - 渐进式JavaScript框架
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理
- **Tailwind CSS** - 实用优先的CSS框架
- **Axios** - HTTP客户端
- **Vite** - 快速构建工具

### 后端
- **Node.js** - JavaScript运行时
- **Express.js** - Web应用框架
- **MongoDB** - NoSQL数据库
- **Mongoose** - MongoDB对象建模
- **Joi** - 数据验证
- **Helmet** - 安全中间件
- **CORS** - 跨域资源共享

### 部署
- **Vercel** - 静态站点和Serverless函数托管
- **MongoDB Atlas** - 云数据库服务

## 🔧 自定义配置

### 修改主题色彩

编辑 `client/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      },
      secondary: {
        // 自定义辅助色调
      }
    }
  }
}
```

### 添加新的画作分类

修改 `server/models/Painting.js`:

```javascript
category: {
  type: String,
  enum: ['风景', '肖像', '静物', '抽象', '新分类'],
  default: '其他'
}
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 邮箱: info@oilpainting.com
- 电话: +86 138 0013 8000
- 地址: 北京市朝阳区艺术街123号

---

**享受艺术之美！** 🎨
