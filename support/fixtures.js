const base = require('@playwright/test');
const { novoUsuario } = require('./factories/massa');

// Cria um usuário via API e devolve os dados + token de login.
async function criarELogar(request, overrides) {
  const usuario = novoUsuario(overrides);
  const cadastro = await request.post('/usuarios', { data: usuario });
  base.expect(cadastro.status()).toBe(201);
  const { _id } = await cadastro.json();

  const login = await request.post('/login', {
    data: { email: usuario.email, password: usuario.password },
  });
  base.expect(login.status()).toBe(200);
  const { authorization } = await login.json();

  return { ...usuario, _id, token: authorization };
}

exports.test = base.test.extend({
  admin: async ({ request }, use) => {
    const admin = await criarELogar(request, { administrador: 'true' });
    await use(admin);
    await request.delete(`/usuarios/${admin._id}`);
  },
  usuarioComum: async ({ request }, use) => {
    const usuario = await criarELogar(request, { administrador: 'false' });
    await use(usuario);
    await request.delete(`/usuarios/${usuario._id}`);
  },
});

exports.expect = base.expect;
