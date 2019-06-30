/**
 * @file React & JSX 相关配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-react@7.13
 * @see [eslint-plugin-react]{@link https://github.com/yannickcr/eslint-plugin-react}
 */

module.exports = {
  "plugins": [
    "react",
  ],

  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
  },

  "settings": {
    // 需要传给 eslint-plugin-react 插件的一些参数
    "react": {
      // 指定的编译库，默认是 `React`，如果用的是 preact 的话，则设置为 `h`
      "pragma": "React",
      // 编译库的版本，可以使用版本号，或者使用 'detect' 字符串，由插件自己检测
      // "version": "detect",
    },
    // 可添加需要限定的属性名
    // "propWrapperFunctions": [
    // ],
    // 在 react/jsx-no-target-blank 规则中，除了限定 `<a>` ，还要限定哪些组件，主要用于自定义的链接/路由组件
    // "linkComponents": [
    //   // 字符串形式，对应的链接属性名也是 `href`
    //   "Hyperlink",
    //   // 对象形式，可以自定义链接属性名
    //   { "name": "Link", "linkAttribute": "to" },
    // ],
  },

  "rules": {
    /**
     * ESLint: 一些 ESLint 规则要针对 React 环境做些适配
     */

    // 在 React 的生命周期中，可能会做一些与 DOM 而非 React 有关的事情，此时可能并不需要 `this`
    "class-methods-use-this": [2,
      {
        // 需要忽略的 React 生命周期方法名
        "exceptMethods": [
          "getChildContext",
          "getDefaultProps",
          "getInitialState",
          "componentWillMount",
          "componentDidMount",
          "componentWillReceiveProps",
          "shouldComponentUpdate",
          "componentWillUpdate",
          "componentDidUpdate",
          "componentWillUnmount",
          "render",
        ],
      },
    ],

    /**
     * React: General
     */

    // 规范布尔类型的 prop 命名
    // 在 propTypes 中指定的布尔类型的 prop，命名都应该以 `is` 或 `has` 开头
    "react/boolean-prop-naming": [0,
      {
        // 匹配哪些类型，默认为 `bool`，即指 `PropTypes.bool`
        "propTypeNames": ["bool"],
        // 校验命名规则，默认是要求以 `is`/`has` 开头
        "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+",
        // 自定义提示
        "message": "布尔类型（{{ propName }}）需要以 is/has 开头",
        // 是否同时检查嵌套的 prop
        "validateNested": true,
      },
    ],

    // 对于 `<button>` 是否一定要定义 `type` 属性
    "react/button-has-type": [2,
      // 哪些 type 是否允许使用，不允许则为 false
      {
        // 如 `<button type="button">` 是否允许使用
        "button": true,
        "submit": true,
        "reset": true,
      },
    ],

    // 对于 defaultProps 中的属性都应该对应上非必须的 PropTypes
    "react/default-props-match-prop-types": [2,
      {
        // 对于必须传入的参数，是否允许设置默认值（其实此设置无意义）
        "allowRequiredDefaults": false,
      },
    ],

    // 对于 props/state/context 中的属性，是否要先解构再使用
    // 即：不能直接 `<div>{ this.props.foo }</div>`，而应该先 `const { foo, bar } = this.props`，再 `<div>{ foo }</div>`
    "react/destructuring-assignment": [0,
      // always: 总是需要先解构再使用
      // never: 直接使用，不能解构
      "always",
    ],

    // 在定义组件时要指定 displayName
    "react/display-name": [0,
      {
        // 是否忽略由转译器设置的 name，这个配置项没太看懂
        "ignoreTranspilerName": false,
      },
    ],

    // 禁止在组件中使用某些属性
    // 比如 className 和 style 应该仅在原生 DOM 元素上使用，而不应该在组件上使用：https://medium.com/brigade-engineering/don-t-pass-css-classes-between-components-e9f7ab192785
    "react/forbid-component-props": [2,
      {
        // 禁止使用的属性名
        "forbid": ["className", "style"],
        // 同时也可以传对象来指明白名单，如：
        // "forbid": [
        //   // 以下表示不允许使用 someProp，但是在 SomeComponent 中可以使用
        //   {
        //     "propName": "someProp",
        //     "allowedFor": ["SomeComponent"],
        //   },
        // ],
      },
    ],

    // 禁止在 DOM 中使用某些属名，与前一个规则类似，这个是用在普通的 DOM 元素而不是组件上的
    "react/forbid-dom-props": [0,
      {
        // 禁止使用的属性名
        "forbid": [],
      },
    ],

    // 禁止使用的元素，比如不允许使用 `<b>` 元素
    "react/forbid-elements": [0,
      {
        // 禁止使用的元素名
        "forbid": [
          // 可以是一个字符串
          "s",
          // 也可以是一个对象，可以提供更友好的出错信息
          {
            "element": "b",
            "message": "use <strong> instead",
          },
        ],
      },
    ],

    // 禁止使用的 PropTypes
    "react/forbid-prop-types": [2,
      {
        // 是否同时检测 contextTypes
        "checkContextTypes": false,
        // 是否同时检测 childContextTypes
        "checkChildContextTypes": false,
        // 具体不允许的 PropTypes
        "forbid": [
          // 应该明确指定 propTypes，不应该使用 any
          "any",
          // 应该使用 `arrayOf` 明确指定数组项的类型
          "array",
          // 应该使用 `shape` 明确指定对象的格式及每个属性的类型
          "object",
        ],
      },
    ],

    // 禁止调用外部组件的 propTypes 属性，除非外部组件明确 export 出了自己的 propTypes
    // 因为使用 babel-plugin-transform-react-remove-prop-types 插件可以为生产环境代码删除 propTypes 相关定义，从而可能产生隐患
    "react/forbid-foreign-prop-types": [2,
      {
        // 是否可以在 propTypes 组件定义时，引用外部组件的 propTypes
        "allowInPropTypes": false,
      },
    ],

    // 禁止在 `setState` 中调用 `this.state`，因为多次连续调用时，`this.state` 并未更新
    // 建议使用函数的方式：`this.setState(prevState => ({value: prevState.value + 1}))`
    // 如果希望在 State 更新后做某些事情，可以加第二个参数：`this.setState({value: 2}, () => { doSomething })`
    "react/no-access-state-in-setstate": 2,

    // 不使用数组的 index 做 key
    // 原因是在 React 中 key 来表明对应的组件是否被改变了，如果 key 不变则 DOM 可被复用
    // 而数组的变动并不能用索引来表示内容的更新（比如往数组的中间插入元素，则后边的项索引都变了，但其他他们并不需要被重新渲染）
    "react/no-array-index-key": 2,

    // 不通过 props 来传递 children
    // 即不使用 `<div children={Children}></div>`
    // 对于 JSX，通过标签传递：`<div><Children></Children></div>`
    // 对于 JS，使用 `createElement`：`React.createElement("div", {}, 'Children')`
    "react/no-children-prop": 2,

    // 不允许使用危险属性：https://facebook.github.io/react/tips/dangerously-set-inner-html.html
    "react/no-danger": 2,

    // 不允许将危险属性与子组件同时使用
    "react/no-danger-with-children": 2,

    // 不允许使用已经废弃的方法
    // 比如 `unmountComponentAtNode`, `findDOMNode`, `createClass` 等等
    // 从 React@16 开始，`componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate` 也不再推荐使用
    "react/no-deprecated": 2,

    // 不允许在 `componentDidMount` 中调用 `setState`，因为会引起二次 render
    // 不过在 SSR 中经常会在 `componentDidMount` 中调用 `setState`，所以如果需要 SSR，建议关闭此检测
    "react/no-did-mount-set-state": [2,
      // 不传此参数，则可以通过在 `componentDidMount` 中调用其他方法，再在其他方法中 `setState`
      // 此参数只有一个值，即 `disallow-in-func`，指定后则在调用的方法中也不允许 `setState`
      "disallow-in-func",
    ],

    // 不允许在 `componentDidUpdate` 中调用 `setState`，因为会引起二次 render
    "react/no-did-update-set-state": [2,
      // 不传此参数，则可以通过在 `componentDidUpdate` 中调用其他方法，再在其他方法中 `setState`
      // 此参数只有一个值，即 `disallow-in-func`，指定后则在调用的方法中也不允许 `setState`
      "disallow-in-func",
    ],

    // 不允许调用 `this.state` 及其下属性的 setter，只能通过 `this.setState` 来修改 state
    // 如：不能 `this.state.foo = bar`，而应该 `this.setState({foo: bar})`
    // 另外在 ES6 Class 的 `constructor` 中不受此限制
    "react/no-direct-mutation-state": 2,

    // 不允许调用 `findDOMNode`
    // 可以使用 `ref`，如：`<div ref={node => this.node = node} />`，见：https://github.com/yannickcr/eslint-plugin-react/issues/678#issue-165177220
    "react/no-find-dom-node": 2,

    // 不允许调用 `isMounted`，它已经被废弃了
    "react/no-is-mounted": 2,

    // 不允许在一个文件中定义多个组件
    "react/no-multi-comp": [2,
      {
        // 是否忽略无 State 的组件
        "ignoreStateless": true,
      },
    ],

    // 继承自 `React.PureComponent` 的组件不允许包含 `shouldComponentUpdate` 方法
    // 如果有 `shouldComponentUpdate` 建议组件从 `React.Component` 来继承
    "react/no-redundant-should-component-update": 2,

    // 不允许获取 `ReactDOM.render` 的返回值，如果需要请使用 `ref`
    // 不建议 `const inst = ReactDOM.render(<App />, document.body); doSomethingWithInst(inst)`
    // 而应该 `ReactDOM.render(<App ref={doSomethingWithInst} />, document.body)`
    "react/no-render-return-value": 2,

    // 不允许调用 `this.setState`，这在 Flux 架构中可能用的上
    "react/no-set-state": 0,

    // 不允许常用的属性及生命周期方法的大小写拼写错误的情况出现
    // 第一是避免不小心拼错了，第二是避免你使用了有歧义的变量/方法名
    "react/no-typos": 2,

    // 不允许在无状态组件中调用 this，SFC=stateless functional component
    "react/no-this-in-sfc": 2,

    // 不允许给组件的 `ref` 属性指定字符串值，它应该是一个回调函数
    "react/no-string-refs": [2,
      {
        // 是否禁止传入模板字符串
        "noTemplateLiterals": true,
      },
    ],

    // 不允许在 JSX 的大括号中（JS 执行部分）使用未转义的实体字符
    // 包括：`>`, `"`, `'`, '}' 几个字符，不包括 `<` 和 `{`，因为如果有实体字符会语法报错
    // 可以通过 HTML 转义，或者使用字符串，如 `<div> &gt; </div>` 或 `<div>{'>'}</div>`
    "react/no-unescaped-entities": [2,
      // {
      //   // 可以配置覆盖默认的检查字符，同时提供可提供的项
      //   "forbid": [
      //     {
      //       "char": ">",
      //       "alternatives": ["&gt;"],
      //     },
      //   ],
      // },
    ],

    // 不允许指定未知的属性名，比如 `class`，或者要把连字符形式的属性转为 React 要求的小驼峰形式
    "react/no-unknown-property": [2,
      {
        // 要忽略的属性名
        "ignore": [],
      },
    ],

    // 不允许使用 `UNSAFE_` 开头的方法
    // `UNSAFE_` 在 React@16.3 中出现，包括 `UNSAFE_componentWillMount`, `UNSAFE_componentWillReceiveProps`, `UNSAFE_componentWillUpdate`
    "react/no-unsafe": 2,

    // 不允许在 propTypes 中定义未被使用的 props
    "react/no-unused-prop-types": [2,
      {
        // 指定一些自定义的检查器
        "customValidators": [],
        // 是否忽略对象细节属性的定义
        "skipShapeProps": true,
      },
    ],


    // 不允许定义未使用的 State
    "react/no-unused-state": 2,

    // 不允许在 `componentWillUpdate` 和 `UNSAFE_componentWillUpdate` 中调用 `setState`，因为会引起二次 render
    "react/no-will-update-set-state": [2,
      // 不传此参数，则可以通过在 `componentWillUpdate` 中调用其他方法，再在其他方法中 `setState`
      // 此参数只有一个值，即 `disallow-in-func`，指定后则在调用的方法中也不允许 `setState`
      "disallow-in-func",
    ],

    // 建议使用 ES6 Class 来定义组件，而不是 `create-react-class`
    "react/prefer-es6-class": [2,
      // always: 总是建立使用 ES6 Class
      // never: 不建议使用 ES6 Class，而使用 `createReactClass`
      "always",
    ],

    // 是否限制传入的属性只读
    "react/prefer-read-only-props": 2,

    // 建议使用无状态的组件
    // 当符合以下要求时，会建议使用无状态的组件：
    // * 没有使用除以下列举之外的属性/方法：`displayName`, `propTypes`, `contextTypes`, `defaultProps`, `render`
    // * 没有使用组件的 `ref`
    // * 在 `render` 中仅返回 JSX，没有返回 `undefined`, `null`
    "react/prefer-stateless-function": [2,
      {
        // 忽略针对继承自 `React.PureComponent` 的组件
        "ignorePureComponents": true,
      },
    ],

    // 要求组件必须为每个 props 指定 propTypes
    "react/prop-types": [2,
      {
        // 忽略的 props 名称列表
        "ignore": [],
        // 指定一些自定义的检查器
        "customValidators": [],
        // 忽略完全没有 propTypes 的组件，即要么完全不定义，要么每个 props 都要定义
        "skipUndeclared": false,
      },
    ],

    // 当使用到 JSX 时，一定要在文件中通过 `import` 或 `require` 引入 React
    // 可与 react/jsx-uses-react 规则进行对比
    "react/react-in-jsx-scope": 2,

    // 对于每一个非必须的 prop 都要指定 defaultProps
    // 此规则和 react/default-props-match-prop-types 互相呼应，可以对照着看
    "react/require-default-props": [2,
      {
        // 对于 isRequired 的属性，是否允许定义默认值（其实定义了也没用，不过默认值可以为开发提供参照）
        "forbidDefaultForRequired": false,
      },
    ],

    // 要求每个组件都有 `shouldComponentUpdate` 方法，用来判断是否需要更新，来提升组件性能
    "react/require-optimization": [0,
      {
        // 允许以下装饰器对应的组件，装饰器名为数组项
        "allowDecorators": [],
      },
    ],

    // 要求在 `render` 函数中，一定要有 `return`
    "react/require-render-return": 2,

    // 在标签中没有子元素时，不使用独立的闭合标签，而使用自闭合
    "react/self-closing-comp": [2,
      {
        // 自定义组件是否要求自闭合
        "component": true,
        // 原生 HTML 标签是否要求自闭合
        "html": false,
      },
    ],

    // 对组件方法进行排序
    "react/sort-comp": [2,
      {
        // 排序顺序
        "order": [
          // 类型注解
          // "type-annotations",
          // 静态方法
          "static-methods",
          // 生命周期函数
          "lifecycle",
          // 可以使用正则，比如所有 `on` 开头的方法
          "/^on.+$/",
          // Getter/Setter
          "getters",
          "setters",
          // 其他实例变量
          "instance-variables",
          // 其他实例方法
          "instance-methods",
          // 其他方法
          "everything-else",
          // `render` 方法
          "render",
        ],
        // 在 order 中指定的每一类，都涉及了哪些方法名
        "groups": {
          // 以下为插件提供的默认值，生命周期方法包含的方法名
          // NOTE: 很好奇为什么 `displayName`, `propTypes` 都放在了 lifecycle 里，难道只是因为它们是 React 的关键字吗
          "lifecycle": [
            "displayName",
            "propTypes",
            "contextTypes",
            "childContextTypes",
            "mixins",
            "statics",
            "defaultProps",
            "constructor",
            "getDefaultProps",
            "state",
            "getInitialState",
            "getChildContext",
            "getDerivedStateFromProps",
            "componentWillMount",
            "UNSAFE_componentWillMount",
            "componentDidMount",
            "componentWillReceiveProps",
            "UNSAFE_componentWillReceiveProps",
            "shouldComponentUpdate",
            "componentWillUpdate",
            "UNSAFE_componentWillUpdate",
            "getSnapshotBeforeUpdate",
            "componentDidUpdate",
            "componentDidCatch",
            "componentWillUnmount",
          ],
        },
      },
    ],

    // 对 propTypes 按照字母顺序排序
    "react/sort-prop-types": [0,
      {
        // 是否忽略大小写
        "ignoreCase": true,
        // 所有函数字义放在 propTypes 列表的最后
        "callbacksLast": true,
        // 所有必填的 props 放在最前
        "requiredFirst": true,
        // 对于 shape 中指定的属性，也进行排序
        "sortShapeProp": true,
      },
    ],

    // 定义 state 放在哪里，是 Class 的静态属性，还是放在 constructor 中
    "react/state-in-constructor": [2,
      // always: 放在 constructor 里
      // never: 放在 Class 的静态属性里
      "always",
    ],

    // 检查静态属性（childContextTypes, contextTypes, contextType, defaultProps, displayName, propTypes）的书写方式
    "react/static-property-placement": [2,
      // static public field: 使用静态属性方式，要写成 `static childContextTypes = { /*...*/ }`
      // static getter: 使用静态 getter 方式，要写成 `static get childContextTypes() { /*...*/ }`
      // property assignment: 使用属性覆写方式，要写成 `MyComponent.childContextTypes = { /*...*/ }`
      "static public field",
      // 同时允许第三个参数，用于额外指定某个属性用哪种方式：
      // {
      //   "displayName": "static getter",
      // },
    ],

    // 检测 style 属性应该是一个对象，主要是防止不小心写错
    "react/style-prop-object": 2,

    // 避免给自闭合标签再加子元素，如 `<br>foo</br>`
    "react/void-dom-elements-no-children": 2,

    /**
     * React: JSX-specific rules
     */

    // 保证 JSX 中对于布尔值使用的一致性
    "react/jsx-boolean-value": [2,
      // 第一个参数，可以是 always, never
      // always: 对于 false 值的属性一定要明确指明，如：`<div foo={false}></div>`
      // never: 对于 false 值的属性应忽略传值，如：`<div foo></div>`
      "always",
      // 第二个参数可选，对应的是个数组，用来表示针对哪些属性不做相应的检测
      // {
      //   // 如果上一个参数是 `always`，则这里的 key 应该为 `never`，否则这里的 key 就是 `always`
      //   "never": [],
      // },
    ],

    // 避免有歧义的 inline 元素间的换行，因为在 JSX 中换行会被吃掉，渲染时不会有空格
    "react/jsx-child-element-spacing": 2,

    // 定义 JSX 的自闭合的结束尖括号的位置
    "react/jsx-closing-bracket-location": [2,
      // 表示位置的字符串有如下几项：
      // tag-aligned: 与开始标签的位置对齐
      // line-aligned: 与开始标签所在行的开头对齐（所有行开头可能是 `const` 等关键字，并不一定是开始标签）
      // after-props: 跟在最后一个 prop 后，而不是另起一行
      // props-aligned: 与最后一个 prop 对齐
      // 可以用一个表示位置的字符串来定义所有情况，如：
      "line-aligned",
      // 也可以像下边这样用对象分别定义非自闭合标签，与自闭合标签的情况
      // {
      //   // 对于非空（非自闭合）标签的结束标签定义位置
      //   "nonEmpty": false,
      //   // 自闭合标签的位置
      //   "selfClosing": "tag-aligned",
      // },
    ],

    // 定义 JSX 的结束标签的位置
    // 该规则没有配置项，只会检查有子元素的多行标签的结束标签位置，要求结束标签必须和开始标签对齐
    "react/jsx-closing-tag-location": 2,

    // 定义 JSX 大括号中是否要有空格
    // 这个规则定义较复杂，且有多种定义方式，如需了解更多请参阅文档：https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    "react/jsx-curly-spacing": [2,
      // always: 总要有空格，如：`<div foo={ bar }>`
      // never: 不要有空格，如：`<div foo={bar}>`
      "never",
      // 配置一些细节
      {
        // 是否允许多行属性
        "allowMultiline": true,
        // 一些细节配置，目前应该只有下边一个属性值
        "spacing": {
          // 如果包裹了一个对象字面量，则与字面量之间是否要有空格，此值默认与第一个参数相同
          "objectLiterals": "never",
        },
      },
    ],

    // 定义 JSX 中属性等号两边是否要有空格
    "react/jsx-equals-spacing": [2,
      // always: 要有空格
      // never: 不要空格
      "never",
    ],

    // 检查 JSX 文件的扩展名
    "react/jsx-filename-extension": [2,
      {
        // 允许的扩展名列表
        "extensions": [".js", ".jsx"],
      },
    ],

    // 检查 JSX 中的第一个属性是否要新起一行
    "react/jsx-first-prop-new-line": [2,
      // always: 要另一起行
      // never: 与开始标签同行
      // multiline: 如果整个标签是多行的，则第一个属性也要另起一行
      // multiline-multiprop: 不但标签要是多行，而且要有多个属性时，第一个属性才要另起一行
      "multiline-multiprop",
    ],

    // 规范 JSX 中所有事件句柄的名字
    "react/jsx-handler-names": [0,
      // 以下两项规则合起来，最终成这样：`<Foo onChange={this.handleChange}`
      {
        // 事件句柄名称前缀
        // 这里只规划自己的方法名，不对 props 中传来的方法名做要求
        "eventHandlerPrefix": "handle",
        // 事件属性名称前缀
        "eventHandlerPropPrefix": "on",
      },
    ],

    // 在 JSX 中的缩进
    "react/jsx-indent": [2,
      // tab: 使用 Tab 缩进
      // N: 使用 N 个空格缩进
      2,
      {
        // 是否检查属性的对齐
        "checkAttributes": true,
        // 是否检查表达式中的 JSX 缩写
        "indentLogicalExpressions": true,
      },
    ],

    // 在 JSX 中标签属性的缩进
    "react/jsx-indent-props": [2,
      // tab: 使用 Tab 缩进
      // N: 使用 N 个空格缩进
      // first: 与第一个属性的位置对齐（常用于第一个属性与标签同行的情况）
      2,
    ],

    // 检查数组中的元素是否有 `key` 属性
    "react/jsx-key": 2,

    // 最多可以嵌套几层的 JSX
    "react/jsx-max-depth": [0,
      {
        "max": 10,
      },
    ],

    // 一行最多有多少个属性
    "react/jsx-max-props-per-line": [2,
      {
        // 在什么时候检查
        // always: 总是检查
        // multiline: 仅在整个标签占据了多行时检查
        "when": "multiline",
        // 最多多少个属性
        "maximum": 1,
      },
    ],

    // 检查 handle/bind 的使用是否更合适
    // 在 `render` 中针对元素或组件做 handle/bind 操作时，建议函数先在 `render` 之外定义，绑定时只传引用，这样也更易读
    // 如果绑定的函数直接在 `render` 中定义，可能会导致重复渲染，引起性能问题
    "react/jsx-no-bind": [2,
      {
        // 忽略原生 DOM 元素的 handler 操作
        "ignoreDOMComponents": true,
        // 忽略 `ref`，如：`<div ref={e => this.foo(e)}`
        "ignoreRefs": true,
        // 允许绑定箭头函数，如：`<div onClick={e => this.foo(e)}`
        "allowArrowFunctions": false,
        // 允许绑定函数，如：`<div onClick={function foo () {}}`
        "allowFunctions": false,
        // 允许函数 bind，如：`<div onClick={this.foo.bind(this)}`
        "allowBind": false,
      },
    ],

    // 检查 `//` 和 `/*` 不允许出现在 JSX 的文本中，否则会让人不知道这是个注释，还是希望输出的字符串
    // 如果需要使用它，一定要使用 JS 字符串形式
    // 此规则可以和 react/jsx-no-literals, react/jsx-no-comment-textnodes 相互参考
    "react/jsx-no-comment-textnodes": 2,

    // 不允许有重复的 prop
    "react/jsx-no-duplicate-props": [2,
      {
        // 属性是否忽略大小写
        "ignoreCase": true,
      },
    ],

    // 不允许在 JSX 中使用字符字面量
    // 此规则可以和 react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes 相互参考
    "react/jsx-no-literals": [0,
      {
        // 不允许使用纯字符串作为子元素，无论是字面量，还是包裹在 JS 字符串中
        "noStrings": false,
      },
    ],

    // 不允许跳转到绝对路径的 `<a>` 标签使用 `target="_blank"`，即 `href` 值跳相对路径不会检查
    // 如确实需要使用，请添加 `rel="noopener noreferrer"`，否则会有安全隐患，可参考 https://mathiasbynens.github.io/rel-noopener
    "react/jsx-no-target-blank": [2,
      {
        // 如果 href 属性是变量，是否做检查
        // always: 检查，不允许变量形式的链接添加 `target="_blank"`
        // never: 不检查变量属性
        "enforceDynamicLinks": "always",
      },
    ],

    // 不允许使用未定义的变量
    "react/jsx-no-undef": [2,
      {
        // 是否忽略全局作用域下的检查
        "allowGlobals": false,
      },
    ],

    // 一行只能有一条表达式，包括 JSX 标签
    "react/jsx-one-expression-per-line": [0,
      // 允许哪种形式的多表达式
      // none: 不允许任意多表达式在同一行
      // literal: 允许标签内包含字面量，如 `<Foo>Hello</Foo>`
      // single-child: 允许标签内包含单一子元素，包括字面量、表达式或其他元素，如 `<Foo>{'Hello'}</Foo>` 或 `<Foo><Bar /></Foo>`
      {
        "allow": "single-child",
      },
    ],

    // 校验某些可能并不需要的大括号的情况，如 `<div>{'Foo'}</div>`
    // 此规则可以和 react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes 相互参考
    "react/jsx-curly-brace-presence": [2,
      // always: 哪怕是简单字符串，也需要有大括号包裹
      // never: 如果是简单字符串，则不能有大括号包裹
      // ignore: 忽略此检测
      // 可以用一个字符串来定义所有情况，如：
      "never",
      // 也可以像下边这样用对象分别定义在属性与子元素中的情况
      // {
      //   // 在属性中是否用大括号，如：`<div foo={'bar'}>`
      //   "props": "never",
      //   // 在子元素中是否用大括号，如：`<div>{'bar'}</div>`
      //   "children": "never",
      // },
    ],

    // 在定义一段 fragment 时，使用 `<React.Fragment>` 还是 `<>`
    "react/jsx-fragments": [2,
      // syntax: 使用 `<><Foo /></>` 方式
      // element: 使用 `<React.Fragment><Foo /></React.Fragment>` 方式
      "syntax",
    ],

    // 使用 Pascal（大驼峰）方案来定义组件名
    "react/jsx-pascal-case": [2,
      {
        // 是否允许所有字母全大写
        "allowAllCaps": true,
        // 哪些名称忽略此检测
        "ignore": [],
      },
    ],

    // 不允许在 JSX 标签的属性之间包含多个空格，如 `<foo  bar   baz />`
    "react/jsx-props-no-multi-spaces": 2,

    // 是否允许在 JSX 标签上定义对象展开操作，如 `<Foo {...props} />`
    // 使用对象展开符，会传入无法预期的属性，但高阶函数却常依赖这个方案
    "react/jsx-props-no-spreading": [1,
      {
        // 分别指定 HTML 标签和自定义标签的行为
        // ignore：忽略检测，可以使用对象展开符
        // enforce：限制不允许使用对象展开符，要啥传啥
        "html": "enforce",
        "custom": "enforce",
        // 例外，写对应的标签名
        // "exceptions": [],
      },
    ],

    // 默认属性是否要排序
    // 包括 getDefaultProps(), defaultProps, propTypes 等相关方法、属性中的定义
    "react/jsx-sort-default-props": [0,
      {
        // 是否忽略大小写
        "ignoreCase": true,
      },
    ],

    // 属性是否要进行排序
    "react/jsx-sort-props": [2,
      {
        // 值为函数的属性放在最后，权重高于 shorthandLast
        "callbacksLast": true,
        // 只有属性名无属性值的属性放在最前，所有此类属性之间按照下边的配置来决定是否还要按照字母排序
        "shorthandFirst": true,
        // 只有属性名无属性值的属性放在最后，权重低于 callbacksLast
        "shorthandLast": false,
        // 忽略大小写
        "ignoreCase": true,
        // 是否按照字母排序
        "noSortAlphabetically": false,
        // React 自带的属性是否要放在最前，如 `key`, `ref` 等
        "reservedFirst": true,
      },
    ],

    // 该规则已被废弃，改为在 react/jsx-tag-spacing 中的 beforeSelfClosing 进行配置
    // "react/jsx-space-before-closing": 2,

    // 检测标签中的空格
    "react/jsx-tag-spacing": [2,
      // 对于下边的每一项，共有四种配置
      // "always", "never", "allow-multiline" or "allow"
      // always: 总是要有空格
      // never: 不要有空格
      // allow: 不检查此设置（吐槽：这个关键字和不检测没半毛钱关系呀...）
      // allow-multiline: 仅在 afterOpening 设置中有效，与 never 类似，但当标签占据多行时不检测
      {
        // 在结束标签中，斜线与相邻的尖括号之间是否要有空格
        // 对于非自闭合标签，表示 `/` 与 `<` 之间，如：`< /div>`
        // 对于自闭合标签，表示 `/` 与 '>' 之间，如：`<br/ >`
        "closingSlash": "never",
        // 自闭合标签，斜线之前的位置是否要有空格，如：`<br />`
        "beforeSelfClosing": "always",
        // 在开始标签的开头，`<` 与标签名之间是否要有空格，一个比较奇怪的设定，具体的 Case 可以参考官方文档：https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
        "afterOpening": "never",
        // 在闭合标签结尾括号前，是否可加空格，如：`</div >`
        "beforeClosing": "never",
      },
    ],

    // 检测 React 是否被非正常引用，因为只有 JSX 语法的文件中，才需要引用 React
    "react/jsx-uses-react": 2,

    // 检测 JSX 定义的模块是否未被使用
    // 因为从 ESLint 从 0.17.0 开始，不再校验 JSX 的语义正确性：https://eslint.org/blog/2015/03/eslint-0.17.0-released#changes-to-jsxreact-handling
    "react/jsx-uses-vars": 2,

    // 当定义多行的 JSX 时，是否要用小括号包裹
    "react/jsx-wrap-multilines": [2,
      // 对于下边的每一项，有三种配置
      // parens: 用括号包裹
      // parens-new-line: 不但要括号包裹，而且 JSX 需要新起一行，与括号不同行
      // ignore: 忽略检测
      {
        // 定义时是否需要包裹
        "declaration": "parens-new-line",
        // 重新赋值时
        "assignment": "parens-new-line",
        // 跟在 `return` 后时
        "return": "parens-new-line",
        // 在箭头函数体时
        "arrow": "parens-new-line",
        // 在三元表达式里边时
        "condition": "ignore",
        // 在逻辑表达式里时
        "logical": "ignore",
        // 在属性中时
        "prop": "ignore",
      },
    ],
  },
}
