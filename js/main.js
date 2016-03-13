(function($){

	function W(config) {
		var _this = this;
		
		var apiKey = "e531d0d6a1a3dc737938bf11b53dae36",
			country = config.country,
			city = config.city,
			cityID = config.cityID,
			units = config.units,
			baseURL = config.baseURL,
			dayCount = config.dayCount,
			url = baseURL + 'id=' + cityID + '&cnt=' + dayCount + '&appid=' + apiKey;

		function getData() {
			$.ajax({
				url: url,
				dataType: 'json',
				success: function(data) {
					console.log('data: ', data);
					processData(data);
				},
				error: function(err) {
					console.log('Something went wrong: ', err);
				}
			});
		}
		
		function processData(data){
			populateMainData(data);
			populateFourDays(data);
		}

		function populateMainData(data){
			var o = $('.jumbotron .container');
			
			var date = new Date(data.list[0].dt * 1000),
				day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			
			$('.day', o).text(day[date.getUTCDay()]);
			$('.date', o).text('Last update: ' + data.list[0].dt_txt);
			$('.location .city', o).text(data.city.name);
			$('.location .lat', o).text('(lat: ' + data.city.coord.lat);
			$('.location .lon', o).text(', lon: ' + data.city.coord.lon + ')');
			
			var temp = (data.list[0].main.temp - 273.15) * 1.8 + 32,
				units = 'f<sup>o</sup>';
				
			if(config.units === 'celsius'){
				temp = (data.list[0].main.temp - 273.15);
				units = 'C<sup>o</sup>';
			}
			
			$('.degree .num', o).html(temp.toFixed(1) + ' ' + units);
			
			$('.degree .forecast-icon img', o).attr('src', 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png');
			
			$('.forecast-content span.hum').text(data.list[0].main.humidity);
			$('.forecast-content span.wind').text(data.list[0].wind.speed);
			$('.forecast-content span.dir').text(degToCompass(data.list[0].wind.deg));
			//console.log(); data.list[0].main
		}
		
		function populateFourDays(data){
			$('.container .row .forecast').each(function(index){
				var date = new Date(data.list[index+1].dt * 1000),
					day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				
				$(this).find('.forecast-header .day').text(day[date.getUTCDay()]);
				console.log(index+1, day[date.getUTCDay()]);
			});
		}
		
		function degToCompass(num){
			var n = Math.ceil((num / 22.5) + 0.5);
			arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
			return arr[n];
		}
		
		getData();
	}
	
	var config = {
		'country':	'US',
		'city':		'New York',
		'cityID':	'5128638', // recommended method
		'units':	'fahrenheit',
		'dayCount':	'5',
		'baseURL':	'http://api.openweathermap.org/data/2.5/forecast?'
	};
	var Weather = new W(config);
	
})(jQuery);