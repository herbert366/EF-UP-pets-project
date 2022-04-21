const fs = require('fs')

const htmlDefault = fs.readFileSync('./greeksAndZoadiacs.html', 'utf8')

const htmlSplitted = htmlDefault.split('\n')

//take s5 and s6 of each pet of the greeks and zoadiacs and put them in an array
const FindPetAndPhoto = htmlSplitted.reduce((acc, html) => {
  if (html.includes('s5') || html.includes('src')) {
    acc.push(html)
  }
  return acc
}, [])

// console.log(FindPetAndPhoto)

// filter only the words in the midle of the 'dir="ltr">Girtab</td>' and erase the rest and put them in an array
const greeksAndZoadiacsPetsNames = FindPetAndPhoto.reduce((acc, pet) => {
  if (pet.includes('dir="ltr">')) {
    acc.push(pet.split('dir="ltr">')[1].split('</td>')[0])
  }
  return acc
}, []).filter(name => name !== '')
// console.log(greeksAndZoadiacsPetsNames)

// filter only the links after the 'src="' and erase the rest and put them in an array
const greeksAndZoadiacsPetsLinks = FindPetAndPhoto.reduce((acc, pet) => {
  if (pet.includes('src="')) {
    acc.push(pet.split('src="')[1].split('"')[0])
  }
  return acc
}, [])

// console.log(greeksAndZoadiacsPetsLinks)

// join the index of the array with the name of the pet and the link of the pet and put them in an array with a function

function joinArrays(array1, array2) {
  return array1.map((_, index) => {
    return {
      name: array2[index],
      link: array1[index],
    }
  })
}

// console.log(joinArrays(greeksAndZoadiacsPetsLinks, greeksAndZoadiacsPetsNames))
