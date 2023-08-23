let Calcbody = document.createElement('div')
Calcbody.classList.add('calcbody')
document.body.appendChild(Calcbody)

let titlediv = document.createElement('div')
titlediv.classList.add('title')
Calcbody.appendChild(titlediv)
let WeezyyLogoNode = document.createTextNode('Weezyy')
let LogoH = document.createElement('h1')
LogoH.appendChild(WeezyyLogoNode)
LogoH.classList.add('Logo')
titlediv.appendChild(LogoH)

let WeezyyVersionNode = document.createTextNode('W-1.0')
let VersionH = document.createElement('h1')
VersionH.appendChild(WeezyyVersionNode)
VersionH.classList.add('version')
titlediv.appendChild(VersionH)

let displayScreen = document.createElement('div')
displayScreen.classList.add('screen')
Calcbody.appendChild(displayScreen)

let old = document.createElement('div')
old.classList.add('old')
displayScreen.appendChild(old)

let current = document.createElement('div')
current.classList.add('current')
displayScreen.appendChild(current)

let numberdiv = document.createElement('div')
numberdiv.classList.add('numberdiv')
Calcbody.appendChild(numberdiv)

for (let i = 9; i > -2; i--) {
  let button = document.createElement('button')
  if (i === 0) {
    button.innerText = '.'
    button.setAttribute('data-number', '.')
  } else if (i === -1) {
    button.innerText = 0
    button.setAttribute('data-number', 0)
  } else {
    button.innerText = i
    button.setAttribute('data-number', i)
  }
  numberdiv.appendChild(button)
}

let opdiv = document.createElement('div')
opdiv.classList.add('opdiv')
Calcbody.appendChild(opdiv)

let delbutton = document.createElement('button')
delbutton.innerText = 'Del'
delbutton.setAttribute('data-number', 'Del')
opdiv.appendChild(delbutton)

let ACbutton = document.createElement('button')
ACbutton.innerText = 'AC'
ACbutton.setAttribute('data-number', 'AC')
opdiv.appendChild(ACbutton)
let op = ['x', '÷', '+', '-', '%', '=']
for (let i = 0; i < op.length; i++) {
  let button = document.createElement('button')
  button.innerText = op[i]
  button.setAttribute('data-number', op[i])
  opdiv.appendChild(button)
}

function updateScroll() {
  current.scrollLeft = current.scrollWidth - current.clientWidth
}
let numbers = []
let oper = null
let anybutton = document.querySelectorAll('button')
anybutton.forEach((b) => {
  b.addEventListener('click', () => {
    let screentext = current.innerText
    if (
      screentext === 'x' ||
      screentext === '÷' ||
      screentext === '+' ||
      screentext === '-' ||
      screentext === '+' ||
      screentext === '%'
    ) {
      screentext = current.innerText = ''
    }
    if (
      b.getAttribute('data-number') === 'x' ||
      b.getAttribute('data-number') === '÷' ||
      b.getAttribute('data-number') === '+' ||
      b.getAttribute('data-number') === '-' ||
      b.getAttribute('data-number') === '+' ||
      b.getAttribute('data-number') === '%'
    ) {
      numbers.push(Number(screentext))
      console.log(numbers)
      if (numbers.length == 2) {
        let res = -1
        switch (oper) {
          case 'x':
            res = numbers[0] * numbers[1]
            break
          case '÷':
            res = numbers[0] / numbers[1]
            break
          case '+':
            res = numbers[0] + numbers[1]
            break
          case '-':
            res = numbers[0] - numbers[1]
            break
          case '%':
            res = numbers[0] % numbers[1]
            break
          default:
            break
        }
        old.innerText = res
        numbers = [res]
      } else old.innerText = screentext
      screentext = ''
      current.innerText = screentext
      oper = b.getAttribute('data-number')
    }
    if (b.getAttribute('data-number') === '.' && screentext.includes('.')) {
      return
    }
    if (b.getAttribute('data-number') === 'Del') {
      let text = current.innerText
      current.innerText = text.substring(0, text.length - 1)
    }
    if (b.getAttribute('data-number') === 'AC') {
      numbers = []
      oper = null
      console.log(numbers, oper)
      old.innerText = current.innerText = ''
    }
    if (b.getAttribute('data-number') === '=') {
      numbers.push(Number(screentext))
      console.log(numbers)
      let res = ''
      if (numbers.length == 2) {
        switch (oper) {
          case 'x':
            res = numbers[0] * numbers[1]
            break
          case '÷':
            res = numbers[0] / numbers[1]
            break
          case '+':
            res = numbers[0] + numbers[1]
            break
          case '-':
            res = numbers[0] - numbers[1]
            break
          case '%':
            res = numbers[0] % numbers[1]
            break
          default:
            break
        }
      }
      numbers = []
      oper = '='
      old.innerText = res
      current.innerText = ''
    } else {
      if (old.innerText != '' && oper === '=') {
        old.innerText = ''
      }
      current.innerText = screentext + b.getAttribute('data-number')
    }
    updateScroll()
  })
})
