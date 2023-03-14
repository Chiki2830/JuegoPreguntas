//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿Cuál es el océano más grande del mundo?",
        op0:"Océano Índico",
        op1:"Océano Ártico ",
        op2:" Océano Atlántico",
        op3:"Océano Pacífico",
        correcta:"3"
    },
    {
        id:1,
        pregunta:"¿Cuál es la capital de Australia?",
        op0:"Sídney",
        op1:"Melbourne",
        op2:"Canberra",
        op3:"Brisbane",
        correcta:"2"
    },
    {
        id:2,
        pregunta:"¿Quién fue el primer presidente de los Estados Unidos?",
        op0:"Thomas Jefferson",
        op1:"George Washington",
        op2:"John Adams",
        op3:"Abraham Lincoln",
        correcta:"1"
    },
    {
        id:3,
        pregunta:"¿Quién escribió la novela Cien años de soledad?",
        op0:"Gabriel García Márquez",
        op1:"Mario Vargas Llosa",
        op2:"Julio Cortázar",
        op3:"Pablo Neruda",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"¿Cuál es el elemento químico más abundante en el universo?",
        op0:"Hidrógeno",
        op1:"Oxígeno",
        op2:"Helio",
        op3:"Carbono",
        correcta:"0"
    },
    {
        id:5,
        pregunta:"¿En qué año tuvo lugar la Revolución Francesa?",
        op0:"1689",
        op1:"1989",
        op2:"1889",
        op3:"1789",
        correcta:"3"
    },
    {
        id:6,
        pregunta:"¿Quién escribió Don Quijote de la Mancha?",
        op0:"William Shakespeare",
        op1:"Gabriel García Márquez",
        op2:"Miguel de Cervantes",
        op3:"Jorge Luis Borges",
        correcta:"1"
    },
    {
        id:7,
        pregunta:"¿Qué país es el hogar del tango?",
        op0:"Brasil",
        op1:"Argentina",
        op2:"Chile",
        op3:"Uruguay",
        correcta:"1"
    },
    {
        id:8,
        pregunta:"¿Qué país es el hogar de los templos de Angkor Wat?",
        op0:"Vietnam",
        op1:"Tailandia",
        op2:"Camboya",
        op3:"Malasia",
        correcta:"2"
    },
    {
        id:9,
        pregunta:"¿Cuál es la ciudad más poblada de América Latina?",
        op0:"Ciudad de México",
        op1:"Bogotá",
        op2:"Buenos Aires",
        op3:"Río de Janeiro",
        correcta:"1"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);
    const label4 = crearLabel("3",pregunta.op3);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);
    opciones.appendChild(label4);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}