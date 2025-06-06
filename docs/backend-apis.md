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
| nota | STRING | Null | Nota do produto |
| comentario | VARCHAR(255) |  NULL | Comentario do produto |
| data_criacao | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data de criação da conta |

### Diagrama
![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/DER.png)


## Tecnologias Utilizadas

Lista das tecnologias usadas no projeto, com justificativas e como elas se integram ao seu contexto específico:

|Categoria	|Tecnologia|	Versão|	Por que foi escolhida?|
|-----------|----------|--------|-----------------------|
|Backend|	Node.js |	18.x+	|Ambiente assíncrono ideal para I/O intensivo (como APIs) e ampla comunidade de suporte.|
|Framework |	Express.js	|4.x	| Minimalista e flexível para estruturar rotas e middlewares.|
|Banco de Dados |	MongoDB	|6.x+	|Schema-less e escalável para modelos de dados flexíveis (ex: carrinho com produtos variados).|
|ORM/ODM |Prisma|	5.x+	|Type-safe, suporte nativo ao MongoDB e gerenciamento fácil de relações.|
|Autenticação	|JWT	|2.x	|Stateless, ideal para APIs RESTful e fácil integração com frontend.|
|Pagamentos|	Mercado Pago SDK|	2.x+	| Solução completa para pagamentos no Brasil, com sandbox para testes.|
|Documentação |	Swagger UI	|4.x|	Geração automática de docs interativos para facilitar o consumo da API por frontend/equipe.|
|Testes	|Insomnnia |	| Aplicativo para testar e desenvolver APIs	|
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
**Requisitos Mínimos:**

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

**1. Validação de dados**

  Objetivo: Garantir que os dados enviados aos endpoints estejam no formato e tipo corretos.

  Resultados esperados:

 1. Requisições com dados válidos (ex: id de produto correto, quantidade positiva) devem ser processadas com sucesso (ex: HTTP 200 ou 201).
    ![image](https://github.com/user-attachments/assets/71109bf0-3674-4b78-9b6c-adfbce3dba74)


 2. Requisições com dados inválidos (ex: id inexistente, quantidade negativa, campos obrigatórios ausentes) devem retornar erros apropriados, como:

    - HTTP 500 Internal Server Error

    - Mensagens claras, como "Quantidade deve ser um número positivo" ou "ID do produto é inválido".
    ![image](https://github.com/user-attachments/assets/e39f948d-f133-492b-82a8-a08c53f41022)


**2. Cadastro de um produto**

  O bjetivo: Testar se o endpoint de cadastro de produto funciona corretamente.

  Resultados esperados:

 1. Um novo produto com todos os campos obrigatórios preenchidos deve ser salvo no banco e retornar:

    - HTTP 201 Created
![image](https://github.com/user-attachments/assets/20701ef4-18ec-481f-8da8-45e93149014c)


 2. O banco deve refletir a inserção (verificável via MongoDB ou uma rota de consulta).
![image](https://github.com/user-attachments/assets/b8b8f925-50ab-4840-9183-cf681e688275)


 3. Requisições com dados faltantes ou inválidos devem ser rejeitadas com:

    - HTTP 400 ou 422 Unprocessable Entity.
![image](https://github.com/user-attachments/assets/79390259-bfb3-420e-a67e-ef17852ea88c)



**3. Testes de tempo de resposta**

  Objetivo: Verificar o desempenho da API.

  Resultados esperados:

 1. Requisições comuns (GET /produtos, POST /carrinho, POST /checkout) devem ter tempo de resposta abaixo de um limite aceitável, por exemplo:

   - < 300ms para requisições simples.
![image](https://github.com/user-attachments/assets/355cdd45-2ffc-420b-af69-0cbda2b7d367)


  - < 800ms para requisições mais complexas como checkout (com validações e alterações no banco).
![image](https://github.com/user-attachments/assets/841eea5b-8d3f-4e7f-a3a4-d5e37146c471)


 2. Os testes devem indicar consistência no tempo de resposta sob carga leve a moderada.


**4. Autenticação e autorização**

  Objetivo: Garantir segurança de acesso aos endpoints sensíveis.

  Resultados esperados:

 1. Endpoints protegidos (ex: /checkout, /pedidos, /produtos/create) devem:

    - Permitir acesso apenas com token JWT válido.

    - Retornar HTTP 401 Unauthorized ou 403 Forbidden quando:

      - O token estiver ausente.
![erro token](https://github.com/user-attachments/assets/420aa175-b9cd-45f0-b52a-5c3a7cde1055)


      - O token for inválido ou expirado.
![image](https://github.com/user-attachments/assets/459a2751-4812-4388-981b-f88de370e709)


      - O usuário não tiver permissão para o recurso (ex: não-admin tentando cadastrar produto).
![image](https://github.com/user-attachments/assets/f34c1613-2eda-4562-b94e-aa51cef439a4)

 2. Usuários autenticados devem acessar os recursos permitidos sem erro.


**5. Documentação da API**

  Objetivo: Avaliar clareza e completude da documentação.

  Resultados esperados:

 1. Documentação (via Swagger ou outra) deve:

    - Apresentar todos os endpoints com seus métodos HTTP.

    - Especificar os parâmetros esperados (body, query, headers).

    - Informar os possíveis códigos de status (200, 400, 401, etc.).

    - Exemplificar requisições e respostas.

 2. Qualquer desenvolvedor que leia a documentação deve conseguir interagir com a API sem dificuldades.

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

3. Livros - 
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
