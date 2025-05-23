# Front-end Web - TechParts E-commerce:

### Descrição do Projeto
TechParts é uma plataforma de e-commerce especializada em peças de computador, desenvolvida para oferecer uma experiência de compra escalável e intuitiva.

### Objetivos Principais
-  Interface de usuário 

- Prover uma experiência de compra limpa e responsiva

- Design intuitivo com navegação simplificada

- Catálogo de produtos organizado por categorias

- Carrinho de compras integrado

- Processo de checkout seguro via Stripe

- Histórico de pedidos detalhado


### Tecnologias Utilizadas

- Front-end: HTML5, CSS3, JavaScript (ES6+)

- Framework: Bootstrap 5 para layout responsivo

- Ícones: Font Awesome 6

- Autenticação: JWT (JSON Web Tokens)

- Serviço de e-mail: SendGrid

### Integrações

- API RESTful personalizada para gestão de produtos/pedidos

- Gateway de pagamento Stripe para transações seguras

- Sistema de gestão de estoque em tempo real

- Sistema de redefinição de senha utilizando Nodemailer com o serviço SendGrid para envio de e-mails.


### Diferenciais

- Status de pedidos em tempo real (aprovado/pendente/falha)

- Atualização automática do carrinho

- Feedback visual imediato para ações do usuário

- Sistema de avaliações de produtos.

- Layout adaptável a diferentes resoluções (mobile, tablet e desktop)

## Projeto da Interface Web

### Descrição da interface
A interface web do projeto TechParts consiste em uma aplicação web moderna e responsiva destinada a um e-commerce especializado em peças para computadores. O projeto apresenta uma navegação intuitiva, visualmente agradável e projetada para garantir uma experiência de usuário simples, clara e direta, desde o login até a finalização dos pedidos e a administração do site.

**Páginas principais:**

- Página de Login

- Página Principal (Produtos)

- Página do Carrinho

- Página dos Pedidos

- Página do Painel Admin

- Página de redefinição de senha

### Wireframes das páginas principais:

**Página Login**

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/Login.png?raw=true)


**Página Principal**

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/pagina%20produ.png?raw=true)

**Página Carrinho**

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/pagina%20carrinho.png?raw=true)

**Página Admin**

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/pagina%20Admin.png?raw=true)

**Página Pedidos**

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/pagina%20pedidos.png?raw=true  )

### Design Visual

**Paleta de Cores:**

- Cor primária: Azul #3a7bd5

- Cor secundária: Ciano #00d2ff

  Cores auxiliares:

- Verde sucesso #28a745

- Vermelho perigo #dc3545

- Cinza claro #f8f9fa

- Cinza escuro #1a1a2e

**O uso predominante de tons de azul transmite segurança, tecnologia e confiança.**

### Tipografia:
- Fonte principal: Segoe UI, com fallback para Tahoma, Geneva, Verdana, sans-serif. Essa fonte é moderna, limpa e de fácil leitura.

