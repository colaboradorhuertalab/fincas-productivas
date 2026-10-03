class DeckStage extends HTMLElement{
  connectedCallback(){
    this.slides=[...this.querySelectorAll('section')];
    this.i=-1;
    this.slides.forEach((s,j)=>{
      const d=s.querySelector('.d');
      if(d&&!d.querySelector('.nn')){
        const n=document.createElement('i');
        n.className='nn';n.textContent=String(j+1).padStart(2,'0');
        d.appendChild(n);
      }
    });
    const t=document.getElementById('t'); if(t)t.textContent=this.slides.length;
    this.fit=this.fit.bind(this);
    addEventListener('resize',this.fit);
    this.fit();
    const h=parseInt((location.hash||'').slice(1),10);
    this.go(Number.isFinite(h)&&h>0?h-1:0);
    addEventListener('keydown',e=>{
      if(e.metaKey||e.ctrlKey||e.altKey)return;
      const k=e.key;
      if(k==='ArrowRight'||k==='ArrowDown'||k==='PageDown'||k===' '){e.preventDefault();this.go(this.i+1)}
      else if(k==='ArrowLeft'||k==='ArrowUp'||k==='PageUp'){e.preventDefault();this.go(this.i-1)}
      else if(k==='Home'){this.go(0)}
      else if(k==='End'){this.go(this.slides.length-1)}
      else if(k==='r'||k==='R'){this.go(0)}
      else if(/^[1-9]$/.test(k)){this.go(parseInt(k,10)-1)}
      else if(k==='f'||k==='F'){this.pantalla()}
    });
    this.addEventListener('click',e=>{if(!e.target.closest('a,button'))this.go(this.i+1)});
    const fs=document.getElementById('fs');
    if(fs)fs.addEventListener('click',e=>{e.stopPropagation();this.pantalla()});
  }
  pantalla(){
    if(document.fullscreenElement)document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }
  fit(){
    this.style.setProperty('--s',Math.min(innerWidth/1920,innerHeight/1080));
  }
  go(n){
    n=Math.max(0,Math.min(this.slides.length-1,n));
    if(n===this.i)return;
    this.slides.forEach((s,j)=>s.classList.toggle('on',j===n));
    this.i=n;
    const el=id=>document.getElementById(id);
    if(el('n'))el('n').textContent=n+1;
    if(el('lbl'))el('lbl').textContent=this.slides[n].dataset.label||'';
    if(el('pb'))el('pb').style.width=((n+1)/this.slides.length*100)+'%';
  }
}
customElements.define('deck-stage',DeckStage);
addEventListener('beforeprint',()=>document.querySelectorAll('deck-stage section').forEach(s=>s.classList.add('on')));
