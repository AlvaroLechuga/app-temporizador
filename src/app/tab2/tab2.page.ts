import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public hora: string = '00:00:00';
  public horas: number = 0;
  public minutos: number = 0;
  public segundos: number = 0;
  
  public horasString: string = '00';
  public minutosString: string = '00';
  public segundosString: string = '00';

  public iniciar: boolean = false;
  public comienzo: boolean = true;

  public intervalo: any;

  constructor(
  ) {}

  public ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  public empezar(): void {
    this.comienzo = false;
    this.iniciar = true;

    const time = this.hora.split(':');
    this.horas = +time[0];
    this.minutos = +time[1];
    this.segundos = +time[2];

    this.horasString = this.minTwoDigits(+time[0]);
    this.minutosString = this.minTwoDigits(+time[1]);
    this.segundosString = this.minTwoDigits(+time[2]);

    this.cargar();
  }

  public reiniciar(): void {
    this.comienzo = true;
    this.iniciar = false;
    this.hora = '00:00:00';
  }

  public cargar(): void {
    this.intervalo = setInterval(() => {
      if (this.iniciar) {
        if (this.segundos === 60) {
          this.segundos = 0;
          this.segundosString = '00';
          this.minutos--;
          this.minutosString = this.minTwoDigits(this.minutos);
          if (this.minutos === 60) {
            this.minutos = 0;
            this.minutosString = '00';
            this.horas--;
            this.horasString = this.minTwoDigits(this.horas);
          }
        }
        this.segundos--;
        this.segundosString = this.minTwoDigits(this.segundos);
      }
      if (this.segundos == 0 && this.minutos === 0 && this.horas === 0) {
        this.ngOnDestroy();
      }
    }, 1000);
  }

  private minTwoDigits(n): string {
    return (n < 10 ? '0' : '') + n;
  }
}
