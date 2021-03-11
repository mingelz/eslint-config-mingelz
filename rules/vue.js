/**
 * @file Vue 相关配置
 * @description 此配置依赖 ESLint 插件: eslint-plugin-vue@7.7
 * @see [eslint-plugin-vue]{@link https://github.com/vuejs/eslint-plugin-vue}
 * @see 另强烈建议参阅 [Vue 官方的风格指南文档]{@link https://cn.vuejs.org/v2/style-guide}
 */

const { getDepVersion } = require("../lib/helper")
const { "rules": $bestPractices } = require("./best-practices")
const { "rules": $es6 } = require("./es6")
const { "rules": $possibleErrors } = require("./possible-errors")
const { "rules": $stylisticIssues } = require("./stylistic-issues")

// 获取项目依赖的 Vue 版本，因为 Vue@2 和 Vue@3 的 lint 规则不兼容
const vueVersion = getDepVersion("vue", true)
const isVue2 = vueVersion.major === 2
const isVue3 = vueVersion.major === 3
if (!isVue2 && !isVue3) {
  // eslint-disable-next-line no-console
  console.error("未查询到有效的 Vue 版本，所有针对 Vue 的分版本规则将不做检查")
}

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

    // 因为 Vue / Vuex 是双向数据绑定，经常会对数据或参数做更新，所以修改部分 ESLint 规则
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
    "vue/comment-directive": [2,
      {
        // 是否报告未被使用到的指令，参考 ESLint 中的 `--report-unused-disable-directives` 参数： https://eslint.org/docs/user-guide/command-line-interface#--report-unused-disable-directives
        "reportUnusedDisableDirectives": true,
      },
    ],

    // 允许通过 `<script setup="args">` 的形式定义变量，阻止 no-undef 规则报错
    "vue/experimental-script-setup-vars": 2,

    // 在 jsx 中不允许使用未定义的变量
    "vue/jsx-uses-vars": 2,

    /**
     * Vue: Priority A: Essential (Error Prevention), Common
     */

    // 不建议在 `watch` 中使用箭头函数，因为没上下文
    "vue/no-arrow-functions-in-watch": 2,

    // 不允许在 `computed` 中使用异步方法，如果确实有需求，请使用此插件：https://github.com/foxbenjaminfox/vue-async-computed
    "vue/no-async-in-computed-properties": 2,

    // 不允许在 `props`, `computed`, `methods` 中存在重复的 key
    "vue/no-dupe-keys": [2,
      // 除了 Vue 支持的 `computed`, `methods` ...，还在哪些 key 不允许重复
      // "groups": []
    ],

    // 不允许重复的 `v-if` 和 `v-else-if`
    "vue/no-dupe-v-else-if": 2,

    // 避免重复定义属性，如：`<div foo="bar" :foo="baz"></div>`
    "vue/no-duplicate-attributes": [2,
      {
        // 允许 class 两种形式共存
        "allowCoexistClass": true,
        // 允许 style 两种形式共存
        "allowCoexistStyle": true,
      },
    ],

    // 不允许修改 props 的值，而应该用事件传出去，由 props 对应的所有者修改
    "vue/no-mutating-props": 2,

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

    // 不允许在 `<template>` 标签上无 `v-for` 时加 `key`，如：`<template key="foo">`，其他标签是可以的
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

    // 不允许未被使用的变量，主要是指在 <template> 中定义的项，如 `<div v-for="i in foo">bar</div>` 中 `i` 未被使用
    "vue/no-unused-vars": [2,
      {
        // 要忽略检查的变量名，正则匹配
        // "ignorePattern": "^_",
      },
    ],

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

    // 检查在 `<template>` 下元素有效性
    // 1. 不允许为空，如： `<template></template>`
    // 2. 不允许有 `src` 但内容不为空，如： `<template src="foo.html"><bar /></template>`
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

    // 校验 `v-slot` 的合法性
    // 规则很多，可以参考： https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-v-slot.md#book-rule-details
    // 或者参考官方文档： https://cn.vuejs.org/v2/guide/components-slots.html
    "vue/valid-v-slot": 2,

    // 检查 `v-text` 的正确性
    // 1. 不能有参数，如：`<div v-text:foo></div>`
    // 2. 不能有修饰符，如：`<div v-text.foo></div>`
    // 3. 值不能为空，如：`<div v-text></div>`
    "vue/valid-v-text": 2,

    /**
     * Vue: Priority A: Essential (Error Prevention), for Vue@3
     */

    // 不允许通过简单对象形式定义 data 字段，而通过函数形式返回数据对象
    // 这虽然是 Vue@3 专用规则，但在 Vue@2 中也不建议使用简单对象形式定义 data ，所以统一检查
    "vue/no-deprecated-data-object-declaration": 2,

    // 不允许使用 `destroyed` 和 `beforeDestroy` 方法，被弃用了
    "vue/no-deprecated-destroyed-lifecycle": isVue3 ? 2 : 0,

    // 不允许使用 `$listeners` 获取事件了，因为都放在了 `$attrs` 中
    "vue/no-deprecated-dollar-listeners-api": isVue3 ? 2 : 0,

    // 不允许使用 `$scopedSlots` 获取 slot 数据，因为都放在了 `$slots` 中
    "vue/no-deprecated-dollar-scopedslots-api": isVue3 ? 2 : 0,

    // 不允许使用 `$on`, `$off`, `$once` 接口创建事件监听，可以用第三方的 `mitt` 库。另外 `$emit` 不受影响
    "vue/no-deprecated-events-api": isVue3 ? 2 : 0,

    // 不允许使用 Filter 语法 `{{ args | method }}`，可以用 `{{ method(args) }}` 代替
    "vue/no-deprecated-filter": isVue3 ? 2 : 0,

    // 不允许使用 `<template functional>` 这种形式
    "vue/no-deprecated-functional-template": isVue3 ? 2 : 0,

    // 不允许在原生 HTML 元素上使用 `is` 属性
    // 这虽然是 Vue@3 专用规则，但在 Vue@2 中也不建议给原生元素加 `is`，所以统一检查
    "vue/no-deprecated-html-element-is": 2,

    // 不允许使用已被废弃的 `inline-template` 属性
    "vue/no-deprecated-inline-template": isVue3 ? 2 : 0,

    // 不允许在 props.default 方法中使用 `this`，而应该用入参
    "vue/no-deprecated-props-default-this": isVue3 ? 2 : 0,

    // 不允许使用已在 Vue@2.5+ 中被废弃的 `scope` 属性，应该用 `v-slot`
    // 官方推荐放在 Vue@3 中，但因为在 Vue@2 中已不再被推荐，所以直接检查
    "vue/no-deprecated-scope-attribute": 2,

    // 不允许使用已在 Vue@2.6+ 中被废弃的 `slot` 属性，应该用 `v-slot`
    // 官方推荐放在 Vue@3 中，但因为在 Vue@2 中已不再被推荐，所以直接检查
    "vue/no-deprecated-slot-attribute": 2,

    // 不允许使用已在 Vue@2.6+ 中被废弃的 `slot-scope` 属性，应该用 `v-slot`
    // 官方推荐放在 Vue@3 中，但因为在 Vue@2 中已不再被推荐，所以直接检查
    "vue/no-deprecated-slot-scope-attribute": 2,

    // 不允许使用 `v-bind:foo.sync="bar"` 的语法，可以用 `v-model:foo="bar"` 代替
    "vue/no-deprecated-v-bind-sync": isVue3 ? 2 : 0,

    // 不允许使用 `v-on:keydown.native="onKeydown"` 的语法，因为 `v-on` 会自动降级到 Native 形式
    "vue/no-deprecated-v-on-native-modifier": isVue3 ? 2 : 0,

    // 不允许在按键事件绑定时使用数字类型的 keyCode 做事件绑定，可以换成连字符形式的按键 key
    // 因为 [`KeyboardEvent.keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) 不再推荐使用了，对应的 Vue 中也不再推荐使用
    "vue/no-deprecated-v-on-number-modifiers": isVue3 ? 2 : 0,

    // 不允许使用 `Vue.config.keyCodes` 定义按键别名
    // 可以参考 vue/no-deprecated-v-on-number-modifiers 规则
    "vue/no-deprecated-vue-config-keycodes": isVue3 ? 2 : 0,

    // 不允许在异步函数中调用生命周期方法，具体 Composition API 生命周期列表见 https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html
    "vue/no-lifecycle-after-await": isVue3 ? 2 : 0,

    // 不允许直接使用由 `ref` 包裹的对象，而应该通过 `.value` 取值（仅在 script 中限制，因为在 template 会自动解包）
    "vue/no-ref-as-operand": isVue3 ? 2 : 0,

    // 不允许在 `setup` 方法入参或直接函数体内解构入参再使用，会丢失响应能力
    "vue/no-setup-props-destructure": isVue3 ? 2 : 0,

    // 不允许在 `<template>` 元素上使用 `v-for` 时，在子元素上使用 `key`，因为 Vue@3 要求把 `key` 放在 `<template>` 上
    "vue/no-v-for-template-key-on-child": isVue3 ? 2 : 0,

    // 不允许 await 函数之后再调用 Composition API 的 `watch` 方法，此方法一定要先同步调用
    "vue/no-watch-after-await": isVue3 ? 2 : 0,

    // 要求通过 `$slots` 取插槽数据时，需要用函数形式，之前是 `$slots.foo` ，现在要换成 `$slots.foo()`
    "vue/require-slots-as-functions": isVue3 ? 2 : 0,

    // 不允许在 <transition> 元素上加 `v-if` ，而应该在其内部的元素上
    "vue/require-toggle-inside-transition": isVue3 ? 2 : 0,

    // 在 `emits` 中校验中，需要有明确的 return trusy 值
    "vue/return-in-emits-validator": isVue3 ? 2 : 0,

    // 检查 `v-is` 的正确性
    // 1. 不能有参数，如：`<div v-is:foo="bar"></div>`
    // 2. 不能有修饰符，如：`<div v-is.foo="bar"></div>`
    // 3. 值不能为空，如：`<div v-is></div>`
    // 4. 不能在自定义组件上，如： <my-component v-is="bar" />
    "vue/valid-v-is": isVue3 ? 2 : 0,

    /**
     * Vue: Priority A: Essential (Error Prevention), for Vue@2
     */

    // 不允许 `v-model` 上带有自定义修饰器，如 `<foo v-model.bar="baz" />`
    "vue/no-custom-modifiers-on-v-model": isVue2 ? 2 : 0,

    // 不允许有多个根元素，包括：
    // 1. 根元素是文本，如： `<template>Lorem ipsum</template>
    // 2. 根元素是循环，如： `<template><foo v-for="item in list" /></template>
    // 3. 根元素是有多个，如： `<template><foo /><bar /></template>
    // 4. 根元素是插槽，如： `<template><slot /></template>
    // 5. 根元素是模板，如： `<template><template /></template>
    // 额外的，允许使用 `v-if` 放多个元素在 `<template>`下，如： `<template><foo v-if="baz" /><bar v-else /></template>`
    "vue/no-multiple-template-root": isVue2 ? 2 : 0,

    // 不允许在 `<template>` 元素上使用 `v-for` 时，直接在 `<template>` 上使用 `key`，因为 Vue@2 要求把 `key` 放在子元素上
    "vue/no-v-for-template-key": isVue2 ? 2 : 0,

    // 不允许在自定义组件上为 `v-model` 参加参数，如 `<foo v-model.bar="baz" />`
    "vue/no-v-model-argument": isVue2 ? 2 : 0,

    // 校验 `v-bind` 上的 `.sync` 的正确性
    // 1. `.sync` 对应的值不能是表达式
    // 2. `.sync` 只能应用在自定义组件
    // 3. `.sync` 对应的值不能是从迭代器中获取
    "vue/valid-v-bind-sync": isVue2 ? 2 : 0,

    /**
     * Vue: Priority B: Strongly Recommended (Improving Readability), Common
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

    // 自定义组件 `name` 标签拼写风格
    "vue/component-definition-name-casing": [2,
      // PascalCase: 大驼峰
      // kebab-case: 连字符形式
      "PascalCase",
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
        // 结束符的缩进，可以用数字包含所有情况，或者用对象分别对应不同情况
        "closeBracket": {
          // 针对开始标签的 `>` 如何对齐，如 `<div>` 中的 `>`
          "startTag": 0,
          // 针对结束标签的 `>` 如何对齐，如 `</div>` 中的 `>`
          "endTag": 0,
          // 针对自闭合标签的 `>` 如何对齐，如 `<foo />` 中的 `>`
          "selfClosingTag": 0,
        },
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

    // 一个文件中只放一个组件
    "vue/one-component-per-file": 2,

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

    /**
     * Vue: Priority B: Strongly Recommended (Improving Readability), for Vue@3
     */

    // 要 `$emit` 的事件名需要先在 `emits` 属性中定义
    "vue/require-explicit-emits": [isVue3 ? 2 : 0,
      {
        // 是否允许事件名与 `props` 中的 key 一致
        "allowProps": false,
      },
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
          // 插槽，包括 `v-slot`, `slot`
          "SLOT",
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

    // 自定义组件三大标签的排序
    "vue/component-tags-order": [2,
      // Vue 支持 `<docs>` 标签，用来记录当前组件的文档信息
      {
        // 每个 key 的排序，数组表示这几个 key 的权重是相同的
        "order": [
          "docs",
          "template",
          "script",
          "style",
        ],
      },
    ],

    // 不允许不必要的 `<template>`，除非它真的起到了作为
    "vue/no-lone-template": [2,
      {
        // 是否忽略添加了如 `id`, `ref` 等访问属性的 `<template>`
        "ignoreAccessible": false,
      },
    ],

    // 不允许给 slot 传大于 1 个的参数，它只接收一个参数
    "vue/no-multiple-slot-args": 2,

    // 不允许使用 `v-html`，因为这可能会带来 XSS 漏洞
    "vue/no-v-html": 2,

    // 在组件中针对每个 key （如 data, computed ...）排序
    "vue/order-in-components": [0,
      {
        // 每个 key 的排序，数组表示这几个 key 的权重是相同的
        "order": [
          // 用于从模块外引用
          "el",
          // 全局感知
          "name",
          "parent",
          // 组件类型定义
          "functional",
          // 模板解析
          ["delimiters", "comments"],
          // 组件依赖
          ["components", "directives", "filters"],
          // 组件扩展
          "extends",
          "mixins",
          ["provide", "inject"], // # for Vue.js 2.2.0+
          // 组件接口
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits", // # for Vue.js 3.x
          // Vue@3 的 Composition API
          "setup", // # for Vue 3.x
          // 组件内数据
          "fetch", // # for Nuxt
          "asyncData", // # for Nuxt
          "data",
          "computed",
          // 事件及生命周期方法
          "watch",
          "LIFECYCLE_HOOKS",
          // 内部方法
          "methods",
          // 渲染方法
          "head", // # for Nuxt
          ["template", "render"],
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

    // 在 `<template>`, `<script>`, `<style>` 标签内容与标签之间是否要加换行
    "vue/block-tag-newline": [2,
      {
        // always: 总要有换行
        // never: 不要有换行
        // consistent: 前后保持一致
        // ignore: 忽略此检测
        // 当内容只有一行时，是否要有换行
        "singleline": "consistent",
        // 当内容有多行时，是否要有换行
        "multiline": "always",
        // 标签与内容间最多可以有多少个空行
        "maxEmptyLines": 0,
        // 分别针对 `<template>`, `<script>`, `<style>` 设置，每一标签的设置就是上边的三项
        // "blocks": {
        //   "template": {},
        //   "script": {},
        //   "style": {},
        // },
      },
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

    // 自定义事件名使用的风格，如 `@event-name` 还是 `@eventName`
    // 在 Vue@2 中推荐在使用连字符形式，因为：1) 事件名不会被用在变量或属性中，没必要用驼峰；2) DOM 模板会自动将 `v-on` 中的事件名转为全小写，`myEvent` 与 `myevent` 是相同的
    "vue/custom-event-name-casing": [2,
      // kebab-case: 连字符形式
      // camelCase: 小驼峰形式
      "kebab-case",
      {
        // 要忽略检查的事件名，正则匹配
        "ignores": [],
      },
    ],

    // 检查 `<button>` 标签 `type` 属性是否存在及它的正确性
    "vue/html-button-has-type": [2,
      {
        // 允许 `type="button"`，如 `<button type="button"></button>`
        "button": true,
        // 允许 `type="submit"`，如 `<button type="submit"></button>`
        "submit": true,
        // 允许 `type="reset"`，如 `<button type="reset"></button>`
        "reset": true,
      },
    ],

    // 检查 HTML 注释内的换行情况
    // NOTE: 如果注释的 HTML 结构，会导致注释内容缩进与 HTML 不符，所以暂时关闭此检测
    "vue/html-comment-content-newline": [0,
      // 分别针对单行内容和多行内容进行设置
      // always: `<--` 后和 `-->` 前都要有换行
      // never: `<--` 后和 `-->` 前都不能有换行
      {
        // 注释中只有一行的情况
        "singleline": "never",
        // 注释中有多行的情况
        "multiline": "always",
      },
      {
        // 例外，正则字符串
        "exceptions": [],
      },
    ],

    // 检查 HTML 注释内的空格情况
    "vue/html-comment-content-spacing": [2,
      // always: `<--` 后和 `-->` 前都要有空格
      // never: `<--` 后和 `-->` 前都不能有空格
      "always",
      {
        // 例外，正则字符串
        "exceptions": [],
      },
    ],

    // 检查 HTML 注释的缩进
    // NOTE: 如果注释的 HTML 结构，会导致注释内容缩进与 HTML 不符，所以暂时关闭此检测
    "vue/html-comment-indent": [0,
      // 为数字表示要缩进的空格数，或者用 "tab" 表示缩进一个 Tab
      2,
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

    // 在定义属性时，多行属性之间是否要加空行
    "vue/new-line-between-multi-line-property": [0,
      {
        // 多行属性之间最小几个换行符（视觉上空一行时有 2 个换行符）
        "minLineOfMultilineProperty": 2,
      },
    ],

    // 在 `Vue.nextTick` 和 `vm.$nextTick` 使用哪种调用形式
    "vue/next-tick-style": [2,
      // promise: 使用 Promise 形式
      // callback: 使用 callback 形式
      "promise",
    ],

    // 不允许在 `<template>` 中使用字符串字面量，而应该用变量引进来，主要用于国际化，所有字符串都应有对应本地化的值
    "vue/no-bare-strings-in-template": [0,
      {
        // 额外允许的字符串列表
        "allowlist": [
          "(", ")", ",", ".", "&", "+", "-", "=", "*", "/", "#", "%", "!", "?", ":", "[", "]", "{", "}", "<", ">", "\u00b7", "\u2022", "\u2010", "\u2013", "\u2014", "\u2212", "|",
        ],
        // 哪些标签的哪些属性允许使用字符串字面量
        "attributes": {
          "/.+/": ["title", "aria-label", "aria-placeholder", "aria-roledescription", "aria-valuetext"],
          "input": ["placeholder"],
          "img": ["alt"],
        },
        // 哪些 directive 允许使用字符串字面量
        "directives": ["v-text"],
      },
    ],

    // 对于布尔型的属性，要求默认值必须为 false，因为默认不传时 undefined 为 falsy 值，且 Vue 会为布尔属性设置默认值为 false
    "vue/no-boolean-default": [2,
      // "no-default": 不允许添加 default
      // "default-false": 可以不添加 default 字段，如果添加则必须为 false
      "default-false",
    ],

    // 不允许设置 `inheritAttrs: true` 时使用 `v-bind="$attrs"`，即 `v-bind="$attrs"` 要与 `inheritAttrs: false` 同时使用
    "vue/no-duplicate-attr-inheritance": 2,

    // 检查 `<template>`, `<script>`, `<style>` 不允许为空，如果有 `src` 属性则属性值不能为空
    "vue/no-empty-component-block": 1,

    // 不允许在 `:class` 中指定多个数组对象，因为数组中可以用一个对象表示多个 key
    "vue/no-multiple-objects-in-class": 2,

    // 不允许可能是 typo 的组件项，如 `method`（应该是`methods`）, `create`（应该是`created`） 之类的
    "vue/no-potential-component-option-typo": [2,
      {
        // 预设项，包含 "vue", "vue-router", "nuxt" 三项，或者用 "all" 来表示所有这三项
        "presets": ["all"],
        // 额外的允许使用的项目名
        "custom": [],
        // NOTE: 这项暂时没看明白做什么，且官方不建议修改此值
        "threshold": 1,
      },
    ],

    // 不允许自定义组件的 `name` 属性使用 HTML 标签名
    "vue/no-reserved-component-names": [2,
      {
        // 不允许使用 Vue@2 中内置的组件名，内置组件参考： https://vuejs.org/v2/api/index.html#Built-In-Components
        "disallowVueBuiltInComponents": true,
        // 不允许使用 Vue@3 中内置的组件名，内置组件参考： https://v3.vuejs.org/api/built-in-components.html
        "disallowVue3BuiltInComponents": true,
      },
    ],

    // 不允许使用受限的元素
    "vue/no-restricted-block": [0,
      // 以下每一项都对应一个受限的元素名
      // 字符串形式，即受限的元素名
      // "foo",
      // 对象形式，可以自定义出错提示
      {
        "element": "foo",
        "message": "不允许使用 `<foo>` 元素",
      },
    ],

    // 不允许在 await 中调用受限的方法
    "vue/no-restricted-call-after-await": [0,
      // 以下每一项都对应一个受限的调用
      {
        // 如这一项限制 `import { foo } from 'bar'`
        "module": "foo",
        "path": "bar",
        "message": "不允许使用 bar 中的 foo 方法",
      },
    ],

    // 不允许使用受限的组件定义项
    "vue/no-restricted-component-options": [0,
      // 以下每一项都对应一个受限的组件定义项
      // 字符串形式，即受限的项目名
      // "foo",
      // 对象形式，可以自定义出错提示
      {
        // 可以使用 key+value, key+element 的形式
        "name": "foo",
        "message": "不允许在组件中使用 `foo` 项",
      },
    ],

    // 不允许使用受限的事件名
    "vue/no-restricted-custom-event": [0,
      // 以下每一项都对应一个受限的事件名
      // 字符串形式，即受限的事件名
      // "foo",
      // 对象形式，可以自定义出错提示
      {
        "event": "input",
        "message": "在 Vue@3 中，给 `v-model` 事件传值时，建议使用 `update:modelValue`",
        "suggest": "update:modelValue",
      },
    ],

    // 不允许使用受限的属性名
    "vue/no-restricted-props": [0,
      // 以下每一项都对应一个受限的 Prop
      // 字符串形式，即受限的 Prop
      // "foo",
      // 对象形式，可以自定义出错提示
      {
        "name": "value",
        "message": "在 Vue@3 中，给 `v-model` 传值时请使用 `modelValue`",
        "suggest": "modelValue",
      },
    ],

    // 不允许使用受限的属性
    "vue/no-restricted-static-attribute": [0,
      // 以下每一项都对应一个受限的属性名
      // 字符串形式，即受限的属性名
      // "foo",
      // 对象形式，可以自定义出错提示
      {
        // 可以使用 key+value, key+element 的形式
        "key": "foo",
        "value": "bar",
        "element": "MyComponent",
        "message": "不允许在 `<my-component>` 上指定属性 `foo` 的值为 `bar`",
      },
    ],

    // 不允许使用受限的 `v-bind`
    "vue/no-restricted-v-bind": [2,
      // 以下每一项都对应一个受限的绑定名
      // 字符串形式，即受限的绑定名
      // "/^v-/",
      // 对象形式，可以自定义出错提示
      {
        "argument": "/^v-/",
        "message": "不允许使用 `:v-xxx`，如果需要使用 directive，请将 `:` 移除.",
      },
    ],

    // 在 `style` 属性中禁止使用纯静态样式（应该写在 `<style>` 标签中）
    "vue/no-static-inline-styles": [2,
      {
        // 是否允许通过 `:style` 的方式写入纯静态的样式
        "allowBinding": false,
      },
    ],

    // 不允许在 `<a>` 标签没有 `rel="noopener noreferrer"` 的情况下使用 `target="_blank"`
    // 原因详见 https://mathiasbynens.github.io/rel-noopener/
    "vue/no-template-target-blank": [2,
      {
        // 没有 `noreferrer` 是否允许，如 `rel="noopener"`
        "allowReferrer": false,
        // 当 `href` 是动态值时，是否检查
        // always: 总是检查
        // never: 动态值时允许没有 `rel="noopener noreferrer"` 的场景
        "enforceDynamicLinks": "always",
      },
    ],

    // 不允许使用未在 `components` 中注册的组件
    "vue/no-unregistered-components": [2,
      {
        // 忽略对应的检查
        "ignorePatterns": [],
      },
    ],

    // 不允许使用仍不支持的特性（通过配置的 Vue 版本来判断）
    "vue/no-unsupported-features": [2,
      {
        // 当前依赖的 Vue 版本，支持 Semver
        "version": vueVersion.version,
        // 忽略以下特性判断
        // "ignores": [
        //   // Vue@3.0.0+
        //   "v-model-argument",
        //   "v-model-custom-modifiers",
        //   "v-is",
        //   // Vue@2.6.0+
        //   "dynamic-directive-arguments",
        //   "v-slot",
        //   // Vue@2.5.0+
        //   "slot-scope-attribute",
        // ],
      },
    ],

    // 不允许有未被使用的属性，同时还可以检查其他一些情况
    "vue/no-unused-properties": [2,
      {
        // 在以下节点中定义的属性，都应被使用
        "groups": ["props", "data", "computed", "methods", "setup"],
        // 是否检查 `data` 中的子属性
        "deepData": false,
        // 是否忽略检查被标记为 /** @public */ 的项，它可能在外部被使用
        "ignorePublicMembers": false,
      },
    ],

    // 不允许无意义的 mustache 语法，主要用于检查 mustache 中仍然是个字符串
    "vue/no-useless-mustaches": [2,
      {
        // 忽略包含有注释字符串的项
        "ignoreIncludesComment": false,
        // 忽略包含有转义字符的项
        "ignoreStringEscape": false,
      },
    ],

    // 不允许无意义的 `v-bind` ，主要用于检查 `v-bind` 是否绑定了一个字符串，这可以直接用属性表示，不需要 bind
    "vue/no-useless-v-bind": [2,
      {
        // 忽略包含有注释字符串的项
        "ignoreIncludesComment": false,
        // 忽略包含有转义字符的项
        "ignoreStringEscape": false,
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

    // 对于多个静态 className 是否要排序，如 `class="b a"` 应该重新排序为 `class="a b"`
    "vue/static-class-names-order": 0,

    // 指定 `v-for` 中使用 `in` 还是 `of`
    "vue/v-for-delimiter-style": [2,
      // 用 in 还是 of
      "in",
    ],

    // 在 `v-on` 中的事件名使用连字符形式
    "vue/v-on-event-hyphenation": [0,
      // always: 使用连字符形式
      // never: 不使用连字符
      "always",
      {
        // 是否自动修复此问题，在 Vue@2 中建议关闭，可能引起副作用
        "autofix": isVue3,
        // 要忽略判断的事件名
        "ignore": [],
      },
    ],

    // 在 `v-on` 后跟的方法名后，是否要加 `()`（Vue 会自动做调用，当无参数传递时不需要加括号）
    "vue/v-on-function-call": [2,
      // always: 总要跟括号
      // never: 除了需要参数，否则不允许放空的 `()`
      "never",
      {
        // 是否忽略包含注释的情况，如 `<div :click="close() /* some comments */" />`
        "ignoreIncludesComment": false,
      },
    ],

    // 校验在调用 `Vue.nextTick` 或 `vm.$nextTick` 时，应该使用 Promise 或 callback 形式，不能只调用不执行实际业务逻辑
    "vue/valid-next-tick": 2,

    /**
     * Vue: Extension Rules
     * 扩展 ESLint 核心规则，用于 `<template>` 中的代码，具体说明请参考 ESLint 对应规则
     */

    "vue/array-bracket-newline": $stylisticIssues["array-bracket-newline"],
    "vue/array-bracket-spacing": $stylisticIssues["array-bracket-spacing"],
    "vue/arrow-spacing": $es6["arrow-spacing"],
    "vue/block-spacing": $stylisticIssues["block-spacing"],
    "vue/brace-style": $stylisticIssues["brace-style"],
    "vue/camelcase": $stylisticIssues.camelcase,
    "vue/comma-dangle": $stylisticIssues["comma-dangle"],
    "vue/comma-spacing": $stylisticIssues["comma-spacing"],
    "vue/comma-style": $stylisticIssues["comma-style"],
    "vue/dot-location": $bestPractices["dot-location"],
    "vue/dot-notation": $bestPractices["dot-notation"],
    "vue/eqeqeq": $bestPractices.eqeqeq,
    "vue/func-call-spacing": $stylisticIssues["func-call-spacing"],
    "vue/key-spacing": $stylisticIssues["key-spacing"],
    "vue/keyword-spacing": $stylisticIssues["keyword-spacing"],
    "vue/max-len": [$stylisticIssues["max-len"][0],
      {
        ...$stylisticIssues["max-len"][1],
        // 是否忽略 HTML 属性值
        "ignoreHTMLAttributeValues": true,
        // 是否忽略 HTML 文本内容
        "ignoreHTMLTextContents": true,
      },
    ],
    "vue/no-constant-condition": $possibleErrors["no-constant-condition"],
    "vue/no-empty-pattern": $bestPractices["no-empty-pattern"],
    "vue/no-extra-parens": $possibleErrors["no-extra-parens"],
    "vue/no-irregular-whitespace": [$possibleErrors["no-irregular-whitespace"][0],
      {
        ...$possibleErrors["no-irregular-whitespace"][1],
        // 是否忽略 HTML 属性值的字符检查
        "skipHTMLAttributeValues": false,
        // 是否忽略 HTML 文本内容的字符检查
        "skipHTMLTextContents": false,
      },
    ],
    // 此规则额外支持 Vue 的 AST，详细见 https://github.com/mysticatea/vue-eslint-parser/blob/master/docs/ast.md
    "vue/no-restricted-syntax": $stylisticIssues["no-restricted-syntax"],
    "vue/no-sparse-arrays": $possibleErrors["no-sparse-arrays"],
    "vue/no-useless-concat": $bestPractices["no-useless-concat"],
    "vue/object-curly-newline": $stylisticIssues["object-curly-newline"],
    "vue/object-curly-spacing": $stylisticIssues["object-curly-spacing"],
    "vue/object-property-newline": $stylisticIssues["object-property-newline"],
    "vue/operator-linebreak": $stylisticIssues["operator-linebreak"],
    "vue/prefer-template": $es6["prefer-template"],
    "vue/space-in-parens": $stylisticIssues["space-in-parens"],
    "vue/space-infix-ops": $stylisticIssues["space-infix-ops"],
    "vue/space-unary-ops": $stylisticIssues["space-unary-ops"],
    "vue/template-curly-spacing": $es6["template-curly-spacing"],
  },
}
