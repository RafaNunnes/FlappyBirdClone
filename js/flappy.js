function novoElemento(tag_name, class_name) {
    const element = document.createElement(tag_name)
    element.className = class_name

    return element
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo: borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

function ParDeBarreiras(altura, abertura, x) {
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const altura_superior = Math.random() * (altura - abertura)
        const altura_inferior = altura - abertura - altura_superior
        this.superior.setAltura(altura_superior)
        this.inferior.setAltura(altura_inferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

// const par_de_barreiras = new ParDeBarreiras(450, 100, 400)
// document.querySelector('[wm-flappy]').appendChild(par_de_barreiras.elemento)

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    // Quantidade de pixels percorridos durante cada iteração da animação
    const deslocamento = 3

    this.animar = () => {
        this.pares.forEach( par => {
            par.setX(par.getX() - deslocamento)

            // Quando o elemento sair da área do jogo (tela)
            if(par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura/2
            const cruzou_o_meio = par.getX() + deslocamento >= meio
                && par.getX() < meio

            cruzou_o_meio && notificarPonto()
        })
    }
}

const barreiras = new Barreiras(450, 1200, 100, 400)
const area_do_jogo = document.querySelector('[wm-flappy]')
barreiras.pares.forEach(barreira => {
    area_do_jogo.appendChild(barreira.elemento)
})

setInterval( () => {
    barreiras.animar()
}, 20)