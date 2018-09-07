# vueAdmin-template

>  
## Build Setup

``` bash

# Clone project
git clone https://github.com/PanJiaChen/vueAdmin-template.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Demo
![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

### Element-Ui 使用cdn教程
首先找到 `index.html` ([根目录下](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/index.html))

引入 Element的css和js ，并且引入 vue 。因为 Element-Ui 是依赖 vue 的，所以必须在它之前引入 vue 。

之后找到 [webpack.base.conf.js](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/build/webpack.base.conf.js) 加入 `externals` 让webpack 不打包 vue 和 element
```
externals: {
  vue: 'Vue',
  'element-ui':'ELEMENT'
}
```

之后还有一个小细节是如果你用了全局对象方式引入vue，就不需要 手动 `Vue.use(Vuex）` ，它会自动挂载，具体见 [issue](https://github.com/vuejs/vuex/issues/731)

最终你可以使用 `npm run build --report` 查看效果
如图：
![demo](https://panjiachen.github.io/images/element-cdn.png)

**[具体代码](https://github.com/PanJiaChen/vueAdmin-template/commit/746aff560932704ae821f82f10b8b2a9681d5177)**

**[对应分支](https://github.com/PanJiaChen/vueAdmin-template/tree/element-ui-cdn)**

## License
[MIT](https://github.com/PanJiaChen/vueAdmin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen


