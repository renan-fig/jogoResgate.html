//sintaxe toda formada em JQuery
function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

  //Principais variáveis do jogo
    var jogo = {}
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
        }
    
        jogo.pressionou = [];
    
    var velocidade=5; //velocidade 
    var posicaoY = parseInt(Math.random() * 334); //posição aleatoria do inimigo1
    var podeAtirar=true; //variavel para o disparo
    var fimdejogo=false; //game over
    var pontos=0;
    var salvos=0;
    var perdidos=0;
    var energiaAtual=3;
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");

    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    //Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });
    
    
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });

    //Game Loop
    jogo.timer = setInterval(loop,30);

    function loop() {
        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
        placar();
        energia();
    } 
    // Fim da função loop()
    
	function movejogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo-10); //o objeto caminha na direção descrita (topo) com ordem de (-10)
            if (topo<=0) {
                $("#jogador").css("top",topo+10); //limita a movimentação do objeto ao limite da div (superior nesse caso)
            }
        }
        
        if (jogo.pressionou[TECLA.S]) {   
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);	//o objeto caminha na direção descrita (topo) com ordem de (+10)
            if (topo>=434) {	
                $("#jogador").css("top",topo-10); //limita a movimentação do objeto ao limite da div (inferior nesse caso)
                    
            }
        }
        
        if (jogo.pressionou[TECLA.D]) {
            disparo();
            //Chama função Disparo	
        }
    } 
    // fim da função movejogador()

    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left")); //transforma o objeto (imagem) en int
        $("#amigo").css("left",posicaoX+1); //o objeto caminha na direção descrita (left) com ordem de (+1)
                    
        if (posicaoX>906) {   
            $("#amigo").css("left",0);   //limita a movimentação do objeto ao limite da div (retorna ao valor inicial)
        }
    } 
    // fim da função moveamigo()

    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade); //o objeto caminha na direção descrita (posicaoX) com ordem de (-velocidade)
        $("#inimigo1").css("top",posicaoY);  

        if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694); //limita a movimentação do objeto ao limite da div
            $("#inimigo1").css("top",posicaoY);    
        }
    } 
    //Fim da função moveinimigo1()

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	    $("#inimigo2").css("left",posicaoX-3); //o objeto caminha na direção descrita (posicaoX) com ordem de (-3)
				
		if (posicaoX<=0) {
		    $("#inimigo2").css("left",775);	//limita a movimentação do objeto ao limite da div (retorna ao valor inicial)
		}
    } 
    // Fim da função moveinimigo2()

    function disparo() {
        if (podeAtirar==true) { 

            somDisparo.play();

            podeAtirar=false; //altera o valor para false a fim de impedir que o dispara saia várias vezes
            
            topo = parseInt($("#jogador").css("top")) //determina onde esta o jogador
            posicaoX= parseInt($("#jogador").css("left")) //determina onde esta o jogador
            tiroX = posicaoX + 190; //local incial do disparo
            topoTiro=topo+37;
            $("#fundoGame").append("<div id='disparo'></div"); //criando a div "disparo"
            $("#disparo").css("top",topoTiro); //posicionando a div
            $("#disparo").css("left",tiroX); //posicionando a div
            
            var tempoDisparo=window.setInterval(executaDisparo, 30);   //função que estabelece um tempo de um disparo para o outro
        } 
        //Fecha podeAtirar
     
            function executaDisparo() {
                posicaoX = parseInt($("#disparo").css("left")); //estabelece o ponto inicial do disparo
                $("#disparo").css("left",posicaoX+15); //atribui a "velocidade" de movimento do disparo
    
                if (posicaoX>900) {         
                    window.clearInterval(tempoDisparo); //remove a variavel de tempo
                    tempoDisparo=null; //zera a variavel de tempo
                    $("#disparo").remove(); //remove a div de disparo da tela
                    podeAtirar=true; //retorna o valor "true" ao "podeAtirar" permitindo que o usuário dispare novamente   
                }
            } // Fecha executaDisparo()
        } 
        // Fecha disparo()
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1"))); //identifica a colisao do "jogador" com o "inimigo1"
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        var fimdejogo=false;
    
        // jogador com o inimigo1
    
	    if (colisao1.length>0) { //verifica se houve colisão ou não
            somExplosao.play();
            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y); //chama a função "explosao1"
        
            posicaoY = parseInt(Math.random() * 334); //reposiciona o "inimigo"
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }
        // jogador com o inimigo2 
        if (colisao2.length>0) { //verifica se houve colisão ou não
            somExplosao.play();
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y); //chama a função "explosao2"
                    
            $("#inimigo2").remove();
                
            reposicionaInimigo2();   //reposiciona o "inimigo"
        }

        // Disparo com o inimigo1
        if (colisao3.length>0) { //verifica se houve colisão ou não
            somExplosao.play();
            velocidade=velocidade+0.3;
            pontos = pontos+100;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
                
            explosao1(inimigo1X,inimigo1Y); //chama a função "explosao1"
            $("#disparo").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334); //reposiciona o "inimigo"
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);     
        }	
        // Disparo com o inimigo2
        if (colisao4.length>0) { //verifica se houve colisão ou não
            somExplosao.play();
            velocidade=velocidade+0.3;
            pontos = pontos+50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove(); //remove o inimigo da tela
        
            explosao2(inimigo2X,inimigo2Y); //chama a função "explosao2"
            $("#disparo").css("left",950);
            
            reposicionaInimigo2();  //reposiciona o "inimigo"
        }
        // jogador com o amigo
        if (colisao5.length>0) {
            somResgate.play();
            salvos++;
            reposicionaAmigo(); //reposiciona o "amigo"
            $("#amigo").remove();
        }
        //Inimigo2 com o amigo
        if (colisao6.length>0) { 
            somPerdido.play();
            perdidos++; 
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove(); //remove o "amigo"s da tela
                    
            reposicionaAmigo(); //reposiciona o "amigo"
        }
    } 
    //Fim da função colisao()

    //Reposiciona Inimigo2
	function reposicionaInimigo2() {
        var tempoColisao4=window.setInterval(reposiciona4, 5000); //inimigo será reposicionado após 5s 
        
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
            if (fimdejogo==false) {
                $("#fundoGame").append("<div id=inimigo2></div");
            }
        }	
    }	
    //Reposiciona Amigo
	function reposicionaAmigo() {
        var tempoAmigo=window.setInterval(reposiciona6, 6000); //amigo será reposicionado após 5s
        
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");             
            }  
        }  
    } 
    // Fim da função reposicionaAmigo()
    
    //Explosão 1
    function explosao1(inimigo1X,inimigo1Y) { 
        $("#fundoGame").append("<div id='explosao1'></div"); //atribui a "explosao1" ao "fundoGame"
        $("#explosao1").css("background-image", "url(assets/imgs/explosao.png)"); //puxa a imagem da animação
        var div=$("#explosao1"); //cria div explosao1
        //indica localização da div explosão
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow"); //função de animação da div
        
        var tempoExplosao=window.setInterval(removeExplosao, 1000); //remove a div explosão da tela através da função "removeExplosao"

        function removeExplosao() { //função para remover a explosão
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao=null;     
        }     
    }
    // Fim da função explosao1()

    //Explosão2
	function explosao2(inimigo2X,inimigo2Y) {
	
        $("#fundoGame").append("<div id='explosao2'></div"); //atribui a "explosao2" ao "fundoGame"
        $("#explosao2").css("background-image", "url(assets/imgs/explosao.png)"); //puxa a imagem da animação
        var div2=$("#explosao2"); //cria div explosao2
        //indica localização da div explosão
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow"); //função de animação da div
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000); //remove a div explosão da tela através da função "removeExplosao"
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2=null;  
        }  
    } 
    // Fim da função explosao2()

    //Explosão3
	
    function explosao3(amigoX,amigoY) {
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;      
        }   
    } 
    // Fim da função explosao3
    function placar() {
        $("#placar").html("<h2> Pontos: "+ pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");  
    } 
    //fim da função placar()

    //Barra de energia

    function energia() {
        if (energiaAtual==3) {
            $("#energia").css("background-image", "url(assets/imgs/energia3.png)");
        }
        if (energiaAtual==2) {   
            $("#energia").css("background-image", "url(assets/imgs/energia2.png)");
        }
        if (energiaAtual==1) {   
            $("#energia").css("background-image", "url(assets/imgs/energia1.png)");
        }
        if (energiaAtual==0) {   
            $("#energia").css("background-image", "url(assets/imgs/energia0.png)");  
            gameOver();
        } //Game Over

    } 
    // Fim da função energia()

    //Função GAME OVER
	function gameOver() {
        fimdejogo=true;
        musica.pause();
        somGameover.play();
        
        window.clearInterval(jogo.timer);
        jogo.timer=null;
        
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
        
        $("#fundoGame").append("<div id='fim'></div>");
        
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    } 
    // Fim da função gameOver();

    //Função que movimenta o fundo do jogo
    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1); 
    } 
    // fim da função movefundo()
}
// Fim da função start

//Reinicia o Jogo
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();	
} //Fim da função reiniciaJogo


