<p align="center">
  <img src="https://ionicframework.com/docs/icons/logo-icon.png" width="120" alt="App Logo" />
</p>

<h1 align="center">📱 app-business-ionic</h1>

<p align="center">
  Business mobile app built with:
</p>

<p align="center">
  <a href="https://reactnative.dev/">
    <img src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Native" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://ionicframework.com/">
    <img src="https://img.shields.io/badge/Ionic-%234E8EF7.svg?style=for-the-badge&logo=Ionic&logoColor=white" alt="Ionic" />
  </a>
  <a href="https://firebase.google.com/">
    <img src="https://img.shields.io/badge/firebase-%23FFA000.svg?style=for-the-badge&logo=firebase" alt="Firebase" />
  </a>
</p>

---

## 🛠️ Main Features

- ✅ User authentication with Firebase Auth.
- ✅ Secure data storage in Firestore.
- ✅ Responsive and adaptable interface for Android/iOS.
- ✅ Intuitive navigation and fast loading.

---

<details>
  <summary>☎️ Contact me</summary>
  <div>
    <samp>
      <br>
      <a href="mailto:ytorresastorga@gmail.com" target="_blank">
        <img src="https://img.shields.io/badge/gmail-%2300acee.svg?color=EA4335&style=for-the-badge&logo=gmail&logoColor=white" alt="gmail" style="margin-bottom: 5px;" />
      </a>
      <a href="https://wa.me/51910317266" target="_blank">
        <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="whatsapp" style="margin-bottom: 5px;" />
      </a>
    </samp>
  </div>
</details>

---

## 📦 Installation

```bash
# Install Ionic CLI globally if you haven't done it yet
npm install -g @ionic/cli

# Clone the repository
git clone https://github.com/YehinnerTA/app-i-van-phone-shop.git
cd app-i-van-phone-shop

# Install dependencies
npm install

# Initialize Capacitor (if not already initialized)
npx cap init

# Sync Capacitor to ensure native platforms are updated
npx cap sync

# To run the app in the browser:
ionic serve

# To build and deploy to Android/iOS (optional)
ionic build
npx cap add android
npx cap open android
# For iOS (Mac only):
npx cap add ios
npx cap open ios
