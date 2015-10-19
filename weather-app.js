var weatherWidget = {};

weatherWidget.apiKey = 'f8f70a2d7da841af';

weatherWidget.getConditions = function(cityName){
	var apiUrl = 'http://api.wunderground.com/api/' + weatherWidget.apiKey + '/conditions/q/Canada/' + cityName + '.json';
	$.ajax({
		url: apiUrl,
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(res){
//		now that we have the data, we want to pass it to our displayConditions method
		weatherWidget.displayConditions(res.current_observation);
	
	});
};

weatherWidget.displayConditions = function (weatherData){
	console.log('in displayConditions:', weatherData);
//	we now need to grab the elements on the page, and set the text inside of them to be the appropriate values
	$('.weather_image').attr( 'src',weatherData.icon_url );
	$('.weather_string').html(weatherData.weather);
	$('.temp_c').html(weatherData.temp_c);
	$('.windKph').html(weatherData.wind_kph);
	$('.windDir').html(weatherData.wind_dir);	$('.city_name').html(weatherData.display_location.city);
	$('.date_time').html(weatherData.observation_time);
};

weatherWidget.formSubmit = function(){
	$('.searchForm').on('submit', function(e){
		e.preventDefault();
		var cityName = $('#searchInput').val();
		$('#searchInput').val('');
		weatherWidget.getConditions(cityName);

	});
};

weatherWidget.go = function() {
	
//	get the current weather for Toronto
	weatherWidget.getConditions('Toronto');
//	when retrieved, put it on the page
	weatherWidget.formSubmit();
	
};	


$(document).ready(function(){
  weatherWidget.go();
});