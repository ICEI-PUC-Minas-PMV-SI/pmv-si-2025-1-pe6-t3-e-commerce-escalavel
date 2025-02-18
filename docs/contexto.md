# Introdução

O mercado de tecnologia e a demanda por peças de computadores impulsionam a necessidade de soluções digitais eficientes. Este projeto visa desenvolver uma plataforma de e-commerce especializada nesse segmento, garantindo escalabilidade, segurança e experiência otimizada para consumidores e empresas.

A solução incluirá uma aplicação distribuída baseada na web, com API integrada, além de versões web e mobile para acesso intuitivo. Serão abordadas estratégias de gerenciamento de serviços de TI, segurança digital e boas práticas de engenharia de software para garantir a manutenção e expansão da plataforma.
Este projeto tem como objetivo desenvolver uma aplicação de e-commerce voltada para pequenos e médios comerciantes que desejam expandir suas vendas online. A solução busca facilitar a gestão de produtos, pedidos e pagamentos, proporcionando uma experiência otimizada para lojistas e consumidores.

## Problema
Muitos pequenos e médios lojistas enfrentam dificuldades na digitalização de seus negócios devido à complexidade de plataformas existentes, altos custos de implementação e falta de conhecimento técnico. Esses fatores resultam em baixa presença digital e perda de oportunidades de vendas online.

A aplicação proposta visa resolver essa questão ao oferecer uma plataforma acessível, intuitiva e eficiente para gerenciamento de lojas virtuais.

## Objetivos

Desenvolver uma plataforma de e-commerce intuitiva e acessível para pequenos e médios lojistas, permitindo-lhes gerenciar seus produtos, pedidos e pagamentos de forma eficiente.

Objetivos Específicos

Criar um sistema de cadastro e gestão de produtos.

Implementar um sistema de processamento de pagamentos seguro e integrado.

Desenvolver uma interface responsiva e amigável para lojistas e clientes.

Oferecer um sistema de acompanhamento de pedidos em tempo real.

Permitir a integração com marketplaces.


## Justificativa

A digitalização do comércio é uma tendência crescente e essencial para a sobrevivência dos pequenos e médios empreendimentos. Contudo, muitos lojistas ainda enfrentam barreiras tecnológicas e financeiras para ingressar nesse mercado. Este projeto busca democratizar o acesso ao e-commerce, fornecendo uma ferramenta eficaz e acessível para esses comerciantes.

## Público-Alvo

O público-alvo da aplicação são pequenos e médios comerciantes que desejam expandir seus negócios para o ambiente digital. Além disso, consumidores que buscam uma experiência de compra fácil e segura também serão beneficiados pela plataforma.

# Especificações do Projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir cadastro e login de usuários | ALTA | 
|RF-002| Exibir catálogo de produtos   | MÉDIA |
|RF-003| Permitir adição de produtos ao carrinho | ALTA | 
|RF-004| Realizar checkout e pagamento   | MÉDIA |
|RF-005| Emitir confirmação de pedido | ALTA | 
|RF-006| Gerenciar estoque dos produtos   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| Deve garantir a segurança dos dados dos usuários | MÉDIA | 
|RNF-004| Integração com um gateway de pagamento confiável |  BAIXA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Deve ser desenvolvido um backend escalável e seguro   |

# Catálogo de Serviços

Descreva aqui todos os serviços que serão disponibilizados pelo seu projeto, detalhando suas características e funcionalidades.
* Cadastro e gerenciamento de produtos
* Processamento de pagamentos
* Controle de pedidos e estoque
* Suporte a integração com marketplaces
* Notificações para lojistas sobre vendas e pedidos

# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![arq](https://github.com/user-attachments/assets/b9402e05-8445-47c3-9d47-f11696e38a3d)


## Tecnologias Utilizadas

* Frontend: React.js (web) e React Native (mobile)
* Backend: Node.js com Express
* Banco de Dados: MongoDB
* Autenticação: Login JWT

Fluxo de Interação do Usuário

A seguir, vou descrever como o usuário interage com o sistema e como as tecnologias se conectam nesse processo.

Interação do Usuário:
1. Acesso à aplicação web ou mobile:

* O usuário abre a aplicação na versão web (React.js) ou mobile (React Native).

2. Autenticação:

* O usuário entra na aplicação fornecendo suas credenciais (email, Google, etc.).
* O frontend se comunica com o Firebase Authentication para validar o usuário.

3. Interação com a Aplicação:

* Após a autenticação, o usuário pode realizar ações como navegar, consultar dados, realizar compras, etc.
* O frontend (React.js/React Native) faz requisições para o Backend (Node.js com Express), que processa as requisições e interage com o Banco de Dados MongoDB para obter ou armazenar dados.

4. Resposta ao Usuário:

* O backend processa as requisições e envia os dados ou status de volta ao frontend.
* O frontend exibe a resposta para o usuário de forma interativa e dinâmica.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

* Frontend: Vercel 
* Backend: AWS EC2 ou Render
* Banco de Dados:MongoDB Atlas
