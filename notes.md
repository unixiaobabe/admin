## vue-element-admin

[vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/)是一个后台前端解决方案，它基于[vue](https://github.com/vuejs/vue)和[element-ui](https://github.com/ElemeFe/element)实现。它使用了最新的前端技术栈，内置了i18国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。

[vue-element-admin](http://panjiachen.github.io/vue-element-admin)是一个后台集成方案，集成了PC项目中很多的业务场景和功能，尤其在当下SPA的趋势下，我们可以从中获得很多成熟的解决方案

> [vue-element-admin](http://panjiachen.github.io/vue-element-admin)有一个成熟的[集成方案](https://github.com/PanJiaChen/vue-element-admin)，里面包含双蛾所有的业务功能和场景，并不适合直接拿来进行二次开发，但是可以通过该项目中的一个案例来进行学习和使用

这里是[官网地址](https://panjiachen.gitee.io/vue-element-admin-site/zh/)

这里是[线上demo地址](https://panjiachen.github.io/vue-element-admin/#/dashboard)

**注意**：当前项目下载速度如果过慢，可以直接下载代码的压缩包运行

集成方案并不适合我们直接拿来进行二次开发，[基础模版](https://github.com/PanJiaChen/vue-admin-template)则是一个更好的选择

基础模版，包含了基本的**登录/鉴权/主页布局**的一些基础功能模版，我们可以直接在该模版上进行功能的扩展和项目的二次开发

#### 基础环境搭建

**nodejs环境**

> node.js是当下前端工程化开发必不可少的环境，使用nodejs的**npm**功能来管理依赖包

查看node和npm的版本

```
node -v
npm -v
```

**git版本控制**

> git版本控制工具是目前最为流行的分布式版本管理工具，代码的**提交，检出，日志**，都需要通过git完成

查看git安装版本

```
git --version
```

**npm淘宝镜像**

> npm是非常重要的npm管理工具，由于npm的服务器位于国外，所以一般建议将npm设置成国内的淘宝镜像

设置淘宝镜像

```
npm config set registry https://registry.npm.taobao.org/ #设置淘宝镜像地址
npm config get registry #查看镜像地址
```

###### mian.js

mock模拟数据 删除项目根目录下的mock文件夹，开发不会使用模拟数据

注释vue.config.js中的代码

```
before:require('./mock/mock-server.js')
```

注释main.js中的代码

```
//注释
//if(process.env.NODE_ENV === 'production'){
// const {mockXHR} = require('../mock')
// mockXHR()
//}
```

###### permission.js

> src下，除了main.js还有两个文件，**permission.js**和**settings.js**

**permission.js**是控制页面登录权限的文件，此处的代码没有经历构建过程会很难理解，所以先将此处的代码进行注释，等我们构建权限功能时，再从0到1进行构建

**注释代码**

> **settings.js**则是对于一些项目信息的配置，里面有三个属性**title**(项目名称)，**fixedHeader**(固定头部)，**sidebarLogo**(显示在左侧菜单logo)

**settings.js**中的文件在其他的位置会因用到，所以这里暂时不去对该文件进行变动

###### Vuex结构

> 当前的Vuex结构采用了模块形式进行管理共享状态，其架构如
>
> 其中app.js模块和settings.js模块，功能已经完备，不需要在进行修改。user.js模块时我们后期需要重点开发的内容，所以这里我们将user.js里面的内容删除，并且导出一个默认配置

```
export default{
	namespaced:true,
	state:{},
	mutations:{},
	actions:{}
}
```

同时，由于getters 中引用了user中的状态，所以我们将getters中的状态改为

```
const getters = {
	sidebar:state => state.app.sidebar,
	device:state => state.app.device
}
export default getters
```

###### api/user.js

我们习惯将所有网络请求放置在api目录下统一管理，按照模块进行划分

每个接口的请求都单独**导出**了一个方法，这样做的好处就是在任何位置需要请求的话，可以直接引用我们导出的请求方法

为了后续更好的开发，先将user.js代码的方法设置为空，后续再进行更正

```
import request from '@/utils/request'

export function login(data) {

}

export function getInfo(token) {

}

export function logout() {

}
```

###### utils/request.js

为了后续更清楚的书写代码，将原有代码删掉，换成如下代码

```
import axios from 'axios'

const service = axios.create()


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service
```

###### 图片资源

> 课程资料的图片文件中，将**common**文件夹拷贝放置到**assets**目录即可

###### 样式资源

> 资源/样式目录下

修改**variables.scss**

新增**common.scss**

我们在**variables.scss**添加了一些基础的变量值

我们提供了一份公共的**common.scss**样式，里面内置了一部分内容的样式，在开发期间可以帮助我们快速的实现页面样式和布局

将两个文件放置到**styles**目录下，然后在**index.scss**中引入该样式

```
@import './common.scss';  //引入common.scss样式表
```

###### 提交代码

**注意**：在scss文件中，通过**@import**引入其他样式文件，需要注意最后加分好，否则会报错

#### 登录模块

##### 设置固定的本地访问端口和网站名称

在正式开发业务之前，先将项目的**本地端口**和**网络名称**进行一下调整

**本地服务端口**：在**vue.config.js**中进行设置

**vue.config.js**就是vue项目相关的编译，配置，打包，启动服务相关的配置文件，它的核心在于**webpack**，但是又不同于webpack，相当于改良版的webpack，[文档地址](https://cli.vuejs.org/zh/)

在项目下，有**.env.development**和**.env.production**两个文件

development => 开发环境

production => 生产环境

运行**npm run dev**进行开发调试的时候，此时会加载执行**.env.development**文件内容

运行**npm run build:prod**进行生产环境打包的时候，会加载执行**.env.production**文件内容

如果想要设置开发环境的接口，直接在**.env.development**中写入对于port变量的赋值即可

```
#设置端口号
port = 8888
```

**注意**：修改服务的配置文件，想要生效的话，必须重新启动服务，值8888后面不能留有空格

**网站名称**：实际在**configureWebpack**选项中的**name**选项，通过阅读代码，我们会发现name实际上来源于src目录下

**settings.js**文件：可以将网站名称改成**后台资源管理平台**

##### 页面基本布局

要实现页面效果，可以直接将当前的登录页面进行相应的改造

**设置头部背景**

```vue
<div class="title-container">
	<h3 class="title">
		后台资源管理系统
	</h3>
</div>
```

**注意**：@是我们在vue.config.js中设置的一个路径别名，指定src根目录，这样可以很方便的寻找文件

**设置背景图片**

```css
.login-container{
  background-image:url('~@/assets/common/login.jpg'); //设置背景图片
  background-position:center;//将图片位置设置为充满整个屏幕
}
```

**注意**：如需要在样式表中使用**@**别名的时候，需要在@前面加上一个**～**符号，否则不识别

**设置手机号和密码的字体颜色**

```css
$light_gray:#68b0fe;
```

**设置输入表单整体背景色**

```css
.el-form-item{
  border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.7); //输入登录表单的背景色
  border-radius:5px;
  color:#454545;
}
```

**设置错误信息的颜色**

```css
.el-form-item__error{
  color:#fff;
}
```

**设置登录按钮的样式**

> 需要给el-button增加一个loginBtn的class样式

```css
.loginBtn{
  background:#407ffe;
  height:64px;
  line-height:64px;
  font-size:24px;
}
```

**修改显示的提示文本和登录文本**

```html
<div class="tips">
  <span style="margin-right:20px">账号：13800000000</span>
  <span>密码：123456</span>
</div>
```

##### 登录表单的校验

> 基础模版已经有了基础校验的代码，所以要做的是修正和完善

**字段名对应**

> 基础模版采用的是**username**的字段，但是实际接口中采用的是**mobile**的字段，为了更方便的写代码，我们将**username**改成**mobile**

这里除了字段名，还有我们的规则校验名称，以及prop名称

**英文提示变成中文**

基础模版中都是**placeholder**占位符是英文，要变成中文

登录按钮文字同样需要换成中文

**校验手机号和校验密码**

基础模版中，已经做了校验，我们针对代码进行一些优化

新规则：手机号必填，并且进行格式校验，密码必填，长度6-16位之间

```js
data(){
  //自定义校验函数
  const validateMobile = function(rule,value,callback){
    //校验value
    //if(validMobile(value)){
    //	//如果通过 直接执行callback
    //	callback()
    //}else{
    //	callback(new Error('手机号格式不正确'))
    //}
    validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
  }
  
  return {
    loginForm:{
      mobile:'13800000000',
      password:'123456'
    },
    loginRules:{
      mobile:[
        {required:true,trigger:'blur',message:'手机号不能为空'},
        {validator:validateMobile,trigger:'blur'}
      ],
      password:[
        {required:true,trigger:'blur',message:'密码不能为空'},
        {min:6,max:16,message:'密码的长度在6-16位之间',trigger:'blur'}
      ]
    },
    loading:false,
    passwordType:'password',
    redirect:undefined
  }
}
```

在**utils/validate.js**方法中增加了一个校验手机号的方法

```js
//校验手机号
export function validMobile(str){
  return /^1[3-9]\d{9}$/.test(str) //校验手机号
}
```

**utils/validate.js**是一个专门存放校验工具方法的文件

**修饰符**

> 在页面中存在事件的修饰符**@keyup.enter.native** 和**@click.native.prevent**

@keyup.**enter**属于按键修饰符，如果我们想坚挺在按回车键的时候触发，可以如下编写

```vue
<input v-on:keyup.enter="submit">
```

@keyup.**native**表示监听组件的原生事件，比如keyup就是于input的原生事件，这里写native表示keyup是一个原生事件

##### 封装登录接口

api/user.js

```
import request from '@utils/request'
export function login(data){
	//返回一个axios对象
	return request({
		url:'/sys/login',
		method:'post',
		data
	})
}
```

##### 封装vuex的登录的action并处理token

调用登录接口，成功设置token到vuex，失败则返回失败

```
const actions = {x
	//定义login action调用登录请求，接收参数data(mobile,password)
	login({commit},data){
		return new Promise(function(resolve){
			login(data).then(res => {
				if(res.data.success){
					commit('setToken',result.data.data)
					resolve() //表示执行成功了
				}
			})
		})
	}
}
```

使用async/await语法写第二种

```
const actions = {
	//定义login action调用登录请求，接收参数data(mobile,password)
	async login({commit},data){
		const result = await login(data) //就是一个promise result就是执行的结果
		//axios默认给数据加了一层data
		if(result.data.success){
			//登录接口调用成功 意味着用户名和密码是正确的
			//还返回了token == result.data.data
			//通过commit修改了state中的token
			commit('setToken',result.data.data)
		}
	}
}
```

###### 修改token的mutations

```
const state = getDefaultState()

const mutations = {
	//设置token
	setToken(state,token){
		state.token = token //设置token
	},
	//删除token
	removeToken(state){
		state.token = null //删除vuex中的token
	}
}
```

###### token要存储到本地

在utils/auth.js，提供了获取本地token，token设置到本地，删除本地token

```
//token存储到本地
const Tokenkey = 'hrsass-token' //设定一个独一无二的key

export function getToken(){
	return localStorage.getItem(Tokenkey)
}

export function setToken(token){
	return localStorage.setItem(Tokenkey,token)
}

export function removeToken(){
	return localStorage.removeItem(Tokenkey)
}
```

###### store/module/user.js把vuex中的token存储到缓存(本地)

```
import {getToken,setToken,removeToken} from '@/utils/auth'
import {login} from '@/api/user'
//state
const getDefaultState = () => {
	return {
		//token:null, //token状态共享
		//token从缓存中读取
		token:getToken()
	}
}

const state = getDefaultState()

const mutataions = {
	//设置token
	setToken(state,token){
		state.token = token //设置token
		//vuex变化 => 缓存token数据
		setToken(token)
	},
	//删除token
	removeToken(state){
		state.token = null //删除vuex中的token
		//清除缓存
		removeToken()
	}
}
```

###### getters中获取token

为了更好的让其他模块和组件能共享token数据，我们在store/getters.js中将token作为公共的属性访问

```
const getters = {
	sidebar:state => state.app.sidebar,
	device:state => state.app.device,
	//在根级的getters上
	token:state => state.user.token
}
export default getters
```

##### request中环境变量和异常的处理

###### 开发环境的基地址

环境变量

```
process.env.NODE_ENV
获取是开发环境还是生产环境，值为production是生产环境，为development是开发环境
```

文件

```
.env.production 生产环境
.env.development 开发环境
```

更改.env.development

```
#该变量作为axios请求的baseURL
VUE_APP_BASE_API= '/api'
```

request.js中设置baseURL

```
const service = axios.create({
	//npm run dev 值为/api开发环境
	//npm run build 值为/prod-api 生产环境
	baseURL:process.env.VUE_APP_BASE_API,
	timeout:5000 //定义5秒超时
})
```

##### 处理axios的响应拦截器

axios返回的数据中默认增加了一层data

```
import {Message} from 'element-ui'
//添加响应拦截器
service.interceptors.response.user(function(response){ //响应成功
	//对响应数据做什么
	//response就是响应的数据 多加了一层data
	const {success,message,data} = response.data
	//根据success的成功与否来进行操作
	if(success){
		return data
	}else {
		//提示错误信息 把每一个请求对错误数据的处理都统一写到这里
		//element-ui的message提示
		Message.error(message)
		return Promise.reject(new Error(message)) //让当前的执行跳出 直接进入catch
	}
}，function(error){//响应失败
	//对响应错误做点什么
	Message.error(error.message) //错误提示
	return Promise.reject(error)
})
```

修改登录的action

```
const actions = {
	//定义login action调用登录请求，接收参数data(mobile,password)
	async login({commit},data){
		const result = await login(data) //就是一个promise result就是执行的结果
		//axios默认给数据加了一层data
		//if(result.data.success){
			//登录接口调用成功 意味着用户名和密码是正确的
			//还返回了token == result.data.data
			//通过commit修改state中的token
			//commit('setToken',result.data.data)
		//}
		
		commit('setToken',result)
	}
}
```

##### 登录页面调用action

###### 引入action views/login/index.vue

```
import {mapActions} from 'vuex'
methods:{
	...mapActions(['user/login'])
}
```

###### 点击登录按钮调用action

```
handleLogin(){
	this.$refs.loginForm.validate(async(isOk) => {
		if(isOk){
			//验证成功
			//1调用actions的方法传递手机号和密码
			await this['user/login'](this.loginForm)
		}else{
			//验证失败
			console.log('error submit!!')
			return false
		}
	})
}
```

##### 登录处理

```
handleLogin(){
	this.$refs.loginForm.validate(async(isOk) => {
		if(isOk){
			//验证成功
			//异常处理
			try{
				this.loading = true;
				//1调用actions的方法传递手机号和密码
				await this['user/login'](this.loginForm);
				//跳转
				this.$router.push('/')
			}catch(error){
				console.log(error)
			}finally{
				//不论执行try还是catch都是执行这里
				this.loading= false
			}
		}else {
			//验证失败
			console.log('error submit!!');
			return false;
		}
	})
}
```

#### 主页

##### token拦截处理

代码premission.js 是专门处理路由权限的

> 访问权限拦截先判断是否有token
>
> ​	有：判断是否是登录页面
>
> ​		是：跳转到主页
>
> ​		否：next通行
>
> ​	没有：判断是否在白名单里（白名单：不需要token的页面）
>
> ​		是：next通行
>
> ​		否：跳转到登录页面

```
//路由守卫
import router from '@/router'
import store from '@/store'
//引入进度条插件
import Nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

//定义白名单
const whiteList = ['login','/404']

//全局前置钩子
router.beforeEach(function(to,from,next){
	console.log('beforeEach')
	Nprogress.start()
	//先判断是否有token
	if(store.getters.token){
		//有token继续判读是不是去登录页面
		if(to.path === '/login'){
			//跳到主页
			next('/')
		}else{
			next() //直接通行
		}
	}else{
		//没有token
		//判断是否在白名单中
		if(whiteList.indexOf(to.path) > -1){
			//存在于白名单
			next()
		}else{
			next('/login') //跳到登录页
		}
	}
	Nprogress.done()
})

//全局后置钩子
router.afterEach(function(to,from){
	console.log('afterEach')
	Nprogress.done() //关闭进度条
})
```

##### 设置左侧导航样式

```css
.scrollbar-wrapper{
  overflow-x:hidden !important;
  background:url('~@/assets/common/leftnavBg.png') no-repeat 0 100%;
}

.sidebar-container{
  //渐变颜色
  background:linear-gradient(bottom, #3d6df8,#5b8cff);
}
```

###### 菜单选中颜色

```scss
.el-menu{
  border:none;
  height:100%;
  width:100% !important;
  a{
    li{
      .svg-icon{
        color:#fff;
        font-size:18px;
        vertical-align:middle;
      }
      span{
        color:#fff;
      }
      &:hover{
        .svg-icon{
          color:#3d6df8;
        }
        span{
          color:#3d6df8;
        }
      }
    }
  }
}
```

###### 显示左侧logo图片

src/settings.js

```js
module.export = {
  //项目名称
  title:'资源后台管理系统',
  
  //固定头部
  fixedHeader:false,
  
  //显示左侧菜单logo
  sidebarLogo:true
}
```

- 去掉logo背景色

```scss
.sidebar-logo-container{
  position:relative;
  width:100%;
  height:50px;
  line-height:50px;
  //background:#2b2f3a;
  text-align:center;
  overflow:hidden;
}
```

- 设置logo图片样式

```scss
&.collapse{
  //小图样式
  .sidebar-logo{
    margin-right:0px;
    width:32px;
    height:32px;
  }
}
.sidebar-logo{
  margin-right:12px;
  width:140px;
  vertical-align:middle;
}
```

- 更改logo.vue

```vue
<template>
	<div class="sidebar-logo-container" :class="{collapse:collapse}">
    <transition name="sidebarLogoFade">
  		<router-link key="collapse" class="sidebar-logo-link" to="/">
 				<img src="@/assets/common/logo.png" class="sidebar-logo" />
  		</router-link>
   	</transition>
  </div>
</template>
```

##### 设置头部样式

###### 添加公司名称，注释面包屑

```html
<div class="breadcrumb">
  xxxxxx
  <span class="breadBtn">体验版</span>
</div>
<!--<breadcrumb class="breadcrumb-container" />-->
```

样式

```scss
.app-breadcrumb{
  display:inline-block;
  font-size:18px;
  line-height:50px;
  margin-left:10px;
  color:#fff;
  .breadBtn{
    background-color:#84a9fe;
    font-size:14px;
    padding:0 10px;
    display:inline-block;
    height:30px;
    line-height:30px;
    border-radius:10px;
    margin-left:15px;;
  }
}

.navbar{
  background:linear-gradient(left,#3d6df8,#5b8cff)
}
```

###### 组件图标样式

components/Hamburger/index.vue

```vue
<svg
     :class="{'is-active':isActive}"
     class="hamburger"
     viewBox="0 0 1024 1024"
     xmlns="http://www.w3.org/2000/svg"
     width="64"
     height="64"
     fill="#fff"
></svg>
```

###### 头像和下拉菜单

```scss
.user-avatar{
  cursor:pointer;
  width:30px;
  height:30px;
  border-radius:15px;
  vertical-align:middle;
}
.name{
  color:#fff;
  vertical-align:middle;
  margin-left:5px;
}
.user-dropdown{
  color:#fff;
}
```

```vue
<el-dropdown class="avatar-container" trigger="click">
	<div class="avatar-wraper">
    <img
         src="@/assets/common/bigUserHeader.png"
         class="user-avatar"
         alt=""
    />
    <span class="name">管理员</span>
    <i class="el-icon-caret-bottom" style="color:#fff" />
  </div>
  <el-dropdown-menu slot="dropdown" class="user-dropdown">
  	<router-link to="/">
    	<el-dropdown-item>首页</el-dropdown-item>
    </router-link>
    <a
       target="_blank"
       href="https://github.com/PanJiaChen/vue-admin-template/"
    >
    	<el-dropdown-item>项目地址</el-dropdown-item>
    </a>
    <el-dropdown-item divided @click.native="logout">
    	<span style="display:block">退出</span>
    </el-dropdown-item>                
  </el-dropdown-menu>
</el-dropdown>
```

##### 获取用户资料

###### 获取用户资料接口

src/api/user

```js
export function getUserInfo(data){
  return request({
    url:'/sys/profile',
    method:'post',
    data
  })
}
```

###### 请求头上设置token

> 请求要携带token

src/utils/request.js

```js
//添加请求拦截器
request.interceptors.request.use(function(config){
  if(store.getters.token){
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  
  return config;
},function(error){
  return Promise.reject(error);
})
```

###### 封装获取用户资料的action

```js
async getUserInfo({commit}){
  const res = await getUserInfo()
  commit('setUserInfo',res)
  return res
}
```

设置state

```js
const getDefaultState = () => {
  return {
    token:getToken(),
    userInfo:{}
  }
}
```

mutations方法--设置和删除用户资料

```js
const mutations = {
  setUserInfo(state, userinfo){
    state.userInfo = {...userinfo}
  },
  removeUserInfo(state){
    state.userInfo = {}
  }
}
```

getters中读取name

```js
const getters = {
  sidebar:state => state.app.sidebar,
  device:state => state.app.device,
  token: state => state.user.token,
  name:state => state.user.userInfo.username
}
export default getters
```

什么时候调用获取用户信息的actions方法

路由权限中调用获取用户信息的方法

```js
//全局前置钩子
router.beforeEach(function(to,from,next){
	console.log('beforeEach')
	Nprogress.start()
	//先判断是否有token
	if(store.getters.token){
		//有token继续判读是不是去登录页面
		if(to.path === '/login'){
			//跳到主页
			next('/')
		}else{
      //调用用户信息的action方法
      if(!store.state.user.userInfo.userId){
        await store.dispatch('user/getUserInfo')
      }
      
			next() //直接通行
		}
	}else{
		//没有token
		//判断是否在白名单中
		if(whiteList.indexOf(to.path) > -1){
			//存在于白名单
			next()
		}else{
			next('/login') //跳到登录页
		}
	}
	Nprogress.done()
})
```

###### 获取头像接口合并数据

> 通过另一个接口获取头像并把头像合并到当前的用户资料中

封装获取头像接口

```js
export function getUserDetailById(id){
  return request({
    url:`/sys/user/${id}`,
  })
}
```

获取用户资料token

添加获取头像的请求

```js
async getUserInfo({commit}){
  const res = await getUserInfo()
  const baseInfo = await getUserDetailById(res.userId)
  
  const baseResult = {...res,...baseInfo}
  commit('setUserInfo',baseResult)
  return res
}
```

getters.js获取

```js
const getters = {
  sidebar:state => state.app.sidebar,
  device:state => state.app.device,
  token: state => state.user.token,
  name:state => state.user.userInfo.username,
  staffPhoto:state => state.user.userInfo.staffPhoto
}
```

Navbar.vue

```vue
<div class="right-menu">
  <el-dropdown class="avatar-container" trigger="click">
	<div class="avatar-wrapper">
    <img
         :src="staffPhoto"
         class="user-avatar"
         alt=""
    />
    <span class="name">{{name}}</span>
    <i class="el-icon-caret-bottom" style="color:#fff" />
  </div>
  <el-dropdown-menu slot="dropdown" class="user-dropdown">
  	<router-link to="/">
    	<el-dropdown-item>首页</el-dropdown-item>
    </router-link>
    <a
       target="_blank"
       href="https://github.com/PanJiaChen/vue-admin-template/"
    >
    	<el-dropdown-item>项目地址</el-dropdown-item>
    </a>
    <el-dropdown-item divided @click.native="logout">
    	<span style="display:block">退出</span>
    </el-dropdown-item>                
  </el-dropdown-menu>
</el-dropdown>
</div>
```

###### 自定义指令处理图片异常

```
Vue.directive('指令名称',{
	inserted:function(dom,options){
	}
})
```

采用统一的文件管理src/directives/index.js

用来管理所有的自定义指令

```js
//管理自定义指令
export const imgerror = {
  //指令对象 会在当前的dom元素插入到节点之后执行
  inserted(el,options){
    //el:指令所绑定的元素，可以用来直接操作DOM
    //options options.value 指令的绑定值
    //console.log(123)
    //el图片
    //当图片有地址，但是地址没有加载成功的时候，会报错
    //就会触发图片的一个事件 === onerror
    el.onerror = function(){
      //图片异常的时候，会将指令配置的默认图片设置为图片的内容
      el.src = options.value
    }
  }
}
```

main.js中完成自定义指令的全局注册

```js
import * as directives from '@/directives'
//遍历所有的导出的指令对象，完成自定义指令的全局注册
Object.keys(directives).forEach(key => {
  console.log(key,'key')
  Vue.directive(key,directives[key])
})
```

语法：import * as 变量 得到的是一个对象{变量1:对象1，变量2:对象2}

指令注册成功，组件中使用

```vue
<img
     v-imgerror="defaultImg"
     :src="staffPhoto"
     class="user-avatar"
     alt=""
/>
```

```js
data(){
  return {
    defaultImg:require('@/assets/common/head.jpg')
  }
}
```

##### 实现退出功能

> 删除用户token，删除用户资料，跳转到登录页面

vuex的user.js的action中定义登出 方法

```vue
loginout({commit}){
	commit('removeToken')
	commit('removeUserInfo')
}
```

组件中调用action方法

```js
import {mapGetters, createNamespacedHelpers} from 'vuex'
const {mapActions} = createNamespacedHelpers('user')
methods:{
  ...mapActions(['loginout']),
    logout(){
    this.loginout()
    this.$router.push('/login')
  }
}
```

##### Token失效的主动介入

> 前端处理token失效

用户登录成功，获取token注入的时间戳，用户发起请求判断时间戳是否超时，超时则退出登录，否则继续请求

src/utils/auth.js

```js
import Coookies from 'js-cookie'
const TimeKey = 'hrsass-timestamp'

export function getTimeStamp(){
  return Cookies.get(TimeKey)
}

export function setTimeStamp(){
  return Cookies.set(TimeKey,Date.now())
}
```

登录成功，获取token，存储当前时间戳

store/user.js

```js
const actions = {
  async login({commit},data){
    const result = await login(data)
    commit('setToken',result)
    setTimeStamp()
  }
}
```

注入token，检查时间戳，请求拦截中有token才有必要检查token失效

```js
import axios from 'axios'
import {Message} from 'elelment-ui'
import store from '@/store'
import router from '@/router'
import {getTimeStamp} from '@/utils/auth'

//定义超时时间
const TimeOut = 3
const service = axios.create({
  baseURL:process.evn.VUE_APP_BASE_API,
  timeout:5000
})
service.interceptors.request.use(function(config){
  if(store.getters.token){
    if(IsCheckTimeOut()){
      store.dispatch('user/loginout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
},function(error){
  return Promise.reject(error)
})

function IsCheckTimeOut(){
  var currentTime = Date.now()
  var timeStamp = getTimeStamp()
  return (currentTime-timeStamp)/1000>TimeOut
}

export default service
```

##### Token失效的被动处理

token超时的错误码是10002

响应拦截中统一处理token

```js
service.interceptors.response.use(function (response) {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function (error) {
  if(error.response&&error.response.data&&error.response.data.code===10002){
    store.dispatch('user/loginout')
    router.push('/login')
  }else{
    Message.error(error.message)
  }
  return Promise.reject(error);
});
```

#### 路由

```
因为中后台项目的页面比较多，不可能把所有的业务都集中在一个文件上进行管理和维护，前端的页面分为两部分，一部分是所有人都可以访问的（静态路由），一部分是只有有权限的人才可以访问（动态路由），拆分成多个模块进行管理
```

删除模版中附带的多余的页面

```js
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
```

删除多余的路由组件

删除api/table.js

##### 重新创建页面和路由文件

```
employees employees salarys social attendances approvals permission departments setting
dashboard 首页
404
login

departments 组织架构
employees 员工
setting 公司设置
salarys 工资
social 社保
attendances 考勤
approvals 审批
permission 权限管理
```

快速新建文件夹 使用git

```git
mkdir employees salarys social attendances approvals permission departments setting
```

每个模块下定义内容 index.vue

```vue
<template>
  <div class="dashboard-container">
    <div class="app-container">审批</div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>

</style>
```

##### 路由模块目录结构

rotuer下新建文件夹modules，创建路由模块

快速创建文件命令

```
touch employees.js salarys.js social.js attendances.js approvals.js permission.js departments.js setting.js
```

##### 设置每个路由模块的路由规则

```js
import Layout from '@/layout'

export default {
    path:'/attendances',
    name:'attendances',
    component:Layout,
    children:[
        {
            path:'',
            component:() => import('@/views/attendances'),
            meta:{
                title:'考勤'
            }
        }
    ]
}
```

##### 静态路由和动态路由临时合并

router/index.js

```js
import approvalsRouter from './modules/approvals'
import attendancesRouter from './modules/attendances'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'


export const asyncRoutes = [
  approvalsRouter,
  attendancesRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  salarysRouter,
  settingRouter,
  socialRouter
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...asyncRoutes,...constantRoutes]
})
```

##### 设置左侧菜单的图标

项目不需要二级菜单，把二级菜单注释

layout/components/Sidebar/SidebarItem.vue

```vue
<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu> -->
  </div>
</template>
```

注意：路由中的属性hidden为true时，路由不显示在左侧菜单中---动态路由菜单

Item.vue是一个函数式组件，函数式组件没有data状态，没有响应式数据，只会接收props属性，没有this就是一个函数

```
functional:true,表示是一个函数式组件
```

##### 设置图标

把资料中的菜单svg里的svg文件放到src/icons/svg目录下

设置模块对应的icon

```
departments tree
employees people
setting setting
salarys money
social table
attendances skill
approvals tree-table
permission lock
```

```
meta:{
	title:'社保',
	icon:'table'
}
```

#### 组织架构

```
丁鹿学堂教育有限公司
	总经办
	行政部
	人事部
	财务部
		出纳
		核算
	技术部
		java
		前端
		大数据
	市场部
		北京市场
		山西市场
		广州市场
```

##### 头部布局

```vue
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <el-row
        type="flex"
        justify="space-between"
        align="middle"
        style="height:40px"
        >
          <el-col>
            <span>丁鹿学堂教育有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>操作<i class="el-icon-arrow-down"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.tree-card{
  padding:30px 140px;
  font-size:14px;
}
</style>
```

##### 树形组件

el-tree

```
data	展示数据	array
default-expand-all	是否默认展开所有节点	boolean	—	false
node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的	String
props	配置选项，具体看下表	object
```

props

```
label	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
children	指定子树为节点对象的某个属性值	string	—	—
disabled	指定节点选择框是否禁用为节点对象的某个属性值	boolean, function(data, node)	—	—
isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	boolean, function(data, node)
```

###### 静态数据组织架构

```vue
<el-tree :data="departs" :props="defaultProps"></el-tree>
<script>
export default {
  data() {
    return {
      defaultProps: {
        label:'name'
      },
      departs:[
        {
          name:'总经办',
          manager:'张三',
          children:[
            {
              name:'董事会',manager:'张三'
            },
            {
              name:'董事会',manager:'张三'
            }
          ]
        },
        {
          name:'行政部',
          manager:'张三',
          children:[
            {
              name:'董事会',manager:'张三'
            }
          ]
        },
        {
          name:'人事部',
          manager:'张三'
        },
      ]
    }
  },
};
</script>
```

###### 插槽

```vue
<el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <el-row
          type="flex"
          justify="space-between"
          slot-scope="{data}"
          align="middle"
          style="height:40px;width:100%">
            <el-col :span="20">
              <span>{{data.name}}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{data.manager}}</el-col>
                <el-col>
                  <el-dropdown>
                    <span>操作<i class="el-icon-arrow-down"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
```

###### 将树形的操作内容单独抽离成组件

src/views/departments/components/tree-tools.vue

```
<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col :span="20">
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span>操作<i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item>编辑部门</el-dropdown-item>
              <el-dropdown-item>删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeNode: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped>
</style>
```

###### 使用组件

```vue
<el-card class="tree-card">
        <tree-tools :tree-node="company" :isRoot="true"></tree-tools>
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{data}" :tree-node="data"></tree-tools>
        </el-tree>
      </el-card>
```

新增一个属性isRoot来控制删除部门和编辑部门

```
  props: {
    treeNode: {
      type: Object,
      require: true,
    },
    isRoot:{
        type:Boolean,
        default:false
    }
  },
```

```
<el-dropdown-item>添加子部门</el-dropdown-item>
<el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
<el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
```

使用tree-tools组件传递isRoot

```
<tree-tools :tree-node="company" :isRoot="true"></tree-tools>
```

##### 获取数据

###### 封装api接口 获取组织架构数据

src/api/departments.js

```
import request from '@/utils/request'

export function getDepartments() {
    return request({
        url: '/company/department'
    })
}
```

组件中获取数据

```vue
<script>
import treeTools from './components/tree-tools.vue';
import {getDepartments} from '@/api/departments'
export default {
  components: { treeTools },
  data() {
    return {
      company:{
        name:"丁鹿学堂组织架构",
        manager:'负责人'
      },
      defaultProps: {
        label:'name'
      },
      departs:[]
    }
  },
  created(){
    this.getDepartments()
  },
  methods:{
    async getDepartments(){
      let res = await getDepartments()
      this.departs = res.depts
    }
  }
};
</script>
```

###### 将数组数据转化为属性结构

公共方法 src/utils/index.js

```js
export function tranListToTreeData(list,rootValue){
  var arr = []
  list.forEach(item => {
    if(item.pid === rootValue){
      let children = tranListToTreeData(list,item.id)
      if(children.length){
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}
```

调用方法，转化树形结构

```
this.departs = tranListToTreeData(res.depts,"")
```

##### 删除

###### 封装删除接口，注册事件

封装删除功能模块 src/api/departments.js

```js
export function delDepartments(id){
    return request({
        url: `/company/department/${id}`,
        method:'delete'
    })
}
```

###### 在tree-tools组件中，监听下拉菜单的点击事件

src/views/deparments/components/tree-tools.vue

```vue
					<el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
```

```js
    operateDepts(type){
        if(type === 'add'){

        }else if(type === 'edit'){

        }else if(type === 'del'){
            this.$confirm('')
        }
    }
```

###### 调用删除接口，通知父组件更新数据

> 删除之前，提示用户是否删除，然后调用删除接口

```js
operateDepts(type){
        if(type === 'add'){

        }else if(type === 'edit'){

        }else if(type === 'del'){
            this.$confirm('确定要删除该部门吗？')
            .then(() => {
              console.log("del",this.treeNode);
              return delDepartments(this.treeNode.id)
            })
            .catch(() => {
              this.$message({
                type:"info",
                message:'已取消删除'
              })
            })
        }
    }
```

上述代码成功的删除了员工数据，但是怎么通知父组件进行数据更新

```
            this.$confirm('确定要删除该部门吗？')
            .then(() => {
              console.log("del",this.treeNode);
              return delDepartments(this.treeNode.id)
            })
            .then(() => {
              this.$emit('delDepts')
              this.$message.success('删除部门成功')

            })
            .catch(() => {
              this.$message({
                type:"info",
                message:'已取消删除'
              })
            })
```

```
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
          ></tree-tools>
```

##### 新增

###### 封装新增接口

```
export function addDepartments(data){
    return request({
        url: `/company/department`,
        method:'post',
        data
    })
}
```

###### 新增组件弹窗

src/views/departments/components/add-dept.vue

```
<template>
  <el-dialog title="新增部门">
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width: 80%" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门编号">
        <el-input style="width: 80%" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width: 80%" placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width: 80%" placeholder="1-300个字符" type="textarea"></el-input>
      </el-form-item>
    </el-form>

    <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
            <el-button type="primary" size="small">确定</el-button>
            <el-button size="small">取消</el-button>
        </el-col>
    </el-row>
  </el-dialog>
</template>
```

###### 点击新增子部门显示弹窗组件

接收控制组件显示隐藏的属性

```
export default {
    props:{
        showDialog:{
            type:Boolean,
            default:true
        }
    }
};
```

```
<el-dialog title="新增部门" :visible.sync="showDialog">
```

departments/index.vue中引入弹窗组件

```
import AddDepts from './components/add-depts.vue';
components: {  AddDepts },
```

定义弹窗组件显示的showDialog

```
data() {
    return {
      showDialog:false,
    }
}
```

```
<add-depts :show-dialog="showDialog"></add-depts>
```

点击新增部门，弹出组件add-depts.vue

```
if(type === 'add'){
	this.$emit('addDepts',this.treeNode)
}
```

父组件监听事件

```
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
          ></tree-tools>
```

addDepts方法中弹窗显示，记录在哪个节点下添加子部门

```
    addDepts(node) {
      this.showDialog = true;
      this.node = node
    },
```

###### 新增部门校验

```
			formData: {
        code: "",
        introduce: "",
        manager: "",
        name: "",
      },
      rules: {
        name: [
          { require: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
        ],
        code:[
            {require:true,message:'部门编号不能为空',trigger:'blur'},
            {
                min:1,
                max:50,
                message:'部门编号要求1-50个字符',
                trigger:'blur'
            }
        ],
        introduce:[
            {require:true,message:'部门介绍不能为空',trigger:'blur'},
            {min:1,max:300,message:'部门介绍要求1-300个字符',trigger:'blur'}
        ]
      },
```

###### 部门名称和部门编码的自定义校验

部门名称不能和同级别的名称重复

```
    const checkNameRepeat = async (rules,value,callback) => {
        const {depts} = await getDepartments()
        const isRepeat = depts
        .filter(item => item.pid === this.treeNode.id)
        .some(item => item.name === value)
        isRepeat ? callback(new Error(`同级部门下已经存在这个${value}部门了`)) : callback()
    }
    const checkCodeRepeat = async (rules,value,callback) => {
        const {depts} = await getDepartments()
        const isRepeat = depts
        .some(item => item.code === value && value)
        isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码了`)) : callback()
    }
```

###### 处理首部内容的pid数据

在根级的tree-tools组件中，treenode属性中没有id，所以添加id，值为""

```
data() {
    return {
      showDialog: false,
      company: {
        name: "丁鹿学堂组织架构",
        manager: "负责人",
        id:""
      },
    }
}
```

###### 部门负责人数据

api

```
export function getEmployeeSimple(){
    return request({
        url: `/sys/user/simple`,
    })
}
```

获取员工列表 add-dept.vue select获焦事件focus中调用接口

```
       <el-select
          style="width: 80%"
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
          v-for="item in peoples"
          :key="item.id"
          :value="item.username"
          :label="item.username"></el-option>
        </el-select>
```

```
peoples:[],

  methods: {
    async getEmployeeSimple() {
      let res = await getEmployeeSimple()
      console.log(res);
      this.peoples = res
    }
  },
```

###### 新增功能

给el-form定义ref属性

```
<el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
```

新增功能

```
    submitForm(formName){
      this.$refs[formName].validate(async (isOk) => {
        if(isOk){
          await addDepartments({...this.formData,pid:this.treeNode.id})
          this.$emit('addDepts')
        }else{
          console.log('error submit!');
          return false
        }
      })
    }
```

###### sync修饰符关闭弹窗

旧语法

```
this.$emit('changeDialog',false)

<add-depts :show-dialog="showDialog" @changeDialog="getDialog" :tree-node="node"></add-depts>

    getDialog(value){
      this.showDialog = value
    }
```

vue给我们提供了sync修饰符，它提供了一种简写模式

```
this.$emit('update:showDialog',false)

<add-depts :show-dialog.sync="showDialog" :tree-node="node"></add-depts>
```

###### 取消时重置数据和校验

```
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.$emit('update:showDialog',false)
    },
```

##### 编辑

###### 点击编辑弹出层

> 编辑部门功能和新增窗体采用的是一个组件

点击编辑部门，调用父组件的编辑的方法

```
this.$emit('editDepts',this.treeNode)
```

父组件弹层，赋值当前编辑节点

```
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          ></tree-tools>
```

```
    editDepts(node){
      this.showDialog = true
      this.node = node
    },
```

封装api接口获取部门详情信息

```
export function getDepartDetail(id){
    return request({
        url: `company/department/${id}`,
    })
}
```

再调用编辑方法editDepts中通过ref调用ad-dept.vue的实例方法

```
    editDepts(node){
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    },
```

add-dept.vue中定义实例方法 getDepartDetail(id)

```
    async getDepartDetail(id){
      this.formData = await getDepartDetail(id)
    },
```

###### 根据计算属性显示控制标题

> 新增时formData数据中没有id，编辑给formData赋值就有id，根据有没有id来判断时新增还是编辑

```
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门' 
    }
  },
  
  <el-dialog :title="showTitle" :visible.sync="showDialog">
```

发现resetFields不能重置非表单中的数据，在取消的位置强制加上重置数据

```
    resetForm(formName){
      this.formData = {
        code: "",
        introduce: "",
        manager: "",
        name: "",
      }
      this.$refs[formName].resetFields()
      this.$emit('update:showDialog',false)
    },
```

###### 同时支持编辑和新增场景

封装编辑接口

```js
export function updateDepartments(data){
    return request({
        url: `company/department/${data.id}`,
        method:'put',
        data
    })
}
```

点击确定时，场景区分

```
    submitForm(formName){
      this.$refs[formName].validate(async (isOk) => {
        if(isOk){
          if(this.formData.id){
            await updateDepartments(this.formData)
          }else{
            await addDepartments({...this.formData,pid:this.treeNode.id})
          }
          
          this.$emit('addDepts')
          this.$emit('update:showDialog',false)
          this.formData = {
            code:"",
            introduce:"",
            manager:"",
            name:""
          }
        }else{
          console.log('error submit!');
          return false
        }
      })
    }
```

###### 校验规则支持编辑场景

> 发现原来的校验规则和编辑部门有冲突，需要进一步处理

```
    const checkNameRepeat = async (rules, value, callback) => {
      const { depts } = await getDepartments();
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id!==this.formData.id&&item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }else{
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }

      isRepeat
        ? callback(new Error(`同级部门下已经存在这个${value}部门了`))
        : callback();
    };
    const checkCodeRepeat = async (rules, value, callback) => {
      const { depts } = await getDepartments();
      let isRepeat = false
      if(this.formData.id){
        isRepeat = depts
        .some((item) => item.id!==this.formData.id&&item.code === value && value);
      }else{
        isRepeat = depts
        .some((item) => item.code === value && value);
      }
      
      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码了`))
        : callback();
    };
```

#### 公司设置

##### 基本结构

```vue
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="角色管理">
            <el-row style="height: 60px">
              <el-button type="primary" icon="el-icon-plus" size="small"
                >新增角色</el-button
              >
            </el-row>

            <el-table border center>
              <el-table-column label="序号" width="120"> </el-table-column>
              <el-table-column label="名称" width="240"> </el-table-column>
              <el-table-column label="描述"></el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="success">分配权限</el-button>
                  <el-button type="primary">编辑</el-button>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-table-column>

              <el-row
                type="flex"
                justify="center"
                align="middle"
                style="height: 60px"
              >
                <el-pagination
                  layout="prev, pager, next"
                >
                </el-pagination>
              </el-row>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="公司信息">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "角色管理",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style scoped>
</style>
```

##### 读取角色列表数据

封装接口

src/api/setting.js

```js
export function getRoleList(params) {
  return request({
    url: "/sys/role",
    params
  })
}
```

页面中获取数据

```vue
<script>
import { getRoleList } from '@/api/setting';
export default {
  data() {
    return {
      activeName: "角色管理",
      page:{
        page:1,
        pagesize:10,
        total:0
      }
    };
  },
  created(){
    this.getRoleList()
  },
  methods: {
    async getRoleList(){
      const {total,rows} = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
```

表格绑定数据

```
            <el-table border :data="list">
              <el-table-column type="index" label="序号" width="120">
              </el-table-column>
              <el-table-column label="名称" width="240" prop="name">
              </el-table-column>
              <el-table-column
                label="描述"
                prop="description"
              ></el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="success">分配权限</el-button>
                  <el-button type="primary">编辑</el-button>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
```

绑定分页数据

```
              <el-pagination 
              layout="prev, pager, next"
              :current-page="page.page"
              :page-size="page.pagesize"
              :total="page.total"
              @current-change="changePage"
              ></el-pagination>
```

```
    changePage(newpage){
      this.page.page = newpage
      this.getRoleList()
    },
```

##### 删除角色

封装接口

```
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method:'delete'
  })
}
```

删除按钮事件

```
              <el-table-column label="操作">
                <template slot-scope="{row}">
                  <el-button type="success">分配权限</el-button>
                  <el-button type="primary">编辑</el-button>
                  <el-button type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
```

```
    async deleteRole(id){
      try {
        await this.$confirm('确定要删除吗？')
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      }catch(error) {
        console.log(error);
      }
    },
```

##### 编辑角色

封装api接口

```js
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method:'put',
    data
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
```

编辑弹层数据

```
      showDialog:false,
      roleForm:{},
      rules:{
        name:[
          {required:true,message:'角色名称不能为空',trigger:'blur'}
        ]
      },
```

编辑弹层结构

```
      <el-dialog title="编辑弹层" :visible.sync="showDialog">
        <el-form ref="roleForm" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
```

编辑功能

```
    async editRole(id){
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true

    },
    async btnOk(){
      try{
        await this.$refs.roleForm.validate()
        if(this.roleForm.id){
          await updateRole(this.roleForm)
        }else{
          
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
        this.roleForm = {}
      }catch(err){
        console.log(err);
      }
    },
```

##### 新增角色

```js
export function addRole(data) {
  return request({
    url: `/sys/role`,
    method:'post',
    data
  })
}
```

点击新增，弹层显示

```vue
<el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog = true">新增角色</el-button>
```

新增功能

```js
    async btnOk() {
      try {
        let res = await this.$refs.roleForm.validate();
        console.log("res",this.roleForm);
        if (this.roleForm.id) {
          await updateRole(this.roleForm);
        } else {
          await addRole(this.roleForm);
        }
        this.getRoleList();
        this.$message.success("操作成功");
        this.showDialog = false;
        this.roleForm = {};
      } catch (err) {
        console.log(err);
      }
    },
```

#### 员工

##### 封装一个通用工具栏

src/components/PageTools/index.vue

```
<template>
  <el-card>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div class="before" v-if="showBefore">
          <i class="el-icon-info"></i>
          <slot name="before"></slot>
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.page-tools {
  margin: 10px 0;
}

.before {
  line-height: 35px;
  display: inline-block;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid #91d5ff;
}

.before i {
  margin-right: 5px;
  color: #409eff;
}
</style>
```

main.js中全局注册

```
import PageTools from '@/components/PageTools'
Vue.component('PageTools',PageTools)
```

##### 员工列表页面

###### 结构

```
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="before">
          <span>共42条记录</span>
        </template>
        <template slot="after">
          <el-button size="small" type="success">excel导入</el-button>
          <el-button size="small" type="danger">excel导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>

      <el-table :data="list">
        <el-table-column label="序号" >
        </el-table-column>
        <el-table-column label="姓名" >
        </el-table-column>
        <el-table-column label="头像" >
        </el-table-column>
        <el-table-column label="工号" >
        </el-table-column>
        <el-table-column label="聘用形式" >
        </el-table-column>
        <el-table-column label="部门" >
        </el-table-column>
        <el-table-column label="入职时间" >
        </el-table-column>
        <el-table-column label="账号状态" >
        </el-table-column>
        <el-table-column label="操作" >
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row
      type="flex"
      justify="center"
      align="middle"
      style="height:60px">
        <el-pagination
        layout="prev, pager, next"></el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
};
</script>
<style scoped>
</style>
```

数据请求

```js
export function getEmployeeList(params){
  return request({
    url:'/sys/user',
    params
  })
}
```

数据获取

```
<script>
export default {
  data() {
    return {
      list: [],
      page:{
        page:1,
        size:10,
        total:0
      }
    };
  },
  created(){
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      let {total,rows} = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
    }
  },
};
</script>
```

表格绑定数据

```vue
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="before">
          <span>共42条记录</span>
        </template>
        <template slot="after">
          <el-button size="small" type="success">excel导入</el-button>
          <el-button size="small" type="danger">excel导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>

      <el-table :data="list">
        <el-table-column label="序号" type="index">
        </el-table-column>
        <el-table-column label="姓名" sortable prop="username">
        </el-table-column>
        <el-table-column label="头像">
        </el-table-column>
        <el-table-column label="工号" sortable prop="workNumber">
        </el-table-column>
        <el-table-column label="聘用形式" sortable prop="formOfEmployment">
        </el-table-column>
        <el-table-column label="部门" sortable prop="departmentName">
        </el-table-column>
        <el-table-column label="入职时间" sortable prop="timeOfEntry">
        </el-table-column>
        <el-table-column label="账号状态" sortable prop="enableState">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row
      type="flex"
      justify="center"
      align="middle"
      style="height:60px">
        <el-pagination
        layout="prev, pager, next"
        :page-size="page.size"
        :current-page="page.page"
        :total="page.total"
        @current-change="changePage"></el-pagination>
      </el-row>
    </div>
  </div>
</template>

    changePage(newPage){
      this.page.page = newPage
      this.getEmployeeList()
    },
```

###### 格式化处理数据

main.js中注册全局过滤器

```
import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key,filters[key])
})
```

src/filters/index.js

```js
import moment from "moment";
export function formDate(time,option){
  const t = (new Date(time)).getTime()
  return moment(t).format('YYYY-MM-DD')
}
```

###### 格式化处理聘用数据

```vue
el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formatEmployment">
    formatEmployment(row,column,cellValue,index){
      const obj = EmployeeValue.hireType.find(item => item.id === cellValue)
      return obj ? obj.value: '未知'
    },
```

##### 新增

###### 员工弹层组件

```
<template>
  <el-dialog title="新增员工" :visible.sync="showDialog">
    <el-form>
      <el-form-item label="姓名" >
        <el-input style="width:50%" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" >
        <el-input style="width:50%" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" >
        <el-date-picker style="width:50%" placeholder="请输入入职时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" >
        <el-select style="width:50%" placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item label="工号" >
        <el-input style="width:50%" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item label="部门" >
        <el-input style="width:50%" placeholder="请输入部门"></el-input>
      </el-form-item>
      <el-form-item label="转正时间" >
        <el-date-picker style="width:50%" placeholder="请输入转正时间"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: {
        type:Boolean,
        default:false
      }
    }
  },
};
</script>

<style scoped>
</style>
```

###### 表单验证

```
<template>
  <el-dialog title="新增员工" :visible.sync="showDialog">
    <el-form :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          style="width: 50%"
          placeholder="请输入姓名"
          v-model="formData.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          style="width: 50%"
          placeholder="请输入手机号"
          v-model="formData.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          style="width: 50%"
          placeholder="请输入入职时间"
          v-model="formData.timeOfEntry"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          style="width: 50%"
          placeholder="请选择"
          v-model="formData.formOfEmployment"
        ></el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          style="width: 50%"
          placeholder="请输入工号"
          v-model="formData.workNumber"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          style="width: 50%"
          placeholder="请输入部门"
          v-model="formData.departmentName"
        ></el-input>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          style="width: 50%"
          placeholder="请输入转正时间"
          v-model="formData.correctionTime"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData:{
        username:"",
        mobile:"",
        formOfEmployment:"",
        workNumber:"",
        departmentName:"",
        timeOfEntry:"",
        correctionTime:""
      },
      rules:{
        username:[
          {required:true,message:'姓名不能为空',trigger:"blur"},
          {min:1,max:4,message:"姓名应该在1-4位"}
        ],
        mobile:[
          {required:true,message:'手机号不能为空',trigger:'blur'},
          {pattern:/^1[3-9]\d$/,message:"手机号格式不正确",trigger:"blur"}
        ],
        formOfEmployment:[
          {required:true,message:'聘用形式不能为空',trigger:'blur'}
        ],
        workNumber:[
          {required:true,message:'工号不能为空',trigger:'blur'}
        ],
        departmentName:[
          {required:true,message:'部门不能为空',trigger:'blur'}
        ],
        timeOfEntry:[
          {required:true,message:'入职时间不能为空',trigger:'blur'}
        ],
      }
    };
  },
};
</script>

<style scoped>
</style>
```

###### 加载部门数据

```
  data() {
    return {
      treeData:[],
      showTree:false,
      loading:false,
    }
  }
  
      async getDepartments() {
      this.showTree = true
      this.loading = true
      const {depts} = await getDepartments()
      this.treeData = tranListToTreeData(depts,"")
      this.loading = false
    }
```

###### 点击部门赋值

选择部门，赋值表单数据

```vue
				<el-input
          style="width: 50%"
          placeholder="请输入部门"
          v-model="formData.departmentName"
          @focus="getDepartments"
        ></el-input>
        <el-tree
        v-if="showTree"
        v-loading="loading"
        :data="treeData"
        default-expand-all
        :props="{label:'name'}"
        @node-click="selectNode"></el-tree>
```

###### 点击部门时触发

```
    selectNode(node){
      this.formData.departmentName = node.name
      this.showTree = false
    },
```

###### 聘用形式

src/api/constant/employees.js

```js
export default {
  hireType:[
    {id:1,value:'正式'},
    {id:2,value:'非正式'}
  ]
}
```

add-employee.vue

```vue
import EmployeeValue from '@/api/constant/employees'
  data() {
    return {
      EmployeeValue,
		}
	}	
```

```vue
        <el-select
          style="width: 50%"
          placeholder="请选择"
          v-model="formData.formOfEmployment"
        >
          <el-option
          v-for="item in EmployeeValue.hireType"
          :key="item.id"
          :label="item.value"
          :value="item.id"></el-option>
        </el-select>
```

###### 确定--取消

点击确定

```js
    async btnOk(){
      try{
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        this.$parent.getEmployeeList()
        this.$parent.showDialog = false
      }catch(err){
        console.log(err);
      }
    },
```

点击取消

```js
    btnCancel() {
      this.formData = {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      };
      this.$refs.addEmployee.resetFields()
      this.$emit('update:showDialog',false)
    },
//父组件中
<add-employee :show-dialog.sync="showDialog"></add-employee>
```

##### 导入

###### 建立公共导入的页面的路由

src/router/index.js

```
  {
    path:'/import',
    component:Layout,
    hidden:true,//不显示在左侧菜单栏中
    children:[{
      path:'',//什么都不写，表示默认的二级路由
      component:() => import('@/views/import')
    }]
  },
```

创建import路由组件 src/views/import/index.vue

```vue
<template>
  <upload-excel :on-success="success" />
</template>
```

excel导入功能需要使用npm包xlsx，所以需要安装xlsx插件

```
npm i xlsx@0.16.8
```

src/components/uploadExcel

https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/UploadExcel/index.vue

```vue
<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" size="mini" type="primary">点击上传</el-button>
    </div>

    <input type="file"
    ref="excel-upload-input"
    class="excel-upload-input"
    accept=".xlsx,.xls" />
    <div class="drop">
      <i class="el-icon-upload"></i>
      <span>将文件拖到此处</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false
      }
    },
  }
</script>

<style lang="scss" scoped>
.upload-excel{
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop{
    border:1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop{
    line-height: 80px;
    color: #bbb;
    i{
      font-size: 60px;
      display: block;
    }
  }

}
</style>
```

注册全局的导入excel组件

```
import UploadExcel from './uploadExcel'
export default {
  install(Vue){
    Vue.component('UploadExcel',UploadExcel)
  }
}
```

main.js

```js
import Components from '@/components'
Vue.use(Components)
```

###### 封装导入员工的api接口

```js
export function importEmployee(data){
  return request({
    url:'/sys/user/batch',
    method:'post',
    data
  })
}
```

###### 实现excel的导入

获取导入的excel数据，导入excel接口

```js
      success({header,results}) {
        const userRelations = {
          入职日期:'timeOfEntry',
          手机号:'mobile',
          姓名:'username',
          转正日期:'correctionTime',
          工号:'workNumber'
        }
        const arr = []
        results.forEach(item => {
          const userInfo = {}
          Object.keys(item).forEach(key => {
            userInfo[userRelations[key]] = item[key]
          })
          arr.push(userInfo)
          console.log(arr,'arr');
        })
        await importEmployee(arr)
        this.$router.back()
      }
```

excel中有日期格式的时候，实际转化的值是一个数字，我们需要转化

```js
//转化excel的日期格式
      formDate(numb,format){
        const time = new Date((numb - 1) * 24 *3600000 + 1)
        time.setYear(time.getFullYear() - 70)
        const year = time.getFullYear() + ''
        const month = time.getMonth() + 1 +''
        const date = time.getDate() - 1 + ''
        if(format && format.length === 1){
          return year + format + month + format + date
        }
        return (
          year + (month < 10 ? '0' + month:month) + 
          (date < 10 ? '0' + date:date)
        )
      }
```

更改逻辑判断

```js
    success({ header, results }) {
      if (this.type === "user") {
        const userRelations = {
          入职日期: "timeOfEntry",
          手机号: "mobile",
          姓名: "username",
          转正日期: "correctionTime",
          工号: "workNumber",
        };
        const arr = [];
        results.forEach((item) => {
          const userInfo = {};
          Object.keys(item).forEach((key) => {
            if (
              userRelations[key] === "timeOfEntry" ||
              userRelations[key] === "correctionTime"
            ) {
              userInfo[userRelations[key]] = new Date(
                this.formDate(item[key], "/")
              );
              return;
            }
            userInfo[userRelations[key]] = item[key];
          });
          arr.push(userInfo);
          console.log(arr, "arr");
        });
        await importEmployee(arr);
        this.$router.back();
      }
    },
```

注意：导入的手机号不能和之前存在的手机号重复

##### 导出

> Excel的导入导出都是依赖于js-xlsx来实现的
>
> 封装Export?excel.js

安装excel所需依赖

> Export2Excel不仅依赖于xlsx还依赖于file-saver和script-loader

安装

```
npm install file-saver -S
npm install script-loader -S -D
```

按需加载

```
<el-button size="small" type="danger" @click="exportData">excel导出</el-button>
```

header 导出数据的表头 Array

data 导出的具体的数据 Array

filename 导出的文件名 String

autoWidth 单元格是否自适应宽度

bookType 导出文件类型 String

- 对数据进行格式化

```
    exportData(){
      const headers = {
        姓名:'username',
        手机号:'mobile',
        入职日期:'timeOfEntry',
        聘用形式:'formOfEmployment',
        转正日期:'correctionTime',
        工号:'workNumber',
        部门:'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const {rows} = await getEmployeeList({
          page:1,
          size:this.page.total
        })
        const data = this.formatJson(headers,rows)
        excel.export_json_to_excel({
          header:Object.keys(headers),
          data,
          filename:'员工工资',
          autoWidth:true,
          bookType:'xlsx'
        })
      })
    },
    formatJson(headers,rows){
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if(headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime'){
            return formDate(item[headers[key]])
          }else if(headers[key]=== 'formOfEmployment'){
            var en = EmployeeValue.hireType.find(
              obj => obj.id === item[headers[key]]
            )
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },  
```

##### 详情页

###### 创建详情路由

router/modules/employees

```js
        {
            path:'detail/:id',
            component:() => import('@/views/employees/detail'),
            hidden:true,
            meta:{
                title:'员工详情'
            }
        }
```

###### 结构

```vue
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名">
                <el-input style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input style="width: 300px" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情"></el-tab-pane>
          <el-tab-pane label="岗位信息"></el-tab-pane>
        </el-tabs>
      </el-card>Ï
```

###### 列表跳转到详情

```
<el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
```

###### 读取用户信息

```
<script>
import {getUserDetailById} from '@/api/user'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userInfo:{
        username:'',
        password:''
      }
    }
  },
  created(){
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    }
  },
};
</script>
```

###### 用户名和密码修改

> 读取到的密码是一个密文，我们并不能解密，所以当我们没有任何修改就保存时，会校验失败，密文超过了规定的12位长度，为了修改密码，我们设定了一个临时字段password2，用它来修改我们的修改值，最后保存的时候，把password2赋值给password

封装接口

```js
export function saveUserDetailById(data){
  return request({
    url:`/sys/user/${data.id}`,
    method:'put',
    data
  })
}
```

修改方法

```js
    async saveUser(){
      try{
        await this.$refs.userRef.validate()
        await saveUserDetailById({
          ...this.userInfo,password:this.userInfo.password2
        })
        this.$message.success('保存成功')
      }catch(err){
        console.log(err);
      }
    }
```

###### 个人信息和岗位信息封装

封装api接口

```js
export function getPersonalDetail(id){
  return request({
    url:`/employees/${id}/personalInfo`
  })
}

export function updatePersonal(data){
  return request({
    url:`/employees/${data.userId}/personalInfo`,
    method:'put',
    data
  })
}

export function getJobDetail(id){
  return request({
    url:`/employees/${id}/jobs`
  })
}

export function updateJob(data){
  return request({
    url:`/employees/${data.userId}/jobs`,
    method:'put',
    data
  })
}
```

方法

```js
  created() {
    this.getUserDetailById()
    this.getPersonalDetail()
  },
     methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
      if (this.userInfo.staffPhoto && this.userInfo.staffPhoto.trim()) {
        // 有值就表示 已经有了一个上传成功的图片了
        // 上传成功的图片 upload: true 表示 该图片已经上传成功了
        this.$refs.staffPhoto.fileList = [{ url: this.userInfo.staffPhoto, upload: true }]
      }
    },
    async  getPersonalDetail() {
      this.formData = await getPersonalDetail(this.userId)
      if (this.formData.staffPhoto && this.formData.staffPhoto.trim()) {
        this.$refs.myStaffPhoto.fileList = [{ url: this.formData.staffPhoto, upload: true }]
      }
    },
    async saveUser() {
      // 先去获取头像中地址
      const fileList = this.$refs.staffPhoto.fileList // 数组
      // 应该做一个判断 判断当前的图片有没有上传完成
      if (fileList.some(item => !item.upload)) {
        // 说明此时有图片还没有上传完成
        this.$message.warning('此时还有图片没有上传完成')
        return
      }
      // staffPhoto由于接口问题 必须 给一个 有空格的字符串才能存进去
      await saveUserDetailById({ ...this.userInfo, staffPhoto: fileList.length ? fileList[0].url : ' ' })
      this.$message.success('保存用户基本信息成功')
    },
    async  savePersonal() {
      const fileList = this.$refs.myStaffPhoto.fileList
      if (fileList.some(item => !item.upload)) {
        // 说明此时有图片还没有上传完成
        this.$message.warning('此时还有图片没有上传完成')
        return
      }
      await updatePersonal({ ...this.formData, staffPhoto: fileList.length ? fileList[0].url : ' ' })
      this.$message.success('保存用户基础信息成功')
    }
  }
```

保存岗位信息

```js
  created() {
    this.getJobDetail()
    this.getEmployeeSimple()
  },
  methods: {
    async getJobDetail() {
      this.formData = await getJobDetail(this.userId)
    },
    async  getEmployeeSimple() {
      this.depts = await getEmployeeSimple()
    },
    async saveJob() {
      await updateJob(this.formData)
      this.$message.success('保存岗位信息成功')
    }
  }
```

#### 配置腾讯云

https://cloud.tencent.com/login?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2F

创建桶列表=>点击具体的存储桶=>安全管理=>跨域访问CORS设置=>添加规则=>* methods全选=>保存

##### 封装上传图片组件

https://cloud.tencent.com/document/product/436/64960

准备工作

```
//新建密钥
SecretId 开发者拥有的项目身份识别ID，用于身份认证，可在API密钥管理页面获取
SecretKey 开发者拥有的项目身份密钥，可在API密钥管理页面获取
```

封装组件

src/components/ImageUpload/index.vue

```vue
<template>
  <div>
    <el-upload
    list-type="picture-card"
    action="#"
    :file-list="fileList"
    :limit="1"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :class="{disabled:fileComputed}">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [
          {url:'//cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'}
        ],
        showDialog:false,
        imgUrl:''
      }
    },
    computed:{
      fileComputed(){
        return this.fileList.length === 1
      }
    },
    methods: {
      handlePreview(file) {
        this.imgUrl = file.url
        this.showDialog = true
      }
    },
  }
</script>

<style scoped>
/deep/ .disabled .el-upload--picture-card{
  display: none;
}
</style>
```

###### 删除图片

```
      handleRemove(file,fileList){
        this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      }
```

###### 添加图片

```js
      changeFile(file,fileList){
        this.fileList = fileList.map(item => item)
      }
```

###### 上传之前检查

控制上传图片的类型和大小，不满足条件返回false就会停止上传

```
      beforeUpload(file){
        const type = ['image/jpeg','image/gif','image/bmp','image/png']
        if(!type.some(item => item === file.type)){
          this.$message.error('上传图片只能是 JPG GIF BMP PNG 格式')
          return false
        }
        const maxSize = 10*1024*1024
        if(file.size > maxSize){
          this.$message.error('上传的图片大小不能大于10M')
          return false
        }
        this.currentFileUid = file.uid
        return true
      }
```

##### 上传调用腾讯云

上传动作为el-upload的:http-request = "upload"属性

```
:http-request = "upload"
```

安装

```
npm i cos-js-sdk-v5
```

引入

```js
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDaz80dz3rQk6C1ZqqZ5LK3VhPr2waz81e",
  SecretKey: "OWO180cz7yYtxlIZZ5LK2UgaDafU3LFt"
});
```

```js
    upload(params) {
      console.log(params.file);
      if (params.file) {
        cos.putObject(
          {
            Bucket:"unixiaobabe-1312604932" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            StorageClass: "STANDARD",
            Body: params.file, // 上传文件对象
          },
          function (err, data) {
            console.log(err || data);
          }
        );
      }
    },
```

###### 上传成功之后处理返回数据

```js
    upload(params) {
      console.log("params.file",params.file);
      if (params.file) {
        cos.putObject(
          {
            Bucket:"unixiaobabe-1312604932" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            StorageClass: "STANDARD",
            Body: params.file, // 上传文件对象
          },
          function (err, data) {
            console.log(err || data);
            if(!err && data.statusCode === 200){
              this.fileList = this.fileList.map(item => {
                if(item.uid === this.currentFileUid){
                  return {url:'http://' + data.Location,upload:true}
                }
                return item
              })
            }
          }
        );
      }
    },
```

###### 上传的进度条显示

放置进度条

```
        cos.putObject(
          {
            Bucket:"unixiaobabe-1312604932" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            StorageClass: "STANDARD",
            Body: params.file, // 上传文件对象
            onProgress(params){
              this.percent = params.percent * 100
            }
          },
```

完整代码

```vue
<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :limit="1"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :class="{ disabled: fileComputed }"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
    v-if="showPercent"
    :percentage="percent"
    style="width:180px"
    ></el-progress>
    <el-dialog :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDaz80dz3rQk6C1ZqqZ5LK3VhPr2waz81e",
  SecretKey: "OWO180cz7yYtxlIZZ5LK2UgaDafU3LFt",
});
export default {
  data() {
    return {
      percent:0,
      showPercent:false,
      fileList: [
        {
          url: "//cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
      ],
      showDialog: false,
      imgUrl: "",
      currentFileUid: "",
    };
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  methods: {
    upload(params) {
      console.log("params.file",params.file);
      if (params.file) {
        cos.putObject(
          {
            Bucket:"unixiaobabe-1312604932" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            StorageClass: "STANDARD",
            Body: params.file, // 上传文件对象
            onProgress(params){
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            console.log(err || data);
            if(!err && data.statusCode === 200){
              this.fileList = this.fileList.map(item => {
                if(item.uid === this.currentFileUid){
                  return {url:'http://' + data.Location,upload:true}
                }
                return item
              })
              setTimeout(() => {
                this.showPercent = false
                this.percent = 0
              },2000)
            }
          }
        );
      }
    },
    handlePreview(file) {
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item);
    },
    beforeUpload(file) {
      const type = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!type.some((item) => item === file.type)) {
        this.$message.error("上传图片只能是 JPG GIF BMP PNG 格式");
        return false;
      }
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        this.$message.error("上传的图片大小不能大于10M");
        return false;
      }
      this.currentFileUid = file.uid;
      this.showPercent = true
      return true;
    },
  },
};
</script>

<style scoped>
/deep/ .disabled .el-upload--picture-card {
  display: none;
}
</style>
```

##### 员工详情中使用上传头像

员工头像

```
<image-upload ref="myStaffPhoto" />
```

读取时赋值头像

```js
    async getUserDetailById() {
      // this.userInfo = await getUserDetailById(this.userId)
      // if (this.userInfo.staffPhoto && this.userInfo.staffPhoto.trim()) {
      //   // 有值就表示 已经有了一个上传成功的图片了
      //   // 上传成功的图片 upload: true 表示 该图片已经上传成功了
      //   this.$refs.staffPhoto.fileList = [{ url: this.userInfo.staffPhoto, upload: true }]
      // }

      this.userInfo = await getUserDetailById(this.userId)
      if(this.userInfo.staffPhoto){
        this.$refs.staffPhoto.fileList = [{
          url:this.userInfo.staffPhoto,upload:true
        }]
      }
    },
```

###### 员工列表显示图片

```vue
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img :src="row.staffPhoto"
            v-imgerror="require('@/assets/common/bigUserHeader.png')"
            style="width:100px;height:100px;padding:10px;border-radius:50%" alt="">
          </template>
        </el-table-column>
```

自定义指令判断图片为空

```js
export const imgerror = {
    inserted(el,options){
        el.src = el.src || options.value
        el.onerror = function(){
            el.src = options.value
        }
    },
    componentUpdated(el,options){
        el.src = el.src || options.value
    }

}
```

##### 图片地址生成二维码

安装插件

```
npm i qrcode
```

生成二维码

```
import QrCode from 'qrcode'

    showQrCode(url) {
      if(url){
        this.showCodeDialog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas,url)
        })
      }else{
        this.$message.warning('用户还未上传头像')
      }
    },
```

弹层

```vue
    <el-dialog title="二维码" :visible="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas"></canvas>
      </el-row>
    </el-dialog>
```

##### 打印员工信息

###### 创建页面组件

```vue
<template>
  <div id="myPrint" class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-breadcrumb separator="/" class="titInfo ">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <router-link :to="{'path':'/employees'}">员工管理</router-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>打印</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row type="flex" justify="end">
          <!-- 利用v-print指令完成页面的打印 -->
          <el-button v-print="printObj" size="mini" type="primary">打印</el-button>
        </el-row>
        <div v-if="type === 'personal'">
          <h2 class="centInfo">员工信息表</h2>
          <table cellspacing="0" width="100%" class="tableList">
            <tr class="title">
              <td colspan="8" class="centInfo">基本信息</td>
            </tr>
            <tr>
              <th style="width:10%">姓名</th>
              <td colspan="6" style="width:80%">{{ formData.username }}</td>
              <td rowspan="5" style="width:10%"><img style="width:155px;height:218px" :src="formData.staffPhoto"></td>

            </tr>
            <tr>
              <th>性别</th>
              <td colspan="6">{{ formData.sex }}</td>
            </tr>
            <tr>
              <th>手机</th>
              <td colspan="6">{{ formData.mobile }}</td>
            </tr>
            <tr>
              <th>出生日期</th>
              <td colspan="6">{{ formData.dateOfBirth | formatDate }}</td>
            </tr>
            <tr>
              <th>最高学历</th>
              <td colspan="6">{{ formData.theHighestDegreeOfEducation }}</td>
            </tr>
            <tr>
              <th style="width:10%">是否可编辑</th>
              <td style="width:35%">{{ formData.isItEditable }}</td>
              <th style="width:10%">是否隐藏号码</th>
              <td colspan="5" style="width:45%">{{ formData.doYouHideNumbers }}</td>
            </tr>
            <tr>
              <th>国家地区</th>
              <td>{{ formData.nationalArea }}</td>
              <th>护照号</th>
              <td colspan="5">{{ formData.passportNo }}</td>
            </tr>
            <tr>
              <th>身份证号</th>
              <td>{{ formData.idNumber }}</td>
              <th>身份证照片</th>
              <td colspan="5">{{ formData.iDCardPhoto }}</td>
            </tr>
            <tr>
              <th>籍贯</th>
              <td>{{ formData.nativePlace }}</td>
              <th>民族</th>
              <td colspan="5">{{ formData.nation }}</td>
            </tr>
            <tr>
              <th>英文名</th>
              <td>{{ formData.englishName }}</td>
              <th>婚姻状况</th>
              <td colspan="5">{{ formData.maritalStatus }}</td>
            </tr>
            <tr>
              <th>员工照片</th>
              <td>{{ formData.staffPhoto }}</td>
              <th>生日</th>
              <td colspan="5">{{ formData.birthday }}</td>
            </tr>
            <tr>
              <th>属相</th>
              <td>{{ formData.zodiac }}</td>
              <th>年龄</th>
              <td colspan="5">{{ formData.age }}</td>
            </tr>
            <tr>
              <th>星座</th>
              <td>{{ formData.constellation }}</td>
              <th>血型</th>
              <td colspan="5">{{ formData.bloodType }}</td>
            </tr>
            <tr>
              <th>户籍所在地</th>
              <td>{{ formData.domicile }}</td>
              <th>政治面貌</th>
              <td colspan="5">{{ formData.politicalOutlook }}</td>
            </tr>
            <tr>
              <th>入党时间</th>
              <td>{{ formData.timeToJoinTheParty }}</td>
              <th>存档机构</th>
              <td colspan="5">{{ formData.archivingOrganization }}</td>
            </tr>
            <tr>
              <th>子女状态</th>
              <td>{{ formData.stateOfChildren }}</td>
              <th>子女有无商业保险</th>
              <td colspan="5">{{ formData.doChildrenHaveCommercialInsurance }}</td>
            </tr>
            <tr>
              <th>有无违法违纪行为</th>
              <td>{{ formData.isThereAnyViolationOfLawOrDiscipline }}</td>
              <th>有无重大病史</th>
              <td colspan="5">{{ formData.areThereAnyMajorMedicalHistories }}</td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">通讯信息</td>
            </tr>
            <tr>
              <th>QQ</th>
              <td>{{ formData.qQ }}</td>
              <th>微信</th>
              <td colspan="5">{{ formData.weChat }}</td>
            </tr>
            <tr>
              <th>居住证城市</th>
              <td>{{ formData.residenceCardCity }}</td>
              <th>居住证办理日期</th>
              <td colspan="5">{{ formData.dateOfResidencePermit }}</td>
            </tr>
            <tr>
              <th>居住证截止日期</th>
              <td>{{ formData.residencePermitDeadline }}</td>
              <th>现居住地</th>
              <td colspan="5">{{ formData.placeOfResidence }}</td>
            </tr>
            <tr>
              <th>通讯地址</th>
              <td>{{ formData.postalAddress }}</td>
              <th>联系手机</th>
              <td colspan="5">{{ formData.contactTheMobilePhone }}</td>
            </tr>
            <tr>
              <th>个人邮箱</th>
              <td>{{ formData.personalMailbox }}</td>
              <th>紧急联系人</th>
              <td colspan="5">{{ formData.emergencyContact }}</td>
            </tr>
            <tr>
              <th>紧急联系电话</th>
              <td colspan="7">{{ formData.emergencyContactNumber }}</td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">账号信息</td>
            </tr>
            <tr>
              <th>社保电脑号</th>
              <td>{{ formData.socialSecurityComputerNumber }}</td>
              <th>公积金账号</th>
              <td colspan="5">{{ formData.providentFundAccount }}</td>
            </tr>
            <tr>
              <th>银行卡号</th>
              <td>{{ formData.bankCardNumber }}</td>
              <th>开户行</th>
              <td colspan="5">{{ formData.openingBank }}</td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">教育信息</td>
            </tr>
            <tr>
              <th>学历类型</th>
              <td>{{ formData.educationalType }}</td>
              <th>毕业学校</th>
              <td colspan="5">{{ formData.graduateSchool }}</td>
            </tr>
            <tr>
              <th>入学时间</th>
              <td>{{ formData.enrolmentTime }}</td>
              <th>毕业时间</th>
              <td colspan="5">{{ formData.graduationTime }}</td>
            </tr>
            <tr>
              <th>专业</th>
              <td>{{ formData.major }}</td>
              <th>毕业证书</th>
              <td colspan="5">{{ formData.graduationCertificate }}</td>
            </tr>
            <tr>
              <th>学位证书</th>
              <td colspan="7">{{ formData.certificateOfAcademicDegree }}</td>
            </tr>
            <tr class="title">
              <td colspan="8" class="centInfo">从业信息</td>
            </tr>
            <tr>
              <th>上家公司</th>
              <td>{{ formData.homeCompany }}</td>
              <th>职称</th>
              <td colspan="5">{{ formData.title }}</td>
            </tr>
            <tr>
              <th>简历</th>
              <td>{{ formData.resume }}</td>
              <th>有无竞业限制</th>
              <td colspan="5">{{ formData.isThereAnyCompetitionRestriction }}</td>
            </tr>
            <tr>
              <th>前公司离职证明</th>
              <td>{{ formData.proofOfDepartureOfFormerCompany }}</td>
              <th>备注</th>
              <td colspan="5">{{ formData.remarks }}</td>
            </tr>
          </table>
          <div class="foot">签字：___________日期:___________</div>
        </div>
        <div v-else>
          <h2 class="centInfo">岗位信息表</h2>
          <table cellspacing="0" width="100%" class="tableList">
            <tr class="title">
              <td colspan="4" class="centInfo">基本信息</td>
            </tr>
            <tr>
              <th style="width:10%">姓名</th>
              <td style="width:40%">{{ formData.username }}</td>
              <th style="width:10%">入职日期</th>
              <td style="width:40%">{{ formData.dateOfEntry }}</td>
            </tr>
            <tr>
              <th>部门</th>
              <td>{{ formData.departmentName }}</td>
              <th>岗位</th>
              <td>{{ formData.post }}</td>
            </tr>
            <tr>
              <th>工作邮箱</th>
              <td>{{ formData.workMailbox }}</td>
              <th>工号</th>
              <td>{{ formData.workNumber }}</td>
            </tr>
            <tr>
              <th>转正日期</th>
              <td>{{ formData.dateOfCorrection }}</td>
              <th>转正状态</th>
              <td>{{ formData.stateOfCorrection }}</td>
            </tr>
            <tr>
              <th>职级</th>
              <td>{{ formData.rank }}</td>
              <th>汇报对象</th>
              <td>{{ formData.reportName }}</td>
            </tr>
            <tr>
              <th>HRBP</th>
              <td>{{ formData.hRBP }}</td>
              <th>聘用形式</th>
              <td>{{ formData.formOfEmployment }}</td>
            </tr>

            <tr>
              <th>管理形式</th>
              <td>{{ formData.formOfManagement }}</td>
              <th>调整司龄</th>
              <td>{{ formData.adjustmentAgedays }}</td>
            </tr>
            <tr>
              <th>司龄</th>
              <td>{{ formData.ageOfDivision }}</td>
              <th>首次参加工作时间</th>
              <td>{{ formData.workingTimeForTheFirstTime }}</td>
            </tr>

            <tr>
              <th>调整工龄天</th>
              <td>{{ formData.adjustmentOfLengthOfService }}</td>
              <th>工龄</th>
              <td>{{ formData.workingYears }}</td>
            </tr>
            <tr>
              <th>纳税城市</th>
              <td>{{ formData.taxableCity }}</td>
              <th>转正评价</th>
              <td>{{ formData.correctionEvaluation }}</td>
            </tr>
            <tr class="title">
              <td colspan="4" class="centInfo">合同信息</td>
            </tr>
            <tr>
              <th>首次合同开始时间</th>
              <td>{{ formData.initialContractStartTime }}</td>
              <th>首次合同结束时间</th>
              <td>{{ formData.firstContractTerminationTime }}</td>
            </tr>
            <tr>
              <th>现合同开始时间</th>
              <td>{{ formData.currentContractStartTime }}</td>
              <th>现合同结束时间</th>
              <td>{{ formData.closingTimeOfCurrentContract }}</td>
            </tr>

            <tr>
              <th>合同期限</th>
              <td>{{ formData.contractPeriod }}</td>
              <th>合同文件</th>
              <td>{{ formData.contractDocuments }}</td>
            </tr>
            <tr>
              <th>续签次数</th>
              <td colspan="3">{{ formData.renewalNumber }}</td>
            </tr>
            <tr class="title">
              <td colspan="4" class="centInfo">招聘信息</td>
            </tr>
            <tr>
              <th>其他招聘渠道</th>
              <td>{{ formData.otherRecruitmentChannels }}</td>
              <th>招聘渠道</th>
              <td>{{ formData.recruitmentChannels }}</td>
            </tr>
            <tr>
              <th>社招校招</th>
              <td>{{ formData.socialRecruitment }}</td>
              <th>推荐企业人</th>
              <td>{{ formData.recommenderBusinessPeople }}</td>
            </tr>
          </table>
          <div class="foot">签字：___________日期:___________</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPersonalDetail, getJobDetail } from '@/api/employees'
import { getUserDetailById } from '@/api/user'
export default {
  data() {
    return {
      printObj: {
        id: 'myPrint'
      },
      formData: {},
      userId: this.$route.params.id,
      type: this.$route.query.type // 打印类型
    }
  },
  // 创建完毕状态
  created() {
    this.type === 'personal' ? this.getPersonalDetail() : this.getJobDetail()
  },
  // 组件更新
  methods: {
    async getPersonalDetail() {
      this.formData = await getPersonalDetail(this.userId) // 获取个人基本信息
    },
    async getJobDetail() {
      const userInfo = await getUserDetailById(this.userId)
      const jobInfo = await getJobDetail(this.userId) // 获取个人基本信息
      this.formData = { ...userInfo, ...jobInfo }
    }
  }
}
</script>

<style lang="scss">
.foot {
  padding: 30px 0;
  text-align: right;
}
</style>
```

###### 新建打印页面路由

```js
        {
            path:'print/:id',
            component:() => import('@/views/employees/print'),
            hidden:true,
            meta:{
                title:'员工打印'
            }
        }
```

打印的链接

```
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">打印</router-link>
              </el-tooltip>
            </el-row>
            <user-info></user-info>
          </el-tab-pane>
```

###### 利用vue-print-nb进行打印

```
npm i vue-print-nb
```

注册插件main.js

```
import Print from 'vue-print-nb'
Vue.use(Print)
```

print.vue

```
        <el-row type="flex" justify="end">
          <el-button type="primary" size="mini" v-print="printObj">打印</el-button>
        </el-row>
```

```js
      printObj: {
        id: 'myPrint'
      },
```

#### 分配角色

用户和角色是1对多的关系，一个用户可以拥有多个角色

**分配角色结构 `assign-role.vue`**

```vue
<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <el-checkbox-group> </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
```

##### 获取角色列表

```vue
<script>
import {getRoleList} from '@/api/setting'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: []
    }
  },
  created(){
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const {rows}  = await getRoleList({page:1,pagesize:20})
      this.list = rows
    }
  },
};
</script>
```

##### 显示角色列表

```vue
    <el-checkbox-group v-model="roleIds">
         <el-checkbox
         v-for="item in list"
         :key="item.id"
         :label="item.id">
          {{item.name}}
         </el-checkbox>
    </el-checkbox-group>
```

##### 获取当前员工选中的角色

当前用户的id

```
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id);
      this.roleIds = roleIds;
    },
```

父组件点击角色调用

```
    editRole(id){
      this.userId = id
      this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true

    },
```

##### 点击角色弹出层

```
<el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
```

##### 点击确定和取消

```
    async btnOk(){
      await assignRoles({id:this.userId,roleIds:this.roleIds})
      this.$emit('update:showRoleDialog',false)
    },  
    btnCancel(){
      this.roleIds = []
      this.$emit('update:showRoleDialog',false)
    },
```

#### 权限列表

权限页面结构 **src/views/permission/index.vue**

```vue
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <!-- 指定id为唯一属性的标识 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <!-- 添加按钮只在 访问权的层级显示 当type==1 时才显示添加按钮 -->
            <el-button v-if="row.type === 1" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
```

##### 封装权限管理的增删改查请求 src/api/permission.js

```js
import request from '@/utils/request'

// 获取权限
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}
// 新增权限
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 更新权限
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

// 删除权限
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
// 获取权限详情
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}

```

##### 全部代码

```vue
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <!-- 指定id为唯一属性的标识 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <!-- 添加按钮只在 访问权的层级显示 当type==1 时才显示添加按钮 -->
            <el-button v-if="row.type === 1" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!-- 新增编辑弹层 -->
    <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="permForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <!-- 当值为1时 激活 当值为0时  不激活 -->
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
            style="width:90%"
          />
        </el-form-item>
      </el-form>
      <!-- 底部的确定和取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, updatePermission, getPermissionDetail } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }}
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      // 将数据转化成了 带chilren的树形结构
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    delPermission(id) {
      this.$confirm('确认删除该权限点吗').then(() => {
        return delPermission(id)
      }).then(() => {
        this.$message.success('删除成功')
        // 重新拉取数据
        this.getPermissionList()
      })
    },
    addPermission(type, pid) {
      // 访问权的type = 1  按钮操作的权type =2
      // pid表示当前数据的父节点的标识
      // 记录当前添加的类型和父标识
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    btnOK() {
      // this.$refs.permForm.validate(isOK => {})
      this.$refs.permForm.validate().then(() => {
        // 校验成功
        if (this.formData.id) {
          // 认为是编辑
          return updatePermission(this.formData)
        }
        return addPermission(this.formData) // 新增接口
      }).then(() => {
        // 添加成功
        this.$message.success('操作成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    btnCancel() {
      // 重置数据
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      // 移除校验
      this.$refs.permForm.resetFields() // 移除校验
      this.showDialog = false
    },
    async  editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>

```

#### 角色分配权限

```vue
    <el-dialog
    title="分配权限"
    :visible="showPermDialog"
    @close="btnPermCancel">
      <el-tree
      ref="permTree"
      :data="permData"
      :props="defaultProps"
      :show-checkbox="true"
      :check-strictly="true"
      :default-expend-all="true"
      :default-checked-keys="selectCheck"
      node-key="id"></el-tree>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOk">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
```

##### 获取权限列表数据

点击分配权限时，获取权限列表数据

```js
    async assignPerm(id) {
      this.permData = tranListToTreeData(await getPermissionList(), "0");
      this.roleId = id;
      const { permIds } = await getRoleDetail(id);
      this.selectCheck = permIds;
      this.showPermDialog = true;
    },
```

##### 点击权限弹框的按钮

```js
    btnPermOk(){
      await assignPerm({permIds:this.$refs.permTree.getCheckedKeys(),id:this.roleId})
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    btnPermCancel(){
      this.selectCheck = []
      this.showPermDialog = false
    },
```



















## 项目额外知识点

#### vue-cli配置跨域代理

> 通过配置vue-cli的代理解决跨域访问的问题

###### 为什么会出现跨域

当下，最流行的就是**前后分离**项目，也就是**前端项目**和**后端接口**并不在一个域名之下，那么前端项目访问后端接口必然存在**跨域**的行为

> 怎么解决这种跨域？

**注意**：我们所遇到的这种跨域是位于**开发环境**的，真正部署上线时的跨域是**生产环境**的

###### 解决开发环境的跨域问题

> 开发环境的跨域，也就是在**vue-cli脚手架环境**下开发启动服务器时，我们访问接口所遇到的跨域问题，vue-cli位我们在本地**开启了一个服务**，可以通过这个服务帮我们**代理请求**，解决跨域问题

这就是vue-cli配置**webpack的反向代理**

> 采用vue-cli的代理配置

vue-cli的配置文件即**vue.config.js**，这里有我们需要的[代理选项](https://cli.vuejs.org/zh/config/#devserver-proxy)

```js
module.exports = {
  devServer:{
    //代理配置
    proxy:{
      //这里的api表示如果我们的请求地址有/api的时候，就触发代理机制
      //localhost:8888/api/abc => 代理给另一个服务器
      //本地的前端 => 本地的后端 => 代理我们向另一个服务器发请求（行得通）
      //本地的前端 => 另外一个服务器发请求（跨域 行不通）
      '/api':{
        target:'http://ihrm-java.itheima.net/', //我们要代理的地址
        changeOrigin:true, //是否跨域 需要设置此值为true才可以让本地服务器代理我们发出请求
        //路径重写
        pathRewrite:{
          //重新路由 localhost:8888/api/login => www.baidu.com/api/login
          '^/api':'' //假设我们想把locallhost:8888/api/login变成www.baidu.com/login就需要这么做
        }
      }
    }
  }
}
```

> 接下来，在代码中将要代理的后端地址变成[后端接口地址](http://ihrm-java.itheima.net)

```js
//代理跨域的配置
proxy:{
  //当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
  '/api':{
    target:'http://ihrm-java.itheima.net/',//跨域请求的地址
    changeOrigin:true //只有这个值为true的情况下 才表示开启跨域
  }
}
```

**注意**：我们并没有进行**pathRewrite**，因为后端接口就是**ihrm-java.itheima.net/api**这种格式，所以不需要重写

**vue.config.js**的改动如果要生效，需要进行重启服务

同时，还需要注意的是，我们同时需要注释掉mock的加载，因为mock-server会导致代理服务的异常

```js
//before:require('./mock/mock-server.js'),//注释mock-server加载
```

**生产环境的跨域**

生产环境表示我们已经开发完成项目，将项目部署到了服务器上，这时已经没有了vue-cli脚手架的**辅助**了，我们只是把打包好的**html+js+css**交付运维人员，放到**Nginx**服务器而已，所以此时需要借助**Nginx**的反向代理来进行

```bash
server{
	#监听9099端口
	listen 9099;
	#本地的域名是localhost
	server_name localhost;
	#凡事localhost:9099/api这个样子的，都转发到真正的服务端地址http://baidu.com
	location ^~/api{
		proxy_pass http://baidu.com
	}
}
```

**注意**：这里的操作一般由运维人员完成

更多的正向代理和反向代理知识，阅读[Nginx反向代理](https://www.cnblogs.com/ysocean/p/9392908.html)

**注意**：我们并没有进行**pathRewrite**，因为后端接口就是**ihrm-java.itheima.net/api**这种格式，所以不需要重写

#### 身份认证

服务器端渲染的开发模式：服务器发送给客户端HTML页面

##### 前后端分离的开发模式

依赖于ajax技术，后端只负责提供API接口，前端使用Ajax调用接口

###### 好处

开发体验好：专注

用户体验好：页面局部刷新

减轻了服务器端压力：页面在浏览器中生成

###### 缺点

不利于SEO优化

##### 什么是身份认证

身份认证就是身份验证、鉴权，是指通过通过一定的手段，完成对用户身份的确认

开发中身份认证：手机验证码，二维码登录

##### 为什么

确认当前所声称为某种身份的用户，确实是所声称的用户

前后端分离模式使用**JWT认证机制**

##### Session认证机制

###### http协议无状态性

客户端的每次http请求都是独立的，服务端不会保留每次http请求的状态

###### 如何突破http无状态性的限制

web开发中使用cookie

###### 什么是cookie

存储在用户浏览器中的一段**不超过4kb**的**字符串**

它由名称、值、cookie有效期、安全性、使用范围的可选属性组成

不同域名下的cookie各自独立，每当客户发起请求，会自动把当前域名下所有未过期的cookie一同发送到服务器

特性：

- 自动发送
- 域名独立
- 过期时限
- 4kb限制

###### cookie在身份认证中的作用

浏览器端向服务器端发送登录请求，服务器端通过响应头向浏览器端发送cookie，浏览器端将cookie存储在浏览器中，浏览器端下一次请求数据的时候会通过请求头自动将cookie发送给服务器，服务器根据请求头中的cookie验证用户身份并响应当前用户对应的内容

###### cookie不具有安全性

不建议通过cookie来发送重要的隐私数据给浏览器，浏览器提供了读写cookie的api

###### 提高身份认证的安全性

增加认证的方式

###### session认证机制



session认证需要cookie配合，cookie不支持跨域

##### JWT

JWT（json web token）目前最流行的认证解决方案

JWT由header(头部)，Payload(有效荷载)，Signature(签名)

Payload就是真正的用户信息，把用户信息经过加密之后生成的字符串

header和SIgnature是安全性相关的部分，就是为了保证token的安全性

###### JWT工作原理

> 客户端登录，向服务器提交账号和密码，服务器验证账号和密码，通过验证后，将用户的信息对象经过加密之后生成token字符串发送给客户端，客户端将token存储到localStorage或SessionStorage中，客户端再次发送请求时通过请求头的Authorization字段将token发送给服务器，服务器吧token字符串还原成用户的信息对象，身份认证成功后，服务器针对当前用户生成特定的响应内容发送给客户端

token是有实效性，2个小时就需要重新登录

token就是客户端进行请求的一个身份令牌

目的：减轻了服务器的压力，减少频繁的查询数据库

###### 使用token

客户端 登录接收到token，把token存储到本地，再次请求通过请求头携带token

###### localStorage

只能存储字符串

localStorage.setItem('名字',值)

读取

localStorage.getItem('名字')