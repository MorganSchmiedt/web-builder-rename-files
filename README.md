## Web Builder Module - Rename files

This module allows the [@deskeen/web-builder](https://github.com/deskeen/web-builder) engine to rename the name or the path of the files.

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

