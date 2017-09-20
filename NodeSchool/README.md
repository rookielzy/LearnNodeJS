# Node School IO

## Baby Steps
`process` 对象是一个 `global` （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 `require()`。

你可以通过 `process` 这个全局对象来获取命令行中的参数。`process` 对象拥有一个名为 `argv`。

所有 `process.argv` 中的数组的元素都是字符串类型的，因此，你需要将它们强制转换成数字。你可以通过加上 `+` 前缀，或者将其传给 `Number()` 来解决。例如： `+process.argv[2]` 或者 `Number(process.argv[2])`。

## First I/O
文件 `I/O` 是对标准 POSIX 函数的简单封装。 通过 `require('fs')` 使用该模块。 所有的方法都有异步和同步的形式。

 在 `fs` 中，所有的同步（或者阻塞）的操作文件系统的方法名都会以 `'Sync'`
 结尾。要读取一个文件，你将需要使用  `fs.readFileSync('/path/to/file')` 方法。这个方法会返回一个包含文件完整内容的 Buffer 对象。

 ### `fs.readFileSync(path[, options])`
 其中`options`： `<Object>` | `<string>`。如果指定了 `encoding` 选项，则该函数返回一个字符串，否则返回一个 `buffer`。

`Buffer` 对象是 `Node` 用来高效处理数据的方式，无论该数据是 `ascii` 还是二进制文件，或者其他的格式。`Buffer` 可以很容易地通过调用 `toString()` 方法转换为字符串。如：`var str = buf.toString()`。

## First Async I/O
### `fs.readFile(path[, options], callback)`
如果未指定字符编码，则返回原始的 `buffer`。