const database={
	index:function(documentID,callback){
		api.GET(documentID,function(response){
			callback(response.data);
			// troubleshooting stuff, these fire *after* the database.index function in app.js
			// console.log("database.index fired.");
			// this returns the JSONBLOB object. so: Object{ User{}; Pet{}; Medication{}};
			// console.log(response.data);
		});
	},
	detail:function(documentID,index,callback){
		api.GET(documentID,function(response){
			callback(response.data[index]);
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
	delete:function(documentID,index){
		api.GET(documentID,function(response){
			response.data.splice(index,1);
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
}