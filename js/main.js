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
			populateCityData(data.city);
		}

		function populateCityData(data){
			var o = $('.jumbotron .forecast-header');
			
			//$('.day', o).text(data.);
			//$('.date', o).text();
			$('.location', o).text(data.name);
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