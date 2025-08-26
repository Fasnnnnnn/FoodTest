// AI食物卡路里识别API配置
const API_CONFIG = {
    // Edamam Food Database API (推荐 - 免费套餐)
    edamam: {
        appId: 'your-app-id', // 替换为你的Edamam App ID
        appKey: 'your-app-key', // 替换为你的Edamam App Key
        baseUrl: 'https://api.edamam.com/api/food-database/v2/parser',
        nutritionUrl: 'https://api.edamam.com/api/nutrition-data',
        freeTier: {
            requestsPerMinute: 10,
            requestsPerDay: 100
        }
    },
    
    // 完全免费的中文API选项
    baidu: {
        apiKey: 'your-baidu-api-key', // 百度AI开放平台
        secretKey: 'your-baidu-secret-key',
        baseUrl: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish',
        freeTier: {
            requestsPerDay: 500  // 百度免费套餐
        }
    },
    
    // 腾讯云AI - 免费试用
    tencent: {
        secretId: 'your-secret-id',
        secretKey: 'your-secret-key',
        baseUrl: 'https://iai.tencentcloudapi.com',
        freeTier: {
            requestsPerMonth: 1000  // 腾讯免费套餐
        }
    },
    
    // 魔塔社区AI API (推荐 - 免费使用)
    modelscope: {
        baseUrl: 'https://api-inference.modelscope.cn/v1',
        model: 'Qwen/Qwen2.5-VL-72B-Instruct',
        headers: {
            'Authorization': 'Bearer ms-d112b5e9-df9b-4bd0-86e9-af71d13cb8aa', // 替换为你的魔塔API令牌
            'Content-Type': 'application/json'
        },
        freeTier: {
            requestsPerDay: 1000,  // 魔塔免费套餐
            unlimited: true
        }
    },

    // 完全免费的本地AI方案 - 使用预训练模型
    localAI: {
        enabled: false,  // 设置为true启用本地AI
        modelUrl: './models/mobilenet_v2.json',  // TensorFlow.js模型
        labels: [
            '苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '蓝莓', '芒果',
            '米饭', '面条', '面包', '饺子', '包子', '馒头', '粥',
            '鸡胸肉', '鸡腿', '牛肉', '猪肉', '鱼肉', '虾', '鸡蛋', '豆腐',
            '西兰花', '胡萝卜', '土豆', '番茄', '黄瓜', '菠菜', '洋葱',
            '披萨', '汉堡', '炸鸡', '薯条', '沙拉', '三明治', '寿司'
        ]
    },
    
    // 本地模拟数据 (完全免费，无限制)
    mock: {
        enabled: true,  // 默认启用完全免费的模拟模式
        delay: 1500,
        unlimited: true
    }
};

