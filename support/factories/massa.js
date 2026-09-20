const { faker } = require('@faker-js/faker');

function novoUsuario(overrides = {}) {
  return {
    nome: faker.person.fullName(),
    email: `${faker.string.alphanumeric(10).toLowerCase()}@qa.com`,
    password: faker.internet.password({ length: 10 }),
    administrador: 'false',
    ...overrides,
  };
}

function novoProduto(overrides = {}) {
  return {
    nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(6)}`,
    preco: faker.number.int({ min: 10, max: 5000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    ...overrides,
  };
}

module.exports = { novoUsuario, novoProduto };
