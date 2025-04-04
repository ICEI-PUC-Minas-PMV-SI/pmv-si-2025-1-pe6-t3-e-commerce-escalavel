# APIs e Web Services

### Descrição do Projeto:
O projeto consiste no desenvolvimento de uma API para um e-commerce especializado em equipamentos para computadores, como placas de vídeo, processadores, memórias RAM, entre outros. A API foi construída utilizando Node.js como tecnologia principal, com o banco de dados MongoDB (e Prisma como ORM para gerenciamento das operações de banco de dados). Para testes e validação dos endpoints, foi utilizado o Insomnia e Swagger. A API oferece funcionalidades como cadastro de usuários, gerenciamento de produtos, criação de carrinhos de compras, processamento de pedidos e autenticação de usuários.

## Objetivos da API
### Principais tópicos sobre os objetivos da API :


  - **Facilitar a gestão de produtos:** Permitir que administradores cadastrem, atualizem, listem e removam produtos do catálogo da loja.
  
  - **Gerenciamento de usuários:** Oferecer funcionalidades para cadastro, autenticação e gerenciamento de perfis de usuários.

  - **Carrinho de compras:** Permitir que os usuários adicionem, removam e gerenciem produtos em seus carrinhos de compras.

  - **Processamento de pedidos:** Facilitar a criação e o acompanhamento de pedidos, integrando os carrinhos de compras com o sistema de pagamentos.

  - **Escalabilidade e segurança:** Garantir que a API seja escalável para suportar um grande número de requisições e segura para proteger dados sensíveis dos usuários.

  - **Integração com sistemas externos:** Fornecer endpoints bem documentados para que futuros parceiros ou aplicações externas possam integrar.


## Modelagem da Aplicação


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

### Diagrama
![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/DER.png)


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

- **Método POST(Criação de um usuário)**

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/Captura%20de%20tela%202025-03-31%20161606.png)

Observe o código 201, que significa usuário criado com sucesso e sua senha está criptografada e oculta.

- **Método GET : Busca de usuário**<br>

Este endpoint realiza a consulta de um usuário com base em dados específicos predefinidos (nome e e-mail), retornando as informações correspondentes.

Parâmetros de busca: nome e email.

Resposta: Dados do usuário encontrado.

Exemplo (figura):
![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/Captura%20de%20tela%202025-03-31%20163510.png)

Código 200 indicando sucesso na operação.

- **Método Put: Atualizando o nome do usuário.**

Realizando a mudança do nome :

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/Metodo%20Put.png)

Código 200 indica sucesso na operação.

- **Método Delete: Excluindo um usuário**

A partir do Id, utilizamos o Delete para excluir o usuário

![](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/del_user.png)

Código informa que a operação foi realizada com sucesso.


## Considerações de Segurança

A segurança é um pilar fundamental em qualquer aplicação distribuída, especialmente em sistemas de e-commerce que lidam com dados sensíveis, como informações de pagamento e perfis de usuários. Neste projeto, implementamos um conjunto robusto de medidas para garantir:

- Autenticação segura com JWT (JSON Web Tokens) e hashing de senhas (bcrypt).

- Autorização baseada em perfis (admin/user) para controle de acesso granular.

- Proteção contra ataques comuns, como injeção de dados e acessos não autorizados.

- Boas práticas de configuração, como uso de variáveis de ambiente para chaves sensíveis.

Essas estratégias garantem que apenas usuários autenticados e devidamente autorizados possam acessar recursos críticos, mantendo a integridade e a confidencialidade dos dados. 
## Implantação

Este guia detalha o processo de implantação da aplicação em um ambiente de produção, garantindo segurança, escalabilidade e disponibilidade.

### 1. Requisitos de Hardware e Software
Requisitos Mínimos:

Servidor (Node.js + MongoDB);

CPU: 2 vCPUs (mínimo);

RAM: 4GB (recomendado 8GB para alta demanda);

Armazenamento: 20GB SSD (para aplicação + logs);

SO: Linux (Ubuntu 22.04 LTS ou similar).

**Banco de Dados (MongoDB):**

MongoDB Atlas (recomendado) ou servidor dedicado com MongoDB 6.0+;

Storage: 10GB (escalável conforme necessidade).

**Dependências de Software:**

Node.js 18.x+ (LTS);

