// import { outLogin } from '@/services/web-api/api'
import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
// import UserOutlined from '@ant-design/icons/UserOutlined'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { history, useModel } from '@umijs/max'
import Spin from 'antd/es/spin'
import { stringify } from 'querystring'
import type { MenuInfo } from 'rc-menu/lib/interface'
import React, { useCallback } from 'react'
import { flushSync } from 'react-dom'
import HeaderDropdown from '../HeaderDropdown'

/**
 * 退出登录，并且将当前的 url 保存
 */
export const loginOut = async () => {
  // 暂无退出接口
  // await outLogin()
  const { search, pathname } = window.location
  const urlParams = new URL(window.location.href).searchParams
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect')
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/landing' && !redirect) {
    history.replace({
      pathname: '/landing',
      search: stringify({
        redirect: pathname + search,
      }),
    })
  }
}

export type GlobalHeaderRightProps = {
  menu?: boolean
  children?: React.ReactNode
}

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}
  return (
    <span
      className="anticon frc-center cursor-pointer"
      style={{
        display: 'inline-flex',
      }}
    >
      {/* <img src={currentUser?.image_url} alt="avatar" style={{ width: 22, height: 22, borderRadius: 10, marginRight: 6 }} /> */}
      <span>{currentUser?.email}</span>
    </span>
  )
}

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    }
  })
  const { initialState, setInitialState } = useModel('@@initialState')

  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const { key, domEvent } = event
      domEvent.stopPropagation()
      if (key === 'logout') {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        flushSync(() => {
          setInitialState((s: any) => ({ ...s, currentUser: undefined }))
        })
        await loginOut()
        return
      }
      // 如果点击的不是 "logout" 菜单项，则会根据菜单项的 key 值生成一个路由路径，然后使用 history.push() 方法来在路由之间导航到对应的路径
      // history.push(`/account/${key}`)
      // else if (key === 'center') {
      //   history.push(`/database-config/corpus`)
      // }
    },
    [setInitialState],
  )

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const { currentUser } = initialState

  if (!currentUser || !currentUser.name) {
    return loading
  }

  const menuItems = [
    ...(menu
      ? [
          // {
          //   key: 'center',
          //   icon: <UserOutlined />,
          //   label: '个人中心',
          // },
          // {
          //   key: 'settings',
          //   icon: <SettingOutlined />,
          //   label: '个人设置',
          // },
          // {
          //   type: 'divider' as const,
          // },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  return (
    <div
      onClick={e => {
        e.stopPropagation()
        e.preventDefault()
        if (location.pathname === '/landing') {
          history.push('/database-config/corpus')
        }
      }}
    >
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
    </div>
  )
}
