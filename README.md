# :tada:axios-interceptors
基于axios拦截处理
prod by cd , learn from betterlin
目前为vue版本，可模改成react版本（主要是懒）

## :wrench:使用
import Vue form 'vue';
import axiosRequest from 'cd-axios-request';

Vue.use(axiosRequest);


## :label:axios拦截器原理简要说明
> axios拦截器的内部利用了promise.then的机制，把use传入的每一个函数作为一个intercetpor，从而将其链式调用。axios在调用请求成功后会返回一个成功的promise.resolve,调用失败会返回一个失败的promise.rejected,这里说明的只是大概的原理。

axios中拦截器的例子： 
```js
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
```
可以看到拦截器都是以func(resolved, rejected)形式进行，也就是下面的promise.then
promise.then:
```js
promise.then(resolved, rejected)
```

### 模拟拦截器的简单实现
```js
// 1.注册拦截器， 通过数组来存放这两种拦截器的对象, use为拦截器方法，将拦截方法以对象 {a, b}的形式存放。
axios.interceptors = {
  request: {
    wrapper: [],
    use(resolved, rejected) => {
      axios.interceptors.request.wrapper.push({ resolved, rejected });
    }
  },
  response:{
    wrapper: [],
    use(resolved, rejected) => {
      axios.interceptors.response.wrapper.push({ resolved, rejected });
    }
  }
}

// 2.注册运行拦截器方法
axios.run = config => {
  const chain = [
    {
      resolved: axios,
      rejected: undefind
    }
  ]
  // 3. 把请求拦截器往数组头部推
  axios.interceptors.request.wrapper.forEach(interceptor => {
    chain.unshift(interceptor);
  });

  // 4. 把响应拦截器往数组尾部推
  axios.interceptors.response.wrapper.forEach(interceptor => {
    chain.push(interceptor);
  });
  
  // 5. 包装一个promise
  let promise = Promise.resolved(config);
  
  // 6. 利用promise.then的能力递归执行所有的拦截器，该方式仅是例子，并不适用，shift对数组性能有一定损耗。
  while (chain.length) {
    const { resolved, rejected } = chain.shift();
    promise = promise.then(resolved, rejected);
  }

  // 7. 暴露promise函数
  return promise;
}
```

最后使用(拦截器写法和axios一样)：
```js
aixos.run({abc:'edg'})
```
