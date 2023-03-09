
// function loadScript(medications) { 
//     let targetIndex;
//     // pick the pet based on ID which is passed through query string.
//     for(let i=0; i < medications.medicationLog.length; i++){
//         if(medications.medicationLog[i].userID== getAllUrlParams().medications){
//             if(medications.mediacationLog[i].petID == getAllUrlParams().medications){
//             if(medications.medicationLog[i].medicationID==getAllUrlParams().medications){
//             console.log("print found ID:" + medications.medicationLog[i].medicationID);
//             targetIndex = i;
//             }
//         }
//         }
//         else{}
//     }
// }

// const medications={
// 	documentID:'1079866388960788480',
// 	index:function(){
		
// 		database.index(medications.documentID,function(items){
// 			document.getElementById('medications').innerHTML='';
// 			// Steps through the array of medications
        
// 			for(let i=0;i<items.length;i++){
// 				// finds the specific quote at index location
// 				let user=items[i];
// 				// declares el as a created Div element.
// 				//let el=document.createElement('div');
// 				// writes HTML to the new medInfo element.
// 				medInfo.innerHTML += `
//                 <div id="medName" class="container">
//                     <h1>${medications.medicationLog[targetIndex].medicationName}</h1>
//                     <div id="medicationDetails" class="container">
//                         Medication ID: ${medications.medicationLog[targetIndex].ID}<br />
//                         Medication Type: ${medications.medicationLog[targetIndex].medType}<br />
//                         Pet: ${medications.medicationLog[targetIndex].petName}<br />
//                         Dosage: ${medications.medicationLog[targetIndex].medDosage}<br />
//                         Medication Notes: ${medications.medicationLog[targetIndex].medNotes}<br />
//                     </p>
//                 </div>`;
// 					// adds new HTML to the index.html page.
// 				document.getElementById('medications').append(medInfo);
// 			}
// 		});
// 	}
// }
//Function to get json
async function fetchFunction(){
    // Fetch the JSON 
    const response = api.GET(medications.documentID, function(response) {
        console.log(response.data)
    });
   
    // Resolves the promise as JSON
    
    // pass content to loadScript for usage
    loadScript(content);
}

// might use this to get the JSON object into pets object.
function writeToVariable(content1, variable){
    let parsedJSON;
    parsedJSON = JSON.parse(content1);
    console.log("Check for parsed JSON" + parsedJSON);
    variable = parsedJSON;
} 


document.addEventListener('DOMContentLoaded', async () => await fetchFunction(), false);