# JavaScript与ES6

## 笔记整理中

## 加载延迟

- JS脚本在文档头部加载时，会加载完JS脚本再去执行HTML代码，会造成HTML页面的显示延迟
- 一般可以放在后面引入

## 变量声明

- 同时声明并赋值多个变量

  ```javascript
  var web = 'baidu.com',
      name = '百度',
      url = 'www.baidu.com';
  ```

- 将一个值赋值给多个变量

  ```javascript
  var web = url = site = 'www.baidu.com';
  ```



### var声明变量 & 变量提升

- **变量提升，就是把对变量的声明放到前面去执行**

- JS代码执行前，解释器会先把所有的代码分析一遍在分析阶段，会进行变量提升

  ```javascript
  //js
  
  console.log(message);
  var message = 'www.baidu.com';
  // 会输出 undefined
  ```

  - 等同于

  ```javascript
  //js
  
  var message;
  console.log(message);
  message = 'www.baidu.com';
  // 只定义未赋值，则为undefined
  ```

- 其他情况的提升

  ```javascript
  //js
  
  function messageText() {
      
      if(false){
          var message = 'www.baidu.com';
      }
      
      console.log(message);
  }
  
  // 输出undefined
  ```

  - 尽管 if 语句未执行，但是在代码分析阶段，就对 if 语句块内的变量声明做了提升，所以在后面输出时不会报错，因为 if 语句块没有执行，所以未赋值，输出 `undefined`

### let、const声明变量 & 暂时性死区TDC

- `let` 和 `const` 声明变量不会变量提升，声明的变量必须先声明后使用
- 临时性死区：从这个作用域的开始直到变量的声明之前，这个变量都是处在 “临时性死区” 当中的，这个时候引用他的话会报 `referenceError` 的错误

### 全局污染

- 不使用 `var` 时，同样可以定义变量，但是会有全局污染风险

  ```javascript
  //js
  
  function func(){
      web = 'www.baidu.com';
  }
  console.log(web) 	//输出 www.baidu.com
  ```

  - web不使用关键字声明，同样可以使用，但是又污染风险

  ```javascript
  //index.js
  function show(){
      web = 'www.baidu.com';
  }
  
  //js
  
  <script src="index.js"></script>
  <script>
  	web = 'baidu';
  	show();
  	console.log(web); // 输出结果为 www.baidu.com
  </script>
  ```

  - 在`index.js`中定义的函数`show`没有使用关键字声明变量，在调用后，会直接把`<script>`标签中的`web`修改，造成全局污染
  - 严格模式下，不使用关键字声明会报错

### window全局对象污染

- 使用 `var`定义变量时，定义的变量会绑定为`window`的属性，如果和`window`的固有属性重名，会造成对象污染

  ```javascript
  var screenLeft = 100;
  console.log( window.screenLeft )
  //	输出100
  //	定义的 screenLeft 覆盖掉了window的固有属性
  ```

- 使用`let`定义变量时，不会绑定为`window`的属性

### 重复声明

- 使用`var`关键字声明变量时，允许重复声明

  ```javascript
  var web = 'www.baidu.com';
  var web = 'www.google.com';
  //	不会报错
  ```

- 使用`let`关键字声明时，不允许重复声明（同一作用域下不允许重复声明）

  ```javascript
  let web = 'www.baidu.com';
  let web = 'www.google.com';
  //	会报错
  ```

  

## 块作用域

- ES5只有全局作用域和函数作用域，会造成如下两个问题：

  - 1.内层变量覆盖外层变量

    ```javascript
    //js
    
    var temp = 'something';
    
    function func(){
        console.log(temp);
        if (false) {
            var temp = 'hello world';
        }
    }
    func();	// 输出 undefined
    ```

    - `if`语句块内的变量被提升，在func执行时，会得到 undefined

  - 2.计数的循环变量会泄露为全局变量

    ```javascript
    //js
    
    var i = 99;
    for(var i=0; i<5; i++){
        console.log('hello world');
    }
    console.log(i);	// 输出5
    ```

    - 循环结束后，for内的`i`并没有消失，而是暴露给全局变量`i`

