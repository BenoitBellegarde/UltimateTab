export default function useGridProps() {
  return {
    templateAreas: `
                      "nav header"
                      "nav main"
                      "nav footer"`,
    gridTemplateRows: '80px 1fr 80px',
    gridTemplateColumns: '1fr 2fr',
    h: 'calc(100vh - 4rem)',
    gap: '1',
  }
}
