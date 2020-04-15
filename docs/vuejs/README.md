# VueJS ( 官方文档 + vuejs书籍 )

## 1. Vue实例与数据绑定

### 1.1 Vue实例

- 创建Vue实例可以通过 构造函数Vue 来实现

  ```javascript
  var app = new Vue({	 // app 就代表了这个vue实例
      el: '#app',		 // 将 id 为app的元素获取过来挂载
  })
  ```

### 1.2 数据

- 创建Vue实例时，可以为实例添加数据到 `data` 属性中

  ```javascript
  var app = new Vue({
  	el: '#app',	
      data: {		// data内放置相应的数据
          message: 'something',
          title: 'nothing'
      }
  })
  ```

- 除了直接在data中定义数据外，还可以把data指向一个已有的变量，并且他们之间会建立双向数据绑定，其中一个数值发生变化，另一个也会发生变化

  ```javascript
  var myData = {
      message: 'something',
      title: 'nothing'
  }
  var app = new Vue({
  	el: '#app',	
      data: myData    // myData 绑定到 vue实例的data属性中
  })
  ```

### 1.3 生命周期

- 每个vue实例创建时，都会经历一系列过程，同时也会调用相应的生命周期，这些生命周期可以让我们在不同的时间完成想要的操作。

- 常用的Vue生命周期钩子有：

> beforeCreate：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

> created：在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前尚不可用。

> beforeMount：在挂载开始之前被调用：相关的 `render` 函数首次被调用。该钩子在服务器端渲染期间不被调用。

> mounted：实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。 如果根实例挂载到了一个文档内的元素上，当`mounted`被调用时`vm.$el`也在文档内。注意 `mounted` **不会**保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 `mounted` 内部使用 vm.$nextTick

> beforeUpdate：数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。**该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。**

> updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
>
> 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用**计算属性**或 **watcher** 取而代之。
>
> 注意 `updated` **不会**保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 `updated` 里使用 vm.$nextTick

> activated：被 keep-alive 缓存的组件激活时调用。**该钩子在服务器端渲染期间不被调用**

> deactivated：被 keep-alive 缓存的组件停用时调用。**该钩子在服务器端渲染期间不被调用。**

> beforeDestory：实例销毁之前调用。在这一步，实例仍然完全可用。**该钩子在服务器端渲染期间不被调用。**

> destroyed：实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。**该钩子在服务器端渲染期间不被调用。**

> errorCaptured：当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。

- Vue生命周期钩子图示：

  <img src="/notesblogreco/images/lifecycle.png">

### 1.4 插值与表达式

- 使用双大括号语法（Mustache语法）是最基本的文本插值语法，他会自动将我们双向绑定的数据实时显示出来，并且数据变化时，现实的内容也会实时变化

  ```javascript
  <div id="app">
      {{ message }}
  </div>
  
  <script>
  	var app = new Vue({
          el: '#app',
          data: {
              message: '您的一条提示信息'
          }
      })    
  </script>
  ```

- 如上例，`{ { message }}` 将会被data属性中的message的内容所替换

- {{ }} 内部还支持书写JavaScript表达式来进行计算等

### 1.5 过滤器

- 在 {{ }} 插值的尾部添加一个管道符 `|` 可以对数据进行过滤处理，经常用来格式化文本

  ```javascript
  <div id="app">
      {{ message | msgFilter }}
  </div>
  
  <script>
  	var app = new Vue({
          el: '#app',
          data: {
              message: '这是您的一条提示想信息'
          }，
          filters：{
          	msgFilter： function(value){
          		value = '您好，' + value;
         			return value;
      		}
      	}
      })
  </script>
  ```

- 过滤器可以串联

  ```javascript
  {{ message | msgFilter | msgAdd }}
  ```

- 过滤器可以接受参数

  ```javascript
  {{ message | msgFilter('arg1', 'arg2') }}
  ```

  注意：arg1 和 arg2 会分别传递给过滤器的第二个和第三个参数，因为第一个参数是数据本身
  
- 过滤器应当用于处理简单的文本转换，如果要实现更为复杂的数据变换，应当使用计算属性

## 2. 计算属性（computed）

### 2.1 计算属性用法

- 计算属性中可以完成各种复杂逻辑，只需要最终返回一个结果即可。

- 计算属性可以依赖多个Vue实例的数据，只要其中一个发生变化，计算属性就会重新执行，视图也会更新。

  ```javascript
  <div id='app'>
      总计：{{ prices }}
  </div>
  
  <dcript>
      var app = new Vue({
          el: '#app',
          data: {
              priceA: 32,
              priceB: 23
          },
          //  计算属性也是Vue的属性
          //  使用data中的数值需要使用 this.
          computed: {
              prices: function () {
                  return this.priceA + this.priceB
              }
          }
      })
  </script>
  ```

