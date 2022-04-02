# Testing App
POC Shopping Cart - 
One of the goals here was NOT to use frameworks whenever possible. 
No ORM. 
Minimal table to show the approach taken

Run init command on Heroku
```bash
cat init.sql | heroku pg:psql postgresql-amorphous-60472 --app maik-shopping-cart
```

## build and run
npm start

## dev server
### first time
```bash
sudo snap install --classic heroku
heroku login
nvm install 16
nvm use 16
```
### pgadmin
```bash
docker run  --name pgadmin4 -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret' -d dpage/pgadmin4 
```
### pg
```bash
docker run --name pgb --rm -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e PGDATA=/var/lib/postgresql/data/pgdata -e POSTGRES_DB=shopping -v /home/$HOME/bt/postgres:/var/lib/postgresql/data -p 5432:5432 -it postgres:14-alpine
```
### dev server 
```bash
npm run dev
```