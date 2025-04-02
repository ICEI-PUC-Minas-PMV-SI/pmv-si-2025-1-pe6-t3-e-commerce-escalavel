# APIs e Web Services

### Descrição do Projeto:
O projeto consiste no desenvolvimento de uma API para um e-commerce especializado em equipamentos para computadores, como placas de vídeo, processadores, memórias RAM, entre outros. A API foi construída utilizando Node.js como tecnologia principal, com o banco de dados MongoDB (e Prisma como ORM para gerenciamento das operações de banco de dados). Para testes e validação dos endpoints, foi utilizado o Insomnia e Swagger. A API oferece funcionalidades como cadastro de usuários, gerenciamento de produtos, criação de carrinhos de compras, processamento de pedidos e autenticação de usuários.

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
| id | UUID | PRIMARY KEY | Identificador único do usuário |
| email | VARCHAR(255) | UNIQUE, NOT NULL | E-mail para login |
| nome | VARCHAR(100) | NOT NULL | Nome usuário |
| senha | VARCHAR(100) | NOT NULL | Hash da senha |
| cel | VARCHAR(20) | NOT NULL | Telefone do usuário |
| pedidos | VARCHAR(255) | foreign key | Pedido(s) do usuário |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta |


### Tabela Produto

| Campo        | Tipo de Dado  | Restrição               | Descrição                     |
|-------------|--------------|-------------------------|--------------------------------|
| id          | UUID         | PRIMARY KEY            | Identificador produto |
| nome | VARCHAR(255) | NOT NULL | Nome do produto |
| descricao | VARCHAR(255) | NULL | Descrição do produto |
| preco | DECIMAL(10,2) | NOT NULL | Preço produtos |
| categoria | VARCHAR(20) | NOT NULL | Categoria do produto |
| estoque | Int | NOT NULL | Número do estoque |
| carrinho | VARCHAR(255) | foreign key | Lista dos pedidos |
| avaliacoes | VARCHAR(255) | NULL | Avaliação do usuário |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta |


### Tabela Carrinho

| Campo        | Tipo de Dado  | Restrição               | Descrição                     |
|-------------|--------------|-------------------------|--------------------------------|
| id          | UUID         | PRIMARY KEY            | Identificador carrinho |
| usuarioId | INT | FK  | identificação usuário |
| produtoId | INT | FK | identificação produto |
| quantidade | INT | NOT NULL | Total de produtos |
| categoria  | VARCHAR(20) | NOT NULL | Categoria do produto |
| pedido | VARCHAR(255) | foreign key | Lista dos pedidos |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta |

### Tabela Pedido

| Campo        | Tipo de Dado  | Restrição               | Descrição                     |
|-------------|--------------|-------------------------|--------------------------------|
| id          | INT        | PRIMARY KEY            | Identificador do pedido |
| usuarioId | INT | FK | Identificação usuário |
| carrinhoId | INT | FK | ID lista produtos |
| total | Float | NOT NULL | Total de produtos |
| status | string | NOT NULL | Status do pedido |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta |

### Tabela Avaliacao

| Campo        | Tipo de Dado  | Restrição               | Descrição                     |
|-------------|--------------|-------------------------|--------------------------------|
| id          | UUID         | PRIMARY KEY            | Identificador único do usuário |
| usuarioId | INT | FK | Identificação usuário |
| produtoId | INT | FK | Identificação produto |
|nota | STRING | Null | Nota do produto |
| comentario | VARCHAR(255) |  NULL | Comentario do produto |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta |


## Tecnologias Utilizadas

Lista das tecnologias usadas no projeto, com justificativas e como elas se integram ao seu contexto específico:

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

**Endpoints da API (localhost:3000) no Swagger, focando no CRUD de usuários. Os exemplos demonstram requisições e respostas para operações como busca (GET), criação (POST), atualização (PUT) e exclusão (DELETE), validando o funcionamento integrado do sistema.**
- **Capturas de tela do Swagger em execução local (porta 3000) - Testes do CRUD de usuários**

- **Metódo POST(Criação de um usuário)**

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/Captura%20de%20tela%202025-03-31%20161606.png)

Observe o código 201, que significa usuário criado com sucesso.

- **Método GET : Busca de usuário**<br>
Este endpoint realiza a consulta de um usuário com base em dados específicos predefinidos (nome e e-mail), retornando as informações correspondentes.

Parâmetros de busca: nome e email.

Resposta: Dados do usuário encontrado.

Exemplo (figura):
![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/Captura%20de%20tela%202025-03-31%20163510.png)

Código 200 indicando sucesso na operação.

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

1. Validação de dados: Verificação de se os dados de entrada (como ID de produto ou quantidade) são válidos.
2. Cadastro de um produto: Verificar se um produto é inserido corretamente no banco de dados quando o endpoint de cadastro de produto é acionado.
3. Testes de tempo de resposta: Verificar o tempo que leva para a API responder a requisições típicas (consulta de produtos, checkout, etc.) e garantir que ele se mantém dentro de limites aceitáveis.
4. estar autenticação e autorização: Garantir que apenas usuários autenticados possam acessar determinados recursos, como checkout de pedido.
5. Documentação da API: Verificar se a documentação está clara e precisa.

A estratégia de teste de uma API de e-commerce de computadores envolve uma combinação de testes unitários, de integração, de carga, de segurança e de usabilidade. A utilização de ferramentas como Jest, Supertest, Artillery e OWASP ZAP ajudará a garantir que a API esteja funcionando corretamente, de maneira eficiente e segura.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
