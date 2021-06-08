### Passo a passo instalação

    - 1º Com NodeJS instalado Iniciar o projeto com:
    ``` npm init ```
    
    - 2º Para gerenciar rotas, requisições e URL, precisaremos da lib express.js:
    ``` npm install express ```

    - 3º Instalar a ferramenta Nodemon que irá ajudar no ganho de produtividade na hora de trabalhar, pois seu papel é reiniciar a aplicação, toda vez que detectar alguma alteração nos arquivos:
    ``` npm install --save-dev nodemon ```
    *OBS: --save-dev é para deixar somente a dependência para modo desenvolvedor*

 
 ### Como rodar o projeto

    - Instalar as dependências do projeto descritas no package.json
        ``` npm install ```

    - Inicializar o projeto com o comando:
        ``` npx nodemon app.js ```

    - Instalar o MongoDB
        ``` npm install --save mongodb ```

    - Instalar o Mongoose que traduz os dados do BD para objetos Javascript
        ``` npm install --save mongoose ```


