# Front-end Móvel

O front-end móvel do projeto tem como objetivo fornecer uma interface acessível e intuitiva para pequenos e médios lojistas, bem como para consumidores finais, permitindo o gerenciamento completo de uma loja virtual e a realização de compras diretamente pelo smartphone. A solução visa democratizar o acesso ao comércio eletrônico, eliminando barreiras técnicas e financeiras.

A aplicação móvel será desenvolvida com React Native, permitindo compatibilidade com dispositivos Android e iOS, e será integrada ao backend Node.js via APIs REST. O foco será na usabilidade, velocidade e segurança durante todas as etapas da navegação e das transações.

## Projeto da Interface

A interface móvel será construída com foco na experiência do usuário (UX), com navegação fluida, telas objetivas e interação clara. As páginas principais da aplicação incluirão:

- Tela de Login/Registro
- Tela Inicial (Home): com destaques de produtos e categorias
- Carrinho de Compras
- Tela de Pagamento
- Tela de Pedidos
- Perfil do Usuário
- Tela do Lojista (Admin): para cadastro, edição e remoção de produtos

Cada interação foi pensada para minimizar cliques, acelerar o tempo de resposta e manter o usuário engajado.

### Wireframes

Os wireframes representam o esqueleto visual da aplicação e mostram como os elementos são organizados em cada tela. As principais telas incluem:

- Login/Registro  
  *(imagem aqui)*

- Home com destaque de categorias  
  *(imagem aqui)*

- Produto com imagem, descrição, avaliações e botão “Adicionar ao Carrinho”  
  *(imagem aqui)*

- Carrinho com listagem de itens, quantidade e botão de checkout  
  *(imagem aqui)*

- Pedidos com status atual (Em processamento, Enviado, Entregue)  
  *(imagem aqui)*

### Design Visual


