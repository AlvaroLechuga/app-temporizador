import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public horas: number = 0;
  public minutos: number = 0;
  public segundos: number = 0;
  
  public horasString: string = '00';
  public minutosString: string = '00';
  public segundosString: string = '00';

  public iniciar: boolean = false;

  public intervalo: any;

  constructor(
    private _alertCtrl: AlertController
  ) { }

  public ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  public start(): void {
    this.iniciar = !this.iniciar;
    if (this.iniciar && !this.intervalo) {
      this.cargar();
    } 
  }

  public reiniciar(): void {
    this._alertCtrl.create({
      header: 'Reiniciar cronómetro',
      message: '¿Quires reiniciar el cronómetro?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.horas = 0;
            this.minutos = 0;
            this.segundos = 0;
            this.iniciar = false;
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  public cargar(): void {
    this.intervalo = setInterval(() => {
      if (this.iniciar) {
        if (this.segundos === 60) {
          this.segundos = 0;
          this.segundosString = '00';
          this.minutos++;
          this.minutosString = this.minTwoDigits(this.minutos);
          if (this.minutos === 60) {
            this.minutos = 0;
            this.minutosString = '00';
            this.horas++;
            this.horasString = this.minTwoDigits(this.horas);
          }
        }
        this.segundos++;
        this.segundosString = this.minTwoDigits(this.segundos);
      }
    }, 1000);
  }

  private minTwoDigits(n): string {
    return (n < 10 ? '0' : '') + n;
  }

}
