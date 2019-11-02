function novoElemento(tag_name, class_name) {
    const element = document.createElement(tag_name)
    element.className = class_name

    return element
}

function Barreira(reversa = false) {
    this.element = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.element.appendChild(reversa ? corpo: borda)
    this.element.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

const b = new Barreira(true)
b.setAltura(200)
document.querySelector('[wm-flappy]').appendChild(b.element)