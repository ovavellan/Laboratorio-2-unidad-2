var canvasWidth = 600;
//Variable del alto del lienzo
var canvasHeight = 500;


//Variable del jugador
var player;
//Variable de la posicion en la posicion Y
var playerYPosition = 200;
var fallSpeed = 0;
var interval = setInterval(updateCanvas, 20);// Crear la función de actualizar el canvas

var isJumping = false; 
var jumpSpeed = 0; //Funció para saltos

var block; // Crea la variable block

// Crear una puntuación de 0 para empezar
var score = 0;
// Crear una variable para mantener nuestra puntuaciónEtiqueta
var scoreLabel;

function startGame() { // Función que inicia el juego
  gameCanvas.start(); // Inicia el juego
  player = new createPlayer(30, 30, 10); // Crea el jugador
  block = new createBlock(); // Crea el bloque
  // Asigne a la variable scoreLabel un valor de scoreLabel()
  scoreLabel = new createScoreLabel(10, 30); // Crea la etiqueta de puntuación
}

// Variable gameCanvas donde se almacenara la creación del elemento Canvas
// y una función para establecer alto y ancho de el elemento Canvas
var gameCanvas = {
  canvas: document.createElement("canvas"), //Creación del elemento Canvas
  start: function () {
    this.canvas.width = canvasWidth; //Establece ancho
    this.canvas.height = canvasHeight; //Establece alto
    this.context = this.canvas.getContext("2d"); //Devolver contexto de dibujo en un lienzo de canvas
    document.body.insertBefore(this.canvas, document.body.childNodes[0]); //Devolver colección de nodos hijos
  }
}

// Creación de la función para bloque de ataque 
function createBlock() {
  var width = randomNumber(10, 50); //números aleatorios para ancho
  var height = randomNumber(10, 200); //números aleatorios para alto
  var speed = randomNumber(2, 6); //números aleatorios para velocidad

  this.x = canvasWidth;
  this.y = canvasHeight - height;

  this.draw = function () {
    ctx = gameCanvas.context;
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, width, height);
  }
  this.attackPlayer = function () {
    this.x -= speed;
    this.returnToAttackPosition();
  }
  this.returnToAttackPosition = function () {
    if (this.x < 0) {
      width = randomNumber(10, 50);
      height = randomNumber(50, 200);
      speed = randomNumber(4, 6);
      this.y = canvasHeight - height;
      this.x = canvasWidth;
      // Aumenta tu puntuación si tu bloque llegó al borde
      score++;
    }
  }
}

function createPlayer(width, height, x) { // Crea el jugador y lo asigna a la variable player (player = new createPlayer(30, 30, 10);)
  this.width = width; // Asigna el ancho del jugador
  this.height = height; // Asigna el alto del jugador
  this.x = x; // Asigna la posicion en la posicionX
  this.y = playerYPosition; // Asigna la posicion en la posicionY

  this.draw = function () { // Crea la función draw
    ctx = gameCanvas.context; // Crea la variable ctx
    ctx.fillStyle = "red"; // Asigna el color del jugador
    ctx.fillRect(this.x, this.y, this.width, this.height); // Dibuja el jugador
  }
  this.makeFall = function () { // Crea la función makeFall
    if (!isJumping) { // Si no está saltando
      this.y += fallSpeed; // Aumenta la posicion en la posicionY
      fallSpeed += 0.1; // Aumenta la velocidad de caida
      this.stopPlayer(); // Llama a la función stopPlayer
    }
  }
  this.stopPlayer = function () { // Crea la función stopPlayer
    var ground = canvasHeight - this.height; // Crea la variable ground
    if (this.y > ground) { // Si la posicion en la posicionY es mayor que la posicion en la posicionY del suelo
      this.y = ground; // Asigna la posicion en la posicionY del suelo
    } 
  }
  this.jump = function () { //Función para saltos
    if (isJumping) {
      this.y -= jumpSpeed;
      jumpSpeed += 0.3;
    }
  }
}

function detectCollision() {// Crea la función detectCollision
  var playerLeft = player.x // Crea la variable playerLeft con la posicion en la posicionX del jugador
  var playerRight = player.x + player.width; // Crea la variable playerRight con la posicion en la posicionX del jugador + el ancho del jugador
  var blockLeft = block.x; // Crea la variable blockLeft con la posicion en la posicionX del bloque
  var blockRight = block.x + block.width; // Crea la variable blockRight con la posicion en la posicionX del bloque + el ancho del bloque

  var playerBottom = player.y + player.height; // Crea la variable playerBottom con la posicion en la posicionY del jugador + el alto del jugador
  var blockTop = block.y; // Crea la variable blockTop con la posicion en la posicionY del bloque
 
  if (playerRight > blockLeft && // Si la posicion en la posicionX del jugador + el ancho del jugador es mayor que la posicion en la posicionX del bloque
    playerLeft < blockLeft && // Si la posicion en la posicionX del jugador es menor que la posicion en la posicionX del bloque
    playerBottom > blockTop) { // Si la posicion en la posicionY del jugador + el alto del jugador es mayor que la posicion en la posicionY del bloque
    gameCanvas.stop(); // Detiene el juego
  } 
}

// Creación de función para etiqueta de puntuación
function createScoreLabel(x, y) {
  this.score = 0;
  this.x = x;
  this.y = y;
  this.draw = function () {
    ctx = gameCanvas.context;
    ctx.font = "25px Marker Felt";
    ctx.fillStyle = "black";
    ctx.fillText(this.text, this.x, this.y);
  }
}

function updateCanvas() { // Crea la función updateCanvas
  detectCollision(); // Llama a la función detectCollision

  ctx = gameCanvas.context; // Crea la variable ctx
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Limpia el lienzo
 
  player.makeFall(); // Llama a la función makeFall
  player.draw(); // Llama a la función draw
  player.jump(); // Llama a la función jump
 
  block.draw(); // Llama a la función draw
  block.attackPlayer(); // Llama a la función attackPlayer

  // Vuelve a dibujar tu puntuación y actualiza el valor
  scoreLabel.text = "SCORE: " + score; // Asigna el valor de score a scoreLabel.text
  scoreLabel.draw(); // Llama a la función draw
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetJump() {
  jumpSpeed = 0;
  isJumping = false
}
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    isJumping = true;
    setTimeout(function () { resetJump(); }, 1000);
  }
}


// Alerta para dar indicaciones al usuario, la cuál  aparecerá al abrir la página
window.alert("Bienvenido a nuestro sitio web, para jugar usa la barra espaciadora");