import { Component, OnInit } from '@angular/core';
import { Quienes } from '../../model/quienes';
import { QuienesService } from '../../services/quienes.service';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss']
})
export class QuienesSomosComponent implements OnInit {
  integrantes: Quienes[] = [];
  integrante: Quienes = {
    id: -1,
    nombre: '',
    cargo: '',
    imagen: '',
    orden: 0,
  };

  video: string = '';
  constructor(private quienesSomosService: QuienesService) {
  }

  ngOnInit(): void {
    this.cargaInicial();
    this.cargaInicial2();
    this.loadQuienes();
  }

  loadQuienes() {
    this.quienesSomosService.getQuienes().subscribe({
      next: (response) => {
        this.integrantes = response && response.length > 0 ? response : []
      }
    })
}

// loadVideo() {
//   this.quienesSomosService.loadVideo().subscribe(
//     (result) => console.log('result', result),
//     (error) => (console.log(error))
//   );
// }

cargaInicial() {
  let scroll = document.getElementById('scroll');
  scroll!.addEventListener("scroll", () => {
    this.cargaInicial2();
  });
}

cargaInicial2(){
  let scroll = document.getElementById('scroll');
  let animados = document.querySelectorAll('.animado');
  for (let i = 0; i < animados.length; i++) {
    let animado = <HTMLElement>animados[i]
    if (animado.offsetTop - 600 < scroll!.scrollTop) {
      animado.classList.add('activoitem');
      // console.log('scroll ', scroll.scrollTop,' animado ' , animado.offsetTop)
    }
  }
}

scrollInicial(id: string){
  let target = document.getElementById(id);
  console.log(target);

  target!.scrollIntoView({ behavior: 'smooth' });
}

}