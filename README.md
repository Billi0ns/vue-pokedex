# Pokedex 寶可夢圖鑑

## 目錄

- [Demo](#demo)
- [專案說明](#about)
- [後續優化](#optimization)
- [使用技術](#built_using)
- [本地測試](#getting_started)

## Demo <a name = "demo"></a>

https://billi0ns-vue-pokedex.netlify.app/

![Imgur](https://imgur.com/iurgqpu.png)

## 專案說明 <a name = "about"></a>

使用 Vue 開發，專案主要功能是用來瀏覽寶可夢資料。

## 後續優化 <a name = "optimization"></a>

手動引入 BootstrapVue 套件後，整體 gzipped 後的 bundle 大小從 167.4 KB 降到 90 KB。

PageSpeed 測速結果：
行動裝置端分數為 88 分，FCP 為 2.2 秒。
電腦端分數為 96 分，FCP 為 0.7 秒。

最終 bundle 大小
![Imgur](https://imgur.com/rTtIgUd.png)

## 使用技術 <a name = "built_using"></a>

- [VueJs](https://vuejs.org/) - 網頁框架
  - Vue Composition API - 體驗 Vue 3 的特色語法
  - Vue CLI - 快速配置開發環境、build code、檢視 webpack bundle 大小
  - Vue Router
  - Vuex
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - 實現無限滾動載入
- [BootstrapVue](https://bootstrap-vue.org/)
- [ESLint](https://eslint.org/) - 使用 Airbnb Style Guide
- [PokéAPI](https://pokeapi.co/) - 串接 API 獲取寶可夢資訊

## 本地測試 <a name = "getting_started"></a>

安裝所需的套件

```
npm install
```

啟動 local server

```
npm run serve
```

建立 production build

```
npm run build
```
