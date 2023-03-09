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
	detail:function(index){
		database.detail(quotes.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.getElementById('quote-author').innerText=item.author;
			document.getElementById('quote-text').innerText=item.quote;
			document.getElementById('btn-edit').setAttribute('href',`edit.html?index=${index}`);
			let deleteButton=document.getElementById('btn-delete');
			deleteButton.addEventListener('click',function(){
				database.delete(quotes.documentID,index);
			});
		});
	},
	// For fetching the info for petDetail page
	petdetail:function(index){
		// The info from the JSONBlob at the index is passed in as item, should be 1 pet from the array.
		database.petDetail(quotes.documentID,index,function(item){
			let pet = item;
			document.getElementById('loading').style.display='none';
			document.getElementById('pet-photo').innerHTML=`<div id="petPhoto" class="col">${pet.petPhoto}</div>`;
			document.getElementById('pet-ident').innerHTML=`<div id="petID" class="col">ID #: ${pet.petID}</div><div id="petName" class="col">Name: ${item.petName}</div>`;
			document.getElementById('pet-kind').innerHTML=`<div id="petSpecies" class="col">Species: ${pet.petType}</div><div id="petBreed" class="col">Breed: ${item.petBreed}</div>`;
			document.getElementById('pet-stats').innerHTML=`<div id="petSex" class="col">Sex: ${pet.petSex}</div><div id="petAge" class="col">Age: ${item.petAge}</div><div id="petWeight" class="col">Weight: ${item.petWeight}</div>`;
			document.getElementById('btn-edit').setAttribute('href',`edit.html?index=${index}`);
			
			// This should add all medications taken by the pet as cards. Pagination can be added later.
			// creates a card and APPENDS it to the innerHTML to create multiple cards.
			// run a loop through medications, check that userID and petID in medication object matches current pet.
			// need to pull medicationLog from jsonBlob.

			// TODO: troubleshoot this
			database.medicationArray(quotes.documentID,function(item){
				for(let i=0;i<item.length;i++){
					// troubleshooting...
					// console.log("What is in item?");
					// item returns medicationLog as array
					// console.log(item);
					
					// if PetID matches, add medication page
					if(item[i].petID==pet.petID){
						//troubleshooting
						console.log(item[i]);
						// TODO: add a text field where user can write when they gave the medicine.
						document.getElementById('medication-pages').innerHTML+=`<div class="card" style="width: 18rem;">
							<img class="card-img-top" src="..." alt="Card image cap">
								<div class="card-body">
									<h5 class="card-title">${item[i].medicationName}</h5>
									<p class="card-text">Dose Amount: ${item[i].dosage} <br/> Timing: ${item[i].numberOfDailyDoses}<br/></p>
									<a href="medicationdetail.html?index=${i}" class="btn btn-primary">Medication Details</a>
								</div>
							</div>`
					}
					else{
					// else Do nothing
					}
				}
			});
			
			
			
			// handles the delete button for the information. Oh god we gotta fix the index passing in.
			// TODO: Fix delete button so it doesn't delete the user.
			let deleteButton=document.getElementById('btn-delete');
			deleteButton.addEventListener('click',function(){
				database.delete(quotes.documentID,index);
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
	}
}