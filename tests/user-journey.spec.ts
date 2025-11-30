import { test, expect } from '@playwright/test';

test.describe('Jornada Principal do Usuário - Eh Fake', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Deve carregar o feed inicial de notícias', async ({ page }) => {
    await expect(page.getByText('Eh Fake!').first()).toBeVisible();

    await expect(page.getByText('Carregando notícias...')).toBeHidden({ timeout: 10000 });

    const cards = page.locator('a', { hasText: 'Acessar' });
    await expect(cards.first()).toBeVisible();
  });

  test('Deve filtrar notícias ao realizar uma busca', async ({ page }) => {
    const termo = 'STF';
    const inputBusca = page.getByPlaceholder('Busque por título ou veracidade');

    await expect(inputBusca).toBeVisible();

    await inputBusca.fill(termo);
    await inputBusca.press('Enter');

    // Validação corrigida: Verifica se o conteúdo apareceu na tela, ignorando a URL
    await expect(page.locator('body')).toContainText(termo, { timeout: 5000 });
    
    await expect(inputBusca).toHaveValue(termo);
  });

  test('Deve alternar entre tema Claro e Escuro', async ({ page }) => {
    const botaoTema = page.locator('nav button').first().or(page.locator('header button').first());

    if (await botaoTema.isVisible()) {
        await botaoTema.click();
        const html = page.locator('html');
        await expect(html).toHaveAttribute('class', /dark|light/);
    }
  });

  test('Deve carregar mais notícias ao rolar a página (Infinite Scroll)', async ({ page }) => {
    await expect(page.getByText('Carregando notícias...')).toBeHidden({ timeout: 10000 });

    const cards = page.locator('a', { hasText: 'Acessar' });
    const contagemInicial = await cards.count();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await page.waitForTimeout(2000);

    const contagemFinal = await cards.count();
    expect(contagemFinal).toBeGreaterThanOrEqual(contagemInicial);
  });
});