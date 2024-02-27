const rutaArchivo = './index.html';
 
var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy
 
fetch(rutaArchivo)
  .then(response => response.text())
  .then(htmlContent => {
    // El contenido del archivo HTML está almacenado en la variable htmlContent
 
    sdk.setContent(htmlContent);
 
  })
  .catch(error => console.error('Error al cargar el archivo:', error));
 
  document.getElementById('enviar').addEventListener('click', () =>{
 
    var persona = document.getElementById('dynamicSelect').value;
    var fecha = document.getElementById('datepicker').value;
    var hora = document.getElementById('timepicker').value;
 
    var payload = JSON.stringify({
      items: [{
        "Nombre": persona,
        "Fecha": fecha,
        "Hora": hora
      }]
    });
    console.log(payload);

 
    // URL de la página web
          //const url = 'https://mc1-y847vx6hhqvmtnnxy67y87b1.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:Pruebas_Insercion_Datos_API/rows';
 
          fetch('https://mc1-y847vx6hhqvmtnnxy67y87b1.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:Pruebas_Insercion_Datos_API/rows', {
            method: 'POST',
            body: payload,
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IjQiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJaMms5bHdhSkJqQ0NFVHE3V3Rkb1dmbFgiLCJjbGllbnRfaWQiOiJ2Y25ld2t1M2k5NG5ubW56MXJrdzFtb3EiLCJlaWQiOjEwMDAxNDI3MCwic3RhY2tfa2V5IjoiUzEwIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciIsInBpZCI6NjkyfQ.7BUgheQomsHVQNMteXuTrDVuEaCSu_1k__7nlANlZYE.lc8yFfXkaXWeDKvb1AsHXprNmfBiQpOZMw4CrLT8H0ebdg3k87uw_O7DVfXW_31Uu6dnH_2Rt1I7mOHn4r3Aou1kP13-ImvfHJwBnuyewzSQrvAMlABJCr-6qVrZyRowArMIcb8gVpk8iAJgjxhmndWtVjPNtA3tGzSeQ"
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('La solicitud falló con el código: ' + response.status);
            }
            return response.json();
          })
})