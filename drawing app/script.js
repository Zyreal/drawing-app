const canvas = document.getElementById('canvas')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const clearEl = document.getElementById('clear')

const range = document.getElementById('range')

const form = document.getElementById('form')

const ctx = canvas.getContext('2d'); // allows the canvas to be drawn on

let size = 10
let isPressed = false
colorEl.value = 'black'
let color = colorEl.value
let x
let y

canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX // find the x and y position of the mouse relative to document
    y = e.offsetY
})

document.addEventListener('mouseup', (e) => {
    isPressed = false
    
    x = undefined //basically null the position if not pressed
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY
        
        drawCircle(x2, y2) // make a dot at current location
        drawLine(x, y, x2, y2) // since mouse is still pressed, connect dot with previous location

        x = x2 // update coordinates
        y = y2
    }
})

function drawCircle(x,y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2) // (X, Y (mouse position), radius, start angle, end angle (in radians), optional counterclockwise (true/false))
    ctx.fillStyle = color // color of the shape made (circle)
    ctx.fill() // fill entire circle
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color // chooses color, gradient, or pattern
    ctx.lineWidth = size * 2 // times 2 cause radius is already size so diameter things
    ctx.stroke()
}

function updateSizeOnScreen() {
    //sizeEl.innerText = size
    if (size > 100) {
        size = 100
    }
    else if (size < 1) {
        size = 1
    }

    sizeEl.value = size

    range.value = size
}

increaseBtn.addEventListener('click', () => {
    size += 1

    updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
    size -= 1

    updateSizeOnScreen()
})

colorEl.addEventListener('change', (e) => color = e.target.value)

clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height)) // from top left to bottom right

range.addEventListener('input', (e) => {
    size = +e.target.value // the + tries to convert the value into a number, else NaN

    updateSizeOnScreen()
})

sizeEl.addEventListener('input', (e) => {
    if (! isNaN(sizeEl.value)) { // Not a Number (false is number, true is not)
        size = +sizeEl.value
    }
    else {
        alert('Not a valid number')
    }
    updateSizeOnScreen()
})
