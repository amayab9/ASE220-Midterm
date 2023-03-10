const quotes={
	documentID:'1079866388960788480',
	index:function(){
		database.index(quotes.documentID,function(items){
			document.getElementById('quotes').innerHTML='';
			console.log("We have made it to database.index in app.js");

			for(let i=0;i<items.users.length;i++){

				let user=items.users[i];

				let el=document.createElement('div');

				el.innerHTML=`<div class="card" style="max-width:400px";>
				<div class="card-body">
			<h5 class="card-title">${item.firstName} ${item.lastName}</h5>
			  <p class="card-text">${item.emailAddress}</p>
			<button a href="index.html?index=${item.userID}" type="button" class="btn btn-dark">View</a></button>
		  </div>`;

				document.getElementById('quotes').append(el);
			}
		}
		)
	},

	userdetails:function(index){
		database.index(quotes.documentID,index,function(item){
			let user = item;
			document.getElementById('loading').style.display='none';
			document.getElementById('user-email').innerHTML=`<div id="emailAddress" class="col">${users.emailAddress}</div>`;
			document.getElementById('user-fn').innerHTML=`<div id="userfn" class="col">${users.firstName}</div>`;
			document.getElementById('user-ln').innerHTML=`<div id="userln" class="col">${users.lastName}</div>`;

			database.usersArray(quotes.documentID,function(item){
				for(let i=0;i<item.length;i++){
					if(item[i].userID==users.userID){
						console.log(item[i]);
						document.getElementById('user-page').innerHTML+=`<div class="card" style="max-width:400px";>
						<div class="card-body">
                    <h5 class="card-title">${item.firstName} ${item.lastName}</h5>
                      <p class="card-text">${item.emailAddress}</p>
                    <button a href="index.html?index=${item.userID}" type="button" class="btn btn-dark">View</a></button>
                  </div>`;
					}
				}
			}
			)
		}
		)
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
