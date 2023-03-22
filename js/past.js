let apiUrl = "https://mindhub-xj03.onrender.com/api/amazing"

let inputText = ''
const card = document.getElementById('card_past')


//funcion async
async function traer_datos() {
    try {
        const response = await fetch(apiUrl);
        const datos = await response.json();
        let eventos = datos.events;
        categorias(eventos)
        const pastEvents = eventos.filter(elemento => new Date(elemento.date) < new Date(datos.currentDate))
        traer_cartas(pastEvents, card)
        //agregar escuchador de eventos categorias
        let checkboxs = document.querySelectorAll('input[type= checkbox]')
        console.log(checkboxs);
        checkboxs.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                inputsChequeados = Array.from(checkboxs).filter(checkbox => checkbox.checked).map(input => input.value)
                //console.log(inputsChequeados);
                filtrosCruzados(pastEvents)
            }
            )

        })
        const search_input = document.getElementById("search_input")
        console.log(search_input)
        search_input.addEventListener('keyup', () => {
            inputText = search_input.value
            //console.log(texto(inputText))
            filtrosCruzados(pastEvents)
        })
    }
    catch (error) {
        console.log(error);
    }
}
traer_datos()

function traer_cartas(arrayCards, container) {

    let fragment = document.createDocumentFragment()
    container.innerHTML = ``
    if (inputText != "" && arraySearch.length == 0) {
        let div = document.createElement('div')
        div.classList.add("card")
        div.style.width = "18rem"
        div.innerHTML = `<h5>Sorry ${inputText} it is not in our catalog of events</h5>`

        container.appendChild(div)
    }
    for (let element of arrayCards) {
        let div = document.createElement('div')
        div.classList.add("card")
        div.style.width = "18rem"
        div.innerHTML = `<img src=${element.image} class="card-img-top " alt="...">
             <div class="card-body text_center">
                 <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <h6>Price</h6>
                <h6>$${element.price}</h6>
            <a href="./details.html?id=${element._id}" class="btn btn-danger">Go Details</a>           
             </div>`

        fragment.appendChild(div)

    } container.appendChild(fragment)
}

//categorys dinamicas
function categorias(array) {
    const arreglo = []
    for (let element of array) {
        let categoria = element.category
        if (!arreglo.includes(categoria)) {
            arreglo.push(categoria)
        }
    } console.log(arreglo);

    const formCat = document.getElementById('formCat')
    let checkbox = document.createDocumentFragment()
    for (let element of arreglo) {
        let div = document.createElement('div')
        div.classList.add("formCat")

        div.innerHTML = `<input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="${element}" value="${element}">
    <label class="form-check-label" for="${element}">${element}</label>`

        checkbox.appendChild(div)

    } formCat.appendChild(checkbox)

}

function verificarSeleccion(arrayString, arrayDeObjetos) {
    if (arrayString.length == 0) return arrayDeObjetos

    let eventosFiltrados = arrayDeObjetos.filter(evento => arrayString.includes(evento.category))
    return eventosFiltrados
    //console.log(eventosFiltrados);
}

//escuchar eventos del search

let inputsChequeados = []
let arraySearch = []
function texto(valor, arrayDeObjetos) {
    if (valor == "") return arrayDeObjetos
    return arrayDeObjetos.filter(elemento => elemento.name.toLowerCase().includes(valor.toLowerCase().trim()))
}
//filtros cruzados
function filtrosCruzados(array) {
    let nuevaSeleccion = verificarSeleccion(inputsChequeados, array)
    console.log(nuevaSeleccion);

    arraySearch = texto(inputText, nuevaSeleccion)
    console.log(arraySearch);
    traer_cartas(arraySearch, card)
}

