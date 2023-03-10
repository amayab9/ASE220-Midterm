const database={
	index:function(documentID,callback){
		api.GET(documentID,function(response){
			callback(response.data.users[index]);
			// troubleshooting stuff, these fire *after* the database.index function in app.js
			 console.log("database.index fired.");
			 //this returns the JSONBLOB object. so: Object{ User{}; Pet{}; Medication{}};
			 console.log(response.data.users);
		});
	},
	// specifically for pet detail.
	petDetail:function(documentID,index,callback){
		api.GET(documentID,function(response){
			// this line specifies getting the specific pet.
			// response.data is the entire JSONBlob so specify we want ot grab from the pets array.
			callback(response.data.pets[index]);
		});
	},
	// this is actually an alteration of database.index
	medicationArray:function(documentID,callback){
		api.GET(documentID,function(response){			
			callback(response.data.medicationLog);
		});
	},
	// keep unchanged as a reference on where to change stuff for specific pages.
	detail:function(documentID,index,callback){
		api.GET(documentID,function(response){
			callback(response.data[index]);
		});
	},
	userDetail:function(documentID,index,callback){
		api.GET(documentID,function(response){
			// this line specifies getting the specific pet.
			// response.data is the entire JSONBlob so specify we want ot grab from the pets array.
			callback(response.data.users[index]);
		});
	},
	update:function(documentID,index,newData){
		api.GET(documentID,function(response){
			response.data[index]=newData;
			api.PUT(documentID,response.data,function(){
				alert('The quote has been updated. Please go back to the home page');
			});
		});
	},
	userUpdate:function(documentID,index,newData){
		api.GET(documentID,function(response){
			response.data.users[index]=newData;
			api.PUT(documentID,response.data,function(){
				alert('The user has been updated. Please go back to the home page');
			});
		});
	},
	delete:function(documentID,index){
		api.GET(documentID,function(response){
			response.data.splice(index,1);
			api.PUT(documentID,response.data,function(){
				alert('The quote has been deleted. Please go back to the home page');
			});
		});
	},
	userDelete:function(documentID,index){
		api.GET(documentID,function(response){
			response.data.users.splice(index,1);
			api.PUT(documentID,response.data,function(){
				alert('The quote has been deleted. Please go back to the home page');
			});
		});
	},
	create:function(documentID,newData){
		api.GET(documentID,function(response){
			response.data.push(newData);
			api.PUT(documentID,response.data,function(){
				alert('The quote has been added. Please go back to the home page');
			});
		});
	},
	userPetArray:function(documentID,callback){
		api.GET(documentID,function(response){
			callback(response.data.pets[index]);
		});
	},
}