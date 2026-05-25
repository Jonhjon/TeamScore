// =====================================================
// 請在 https://console.firebase.google.com 建立專案後
// 將下方設定替換為你的 Firebase 專案設定值
// Project Settings → 你的應用程式 → firebaseConfig
// =====================================================
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// =====================================================
// 活動前請修改以下密碼
// =====================================================
const PASSWORDS = {
  admin: "admin2024",
  teams: [
    "red2024",
    "blue2024",
    "green2024",
    "yellow2024"
  ]
};

const TEAM_COLORS = ['#FF5733', '#33C1FF', '#27AE60', '#F1C40F'];
const TEAM_TEXT_COLORS = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#000000'];

const DEFAULT_TEAMS = [
  { name: "紅隊", score: 0, imageUrl: "https://placehold.co/150/FF5733/FFFFFF?text=紅" },
  { name: "藍隊", score: 0, imageUrl: "https://placehold.co/150/33C1FF/FFFFFF?text=藍" },
  { name: "綠隊", score: 0, imageUrl: "https://placehold.co/150/27AE60/FFFFFF?text=綠" },
  { name: "黃隊", score: 0, imageUrl: "https://placehold.co/150/F1C40F/000000?text=黃" }
];
