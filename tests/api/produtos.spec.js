const { test, expect } = require('../../support/fixtures');
const { novoProduto } = require('../../support/factories/massa');

test.describe('POST /produtos — regras de autorização', () => {
  test('administrador cadastra produto', async ({ request, admin }) => {
    const res = await request.post('/produtos', {
      data: novoProduto(),
      headers: { Authorization: admin.token },
    });

    expect(res.status()).toBe(201);
    const { _id } = await res.json();
    await request.delete(`/produtos/${_id}`, { headers: { Authorization: admin.token } });
  });

  test('usuário comum recebe 403', async ({ request, usuarioComum }) => {
    const res = await request.post('/produtos', {
      data: novoProduto(),
      headers: { Authorization: usuarioComum.token },
    });

    expect(res.status()).toBe(403);
    expect((await res.json()).message).toBe('Rota exclusiva para administradores');
  });

  test('sem token recebe 401', async ({ request }) => {
    const res = await request.post('/produtos', { data: novoProduto() });

    expect(res.status()).toBe(401);
  });
});
