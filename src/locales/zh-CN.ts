import component from './zh-CN/component'
import globalHeader from './zh-CN/globalHeader'
import menu from './zh-CN/menu'
import pages from './zh-CN/pages'
import pwa from './zh-CN/pwa'
import settingDrawer from './zh-CN/settingDrawer'
import settings from './zh-CN/settings'
import landing from './zh-CN/landing'
import register from './zh-CN/register'
import agreement from './zh-CN/agreement'
import button from './zh-CN/button'

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': 'FreeBe DAO 悦问团队',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...landing,
  ...register,
  ...agreement,
  ...button,
}
