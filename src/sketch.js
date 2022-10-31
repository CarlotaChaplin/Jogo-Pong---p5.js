//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variavéis da raquete

let xRaquete= 5; 
let yRaquete= 150;
let raqueteComprimento= 10;
let raqueteAltura= 90;
  
let colidiu= false;

//variavel da raquete do oponente e velocidade sem nada porque iremos manipular dentro da função do movimento da raquete do oponente 
let xRaqueteOponente= 585; 
let yRaqueteOponente= 150;
let velocidadeYOponente;

//variavéis de pontos - placar dos pontos
let meusPontos=0;
let pontosDoOponente=0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//criado o tamanho do cenário (largura, altura)
//foi adicionado o som da trilha em loop
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//criado a cor do cenário e aqui é chamado as funções que serão refatoradas
//depois foi alterado a função mostraRaquete colocando parametros dentro dela (x,y) para ser utilizado na mesma função as raquetes. 
function draw() {
    background('rgba(100%,0%,100%,0.5)');
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    //verificaColisaoRaquete();
    //colisaoMinhaRaqueteBiblioteca();
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaquete,yRaquete);
    verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
  
}

//criado o bolinha
function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro)
}

//criado a função para movimentar a bolinha
function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;//xBolinha= xBolinha+velocidadeXBolinha
    yBolinha += velocidadeYBolinha;
}

//criado para verificar a colisão da bolinha na borda 
function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

//criado a função minha raquete
//alterado e colocado paramentros dentro da função para ser utilizado para minha raquete e da oponente 
function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura); 
}

//criado para mover minha raquete para cima e para baixo e chamo a função no draw
function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;  
  }
}

//criamos uma colisaõ da bolinha com a minha raquete
function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha-raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
    raquetada.play();
    }
}

//criamos uma função a partir de uma solução de outra pessoa tiramos da biblioteca e comentamos a função verificaColisaoRaquete
//ao criar os paramentros para ser chamado na função e aproveitar essa função também para a colisão da bolinha na raquete do oponente mudaremos o nome da função colisaoMinhaRaqueteBiblioteca para verificaColisaoRaquete
function verificaColisaoRaquete(x,y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
      velocidadeXBolinha *= -1;
    raquetada.play();
     }
}

//função para movimentar a raquete do oponente e ela será chamada no draw
//aqui ela irá atrás da posição y da bolinha porem daremos uma burlada em -30.
function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente
}

//criamos função para aparecer o placar (variavel, x,y)
//depois fizemos alterações para que o placar ficasse igual do scracth
function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

//aqui foi criado a função para resgistrar os pontos quando a bola bater na borda
function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
      ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
      ponto.play();
    }
}

//depois de abaixarmos os sons criamos uma função preload dos sons
function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}



//se quiser que o oponente jogue utilizando as teclas "w e s" e não ser o computador terá que alterar a função movimentaRaqueteOponente para o que está abaixo.

//function movimentaRaqueteOponente(){
  //  if (keyIsDown(87)){
    //    yRaqueteOponente -= 10;
    //}
    //if (keyIsDown(83)){
      //  yRaqueteOponente += 10;
    //}
//}

//função criada para a bolinha não prender na raquete pelo aluno roger que compartilhou
function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}





