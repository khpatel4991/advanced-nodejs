# Node CLI and REPL

Node CLI comes with a variety of options to expose built-in debugging, multiple ways to execute scripts and other helpful runtime options.

Running a `node` command without any arguments starts a REPL.

R - Read\
E - Eval\
P - Print\
L = Loop

When in REPL, you hit enter, it reads the command, executes it, prints the result and waits for the next command.

### Helpful CLI Tips and Tricks

- `-c` - Syntax check
- `-p` - Print Command. e.g `node -p "process.argv.slice(1) test 42"` will print ['test', '42']

### Helpful Repl Tricks and Tips

- Autocomplete by `Tab`

- `rlwrap` utitlity to track reverse search.

```bash
NODE_NOREADLINE=1 rlwrap node
```

- `_` is used to capture last evaluated value.

- Special commands that begin with a `dot`. 
    - `.help` to print all such commands. 
    - `.break` to break out of a multiline session.
    - `.load` to load external script file
    - `.save` to save current session

- You can create you own repl with custom options by requiring `repl` module and starting it with [custom options](https://nodejs.org/api/repl.html#repl_repl_start_options). You can also control repl's global context in case of preloading a library of data. 
  Below example start the repl in strict mode and doesn't return undefined. Also, it will have lodash available globally.

  ```js
  const repl = require("repl");
  const lodash = require("lodash");

  let r = repl.start({
    ignoreUndefined: true,
    replMode: repl.REPL_STRICT_MODE
  });

  r.context.lodash = lodash;
  ```
 