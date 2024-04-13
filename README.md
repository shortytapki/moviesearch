# MovieSearch App

## Запуск c помощью NodeJS скрипта.

Для запуска в режиме разработки необходимо указать токен для API Кинопоиска, в ином случае сборка упадёт с ошибкой.

Команда для запуска из терминала:

```console
TOKEN={ВАШ ТОКЕН} npm start
```

## Запуск с помощью Docker

- В файле `docker-compose.dev.yaml` в поле environment по примеру выше замените токен на валидный.
- Выполните команды :

```console
docker compose --file docker-compose.dev.yaml up
```
