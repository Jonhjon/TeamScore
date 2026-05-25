// =====================================================
// 請在 https://console.firebase.google.com 建立專案後
// 將下方設定替換為你的 Firebase 專案設定值
// Project Settings → 你的應用程式 → firebaseConfig
// =====================================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAD2KQR1YmPx1psHT-oDA6pjRr_LZIyblI",
  authDomain: "teamscore-e3094.firebaseapp.com",
  databaseURL: "https://teamscore-e3094-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teamscore-e3094",
  storageBucket: "teamscore-e3094.firebasestorage.app",
  messagingSenderId: "857885095419",
  appId: "1:857885095419:web:5735d4a6bd21d56c56475e"
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
