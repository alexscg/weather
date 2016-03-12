function getData(config){

	var apiKey = "e531d0d6a1a3dc737938bf11b53dae36",
		country = config.country,
		city = config.city,
		cityID = config.cityID,
		units = config.units,
		baseURL = config.baseURL,
		dayCount = config.dayCount,
		url = baseURL + 'id=' + cityID + '&cnt=' + dayCount + '&appid=' + apiKey;

	$.ajax({
		url: url,
		dataType: 'json',
		success: function(data) {
			console.log('data: ', data);
			return data;
		},
		error: function(err) {
			console.log('Something went wrong: ', err);
		}
	});
}