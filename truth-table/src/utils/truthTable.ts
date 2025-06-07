// src/utils/truthTable.ts

type TruthValue = 'T' | 'F';

export type TruthRow = Record<string, TruthValue>;

export interface TruthTable {
  headers: string[];
  rows: TruthRow[];
}

/**
 * Gera todas as combinações possíveis de n variáveis booleanas
 */
function generateCombinations(vars: string[]): TruthRow[] {
  const total = 2 ** vars.length;
  const rows: TruthRow[] = [];

  for (let i = 0; i < total; i++) {
    const row: TruthRow = {};
    vars.forEach((v, j) => {
      row[v] = ((i >> (vars.length - j - 1)) & 1) === 1 ? 'T' : 'F';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Converte expressão simbólica (∧, ∨, ¬) para JS (&&, ||, !)
 */
function normalizeExpression(expr: string): string {
  return expr
    // Operadores básicos
    .replace(/\band\b/gi, '&&')
    .replace(/\^/g, '&&')
    .replace(/\bor\b/gi, '||')
    .replace(/\bnot\b/gi, '!')
    .replace(/¬/g, '!')

    // Condicional (SE... ENTÃO) → marcador temporário ⇒
    .replace(/->|⇒/g, '⇒')

    // Bicondicional (SE E SOMENTE SE) → marcador temporário ⇔
    .replace(/<->|↔|⇔/g, '⇔')

    // Constantes lógicas (opcional)
    .replace(/\bT\b/g, 'true')
    .replace(/\bF\b/g, 'false');
}

/**
 * Avalia uma expressão booleana substituindo as variáveis
 */
function evaluateExpression(expr: string, values: Record<string, TruthValue>): TruthValue {
  let jsExpr = expr.replace(/\b[A-Z]\b/gi, (v) => {
    return values[v.toUpperCase()] === 'T' ? 'true' : 'false';
  });

  jsExpr = normalizeExpression(jsExpr);
  jsExpr = transformImplications(jsExpr);

  try {
    return eval(jsExpr) ? 'T' : 'F';
  } catch (e) {
    console.error('Erro ao avaliar:', jsExpr);
    return 'F';
  }
}

function transformImplications(expr: string): string {
  // Bicondicional A ⇔ B → (!A || B) && (!B || A)
  expr = expr.replace(/([()!\w\s&|]+)⇔([()!\w\s&|]+)/g, (_, p1, p2) => {
    return `((!(${p1.trim()}) || ${p2.trim()}) && (!(${p2.trim()}) || ${p1.trim()}))`;
  });

  // Condicional A ⇒ B → !A || B
  expr = expr.replace(/([()!\w\s&|]+)⇒([()!\w\s&|]+)/g, (_, p1, p2) => {
    return `(!(${p1.trim()}) || ${p2.trim()})`;
  });

  return expr;
}


/**
 * Gera a tabela verdade completa
 */
export function generateTruthTable(expression: string): TruthTable {
  const variables = Array.from(new Set(expression.match(/[A-Z]/g))) || [];
  const rows = generateCombinations(variables);

  const table: TruthRow[] = rows.map((row) => {
    const result = evaluateExpression(expression, row);
    return { ...row, [`(${expression})`]: result };
  });

  return {
    headers: [...variables, `(${expression})`],
    rows: table
  };
}

