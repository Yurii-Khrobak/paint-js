// Глобальні змінні
let tool = ''
const tools = ['Erase', 'Mark-A', 'Mark-B']
const marks = [
{
  a1: 10,
  a2: 20,
  a3: 40
},
{
  b1: 50,
  b2: 100,
  b3: 200
}]
let radiuses = {erase: 5, a: 10, b: 50}


// Функції елементів
const getContext = (canvas) => {
  ctx = canvas.getContext('2d')
  return ctx
}

const erase = (e, ctx, isErase) => {
  if (!isErase || tool !== 'erase') return
  ctx.globalCompositeOperation = 'destination-out'
	ctx.arc(e.offsetX, e.offsetY, radiuses.erase, 0, Math.PI * 2, false)
	ctx.fill()
}

const drawMarkA = (e, ctx) => {
  if (tool !== 'mark-a') return
	ctx.beginPath()
	ctx.arc(e.offsetX, e.offsetY, radiuses.a, 0, 2 * Math.PI, false)
	ctx.stroke()
}

const drawMarkB = (e, ctx) => {
  if (tool !== 'mark-b') return
	ctx.beginPath()
	ctx.arc(e.offsetX, e.offsetY, radiuses.b, 0, 2 * Math.PI, false)
	ctx.stroke()
}


// Добавлення елементів в DOM
const toolSelect = document.getElementById('tool-select')

for(toolItem in tools) {
  let option = document.createElement('option')
  option.text = tools[toolItem]
  option.value = tools[toolItem].toLowerCase()
  toolSelect.appendChild(option)
}

const markASelect = document.getElementById('marks-a-select')

for(markItem in marks[0]) {
  let option = document.createElement('option')
  option.text = markItem.toUpperCase()
  option.value = marks[0][markItem]
  markASelect.appendChild(option)
}

const markBSelect = document.getElementById('marks-b-select')

for(markItem in marks[1]) {
  let option = document.createElement('option')
  option.text = markItem.toUpperCase()
  option.value = marks[1][markItem]
  markBSelect.appendChild(option)
}

// Стартові функції які виконуються під час повного завантаження сторінки
window.addEventListener('load', () => {
	canvasOD.width = canvasOD.offsetWidth
	canvasOD.height = canvasOD.offsetHeight
	
	canvasOS.width = canvasOS.offsetWidth
	canvasOS.height = canvasOS.offsetHeight
})



// Лазерна карта OD
let isEraseOD = false

const canvasOD = document.getElementById('laser_card_OD')
const ctxOD = getContext(canvasOD)

canvasOD.addEventListener('mousedown', () => (isEraseOD = true))
canvasOD.addEventListener('mousemove', (e) => {
  erase(e, ctxOD, isEraseOD)
})
canvasOD.addEventListener('mouseup', () => (isEraseOD = false))

canvasOD.addEventListener('click', function(e) {
  drawMarkA(e, ctxOD)
})
canvasOD.addEventListener('click', function(e) {
  drawMarkB(e, ctxOD)
})


// Лазерна карта OS
let isEraseOS = false

const canvasOS = document.getElementById('laser_card_OS')
const ctxOS = getContext(canvasOS)

canvasOS.addEventListener('mousedown', () => (isEraseOS = true))
canvasOS.addEventListener('mousemove', (e) => {
  erase(e, ctxOS, isEraseOS)
})
canvasOS.addEventListener('mouseup', () => (isEraseOS = false))

canvasOS.addEventListener('click', function(e)  {
  drawMarkA(e, ctxOS)
})
canvasOS.addEventListener('click', function(e) {
  drawMarkB(e, ctxOS)
})





// Панель інструментів
toolSelect.addEventListener('change', () => {
	tool = toolSelect.options[toolSelect.selectedIndex].value
})

const eraseRadiusInput = document.getElementById('erase-radius-input')

eraseRadiusInput.addEventListener('change', () => {
  radiuses.erase = eraseRadiusInput.value
})

const colorInput = document.getElementById('color-input')

const changeColor = () => {
	ctxOD.fillStyle = colorInput.value
	ctxOS.fillStyle = colorInput.value

	ctxOD.strokeStyle = colorInput.value
	ctxOS.strokeStyle = colorInput.value
}

colorInput.addEventListener('change', changeColor)


const lineWidthInput = document.getElementById('line-width-input')

const changeLineWidth = () => {
	ctxOD.lineWidth = parseInt(lineWidthInput.value)
	ctxOS.lineWidth = parseInt(lineWidthInput.value)
}

lineWidthInput.addEventListener('change', changeLineWidth)

markASelect.addEventListener('change', () => {
  radiuses.a = markASelect.options[markASelect.selectedIndex].value
  console.log(radiuses.a)
})

markBSelect.addEventListener('change', () => {
  radiuses.b = markBSelect.options[markBSelect.selectedIndex].value
  console.log(radiuses.b)
})
