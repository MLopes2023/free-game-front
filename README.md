# APP Free Games

O aplicativo tem como objetivo, registrar usuários na plataforma Free Games, permitindo total acesso aos catálogos de games grátis oferecidos por fornecedores na web.
Centraliza em uma única plataforma, sem qualquer custo de ingresso ou manutenção, permitindo que o usuário jogue online e monte a sua lista de games favoritos se desejar.

### Tecnologias utilizadas

- Angular 14
- Node js 16.14.2
- Bootstrap
- Sweetalert2

### Arquitetura das Estratégias de Comunicação


<img src="Arquitetura.jpg">

### Executar através do Docker

- É imprescindível ter o Docker instalado e iniciado em seu computador.

- Após clonar o repositório, navegue para o diretório em que se encontra o arquivo Dockerfile, executar como **administrador** os comandos abaixo, para construção da imagem Docker: 

  - Construir imagem  Docker:
    
    docker build -t front-end-game .

  - Executar o container Docker, conectado à mesma rede das api's api-rest-freegames e api-rest-gateway-externa:
  
    docker  run  -d  --name  front-end-game  --network  minha_rede  -p  8080:80  front-end-game

- A Aplicação está disponível e basta abrir o http://localhost:8080/#/ no navegador.

- Caso haja a necessidade de **parar um conatiner**, basta executar os comandos: 

  Efetuar o comando **docker container ls --all** (vai retornar containers existentes para localização do ID do container para ser utilizado no comando abaixo):

  Efetuar o comando **docker stop CONTAINER_ID**, sendo CONTAINER_ID recuperado no comanddo anterior.
