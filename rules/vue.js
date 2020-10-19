/**
 * @file Vue 相关配置
 * @description 此配置依赖 ESLint 插件: eslint-plugin-vue@6.2
 * @see [eslint-plugin-vue]{@link https://github.com/vuejs/eslint-plugin-vue}
 * @see 另强烈建议参阅 [Vue 官方的风格指南文档]{@link https://cn.vuejs.org/v2/style-guide}
 */

module.exports = {
  "plugins": [
    "vue",
  ],

  // eslint-plugin-vue 依赖 vue-eslint-parser 来解析 <template> 中的内容
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
  },

  "rules": {
    /**
     * ESLint: 一些 ESLint 规则要针对 Vue 环境做些适配
     */

    // 因为 Vue / Vuex 是双向数据绑定，经常会对数据或参数做更新，所以更新 ESLint相关规则
    "no-param-reassign": [2,
      {
        "props": false,
      },
    ],

    /**
     * Vue: Base (Enabling Correct ESLint Parsing)
     */

    // 允许在 <template> 中使用 eslint-disable, eslint-enable, eslint-disable-line, eslint-disable-next-line 等指令
    // 如可以用 `<!-- eslint-disable-next-line vue/max-attributes-per-line -->` 来控制某一行的规则
    "vue/comment-directive": 2,

    // 在 jsx 中不允许使用未定义的变量
    "vue/jsx-uses-vars": 2,

    /**
     * Vue: Priority A: Essential (Error Prevention)
     */

    // 不允许在 `computed` 中使用异步方法，如果确实有需求，请使用此插件：https://github.com/foxbenjaminfox/vue-async-computed
    "vue/no-async-in-computed-properties": 2,

    // 在 `props`, `computed`, `methods` 中存在的 key 不允许重复
    "vue/no-dupe-keys": [2,
      // 除了 Vue 支持的 `computed`, `methods` ...，还在哪些 key 下去搜索重复的 key
      // "groups": []
    ],

    // 避免重复定义属性，如：`<div foo="bar" :foo="baz"></div>`
    "vue/no-duplicate-attributes": [2,
      {
        // 允许 class 两种形式共存
        "allowCoexistClass": true,
        // 允许 style 两种形式共存
        "allowCoexistStyle": true,
      },
    ],

    // 忽略解析 <template> 时的语法报错
    "vue/no-parsing-error": [2,
      // 配置项非常多，主要与 HTML 相关，默认都是 false，即不忽略报错
      {
        "abrupt-closing-of-empty-comment": false,
        "absence-of-digits-in-numeric-character-reference": false,
        "cdata-in-html-content": false,
        "character-reference-outside-unicode-range": false,
        "control-character-in-input-stream": false,
        "control-character-reference": false,
        "eof-before-tag-name": false,
        "eof-in-cdata": false,
        "eof-in-comment": false,
        "eof-in-tag": false,
        "incorrectly-closed-comment": false,
        "incorrectly-opened-comment": false,
        "invalid-first-character-of-tag-name": false,
        "missing-attribute-value": false,
        "missing-end-tag-name": false,
        "missing-semicolon-after-character-reference": false,
        "missing-whitespace-between-attributes": false,
        "nested-comment": false,
        "noncharacter-character-reference": false,
        "noncharacter-in-input-stream": false,
        "null-character-reference": false,
        "surrogate-character-reference": false,
        "surrogate-in-input-stream": false,
        "unexpected-character-in-attribute-name": false,
        "unexpected-character-in-unquoted-attribute-value": false,
        "unexpected-equals-sign-before-attribute-name": false,
        "unexpected-null-character": false,
        "unexpected-question-mark-instead-of-tag-name": false,
        "unexpected-solidus-in-tag": false,
        "unknown-named-character-reference": false,
        "end-tag-with-attributes": false,
        "duplicate-attribute": false,
        "end-tag-with-trailing-solidus": false,
        "non-void-html-element-start-tag-with-trailing-solidus": false,
        "x-invalid-end-tag": false,
        "x-invalid-namespace": false,
      },
    ],

    // 不允许覆盖掉 Vue 内部的方法/属性，比如 `$el`, `$on`, `$nextTick` ...
    "vue/no-reserved-keys": [2,
      // {
      //   // 除了默认的 Vue 方法/属性外，其他不允许被覆盖的 key
      //   "reserved": [],
      //   // 除了默认的 group 外，其他要检查的 key
      //   "groups": [],
      // },
    ],

    // 不允许可共享的 `data` 字段，即 `data` 字段只能是函数，不能是对象
    "vue/no-shared-component-data": 2,

    // 不允许在 `computed` 中有无意义的修改，如：`this.foo = 'bar'; return baz`
    "vue/no-side-effects-in-computed-properties": 2,

    // 不允许在 `<template>` 标签上加 `key`，如：`<template key="foo">`，其他标签是可以的
    "vue/no-template-key": 2,

    // 不允许在 `<textarea>` 标签间使用 mustache 语法，如 `<textarea>{{ foo }}</textarea>`
    // 因为它会不生效，请使用 `v-model`，如：`<textarea v-model="foo"`></textarea>`
    "vue/no-textarea-mustache": 2,

    // 不允许未使用的 component
    "vue/no-unused-components": [2,
      {
        // 是否忽略使用 `<component is>` 形式定义的组件
        "ignoreWhenBindingPresent": true,
      },
    ],

    // 不允许未被定义的变量，主要是指在 <template> 中定义的项，如 `<div v-for="i in foo">{{ bar }}</div>`
    "vue/no-unused-vars": 2,

    // 不允许 `v-if` 和 `v-for` 在同一个标签上（如果在同一个标签，`v-for` 的优先级会更高一些）
    // 两个混用有两种情况：
    // 1. `<div v-if="item.show" v-for="item in list">`，if 判断基于每一个循环项
    // 2. `<div v-if="foo" v-for="item in list">`，if 判断基于其他变量，此种情况是要避免的，空耗循环
    "vue/no-use-v-if-with-v-for": [2,
      {
        // 如果 `v-if` 中使用了 `v-for` 循环后的变量，则允许
        "allowUsingIterationVar": true,
      },
    ],

    // 在 `<component>` 上要求有 `v-bind:is`
    "vue/require-component-is": 2,

    // 在 `props` 中的类型，应该是构建函数而不是字符串，如 `type: Number` 而不是 `type: 'Number'`
    "vue/require-prop-type-constructor": 2,

    // `render` 方法一定要有返回值
    "vue/require-render-return": 2,

    // 每个 `v-for` 元素都要绑定 key，如 `<div v-for="foo in bar" :key="for"></div>`
    // 不太理解这个细节和 "vue/valid-v-for" 的区别
    "vue/require-v-for-key": 2,

    // 校验 props 中指定的属性类型与默认值，
    // 且如果属性类型为 Array, Object，要求默认值是函数形式，保证数据不会共享，
    // 可参考 "vue/no-shared-component-data"
    "vue/require-valid-default-prop": 2,

    // 在 `computed` 中的每个 getter 都要有明确的返回值
    "vue/return-in-computed-property": [2,
      {
        // 不允许有隐式的 undefined 返回，即不能只写 `return;`，`return` 后一定要有值
        "treatUndefinedAsUnspecified": true,
      },
    ],

    // 如果组件已经绑定了一个包含修饰符的 `v-on`，则要求另一个使用 `exact` 修饰符
    "vue/use-v-on-exact": 2,

    // 检查在 `<template>` 下只有一个根元素
    // 要求：根元素只能是标签，不能为空，不能是纯文本，不能使用 `v-for`，不能是 `<template>` 或 `<slot>`
    // 额外的，支持使用 `v-if` 放多个元素在 `<template>`下，如：
    // ```
    // <template>
    //   <div v-if="foo"></div>
    //   <div v-else></div>
    // </template>
    // ```
    "vue/valid-template-root": 2,

    // 检查 `v-bind` 的正确性
    // 1. 不能有无效的修饰符，如：`<div v-bind.foo="bar"></div>`
    // 2. 值不能为空，如：`<div v-bind></div>`
    "vue/valid-v-bind": 2,

    // 检查 `v-clock` 的正确性
    // 1. 不能有参数，如：`<div v-cloak:foo></div>`
    // 2. 不能有修饰符，如：`<div v-cloak.foo></div>`
    // 3. 不能有值，如：`<div v-cloak="foo"></div>`
    "vue/valid-v-cloak": 2,

    // 检查 `v-else-if` 的正确性
    // 1. 不能有参数，如：`<div v-else-if:foo></div>`
    // 2. 不能有修饰符，如：`<div v-else-if.foo></div>`
    // 3. 值不能为空，如：`<div v-else-if></div>`
    // 4. 前边要有 `v-if` 或 `v-else`
    // 5. 不能和 `v-if` 或 `v-else` 在同一个标签上
    "vue/valid-v-else-if": 2,

    // 检查 `v-else` 的正确性
    // 1. 不能有参数，如：`<div v-else:foo></div>`
    // 2. 不能有修饰符，如：`<div v-else.foo></div>`
    // 3. 值不能为空，如：`<div v-else></div>`
    // 4. 前边要有 `v-if` 或 `v-else-if`
    // 5. 不能和 `v-if` 或 `v-else-if` 在同一个标签上
    "vue/valid-v-else": 2,

    // 检查 `v-for` 的正确性
    // 1. 不能有参数，如：`<div v-for:foo></div>`
    // 2. 不能有修饰符，如：`<div v-for.foo></div>`
    // 3. 值不能为空，如：`<div v-for></div>`
    // 4. 如果是自定义组件要有 `v-bind:key`，且 `v-bind:key` 只能使用在 `v-for` 中定义的变量（保证每个都不相同）
    "vue/valid-v-for": 2,

    // 检查 `v-html` 的正确性
    // 1. 不能有参数，如：`<div v-html:foo></div>`
    // 2. 不能有修饰符，如：`<div v-html.foo></div>`
    // 3. 值不能为空，如：`<div v-html></div>`
    "vue/valid-v-html": 2,

    // 检查 `v-if` 的正确性
    // 1. 不能有参数，如：`<div v-if:foo></div>`
    // 2. 不能有修饰符，如：`<div v-if.foo></div>`
    // 3. 值不能为空，如：`<div v-if></div>`
    // 4. 不能和 `v-else` 或 `v-else` 在同一个标签上
    "vue/valid-v-if": 2,

    // 检查 `v-model` 的正确性
    // 1. 不能有参数，如：`<input v-model:foo="bar">`
    // 2. 不能加无效的修饰符，如：`<input v-model.foo="bar">`
    // 3. 值不能为空，如：`<input v-model>`
    // 4. 值有无效的左表达式（LHS, left-hand side），如：`<input v-model="foo() + bar()">`
    // 5. 只能应用在表单元素上，如：`<div v-model="foo"></div>`
    // 6. 不能绑定在动态 type 的 input 元素上，如：`<input :type="type" v-model="foo">`
    // 7. 不能绑定在 type 为 file 的 input 元素上，如：`<input type="file" v-model="foo">`
    // 8. 值不能为迭代变量，如：`<div v-for="x in list"><input type="file" v-model="x"></div>`
    "vue/valid-v-model": 2,

    // 检查 `v-on` 的正确性
    // 1. 不能没有事件名（参数），如：`<div v-on="foo"></div>`
    // 2. 不能加无效的修饰符，如：`<div v-on:click.foo="bar"></div>`
    // 3. 值不能为空，且无修饰符，如：`<div v-on:click></div>`
    // 注意，是可以像这样使用的：`<div @click.prevent></div>`
    "vue/valid-v-on": [2,
      {
        // 允许的修饰符，以字符串形式放在数组中，如 `["foo"]` 则表示可以使用 `@click.foo`
        "modifiers": [],
      },
    ],

    // 检查 `v-once` 的正确性
    // 1. 不能有参数，如：`<div v-once:foo></div>`
    // 2. 不能有修饰符，如：`<div v-once.foo></div>`
    // 3. 不能有值，如：`<div v-once="foo"></div>`
    "vue/valid-v-once": 2,

    // 检查 `v-pre` 的正确性
    // 1. 不能有参数，如：`<div v-pre:foo></div>`
    // 2. 不能有修饰符，如：`<div v-pre.foo></div>`
    // 3. 不能有值，如：`<div v-pre="foo"></div>`
    "vue/valid-v-pre": 2,

    // 检查 `v-show` 的正确性
    // 1. 不能有参数，如：`<div v-show:foo></div>`
    // 2. 不能有修饰符，如：`<div v-show.foo></div>`
    // 3. 值不能为空，如：`<div v-show></div>`
    "vue/valid-v-show": 2,

    // 检查 `v-text` 的正确性
    // 1. 不能有参数，如：`<div v-text:foo></div>`
    // 2. 不能有修饰符，如：`<div v-text.foo></div>`
    // 3. 值不能为空，如：`<div v-text></div>`
    "vue/valid-v-text": 2,

    /**
     * Vue: Priority B: Strongly Recommended (Improving Readability)
     */

    // 模板属性使用连字符（减号），还是使用小驼峰形式
    "vue/attribute-hyphenation": [2,
      // always: 使用连字符，并统一使用小写
      // never: 使用小驼峰形式
      "always",
      {
        // 需要忽略检测的属性
        "ignore": [],
      },
    ],

    // HTML 标签的闭合尖括号是否要展示在新行
    "vue/html-closing-bracket-newline": [2,
      // never: 不要新起一行
      // always: 总是新起一行
      {
        // 单行的 html 标签闭合括号是否要新起一行
        "singleline": "never",
        // 多行的 html 标签闭合括号是否要新起一行
        "multiline": "always",
      },
    ],

    // HTML 标签的尖括号与标签内容之间是否要空格
    "vue/html-closing-bracket-spacing": [2,
      // never: 不要加空格
      // always: 要加空格
      {
        // 针对开始标签的规则
        "startTag": "never",
        // 针对结束标签的规则
        "endTag": "never",
        // 针对自闭合标签的规则，在 `/>` 前是否要加空格
        "selfClosingTag": "always",
      },
    ],

    // 校验结束标签：对于自闭合标签不允许使用结束标签，其他标签要求必须有结束标签
    // NOTE: 此规则与 vue/html-self-closing 略有重叠，暂关闭检测
    "vue/html-end-tags": 0,

    // 检查 HTML 元素的缩进
    "vue/html-indent": [2,
      // 数字：每个缩进的空格数
      // "tab"：使用 Tab 缩进
      2,
      {
        // 多个属性是否要垂直对齐
        "alignAttributesVertically": false,
        // 属性的缩进
        "attribute": 1,
        // 基础缩进
        "baseIndent": 1,
        // 结束符的缩进
        "closeBracket": 0,
        // 要忽略的节点
        "ignores": [],
      },
    ],

    // 校验 HTML 属性值的引号
    "vue/html-quotes": [2,
      // double: 双引号
      // single: 单引号
      "double",
      {
        // 当字符串中正好有引号时，可以使用另一个引号包裹，这样可以避免写转义字符
        "avoidEscape": true,
      },
    ],

    // 标签的自闭合
    // 自闭合指的 `<br />`，一定要有后边的 `/` 才算
    "vue/html-self-closing": [2,
      // never: 不自闭合
      // always: 总是自闭合
      // any: 都可以
      {
        // HTML 标签
        "html": {
          // 标准的 HTML 标签
          "normal": "never",
          // 空白标签（标准的自闭合标签，如 `<br>`）
          "void": "never",
          // 自定义组件
          "component": "always",
        },
        // SVG 标签
        "svg": "always",
        // MathML 标签
        "math": "always",
      },
    ],

    // 一行最多多少个属性
    "vue/max-attributes-per-line": [2,
      {
        // 针对单行标签，最多支持多少个属性，再多要换行
        "singleline": 5,
        // 针对多行标签
        "multiline": {
          // 多行标签最多每行多少个属性
          "max": 1,
          // 与属性名同行的标签是否独立算一行
          "allowFirstLine": false,
        },
      },
    ],

    // 针对多行元素，是否要求子元素折行。可参考 singleline-html-element-content-newline 规则
    // 多行元素，是指标签占据了多行，如某些属性另起一行、内容另起一行、内容包含多行、结束标签另起一行等
    // 因为行内元素可能会有属性换行，但不希望内容换行的情况，所以暂关闭此检测
    "vue/multiline-html-element-content-newline": [0,
      {
        // 忽略无子元素的标签
        "ignoreWhenEmpty": true,
        // 要忽略的标签
        "ignores": ["pre", "textarea"],
      },
    ],

    // 在 mustache 中定义值与括号间是否要空格
    "vue/mustache-interpolation-spacing": [2,
      // always: 在大括号内部左右各加一个空格
      // never: 在大括号内部左右不加空格
      "always",
    ],

    // 组件 `name` 值的风格
    "vue/name-property-casing": [2,
      // camelCase: 小驼峰
      // PascalCase: 大驼峰
      // kebab-case: 连字符形式
      "PascalCase",
    ],

    // 检查标签中是否有多余的空格
    "vue/no-multi-spaces": [2,
      {
        // 是否忽略对象属性中的空格（属性名与冒号之间）
        "ignoreProperties": false,
      },
    ],

    // 在模板中，属性的等号左右不应有空格
    "vue/no-spaces-around-equal-signs-in-attribute": 2,

    // 不允许在模板嵌套环境中使用同名变量，如： `<div v-for="i in 5"><span v-for="i in 10" /></div>`
    // 同时也会检测在模板中定义了 data/props 上的变量，如： `<template><div v-for="i in 5"></div></template><script>export default { props: ['i'] }</script>`
    "vue/no-template-shadow": 2,

    // Prop 名大小写，这里指的是在 <script> 中的情形
    // 参考：https://vuejs.org/v2/style-guide/#Prop-name-casing-strongly-recommended
    "vue/prop-name-casing": [2,
      // 可以使用 `camelCase` 或 `snake_case`
      "camelCase",
    ],

    // 要求每个 props 要有默认值
    "vue/require-default-prop": 2,

    // 要求每个 props 要有类型
    "vue/require-prop-types": 2,

    // 针对单行元素，是否要求子元素折行。可参考 multiline-html-element-content-newline 规则
    // 单行元素，是指标签起始、属性、内容、结束标签都在同一行
    "vue/singleline-html-element-content-newline": [0,
      {
        // 忽略无子元素的标签
        "ignoreWhenEmpty": true,
        // 忽略无属性的标签
        "ignoreWhenNoAttributes": true,
        // 要忽略的标签
        "ignores": ["pre", "textarea"],
      },
    ],

    // 针对 `v-bind` 建议使用的方案
    "vue/v-bind-style": [2,
      // shorthand: 缩短方案，如：`<div :foo="bar"></div>`
      // longform: 详细方案，如：`<div v-bind:foo="bar"></div>`
      "shorthand",
    ],

    // 针对 `v-on` 建议使用的方案
    "vue/v-on-style": [2,
      // shorthand: 缩短方案，如：`<div @foo="bar"></div>`
      // longform: 详细方案，如：`<div v-on:foo="bar"></div>`
      "shorthand",
    ],

    /**
     * Vue: Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
     */

    // HTML 中属性的顺序
    // 参考：https://vuejs.org/v2/style-guide/#Element-attribute-order-recommended
    "vue/attributes-order": [2,
      {
        // 定义具体的顺序
        "order": [
          // 定义 (提供组件的选项)，包括 `is`
          "DEFINITION",
          // 列表渲染 (创建多个变化的相同元素)，包括 `v-for`
          "LIST_RENDERING",
          // 条件渲染 (元素是否渲染/显示)，包括 `v-if`, `v-else-if`, `v-else`, `v-show`, `v-cloak`
          "CONDITIONALS",
          // 渲染方式 (改变元素的渲染方式)，包括 `v-once`, `v-pre`
          "RENDER_MODIFIERS",
          // 全局感知 (跨组件的感知属性)，包括 `id`
          "GLOBAL",
          // 唯一特性 (需要唯一值的特性)，包括 `ref`, `key`, `v-slot`, `slot`
          "UNIQUE",
          // 双向绑定 (把绑定和事件结合起来)，包括 `v-model`
          "TWO_WAY_BINDING",
          // 自定义绑定，如 `v-custom-directive`
          "OTHER_DIRECTIVES",
          // 其它特性 (所有普通的绑定或未绑定的特性)，如 `custom-prop`, `v-bind:prop`, `:prop`
          "OTHER_ATTR",
          // 事件 (组件事件监听器)，包括 `v-on`, 及对应缩写 `@`
          "EVENTS",
          // 内容 (复写元素的内容)，包括 `v-html`, `v-text`
          "CONTENT",
        ],
        // 是否先根据字母排序后，再按照 order 定义的顺序二次排序
        "alphabetical": false,
      },
    ],

    // 不允许使用 `v-html`，因为这可能会带来 XSS 漏洞
    "vue/no-v-html": 2,

    // 在组件中针对每个 key （如 data, computed ...）排序
    "vue/order-in-components": [0,
      {
        // 每个 key 的排序
        "order": [
          // 数组表示这几个 key 的权重是相同的
          ["name", "delimiters", "functional", "model"],
          ["components", "directives", "filters"],
          ["parent", "mixins", "extends", "provide", "inject"],
          "el",
          "template",
          "props",
          "propsData",
          "data",
          "computed",
          "watch",
          "LIFECYCLE_HOOKS",
          "methods",
          "render",
          "renderError",
        ],
      },
    ],

    // 在 <template> 中不允许使用 `this`，默认环境就已经是 this 了
    "vue/this-in-template": [2,
      // always: 总是给模板变量加 this 前缀
      // never: 从不在模板变量前加 this
      "never",
    ],

    /**
     * Vue: Uncategorized
     */

    // 检查数组中括号前后是否要加空格
    // 此配置与 ESLint 的 array-bracket-spacing 规则一致，但它会检查 `<template>` 中的代码
    "vue/array-bracket-spacing": [2,
      "never",
    ],

    // 箭头函数的箭头前后是否要有空格
    // 此配置与 ESLint 的 array-spacing 规则一致，但它会检查 `<template>` 中的代码
    "vue/arrow-spacing": [2,
      {
        "before": true,
        "after": true,
      },
    ],

    // 代码块前后是否要有空格
    // 此配置与 ESLint 的 block-spacing 规则一致，但它会检查 `<template>` 中的代码
    "vue/block-spacing": [2,
      "always",
    ],

    // 大括号的风格
    // 此配置与 ESLint 的 brace-style 规则一致，但它会检查 `<template>` 中的代码
    "vue/brace-style": [2,
      "stroustrup",
      {
        "allowSingleLine": true,
      },
    ],

    // 使用驼峰形式表示变量时，一些细节配置
    // 此配置与 ESLint 的 camelcase 规则一致，但它会检查 `<template>` 中的代码
    "vue/camelcase": [2,
      {
        "properties": "never",
        "ignoreDestructuring": false,
      },
    ],

    // 对象和数组最后一个 value 后是否加逗号
    // 此配置与 ESLint 的 comma-dangle 规则一致，但它会检查 `<template>` 中的代码
    "vue/comma-dangle": [2,
      "always-multiline",
    ],

    // 自定义组件 `name` 标签拼写风格
    "vue/component-definition-name-casing": [2,
      // PascalCase: 大驼峰
      // kebab-case: 连字符形式
      "PascalCase",
    ],

    // 自定义组件标签名使用的风格，如 `<my-component />` 还是 `<MyComponent />`
    "vue/component-name-in-template-casing": [2,
      // PascalCase: 大驼峰
      // kebab-case: 连字符形式
      "kebab-case",
      {
        // 只检查在 components 中注册的组件
        "registeredComponentsOnly": true,
        // 要忽略的标签名
        "ignores": [],
      },
    ],

    // 自定义组件三大标签的排序
    "vue/component-tags-order": [2,
      // Vue 支持 `<docs>` 标签，用来记录当前组件的文档信息
      {
        "order": ["docs", "template", "script", "style"],
      },
    ],

    // 有换行时 `.` 操作符的位置
    // 此配置与 ESLint 的 dot-location 规则一致，但它会检查 `<template>` 中的代码
    "vue/dot-location": [2,
      // object: 跟在 object 后
      // property: 在 property 前
      "property",
    ],

    // 使用 `===`
    // 此配置与 ESLint 的 eqeqeq 规则一致，但它会检查 `<template>` 中的代码
    "vue/eqeqeq": [2,
      "smart",
    ],

    // 在对象的冒号前后是否要有空格
    // 此配置与 ESLint 的 key-spacing 规则一致，但它会检查 `<template>` 中的代码
    "vue/key-spacing": [2,
      {
        // mode 定义空格风格，strict 为仅允许一个空格， minimum 为可因为对齐的原因多加几个空格，但对齐后，不能再多空格
        "mode": "strict",
        // 在冒号前后是否要空格
        "beforeColon": false,
        "afterColon": true,
      },
    ],

    // 关键字前后的空格检查，如 `return{foo: 1}` 是合法的
    // 此配置与 ESLint 的 keyword-spacing 规则一致，但它会检查 `<template>` 中的代码
    "vue/keyword-spacing": [2,
      {
        // 关键字前后的空格
        "before": true,
        "after": true,
        // 以关键字为 key 的例外定义
        // "overrides": {
        //   "function": {
        //     "before": false,
        //   },
        // },
      },
    ],

    // 检查组件在代码中定义的名称，是否与文件名一致
    "vue/match-component-file-name": [1,
      {
        // 可忽略的文件扩展名
        "extensions": ["js", "vue", "jsx"],
        // 是否要求匹配大小写
        "shouldMatchCase": false,
      },
    ],

    // 每行的最大长度，太长了建议多换些行
    // 此配置与 ESLint 的 max-len 规则一致，但它会检查 `.vue` 文件中的代码
    "vue/max-len": [1,
      {
        // 每行代码的长度阀值
        "code": 100,
        // `<template>` 标签中每行代码的长度阀值，默认和 code 相同。如果不同，则 code 仅应用于 `<script>`, `<style>` 标签
        // "template": 100,
        // 一个 tab 算几个字符，注意这里指的是 tab 字符，而不是缩进对应的空格数
        "tabWidth": 2,
        // 注释最长多少个字符，默认和 code 相同
        // "comments": 120,
        // 是否忽略注释
        "ignoreComments": true,
        // 是否忽略因为结尾注释才超过限定长度
        "ignoreTrailingComments": true,
        // 是否忽略 URL
        "ignoreUrls": true,
        // 是否忽略字符串
        "ignoreStrings": true,
        // 是否忽略模板字符串
        "ignoreTemplateLiterals": true,
        // 是否忽略正则表达式字面量
        "ignoreRegExpLiterals": true,
        // 其他要忽略的匹配，内容为正则字符串
        // "ignorePattern": "",
        // 是否忽略 HTML 属性值
        "ignoreHTMLAttributeValues": true,
        // 是否忽略 HTML 文本内容
        "ignoreHTMLTextContents": true,
      },
    ],

    // 对于布尔型的属性，要求默认值必须为 false，因为默认不传时 undefined 为 falsy 值，且 Vue 会为布尔属性设置默认值为 false
    "vue/no-boolean-default": [2,
      // "no-default": 不允许添加 default
      // "default-false": 可以不添加 default 字段，如果添加则必须为 false
      "default-false",
    ],

    // 不允许使用已在 Vue@2.5.0+ 中被废弃的 `scope` 属性，应该用 `v-slot`
    "vue/no-deprecated-scope-attribute": 2,

    // 不允许使用已在 Vue@2.6.0+ 中被废弃的 `slot` 属性，应该用 `v-slot`
    "vue/no-deprecated-slot-attribute": 2,

    // 不允许使用已在 Vue@2.6.0+ 中被废弃的 `slot-scope` 属性，应该用 `v-slot`
    "vue/no-deprecated-slot-scope-attribute": 2,

    // 不允许空解构模式
    // 出现这种情况多是因为打算写默认值，把 `=` 不小心写成了 `:`，如 `var {foo: {}} = bar` 为空解构，而 `var {foo = {}} = bar` 是设置默认值
    // 此配置与 ESLint 的 no-empty-pattern 规则一致，但它会检查 `<template>` 中的代码
    "vue/no-empty-pattern": 2,

    // 不允许普通空格和制表符外的其他非常规空格，如零宽空格、换行符
    // 此配置与 ESLint 的 no-irregular-whitespace 规则一致，但它会检查 `.vue` 文件中的代码
    "vue/no-irregular-whitespace": [2,
      {
        // 是否忽略字符串中的字符检查
        "skipStrings": false,
        // 是否忽略注释中的字符检查
        "skipComments": false,
        // 是否忽略正则表达式中的字符检查
        "skipRegExps": false,
        // 是否忽略模板字符串的字符检查
        "skipTemplates": false,
        // 是否忽略 HTML 属性值的字符检查
        "skipHTMLAttributeValues": false,
        // 是否忽略 HTML 文本内容的字符检查
        "skipHTMLTextContents": false,
      },
    ],

    // 不允许自定义组件的 `name` 属性使用 HTML 标签名
    "vue/no-reserved-component-names": 2,

    // 不允许某些特殊语法，可以使用字符串表示限制的表达式，也可以使用对象自定义限制出错信息
    // 此配置与 ESLint 的 no-restricted-syntax 规则一致，但它会检查 `<template>` 中的代码
    "vue/no-restricted-syntax": [2,
      "WithStatement",
      // 额外支持 Vue 的 AST，详细见 https://github.com/mysticatea/vue-eslint-parser/blob/master/docs/ast.md
      // 如，不允许在 mustache 中嵌入方法调用：
      // "VElement > VExpressionContainer CallExpression",
    ],

    // 在 `style` 属性中禁止使用纯静态样式（应该写在 `<style>` 标签中）
    "vue/no-static-inline-styles": [2,
      {
        // 是否允许通过 `:style` 的方式写入纯静态的样式
        "allowBinding": false,
      },
    ],

    // 不允许使用仍不支持的特性（通过配置的 Vue 版本来判断）
    "vue/no-unsupported-features": [2,
      {
        // 当前依赖的 Vue 版本，支持 Semver
        "version": "^2.6.0",
        // 忽略以下特性判断
        // "ignores": [
        //   // Vue@2.6.0+
        //   "dynamic-directive-arguments",
        //   "v-slot",
        //   // Vue@2.5.0+
        //   "slot-scope-attribute",
        // ],
      },
    ],

    // 当整个对象在一行时，大括号前后是否要加空格
    // 此配置与 ESLint 的 object-curly-spacing 规则一致，但它会检查 `<template>` 中的代码
    "vue/object-curly-spacing": [2,
      "always",
      {
        "objectsInObjects": true,
        "arraysInObjects": true,
      },
    ],

    // 检查在 `.vue` 文件中，每个根元素 (`<template>`, `<script>`, `<style>`) 之间是否有空行隔开
    "vue/padding-line-between-blocks": [2,
      // always: 总要有空行
      // never: 不能有空行
      "always",
    ],

    // 检查 `<script>` 中的组件是直接 export 出去的，而不是多绕一层
    "vue/require-direct-export": 0,

    // 对于自定义组件要求有 `name` 属性（可用于递归和方便调试，平时用处不大）
    "vue/require-name-property": 0,

    // 在 .vue 文件中的 `<script>` 标签内的缩进配置，可以参考 stylistic-issues 中的 indent 规则
    "vue/script-indent": [2,
      // 此参数可为数字，表示缩进的空格数，或者使用 `tab` 表示使用 tab 来缩进
      2,
      {
        // 在 `<script>` 标签内的内容，初始为几个缩进
        "baseIndent": 0,
        // switch 中的 case, default 的缩进，感觉与 stylistic-issues/indent 规则有重合
        "switchCase": 1,
        // 要忽略的 AST node selector，同样可参考 stylistic-issues/indent 中的 ignoredNodes 规则
        "ignores": [],
      },
    ],

    // 对对象的 key 排序
    // 此配置与 ESLint 的 sort-keys 规则一致，但它不会校验 `<script>` 中根元素的排序（因为有另一个规则 order-in-components 在校验）
    "vue/sort-keys": [0,
      "asc",
      {
        "caseSensitive": true,
        "minKeys": 2,
        "natural": true,
        // 忽略以下属性的子属性
        "ignoreChildrenOf": ["model"],
        // 忽略以下属性的孙子属性
        "ignoreGrandchildrenOf": ["computed", "directives", "inject", "props", "watch"],
      },
    ],


    // 在中缀（二元、三元）操作符前后是否要有空格，如 +, -, *, /, >, <, =, ?:
    // 此配置与 ESLint 的 space-infix-ops 规则一致，但它会检查 `<template>` 中的代码
    "vue/space-infix-ops": [2,
      {
        "int32Hint": true,
      },
    ],

    // 一元操作符前后是否允许加空格
    // 此配置与 ESLint 的 space-unary-ops 规则一致，但它会检查 `<template>` 中的代码
    "vue/space-unary-ops": [2,
      {
        "words": true,
        "nonwords": false,
      },
    ],

    // 对于多个静态 className 是否要排序，如 `class="b a"` 应该重新排序为 `class="a b"`
    "vue/static-class-names-order": 0,

    // 在 `v-on` 后跟的方法名后，是否要加 `()`（Vue 会自动做调用，当无参数传递时不需要加括号）
    "vue/v-on-function-call": [2,
      // always: 总要跟括号
      // never: 除了需要参数，否则不允许放空的 `()`
      "never",
    ],

    // 确定 `v-slot` 的风格，是写完整的 `v-slot` 还是缩写 `#`
    "vue/v-slot-style": [2,
      // shorthand: 使用缩写
      // longform: 使用 v-slot.foo 方式
      // v-slot: 使用 v-slot 方式（因为只写 `v-slot` 比 `#default` 还要短）
      {
        // 在自定义标签的默认插槽上，使用哪种风格
        "atComponent": "v-slot",
        // 在 `<template>` 标签的默认插槽上，使用哪种风格
        "default": "shorthand",
        // 在 `<template>` 标签的具名插槽上，使用哪种风格
        "named": "shorthand",
      },
    ],

    // 校验 `v-bind` 上的 `.sync` 的正确性
    // 1. `.sync` 对应的值不能是表达式
    // 2. `.sync` 只能应用在自定义组件
    // 3. `.sync` 对应的值不能是从迭代器中获取
    "vue/valid-v-bind-sync": 2,

    // 校验 `v-slot` 的合法性
    // 规则很多，可以参考： https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-slot.md#book-rule-details
    // 或者参考官方文档： https://cn.vuejs.org/v2/guide/components-slots.html
    "vue/valid-v-slot": 2,
  },
}
