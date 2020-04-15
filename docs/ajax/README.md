

# AJAX

## 笔记整理中未完待续

## AJAX初步

- 创建对象并使用

  ```javascript
  // 创建对象
  let xhr = new XMLHttpRequest()
  // 设置请求方式以及请求地址
  xhr.open('get', 'https://www.test.com')
  // 发送请求
  xhr.send()
  ```

- 获取响应数据

  ```javascript
  xhr.onload = function () {
      console.log(xhr.responseText)
  }
  ```

  - onload事件在`IE低版本`中不适用

## 参数传递

### Get方式传递参数

- 参数放在请求连接中

- get请求不能传递json对象数据格式，传统表单也不可以

  ```javascript
  xhr.open('get', 'https://www.test.com?name=usrname&age=18')
  ```

### Post方式传递参数

- post方式必须在请求报文中明确设置请求类型

- 形如`name=surname&age=18`类型参数，需要设置为`xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')`

- 使用JSON类型作为参数时，需要设置为`xhr.setRequestHeader('Content-Type', 'application/json')`

- 参数放在`xhr.send()`中

  ```javascript
  // name=syrname&age=18
  let xhr = new XMLHttpRequest()
  xhr.open('post', 'https://www.test.com')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({name:'usrname', age:18}))
  
  xhe.onload = function (){
      console.log(xhr.responseText)
  }
  ```

## AJAX状态码

- 创建Ajax对象，配置Ajax对象，发送请求，以及接收响应数据，都对应一个Ajax状态码

  - 0：请求未完成初始化（ 没有调用send() ）
  - 1：请求已经建立，但是没有发送（ 没有调用send() ）
  - 2：请求已经发送
  - 3：请求正在处理，通常响应中已经有部分数据可用
  - 4：响应已经完成，可以获取服务器响应数据

  ```javascript
  // 获取Ajax状态码
  xhr.readyState
  ```

- 根据状态码来获取响应数据

  ```javascript
  let xhr = new XMLHttpRequest()
  xhr.open('get', 'https://www.test.com')
  xhr.send()
  
  // 兼容IE低版本
  xhr.onreadystatechange = function (){
      if(xhr.readyState == 4 && xhr.status == 200){
          console.log(xhr.responseText)
      }
  }
  ```

## IE低版本Ajax缓存问题

- 在低版本的IE浏览器中，Ajax请求有缓存问题，在请求同一个地址时，只有第一次请求会发送到服务器端，之后的请求都会直接从浏览器缓存中获取结果，及时服务器更新了数据，也只会拿到浏览器缓存的旧数据

- 解决方案：在请求抵制后面加随机请求参数，保证每一次的请求都是新的地址

  ```javascript
  xhr,open('get', 'https://www.test.com?' + Math.random())
  ```

  

## 笔记整理中未完待续