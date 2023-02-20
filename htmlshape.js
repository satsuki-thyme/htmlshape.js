function htmlshape(src, indentString) {
  let indent = "  "
  if (indentString !== undefined) {
    indent = String.raw(indentString)
  }
  let opt = `.*?>`
  let multiLine = `address|article|aside|blockquote|(?<!t)body|details|dialog|div|dl|fieldset|figcaption|figure|footer|form|(?<!t)head(?!er)|header|hgroup|hr|html|main|nav|ol|p(?!re)|pre|section|table|tbody|thead|tr|ul`
  let singleLine = `code|dd|dt|h1|h2|h3|h4|h5|h6|li|td|th`
  let oddTag = `!DOCTYPE html|meta`
  let br = `br`
  let specialTag = `script|style`
  let ex_allBeginClean = new RegExp(`\\s*(<(?:${multiLine}|${singleLine}|${oddTag}|${br})${opt})\\s*`, "g")
  let ex_specialBeginClean = new RegExp(`\\s*(<(?:${specialTag})${opt})\\s*`, "g")
  let ex_commentBeginClean = new RegExp(`\\s*(<!--.*)`, "g")
  let ex_allEndClean = new RegExp(`\\s*(<\\/(?:${multiLine}|${singleLine})${opt})\\s*`, "g")
  let ex_specialEndClean = new RegExp(`\\s*(<\\/(?:${specialTag})${opt})\\s*`, "g")
  let ex_commentEndClean = new RegExp(`(.*?-->)\\s*`, "g")
  let ex_brClean = new RegExp(`\\s*(<${br} ?\/?>)\\s*`)
  let ex_allBegin = new RegExp(`(<(?:${multiLine}|${singleLine}|${oddTag}|${specialTag})${opt})`, "g")
  let ex_commentBegin = new RegExp(`(<!--.*)`, "g")
  let ex_multiEnd = new RegExp(`(<\\/(?:${multiLine})${opt})`, "g")
  let ex_br = new RegExp(`(<${br} ?/?>)`, "g")
  let ex_newline = new RegExp(`(<(?:${multiLine})${opt})(?:(?!<(?:${multiLine}|${singleLine})${opt})(.+))`, "g")
  let work = src
  .replace(ex_allBeginClean, "$1")
  .replace(ex_specialBeginClean, "$1")
  .replace(ex_commentBeginClean, "$1")
  .replace(ex_allEndClean, "$1")
  .replace(ex_specialEndClean, "$1")
  .replace(ex_commentEndClean, "$1")
  .replace(ex_brClean, "$1")
  .replace(ex_allBegin, "\n$1")
  .replace(ex_commentBegin, "\n$1")
  .replace(ex_multiEnd, "\n$1")
  .replace(ex_br, "$1\n")
  .replace(ex_newline, "$1\n$2")
  .split(/\r?\n/)
  let i = 0
  let tagAccum = []
  let ex_indTag = new RegExp(`^<(?<end>\\/?)(?<tag>${multiLine})${opt}`)
  let preExist = false
  return new Promise(resolve => {
    fn()
    function fn() {
      let match = work[i].match(ex_indTag)
      if (match) {
        if (match.groups.tag === "pre" && match.groups.end === "") {
          preExist = true
          tagAccum.push(match.groups.tag)
        }
        else if (match.groups.tag === "pre" && match.groups.end === "/") {
          preExist = false
          tagAccum.splice(-1, 1)
        }
        if (preExist === false && match.groups.end === "") {
          work[i] = `${indent.repeat(tagAccum.length)}${work[i]}`
          tagAccum.push(match.groups.tag)
        }
        else if (preExist === false && match.groups.end === "/") {
          tagAccum.splice(-1, 1)
          if (preExist === false) {
            work[i] = `${indent.repeat(tagAccum.length)}${work[i]}`
          }
        }
        else if (preExist === true && match.groups.tag === "code") {
          work[i] = `${indent.repeat(tagAccum.length)}${work[i]}`
        }
      }
      else {
        if (preExist === false) {
          work[i] = `${indent.repeat(tagAccum.length)}${work[i]}`
        }
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
