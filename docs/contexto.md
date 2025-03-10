# Introdução

O mercado de tecnologia e a demanda por peças de computadores impulsionam a necessidade de soluções digitais eficientes. Este projeto visa desenvolver uma plataforma de e-commerce especializada nesse segmento, garantindo escalabilidade, segurança e experiência otimizada para consumidores e empresas.

A solução incluirá uma aplicação distribuída baseada na web, com API integrada, além de versões web e mobile para acesso intuitivo. Serão abordadas estratégias de gerenciamento de serviços de TI, segurança digital e boas práticas de engenharia de software para garantir a manutenção e expansão da plataforma. Dessa forma, busca-se facilitar a gestão de produtos, pedidos e pagamentos, oferecendo uma solução eficiente e acessível para lojistas de pequeno e médio porte, bem como para consumidores finais.

## Problema
Lojistas de pequeno e médio porte enfrentam dificuldades na digitalização de seus negócios devido à complexidade das plataformas existentes, aos altos custos de implementação e à falta de conhecimento técnico. Esses fatores resultam em baixa presença digital e perda de oportunidades de vendas online.

A aplicação proposta visa resolver essa questão ao oferecer uma plataforma acessível, intuitiva e eficiente para o gerenciamento de lojas virtuais.

## Objetivos

Desenvolver uma plataforma de e-commerce intuitiva e acessível para pequenos e médios lojistas, permitindo-lhes gerenciar seus produtos, pedidos e pagamentos de forma eficiente.

Objetivos Específicos

Criar um sistema de cadastro e gestão de produtos.

Implementar um sistema de processamento de pagamentos.

Desenvolver uma interface responsiva e amigável para lojistas e clientes.

Oferecer um sistema de acompanhamento de pedidos em tempo real.



## Justificativa

A digitalização do comércio é uma tendência crescente e essencial para a sobrevivência dos pequenos e médios empreendimentos. Contudo, muitos lojistas ainda enfrentam barreiras tecnológicas e financeiras para ingressarem nesse mercado. Este projeto busca democratizar o acesso ao e-commerce, fornecendo uma ferramenta eficaz e acessível para esses comerciantes.

## Público-Alvo

O público-alvo da aplicação são pequenos e médios comerciantes que desejam expandir seus negócios para o ambiente digital. Além disso, consumidores que buscam uma experiência de compra fácil e segura também serão beneficiados pela plataforma.

# Especificações do Projeto

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, será aplicada uma técnica de priorização, detalhando como foi utilizada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |Responsável |
|------|-----------------------------------------|----|----|
|RF-001| Gestão de usuários: cadastro, autenticação e gerenciamento de clientes e lojistas.| ALTA | Membro1 |
|RF-002| Gestão de produtos: cadastro, edição, exclusão e visualização de produtos. | MÉDIA | Membro2 |
|RF-003| Carrinho de compras e checkout: adicionar, remover, ajustar a quantidade de produtos, exibir valor total da compra. | ALTA | Membro3 |
|RF-004| Processamento de Pedidos e Pagamentos: Validação e processamento seguro de pagamentos. | ALTA | Membro4 |
|RF-005| Acompanhamento e Histórico de Pedidos: rastreamento do status do pedido e exibição do histórico de compras para clientes. | MÉDIA | Membro5 |
|RF-006| Gestão de estoque: atualização automática do estoque após vendas. | MÉDIA | Membro6 |
|RF-007| Avaliações e Suporte ao Cliente: sistema de avaliações e comentários para produtos. | BAIXA |  Membro7 |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| Deve garantir a segurança dos dados dos usuários | MÉDIA | 
|RNF-004| Integração com um simualador de pagamentos |  BAIXA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Deve ser desenvolvido um backend escalável e seguro   |

# Catálogo de Serviços

O e-commerce foi projetado para oferecer uma experiência completa e eficiente tanto para lojistas quanto para consumidores. 
A plataforma contará com os seguintes serviços principais:

* Gerenciamento de Produtos: Lojistas poderão cadastrar, editar e excluir produtos de forma intuitiva, incluindo imagens, descrições detalhadas, preços e controle de estoque automatizado.
* Processamento de pagamentos: A plataforma integrará gateways de pagamento, permitindo simular transações seguras via cartão de crédito, débito, Pix e outras opções, garantindo uma experiência de compra ágil e transparente.
* Gestão de Pedidos e Estoque: Todo o fluxo de compra será monitorado em tempo real, desde a realização do pedido até a entrega. O estoque será atualizado automaticamente a cada venda, evitando problemas como falta de produtos.
* Notificações e Alertas: Lojistas receberão notificações sobre novos pedidos, atualizações de estoque e status de pagamento, garantindo um acompanhamento eficiente das operações.

# Arquitetura da Solução

A abordagem utilizada é baseada no modelo Cliente-Servidor, que divide o sistema em três camadas distintas. Essa separação permite melhor organização, escalabilidade e manutenção do sistema.

Mesmo sendo uma arquitetura distribuída, a camada Back-End age como um ponto central, coordenando as operações entre o Front-End (clientes) e a Camada de Dados (banco de dados e armazenamento).

![arq](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2025-1-pe6-t3-e-commerce-escalavel/blob/2c93d73a17b3f7446a87a81206a6caeb6e3321df/docs/img/Arquitetura2.png)



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
