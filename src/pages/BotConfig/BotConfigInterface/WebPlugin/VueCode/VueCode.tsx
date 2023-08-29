import { Editor } from '@monaco-editor/react'
import { useModel } from '@umijs/max'
import React, { useMemo } from 'react'
import CopyLink from '../../components/CopyLink'
import { getOrigin } from '@/utils'

export default function VueCode() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const code = useMemo(() => {
    return `<template>
    <div class="askio-btn-wrap">
      <iframe
        v-show="iframeVisible"
        src="${getOrigin()}/bot/${currentUser?.html_url}"
        class="askio-iframe-class"
        :style="{
          width: \`\${width}px\`,
          height: iframeVisible ? \`\${height}px\` : 0,
        }"
      ></iframe>
      <div class="askio-btn" @click="toggleIframeVisible">
        <span
          style="
            color: #e65c41;
            font-size: 16px;
            width: 100%;
            display: inline-block;
          "
        >
          在线咨询
        </span>
        <div class="askio-img-wrap">
          <img
            src="${currentUser?.image_url}"
            alt="chat icon"
            class="askio-img"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      top: {
        type: Number,
        default: undefined,
      },
      bottom: {
        type: Number,
        default: 60,
      },
      left: {
        type: Number,
        default: undefined,
      },
      right: {
        type: Number,
        default: 60,
      },
      width: {
        type: Number,
        default: 300,
      },
      height: {
        type: Number,
        default: 500,
      },
    },
    data() {
      return {
        iframeVisible: false,
      };
    },
    methods: {
      toggleIframeVisible() {
        this.iframeVisible = !this.iframeVisible;
      },
    },
  };
  </script>
  
  <style>
  .askio-iframe-class { 
    border: none;
    margin-bottom: -60px;
    transition: height 0.3s;
    overflow: hidden;
    border-radius: 10px;
  }

  .askio-btn-wrap {
    position: fixed;
    bottom: 60px;
    right: 60px;
    overflow: hidden;
    z-index: 9999;
  }
  
  .askio-btn {
    width: 144px;
    height: 48px;
    margin: 60px 60px 60px 100px;
    border-radius: 24px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 10px 50px 10px, rgba(0, 0, 0, 0.15) 0px 10px 10px -10px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
  }
  
  @media screen and (max-width: 768px) {
    .askio-btn-wrap {
      bottom: 60px;
      right: 10px;
    }
    .askio-btn{
      margin: 20px;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 10px 2px, rgba(0, 0, 0, 0.15) 0px 2px 2px -2px;
    }
  }
  
  .askio-img-wrap {
    position: absolute;
    width: 52px;
    height: 52px;
    margin: 0 0 0 97px;
    border-radius: 26px;
    background-color: #e65b42;
  }
  
  .askio-img {
    width: 52px;
    height: 52px;
    border-radius: 26px;
  }
  </style>
  
`
  }, [currentUser?.html_url, currentUser?.image_url])

  const options = {
    readOnly: true, //只读
    automaticLayout: true, //自动布局
  }

  return (
    <div>
      <div>
        <span
          style={{
            color: '#131415',
            fontSize: '14px',
            fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
            marginBottom: '8px',
            marginRight: '16px',
          }}
        >
          请在您的 Vue 项目中新建一个组件，将以下代码复制进去
        </span>
        <CopyLink linkUrl={code} copyText="复制代码" />
      </div>
      <Editor height={'60vh'} value={code} language={'typescript'} options={options} />
    </div>
  )
}
