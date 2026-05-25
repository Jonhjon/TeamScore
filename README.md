# 🏆 隊伍分數計分板 (TeamScore)

專為營隊活動設計的即時線上計分系統。支援多裝置透過網際網路同時連線，總控、對輔、觀眾各用不同畫面，分數異動即時同步。

## 🌐 線上網址

| 畫面 | 網址 |
|------|------|
| 📺 投影顯示 | https://teamscore-e3094.web.app/index.html |
| ⚙️ 總控畫面 | https://teamscore-e3094.web.app/control.html |
| 🏃 對輔加分 | https://teamscore-e3094.web.app/team.html |

## ✨ 特色

- **三畫面設計**：
  - **顯示畫面 (`index.html`)**：純淨展示介面，適合投影到大螢幕，無需登入。
  - **總控畫面 (`control.html`)**：密碼保護，可調整分數、修改隊名、更換圖片，並查看完整操作記錄。
  - **對輔畫面 (`team.html`)**：各隊對輔專用，選擇隊伍並輸入密碼後，只能對自己的隊伍加減分。
- **即時同步**：基於 Firebase Realtime Database，任何裝置的操作在所有畫面上毫秒級更新。
- **密碼保護**：總控與各隊對輔各有獨立密碼，防止誤操作。
- **操作記錄 (Log)**：所有分數異動、改名、換圖操作皆自動記錄時間、操作者、異動數值，顯示於總控畫面側欄。
- **自訂加分**：可輸入任意分數後按 +/- 一鍵加減，不限固定單位。
- **圖片客製化**：點擊隊伍圖片可上傳更換，圖片壓縮後儲存於雲端資料庫。
- **分數保護**：分數不會低於 0。

## 👥 各角色使用說明

### 📺 投影人員
1. 開啟顯示畫面網址，拖曳至投影機螢幕並按 F11 全螢幕。
2. 不需要登入，畫面會自動即時更新。

### ⚙️ 總控（管理員）
1. 開啟總控畫面，輸入管理員密碼登入。
2. 可調整任一隊伍分數、修改隊名、更換圖片。
3. 右側側欄即時顯示所有操作記錄。
4. 可一鍵清空所有分數或重置全部設定。

### 🏃 對輔（各隊）
1. 開啟對輔畫面，選擇自己的隊伍，輸入隊伍密碼登入。
2. 輸入分數後點擊「＋加分」或「－扣分」。
3. 只能操作自己的隊伍，操作記錄會自動上傳。

## 🔑 密碼

| 角色 | 密碼 |
|------|------|
| 總控管理員 | `admin2026` |
| 紅隊對輔 | `red2026` |
| 藍隊對輔 | `blue2026` |
| 綠隊對輔 | `green2026` |
| 黃隊對輔 | `yellow2026` |

> 密碼存於 `firebase-config.js` 的 `PASSWORDS` 欄位，可自行修改後重新部署。

## 📁 檔案結構

```
TeamScore/
├── index.html          # 投影顯示畫面（公開，無需登入）
├── control.html        # 總控管理畫面（需管理員密碼）
├── team.html           # 對輔加分畫面（需隊伍密碼）
├── firebase-config.js  # Firebase 設定、密碼、預設資料
├── firebase.json       # Firebase Hosting 部署設定
├── database.rules.json # Realtime Database 安全規則
└── storage.rules       # Firebase Storage 規則（備用）
```

## 🛠️ 技術說明

- **前端技術**：HTML5, CSS3, Vanilla JavaScript（無框架）
- **後端 / 資料庫**：Firebase Realtime Database（即時推送，非輪詢）
- **圖片儲存**：圖片在 client 端壓縮至 200×200px 後以 Base64 存入 Realtime Database
- **部署**：Firebase Hosting（CDN 全球加速）
- **同步機制**：Firebase `onValue` listener，資料異動時主動推送至所有連線裝置

## 🗃️ 資料結構

```
Firebase Realtime Database
├── teams/
│   ├── 0/  { name, score, imageUrl }   # 紅隊
│   ├── 1/  { name, score, imageUrl }   # 藍隊
│   ├── 2/  { name, score, imageUrl }   # 綠隊
│   └── 3/  { name, score, imageUrl }   # 黃隊
└── logs/
    └── <id>/  { timestamp, actor, actionType, teamIndex, teamName, delta }
```

## 🔄 重新部署

修改 `firebase-config.js` 後執行：

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json firebase deploy --only hosting
```

## ⚠️ 注意事項

- 資料儲存於 Firebase 雲端，不依賴瀏覽器快取，清除快取不會遺失資料。
- 任何裝置、任何瀏覽器均可使用，不需在同一台電腦。
- 密碼驗證為 client 端機制，適合營隊等信任環境使用。
- 活動結束後建議至 Firebase Console 匯出 Log 資料並清空資料庫。
