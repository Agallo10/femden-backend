


const getMenuFrontEnd = ( rol=  '5f9738d340cb934fbccd96d7') => {


    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu:[
            {titulo: 'Main', url: '/'},
            //{titulo: 'Cuentas', url: 'cuentas'},
            //{titulo: 'Crear cuenta', url: 'crear-cuenta'},
            {titulo: 'Personas', url: 'personas'},
            {titulo: 'Denuncias', url: 'denuncias'},
            {titulo: 'Graficas', url: 'grafica1'},
          ]
        }
      ];

      if (rol === '5f9738ae40cb934fbccd96d6') {

          menu[0].submenu.unshift({titulo: 'Cuentas', url: 'cuentas'});
          menu[0].submenu.unshift({titulo: 'Crear cuenta', url: 'crear-cuenta'});
      }

      return menu;
} 

module.exports = {
    getMenuFrontEnd
}