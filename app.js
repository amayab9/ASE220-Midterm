const quotes={
	documentID:'1079866388960788480',
	index:function(){
		document.getElementById('quotes').innerHTML='Loading quotes, please wait...';
		database.index(quotes.documentID,function(items){
			document.getElementById('quotes').innerHTML='';
			for(let i=0;i<items.length;i++){
				let quote=items[i];
				let el=document.createElement('div');
				el.innerHTML=`<div>
						<blockquote>
							<em><a href="detail.html?index=${i}">${quote.quote}</a></em>
						</blockquote>
						${quote.author}
						<hr />
					</div>`;
				document.getElementById('quotes').append(el);
			}
		});
	},
	// For fetching the info for petDetail page
	petdetail:function(index){
		// TODO: change item.petX to whatever needs to be changed.
		database.detail(quotes.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.getElementByID('pet-photo').innerText=`<div id="petPhoto" class="col">${item.petPhoto}</div>`;
			document.getElementById('pet-ident').innerText=`<div id="petID" class="col">ID #: +${item.petID}+</div><div id="petName" class="col">Name: ${item.petName}</div>`;
			document.getElementById('pet-kind').innerText=`<div id="petSpecies" class="col">Species: ${item.petType}</div><div id="petBreed" class="col">Breed: ${item.petBreed}</div>`;
			document.getElementByID('pet-stats').innerText=`<div id="petSex" class="col">Sex: ${item.petSex}</div><div id="petAge" class="col">Age: "${item.petAge}</div><div id="petWeight" class="col">Weight: ${item.petWeight}</div>`;
			document.getElementById('btn-edit').setAttribute('href',`edit.html?index=${index}`);
			
			// TODO: this area for medication pagination

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