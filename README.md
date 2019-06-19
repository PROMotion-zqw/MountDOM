##基于JS的Html-css-js
* Initial 对象
    > 在window中添加一个Initial属性对象  widnow.Initial,
    Initial对象中现在暂时只有两个属性
    >> * 1 DOM //负责渲染DOM
    >> * 2 events //添加事件执行函数 现阶段只通过类名来添加事件

* DOM 对象
    > * DOM对象的第一层属性含义
    >> [键] 标签名 => [值] 包括 css, text, Props, class, children, append_sort
    >> 第一层属性的每个对象中 append_sort 必须为零 [阻止元素被提前渲染到页面中]
    >> ```
    >> 列
    >> nav: {
    >>  css: {},
    >>  append_sort: 0,
    >>  text: "我是nav标签", //标签文本
    >>  Props: {
    >>      title: '标签的title属性'
    >>  },
    >>  class: "",
    >>  children: [
    >>      {div: {
    >>          class: "",
    >>          text: "",
    >>          Props: {},
    >>          mul: [Number],
    >>          css: {}
    >>          }
    >>      }  //元素对象
    >>  ] //数组 子元素集合
    >> }
    >> ```
    >>
    >>* children 数组的含义
        >>> 数组中的每一个对象都是一个元素 对象中也包含 css, text, Props, class
        >>> 对象中也可以再嵌套一个children数组 是当前元素的子元素

* events对象的含义
    > 通过类名添加事件
    > class 对象中包裹 类名对象
    > ```
    > events: {
    >   class: {
    >       test: {
    >           click: [f], 
    >           f函数有一个参数对象 参数对象中有 target, item, index, doc 事件函数 add(当前元素, 回调函数)
    >           这几个属性分别是 字符串事件名[没有on], 当前事件的元素, 当前元素的索引, document元素
    >           mouseover: [f],
    >           ...以此类推
    >       }
    >   }
    > }
    > ```
    
    ###可把这个JHL下载到本地查看基本效果
    ##### npm start  //运行之后 请访问 /index.html