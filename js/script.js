// Лазерна карта OD
const canvasOD = document.getElementById('laser_card_OD')
const ctxOD = canvasOD.getContext('2d')

let isEraseOD = false
let tool = ''

window.addEventListener('load', () => {
	canvasOD.width = canvasOD.offsetWidth
	canvasOD.height = canvasOD.offsetHeight
})


const drawMarkAOD = e => {
	if (tool !== 'markA') return
	ctxOD.beginPath()
	ctxOD.arc(e.offsetX, e.offsetY, 50, 0, 2 * Math.PI, false)
	ctxOD.stroke()
}

const eraseOD = e => {
  isEraseOD = true
	ctxOD.globalCompositeOperation = 'destination-out'
	ctxOD.arc(e.offsetX, e.offsetY, 8, 0, Math.PI * 2, false)
	ctxOD.fill()
}

canvasOD.addEventListener('mousedown', eraseOD)
canvasOD.addEventListener('mousemove', eraseOD)
canvasOD.addEventListener('mouseup', () => (isEraseOD = false))

canvasOD.addEventListener('click', drawMarkAOD)

// Лазерна карта OS
const canvasOS = document.getElementById('laser_card_OS')
const ctxOS = canvasOS.getContext('2d')

let isEraseOS = false

window.addEventListener('load', () => {
	canvasOS.width = canvasOS.offsetWidth
	canvasOS.height = canvasOS.offsetHeight
})

const drawMarkAOS = e => {
	if (tool !== 'markA') return
	ctxOS.beginPath()
	ctxOS.arc(e.offsetX, e.offsetY, 50, 0, 2 * Math.PI, false)
	ctxOS.stroke()
}

const eraseOS = e => {
  isEraseOS = true
	ctxOS.globalCompositeOperation = 'destination-out'
	ctxOS.arc(e.offsetX, e.offsetY, 8, 0, Math.PI * 2, false)
	ctxOS.fill()
}

canvasOS.addEventListener('mousedown', eraseOS)
canvasOS.addEventListener('mousemove', eraseOS)
canvasOS.addEventListener('mouseup', () => (isEraseOS = false))

canvasOS.addEventListener('click', drawMarkAOS)

// Панель інструментів

const toolSelect = document.getElementById('tool-select')

toolSelect.addEventListener('change', () => {
	tool = toolSelect.options[toolSelect.selectedIndex].value
})

const colorInput = document.getElementById('color-input')

const changeColor = () => {
	ctxOD.fillStyle = colorInput.value
	ctxOS.fillStyle = colorInput.value

	ctxOD.strokeStyle = colorInput.value
	ctxOS.strokeStyle = colorInput.value
}

colorInput.addEventListener('change', changeColor)

const brashSizeInput = document.getElementById('brash-size-input')

const changeBrashSize = () => {
	ctxOD.lineWidth = parseInt(brashSizeInput.value)
	ctxOS.lineWidth = parseInt(brashSizeInput.value)
}

brashSizeInput.addEventListener('change', changeBrashSize)
