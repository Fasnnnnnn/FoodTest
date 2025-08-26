# AI食物卡路里识别网站

一个基于Web的AI食物识别应用，可以通过拍照或上传图片自动识别食物并计算卡路里含量。

## 🚀 功能特性

- 📸 **拍照识别**：直接使用手机或电脑摄像头拍照识别
- 📁 **图片上传**：支持拖拽或点击上传图片
- 🤖 **AI识别**：智能识别食物种类和份量
- 📊 **营养分析**：显示详细的卡路里和营养信息
- 📈 **历史记录**：自动保存识别历史，方便查看
- 📱 **响应式设计**：完美适配手机、平板和电脑

## 🛠️ 技术架构

### 前端技术栈
- **HTML5**：语义化结构
- **CSS3**：现代化样式，Flexbox/Grid布局
- **JavaScript ES6+**：现代JavaScript特性
- **响应式设计**：移动端优先设计
- **Web APIs**：getUserMedia、FileReader、localStorage
- **AI技术**：魔塔社区AI API + 智能模拟识别（回退方案）

### 核心功能实现
- **AI识别**：魔塔社区AI API + 智能模拟识别（无需外部API，可回退）
- **图片处理**：File API和Canvas API
- **相机访问**：getUserMedia API
- **本地存储**：localStorage保存历史记录
- **拖拽上传**：Drag and Drop API
- **错误处理**：网络错误重试机制

## 📋 安装和使用

### 快速开始

1. **克隆或下载项目**
   ```bash
   git clone [项目地址]
   cd food-calorie-ai
   ```

2. **直接运行**
   由于这是一个纯前端项目，可以直接在浏览器中打开 `index.html` 文件。

3. **使用本地服务器（推荐）**
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js
   npx serve .
   
   # 使用VS Code Live Server插件
   # 右键index.html -> Open with Live Server
   ```

### 魔塔社区AI API使用
- **免费使用**：魔塔社区提供免费的AI识别服务
- **高准确率**：基于深度学习的食物识别模型
- **配置简单**：只需替换API令牌即可使用
- **智能回退**：API不可用时自动回退到本地模拟识别

### API配置步骤
1. 访问 [魔塔社区](https://modelscope.cn) 注册账号
2. 获取API令牌（Access Token）
3. 打开 `api-config.js` 文件
4. 将 `YOUR_API_TOKEN` 替换为你的实际令牌
5. 保存文件，刷新页面即可使用真实AI识别

### 完全免费使用方案（回退模式）
当API不可用时，项目将自动回退到**完全免费**的本地AI识别功能：

- ✅ **智能模拟识别**：基于图片文件名和常见食物模式的智能识别
- ✅ **快速响应**：无需加载外部模型，立即返回结果
- ✅ **无限使用**：无任何使用限制或配额
- ✅ **隐私保护**：所有数据在本地处理，不上传服务器

### 开发环境设置

如果你想进一步开发：

```bash
# 安装依赖（如果需要添加构建工具）
npm init -y
npm install -D live-server

# 启动开发服务器
npx live-server --port=3000
```

## 🎯 使用指南

### 基本使用

1. **上传图片**
   - 点击"选择图片"按钮
   - 或将图片拖拽到上传区域
   - 支持 JPG、PNG、WEBP 格式

2. **拍照识别**
   - 点击"拍照识别"按钮
   - 允许浏览器访问相机
   - 对准食物拍照

3. **查看结果**
   - 等待AI识别完成
   - 查看食物名称、描述和营养信息
   - 点击"保存记录"保存到历史

4. **查看历史**
   - 在页面底部查看识别历史
   - 点击历史记录可重新查看详情

### 食物数据库

当前支持识别的食物包括：
- 🍎 苹果、🍌 香蕉、🍚 白米饭
- 🐔 鸡胸肉、🥦 西兰花、🥚 鸡蛋
- 🍞 全麦面包、🐟 三文鱼、🥑 牛油果
- 🥛 酸奶等

## 🔧 自定义和扩展

### 添加新食物

在 `app.js` 的 `foodDatabase` 中添加新食物：

```javascript
const foodDatabase = {
    'newfood': {
        name: '新食物名称',
        calories: 100,      // 每100g的卡路里
        protein: 5,         // 蛋白质(g)
        carbs: 20,          // 碳水化合物(g)
        fat: 3,             // 脂肪(g)
        description: '食物描述'
    }
};
```

### 集成真实AI API

当前使用模拟数据，可以替换为真实的AI API：

```javascript
// 替换 analyzeImage 函数中的模拟部分
async function analyzeImage() {
    // 使用真实的AI服务
    const response = await fetch('https://api.example.com/food-recognition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            image: currentImage.split(',')[1] // base64数据
        })
    });
    
    const result = await response.json();
    displayResults(result);
}
```

### 推荐AI服务

- **Edamam Food Database** - 专门的食品营养数据库，免费套餐可用
- **Google Cloud Vision API** - 强大的图像识别
- **Clarifai** - 专门的食物识别API
- **Microsoft Azure Computer Vision** - 微软认知服务
- **百度AI开放平台** - 中文食物识别

### API配置说明

项目已集成Edamam Food Database API，如需使用真实AI识别：

1. **注册Edamam账号**：访问 [Edamam官网](https://developer.edamam.com/)
2. **获取API密钥**：注册Food Database API获取App ID和App Key
3. **配置API**：创建 `api-config.js` 文件：
   ```javascript
   const API_CONFIG = {
       edamam: {
           appId: '你的App ID',
           appKey: '你的App Key',
           baseUrl: 'https://api.edamam.com/api/food-database/v2/parser',
           nutritionUrl: 'https://api.edamam.com/api/nutrition-data'
       },
       mock: {
           enabled: false  // 设置为false启用真实API
       }
   };
   ```

### API使用限制
- **Edamam免费套餐**：每分钟10次请求，每天100次
- **模拟模式**：无限制，适合开发和测试

## 📊 性能优化

### 图片优化
- 自动压缩大图片
- 限制上传文件大小（建议<5MB）
- 使用WebP格式减少文件大小

### 缓存策略
- 本地存储历史记录
- 图片懒加载
- 结果缓存避免重复识别

## 🌐 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 📝 开发计划

### ✅ 已完成功能
- [x] 项目基础结构搭建
- [x] 响应式UI设计
- [x] 图片上传和拍照功能
- [x] 基础食物数据库
- [x] 历史记录功能
- [x] **魔塔社区AI API集成**（真实AI识别）
- [x] **智能模拟识别**（回退方案）
- [x] 错误处理和加载状态
- [x] API配置管理
- [x] 智能回退机制

### 🚀 即将推出
- [ ] 食物分量估算
- [ ] 营养成分图表
- [ ] 用户偏好设置
- [ ] 多语言支持
- [ ] 离线模式
- [ ] 数据导出功能

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范
- 使用ES6+语法
- 遵循语义化HTML
- CSS使用BEM命名规范
- 添加必要的注释

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件到：[your-email@example.com]

---

**享受健康饮食，从AI识别开始！** 🥗✨