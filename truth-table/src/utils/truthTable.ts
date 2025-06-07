/**
 * Módulo para geração e manipulação de tabelas verdade lógicas.
 * Oferece funcionalidades para avaliar expressões booleanas e gerar
 * todas as combinações possíveis de valores verdade.
 */

// Tipos básicos para representação dos valores e estruturas da tabela verdade
type TruthValue = 'T' | 'F'; // 'T' para verdadeiro (True), 'F' para falso (False)

/**
 * Representa uma linha da tabela verdade com pares chave-valor
 * onde a chave é o nome da variável/proposição e o valor é 'T' ou 'F'
 */
export type TruthRow = Record<string, TruthValue>;

/**
 * Estrutura completa da tabela verdade contendo:
 * - headers: Nomes das colunas (variáveis + expressão avaliada)
 * - rows: Linhas com todas as combinações de valores possíveis
 */
export interface TruthTable {
  headers: string[];
  rows: TruthRow[];
}

/**
 * Gera todas as combinações possíveis de valores verdade para um conjunto de variáveis.
 * Utiliza uma abordagem binária onde cada variável representa um bit.
 * 
 * @param vars - Array com os nomes das variáveis/proposições
 * @returns Array de TruthRow com todas as combinações possíveis
 */
function generateCombinations(vars: string[]): TruthRow[] {
  const total = 2 ** vars.length; // Calcula 2^n combinações possíveis
  const rows: TruthRow[] = [];

  for (let i = 0; i < total; i++) {
    const row: TruthRow = {};
    // Para cada variável, determina seu valor baseado na posição do bit
    vars.forEach((v, j) => {
      // Desloca e mascara para obter o valor do bit correspondente
      row[v] = ((i >> (vars.length - j - 1)) & 1) === 1 ? 'T' : 'F';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Normaliza expressões lógicas convertendo operadores simbólicos/textuais
 * para sintaxe JavaScript válida. Também trata de implicações e bicondicionais.
 * 
 * @param expr - Expressão lógica a ser normalizada
 * @returns Expressão convertida para sintaxe JavaScript com operadores lógicos
 */
function normalizeExpression(expr: string): string {
  return expr
    // NOTA: ⚠️ Substitua primeiro operadores compostos para evitar conflito com simples

    // Bicondicional (A <-> B) → marcador temporário ⇔
    .replace(/<->|⇔|↔/g, '⇔')

    // Condicional (A -> B) → marcador temporário ⇒
    .replace(/->|⇒/g, '⇒')

    // Negação
    .replace(/\bnot\b/gi, '!')
    .replace(/¬/g, '!')

    // Conjunção
    .replace(/\band\b/gi, '&&')
    .replace(/\^/g, '&&')

    // Disjunção (v ou or)
    .replace(/\bor\b/gi, '||')
    .replace(/(?<=\w)\s*v\s*(?=\w)/gi, '||') // Troca " v " com espaços — mais confiável

    // Constantes
    .replace(/\bT\b/g, 'true')
    .replace(/\bF\b/g, 'false');
}

/**
 * Avalia uma expressão lógica substituindo as variáveis pelos valores fornecidos.
 * 
 * @param expr - Expressão lógica a ser avaliada
 * @param values - Objeto com os valores das variáveis
 * @returns 'T' se a expressão é verdadeira, 'F' caso contrário
 * @throws Pode lançar erros de sintaxe se a expressão for inválida
 */
function evaluateExpression(expr: string, values: Record<string, TruthValue>): TruthValue {
  // Substitui variáveis por seus valores (true/false)
  let jsExpr = expr.replace(/\b[A-Z]\b/gi, (v) => {
    return values[v.toUpperCase()] === 'T' ? 'true' : 'false';
  });

  // Normaliza e transforma implicações/bicondicionais
  jsExpr = normalizeExpression(jsExpr);
  jsExpr = transformImplications(jsExpr);

  try {
    // Avalia a expressão e converte o resultado para 'T'/'F'
    return eval(jsExpr) ? 'T' : 'F';
  } catch (e) {
    console.error('Erro ao avaliar:', jsExpr);
    return 'F'; // Fail-safe: retorna falso em caso de erro
  }
}

/**
 * Transforma implicações (⇒) e bicondicionais (⇔) em expressões equivalentes
 * usando apenas operadores básicos (&&, ||, !) para avaliação em JS.
 * 
 * @param expr - Expressão com implicações/bicondicionais
 * @returns Expressão equivalente usando apenas operadores básicos
 */
function transformImplications(expr: string): string {
  // Bicondicional (A ⇔ B) ≡ (A → B) ∧ (B → A) ≡ (!A ∨ B) ∧ (!B ∨ A)
  expr = expr.replace(/([()!\w\s&|]+)⇔([()!\w\s&|]+)/g, (_, p1, p2) => {
    return `((!(${p1.trim()}) || ${p2.trim()}) && (!(${p2.trim()}) || ${p1.trim()}))`;
  });

  // Condicional (A ⇒ B) ≡ !A ∨ B
  expr = expr.replace(/([()!\w\s&|]+)⇒([()!\w\s&|]+)/g, (_, p1, p2) => {
    return `(!(${p1.trim()}) || ${p2.trim()})`;
  });

  return expr;
}

/**
 * Gera uma tabela verdade completa para uma expressão lógica.
 * 
 * @param expression - Expressão lógica a ser analisada
 * @returns Objeto TruthTable contendo:
 *          - headers: Nomes das variáveis e da expressão
 *          - rows: Todas as combinações de valores com o resultado
 */
export function generateTruthTable(expression: string): TruthTable {
  // Extrai variáveis únicas da expressão (letras maiúsculas)
  const variables = Array.from(new Set(expression.match(/[A-Z]/g))) || [];
  // Gera todas as combinações possíveis de valores
  const rows = generateCombinations(variables);

  // Para cada combinação, avalia a expressão e armazena o resultado
  const table: TruthRow[] = rows.map((row) => {
    const result = evaluateExpression(expression, row);
    return { ...row, [`(${expression})`]: result };
  });

  return {
    headers: [...variables, `(${expression})`], // Cabeçalhos: variáveis + expressão
    rows: table
  };
}