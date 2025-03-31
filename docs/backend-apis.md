# APIs e Web Services

O planejamento de uma aplicação de APIS Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.

### Descrição do Projeto:
O projeto consiste no desenvolvimento de uma API para um e-commerce especializado em equipamentos para computadores, como placas de vídeo, processadores, memórias RAM, entre outros. A API foi construída utilizando Node.js como tecnologia principal, com o banco de dados MongoDB (e Prisma como ORM para gerenciamento das operações de banco de dados). Para testes e validação dos endpoints, foi utilizado o Insomnia. A API oferece funcionalidades como cadastro de usuários, gerenciamento de produtos, criação de carrinhos de compras, processamento de pedidos e autenticação de usuários.

## Objetivos da API
### Principais tópicos sobre os objetivos da API no projeto:


  - **Facilitar a gestão de produtos:** Permitir que administradores cadastrem, atualizem, listem e removam produtos do catálogo da loja.
  
  - **Gerenciamento de usuários:** Oferecer funcionalidades para cadastro, autenticação e gerenciamento de perfis de usuários.

  - **Carrinho de compras:** Permitir que os usuários adicionem, removam e gerenciem produtos em seus carrinhos de compras.

  - **Processamento de pedidos:** Facilitar a criação e o acompanhamento de pedidos, integrando os carrinhos de compras com o sistema de pagamentos.

  - **Escalabilidade e segurança:** Garantir que a API seja escalável para suportar um grande número de requisições e segura para proteger dados sensíveis dos usuários.

  - **Integração com sistemas externos:** Fornecer endpoints bem documentados para que futuros parceiros ou aplicações externas possam integrar.


## Modelagem da Aplicação
[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]

## Estrutura dos dados
### Tabela Users (Mongo/Prisma)


| Campo        | Tipo de Dado  | Restrição               | Descrição                     |
|-------------|--------------|-------------------------|--------------------------------|
| id          | UUID         | PRIMARY KEY            | Identificador único do usuário |
| email        | VARCHAR(255) | UNIQUE, NOT NULL                | E-mail para login     |
| nome         | VARCHAR(100) |   NOT NULL       | Nome usuário             |
| senha_hash  | VARCHAR(100)    | NOT NULL               | Hash da senha                 |
| Celular   | VARCHAR(20)  |      NOT NULL             | Telefone do usuário           |
| Pedidos   | VARCHAR(255)  |    foreign key        | Pedido(s) do usuário           |
| data_criacao | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta     |


### Tabela Produto

| Campo        | Tipo de Dado  | Restrição               | Descrição                     |
|-------------|--------------|-------------------------|--------------------------------|
| id          | UUID         | PRIMARY KEY            | Identificador único do usuário |
|nome       | VARCHAR(255) |  NOT NULL                | nome do produto    |
| descricao         | VARCHAR(255) |    NULL       | descrição do produto           |
| preco  | DECIMAL(10,2)    | NOT NULL               | preço produtos              |
| categoria  | VARCHAR(20)  |      NOT NULL             | categoria do produto          |
| estoque | Int  |    NOT NULL      | numero do estoque         |
  | carrinho | VARCHAR(255) |    foreign key      |   Lista dos pedidos         |
| avaliacoes | VARCHAR(255  |    NULL      | avaliação do usuario       |
| data_criacao | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta     |


### Tabela Carrinho

| Campo        | Tipo de Dado  | Restrição               | Descrição                     |
|-------------|--------------|-------------------------|--------------------------------|
| id          | UUID         | PRIMARY KEY            | Identificador único do usuário |
|usuarioId      | INT |  FK              | identificação usuário   |
| produtoId         | INT |    FK     | identificação produto         |
  | quantidade  | INT    | NOT NULL               | total de produtos            |
| categoria  | VARCHAR(20)  |      NOT NULL             | categoria do produto          |
  | pedido | VARCHAR(255) |    foreign key      |   Lista dos pedidos         |
| data_criacao | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta     |

### Tabela Pedido

### Tabela Avaliacao


## Tecnologias Utilizadas

Existem muitas tecnologias diferentes que podem ser usadas para desenvolver APIs Web. A tecnologia certa para o seu projeto dependerá dos seus objetivos, dos seus clientes e dos recursos que a API deve fornecer.



 Lista das tecnologias usadas no projeto , com justificativas  e como elas se integram ao seu contexto específico:


|Categoria	|Tecnologia|	Versão|	Por que foi escolhida?|
|-----------|----------|--------|-----------------------|
|Backend|	Node.js|	18.x+	|Ambiente assíncrono ideal para I/O intensivo (como APIs) e ampla comunidade de suporte.|
|Framework|	Express.js	|4.x	| Minimalista e flexível para estruturar rotas e middlewares.|
|Banco de Dados|	MongoDB	|6.x+	|Schema-less e escalável para modelos de dados flexíveis (ex: carrinho com produtos variados).|
|ORM/ODM	|Prisma|	5.x+	|Type-safe, suporte nativo ao MongoDB e gerenciamento fácil de relações.|
|Autenticação	|JWT	|2.x	|Stateless, ideal para APIs RESTful e fácil integração com frontend.|
|Pagamentos|	Mercado Pago SDK|	2.x+	| Solução completa para pagamentos no Brasil, com sandbox para testes.|
|Documentaçã|	Swagger UI	|4.x|	Geração automática de docs interativos para facilitar o consumo da API por frontend/equipe.|
|Testes	|Insomnnia|	| aplicativo para testar e desenvolver APIs	|
|Deploy	|	Docker	|	20.x+		|Empacotamento consistente para produção e fácil escalabilidade.	|


## API Endpoints

[Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.]

### Segue os prints do Swagger rodando localmente na porta 3000 para o CRUD de usuários





## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
