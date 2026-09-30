(function(){
  class DeckStage extends HTMLElement{
    connectedCallback(){
      // mover las secciones a un escenario de tamaño fijo
      const escenario=document.createElement('div');
      escenario.className='escenario';
      while(this.firstElementChild) escenario.appendChild(this.firstElementChild);
      this.appendChild(escenario);

      this.slides=[...escenario.querySelectorAll('section')];
      this.i=0;

      // chrome
      this.contador=document.createElement('div');
      this.contador.className='chrome contador';
      document.body.appendChild(this.contador);

      this.barra=document.createElement('div');
      this.barra.className='barra';
      document.body.appendChild(this.barra);

      this.btn=document.createElement('button');
      this.btn.className='chrome btn';
      this.btn.type='button';
      this.btn.textContent='Pantalla completa';
      this.btn.addEventListener('click',()=>this.pantallaCompleta());
      document.body.appendChild(this.btn);

      // escala
      this.escalar();
      addEventListener('resize',()=>this.escalar());

      // teclado
      addEventListener('keydown',e=>this.tecla(e));

      // arrastre táctil
      let x0=null;
      addEventListener('touchstart',e=>{x0=e.changedTouches[0].clientX},{passive:true});
      addEventListener('touchend',e=>{
        if(x0===null)return;
        const dx=e.changedTouches[0].clientX-x0;
        if(Math.abs(dx)>60){ dx<0 ? this.ir(this.i+1) : this.ir(this.i-1); }
        x0=null;
      },{passive:true});

      // dirección por hash, solo al cargar
      const h=parseInt(location.hash.replace('#',''),10);
      this.ir(Number.isFinite(h)&&h>0 ? h-1 : 0, true);
    }

    escalar(){
      const s=Math.min(innerWidth/1920, innerHeight/1080);
      this.style.setProperty('--s',s);
    }

    ir(n,inicial){
      if(n<0||n>=this.slides.length) return;
      this.slides.forEach(s=>s.classList.remove('activa'));
      this.i=n;
      const s=this.slides[n];
      s.classList.add('activa');
      // reiniciar animaciones
      s.querySelectorAll('[data-anim]').forEach(el=>{
        el.style.animation='none'; void el.offsetWidth; el.style.animation='';
      });
      this.contador.textContent=(n+1)+' / '+this.slides.length;
      this.barra.style.width=((n+1)/this.slides.length*100)+'%';
      if(!inicial) history.replaceState(null,'','#'+(n+1));
      document.title=(s.dataset.label||'')+' · Microclima';
    }

    tecla(e){
      const k=e.key;
      if(k==='ArrowRight'||k==='ArrowDown'||k==='PageDown'||k===' '){e.preventDefault();this.ir(this.i+1)}
      else if(k==='ArrowLeft'||k==='ArrowUp'||k==='PageUp'){e.preventDefault();this.ir(this.i-1)}
      else if(k==='Home'){e.preventDefault();this.ir(0)}
      else if(k==='End'){e.preventDefault();this.ir(this.slides.length-1)}
      else if(k==='r'||k==='R'){this.ir(0)}
      else if(k==='f'||k==='F'){this.pantallaCompleta()}
      else if(/^[1-9]$/.test(k)){this.ir(parseInt(k,10)-1)}
    }

    pantallaCompleta(){
      if(document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  }
  customElements.define('deck-stage',DeckStage);
})();