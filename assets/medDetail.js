
// 
//Function to get json
async function fetchFunction(){
    // Fetch the JSON 
    const response = api.GET('1079866388960788480', function(response) {
        const medicationID = getAllUrlParams().medicationid;
        let medications= response.data.medications.filter(function (el){
            return el.medicationID === medicationID;
        });
        console.log(medications);
        const med = medications[0];
        const pets = response.data.pets.filter(function (pet){
            return pet.petID === med.petID;
        });
        const pet= pets[0];
        writeToDiv(med,pet);
    }); 
}
// write information to html divs
function writeToDiv(med, pet){
    document.getElementById('medInfo').innerHTML +=`
    <div id="medName" class="container">
        <h1>${med.medicationName}</h1>
        <div id="medicationDetails" class="container">
            Medication ID: ${med.medicationID}<br />
            Medication Type: ${med.medType}<br />
            Pet: ${pet.petName}<br />
            Dosage: ${med.dosage}<br />
            Medication Notes: ${med.medNotes}<br />
        
    </div>`;
}




document.addEventListener('DOMContentLoaded', async () => await fetchFunction(), false);