import { AuthorityLevel } from './services/ant-design-pro/enums'

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {}
  return {
    canAdmin: currentUser && currentUser.level === AuthorityLevel.admin,
    user: currentUser && currentUser.level === AuthorityLevel.user,
  }
}