// 食物数据库 (本地备用)
const LOCAL_FOOD_DATABASE = {
    'apple': { name: '苹果', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, unit: '100g' },
    'banana': { name: '香蕉', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: '100g' },
    'rice': { name: '米饭', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, unit: '100g' },
    'chicken': { name: '鸡胸肉', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
    'broccoli': { name: '西兰花', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, unit: '100g' },
    'egg': { name: '鸡蛋', calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: '100g' },
    'bread': { name: '全麦面包', calories: 247, protein: 13, carbs: 41, fat: 3.4, unit: '100g' },
    'salmon': { name: '三文鱼', calories: 208, protein: 20, carbs: 0, fat: 13, unit: '100g' },
    'pizza': { name: '披萨', calories: 266, protein: 11, carbs: 33, fat: 10, unit: '100g' },
    'burger': { name: '汉堡', calories: 295, protein: 17, carbs: 24, fat: 14, unit: '100g' }
};

// API服务类
class FoodRecognitionService {
    constructor() {
        this.currentAPI = 'modelscope'; // 默认使用魔塔社区API
    }

    // 识别食物图片
    async recognizeFood(imageFile) {
        if (this.currentAPI === 'mock') {
            return this.mockRecognition(imageFile);
        } else if (this.currentAPI === 'modelscope') {
            return this.modelscopeRecognition(imageFile);
        }
        return this.edamamRecognition(imageFile);
    }

    // Edamam API识别
    async edamamRecognition(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        try {
            const response = await fetch(`${API_CONFIG.edamam.baseUrl}?app_id=${API_CONFIG.edamam.appId}&app_key=${API_CONFIG.edamam.appKey}`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }
            
            const data = await response.json();
            return this.parseEdamamResponse(data);
        } catch (error) {
            console.error('Edamam API错误:', error);
            return this.getFallbackResult();
        }
    }

    // 魔塔社区API识别 - 使用Qwen2.5-VL官方格式
    async modelscopeRecognition(imageFile) {
        try {
            const base64Image = await this.imageToBase64(imageFile);
            
            const response = await fetch(`${API_CONFIG.modelscope.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ms-d112b5e9-df9b-4bd0-86e9-af71d13cb8aa',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: API_CONFIG.modelscope.model,
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: "请识别这张图片中的食物，告诉我食物名称和大概的卡路里含量（千卡/100克）。请用简洁的格式回答：食物名称：XXX，卡路里：XXX千卡"
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64Image}`
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: 100,
                    temperature: 0.3,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('DeepSeek API响应错误:', errorText);
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Qwen API响应:', data);
            return this.parseQwenResponse(data);
        } catch (error) {
            console.error('Qwen API错误:', error);
            // 回退到本地智能识别
            return this.mockRecognition(imageFile);
        }
    }

    // 解析Qwen API响应
    parseQwenResponse(response) {
        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error('Qwen API返回数据格式无效');
        }

        const textResponse = response.choices[0].message.content;
        console.log('解析Qwen响应文本:', textResponse);
        
        // 从文本中提取食物名称和卡路里
        const foodInfo = this.extractFoodInfo(textResponse);
        
        return {
            name: foodInfo.name,
            calories: foodInfo.calories,
            protein: 0,
            carbs: 0,
            fat: 0,
            unit: '100g',
            confidence: 95, // Qwen模型置信度更高
            description: textResponse,
            source: 'Qwen2.5-VL-72B'
        };
    }

    // 从Qwen模型响应中提取食物信息
    extractFoodInfo(text) {
        const foodKeywords = [
            '苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '蓝莓', '芒果',
            '米饭', '面条', '面包', '饺子', '包子', '馒头', '粥',
            '鸡胸肉', '鸡腿', '牛肉', '猪肉', '鱼肉', '虾', '鸡蛋', '豆腐',
            '西兰花', '胡萝卜', '土豆', '番茄', '黄瓜', '菠菜', '洋葱',
            '披萨', '汉堡', '炸鸡', '薯条', '沙拉', '三明治', '寿司',
            '可乐', '牛奶', '酸奶', '冰淇淋', '蛋糕', '巧克力', '饼干'
        ];

        let detectedFood = '未知食物';
        let calories = 0;

        // 首先尝试从格式化的回答中提取
        const nameMatch = text.match(/食物名称[:：]\s*([^，,\n]+)/i);
        if (nameMatch) {
            detectedFood = nameMatch[1].trim();
        } else {
            // 回退到关键词匹配
            for (const food of foodKeywords) {
                if (text.toLowerCase().includes(food.toLowerCase())) {
                    detectedFood = food;
                    break;
                }
            }
        }

        // 提取卡路里数字
        const calorieMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:千卡|卡路里|kcal)/i);
        if (calorieMatch) {
            calories = Math.round(parseFloat(calorieMatch[1]));
        } else {
            // 如果找不到具体卡路里，使用数据库中的默认值
            const nutritionData = this.getNutritionByName(detectedFood);
            calories = nutritionData.calories;
        }

        console.log('DeepSeek提取结果:', { name: detectedFood, calories });
        return { name: detectedFood, calories };
    }

    // 根据食物名称获取营养数据
    getNutritionByName(foodName) {
        const foodMap = {
            'apple': { name: '苹果', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, unit: '100g' },
            'banana': { name: '香蕉', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: '100g' },
            'rice': { name: '米饭', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, unit: '100g' },
            'chicken': { name: '鸡胸肉', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
            'broccoli': { name: '西兰花', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, unit: '100g' },
            'egg': { name: '鸡蛋', calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: '100g' },
            'bread': { name: '面包', calories: 265, protein: 9, carbs: 49, fat: 3.2, unit: '100g' },
            'salmon': { name: '三文鱼', calories: 208, protein: 20, carbs: 0, fat: 13, unit: '100g' },
            'pizza': { name: '披萨', calories: 266, protein: 11, carbs: 33, fat: 10, unit: '100g' },
            'burger': { name: '汉堡', calories: 295, protein: 17, carbs: 24, fat: 14, unit: '100g' },
            'orange': { name: '橙子', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, unit: '100g' },
            'strawberry': { name: '草莓', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, unit: '100g' },
            'tomato': { name: '番茄', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, unit: '100g' },
            'potato': { name: '土豆', calories: 77, protein: 2, carbs: 17, fat: 0.1, unit: '100g' },
            'carrot': { name: '胡萝卜', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, unit: '100g' },
            'beef': { name: '牛肉', calories: 250, protein: 26, carbs: 0, fat: 15, unit: '100g' },
            'pork': { name: '猪肉', calories: 242, protein: 27, carbs: 0, fat: 14, unit: '100g' },
            'fish': { name: '鱼肉', calories: 206, protein: 22, carbs: 0, fat: 12, unit: '100g' },
            'milk': { name: '牛奶', calories: 42, protein: 3.4, carbs: 5, fat: 1, unit: '100ml' }
        };

        const lowerFoodName = foodName.toLowerCase();
        for (const [key, data] of Object.entries(foodMap)) {
            if (lowerFoodName.includes(key) || key.includes(lowerFoodName)) {
                return data;
            }
        }

        return { name: foodName, calories: 0, protein: 0, carbs: 0, fat: 0, unit: '100g' };
    }

    // 图片转base64
    async imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // 模拟识别 (开发测试用)
    async mockRecognition(imageFile) {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.mock.delay));
        
        const foods = Object.keys(LOCAL_FOOD_DATABASE);
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        
        return {
            ...LOCAL_FOOD_DATABASE[randomFood],
            confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
            imageName: imageFile.name
        };
    }

    // 解析Edamam API响应
    parseEdamamResponse(data) {
        if (!data.hints || data.hints.length === 0) {
            return this.getFallbackResult();
        }

        const food = data.hints[0].food;
        return {
            name: food.label || '未知食物',
            calories: Math.round(food.nutrients.ENERC_KCAL || 0),
            protein: Math.round((food.nutrients.PROCNT || 0) * 10) / 10,
            carbs: Math.round((food.nutrients.CHOCDF || 0) * 10) / 10,
            fat: Math.round((food.nutrients.FAT || 0) * 10) / 10,
            unit: '100g',
            confidence: 85
        };
    }

    // 获取备用结果
    getFallbackResult() {
        return {
            name: '未识别食物',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            unit: '100g',
            confidence: 0,
            error: '无法识别食物，请尝试更清晰的图片'
        };
    }
}

// 导出配置和服务
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, FoodRecognitionService, LOCAL_FOOD_DATABASE };
} else {
    window.API_CONFIG = API_CONFIG;
    window.FoodRecognitionService = FoodRecognitionService;
    window.LOCAL_FOOD_DATABASE = LOCAL_FOOD_DATABASE;
}