### Ícones:
- Ícones do FontAwesome (https://fontawesome.com/) para melhor clareza visual e indicação intuitiva das funcionalidades.

### Elementos Gráficos:
- Cards arredondados com leve sombra para destacar produtos e informações.

- Animações sutis para feedback visual durante interações como cliques e mudanças de estado.


## Fluxo de Dados

Frontend (HTML/CSS/JS) <br>

  -   ↓↑ REST API (JSON via HTTP) <br>

Backend (Node.js + Express) <br>

   -  ↓↑ Prisma ORM (MongoDB) <br>

Banco de Dados (MongoDB Atlas)


### Fluxo detalhado para compra:


![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/main/docs/img/Fluxograma.png?raw=true)



## Considerações de Segurança

A segurança da aplicação é tratada como uma prioridade em todas as etapas de desenvolvimento. As principais medidas adotadas incluem:

- Autenticação segura: Utilização de tokens JWT com expiração e renovação controladas.

- Autorização baseada em perfis: Restrição de acessos a áreas administrativas e funcionalidades específicas de acordo com o tipo de usuário.

- Proteção contra ataques comuns: Implementação de medidas contra XSS (Cross-site Scripting), CSRF (Cross-site Request Forgery) e injeções de código.

- Criptografia: Senhas dos usuários armazenadas utilizando algoritmos de hash seguro (bcrypt).

- HTTPS: Comunicação entre cliente e servidor protegida por SSL/TLS.

## Implantação

Para colocar a aplicação TechParts em funcionamento, siga estes passos:

**1-Requisitos básicos:**

- Node.js instalado (versão 18 ou superior)

- Conta no MongoDB Atlas (ou outro serviço de banco de dados)

- Conta em uma plataforma de hospedagem, como Vercel, Render ou Heroku

**2-Preparação:**

- Faça o clone do repositório da aplicação

- Instale as dependências com npm install

- Crie um arquivo .env com as variáveis de ambiente necessárias (como JWT_SECRET, DATABASE_URL, STRIPE_KEY)

**3-Deploy:**

- Suba o projeto para a plataforma de hospedagem escolhida

- Configure as variáveis de ambiente na plataforma

- Execute os comandos de build e start se necessário (npm run build, npm start)

**4-Verificação:**

- Acesse a aplicação online e teste as principais funcionalidades: login, catálogo, carrinho, checkout



## Testes

### Estratégia de Testes


| Tipo de Teste        | Objetivo                                                                 |
|----------------------|--------------------------------------------------------------------------|
| Testes Unitários     | Validar o funcionamento isolado de funções, métodos e componentes.       |
| Testes de Integração | Verificar a comunicação entre módulos (ex: autenticação + banco de dados).|
| Testes Funcionais    | Garantir que os requisitos funcionais estão corretos.                    |
| Testes de Interface  | Avaliar a usabilidade e responsividade da interface.                     |
| Testes de Carga      | Testar o desempenho sob alta demanda.                                    |
| Testes de Segurança  | Verificar autenticação e proteção contra ataques.                        |

### Ferramentas

| Ferramenta            | Finalidade                                              |
|-----------------------|---------------------------------------------------------|
| Jest                  | Testes unitários e de integração                        |
| Playwright            | Testes end-to-end e de interface                        |
| Insomnia              | Testes de API                                           |
| Lighthouse            | Performance e responsividade                            |
| OWASP ZAPk            | Testes de segurança                                     |
| JMeter / K6           | Testes de carga                                         |

---

### Casos de Teste

### Requisitos Funcionais

#### RF-001 - Gestão de Usuários

- **CT001**: Criar conta com dados válidos.
- ![image](https://github.com/user-attachments/assets/dbb60ce9-d2c5-4b2b-ba56-a5acd3c85238)

- **CT002**: Login com sucesso e falha (credenciais inválidas).
- ![image](https://github.com/user-attachments/assets/03c804f8-aac5-464c-90aa-d096d9205e89)

- **CT003**: Atualizar dados do perfil.
![image](https://github.com/user-attachments/assets/72500420-2eca-4f31-b81c-2b3deea85d6e)

#### RF-002 - Gestão de Produtos

- **CT004**: Cadastrar e editar produto.
- ![image](https://github.com/user-attachments/assets/9e5c91ed-69af-4977-b7be-dc0f367f758e)

- **CT005**: Visualizar lista de produtos (cliente e admin).
- ![image](https://github.com/user-attachments/assets/36251990-1aa8-404f-b98a-080884bb5262)


#### RF-003 - Carrinho de Compras e Checkout

- **CT006**: Adicionar e remover produto do carrinho.
- ![image](https://github.com/user-attachments/assets/c80522dc-1bf6-4d0f-86a8-dde11fd96cfb)

- **CT007**: Finalizar compra com cálculo do total.
- ![image](https://github.com/user-attachments/assets/826cd8ed-f0b2-4f9a-804f-512c88e2a2d3)


#### RF-004 - Processamento de Pedidos e Pagamentos

- **CT008**: Realizar pagamento com dados válidos.
- ![image](https://github.com/user-attachments/assets/e01dc743-7ac3-4eaf-bf5d-4865f6e984f1)

- **CT009**: Simular erro de pagamento e verificar resposta.
- ![image](https://github.com/user-attachments/assets/790ec42b-df6a-40af-8c35-8062dd6769a0)


#### RF-005 - Acompanhamento e Histórico de Pedidos

- **CT010**: Verificar status atual e histórico do pedido.
- ![image](https://github.com/user-attachments/assets/449c7e71-a68c-4c03-a778-e69be959fd1b)


#### RF-006 - Gestão de Estoque

- **CT011**: Reduzir estoque após venda.
- ![image](https://github.com/user-attachments/assets/5af9db9f-9745-44ad-96fe-1e105fa4a6ff)


#### RF-007 - Avaliações e Suporte

- **CT012**: Adicionar e visualizar avaliação de produto.
- ![image](https://github.com/user-attachments/assets/6dce63e7-3fa0-4c1a-a607-de9629cd11c9)


---

### Requisitos Não Funcionais

#### RNF-001 - Responsividade

- **CT013**: Verificar layout.
- ![image](https://github.com/user-attachments/assets/440e16ec-9de4-409f-ac69-21d6257ecff1)


#### RNF-002 - Performance

- **CT014**: Testar tempo de resposta das páginas principais (< 3s).
- ![image](https://github.com/user-attachments/assets/7dcec0cc-693b-4d55-af1f-f2de52c4f960)


#### RNF-003 - Segurança

- **CT015**: Armazenamento de senhas com hash seguro.
- ![image](https://github.com/user-attachments/assets/f5bfcae0-82a5-47b1-8445-c31c77fff465)


#### RNF-004 - Integração com Simulador de Pagamento

- **CT016**: Simular transação bem-sucedida com o gateway de teste.
- ![image](https://github.com/user-attachments/assets/3fb2766e-6620-4765-ae87-2f64aeb7494a)



# Referências

## Referências

- Stripe Docs: https://stripe.com/docs
- SendGrid Docs: https://docs.sendgrid.com
- FontAwesome: https://fontawesome.com
- Bootstrap 5 Docs: https://getbootstrap.com/docs/5.0/getting-started/introduction/
- JSON Web Token (JWT): https://jwt.io

