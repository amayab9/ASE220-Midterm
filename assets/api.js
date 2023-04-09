const fs=require('fs');
const url=require('url');

const api={
	endpoint:'https://jsonblob.com/api/jsonBlob/',
	
	GET:function(document)

	GET:function(documentID,callback){
		axios.get(`${api.endpoint}${documentID}`,{}).then(function(response){
			callback(response);
		}).catch(function(error){
			console.log(error);
		});
	},

	PUT:function(req,res){
		// Process the body of the request
		var body=[];
		req.on('data',(chunk)=>{
			body.push(chunk);
		}).on('end',()=>{
			body=Buffer.concat(body).toString();
			// a callback function
			doput(req,res,body);
			res.end(body);
		});
	},
	// needed for PUT
	doput:function(req,res,body_results){
		// parse out the filename here
		//Parse the components of the URL
		let url_components=url.parse(req.url,true);
		const splitURL=url_components.pathname.split('/');
	
		let filename = splitURL[1];
		// used for writing to the file later.
		let json_string;
		switch(fs.existsSync(`./backup/${filename}.json`)){
			case true: 
				if (isJsonString(body_results) == true)
				{
					// if it is json string, no changes need to be made.
					json_string = body_results;
				}
				else{
					json_string=JSON.stringify(body_results);
				}
				
				// do the update
				// write to the file
				fs.writeFileSync(`./backup/${filename}.json`,json_string);
				// build response with update complete status
				res.writeHead(200,{'Content-Type':'application/json'});
				// console.log("The update was successful.")
				res.write(json_string);
				break;
			case false:
				// build response for 404 error here
				res.writeHead(404,{'Content-Type':'application/text/html'});
				res.write(`<p>File ${filename} not found, update unable to complete.</p>`);
			break;
		}
	},
	// needed for doput
	// check if passed in string is a JSONString.
	isJsonString:function(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
}