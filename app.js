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

	for(let i=0;i<items.medications.length;i++){
		let med=items.medications[i];
		let elm=document.createElement('div');
		elm.innerHTML=`<div>
		<blockquote>
			<em><a href="medicationEdit.html?index=${i}">${medications.medicationName} ${medications.medType}</a></em>
		</blockquote>
		<hr />
		</div>`;
		document.getElementById('medications').append(elm);
	}
},


MedEdit:function(index){
	database.medsedit(quotes.documentID,function(item){
		let medsedit = item;
		document.getElementById('loading').style.display='none';
		document.getElementById('med-name').innerHTML=`<div id="medname" class="col">${medications.medicationName}</div>`;
		document.getElementById('med-type').innerHTML=`<div id="medtype" class="col">${medications.medType}</div>`;
		document.getElementById('dosage-amt').innerHTML=`<div id="doseamt" class="col">${medications.dosage}</div>`;
		document.getElementById('daily-amt').innerHTML=`<div id="dailyamt" class="col">${medications.numberOfDailyDoses}</div>`;
		document.getElementById('med-notes').innerHTML=`<div id="mednotes" class="col">${medications.medNotes}</div>`;

			for(let i=0;i<item.length;i++){

				if(item[i].medicationID==medications.medicationID){
					console.log(item[i]);
					document.getElementById('meds-page').innerHTML+=`<div class="form-group">
					<label for="exampleFormControlInput1">Medication Name</label>
					<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="${medications.medicationName}">
					</div>
					<div class="form-group">
					<label for="exampleFormControlInput1">Medication Type</label>
					<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="${medications.medType}">
					</div>
					<div class="form-group">
					<label for="exampleFormControlInput1">Amount Per Day</label>
					<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="${medications.dosage}">
					</div>
					<div class="form-group">
					<label for="exampleFormControlInput1">Doses Per Day</label>
					<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="${medications.numberOfDailyDoses}">
					</div>
					<div class="form-group">
					<label for="exampleFormControlInput1">Medication Notes</label>
					<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="${medications.medNotes}">
				</div>
					</div>
					<button class="btn btn-dark" type="submit">Submit</button>
					<button class="btn btn-light" type="cancel">Cancel</button>
				</form>`;
				}
			}
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
