# Teste DITO

Desafio proposto como avaliação do processo seletivo da DITO.

Para o desenvolvimento do programa foram utilizadas as tecnologias:

- [NodeJS](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  
- [Bootstrap](https://getbootstrap.com/)

- [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)

- [SASS](https://sass-lang.com/)

- [Angular](https://angular.io/)

# Rodando a aplicação

Para rodar a aplicação é necessário a instalação do [NodeJS](https://nodejs.org/en/) versão 8+, [MongoDB](https://www.mongodb.com/) e [Angular](https://angular.io/).

Após isso, siga os passos à seguir:

1. Populando o banco de dados:

    - **Opção 1**: Navegue até a pasta **api** e execute o comando: <br>
```node populate-bd.js```
    - **Opção 2**: execute um POST na api coletora após rodar a aplicação no endpoint ```/events```, eviando no corpo da requisição o evento conforme o exemplo à seguir: <br>
```{event: 'buy'}```

2. Instale as dependências da aplicação:
    - Navegue até a pasta **api** e execute o comando: <br>
 ```npm install```

    - Navegue até a pasta **frontend** e execute o comando: <br>
 ```npm install```

3. Inicie a aplicação: <br>
    - Navegue até a pasta **api** e execute o comando: <br>
 ```npm start```

    - Navegue até a pasta **frontend** e execute o comando: <br>
 ```ng serve```
    

Após isso a aplicação estará disponível no endereço:

http://localhost:4200/
