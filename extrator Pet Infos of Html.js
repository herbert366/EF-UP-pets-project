const fs = require('fs')

const htmlDefault = fs.readFileSync('./greeksAndZoadiacs.html', 'utf8')

const htmlSplitted = htmlDefault.split('\n')

function ReduceHtmlSplittedToMiniHtml(htmlSplitted) {
  const miniHtml = htmlSplitted.reduce((acc, html) => {
    if (html.includes('s5') || html.includes('src')) {
      acc.push(html)
    }
    return acc
  }, [])

  return miniHtml
}

function FilterPetsNamesInMiniHtml(miniHtml) {
  const onlyPetNames = miniHtml
    .reduce((acc, infos) => {
      if (infos.includes('dir="ltr">')) {
        acc.push(infos.split('dir="ltr">')[1].split('</td>')[0])
      }
      return acc
    }, [])
    .filter(name => name !== '')
  return onlyPetNames
}

const onlyPetNames = FilterPetsNamesInMiniHtml(
  ReduceHtmlSplittedToMiniHtml(htmlSplitted)
)

function FilterImgLinksInMiniHtml(miniHtml) {
  const onlyImgLinks = miniHtml.reduce((acc, infos) => {
    if (infos.includes('src="')) {
      acc.push(infos.split('src="')[1].split('"')[0])
    }
    return acc
  }, [])
  return onlyImgLinks
}

const onlyImgLinks = FilterImgLinksInMiniHtml(
  ReduceHtmlSplittedToMiniHtml(htmlSplitted)
)

function joinArrays(array1, array2) {
  return array1.map((_, i) => {
    return {
      name: array1[i],
      link: array2[i],
    }
  })
}

const namePetsAndImgLinks = joinArrays(onlyPetNames, onlyImgLinks)

const writeInfos = fs.writeFileSync(
  './pets.json',
  JSON.stringify(namePetsAndImgLinks)
)
