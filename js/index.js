/*
* @Author: devyojan
* @Date:   2018-05-22 05:19:10
* @Last Modified by:   devyojan
* @Last Modified time: 2018-05-22 18:12:35
*/

$(document).ready(function(){
	
	$('#searchButton').on('click', function(){
		searchQuery();
	});

	$('#searchText').on('keydown', function(key) {
		if (key.which == 13) {
			searchQuery();
		}
	});

	function searchQuery() {
		
		if($('#searchText').val() == ''){
			$('#errorMessage').html("Please enter something to search.");
		} else {
			var query = $('#searchText').val();

			$.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch' +
			'&format=json&limit=15&origin=*&search=' + query, function(json){
				console.log(json);
				
				if (json[1].length == 0) {
					$('#results').html("No results found.");
					$('#results').css({"color":"red"});
				} else {

					$('#results').html('');

					for (i=0; i<json[1].length; i++) {
						$('#results').append("<a href='"+json[3][i]+"'>"+
							"<div class='links'><h3>"+
							json[1][i]+"</h3><p>"+json[2][i]+"</div></a>");
					}
				}
		
			});
		}
	}

	$('#searchText').on('click', function() {
		$('#errorMessage').text('');
	});
});