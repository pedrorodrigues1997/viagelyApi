List of plugins and dependencies that need to be installed:



Client link :
http://localhost:5173/

Server is http://localhost:8800/









Controllers have the commands that operate with the DB
The routes folder redirects the requests to the controllers
The models folder defines the models of each item in the database

server.js, besides a lot of other things, decides which route should be called on each URL


Commands: Server start 
cd into folder api, and "yarn start"
cd into client and "yarn dev"


Cat Cards that appear on main page are loaded from data.js file

Calls for ads : 
Link to={`/ads?cat=${card.cat}`}>








//////////////////////STRIPE/////////////////////////////////
https://aa49-2001-8a0-6e09-5800-75c7-d2b5-ef00-b9a0.eu.ngrok.io

Ngrok é usado para testes para redirecionar os webhooks do stripe para o nosso ambiente local


fazemos o comando ngrok http 8800 no programa ngrok e copiamos o link parecido com o de cima para o webhook do Stripe
