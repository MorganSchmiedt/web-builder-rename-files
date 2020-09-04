'use strict'
/* eslint-env node */

const isFunction = obj => typeof obj === 'function'
const isArray = obj => obj.constructor.name === 'Array'

/**
 * @param {Map} fileMap List of files to process, given by engine.
 * @param {object} opt Module options
 * @param {function|Array<function>} opt.rename Function(s) that will be applied to the source files.
 * @param {boolean} opt.once Do not call subsequent rename functions when a file name/path is changed.
 */
module.exports = async(fileMap, opt, { log }) => {
  const once = opt.once === true

  const renameFctList = []

  if (opt.rename == null) {
    log('No `rename` functions provided.')
    return
  }

  if (isFunction(opt.rename)) {
    renameFctList.push(opt.rename)
  } else if (isArray(opt.rename)) {
    for (const renameFct of opt.rename) {
      if (isFunction(renameFct))  {
        renameFctList.push(renameFct)
      }
    }
  } else {
    throw new Error('Invalid `rename` parameter.')
  }

  // Make a fixed array to prevent newly created files
  // to be processed
  const fileList = Array.from(fileMap.keys())

  for (const path of fileList) {
    for (const renameFct of renameFctList) {
      const newPath = renameFct(path)

      if (newPath !== path) {
        const content = fileMap.get(path)

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
