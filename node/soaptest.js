var soap = require('soap');
var http = require('http');
var url = "https://b6.caspio.com/ws/api.asmx?wsdl";

var args = {
	'AccountID':'Acount',
	'Profile':'Profile1',
	'Password':'Password',
	'ObjectName':'TableName',
	'IsView':false,
	'FieldList':'ColumnName1, ColumnName2',
	'Criteria':"",
	'FieldDelimiter':'|',
	'StringDelimiter':''
}



function handle_incoming_resquest(req, res){

soap.createClient(url, function(err, client) {
   console.log('Client created');

   //console.log(client.describe());

   
   client.SelectData(args, function(err, result){
   		console.log(err);
   		if('SelectDataResult' in result){
   			res.writeHead(200, {'Content-Type':'application/json'});
   			res.end(JSON.stringify(result['SelectDataResult']['Row']));
   		}
   });
 
});


}

var s = http.createServer(handle_incoming_resquest);
s.listen(8080);