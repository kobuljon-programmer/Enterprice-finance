export const useScrollTo = () => {
  const scrollToElement = (selector: string) => {
    if (import.meta.client) {
      const element = document.querySelector(selector)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return { scrollToElement }
}
