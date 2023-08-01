import './index.less'

const Loading = () => {
  return (
    <div className="askio-loading">
      <div className="page-loading-warp">
        <div className="ant-spin ant-spin-lg ant-spin-spinning">
          <span className="ant-spin-dot ant-spin-dot-spin">
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
            <i className="ant-spin-dot-item"></i>
          </span>
        </div>
      </div>
      <div className="loading-title">
        <img
          alt="logo"
          src="https://aiyinchat-1316443200.cos.ap-shanghai.myqcloud.com/public/favicon.ico"
          style={{
            width: '30px',
            height: '30px',
            marginRight: '8px',
          }}
        />
        正在加载资源
      </div>
      <div className="loading-sub-title">初次加载资源可能需要较多时间 请耐心等待</div>
    </div>
  )
}

export default Loading
