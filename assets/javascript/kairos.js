
// put your keys in the header
var headers = {
	"Content-type     : application/json",
	"app_id"          : "7d63bc1e",
	"app_key"         : "d3fa34ac9965ddd79fc3202444189f31"
};
var payload  = { "image" : "YOUR_IMAGE_URL" };
var url = "http://api.kairos.com/detect";
// make request 
$.ajax(url, {
	headers  : headers,
    type: "POST",
    data: JSON.stringify(payload),
    dataType: "text"
}).done(function(response){
	console.log(response);
});
