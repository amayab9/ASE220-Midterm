const fs=require('fs');
const url=require('url');

const api={
	// endpoint:'https://jsonblob.com/api/jsonBlob/',
	
	/* GET:function(documentID,callback){
		axios.get(`${api.endpoint}${documentID}`,{}).then(function(response){
			callback(response);
		}).catch(function(error){
			console.log(error);
		});
	}, */
	
	// Non-axios versions of GET & PUSH below this point.
	GET:function(documentID,res){
		// Rough GET method
		let json_string;
		// console.log(my_new_file);
		// Read data from a file
		console.log(documentID);
		console.log(fs.existsSync(`./data/${documentID}.json`));
	
		// checking that the file exists.
		switch(fs.existsSync(`./data/${documentID}.json`)){
			case true: 
				console.log(`Attempting read of file: ${documentID}`);
				console.log(fs.readFileSync(`./data/${documentID}.json`,'utf8'));
				// header for dealing with tricky cross-plug-in stuff.
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
				res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
				res.writeHead(200,{'Content-Type':'application/json'});
				res.write(json_string);
				break;
			case false: // header for dealing with tricky cross-plug-in stuff.
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
				res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
				res.writeHead(404,{'Content-Type':'application/json'});
				res.write("File not found.");
			break;
		}
	},
	PUT:function(documentID,index,res){
		// Process the body of the request
		var body=[];
		req.on('data',(chunk)=>{
			body.push(chunk);
		}).on('end',()=>{
			body=Buffer.concat(body).toString();
			// a callback function
			doput(documentID,index,res,body);
			res.end(body);
		});
	},
	// needed for PUT
	doput:function(documentID,index,res,body_results){
		// parse out the filename here
		//Parse the components of the URL
		let url_components=url.parse(req.url,true);
		const splitURL=url_components.pathname.split('/');
	
		let filename = splitURL[1];
		// used for writing to the file later.
		let json_string;
		switch(fs.existsSync(`./data/${filename}.json`)){
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
				fs.writeFileSync(`./data/${filename}.json`,json_string);
				// build response with update complete status
				// Response Header for dealing with cross-orgin problem.
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
				res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
				res.writeHead(200,{'Content-Type':'application/json'});

				/*
				//Write something in the header of the response
				res.writeHead(200,{'Content-Type':'application/json'});
				// console.log("The update was successful.")
				*/
				console.log(json_string);
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