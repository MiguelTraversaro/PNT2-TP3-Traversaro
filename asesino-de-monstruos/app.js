new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], // es para registrar los eventos de la partida
        esJugador: false,
        curacion: 10,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },

        atacar: function () {
            let daño = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= daño;
            this.turnos.unshift({
                esJugador: true,
                text: `El jugador golpea al monstruo por ${daño}`
            });
            if(this.verificarGanador()){
                this.turnos.unshift({
                    esJugador: true,
                    text: `El jugador derrotó al monstruo con un ataque`
                })
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let daño = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= daño;
            this.turnos.unshift({
                esJugador: true,
                text: `El jugador golpea al monstruo con un ataque especial por ${daño}`
            });
            if(this.verificarGanador()){
                this.turnos.unshift({
                    esJugador: true,
                    text: `El jugador derrotó al monstruo con un ataque especial`
                })
                return;
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if (this.saludJugador <= 90) {
                this.saludJugador += this.curacion;
            } else {
                this.saludJugador = 100;
            }
            this.turnos.unshift({
                esJugador: true,
                text: `El jugador se cura por ${this.curacion}`
            });
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {

        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            let daño = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= daño;
            this.turnos.unshift({
                esJugador: false,
                text: `El monstruo golpea al jugador por ${daño}`
            });
            if(this.verificarGanador()){
                this.turnos.unshift({
                    esJugador: false,
                    text: `El monstruo derrotó al jugador`
                })
                return;
            }
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random() * rango[1]) + 1, rango[0]);
        },

        verificarGanador: function () {
            let termino = false;
            if (this.saludMonstruo <= 0){
                this.hayUnaPartidaEnJuego = false;
                termino = true;
            } else if (this.saludJugador <= 0) {
                this.hayUnaPartidaEnJuego = false;
                termino = true;
            }
            return termino;
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});