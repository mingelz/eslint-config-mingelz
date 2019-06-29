/**
 * @file Vue 相关配置
 * @desc 此配置依赖 ESLint 插件: eslint-plugin-vue@5.0
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

    // 因为 Vue / Vuex 是双向数据绑定，经常会对数据或参数做更新，所以关闭此检测
    "no-param-reassign": 0,

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

    // 自定义组件标签名使用的风格，如 `<my-component />` 还是 `<MyComponent />`
    "vue/component-name-in-template-casing": [2,
      // PascalCase: 大驼峰
      // kebab-case: 连字符形式
      "kebab-case",
      {
        // 要忽略的标签名
        "ignores": [],
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
          // 定义 (提供组件的选项)，如 `is`
          "DEFINITION",
          // 列表渲染 (创建多个变化的相同元素)，如 `v-for`
          "LIST_RENDERING",
          // 条件渲染 (元素是否渲染/显示)，如 `v-if`, `v-else-if`, `v-else`, `v-show`, `v-cloak`
          "CONDITIONALS",
          // 渲染方式 (改变元素的渲染方式)，如 `v-once`, `v-pre`
          "RENDER_MODIFIERS",
          // 全局感知 (跨组件的感知属性)，如 `id`
          "GLOBAL",
          // 唯一特性 (需要唯一值的特性)，如 `ref`, `key`, `slot`, `slot-scope`
          "UNIQUE",
          // 双向绑定 (把绑定和事件结合起来)，如 `v-model`
          "BINDING",
          // 其它特性 (所有普通的绑定或未绑定的特性)
          "OTHER_ATTR",
          // 事件 (组件事件监听器)，如 `v-on`
          "EVENTS",
          // 内容 (复写元素的内容)，如 `v-html`, `v-text`
          "CONTENT",
        ],
      },
    ],

    // 不允许使用 `v-html`，因为这可能会带来 XSS 漏洞
    "vue/no-v-html": 1,

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
  },
}