- 计算属性都包含一个 `getter` 和 `setter` ，getter用来读取，setter用来手动修改数据

  ```javascript
  computed: {
      prices: function() {
          set: function(){
              this.priceA = 10
          },
          get: function() {
              return this.priceA + this.priceB
          }
      }
  }
  ```

- 计算属性可以依赖其他计算属性，计算属性可以依赖当前Vue实例的数据，也可以依赖其他实例的数据

  ```javascript
  <script>
      var app1 = new Vue({
          el: '#app1',
          data: {
              priceApp1: 10
          }
      });
  	var app2 = new Vue({
          el: '#app2',
          data: {
              priceApp2: 20
          },
          computed: {
              prices: function(){
                  return app1.priceApp1 + this.priceApp2
              }
          }
      });
  </script>
  ```

- 计算属性也经常用来动态传递props

### 2.2 计算属性缓存

- 计算属性是基于他依赖的缓存，一个计算属性所依赖的数据发生变化时，他才会重新取值，如果依赖的数据不发生变化，计算属性就不会更新

### 2.3 计算属性 与 methods

- 使用计算属性还是methods，取决于是否需要缓存
- 遍历大数组和做大量计算时，应当使用计算属性，除非你不希望得到缓存

## 3. 事件处理方法（methods）

### 3.1 基本使用

- methods是Vue实例的属性，内部书写函数

  ```javascript
  <div id="app">
    <button v-on:click="greet">Greet</button>
  </div>
  
  var app = new Vue({
    el: '#app',
    data: {
      name: 'Vue.js'
    },
    // 在 methods 对象中定义方法
    methods: {
      greet: function (event) {
          
        // `this` 在方法里指向当前 Vue 实例
        alert('Hello ' + this.name + '!')
          
        // `event` 是原生 DOM 事件
        if (event) {
          alert(event.target.tagName)
        }
      }
    }
  })
  
  // 也可以用 JavaScript 直接调用方法
  example2.greet() // => 'Hello Vue.js!'
  ```

### 3.2 使用参数

- ```javascript
  <div id="app">
    <button v-on:click="say('hi')">Say hi</button>
    <button v-on:click="say('what')">Say what</button>
  </div>
  
  var app = new Vue({
    el: '#app',
    methods: {
      say: function (message) {
        alert(message)
      }
    }
  })
  ```

## 4. 指令

### 4.1 v-bind

#### 4.1.1 基本使用

- v-bind的作用是动态更新HTML元素上的属性，如 id、class等

- 缩写为 `:`

  ```javascript
  <div id='app'>
      <a v-bind:href="rul"> 链接 </a>
  	<img :src="imgSrc" />
  </div>
  
  <script>
  	var app = new Vue({
          el: '#app',
          data: {
              url: 'https://www.bing.com',
              imgSrc: 'http://www.bing.com/logo.png'
          }
      })
  </script>
  ```

#### 4.1.2 绑定class的几种方式

- 对象语法

  - 给 `v-bind:class` 设置一个对象，可以动态切换 class
  - 对象中可以传入多个属性
  - `v-bind:class`可以与普通class共存

  ```javascript
  <div id='app'>
      <div class="static" :class="{ 'active': isActive, 'error': isError }" >
      </div>
  </div>
  
  <script>
  	var app = new Vue({
          el: '#app',
          data: {
              isActive: true,
              isError: false
          }
      })
  </script>
  ```

  渲染结果为：

  ```javascript
  <div class="static active" ></div>
  ```

- 使用 data 和 computed

  - 例如使用computed

    ```javascript
    <div id="app">
        <div :class="classes"></div>
    </div>
    
    <script>
    	var app = new Vue({
            el: '#app',
            data: {
                isActive: true,
                isError: false
            },
            computed: {
                classes: function(){
                    return {
                        active: this.isActive,
                        error: this.isError
                    }
                }
            }
        })
    </script>
    ```

- 数组语法

  - 需要应用多个class时，可以使用数组语法

    ```javascript
    <div id="app">
        <div :class="[activeCls, errorCls]"></div>
    </div>
    
    <script>
    	var app = new Vue({
            el: '#app',
            data: {
                activeCls: 'active',
                errorCls: 'error'
            }
        })
    </script>
    ```

  - 渲染结果

    ```javascript
    <div class="active error"></div>
    ```
    
  - 数组语法中可以配合使用对象语法
- 三元表达式

  - 可以使用三元表达式根据条件来切换class

    ```JavaScript
    <div id="app">
        <div :class="[ isActive ? activecls : '' , errorCls ]"></div>
    </div>
    
    <script>
    	var app = new Vue({
            el: '#app',
            data: {
                isActive: true,
                activeCls: 'active',
                errorCls: 'error'
            }
        })
    </script>
    ```


#### 4.1.3 绑定内联样式

