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
				console.log("Do we have a specific user?");
				console.log(user);
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
		});
	},
	// For fetching the info for petDetail page
	petdetail:function(index){
		// The info from the JSONBlob at the index is passed in as item, should be 1 pet from the array.
		database.detail(quotes.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.getElementByID('pet-photo').innerText=`<div id="petPhoto" class="col">${item.petPhoto}</div>`;
			document.getElementById('pet-ident').innerText=`<div id="petID" class="col">ID #: +${item.petID}+</div><div id="petName" class="col">Name: ${item.petName}</div>`;
			document.getElementById('pet-kind').innerText=`<div id="petSpecies" class="col">Species: ${item.petType}</div><div id="petBreed" class="col">Breed: ${item.petBreed}</div>`;
			document.getElementByID('pet-stats').innerText=`<div id="petSex" class="col">Sex: ${item.petSex}</div><div id="petAge" class="col">Age: "${item.petAge}</div><div id="petWeight" class="col">Weight: ${item.petWeight}</div>`;
			document.getElementById('btn-edit').setAttribute('href',`edit.html?index=${index}`);
			
			// TODO: this area for medication pagination
			// This should add all medications taken by the pet as a card. Pagination can be added later.
			// creates a card and APPENDS it to the innerHTML to create multiple cards.
			document.getElementByID('medication-pages').innerHTML+=`<div class="card" style="width: 18rem;">
				<img class="card-img-top" src="..." alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title">${item.medicationName}</h5>
					<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<a href="#" class="btn btn-primary">Go somewhere</a>
				</div>
			</div>`
			

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