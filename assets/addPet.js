//Function to get json
async function fetchFunction(){
    // Fetch the JSON 
    const response = api.GET('1079866388960788480', function(response) { 
        const userID = getAllUrlParams().userID;
        //Create an Array containting the medication object with the matching ID
        let users= response.data.users.filter(function (userList){
            return userList.userID === userID;
        });
        //Set the only element in created array to a constant
        const user = users[0];
       }); 
       writeForm(user);
}

function writeForm(user){
document.getElementById('formDiv').innerHTML +=`
<div id="BackToUser">
<a href="userDetail.html?userID=${user.userID}">Back to User Details</a>
</div>
<div id="form">
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
</div>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div></div>
<div>
<a href="index.html">Back to User Details</a>
</div>`};
document.addEventListener('DOMContentLoaded', async () => await fetchFunction(), false);