#### Paleta de Cores
- **Azul-claro (ciano)**: Usado em cabeçalhos e fundos principais.
- **Azul médio (#4B8DF8 aprox.)**: Aplicado em botões de ação como "Entrar", "Cadastrar" e "Finalizar Pedido".
- **Branco**: Fundo dos formulários e campos de entrada.
- **Cinza-claro**: Fundo geral da interface e campos desabilitados.
- **Preto / Cinza escuro**: Utilizado nos textos principais para alta legibilidade.

#### Tipografia
- Fonte **sans-serif** moderna e legível.
- **Títulos** em **negrito**, geralmente centralizados.
- **Textos auxiliares** em tamanho menor e cor azul, indicando links clicáveis.

#### Elementos Gráficos e Layout
- **Campos de formulário** com bordas arredondadas e espaçamento interno adequado.
- **Botões grandes e arredondados**, com cor azul e texto branco.
- **Layout vertical centralizado**, responsivo e otimizado para mobile.
- **Ícones simples e funcionais**, como seta de retorno e ícones de navegação no rodapé.
- **Menu inferior** no painel admin, com fundo azul e ícones brancos.

#### Design Responsivo
- Componentes dimensionados para fácil interação em telas pequenas.
- Formulários e conteúdos centralizados verticalmente.
- Botões com área de toque confortável para dispositivos móveis.

#### Consistência Visual
- Padrões visuais mantidos em todas as telas (login, cadastro, carrinho, painel admin).
- Esquema de cores, tipografia e estilos de botão uniformes.
- Estrutura de layout reutilizável e intuitiva.

**Observação:** Este estilo promove uma experiência limpa, acessível e focada em usabilidade, ideal para aplicações web/mobile como o e-commerce TechParts.



## Fluxo de Dados

O fluxo de dados na aplicação segue a arquitetura cliente-servidor, com comunicação entre os clientes (aplicativos mobile e web), a API (backend) e o banco de dados.

### 1. Acesso e Autenticação

- O usuário acessa o aplicativo mobile (React Native) ou a versão web (React.js).  
- Ao realizar login, os dados são enviados via `HTTPS` para o backend (Node.js com Express).  
- A autenticação é realizada com **JWT** (JSON Web Token) e/ou **Firebase Authentication**.  
- O token de acesso é armazenado localmente no dispositivo usando `AsyncStorage`.

### 2. Requisições do Usuário

- Após a autenticação, o usuário pode executar ações como:  
  - Navegar por categorias  
  - Adicionar produtos ao carrinho  
  - Finalizar uma compra  
  - Acompanhar um pedido  
- O frontend faz requisições HTTP com `Axios` para a API.

### 3. Processamento pelo Backend

- A API recebe a requisição e valida o token JWT (autorização).  
- O servidor executa as ações solicitadas:  
  - Busca ou insere dados no banco de dados MongoDB.  
  - Atualiza o estoque.  
  - Cria um pedido.  
  - Processa o pagamento (simulado ou via gateway).  
  - Envia notificações se necessário.

### 4. Resposta ao Cliente

- O backend retorna os dados solicitados ou o status da operação.  
- O frontend atualiza a interface em tempo real, utilizando componentes reativos como `useEffect`, `useState` e `FlatList`.

### 5. Armazenamento e Sincronização

- Informações como carrinho, token de sessão e preferências do usuário podem ser salvas localmente com `AsyncStorage` ou sincronizadas com o backend.  
- O estado é compartilhado por meio de Context API, Redux ou Hooks.

## Tecnologias Utilizadas

A aplicação móvel foi construída com **React Native** e as bibliotecas do ecossistema Expo. As principais dependências utilizadas no desenvolvimento são:

### Navegação

- `@react-navigation/native` – gerenciador de navegação principal  
- `@react-navigation/bottom-tabs` – navegação por abas inferior  
- `@react-navigation/native-stack` – navegação em pilha (stack)

### Interface e Componentes Visuais

- `react-native-paper` – componentes visuais com suporte a Material Design  
- `@expo/vector-icons` e `react-native-vector-icons` – ícones populares (Ionicons, MaterialIcons, etc.)  
- `expo-linear-gradient` – gradientes lineares para elementos visuais  
- `expo-font` – gerenciamento de fontes customizadas

### Gerenciamento de Estado e Dados

- `@react-native-async-storage/async-storage` – armazenamento local de dados e sessões  
- `axios` – requisições HTTP à API  
- `events` – manipulação de eventos customizados

### Outros Utilitários

- `react-native-reanimated`, `react-native-gesture-handler` e `react-native-screens` – melhor desempenho em animações e transições  
- `expo-status-bar` – personalização da barra de status  
- `expo-sqlite` – armazenamento relacional local para dados persistentes

## Considerações de Segurança

A segurança é um dos pilares fundamentais da aplicação TechParts, tanto para proteger os dados dos usuários quanto para garantir a integridade das transações realizadas na plataforma. A seguir estão as principais práticas e mecanismos implementados:

### Autenticação e Autorização

- **Firebase Authentication** é utilizado para autenticação segura de usuários via e-mail/senha ou login social.  
- **JWT (JSON Web Tokens)** é empregado para manter sessões de usuários com validade controlada e expiração.  
- Tokens são armazenados com segurança em `AsyncStorage` no mobile, evitando exposições acidentais.

### Proteção de Dados

- Dados sensíveis como senhas nunca são armazenados diretamente. Utiliza-se **hashing seguro (ex: bcrypt)** no backend quando necessário.  
- A comunicação entre cliente e servidor é feita exclusivamente via **HTTPS**, garantindo confidencialidade no transporte.

### Boas práticas de API

- Rotas protegidas exigem verificação do JWT.  
- Limitação de requisições (rate limiting) para evitar ataques de força bruta.  
- Validação rigorosa dos dados de entrada para evitar **injeções de código** (ex: NoSQL Injection, XSS).

### Segurança de Dependências

- As bibliotecas utilizadas são mantidas atualizadas.  
- Ferramentas como **npm audit** e **Dependabot** são aplicadas para identificação de vulnerabilidades conhecidas.

## Implantação

### 1. Requisitos de Hardware e Software

#### Backend (Node.js + Express)

- **Sistema Operacional:** Ubuntu 22.04 LTS ou superior  
- **Processador:** 1 vCPU (mínimo)  
- **Memória RAM:** 1 a 2 GB  
- **Armazenamento:** 10 GB SSD (mínimo)  
- **Node.js:** v18 ou superior  
- **NPM:** v9 ou superior  
- **Banco de Dados:** MongoDB (preferencialmente serviço gerenciado, como Atlas)  
- **Outros:** Git, PM2, Certbot (SSL)

#### Frontend Mobile (React Native com Expo)

- **Requisitos do Desenvolvedor:**  
  - Node.js v18+  
  - Expo CLI  
  - Conta na Expo

## Teste e Ferramentas

### 1. Testes Unitários

Testam funções e componentes isoladamente.

- **Back-end:** funções utilitárias, serviços, validações  
- **Front-end:** componentes, hooks, lógica de navegação  
- **Ferramentas:** `Jest`, `React Native Testing Library`

### 2. Testes de Integração

Verificam a comunicação entre os módulos do sistema.

- **Exemplos:** registro de usuário, login, verificação por e-mail, integração Prisma/MongoDB  
- **Ferramentas:** `Supertest`, `Jest`

### 3. Testes End-to-End (E2E)

Simulam a experiência real do usuário.

- **Exemplos:** registro completo, navegação no app  
- **Ferramentas:** `Detox` (mobile), `Cypress` / `Puppeteer` (web/email)

### 4. Testes de Carga

Avaliam o desempenho sob alta demanda.

- **Exemplos:** múltiplos logins, envio em massa de e-mails  
- **Ferramentas:** `Artillery`, `k6`

### 5. Testes de Segurança

Garantem a proteção contra ataques comuns.

- **Exemplos:** manipulação de JWT, headers, rate limiting  
- **Ferramentas:** `OWASP ZAP`, `Postman`

---

## Casos de Teste

### Funcionais

| ID   | Caso                                | Tipo       | Resultado Esperado           |
|-------|------------------------------------|------------|-----------------------------|
| TC01  | Registro com e-mail e senha válidos | Integração | Conta criada e e-mail enviado |
| TC02  | Verificação com token JWT válido    | Integração | Conta ativada               |
| TC03  | Login com credenciais válidas       | Integração | JWT retornado               |
| TC04  | Acesso sem token                    | Unidade/Integração | 401 Unauthorized         |
| TC05  | Falha no envio de e-mail           | Unidade    | Erro tratado                |

### Não Funcionais

| ID   | Caso                        | Tipo      | Resultado Esperado           |
|-------|-----------------------------|-----------|-----------------------------|
| NF01  | 1000 logins simultâneos      | Carga     | Sistema responde sem erros   |
| NF02  | Token JWT expirado           | Segurança | Acesso negado               |
| NF03  | Envio em massa com SendGrid  | Carga     | Sistema gerencia filas      |
| NF04  | Renderização em dispositivos variados | E2E       | Layout consistente          |

---

## Ferramentas Resumo

| Tipo                | Ferramenta                      |
|---------------------|--------------------------------|
| Unitário (Back-end)  | Jest                           |
| Unitário (Front-end) | React Native Testing Library   |
| Integração API       | Supertest                      |
| E2E Mobile          | Detox                          |
| E2E Web/Email        | Cypress, Puppeteer             |
| Carga               | Artillery, k6                  |
| Segurança           | OWASP ZAP, Postman             |

# Referências

- **React Native Documentation** – https://reactnative.dev/docs/getting-started  
- **Expo Documentation** – https://docs.expo.dev  
- **React Navigation Documentation** – https://reactnavigation.org/docs/getting-started  
- **React Native Paper** – https://callstack.github.io/react-native-paper  
- **Async Storage** – https://react-native-async-storage.github.io/async-storage  
- **Axios (HTTP Requests)** – https://axios-http.com  
- **MongoDB Documentation** – https://www.mongodb.com/docs  
- **Node.js Documentation** – https://nodejs.org/en/docs  
- **Express.js Documentation** – https://expressjs.com/en/starter/installing.html  
- **JWT (JSON Web Tokens)** – https://jwt.io/introduction  
- **Firebase Authentication** – https://firebase.google.com/docs/auth  
- **Material Design Guidelines** – https://m3.material.io/  
- **PostgreSQL Documentation** – https://www.postgresql.org/docs/  
- **OWASP Foundation - Security Guidelines** – https://owasp.org/www-project-top-ten/  
- **Digital Ocean – Deploying Node.js Apps** – https://www.digitalocean.com/community/tutorials  
- **GitHub Repositories e Issues** – consultas sobre problemas e soluções específicas durante o desenvolvimento
