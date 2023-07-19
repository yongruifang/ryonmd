const options = {
    arrowParens: 'avoid',//箭头函数参数周围是否使用括号
    singleQuote: true,//是否使用单引号来定义字符串
    bracketSpacing: true,//在对象字面量中的括号之间是否加上空格
    endofLine: 'lf',//'lf' 表示使用 Unix 风格的换行符（\n）
    semi: false,//是否在语句末尾添加分号
    tabWidth: 2,//制表符等于多少个空格。
    trailingComma: 'none'//是否在多行结构的最后一个元素后添加逗号
}
module.exports = options//导出配置选项，方便其他文件调用