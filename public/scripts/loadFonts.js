/**
 * loadFonts 加载字体
 * 首次加载时引入字体
 */
(function () {
  const _head = document.querySelector('head');
  if (_head) {
    const fontStyle = `
    <style>
    @font-face {
      font-family: AlibabaPuHuiTi-2-85-Bold;
      src:url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-85-Bold/AlibabaPuHuiTi-2-85-Bold.eot) format('embedded-opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-85-Bold/AlibabaPuHuiTi-2-85-Bold.otf) format('opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-85-Bold/AlibabaPuHuiTi-2-85-Bold.ttf) format('TrueType'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-85-Bold/AlibabaPuHuiTi-2-85-Bold.woff) format('woff'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-85-Bold/AlibabaPuHuiTi-2-85-Bold.woff2) format('woff2');
    }
    </style> 
    <style>
      @font-face {
        font-family: AlibabaPuHuiTi-2-65-Medium;
        src:url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-65-Medium/AlibabaPuHuiTi-2-65-Medium.eot) format('embedded-opentype'),
      url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-65-Medium/AlibabaPuHuiTi-2-65-Medium.otf) format('opentype'),
      url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-65-Medium/AlibabaPuHuiTi-2-65-Medium.ttf) format('TrueType'),
      url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-65-Medium/AlibabaPuHuiTi-2-65-Medium.woff) format('woff'),
      url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-65-Medium/AlibabaPuHuiTi-2-65-Medium.woff2) format('woff2');
      }
    </style>
    <style>
    @font-face {
      font-family: AlibabaPuHuiTi-2-55-Regular;
      src:url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-55-Regular/AlibabaPuHuiTi-2-55-Regular.eot) format('embedded-opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-55-Regular/AlibabaPuHuiTi-2-55-Regular.otf) format('opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-55-Regular/AlibabaPuHuiTi-2-55-Regular.ttf) format('TrueType'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-55-Regular/AlibabaPuHuiTi-2-55-Regular.woff) format('woff'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-2/AlibabaPuHuiTi-2-55-Regular/AlibabaPuHuiTi-2-55-Regular.woff2) format('woff2');
    }
    </style> 
    <style>
    @font-face {
      font-family: AlibabaSans-Regular;
      src:url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Regular/AlibabaSans-Regular.eot) format('embedded-opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Regular/AlibabaSans-Regular.otf) format('opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Regular/AlibabaSans-Regular.ttf) format('TrueType'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Regular/AlibabaSans-Regular.woff) format('woff'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Regular/AlibabaSans-Regular.woff2) format('woff2');
    }
    </style> 
    <style>
    @font-face {
      font-family: AlibabaSans-Medium;
      src:url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Medium/AlibabaSans-Medium.eot) format('embedded-opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Medium/AlibabaSans-Medium.otf) format('opentype'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Medium/AlibabaSans-Medium.ttf) format('TrueType'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Medium/AlibabaSans-Medium.woff) format('woff'),
    url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaSans/AlibabaSans-Medium/AlibabaSans-Medium.woff2) format('woff2');
    }
    </style> 
    `;
    _head.innerHTML += fontStyle;
  }
})();
