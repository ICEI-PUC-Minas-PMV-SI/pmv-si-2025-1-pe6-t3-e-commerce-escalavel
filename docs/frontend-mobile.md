# Front-end Móvel

O front-end móvel do projeto tem como objetivo fornecer uma interface acessível e intuitiva para pequenos e médios lojistas, bem como para consumidores finais, permitindo o gerenciamento completo de uma loja virtual e a realização de compras diretamente pelo smartphone. A solução visa democratizar o acesso ao comércio eletrônico, eliminando barreiras técnicas e financeiras.

A aplicação móvel será desenvolvida com React Native, permitindo compatibilidade com dispositivos Android e iOS, e será integrada ao backend Node.js via APIs REST. O foco será na usabilidade, velocidade e segurança durante todas as etapas da navegação e das transações.

[Código Fonte Mobile](/Mobile-TechParts) <br> 

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

![Slide3](https://github.com/user-attachments/assets/940ff9a7-f3d4-4c64-8032-8531d6c30e42)![Slide5](https://github.com/user-attachments/assets/21c33f70-0e2b-4b11-870d-7577c4cfbdc8)


![image](https://github.com/user-attachments/assets/cb4fc082-a439-4313-95f4-3156702e79b9)![image](https://github.com/user-attachments/assets/768ea603-6b40-4a39-a40a-61ce4baeb0d3)


- Produto com imagem, descrição, valor e botão “Adicionar ao Carrinho”

![Slide9](https://github.com/user-attachments/assets/c7b6459b-9482-42df-ad52-966e06a4fdd9)


![image](https://github.com/user-attachments/assets/7613a46c-588e-4d9e-800a-aefc0106e93c)


- Carrinho com listagem de itens, quantidade e botão de checkout

![Slide11](https://github.com/user-attachments/assets/cc9bd1f5-54dd-47c7-8ada-3b65d1339c18)


![image](https://github.com/user-attachments/assets/edf8157d-83d5-491f-a061-f521a164b267)


- Painel de pagamento com opções de pagamento

![Slide12 - Copia](https://github.com/user-attachments/assets/d3280055-8146-408a-a408-332a56c31f1e)![Slide12](https://github.com/user-attachments/assets/b1f0a225-eeec-499e-ad5d-6b2087f068fb)


![image](https://github.com/user-attachments/assets/5186cfda-b6fe-47f5-88e2-909cd6a96d28)![image](https://github.com/user-attachments/assets/57d82d8b-eda7-466e-a92c-9b7afb2815d8)


- Painel de cadastro de produtos (admin)

![Slide4](https://github.com/user-attachments/assets/849ad3f1-25f7-49b3-a839-635948b0a299)![Slide7](https://github.com/user-attachments/assets/8a99f461-5a93-4e34-8e5f-a9495fa7521c)


![image](https://github.com/user-attachments/assets/b012017c-32fc-41a5-9019-d46d33f4dac7)![image](https://github.com/user-attachments/assets/5475cae1-c97c-40cb-acd0-be0e42d8c99b)




- Painel de perfil de usuário

![Slide6](https://github.com/user-attachments/assets/4b8908b1-ca6b-4915-a2b0-bba6ab0eafaf)


![image](https://github.com/user-attachments/assets/40c3175b-3a99-4517-89e4-2d8062a34580)



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
- O frontend faz requisições HTTP com `Axios` para a API.

### 3. Processamento pelo Backend

- A API recebe a requisição e valida o token JWT (autorização).  
- O servidor executa as ações solicitadas:  
  - Busca ou insere dados no banco de dados local.  
  - Atualiza o estoque.  
  - Cria um pedido.  
  - Processa o pagamento (simulado ou via gateway).  

### 4. Resposta ao Cliente

- O backend retorna os dados solicitados ou o status da operação.  
- O frontend atualiza a interface em tempo real, utilizando componentes reativos como `useEffect`, `useState` e `FlatList`.

### 5. Armazenamento e Sincronização

- Informações como carrinho, token de sessão e preferências do usuário podem ser salvas localmente com `AsyncStorage` ou sincronizadas com o backend.  
- O estado é compartilhado por meio de Context API, Redux ou Hooks.

## Tecnologias Utilizadas

### Frontend (React Native)
- **React Native**: Framework principal para desenvolvimento do app mobile.
- **Expo**: Ambiente simplificado de desenvolvimento e build para React Native.
- **React Navigation**: Navegação entre telas.
- **React Context API**: Gerenciamento de estado.
- **React Native AsyncStorage**: Armazenamento local persistente.
- **LinearGradient (expo-linear-gradient)**: Gradientes visuais nos layouts.
- **Ionicons (expo/vector-icons)**: Ícones no app.
- **FlatList, TouchableOpacity, SafeAreaView**: Componentes nativos para UI/UX.

### Backend e Integrações
- **Axios**: Cliente HTTP para requisições à API externa.
- **API externa com JWT**: Autenticação via token JWT armazenado localmente.
- **API local (fallback)**: Backup local caso a API externa esteja offline.

### Lógica e Serviços
- **EventBus (custom)**: Sistema de eventos para sincronizar atualizações (ex: carrinho).
- **Validação de usuário local e remoto**: Tentativa de login primeiro via API externa, depois fallback local.
- **Gerenciamento de produtos e usuários**:
  - `ProdutoApiService.js`
  - `ProdutoLocalService.js`
  - `AuthService.js`

### Armazenamento Local
- **AsyncStorage**:
  - Armazena dados do carrinho por usuário.
  - Salva token JWT.
  - Guarda dados locais como usuários e produtos.

### Autenticação
- **Login via API externa**: Gera token JWT.
- **Verificação de administrador**: Verifica email e senha para atribuir tipo `admin` ou `usuario`.


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

### Casos de Teste para Requisitos Funcionais e Não Funcionais

| ID   | Caso de Teste                                  | Tipo               | Resultado Esperado                                         |
|-------|-----------------------------------------------|--------------------|-----------------------------------------------------------|
| TC01  | Cadastro de usuário com dados válidos          | Unitário/Integração | Usuário criado com sucesso e dados armazenados            |
| TC02  | Autenticação com credenciais válidas           | Unitário/Integração | Login realizado com sucesso e token JWT gerado             |
| TC03  | Cadastro de produto com todos os campos obrigatórios | Unitário/Integração | Produto cadastrado e listado corretamente                   |
| TC04  | Edição e exclusão de produto                     | Integração         | Produto editado/excluído refletido na lista                |
| TC05  | Adicionar produtos ao carrinho e calcular total | Unitário/Integração | Carrinho atualizado e valor total calculado corretamente   |
| TC06  | Remover produto do carrinho                      | Unitário           | Produto removido e total atualizado                         |
| TC07  | Processar pagamento com simulação                | Integração         | Pagamento validado, status atualizado e confirmação enviada|
| TC08  | Resposta do app em até 3 segundos após requisição| Performance        | Tempo de resposta menor ou igual a 3 segundos               |
| TC09  | Segurança dos dados - tentativa de acesso sem autenticação | Segurança          | Acesso negado e usuário redirecionado para login           |
| TC10  | Responsividade em diferentes dispositivos móveis (smartphones/tablets) | Usabilidade        | Interface exibida corretamente e elementos acessíveis       |



### Ferramentas Recomendadas

| Tipo de Teste           | Ferramentas Sugestionadas             |
|------------------------|-------------------------------------|
| Unitário               | Jest, React Testing Library          |
| Integração             | Detox, React Testing Library         |
| Funcional/End-to-End   | Detox, Appium                       |
| Carga/Performance      | JMeter, Locust                      |
| Segurança              | OWASP ZAP, SonarQube                |
| Usabilidade/Responsividade | Emuladores Android/iOS, BrowserStack |

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
