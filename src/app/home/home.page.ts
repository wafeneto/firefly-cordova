import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia';

// declare let cordova: any;
// declare let window: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cores2 = ["red","red","green","blue","yellow","orange","brown","grey"];
  hora: any = null;
  corClaro = "";
  totalTime = 0;
  qtTime = 0;
  intervalo = 50;
  delay = 0;
  horaLa = "";
  cor = "aliceblue"
  nextBlink = 0;
  nextBlinkArr = new Array();
  constructor(public insomnia: Insomnia) {
    this.nextBlinkArr[0] = 4;
    this.nextBlinkArr[4] = 8;
    this.nextBlinkArr[8] = 2;
    this.nextBlinkArr[2] = 6;
    this.nextBlinkArr[6] = 0;
    this.startTime()
  }

  ngOnInit(){
    try{
      console.log(window)

      alert(this.insomnia)
      this.insomnia.keepAwake();


    }catch(error){
      alert(error + "ERROR")
    }
  }

  startBlink(){

    setTimeout(() => {
        this.roda();
        
      }, this.intervalo);	
  }

  roda(){
    setTimeout(() => {
        this.roda();
        
      }, this.intervalo);
    
    
    let milisec = new Date().getTime()-this.delay;
    
    
    
    this.hora = new Date(milisec);
    this.horaLa = this.hora.getHours() + ":" + this.hora.getMinutes() + ":" + this.hora.getSeconds();
    var centiseg = Math.ceil((milisec%1000)/100)-1;
    //centi.innerHTML = centiseg;
    
    
    //if(hora.getSeconds() != segundos)
      if(centiseg == this.nextBlink)
        {
        this.nextBlink = this.nextBlinkArr[this.nextBlink];
        this.cor = this.corClaro;
      setTimeout(() => {
          this.apaga();
          
        }, 20);
    }
  }

  apaga(){    
    var segundos = this.hora.getSeconds();
    
    let decSeg = Math.ceil(segundos/10) ;
    
    let color = this.cores2[decSeg];
    
    //centi.innerHTML = decSeg + " - " + color;
    
    this.cor = color;
  }

  startTime(){
    setTimeout(() => {
      this.stepTime();
        
      }, 200);
  }

  stepTime(){
    var antes = new Date();
    var retorno = this.bind("https://garanhuns.vvision.com.br/teste.php","POST")
    var depois = new Date();
    
    this.qtTime++;
    this.totalTime = this.totalTime + (depois.getTime() -antes.getTime());
    
    
    if(this.qtTime <7){
      setTimeout(() => {
        this.stepTime();
          
        }, 200);	
    }else{
      this.delay = this.totalTime / 14;
      retorno = eval(retorno) + this.delay;
      
      this.delay = (new Date()).getTime() - retorno;	
      
      var hora = new Date(new Date().getTime()-this.delay);
      this.horaLa = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
      
      this.startBlink();
    }
    
    
  }

  bind( url: string, metodo: string) {

    var http_request: any = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
      http_request = new XMLHttpRequest();
      if (http_request.overrideMimeType) {
        http_request.overrideMimeType('text/html; charset=utf-8');
      }
    }
    if (!http_request) {
      alert('Nï¿½o foi posï¿½vel inicializar o objeto XMLHTTP neste browser');
      return false;
    }
  
    http_request.open(metodo, url, false);
  
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
    
    http_request.send("");
    return (http_request.responseText);
  }

}
