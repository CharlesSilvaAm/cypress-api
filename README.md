## Automação API com Cypress e Allure Report


# Tecnologias
```bash

 - Cypress: Framework de testes end-to-end, utilizado para realizar os testes da API.

 - Allure Report: Ferramenta para gerar relatórios interativos e visualmente amigáveis sobre a execução dos testes.

 - Java 8: Necessário para executar o binário do Allure.

```
# Pré-requisitos
```bash

- Antes de rodar os testes, é necessário garantir que as dependências do projeto estejam corretamente instaladas.

```
# Passos para instalar:
```bash 

- Instalar o Yarn (caso não tenha):

- Se você ainda não tem o Yarn instalado, pode instalá-lo seguindo as instruções aqui.

- Instalar as dependências do projeto:

- No diretório raiz do projeto, execute o seguinte comando para instalar as dependências necessárias:

 yarn install

```
# Dependências necessárias
```bash

Cypress: O Cypress é utilizado para a automação dos testes de API.
@shelex/cypress-allure-plugin: Plugin do Cypress para integrar o Allure Report aos testes.
Allure Commandline: Ferramenta para gerar e exibir os relatórios.

```

## Executando testes automatizados. ##
```bash
    - yarn cypress run --env allure=true

```
## Allure report configuração ##

```bash

(https://github.com/Shelex/cypress-allure-plugin)

- Binário Allure : diretamente do pacote npm allure2 ou allure-commandline .

- Java 8 (necessário para executar o binário allure)

- Não há necessidade de definir este plugin como repórter no Cypress ou usar qualquer outro repórter fascinado. Basta baixar:

- yarn add -D @shelex/cypress-allure-plugin

- yarn allure serve

```

