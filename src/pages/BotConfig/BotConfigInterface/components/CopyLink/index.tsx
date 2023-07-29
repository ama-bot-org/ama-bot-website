import { useState } from 'react'
import CheckOutlined from '@ant-design/icons/CheckOutlined'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import CopyToClipboard from 'react-copy-to-clipboard'

const CopyLink = (props: { linkUrl: string; copyText?: string }) => {
  const { linkUrl, copyText } = props
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
          <CheckOutlined
            width={22}
            height={22}
            style={{
              color: '#03c03c',
            }}
          />
        ) : (
          <CopyOutlined style={{ fontSize: 14, color: '#e65c41' }} />
        )}
        <span
          style={{
            color: isCopied ? '#03c03c' : '#e65c41',
            marginLeft: '4px',
          }}
        >
          {isCopied ? '复制成功' : copyText || '复制链接'}
        </span>
      </button>
    </CopyToClipboard>
  )
}

export default CopyLink
