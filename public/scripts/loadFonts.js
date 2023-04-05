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
    `;
    _head.innerHTML += fontStyle;
  }
})();