Docker 20.x+ (para containerização);

Nginx/Apache (como reverse proxy, opcional);

PM2 (para gerenciamento de processos em produção).

### 2. Plataforma de Hospedagem Recomendada
Opções :
|Plataforma|	Tipo	|Recomendação para|
|----------|--------|-----------------|
|AWS EC2 + MongoDB Atlas|	IaaS (Infraestrutura como Serviço)	|Controle total, escalabilidade|
|Google Cloud Run	|Serverless (com Docker)	|Custo-efetivo, autoescalável|
|Render.com	|PaaS (Plataforma como Serviço)	|Simplicidade, integração contínua|
|DigitalOcean Droplet|	VPS (Virtual Private Server)	|Equilíbrio entre custo e desempenho|

**Sugestão para MVP/Startup:**

Render.com (para deploy rápido) ou DigitalOcean + MongoDB Atlas (para maior controle).

### 3. Configuração do Ambiente

- Clone o repositório e instale as dependências;
- Configure as variáveis de ambiente (.env);
- Configure o Nginx;

### 4. Deploy em Produção

**Render.com**
- Conecte seu repositório Git;
- Defina as variáveis de ambiente no painel;
- Configure o comando de build (npm install && npx prisma generate);
- Defina o comando de start(node app.js).

 ### 5. Testes Pós-Implantação  
  - Teste as rotas da API (use Insomnia/Postman):
  - Autenticação;
  - Rotas protegidas (ex: admin).
      

## Testes

1. Validação de dados: Verificação de se os dados de entrada (como ID de produto ou quantidade) são válidos.
2. Cadastro de um produto: Verificar se um produto é inserido corretamente no banco de dados quando o endpoint de cadastro de produto é acionado.
3. Testes de tempo de resposta: Verificar o tempo que leva para a API responder a requisições típicas (consulta de produtos, checkout, etc.) e garantir que ele se mantém dentro de limites aceitáveis.
4. estar autenticação e autorização: Garantir que apenas usuários autenticados possam acessar determinados recursos, como checkout de pedido.
5. Documentação da API: Verificar se a documentação está clara e precisa.

A estratégia de teste de uma API de e-commerce de computadores envolve uma combinação de testes unitários, de integração, de carga, de segurança e de usabilidade. A utilização de ferramentas como Jest, Supertest, Artillery e OWASP ZAP ajudará a garantir que a API esteja funcionando corretamente, de maneira eficiente e segura.

# Referências

1. Documentação Oficial de Tecnologias
    Node.js
    Node.js Documentation. Disponível em: https://nodejs.org/en/docs/

    Express.js
    Express.js Documentation. Disponível em: https://expressjs.com/

    MongoDB
    MongoDB Official Documentation. Disponível em: https://www.mongodb.com/docs/

    Prisma (ORM)
    Prisma Documentation. Disponível em: https://www.prisma.io/docs/

    JWT (JSON Web Tokens)
    JWT.io Introduction. Disponível em: https://jwt.io/introduction/

    Mercado Pago API
    Mercado Pago Developers. Disponível em: https://www.mercadopago.com.br/developers

    Docker
    Docker Documentation. Disponível em: https://docs.docker.com/

2. Artigos e Tutoriais
    Autenticação com JWT em Node.js
    "How to Implement JWT Authentication in Node.js" – Auth0. Disponível em: https://auth0.com/blog/node-js-jwt-authentication/

    Segurança em APIs REST
    "REST API Security Best Practices" – OWASP. Disponível em: https://owasp.org/www-project-api-security/

    Deploy de Aplicações Node.js
    "How to Deploy a Node.js App to Production" – DigitalOcean. Disponível em: https://www.digitalocean.com/community/tutorials

3. Livros 
    Node.js Design Patterns
    Mario Casciaro & Luciano Mammino (3rd Edition, 2020)

    MongoDB: The Definitive Guide
    Shannon Bradshaw, Eoin Brazil & Kristina Chodorow (3rd Edition, 2019)

    API Security in Action
    Neil Madden (2021, Manning Publications)

4. Ferramentas de Teste e Documentação
    Insomnia (Teste de APIs)
    Documentação Oficial. Disponível em: https://docs.insomnia.rest/

    Swagger (Documentação de APIs)
    OpenAPI Specification. Disponível em: https://swagger.io/specification/.
