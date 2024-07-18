# APP Free Games

O aplicativo tem como objetivo, permitir o registro de usuários na plataforma Free Games, centralizando o acesso ao catálogo de jogos grátis oferecidos por fornecedores na internet, centralizando em uma única plataforma, sem qualquer custo de ingresso ou manutenção, permitindo que o usuário jogue online e monte a sua lista de games favoritas se desejar.

### Tecnologias utilizadas

- Angular 14
- Node js 16.14.2
- Bootstrap
- Sweetalert2

### Executar através do Docker

- É imprescindível ter o Docker instalado e iniciado em seu computador.

- Navegue para o diretório em que se encontra o arquivo Dockerfile, executar como **administrador** o comando abaixo, para construção da imagem Docker:  

  docker build -t front-end-game .

- No mesmo diretório executar como **administrador** o comando abaixo, para execução do container:  
  
  docker run -d -p 6000 front-end-game

- A Aplicação está disponível e basta abrir o http://localhost:6000/#/ no navegador.

- Caso haja a necessidade de **parar um conatiner**, basta executar os comandos: 

  Efetuar o comando **docker container ls --all** (vai retornar containers existentes para localização do ID do container para ser utilizado no comando abaixo):

  Efetuar o comando **docker stop CONTAINER_ID**, sendo CONTAINER_ID recuperado no comanddo anterior.


### Arquitetura das Estratégias de Comunicação


<img src="Arquitetura.jpg">
