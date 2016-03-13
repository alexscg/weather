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
			
			$('.day', o).text(getDay(data.list[0].dt));
			$('.location .city', o).text(data.city.name);
			$('.location .lat', o).text('(lat: ' + data.city.coord.lat);
			$('.location .lon', o).text(', lon: ' + data.city.coord.lon + ')');
			
			$('.degree .num', o).html(getTemperature(data.list[0].temp.day));
			$('.degree .forecast-icon img', o).attr('src', 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png');
			$('.forecast-content span.hum').text(data.list[0].humidity);
			$('.forecast-content span.wind').text(data.list[0].speed);
			$('.forecast-content span.dir').text(degToCompass(data.list[0].deg));
		}
		
		function populateFourDays(data){
			$('.container .row .forecast').each(function(index){
				$(this).find('.forecast-header .day').text(getDay(data.list[index+1].dt));
				$(this).find('.forecast-content .forecast-icon img').attr('src', 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png');
				$(this).find('.forecast-content .degree').html(getTemperature(data.list[index+1].temp.day));
			});
		}
		
		function getDay(utc){
			var date = new Date(utc * 1000),
				day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			
			return day[date.getUTCDay()];
		}
		
		function getTemperature(k){
			var temp = (k - 273.15) * 1.8 + 32,
				units = 'f<sup>o</sup>';
				
			if(config.units === 'celsius'){
				temp = (k - 273.15);
				units = 'C<sup>o</sup>';
			}
			
			return Math.round(temp) + ' ' + units;
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
		'units':	'celsius',
		'dayCount':	'5',
		'baseURL':	'http://api.openweathermap.org/data/2.5/forecast/daily?'
	};
	var Weather = new W(config);
	
})(jQuery);