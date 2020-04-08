# Node Modules

Modularity is a first class concept in Node.

There are two core modules involved.

1. require - It is a global function, but each module gets its own `require` function

2. module - It is also available globally, and is used to manage all the modules we require with `require`.

Requireinig a module in node is very simple concept.

To execute a  `require` call, node goes through a following sequence of steps:

1. Resolving: Find absolue file path of the module required.
2. Loading: Determined by content of the file at the resolved path.
3. Wrapping: Gives every module its `private scope` and what makes `require` local to every module.
4. Evaluating: Eventually VM does something to code.
5. Caching: When we require again, we don't go over all steps above mentioned.

## `module` Object

Some interesting properties:

- id: String Identifier, Usually full path to the module except for the root module. `.` identifier is used for root module.
- filename: String path to the file containing the module. So when you require a module from `node_modules`, it loads the content of a file into memory.
- path: Array of paths which will used to find a module that is required. It contains folder path `node_modules`, in current directory, and goes all the way to the root directory. If it can't find a momdule in any of those directory, it will throw a `Cannot find module 'module'` error. Core node modules are an exception. When you require a core node module, it resolves immediately.

Let's consider following example.

```js
// ./index.js

console.log("In ./index.js");
require("find-me");


// ./node_modules/find-me.js

console.log("In find-me.js");
```

This will result in output

```bash
In ./index.js
In find-me.js
```

Note, it not only loads the file, but also evaluates it, when you require it.

If you only want to load a file, and not evaluate it, you can use `require.resolve(package)`. It will throw an error, if it can't find the package in any of the paths. This is used to determine if an optional package is installed or not.

If you have `package` installed in multiple folders present in `path` property, it will only resolve the first one it finds.

Usually, package are not files, but are folders, with multiple files. It will use `index.js` or `main` property in `package.json` of the package. We can require any module, with relative or absolute path.

Note `module` object available in `index.js` and package's main file are different. `module` object in package's main file will have a reference of main `index.js` attached to `parent` property.

For Circular Dependency look at `1.6/index.js`.

### Module Wrapper

```js
index.js

exports.id = 1 // this is ok
exports = { id: 1 } // this is not ok

module.exports = { id: 1 } // this is ok, why?

var  = 42; // local to this file

```

Only the things we export are available outside the module. How come variables we declare are magically scope. The answer is simple.

Before compiling a module, Node will wraps the module code in a function as follows.

```
> require('module').wrapper
Proxy [
  [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ],
  { set: [Function: set], defineProperty: [Function: defineProperty] }
]
```

This is how each module gets its own `require`, `exports` and `module` object. These are just function arguments that are provided by wrapped function by node.

To see values of this arguments you can just run the following code.

```js
// index.js

console.log(arguments);

```

This will print all 5 arguments passed to the wrapper function.

The wrapping function's return value is the `exports` object reference. Note, `exports` is just a variable reference to `module.exports`. So, if we modify the whole of `exports` by assignment operator, we lose the `module.exports` module.

So, there's nothing special about `require` function. It takes the module name or path and returns `exports` object. So in test case scenarios, where one might need to overwrite/mock `require`, we can do quite easily as follows.

```js

require = () => {
  return { mocked: true };
};

console.log(require("somepackage")) // { mocked: true }

```

Let's say we have this simple function that takes an integer and a string and prints something.

```js
// printStars.js
const print = (stars, header) => {
  console.log("*".repeat(stars));
  console.log(header);
  console.log("*".repeat(stars));
}
```

We want to run this function in two ways.

1. Through command line as follows
```bash
$ node printStars.js 5 hello
```

2. Through `require` in another file as a module as follows.
```js
// index.js

const printStars = require("printStars");
print(5, "hello");

```

To achieve this, we can leverage wrapping. 
When it is run through Node CLI, `require.main` will be same as `module`.

```js
//printStars.js

const print = (stars, header) => {
  console.log("*".repeat(stars));
  console.log(header);
  console.log("*".repeat(stars));
}

if (require.main == module) {
  // When run as script
  print(process.argv[2], process.argv[3]);
} else {
  // being required by other file
  // export the module
  module.exports = print;
}

```

## Caching

Imagine this case
```js
// index.js

require("printFancy"); // Prints
console.log(require.cache); // Entry for `printFancy` module
require("printFancy"); // Nothing happens 

//printFancy.js

console.log("Hello Fancy");

```

Note, when we require `printFancy` first time, it will resolve, load, evaluate and cache the module. 

However, when we require again, node has cached the module and so will repeat earlier steps again.

To circumvent this we can delete the cache on `require.cache` object, before the second call, with `delete require.cache['absModulePath']` and `printFancy` will be called twice. But it is not the most efficient solution.

Easiest solution is to wrap the `console log` in `printFancy.js` in a function and export it.

```js
// printFancy.js
module.exports = () => {
  console.log("Hello Fancy");
};
```

Now everytime, you require the module, just execute the exports.

```js
// index.js

require('printFancy')() // Prints 
require('printFancy')() // Prints 

```
