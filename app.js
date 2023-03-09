const quotes={
	documentID:'1079835974602866688',
	index:function(){
		
		database.index(x.documentID,function(items){
			document.getElementById('items.users').innerHTML='';

			for(let i=0;i<items.users.length;i++){

				let user=items.users[i];

				let el=document.createElement('div');

				el.innerHTML=`<div>
						<blockquote>
							<em><a href="detail.html?index=${i}">${user.firstName} ${user.lastName}</a></em>
						</blockquote>
						<hr />
					</div>`;

				document.getElementById('items.user').append(el);
			}

			for(let i=0;i<items.pets.length;i++){
				let pet=items.pets[i];

				let elm=document.createElement('div');
				elm.innerHTML=`<div>
				<div col>
				<div class="card mb-3" style="max-width: 540px;">
				<div class="row g-0">
	  			<div class="col-md-4">
	  			</div>
				  <div class="col-md-8">
				  <div class="card-body">
				  	<h5 class="card-title">${item.petName}</h5>
					  <p class="card-text">${item.breed}<br />
					  					   ${item.age}<br />
										   ${item.location}</p>
					<p class="card-text"><small class="text-muted">${item.updates}</small></p>
					<button a href="petDetail.html?index=${item.ID}" type="button" class="btn btn-dark">View</a></button>
				  </div`

	  }
				document.getElementById('pets').append(elm);
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