- 块作用域：声明的变量只能在`{}`内生效，对上述两个例子修改

  ```javascript
  //js
  
  var temp = 'something';
  
  function func(){
      console.log(temp);
      if (false) {
          let temp = 'hello world';
      }
  }
  func();	// 输出 something
  ```

  ```javascript
  //js
  
  var i = 99;
  for(let i=0; i<5; i++){
      console.log('hello world');
  }
  console.log(i);	// 输出 99
  ```


## == 和 ===

- 使用`==`时，会进行自动的类型转换

- 使用`===`时，不会进行自动的类型转换

  ```javascript
  //js
  
  let text = '1';
  let message = 1;
  console.log(text == message);	// 输出 true
  console.log(text === message);	// 输出 false
  ```

## for-in 与 for-of

- **for-in**

  ```javascript
  let lessons = [
      { title: '物理', number:10 },
      { title: '生物', number:20 },
      { title: '化学', number:17 }
  ];
  
  for (let key in lessons){
      console.log(lessons[key].title);
  }
  ```

  - `key`就相当于索引

- **for-of**

  ```javascript
  let lessons = [
      { title: '物理', number:10 },
      { title: '生物', number:20 },
      { title: '化学', number:17 }
  ];
  
  for (let value of lessons){
      console.log(value);
  }
  ```

  - `value`得到的是里面的值

## 字符串常用函数

### str.length

- 获取字符串长度

### str.toUpperCase( )

- 转换为大写

### str.toLowerCase( )

- 转换为小写

### str.trim( )

- 去掉字符串两端的空格

### str.charAt (0)  以及 str[0]

- 获取相应位置的字符元素

### 字符串截取

- str.slice( x, y )

  - 从第 x 位置开始向后截取（负数时，从后向前截取）
  - 截取到 第 y 位置之前

- str.substr( x, y )

  - 从第 x 位置开始向后截取（负数时，当做0）
  - 截取 y 个元素

- str.substring( x, y )

  - 从第 x 位置开始向后截取（负数时，从后向前截取）

  - 截取到 第 y 位置之前

### 字符查找

- str.indexOf( "x", y)
  - 从第 y 个位置向后查找是否存在 x，存在返回位置，不存在返回 `-1`
- str.lastInbdexOf( "x", y )
  - 从第 y 个字符开始，向前查找是否存在 x，存在返回位置，不存在返回 `-1`
- str.includes( "x", y )
  - 从第 y 个位置向后查找是否存在某个元素，存在返回 true，不存在返回 false
- str.startsWith( "x" )
  - 是否以 x 字符开头，区分大小写，返回布尔值
- str.endsWith( "x" )
  - 是否以 x 字符结束，区分大小写，返回布尔值

## 类型转换

### 字符串 --> 数字

- 隐式转换

  ```javascript
  console.log( str*1 + 100)
  // str 被转换为数字进行计算
  ```

- 构造函数Number()

  ```javascript
  console.log( Number(str) + 100)
  // str 被转换为数字进行计算
  ```

  

### 数字 --> 字符串

- 隐式转换

  ```javascript
  let number = number + ""
  // 转换为字符串
  ```

- 构造函数String()

  ```javascript
  console.log( String(number) )
  // number 被转换为字符串
  ```

- toString()

  ```javascript
  const num = 1
  let str = num.toString()
  ```

### 复杂字符串 --> 数字

- parseInt() 和 parseFloat()

  ```javascript
  const str = "99str"
  let num = parseInt(str)
  let count = parseFloat(str)
  ```

  - **注意：如果开头不是数字，那么结果为NaN**

### 字符串 --> 数组

- plit()拆分

  ```javascript
  const str = "string"
  let strArr = str.split("")
  // strArr = ["s","t","r","i","n","g"]
  ```

### 数组 --> 字符串

- join()

  ```javascript
  const arr = ["number", "string"]
  let str = arr.join("")
  // str = "numberstring"
  ```

### 其他

- 判断是否为整数：isInteger()

  ```javascript
  let num = 1
  console.log( Number.isInteger(num) )
  ```

- 四舍五入：toFixed()

  ```javascript
  let num = 99.99999
  let numFixed = num.toFixed(2)
  // 四舍五入保留两位小数
  ```

  

## 未完待续