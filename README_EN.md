# AI Food Calorie Recognition Website

A web-based AI food recognition application can automatically identify food and calculate its calorie content by taking photos or uploading images.

## 🚀 Functional features

- 📸 ** photo recognition ** : Recognition by taking photos directly using the camera of a mobile phone or computer
- 📁 ** image upload ** : drag-and-drop or click to upload images is supported
- 🤖 **AI recognition ** : intelligently identify types and portions of food
- 📊 ** nutritional analysis ** : displays detailed calorie and nutritional information
- 📈 ** history record ** : Automatically save the identification history for easy viewing
- 📱 ** responsive design ** : perfectly compatible with mobile phones, tablets and computers

## 🛠️ technical architecture

Front-end technology stack
- **HTML5** : Semantic Structure
- **CSS3** : Modern style, Flexbox/Grid layout
- **JavaScript ES6+** : Modern JavaScript features
- ** Responsive Design ** : Mobile-first design
**Web APIs** : getUserMedia, FileReader, localStorage
- **AI Technology ** : Magic Tower Community AI API + Intelligent Simulation Recognition (Fallback Solution)

Core function implementation
- **AI Recognition ** : Magic Tower Community AI API + Intelligent Simulation Recognition (No external API required, rollback available)
- "Image Processing" : File API and Canvas API
- ** Camera Access ** : getUserMedia API
- ** Local Storage ** : localStorage saves historical records
- ** Drag Upload ** : Drag and Drop API
- ** Error Handling ** : Network error retry mechanism


## 🎯 User guide

Basic usage

1. Upload pictures
Click the "Select Picture" button
- Or drag the picture to the upload area
- Supports JPG, PNG and WEBP formats

2. "Photo recognition"
Click the "Photo Recognition" button
- Allow the browser to access the camera
Take a photo of the food

3. "View results"
- Wait for the AI recognition to complete
Check the food names, descriptions and nutritional information
Click "Save Record" to save it to history

4. "View history"
View the recognition history at the bottom of the page
Click on the history record to view the details again

Food database

The currently supported recognized foods include:
- 🍎 apples, 🍌 bananas, 🍚 white rice
- 🐔 chicken breast, 🥦 broccoli, 🥚 eggs
- 🍞 whole wheat bread, 🐟 salmon, 🥑 avocado
- 🥛 yogurt, etc

Performance optimization of 📊

Image optimization
- Automatically compress large images
- Limit the size of uploaded files (recommended <5MB)
- Use the WebP format to reduce file size

Cache strategy
- Local storage of historical records
- Lazy loading of images
The result cache avoids duplicate identification

Browser compatibility: 🌐

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ mobile browser

## 📝 development plan

### ✅ completed function
- [x] Project infrastructure construction
- [x] Responsive UI design
- [x] Image upload and photo-taking functions
- [x] Basic Food database
- [x] History record function
- [x] Magic Tower Community AI API Integration (Real AI Recognition)
- [x] Intelligent Simulation Recognition (fallback Scheme)
- [x] Error handling and loading status
- [x] API configuration management
- [x] Intelligent fallback mechanism

### 🚀 is coming soon
- [] Food portion estimation
- [] Nutrition chart
User preference Settings
- [] Multilingual support
Offline mode
Data export function


## 📄 license

MIT License - For details, see the LICENSE file


---

Enjoy a healthy diet, starting with AI recognition! ** 🥗✨
