$(document).ready(function () {

	$("#simulate").click(function () {
		alert("ALERT: FIRE ALARM GOING OFF IN BUILDING. PLEASE PROCEED TO EXIT IMMEDIATELY.");

		setTimeout(function () {
			$("#schoolMap").attr("src", "images/map2.JPG");
		}, 1000);

		setTimeout(function () {
			$("#schoolMap").attr("src", "images/map3.JPG");
		}, 4000);
	});

	$("#reset").click(function () {
		$("#schoolMap").attr("src", "images/map1.JPG");
	});


});

var mapZoom = 16;

function initialize() {
	// Reset Map
	$('#map-canvas').html('');
	// Remake Map
	// Start
	var latStart = parseFloat($('#latStart').val());
	var lonStart = parseFloat($('#lonStart').val());
	var startPosition = {
		lat: latStart,
		lng: lonStart
	};

	// Destination 
	var latEnd = parseFloat($('#latEnd').val());
	var lonEnd = parseFloat($('#lonEnd').val());
	var endPosition = {
		lat: latEnd,
		lng: lonEnd
	};

	// Center of map (latEnd + latStart)/2
	// Center of map (lonEnd + lonStart)/2
	var centerPosition = {
		lat: (latStart + latEnd) / 2,
		lng: (lonStart + lonEnd) / 2
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: centerPosition,
		zoom: mapZoom
	});

	var startMarker = new google.maps.Marker({
		position: startPosition,
		map: map,
		title: 'Click to zoom',
		draggable: true,
		label: "A"
	});

	var endMarker = new google.maps.Marker({
		position: endPosition,
		map: map,
		title: 'Click to zoom',
		draggable: true,
		label: "B"
	});

	startMarker.addListener('drag', updateStartFields);
	startMarker.addListener('dragend', initialize);
	endMarker.addListener('drag', updateEndFields);
	endMarker.addListener('dragend', initialize);
}

function updateStartFields(event) {
	$('#latStart').val(event.latLng.lat());
	$('#lonStart').val(event.latLng.lng());
}

function updateEndFields(event) {
	$('#latEnd').val(event.latLng.lat());
	$('#lonEnd').val(event.latLng.lng());
}