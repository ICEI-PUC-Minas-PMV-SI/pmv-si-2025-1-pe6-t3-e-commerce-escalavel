# Front-end Móvel

[Inclua uma breve descrição do projeto e seus objetivos.]

## Projeto da Interface
[Descreva o projeto da interface móvel da aplicação, incluindo o design visual, layout das páginas, interações do usuário e outros aspectos relevantes.]

### Wireframes

[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual

[Descreva o estilo visual da interface, incluindo paleta de cores, tipografia, ícones e outros elementos gráficos.]

## Fluxo de Dados

[Diagrama ou descrição do fluxo de dados na aplicação.]

## Tecnologias Utilizadas

[Lista das tecnologias principais que serão utilizadas no projeto.]

## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.


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
| ID | Caso | Tipo | Resultado Esperado |
|----|------|------|--------------------|
| TC01 | Registro com e-mail e senha válidos | Integração | Conta criada e e-mail enviado |
| TC02 | Verificação com token JWT válido | Integração | Conta ativada |
| TC03 | Login com credenciais válidas | Integração | JWT retornado |
| TC04 | Acesso sem token | Unidade/Integração | 401 Unauthorized |
| TC05 | Falha no envio de e-mail | Unidade | Erro tratado |

### Não Funcionais
| ID | Caso | Tipo | Resultado Esperado |
|----|------|------|--------------------|
| NF01 | 1000 logins simultâneos | Carga | Sistema responde sem erros |
| NF02 | Token JWT expirado | Segurança | Acesso negado |
| NF03 | Envio em massa com SendGrid | Carga | Sistema gerencia filas |
| NF04 | Renderização em dispositivos variados | E2E | Layout consistente |

---

## Ferramentas Resumo

| Tipo | Ferramenta |
|------|------------|
| Unitário (Back) | Jest |
| Unitário (Front) | React Native Testing Library |
| Integração API | Supertest |
| E2E Mobile | Detox |
| E2E Web/Email | Cypress, Puppeteer |
| Carga | Artillery, k6 |
| Segurança | OWASP ZAP, Postman |


# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
