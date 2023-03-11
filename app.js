const quotes={
	documentID:'1079866388960788480',
	index:function(){
		database.index(quotes.documentID,function(items){
			console.log("We have made it to database.index in app.js");

			for(let i=0;i<items.users.length;i++){

				let user=items.users[i];

				let elm=document.createElement('div');

				elm.innerHTML=`
				<div class="card row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 style="max-width:400px";">
				<div class="card-body">
			<h5 class="card-title" style="color: #FFCD95; font-size:45px;">${user.firstName} ${user.lastName}</h5>
			  <p class="card-text" style="color: #FFCD95; font-size:20px">${user.emailAddress}</p>
			<button a href="userDetail.html" type="button" class="btn btn-dark" style="font-size:18px">View</a></button>
			</div>`;

				document.getElementById('userdetails').append(elm);
			}
		}
		)
	},

	medupdates:function(index){
		database.medicationEdit(quotes.documentID,index,function(item){
			document.getElementById('loading').style.display='none';
			document.querySelector('form input[name=medicationName]').value=item.medicationName;
			document.querySelector('form input[name=medType]').value=item.medType;
			document.querySelector('form input[name=dosage]').value=item.dosage;
			document.querySelector('form input[name=numberOfDailyDoses]').value=item.numberOfDailyDoses;
			document.querySelector('form input[name=medNotes]').value=item.medNotes;
			document.querySelector('form input[name=medicationID]').value=item.medicationID;

			document.querySelector('form').addEventListener('submit',function(e){
				e.preventDefault();
				let medicationName=document.querySelector('form input[name=medicationName]');
				let medType=document.querySelector('form input[name=medType]');
				let dosage=document.querySelector('form input[name=dosage]');
				let numberOfDailyDoses=document.querySelector('form input[name=numberOfDailyDoses]');
				let medNotes=document.querySelector('form input[name=medNotes]');
				let medicationID=document.querySelector('form input[name=medicationID]');

				let newMed={
					medicationName:medicationName.value,
					medType:medType.value,
					dosage:dosage.value,
					numberOfDailyDoses:numberOfDailyDoses.value,
					medNotes:medNotes.value,
					medicationID:medicationID.value,
				}
				database.MedUpdates(quotes.documentID,index,newMed);
			});
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
