### Passo a passo instalação

 - 1º Com NodeJS instalado Iniciar o projeto com:
 
   ``` npm init ```
    
 - 2º Para gerenciar rotas, requisições e URL, precisaremos da lib express.js:
 
    ``` npm install express ```

 - 3º Instalar a ferramenta Nodemon que irá ajudar no ganho de produtividade na hora de trabalhar, pois seu papel é reiniciar a aplicação, toda vez que detectar alguma alteração nos arquivos:
 
    ``` npm install --save-dev nodemon ```
    
 >*OBS: --save-dev é para deixar somente a dependência para modo desenvolvedor*

 
 ### Como rodar o projeto

 - Instalar as dependências do projeto descritas no package.json

     ``` npm install ```

 - Inicializar o projeto com o comando:
 
     ``` npx nodemon app.js ```

 - Instalar o MongoDB
 
     ``` npm install --save mongodb ```

 - Instalar o Mongoose que traduz os dados do BD para objetos Javascript
 
      ``` npm install --save mongoose ```


### A aplicação está disponível na nuvem pelo HEROKU

**Link para acesso:**

[Teste MELI - HEROKU](https://teste-melli.herokuapp.com/stats)


ROTAS:

GET - https://teste-melli.herokuapp.com/stats

>Retorna a quantidade de Simio, humano e a proporção de Simios para humanos.

![STATS](https://user-images.githubusercontent.com/48366009/122628741-449ceb00-d08e-11eb-9081-ea9f55828f33.png)

POST - https://teste-melli.herokuapp.com/simian

Formato, existe uma validação para aceitar somente matrizes/array de 6x6:

```JSON
{
	"dna": [
		"ATGCGA",
		"CAGTGC",
		"TTATGT",
		"AGAAGG",
		"CCCCTA",
		"TCACTQ"
	]
}
```

![SIMIAN](https://user-images.githubusercontent.com/48366009/121290916-ce45ff00-c8bd-11eb-9036-4287ec10145c.png)


OBS: Se o DNA já existir, retornara:

![SIMIAN EXISTS](https://user-images.githubusercontent.com/48366009/121291056-04837e80-c8be-11eb-98b4-284d24409790.png)

OBS 2: Se a matriz/array for invalido, retornará:

![INVALID FORMAT](https://user-images.githubusercontent.com/48366009/121291104-182ee500-c8be-11eb-8c5c-0fc136d3c83e.png)

OBS 3: Caso tente inserir uma base nitrogenada diferente, irá receber um erro:

![INVALID DNA](https://user-images.githubusercontent.com/48366009/122628764-80d04b80-d08e-11eb-86f6-9452f6819af9.png)

