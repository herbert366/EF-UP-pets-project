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

const onlyPetNamesArray = FilterPetsNamesInMiniHtml(
  ReduceHtmlSplittedToMiniHtml(htmlSplitted)
)

// const greeksAndZoadiacsPetsLinks = FindPetAndPhoto.reduce((acc, pet) => {
//   if (pet.includes('src="')) {
//     acc.push(pet.split('src="')[1].split('"')[0])
//   }
//   return acc
// }, [])
