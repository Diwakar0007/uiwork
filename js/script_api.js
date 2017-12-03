var nname =['cnbc', 'espn', 'fortune', 'bbc-news', 'bbc-sport', 'bloomberg', 'bild', 'buzzfeed', 'business-insider'], count = 0;
function createDiv(myArray, target){
	var newElement = []; 
	for(var i=0; i< myArray.length; i++){
		var str = '<div class="col-md-4 col-sm-6 col-xs-12 classStyle nano" ><div class="nano-content"><ul id="'+ myArray[i] + '"></ul></div></div>';
		newElement.push(str);		
		}
	//console.log(newElement);
	var html = newElement.join('');
	//console.log(html);
	$(target).append(html);
}



function ajaxSending(myArray){
		var idData = myArray[count];
		//if( document.getElementById(idData).style.display == 'block'){
			$.ajax({
					url: 'https://newsapi.org/v1/articles?source='+ idData +'&sortBy=top&apiKey=487d3a39170841f1ab33b73430da1c76',
					success: function(data, response){
						data = data;
						 var nwArr = [];
						 nwArr = data.articles;
						 var mainTitle = "<div class='main'><img class='img-responsive' src='"+nwArr[0].urlToImage +"' class=\"images\"/> " +nwArr[0].title +"</div>";
						 $(mainTitle).insertBefore('#'+idData);

						 var nwArrNew = nwArr.splice(1);

						 for(var k in nwArrNew)
								 {
									var lis = "<li><a href="+nwArrNew[k].url+" > " + nwArrNew[k].title+"</a> <span class=\"sourceNes\"> --" +idData+" </span></li>";
									//console.log(nwArr[k].title);
									
									$(lis).appendTo('#'+idData);
								 }
							},
						error: function(){
							alert('Oh some thing is wrong at request and response');
						},	
						complete: function(response){
							console.log(idData + ': data inserted successfully');
							}
		})
		count++;
	}


createDiv(nname, '#newsData');
	
setInterval(function(){
		if( count < nname.length ){
		ajaxSending(nname);	
		}
		else{
				
				$('#loader').hide();
		}
}, 3000);


	