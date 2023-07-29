import { Editor } from '@monaco-editor/react'
import { useModel } from '@umijs/max'
import { Input } from 'antd'
import React from 'react'
import CopyLink from '../../components/CopyLink'

export default function HTMLCode() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const htmlValue = `<!-- HTML file -->
  <!DOCTYPE html>
  <html>
  <head>
    <!-- Add your other head elements here -->
  </head>
  <body>
    <!-- Your HTML content -->
    <script src="online-faq-plugin.js"></script>
  </body>
  </html>
  `

  const code = `// online-faq-plugin.js
    (function () {
      // Utility function to create DOM elements with attributes and styles
      function createElement(tag, attributes, styles) {
        const element = document.createElement(tag);
        if (attributes) {
          Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
          });
        }
        if (styles) {
          Object.keys(styles).forEach((key) => {
            element.style[key] = styles[key];
          });
        }
        return element;
      }
    
      // OnlineFAQ function to create and append the component
      function OnlineFAQ(props) {
        const { width = 300, height = 500, bottom = 60, right = 60 } = props;
        let iframeVisible = false;
    
        // Container
        const btnWrap = createElement('div', {
          class: 'online-faq-wrap',
        });
    
        // Iframe
        const iframe = createElement('iframe', {
          src: '${REACT_APP_OFFICIAL_SITE}/bot/${currentUser?.bot_id}',
          style:\`
            width: \${width}px;
            height: \${iframeVisible ? height : 0}px;
            border: none;
            margin-bottom: -60px;
            transition: height 0.3s;
            overflow: hidden;
            border-radius: 10px;
          \`,
        });
    
        // Button
        const btn = createElement('div', {
          style: \`width: 144px;
          height: 48px;
          margin: 60px 60px 60px 100px;
          border-radius: 24px;
          box-shadow: rgba(0, 0, 0, 0.07) 0px 10px 50px 10px, rgba(0, 0, 0, 0.15) 0px 10px 10px -10px;
          background-color: #fff;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          position: relative;
          padding-left: 20px;
          cursor: pointer;\`,
        });
    
        btnWrap.appendChild(iframe);
    
        const span = createElement('span', {
          style:"color: #e65c41;font-size: 16px;width: 100%;display: inline-block;"
        });
        span.textContent = '在线咨询';
    
        const chatIcon = createElement('img', {
          src: '${currentUser?.image_url}',
          alt: 'chat icon',
          style: "width: 52px;height: 52px;border-radius: 26px;",
        });
    
        const iconWrapper = createElement('div', {
          style: "position: absolute;width: 52px;height: 52px;margin: 0 0 0 97px;border-radius: 26px;background-color: #e65b42;",
        });
    
        iconWrapper.appendChild(chatIcon);
        btn.appendChild(span);
        btn.appendChild(iconWrapper);
        btnWrap.appendChild(btn);
    
        // Apply styles
        btnWrap.style.position = 'fixed';
        btnWrap.style.bottom = bottom + 'px';
        btnWrap.style.right = right + 'px';
        btnWrap.style.overflow = 'hidden';
        btnWrap.style.zIndex = 9999;
    
        // Add media query styles
        const mediaQuery = '@media screen and (max-width: 768px)';
        if (window.matchMedia(mediaQuery).matches) {
          btnWrap.style.bottom = '60px';
          btnWrap.style.right = '10px';
          btn.style.margin = '20px';
          btn.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 2px 10px 2px, rgba(0, 0, 0, 0.15) 0px 2px 2px -2px';
        }
    
        // Add click event to toggle iframe visibility
        btn.addEventListener('click', () => {
          iframeVisible = !iframeVisible;
          iframe.style.height = iframeVisible ? height + 'px' : 0;
        });
    
        // Append to the body
        document.body.appendChild(btnWrap);
      }
    
      // Usage of OnlineFAQ plugin
      // 插件用法
      OnlineFAQ({
        // Customize your props here (width, height, bottom, right)
        // 请定制组件位置 (width, height, bottom, right)
        // width: 300,
        // height: 500,
        // bottom: 60,
        // right: 60,
      });
    })();
    `

  return (
    <div>
      <div
        style={{
          fontSize: '14px',
          fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
          marginBottom: '8px',
          color: '#131415',
        }}
      >
        复制网页插件代码内容并添加到 index.html 的body，即可把AI客服作为聊天插件嵌入到你的网站中，示例如下：
        <CopyLink linkUrl={htmlValue} copyText="复制代码" />
      </div>
      <Input.TextArea rows={10} value={htmlValue} />
      <div
        style={{
          fontSize: '14px',
          fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
          marginBottom: '16px',
          marginTop: '16px',
          color: '#131415',
        }}
      >
        online-faq-plugin.js 代码如下：
        <CopyLink linkUrl={code} copyText="复制代码" />
      </div>
      <div
        style={{
          fontSize: '14px',
          fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
          marginBottom: '16px',
          marginTop: '16px',
          color: '#131415',
        }}
      >
        注意，代码底部的 OnlineFAQ 需要您根据你的网站的情况进行配置，调整对话框位置
      </div>
      <Editor height={'50vh'} defaultValue={'loading'} value={code} />
    </div>
  )
}
