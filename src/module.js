'use strict'
/* eslint-env node */

module.exports = async(fileMap, opt, lib) => {
  const {
    log,
  } = lib

  const once = opt.once
  let renameFcts

  if (typeof opt.rename === 'function') {
    renameFcts = [opt.rename]
  } else if (opt.rename.constructor.name === 'Array') {
    renameFcts = opt.rename
  } else {
    throw 'Invalid `opt` parameter'
  }

  // Make a fixed array to prevent newly created files
  // to be processed
  const fileList = Array.from(fileMap.entries())

  for (const [path, content] of fileList) {
    for (const renameFct of renameFcts) {
      const newPath = renameFct(path)

      if (newPath != null) {
        fileMap.set(newPath, content)
        fileMap.delete(path)

        log(`Rename ${path} to ${newPath}`)

        if (once) {
          break
        }
      }
    }
  }
}
