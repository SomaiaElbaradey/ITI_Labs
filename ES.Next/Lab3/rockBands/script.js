$(document).ready(function () {
   async function getRockBand() {
      const url = "rockbands.json"
      try {
         let response = await fetch(url, { method: 'GET' })
         let bandObjects = await response.json()
         console.log(response)

         bandObjectsGlobal = bandObjects;

         $("#theBand").append("<option disabled selected>Please select</option>");

         for (bandObject in bandObjects) {
            $("#theBand").append("<option>" + bandObject + "</option>");
         }

         $("#theBand").change(function () {
            $('#theArtist').html("")
            $('#theArtist').append("<option disabled selected>Please select</option>")
            $(bandObjectsGlobal[$(this).children("option:selected").val()]).each(function (Index, singerObject) {
               $('#theArtist').append("<option value='" + singerObject.value + "'>" + singerObject.name + "</option>")
            });
         });

         $("#theArtist").change(function () {
            window.location.href = $('#theArtist').children("option:selected").val();
         });

      } catch (err) {
         console.error('failed')
      }
   }
   getRockBand()
})