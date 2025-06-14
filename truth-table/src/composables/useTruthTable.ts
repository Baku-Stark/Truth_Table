import { ref } from 'vue'

const operators = {
  '∧': (a: boolean, b: boolean) => a && b,
  '∨': (a: boolean, b: boolean) => a || b,
  '¬': (_: boolean, b: boolean) => !b,
}

function parseExpression(expr: string, variables: Record<string, boolean>) {
  const tokens = expr.replace(/\s+/g, '').match(/([A-Z]|¬|∧|∨|\(|\))/g)
  if (!tokens) throw new Error('Expressão inválida')

  const output: (string | boolean)[] = []
  const stack: string[] = []

  const precedence: Record<string, number> = { '¬': 3, '∧': 2, '∨': 1 }

  tokens.forEach((token) => {
    if (/[A-Z]/.test(token)) {
      output.push(variables[token])
    } else if (token === '¬') {
      stack.push(token)
    } else if (token === '∧' || token === '∨') {
      while (
        stack.length &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop()!)
      }
      stack.push(token)
    } else if (token === '(') {
      stack.push(token)
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!)
      }
      stack.pop() // remove '('
    }
  })

  while (stack.length) {
    output.push(stack.pop()!)
  }

  const evalStack: (boolean | string)[] = []

  output.forEach((token) => {
    if (typeof token === 'boolean') {
      evalStack.push(token)
    } else if (token === '¬') {
      const b = evalStack.pop()
      if (typeof b !== 'boolean') throw new Error('Erro de avaliação')
      evalStack.push(operators['¬'](false, b))
    } else if (token === '∧' || token === '∨') {
      const b = evalStack.pop()
      const a = evalStack.pop()
      if (typeof a !== 'boolean' || typeof b !== 'boolean') {
        throw new Error('Erro de avaliação')
      }
      evalStack.push(operators[token](a, b))
    }
  })

  const result = evalStack.pop()
  if (typeof result !== 'boolean') throw new Error('Erro final de avaliação')

  return result
}

export function useTruthTable(expression: string) {
  const variables = Array.from(new Set(expression.match(/[A-Z]/g))).sort()

  const headers = ref([...variables, expression])
  const truthTable = ref<any[][]>([])

  const totalRows = 2 ** variables.length

  const generateTable = () => {
    const table: any[][] = []

    for (let i = 0; i < totalRows; i++) {
      const rowVars: Record<string, boolean> = {}
      const row: (boolean | string)[] = []

      variables.forEach((v, index) => {
        const value = Boolean((i >> (variables.length - index - 1)) & 1)
        rowVars[v] = value
        row.push(value)
      })

      const result = parseExpression(expression, rowVars)
      row.push(result)

      table.push(row)
    }

    truthTable.value = table
  }

  generateTable()

  return {
    headers,
    truthTable,
  }
}
