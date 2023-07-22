# Relatório de Projeto

Este documento oferece uma visão geral e justificativa das decisões de
design e tecnologia feitas durante o desenvolvimento deste projeto.

## Tecnologias

- NestJS: Escolhi o NestJS pela sua robustez e facilidade na criação de um novo projeto. O NestJS é um verdadeiro amigo do desenvolvedor, pois disponibiliza diversas ferramentas prontas que simplificam o processo de desenvolvimento.

- PrismaORM: Optei pelo Prisma ORM pela sua facilidade e versatilidade. O Prisma pode ser utilizado com vários bancos de dados, incluindo o MongoDB, obrigatório neste projeto.

- Jest: Por padrão, o NestJS utiliza o Jest como test runner. Aproveitei essa configuração inicial que me permite criar testes assim que inicio o projeto, garantindo a qualidade do código e a detecção precoce de possíveis problemas

- Docker: Considero o Docker essencial em qualquer projeto moderno. Usei-o para subir uma instância do MongoDB e suas réplicas. A portabilidade e o isolamento que o Docker oferece facilitam a implantação e escalabilidade do projeto.

- Swagger: Para a documentação, escolhi o Swagger, uma das melhores ferramentas para a criação de documentação completa e de fácil entendimento. A integração do Swagger com o NestJS é fluida, permitindo um gerenciamento eficiente da documentação.

## Arquitetura

- Semi DDD Pattern: Utilizei uma espécie de Domain-Driven Design (DDD) na criação do projeto. Devido ao tempo de conclusão do teste ser curto, a aplicação não apresenta todos os indícios de um DDD. No entanto, tentei ao máximo seguir o padrão para garantir que a lógica de negócio esteja bem definida e isolada.

- Arquitetura Hexagonal: Para evitar qualquer tipo de acoplamento ao código, utilizei o padrão de camadas da arquitetura hexagonal. Dessa forma, as minhas entidades de negócio não possuem conhecimento das ferramentas externas, o que promove a independência e possibilita a substituição dessas ferramentas caso necessário.

- Principios SOLID: Segui os princípios do SOLID, como Open-Closed Principle, Dependency Inversion e Single Responsibility Principle. Essas práticas orientam o design de classes e módulos de maneira a torná-los mais compreensíveis, flexíveis e mantíveis.

## Padrões de Projeto

- Mapper: Utilizei mappers para transitar dados entre a minha camada de domínio e a minha camada externa do banco de dados. Isso porque uma entidade no domínio não é necessariamente idêntica à mesma entidade no banco de dados. Assim, garanti a independência entre as representações dos dados no sistema e na persistência.

- ViewModel: Adotei view models para hidratar os dados que passaria do meu domínio para as respostas das requisições da API. Esta prática permite uma representação dos dados ajustada às necessidades de visualização, separando-a da lógica de negócio.

- Repositories: Criei diversas interfaces/classes abstratas para estabelecer um "contrato" de como deveriam ser implementadas as funcionalidades de comunicação com o banco de dados. Isso mantém a organização e a clareza do código, além de promover a substituição ou alteração das implementações com mínimo impacto no restante do sistema.

## Detalhes da Aplicação

- Entidades

  - Cliente: A entidade cliente foi concebida com os seguintes atributos: nome, email, senha, carrinho de compras, métodos de pagamento e endereços. A implementação dessa entidade visa a representar um usuário com todas as suas características essenciais para realizar transações dentro da aplicação.

  - Método de Pagamento e Endereço: As informações de método de pagamento e endereço foram implementadas como entidades para serem objetos de valor dentro da aplicação. Mesmo que não necessariamente sejam entidades individuais no banco de dados, considero essencial que sejam tratados de forma autônoma e estruturada dentro do sistema.

  - Carrinho de Compras: O carrinho de compras é outro componente essencial na experiência do usuário. Para representá-lo, criei uma entidade mais robusta, que contém informações como o valor total e os produtos, cada um com a quantidade comprada. Esta abordagem permite um gerenciamento eficaz dos itens selecionados pelo cliente antes de realizar a compra.

  - Pedido: A entidade pedido é criada exclusivamente quando o cliente completa o checkout. Nesse momento, a aplicação atualiza os produtos (quantidade em estoque) e limpa o carrinho de compras do cliente. Incluí o ID do cliente como propriedade do pedido para permitir a listagem dos pedidos realizados por cada cliente.

  - Produto: Por fim, temos a entidade produto, na qual guardo informações como nome, quantidade em estoque e preço. A entidade produto é essencial para representar os itens disponíveis para compra na plataforma.

- Casos de uso:

  - Para manipular o carrinho de compras, criei casos de uso que permitem adicionar produtos, remover produtos, diminuir a quantidade de um produto e exibir detalhes do carrinho.

  - Além disso, criei casos de uso para adicionar e remover um método de pagamento, o que é fundamental para a realização do checkout.

  - Há ainda um caso de uso que lista os produtos cuja quantidade em estoque é maior do que 1, permitindo que sejam adicionados ao carrinho.

## Segurança

- Rate Limit: Utilizei o rate limit para limitar o número de requisições por IP. Isso evita que um atacante sobrecarregue o servidor com requisições desnecessárias.

- Helmet: Utilizei o Helmet para proteger a aplicação de vulnerabilidades conhecidas. O Helmet é um middleware que define vários cabeçalhos HTTP para aumentar a segurança da aplicação.

- CORS: Utilizei o CORS para definir quais domínios podem acessar a API. Isso evita que um atacante acesse a API de um domínio não autorizado.

# Instruções de Execução

## Pré-requisitos

- Docker
- Docker Compose
- NodeJS

## Execução

- Clone o repositório
- Execute o comando `docker-compose up` na raiz do projeto
- Renomeie o arquivo .env.example para `.env`
- Execute o comando `npm run prepare:db` ou `yarn prepare:db` na raiz do projeto
- Execute o comando `npm run start:dev` ou `yarn start:dev` na raiz do projeto
- Acesse a documentação da API em http://localhost:3000/api
- Pode-se utilizar o insomnia para testar a API. O arquivo de configuração está na raiz do projeto.

## Autor

- [Paulo Abreu](https://www.linkedin.com/in/paulo-abreu-santana/)
