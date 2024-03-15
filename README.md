# copy-files
Simple helper to copy files, taking configuration from package.json.

## Install
```npx @mauriziocarella/copy-files```

or

```npm install -D @mauriziocarella/copy-files```

or

```yarn add -D @mauriziocarella/copy-files```

Can also be run by `npx` with
```npx @mauriziocarella/copy-files```

## Usage
Add the `copy-files` configuration to your `package.json` and run
```npx @mauriziocarell/copy-files```.

The `src` field supports [glob patterns](https://www.npmjs.com/package/glob#globpattern-string--string-options-globoptions--promisestring--path).

Example configuration in package.json:


```js
{
  ...
  "copy-files": [
    {
      "dest": "build/data",
      "src": "src/data/**"
    },
    {
      "dest": "build/data",
      "src": [
        "src/file-1.txt",
        "src/file-2.txt"
      ]
    }
  ],
  ...
}
```
