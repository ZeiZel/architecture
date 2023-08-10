# CRUD Social with BEST Architecture

The emphasis of this project is on a complete and customizable architecture that can easily accept extensions and that implements all modern approaches to building a COOL application.

## Stack

Backend: 
- NodeJS
- Express
- Prisma
- PostgreSQL

Frontend:
- React
- React Router Dom
- SCSS
- i18n
- Webpack

Testing:
- Storybook
- Loki
- Jest
- Cypress

Techs:
- Websockets

## Capabilities

User:
- Login
- Auth
- Chat
- Profile

Post:
- Create (title, tags, image, body)
- Read
- Update
- Delete

Administrator:
- manage posts
- manage accounts
- publish news

## Installation

copy Docker image

## Структура

### 1. Пользователь (User):

- Уникальный идентификатор (ID)
- Логин
- Пароль
- Почта

### 2. Страница пользователя

- Уникальный идентификатор
- Идентификатор связи с User
- Фотографии пользователя
- Друзья (связи с другими пользователями)
- Публикации (сообщения, фотографии, видео и др.)
- Личные чаты (чаты с другими пользователями) (private)

### 3. Друзья (Friendship): представляет отдельную таблицу, которая хранит связи ID между пользователями

#### Поля

- Связь между двумя пользователями
- заявка

#### Действия:
- Отправить заявку в друзья
- Добавить в друзья (private)
- Удалить из друзей (private)

### 4. Группы

- ID администратора (UserPage)
- ID подписчиков (UserPage)
- ID Постов

### 5. Публикация (Post):

- Уникальный идентификатор
- ID автора (UserPage)
- Текст или мультимедийный контент (фотографии, видео и др.)
- Дата и время публикации
- Лайки и комментарии от других пользователей

### 6. Личные сообщения (Direct Messages):

- Приватные чаты между пользователями

### 7. Лента новостей (News Feed):

- ID публикаций друзей и групп

### 8. Комментарии и лайки:

- ID автора (UserPage) (private)
- тип реакции
- ID поста (Post)

### 9. Роли

- User
- Administrator

