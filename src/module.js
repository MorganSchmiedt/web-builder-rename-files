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

  for (const [path, content] of fileMap.entries()) {
    for (const renameFct of renameFcts) {
      const newPath = renameFct(path)

      if (newPath != null) {
        fileMap.set(newPath, content)

        log(`Rename ${path} to ${newPath}`)

        if (once) {
          break
        }
      }
    }
  }
}
