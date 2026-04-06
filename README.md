# Cat Pinterest

Тестовое задание с интерфейсом для просмотра котиков через TheCatAPI.

## Демо

Ссылка на демо будет добавлена позже.

## Функциональность

- просмотр всех котиков
- добавление и удаление котиков из избранного
- вкладка с избранными котиками
- хранение избранного на клиенте через `localStorage`
- infinite scroll для подгрузки новых карточек

## Стек

- `React`
- `TypeScript`
- `Vite`

## Библиотеки и инструменты

- `react-icons` для иконок
- `ESLint` для линтинга
- `Prettier` для форматирования
- `TheCatAPI` как источник данных

## Макет

Макет, по которому сверстан интерфейс:

- https://bit.ly/3utxaL2

## Как клонировать проект

```bash
git clone <ссылка-на-репозиторий>
cd frontend-challenge
```

## Установка зависимостей

```bash
npm install
```

## Запуск проекта

```bash
npm run dev
```

После запуска приложение будет доступно в браузере по адресу, который покажет Vite в терминале.

## Production-сборка

```bash
npm run build
```

## Предпросмотр production-сборки

```bash
npm run preview
```

## Дополнительные команды

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## API

Проект использует публичное API:

- https://thecatapi.com

При необходимости можно добавить ключ API через `.env`:

```env
VITE_CAT_API_KEY=your_api_key
```
