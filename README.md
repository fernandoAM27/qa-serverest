# qa-serverest-playwright

Testes automatizados de API com **Playwright + JavaScript** contra o [ServeRest](https://github.com/ServeRest/ServeRest), executados em pipeline de CI com **GitHub Actions**.

## O que está coberto

| Recurso | Cenários |
|---|---|
| `POST /login` | login válido com token Bearer, senha incorreta (401), campos obrigatórios (400) |
| `/usuarios` | cadastro e consulta por id, e-mail duplicado (400), campo obrigatório ausente (400) |
| `POST /produtos` | regra de autorização: admin (201), usuário comum (403), sem token (401) |

## Estrutura

```
.github/workflows/api-tests.yml   pipeline de CI
support/fixtures.js               fixtures: usuário admin e comum já logados, com limpeza
support/factories/massa.js        massa de teste dinâmica com Faker
tests/api/                        specs por recurso
playwright.config.js              baseURL por variável de ambiente, reporters para CI
```

## Rodando localmente

Requer Node 22.

```bash
npm install
npm run serverest      # terminal 1: sobe a API em http://localhost:3000
npm run test:api       # terminal 2: executa os testes
npm run report         # abre o relatório HTML
```

## CI

A cada push na `main` e em pull requests, o GitHub Actions sobe o ServeRest como container de serviço, instala as dependências, executa os testes e publica o relatório HTML como artefato.

## Próximos passos

- [ ] Testes de `/produtos` (CRUD completo) e `/carrinhos`
- [ ] Testes E2E no front-end
- [ ] Lint com ESLint na pipeline
- [ ] Jobs separados de API e E2E
- [ ] Execução agendada e badge de status
