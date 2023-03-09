const Items={
	documentID:'1079835974602866688',
	index:function(){
		document.getElementById('Items').innerHTML='Loading Items, please wait...';
		database.index(Items.documentID,function(items){
			document.getElementById('Items').innerHTML='';
			for(let i=0;i<items.length;i++){
				let quote=items[i];
				let el=document.createElement('div');
				el.innerHTML=`<div>
						<blockquote>
							<em><a href="medDetail.html?index=${i}">${quote.quote}</a></em>
						</blockquote>
						${quote.author}
						<hr />
					</div>`;
				document.getElementById('Items').append(el);
			}
		});
	},
	detail:function(index){
		database.detail(Items.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.getElementById('quote-author').innerText=item.author;
			document.getElementById('quote-text').innerText=item.quote;
			document.getElementById('btn-edit').setAttribute('href',`edit.html?index=${index}`);
							
			let deleteButton=document.getElementById('btn-delete');
			deleteButton.addEventListener('click',function(){
				database.delete(Items.documentID,index);
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
			database.create(Items.documentID,newQuote);
		});
	},
	update:function(index){
		database.detail(Items.documentID,index,function(item){
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
				database.update(Items.documentID,index,newQuote);
			});
		});
	}
}