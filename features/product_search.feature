Feature: Consultar produto
  Funcionário busca pelo nome do produto

  Scenario: Usuário está logado e precisa encontrar um produto
    Given que estou na tela de "Lista de Produtos"
    When preencho o campo de busca com o produto "Produto 2" e clico em buscar
    Then recebo o resultado na página "Lista de Produtos", o produto "Produto 2" no valor de "22.22"
