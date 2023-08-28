export const getOrigin = () => {
  return `${window.location.origin.includes('askio.xyz') ? 'https://aiyin.chat' : window.location.origin}`
}
