## Web Builder Module - Rename files

This module allows the [@deskeen/web-builder](https://github.com/deskeen/web-builder) engine to rename the name or the path of the source files.

## Install

```
npm install @deskeen/web-builder
npm install @deskeen/web-builder-rename-files
```

### Usage

And add the module to the list of modules: 

```javascript
const builder = require('@deskeen/web-builder')
const builder.build([
  source: [
    // List of files or directories
  ],
  modules: [
    [
      '@deskeen/web-builder-rename-files',
      {
        rename: filepath => {
          // filepath = original file path
          // Rename if necessary
          // Return new file path
        },
      }
    ]
  ]
])
```

### Module options

- `rename`: Function or list of functions (Array) that will be applied to the source files.
- `once`: Do not call subsequent rename functions when a file name/path is changed, i.e. a filepath can only be changed once. It only makes sense to turn it when more than one rename function are applied.


### Example

```javascript
const builder = require('@deskeen/web-builder')
await builder.build({
  source: ['/www/html'],
  modules: [
    [
      '@deskeen/web-builder-rename-files',
      {
        rename: replacefile =>
          file.replace('/www/', '/deploy/'),
      }
    ]
  ],
})
```

