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
	medicationEdit:function(documentID,index,newData){
		api.GET(documentID,function(response){
			response.data.medications[1]=newData;
			api.PUT(documentID,response.data,function(){
				alert('The medication has been updated');
			});
		});
	},
	medicationDetail:function(documentID,index,callback){
		api.GET(documentID,function(response){
			callback(response.data.medications[1]);
		});
	},
	// this is actually an alteration of database.index
	medicationArray:function(documentID,callback){
		api.GET(documentID,function(response){
			// this should return the /entire/ medicationLog array. Messy, unwieldy, but good enough for now.
			// TODO: fix this to be better. pass in petID and return array of only medications taken by that pet.
			callback(response.data.medications);
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
	petUpdate:function(documentID,index,newData){
		api.GET(documentID,function(response){
			response.data.pets[index]=newData;
			api.PUT(documentID,response.data,function(){
				alert('The pet has been updated. Please go back to the home page');
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
	petDelete:function(documentID,index){
		api.GET(documentID,function(response){
			response.data.pets.splice(index,1);
			api.PUT(documentID,response.data,function(){
				alert('The quote has been deleted. Please go back to the home page');
			});
		});
	},

}