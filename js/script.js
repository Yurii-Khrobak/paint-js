// Лазерна карта OD
const canvasOD = document.getElementById('laser_card_OD')
const ctxOD = canvasOD.getContext('2d')

let isDrawingOD = false
let tool = ''

window.addEventListener('load', () => {
	canvasOD.width = canvasOD.offsetWidth
	canvasOD.height = canvasOD.offsetHeight
})

const startDrawOD = () => {
	isDrawingOD = true
	ctxOD.beginPath()
}

//const drawingOD = e => {
//	if (!isDrawingOD && tool !== 'arrow') return
//	ctxOD.lineTo(e.offsetX, e.offsetY)
//	ctxOD.stroke()
//}

const drawMarkAOD = e => {
	if (tool !== 'markA') return
	ctxOD.beginPath()
	ctxOD.arc(e.offsetX, e.offsetY, 50, 0, 2 * Math.PI, false)
	ctxOD.stroke()
}

const erase = () => {
	ctxOD.globalCompositeOperation = 'destination-out'
	ctxOD.arc(e.offsetX, e.offsetY, 8, 0, Math.PI * 2, false)
	ctxOD.fill()
}

//canvasOD.addEventListener('mousedown', startDrawOD)
//canvasOD.addEventListener('mousemove', drawingOD)
//canvasOD.addEventListener('mouseup', () => (isDrawingOD = false))

canvasOD.addEventListener('click', drawMarkAOD)
canvasOD.addEventListener('click', erase)

// Лазерна карта OS
const canvasOS = document.getElementById('laser_card_OS')
const ctxOS = canvasOS.getContext('2d')

let isDrawingOS = false

window.addEventListener('load', () => {
	canvasOS.width = canvasOS.offsetWidth
	canvasOS.height = canvasOS.offsetHeight
})

const startDrawOS = () => {
	isDrawingOS = true
	ctxOS.beginPath()
}

const drawingOS = e => {
	if (!isDrawingOS) return
	ctxOS.lineTo(e.offsetX, e.offsetY)
	ctxOS.stroke()
}

canvasOS.addEventListener('mousedown', startDrawOS)
canvasOS.addEventListener('mousemove', drawingOS)
canvasOS.addEventListener('mouseup', () => (isDrawingOS = false))

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
