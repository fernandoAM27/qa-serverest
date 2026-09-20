const { test, expect } = require('../../support/fixtures');
const { novoUsuario } = require('../../support/factories/massa');

test.describe('POST /login', () => {
  test('login com credenciais válidas retorna token Bearer', async ({ request }) => {
    const usuario = novoUsuario();
    await request.post('/usuarios', { data: usuario });

    const res = await request.post('/login', {
      data: { email: usuario.email, password: usuario.password },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('Login realizado com sucesso');
    expect(body.authorization).toMatch(/^Bearer\s.+/);
  });

  test('senha incorreta retorna 401', async ({ request }) => {
    const usuario = novoUsuario();
    await request.post('/usuarios', { data: usuario });

    const res = await request.post('/login', {
      data: { email: usuario.email, password: 'senha-errada' },
    });

    expect(res.status()).toBe(401);
    expect((await res.json()).message).toBe('Email e/ou senha inválidos');
  });

  test('campos obrigatórios ausentes retornam 400', async ({ request }) => {
    const res = await request.post('/login', { data: {} });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('password');
  });
});
