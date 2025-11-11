/** @type {import('tailwindcss').PluginCreator} */
export default function ({ addBase, theme }) {
  const containerScreens = theme('container.screens', {})
  
  // Get all breakpoints sorted by value
  const breakpoints = Object.entries(containerScreens)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => {
      // Convert rem to pixels for comparison (1rem = 16px)
      const aValue = parseFloat(a.value) * 16
      const bValue = parseFloat(b.value) * 16
      return aValue - bValue
    })

  // Generate CSS variables for each breakpoint
  const cssVars = {}
  const mediaQueries = []

  // Set default (smallest breakpoint)
  if (breakpoints.length > 0) {
    cssVars['--container-max-width'] = breakpoints[0].value
  }

  // Generate media queries for each breakpoint
  breakpoints.forEach(({ name, value }) => {
    mediaQueries.push({
      [`@media (width >= ${value})`]: {
        ':root': {
          '--container-max-width': value,
        },
      },
    })
  })

  // Add base CSS variables
  addBase({
    ':root': cssVars,
  })

  // Add media queries
  mediaQueries.forEach((query) => {
    addBase(query)
  })
}

