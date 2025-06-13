export function useTruthTable(vars: string[]) {
  const rows = []
  const total = 2 ** vars.length

  for (let i = 0; i < total; i++) {
    const row: Record<string, boolean> = {}
    vars.forEach((v, j) => {
      row[v] = Boolean((i >> (vars.length - j - 1)) & 1)
    })
    rows.push(row)
  }

  return { vars, rows }
}
