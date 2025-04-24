# Front-end Web - TechParts E-commerce:

### Descrição do Projeto
TechParts é uma plataforma de e-commerce especializada em peças de computador, desenvolvida  para oferecer uma experiência de compra escalável e intuitiva.

### Objetivos Principais
 -  Interface de Usuário 

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

### Integrações

- API RESTful personalizada para gestão de produtos/pedidos

- Gateway de pagamento Stripe para transações seguras

- Sistema de gestão de estoque em tempo real

### Diferenciais

- Status de pedidos em tempo real (aprovado/pendente/falha)

- Atualização automática do carrinho

- Feedback visual imediato para ações do usuário

- Sistema de avaliações de produtos.

## Projeto da Interface Web

### Descrição da interface
A interface web do projeto TechParts consiste em uma aplicação web moderna e responsiva destinada a um e-commerce especializado em peças para computadores. O projeto apresenta uma navegação intuitiva, visualmente agradável, e projetada para garantir uma experiência de usuário simples, clara e direta, desde o login até a finalização dos pedidos e a administração do site.

**Páginas principais:**

- Página de Login

- Página Principal (Produtos)

- Página do Carrinho

- Página dos Pedidos

- Página do Painel Admin

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


![arq](https://raw.githubusercontent.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/fec2819a3f919514784f0c17c200f5a086f95697/docs/img/Fluxograma_TechParts.png)



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
