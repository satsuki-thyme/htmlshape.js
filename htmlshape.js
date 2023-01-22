function htmlShape(src, indentString) {
  let indent = "  "
  if (indentString !== undefined) {
    indent = indentString
  }
  let tagOpt = `(?:[^"]*".*?"|[^"]*)*?`
  let mltLine = `address|article|aside|blockquote|body|details|dialog|div|dl|fieldset|figcaption|figure|footer|form|header|hgroup|hr|html|main|nav|ol|p|pre|section|table|ul`
  let snglLine = `dd|dt|h1|h2|h3|h4|h5|h6|li|td`
  let inline = `a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|script|select|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr`
  let ex_bothBeginRemove = new RegExp(`(<(?:${mltLine}|${snglLine})${tagOpt}>)\\s*`, "g")
  let ex_bothEndRemove = new RegExp(`\\s*(<\\/(?:${mltLine}|${snglLine})${tagOpt}>)`, "g")
  let ex_bothBegin = new RegExp(`(<(?:${mltLine}|${snglLine})${tagOpt}>)`, "g")
  let ex_mltEnd = new RegExp(`(<\\/(?:${mltLine})${tagOpt}>)`, "g")
  let ex_newline = new RegExp(`^(<(?:${mltLine})>)((?!<(?:${mltLine})>).+)`, "gm")
  let work = src
  .replace(/(\r?\n){2,}/gm, "")
  .replace(/[ \t]+/g, " ")
  .replace(ex_bothBeginRemove, "$1")
  .replace(ex_bothEndRemove, "$1")
  .replace(ex_bothBegin, "\n$1")
  .replace(ex_mltEnd, "\n$1")
  .replace(ex_newline, "$1\n$2")
  .split("\n")
  let i = 0
  let tagAccum = []
  let ex_indTag = new RegExp(`^<(?<end>\\/?)(?<tag>${mltLine})${tagOpt}>`)
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
