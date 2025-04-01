const AnaliseDeDados = require('./AnaliseDeDados');

describe('Testes para a classe AnaliseDeDados', () => {
  let analise;

  beforeEach(() => {
    analise = new AnaliseDeDados([1, 2, 3, 4, 5]);
  });

  test('deve criar uma instância corretamente', () => {
    expect(analise).toBeInstanceOf(AnaliseDeDados);
  });

  test('deve adicionar novos dados', () => {
    analise.adicionarDados([6, 7, 8]);
    expect(analise.dados).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('deve lançar erro se tentar adicionar dados não-array', () => {
    expect(() => analise.adicionarDados(123)).toThrow('Os dados devem ser um array.');
  });

  test('deve limpar os dados', () => {
    analise.limparDados();
    expect(analise.dados).toEqual([]);
  });

  test('deve ordenar os dados corretamente', () => {
    expect(analise.ordenarDados()).toEqual([1, 2, 3, 4, 5]);
    analise.adicionarDados([0, 6]);
    expect(analise.ordenarDados()).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test('deve calcular a média corretamente', () => {
    expect(analise.calcularMedia()).toBe(3);
    analise.adicionarDados([6, 7]);
    expect(analise.calcularMedia()).toBe(4.5);
  });

  test('deve calcular a mediana corretamente', () => {
    expect(analise.calcularMediana()).toBe(3);
    analise.adicionarDados([6, 7]);
    expect(analise.calcularMediana()).toBe(4);
  });

  test('deve calcular a moda corretamente', () => {
    const dadosComModa = new AnaliseDeDados([1, 2, 2, 3, 4, 5]);
    expect(dadosComModa.calcularModa()).toEqual([2]);
  });

  test('deve calcular a variância corretamente', () => {
    expect(analise.calcularVariancia()).toBe(2.5);
  });

  test('deve calcular o desvio padrão corretamente', () => {
    expect(analise.calcularDesvioPadrao()).toBeCloseTo(Math.sqrt(2.5), 5);
  });

  test('deve encontrar o mínimo corretamente', () => {
    expect(analise.encontrarMinimo()).toBe(1);
  });

  test('deve encontrar o máximo corretamente', () => {
    expect(analise.encontrarMaximo()).toBe(5);
  });

  test('deve normalizar os dados corretamente', () => {
    expect(analise.normalizarDados()).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  test('deve calcular o percentil corretamente', () => {
    expect(analise.calcularPercentil(25)).toBe(2);
    expect(analise.calcularPercentil(50)).toBe(3);
    expect(analise.calcularPercentil(75)).toBe(4);
  });

  test('deve calcular a soma corretamente', () => {
    expect(analise.calcularSoma()).toBe(15);
  });

  test('deve calcular o produto corretamente', () => {
    expect(analise.calcularProduto()).toBe(120);
  });

  test('deve calcular a amplitude corretamente', () => {
    expect(analise.calcularAmplitude()).toBe(4);
  });

  test('deve calcular o coeficiente de variação corretamente', () => {
    expect(analise.calcularCoeficienteVariacao()).toBeCloseTo(47.14, 2);
  });

  test('deve remover outliers corretamente', () => {
    analise.adicionarDados([100]);
    analise.removerOutliers();
    expect(analise.dados).toEqual([1, 2, 3, 4, 5]);
  });

  test('deve calcular a correlação entre dois conjuntos de dados', () => {
    const outroConjunto = [5, 4, 3, 2, 1];
    expect(analise.calcularCorrelacao(outroConjunto)).toBe(-1);
  });

  test('deve retornar null ao tentar calcular correlação com arrays de tamanhos diferentes', () => {
    const outroConjunto = [5, 4, 3];
    expect(analise.calcularCorrelacao(outroConjunto)).toBeNull();
  });

  test('deve retornar null para percentil inválido', () => {
    expect(analise.calcularPercentil(150)).toBeNull();
    expect(analise.calcularPercentil(-10)).toBeNull();
  });

  test('deve retornar null para métodos de cálculo quando os dados estão vazios', () => {
    const analiseVazia = new AnaliseDeDados([]);
    expect(analiseVazia.calcularMedia()).toBeNull();
    expect(analiseVazia.calcularMediana()).toBeNull();
    expect(analiseVazia.calcularModa()).toBeNull();
    expect(analiseVazia.calcularVariancia()).toBeNull();
    expect(analiseVazia.calcularDesvioPadrao()).toBeNull();
    expect(analiseVazia.encontrarMinimo()).toBeNull();
    expect(analiseVazia.encontrarMaximo()).toBeNull();
    expect(analiseVazia.calcularPercentil(50)).toBeNull();
  });
});
