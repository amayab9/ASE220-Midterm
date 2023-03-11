const quotes={
	documentID:'1079866388960788480',
	index:function(){
		// Defines the callback function in the parameter slot. This is calling the index function in database.js
		database.index(quotes.documentID,function(items){
			document.getElementById('quotes').innerText='Loading Index page...';
			console.log("We have made it to database.index in app.js");
			// This previously stepped through the array of quotes
			// We don't have an array of quotes so what we want is one of the three arrays in the BlobObject.
			// items.users.length! We want the length of the users array so hardcoding it for that.
			for(let i=0;i<items.users.length;i++){
				// finds the specific quote at index location
				// we want the User Array and a Specific User at index. 
				let user=items.users[i];
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
			// document.getElementById('pet-photo').innerHTML=`<div id="petPhoto" class="col">${pet.petPhoto}</div>`;
			document.getElementById('pet-ident').innerHTML=`<div class="row justify-content-start">
					<div id="petID" class="col-4">ID #: ${pet.petID}</div>
					<div id="petName" class="col-4">Name: ${item.petName}</div>
				</div>`;
			document.getElementById('pet-kind').innerHTML=`<div class="row justify-content-start">
					<div id="petSpecies" class="col-4">Species: ${pet.petType}</div>
					<div id="petBreed" class="col-4">Breed: ${item.petBreed}</div>
				</div>`;
			document.getElementById('pet-stats').innerHTML=`<div class="row justify-content-start">
					<div id="petSex" class="col-4">Sex: ${pet.petSex}</div>
					<div id="petAge" class="col-4">Age: ${item.petDoB}</div>
					<div id="petWeight" class="col-4">Weight: ${item.petWeight}</div>
				</div>`;
			document.getElementById('btn-edit').setAttribute('href',`petEdit.html?index=${index}`);
			
			// This should add all medications taken by the pet as cards. Pagination can be added later.
			// creates a card and APPENDS it to the innerHTML to create multiple cards.
			// run a loop through medications, check that userID and petID in medication object matches current pet.
			// need to pull medicationLog from jsonBlob.
			database.medicationArray(quotes.documentID,function(item){
				for(let i=0;i<item.length;i++){
					// if PetID matches, add medication page
					if(item[i].petID==pet.petID){
						document.getElementById('medication-pages').innerHTML+=`<div "col-sm-6">
						<div class="card" style="width: 18rem;">
							<div class="card-body">
							<h5 class="card-title">${item[i].medicationName}</h5>
							<h6 class="card-subtitle mb-2 text-muted">${item[i].medType}</h6>
							<p class="card-text">Dose Amount: ${item[i].dosage}</p><p class="card-text">Timing: ${item[i].numberOfDailyDoses}</p>
							<p class="card-text">Notes: ${item[i].medNotes}</p>
							</div>
					  	</div>
					  </div>`
					}
					else{
						// else Do nothing
					}
				}
			});
			
			let deleteButton=document.getElementById('btn-delete');
			deleteButton.addEventListener('click',function(){
				database.petDelete(quotes.documentID,index);
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
	petupdate:function(index){
		database.petDetail(quotes.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.querySelector('form input[name=petName]').value=item.petName;
			document.querySelector('form input[name=userID]').value=item.userID;
			document.querySelector('form input[name=petTye]').value=item.petType;
			document.querySelector('form input[name=petBreed]').value=item.petBreed;
			document.querySelector('form input[name=petSex]').value=item.petSex;
			document.querySelector('form input[name=petDoB]').value=item.petDoB;
			document.querySelector('form input[name=petWeight]').value=item.petWeight;

			// this makes the button work.
			document.querySelector('form').addEventListener('submit',function(e){
				e.preventDefault();
				let petName=document.querySelector('form input[name=petName]');
				let userID=document.querySelector('form input[name=userID]');
				let petType=document.querySelector('form input[name=petTye]');
				let petBreed=document.querySelector('form input[name=petBreed]');
				let petSex=document.querySelector('form input[name=petSex]');
				let petDoB=document.querySelector('form input[name=petDoB]');
				let petWeight=document.querySelector('form input[name=petWeight]');
				// petID purposely stays the same.
				let newPet={
					petID:item.petID,
					userID:userID.value,
					petName:petName.value,
					petType:petType.value,
					petSex:petSex.value,
					petBreed:petBreed.value,
					petWeight:petWeight.value,
					petDoB:petDoB.value,
				}
				database.petUpdate(quotes.documentID,index,newPet);
			});
		});
	}
}