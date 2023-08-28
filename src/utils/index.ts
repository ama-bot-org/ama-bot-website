export const getOrigin = () => {
  return `${window.location.origin.includes('askio.xyz') ? 'https://askio.xyz' : 'https://aiyin.chat'}`
}
