# vue-formula-editor

<p>基于<a href='https://github.com/surmon-china/vue-codemirror'>vue-codemirror</a>与<a href='https://github.com/formulajs/formulajs'>formulajs</a>低代码公式编辑器，支持动态计算</p>

> ⚠️ 注意：目前仅支持 Vue2

## 安装

```bash
$ npm i vue-formula-editor -S
```
## example地址
<a href="https://master--stalwart-pudding-602011.netlify.app">在线体验</a>

<a href="https://github.com/Xy-Zipper/vue-formula-editor">demo & 源码</a>

### Props 参数说明

| 参数        | 说明                  | 类型   | 可选值 | 默认值 |
| ----------- | --------------------- | ------ | ------ | ------ |
| fieldList   | 表单字段              | Array  | 必填   |        |
| formulaList | 公式函数列表          | Array  | 必填   |        |
| formulaConf | 公式编辑配置 / 回显值 | Object | 必填   |        |

#### fieldList 数据格式

```javascript
[
  {
    fullName: '名称',
    value: 'string',
    enCode: 'name',
  },
]
```

#### formulaList 类型说明

```javascript
[
  {
    name: '常用函数',
    enCode: 'frequentlyUse',
    formula: [
      {
        name: 'SUM',
        enCode: 'SUM',
        tip: '求和',
        example: 'SUM(数学成绩,语文成绩,英语成绩,...) = 各科总成绩',
        usage: 'SUM(数值1,数值2,...)。',
      },
    ],
  },
]
```

#### formulaConf 类型说明

> 其中 `marks` 为可选参数

```javascript
{
    "text": "CONCATENATE(名称,描述)",
    "marks": [{
            "from": {
                "line": 0,
                "ch": 12
            },
            "to": {
                "line": 0,
                "ch": 14
            },
            "enCode": "name"
        },
        {
            "from": {
                "line": 0,
                "ch": 15,
                "sticky": null
            },
            "to": {
                "line": 0,
                "ch": 17,
                "sticky": null
            },
            "enCode": "desc"
        }
    ]
}
```

### Methods 方法说明

| 方法名  | 说明             | 参数 |
| ------- | ---------------- | ---- |
| getData | 获取公式编辑配置 | 无   |
| reset   | 重置公式编辑器   | 无   |

### 自动监听数据变化 - formulaWatcher

> 自动监听数据变化，并实时计算结果

#### formulaWatcher Params 参数说明

| 参数        | 说明                                                        |
| ----------- | ----------------------------------------------------------- |
| vm          | 当前 Vue 实例                                               |
| formData    | 计算公式所需的数据； key：监听的名称、value：监听的表单数据 |
| formulaConf | 计算公式配置                                                |
| fn          | 回调函数                                                    |

#### 使用示例

```javascript
/**
 * 动态监听并返回计算结果
 * @param {VueContentInstance} vm 当前Vue实例
 * @param {Object} formData 计算公式所需的数据
 * @param {Object} formulaConf 计算公式配置
 * @param {Function} fn 回调函数
 * @returns {Function} 取消监听函数
 */
this.watchData = formulaWatcher(
  this,
  { key: 'formData', value: this.formData },
  this.formulaConf,
  data => {
    this.result = data
  }
)
```

### 计算结果方法 - calculate

```javascript
/**
 * 计算公式结果
 * @param {Object} formulaConf 计算公式配置 
 */
this.result = calculate({
  text: 'SUM(1,2,3,4,5,6,7,8,9,10)',
})
```
