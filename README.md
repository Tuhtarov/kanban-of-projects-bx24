# Канбан проектов
Приложение на `Vue 2` для демонстрации проектов и задач в удобном канбане для коробочной версии `Bitrix24`.
В канбане есть `drag and drop` карточек, общение с кастомным rest и хранение данных в `vuex`, графический 
интерфейс реализован с помощью `Vuetify`. Компоненты разработаны на `Options API`.

## Установка проекта
- создаём конфиг **`auth-rest.js`** в папке `/src/config` (шаблон: `src/config/auth-rest-example.js`).
```js
export default {
    client_id: "",
    client_secret: "",
    "access_token": "",
    "refresh_token": "",
    "expires_in": "",
    "domain": "",
    "member_id": ""
}
```
- устанавливаем пакеты
```
npm install
```

## Компиляция для разработки
- убираем комментирование первых двух строк в `main.js`
```js
import {BX24} from './libs/dev-rest'
window.BX24 = BX24
```
- комментируем строку подключения rest библиотеки bx24 в `public/index.html` в шапке
```html
<!-- <script defer src="//api.bitrix24.com/api/v1/"></script> -->
```
- выполняем команду в терминале
```
npm run serve
```

## Компиляция для боя
- комментируем первые две строки в `main.js`
```js
// import {BX24} from './libs/dev-rest'
// window.BX24 = BX24
```
- убираем комментирование строки подключения rest библиотеки bx24 в `public/index.html` в шапке
```html
<script defer src="//api.bitrix24.com/api/v1/"></script>
```

- выполняем команду в терминале
```
npm run build
```


### Разработано для компании MyWebstor
