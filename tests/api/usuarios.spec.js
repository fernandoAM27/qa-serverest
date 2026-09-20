const { test, expect } = require('../../support/fixtures');
const { novoUsuario } = require('../../support/factories/massa');

test.describe('/usuarios', () => {
  test('cadastra usuário e consulta pelo id', async ({ request }) => {
    const usuario = novoUsuario();

    const cadastro = await request.post('/usuarios', { data: usuario });
    expect(cadastro.status()).toBe(201);
    const { _id } = await cadastro.json();

    const consulta = await request.get(`/usuarios/${_id}`);
    expect(consulta.status()).toBe(200);
    expect(await consulta.json()).toMatchObject({
      nome: usuario.nome,
      email: usuario.email,
      administrador: usuario.administrador,
    });
  });

  test('não permite e-mail duplicado', async ({ request }) => {
    const usuario = novoUsuario();
    await request.post('/usuarios', { data: usuario });

    const res = await request.post('/usuarios', { data: { ...usuario, nome: 'Outro Nome' } });

    expect(res.status()).toBe(400);
    expect((await res.json()).message).toBe('Este email já está sendo usado');
  });

  test('e-mail ausente retorna 400 com mensagem do campo', async ({ request }) => {
    const { email, ...semEmail } = novoUsuario();

    const res = await request.post('/usuarios', { data: semEmail });

    expect(res.status()).toBe(400);
    expect((await res.json()).email).toBe('email é obrigatório');
  });
});
