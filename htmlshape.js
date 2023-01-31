function htmlShape(src, indentString) {
  let indent = "  "
  if (indentString !== undefined) {
    indent = String.raw(indentString)
  }
  let opt = `.*?>`
  let mltLine = `address|article|aside|blockquote|body|details|dialog|div|dl|fieldset|figcaption|figure|footer|form|head|header|hgroup|hr|html|main|nav|ol|p|pre|section|table|ul`
  let snglLine = `dd|dt|h1|h2|h3|h4|h5|h6|li|td`
  let oddTag = `!DOCTYPE html|meta`
  let br = `br`
  let spcTag = `script|style`
  let ex_allBeginClean = new RegExp(`\\s*(<(?:${mltLine}|${snglLine}|${oddTag}|${br})${opt})\\s*`, "g")
  let ex_spcBeginClean = new RegExp(`\\s*(<(?:${spcTag})${opt})`, "g")
  let ex_comBeginClean = new RegExp(`\\s*(<!--.*)`, "g")
  let ex_allEndClean = new RegExp(`\\s*(<\\/(?:${mltLine}|${snglLine})${opt})\\s*`, "g")
  let ex_spcEndClean = new RegExp(`\\s*(<\\/(?:${spcTag})${opt})\\s*`, "g")
  let ex_comEndClean = new RegExp(`(.*?-->)\\s*`, "g")
  let ex_brClean = new RegExp(`\\s*(<${br} ?\/?>)\\s*`)
  let ex_allBegin = new RegExp(`(<(?:${mltLine}|${snglLine}|${oddTag}|${spcTag})${opt})`, "g")
  let ex_comBegin = new RegExp(`(<!--.*)`, "g")
  let ex_mltEnd = new RegExp(`(<\\/(?:${mltLine})${opt})`, "g")
  let ex_br = new RegExp(`(<${br} ?/?>)`, "g")
  let ex_newline = new RegExp(`^(<(?:${mltLine})${opt})((?!<(?:${mltLine})${opt}).*)`, "gm")
  let work = src
  .replace(ex_allBeginClean, "$1")
  .replace(ex_spcBeginClean, "$1")
  .replace(ex_comBeginClean, "$1")
  .replace(ex_allEndClean, "$1")
  .replace(ex_spcEndClean, "\n$1")
  .replace(ex_comEndClean, "$1")
  .replace(ex_brClean, "$1")
  .replace(ex_allBegin, "\n$1")
  .replace(ex_comBegin, "\n$1")
  .replace(ex_mltEnd, "\n$1")
  .replace(ex_br, "$1\n")
  .replace(ex_newline, "$1\n$2")
  .split(/\r?\n/)
  let i = 0
  let tagAccum = []
  let ex_indTag = new RegExp(`^<(?<end>\\/?)(?<tag>${mltLine})${opt}`)
  return new Promise(resolve => {
    fn()
    function fn() {
      let match = work[i].match(ex_indTag)
      if (match !== null) {
        if (match.groups.end === "") {
          work[i] = `${indent.repeat(tagAccum.length)}${work[i]}`
          tagAccum.push(match.groups.tag)
        }
        else if (match.groups.end === "/") {
          tagAccum.splice(-1, 1)
          work[i] = `${indent.repeat(tagAccum.length)}${work[i]}`
        }
      }
      else {
        work[i] = `${indent.repeat(tagAccum.length)}${work[i]}`
      }
      if (i < work.length - 1) {
        i++
        fn()
      }
      else {
        resolve(work.splice(1, work.length - 1).join("\n"))
      }
    }
  })
}
