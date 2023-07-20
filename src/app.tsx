import Footer from '@/components/Footer'
// import { SelectLang } from '@/components/RightContent'
import type { Settings as LayoutSettings } from '@ant-design/pro-components'
import { SettingDrawer } from '@ant-design/pro-components'
import type { RunTimeLayoutConfig } from '@umijs/max'
import { history } from '@umijs/max'
import defaultSettings from '../config/defaultSettings'
import { errorConfig } from './requestErrorConfig'
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api'
import React from 'react'
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown'

// const isDev = process.env.NODE_ENV === 'development';
const loginPaths = ['/user/register', '/user/login', '/landing']

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  loading?: boolean
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
}> {
  const { location } = history
  // 请求当前用户信息
  const fetchUserInfo = async () => {
    try {
      const msg = localStorage.getItem('user')
      if (msg) {
        const user = JSON.parse(msg)
        return user
      }
      return null
    } catch (error) {
      if (loginPaths.indexOf(location.pathname) === -1) {
        history.push(loginPaths[2])
      } else {
        history.push(location.pathname)
      }
    }
    return undefined
  }
  // 如果不是登录页面，执行
  if (loginPaths.indexOf(location.pathname) === -1) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }: { initialState: any; setInitialState: any }) => {
  return {
    logo: 'public/logo.svg',
    // <Question key="doc" />,
    actionsRender: () => [
      // <SelectLang key="lang" />,
    ],
    avatarProps: {
      // src: initialState?.currentUser?.image_url,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.email,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        if (loginPaths.indexOf(location.pathname) === -1) {
          history.push(loginPaths[2])
        } else {
          history.push(location.pathname)
        }
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    // TODO: 可以用来配置新手教程的视频链接
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={settings => {
              setInitialState((preInitialState: any) => ({
                ...preInitialState,
                settings,
              }))
            }}
          />
        </>
      )
    },
    ...initialState?.settings,
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
}
