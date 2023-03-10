const quotes={
	documentID:'1079866388960788480',
	index:function(){
		// Defines the callback function in the parameter slot. This is calling the index function in database.js
		database.index(quotes.documentID,function(items){
			document.getElementById('quotes').innerHTML='';
			console.log("We have made it to database.index in app.js");
			// This previously stepped through the array of quotes
			// We don't have an array of quotes so what we want is one of the three arrays in the BlobObject.
			// items.users.length! We want the length of the users array so hardcoding it for that.
			for(let i=0;i<items.users.length;i++){
				// finds the specific quote at index location
				// we want the User Array and a Specific User at index. 
				let user=items.users[i];
				// troubleshooting
				// console.log("Do we have a specific user?");
				// console.log(user);
				// declares el as a created Div element.
				let el=document.createElement('div');
				// writes HTML to the new el element.
				el.innerHTML=`<div>
						<blockquote>
							<em><a href="detail.html?index=${i}">${user.firstName} ${user.lastName}</a></em>
						</blockquote>
						<hr />
					</div>`;
					// adds new HTML to the index.html page.
				document.getElementById('quotes').append(el);
			}
			// quick and dirty way to see all pets so I can test my pets detail pages.
			for(let i=0;i<items.pets.length;i++){
				let pet=items.pets[i];
				// troubleshooting
				// console.log("Do we have a specific pet?");
				// console.log(pet);
				let elm=document.createElement('div');
				elm.innerHTML=`<div>
				<blockquote>
					<em><a href="petDetail.html?index=${i}">${pet.petName} ${pet.petType}</a></em>
				</blockquote>
				<hr />
				</div>`;
				document.getElementById('pets').append(elm);
			}
		});
	},
	//amaya's userdetails
	// For fetching the info for userDetail page
	userdetailpage:function(index){
		database.userDetail(quotes.documentID,index,function(item){
			let user = item;
			document.getElementById('loading').style.display='none';
			document.getElementById('user-firstName').innerHTML=`<div id="userFirstName" class="col">First Name:${user.firstName}</div>`; //get user's first name and display
			document.getElementById('user-lastName').innerHTML=`<div id="userLastName" class="col">Last Name: ${user.lastName}</div>`; // get user's last name and display
			//document.getElementById('user-petNames').innerHTML=`<div id="usersPets" class="col">Pets: ${user.pets.userID}</div>`;//calls inside the object -> pets -> search in pets for the userID in which matches the User clicked
			document.getElementById('btn-edit').setAttribute('href',`userEdit.html?index=${index}`);

			database.userPetArray(quotes.documentID,function(item){
				for(let i=0;i<item.length;i++){
					
					// if user ID in pets matches user ID 
					if(item[i].userID==pets.userID){
						//TODO: link to the specific pet in order to get pet details.
						document.getElementById('user-petNames').innerHTML+=`<div id="usersPets" class="col">Pets: <a href="petDetail.html?pets=${item[i].petID}>${item[i].petName}</a></div>`;
					}
					else{
					// else Do nothing
					}
				}
			});

			let deleteButton=document.getElementById('btn-delete');
			deleteButton.addEventListener('click',function(){
				database.userDelete(quotes.documentID,index);
			});
		});
	},
	create:function(){
		document.querySelector('form').addEventListener('submit',function(e){
			e.preventDefault();
			let author=document.querySelector('form input[name=author]');
			let quote=document.querySelector('form textarea[name=quote]');
			let newQuote={
				author:author.value,
				quote:quote.value
			}
			database.create(quotes.documentID,newQuote);
		});
	},
	update:function(index){
		database.detail(quotes.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.querySelector('form input[name=author]').value=item.author;
			document.querySelector('form textarea[name=quote]').value=item.quote;
			
			document.querySelector('form').addEventListener('submit',function(e){
				e.preventDefault();
				let author=document.querySelector('form input[name=author]');
				let quote=document.querySelector('form textarea[name=quote]');
				let newQuote={
					author:author.value,
					quote:quote.value
				}
				database.update(quotes.documentID,index,newQuote);
			});
		});
	},
	userDelete:function(documentID,index){
		api.GET(documentID,function(response){
			response.data.users.splice(index,1);
			api.PUT(documentID,response.data,function(){
				alert('The user has been deleted. Please go back to the home page');
			});
		});
	},
	userupdate:function(index){
		database.petDetail(quotes.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.querySelector('form input[name=userFirstNameInput]').value=item.userFirstNameInput;
			document.querySelector('form input[name=userLastNameInput]').value=item.userLastNameInput;
			document.querySelector('form input[name=userEmailInput]').value=item.userEmailInput;

			document.querySelector('form').addEventListener('submit',function(e){
				e.preventDefault();
				let userFirstName=document.querySelector('form input[name=userFirstNameInput]');
				let userLastName=document.querySelector('form input[name=userLastNameInput]');
				let userEmail=document.querySelector('form input[name=userEmailInput]');

				let newUser={
					userFirstName:item.firstName,
					userLastName:item.lastName,
					userEmail:item.emailAddress
				}
				database.userUpdate(quotes.documentID,index,newUser);
			});
		});
	}
}