- 

  ```javascript
  <div id="app">
      <div :atyle="{ 'color': color, 'fontSize': 'fontSize' + 'px' }" >测试文本</div>
  </div>
  
  <script>
  	var app = new Vue({
          el: '#app',
          data: {
              color: 'red',
              fontSize: 14
          }
      })
  </script>
  ```

- 同样可以使用对象语法和数组语法，或者使用computed与data

### 4.2 v-on

#### 4.2.1 介绍

- 缩写： `@`
- 用来绑定事件监听器
- 可以直接书写内联语句，但需要处理复杂逻辑时，最好使用methods事件处理方法

#### 4.2.2 使用

- 使用methods：

  ```javascript
  <div id="app">
      
    // `greet` 是在methods定义的方法名
    <button v-on:click="greet">Greet</button>
  
  </div>
  ```

#### 4.2.3 事件

- 在普通元素上，v-on 可以监听原生DOM事件，如 `click` 、`keyup`等

#### 4.2.4 事件修饰符

- `.stop`：阻止事件冒泡
- `.prevent`：阻止默认事件
- `.capture`：添加事件侦听器时使用 capture 模式
- `.self`：只当在 event.target 是当前元素自身时触发处理函数
- `.once`：只触发一次
- `.passive`：滚动事件的默认行为 (即滚动行为) 将会立即触发

#### 4.2.5 按键修饰符

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

#### 4.2.6 鼠标修饰符

- `.left`
- `.right`
- `.middle`

### 4.3 v-vloak

- 这个指令保持在元素上直到关联实例结束编译

- 搭配css，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕

  ```css
  [v-cloak] {
    display: none;
  }
  // css
  ```

  ```html
  <div v-cloak>
    {{ message }}
  </div>
  ```

### 4.4 v-once

- 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能

### 4.5 v-text

- 更新元素的 textContent 

  ```html
  <span v-text="msg" ></span>
  <!-- 和下面的一样 -->
  <span> {{ msg }} </span>
  ```

### 4.6 v-html

- 更新元素的 innerHtml，内容按照html插入，不会作为Vue模板编译
- 容易导致xss攻击，不建议使用

### 4.7 v-show

- 改变元素的display属性
- v-show 表达式为 false 时，元素会添加内联样式：display: none

### 4.8 v-if，v-else-if，v-else

- 根据表达式渲染或者销毁元素

#### 比较：v-if 与 v-show

- v-if会根据表达式结果来决定销毁或者重建元素，如果开始时值为false，则不会渲染元素，只有第一次值为true时才会编译
- v-show只是切换元素的display属性，无论是否为true，都会编译
- v-if适合条件不经常改变的场景，因为销毁和重建元素开销较大
- v-show适合于频繁对元素进行显示与否的切换

### 4.9 v-for

- 用于遍历数组或者枚举对象来进行循环显示

- 表达式需要结合 `in`使用

  ```javascript
  <div id="app">
      <ul>
      	<li v-for= "book in books"> {{ book.name }} </li>
      </ul>
  </div>
  
  <script>
  	var app = new Vue({
          el: '#app',
          data: {
              books: [
                  { name: 'book1'},
                  { name: 'book2'},
                  { name: 'book3'}
              ]        
          }
      })
  </script>
  ```

- 另外也可以为数组索引指定别名 (或者用于对象的键)

  ```html
  <div v-for="(item, index) in items"></div>
  <div v-for="(val, key) in object"></div>
  <div v-for="(val, name, index) in object"></div>
  ```

- `v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊属性 `key` 来提供一个排序提示

  ```html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

### 4.10 v-model

- 在表单控件或者组件上创建双向绑定

#### 4.10.1 文本

- ```javascript
  <input v-model="message" placeholder="edit me">
  <p>Message is: {{ message }}</p>
  ```

#### 4.10.2 文本域

- 

#### 4.10.3 复选框

- 

#### 4.10.4 单选按钮

- 

#### 4.10.5 复选按钮

- 

## 5. 组件

- 组件的作用是提高重用性，让代码可复用

### 5.1 组件用法

- 组件需要注册后使用，分为全局注册和局部注册

  ```javascript
  //全局注册
  // my-component就是组件名称
  Vue.component('my-component', {
      //选项
  })
  ```

- 要在父Vue实例中使用这个组件，必须要在实例创建之前注册，之后就可以使用 `<my-component></my-component>` 来使用组件了

  ```javascript
  <dvi id="app">
      <my-component></my-component>
  </div>
  
  <script>
      Vue.component('my-component', {
      	template:'<div>something</div>'
  	});
  	
  	var app = new Vue({
          el:'#app'
      })
  </script>
      
  // 组件需要在Vue实例创建前注册
  ```

- `template` 的DOM结构必须被一个元素包含，上述代码中，被一个 `< div >`元素包含