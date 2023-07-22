import { useState } from 'react'
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import CopyToClipboard from 'react-copy-to-clipboard'

const CopyLink = (props: { linkUrl: string }) => {
  const { linkUrl } = props
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (!isCopied) {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 6000)
    } else if (isCopied) {
      setIsCopied(false)
    }
  }

  return (
    <CopyToClipboard
      text={linkUrl}
      onCopy={() => {
        handleCopy()
      }}
    >
      <button
        type="button"
        style={{
          height: '32px',
          padding: '2px',
          textAlign: 'center',
        }}
      >
        {isCopied ? (
          <ShareAltOutlined
            width={22}
            height={22}
            style={{
              color: '#03c03c',
            }}
          />
        ) : (
          <CopyOutlined style={{ fontSize: 14 }} />
        )}
        <span
          style={{
            color: isCopied ? '#03c03c' : 'black',
            marginLeft: '4px',
          }}
        >
          {isCopied ? '复制成功' : '点击复制'}
        </span>
      </button>
    </CopyToClipboard>
  )
}

export default CopyLink
