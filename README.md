# LearnNodeJS
Learning Node.js

## Create Server
```javascript
const http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8888);
```

## Callback Function
### Sync Programming
```javascript
const fs = require('fs');

const data = fs.readFileSync('input.txt');  // Sync Process

console.log(data.toString());
console.log('Process done!');
// Kendrick Lamar
// Process done!
```

### Async Programming
> Async Programming can improve performance
```javascript
const fs = require('fs');
fs.readFile('input.txt', function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(data.toString());
});

console.log('Process done!')
```

## Node.js 事件循环
> Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。

> Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

> Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

> Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

```javascript
// 引入 events 模块
const events = require('events');
// 创建 eventEmitter 对象
const eventEmitter = new events.EventEmitter();

// 创建事件处理函数
var connectHandler = function() {
    console.log('Connect Success!');
    
    // 触发 data_received 事件
    eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理函数
eventEmitter.on('connection', connectHandler);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function() {
    console.log('Receive Data Success!');
});

// 触发 connection 事件
eventEmitter.emit('connection');

console.log('Process done!');
```

## Node.js EventEmitter
> Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

### EventEmitter 
> `events` 模块只提供了一个对象， `events.EventEmitter`。 `EventEmitter` 的核心就是事件触发与事件监听器功能的封装。

> `EventEmitter` 对象如果在实例化时发生错误，会触发 `error` 事件。当添加新的监听器时，`newListener` 事件会触发，当监听器被移除时，`removeListener` 事件被触发。

```javascript
const events = require('events');
const eventEmitter = new events.EventEmitter();

// some_event 绑定
eventEmitter.on('some_event', function() {
    console.log('some_event 事件触发');
});
setTimeout(function() {
    eventEmitter.emit('some_event');    // 触发事件
}, 1000);
```

> `EventEmitter` 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。

> 对于每个事件，`EventEmitter` 支持 若干个事件监听器。

> 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

```javascript
const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});

eventEmitter.on('someEvent', function(arg1, arg2) {
    console.log('listener2', arg1, arg2);
});

eventEmitter.emit('someEvent', 'arg1', 'arg2');
```

### EventEmitter Method
1. `addListener(event, listener)` 为指定事件添加一个监听器到监听器数组的尾部。
2. `on(event, listener)` 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
3. `once(event, listener)` 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
4. `removeListener(event, listener)` 移除指定事件的某个监听器，监听器 必须是该事件已经注册过的监听器。
5. `removeAllListeners([event])` 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
6. `setMaxListeners(n)` 默认情况下， `EventEmitters` 如果你添加的监听器超过 10 个就会输出警告信息。 `setMaxListeners` 函数用于提高监听器的默认限制的数量。
7. `listeners(event)` 返回指定事件的监听器数组。
8. `emit(event, [arg1], [arg2], [..])` 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

### events Method
1. `listenerCounter(emitter, event)` 返回指定事件的监听器数量。

### Event Method
1. `newListener`
2. `removeListener`

```javascript
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");
```