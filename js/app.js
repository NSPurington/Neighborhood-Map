// Knockout.js watching to update selected location on map when changed
var viewModel = {
  locations: ko.observableArray(locations),
  selectedOption: ko.observable('')
};

// All locations to display as markers on map
var locations = [
    {title: 'The Bronze Fonz', location: {lat: 43.0410, lng: -87.9098}, venueID: '4ba13890f964a52069a337e3'},
    {title: "Shaker's Cigar Bar", location: {lat: 43.0268, lng: -87.9125}, venueID: '4ff77595e4b0a0306c55cadc'},
    {title: "Safe House", location: {lat: 43.0404, lng: -87.9101}, venueID: '4a74fb1bf964a52031e01fe3'},
    {title: "Pabst Mansion", location: {lat: 43.0392, lng: -87.9380}, venueID: '4b3109b6f964a520b6fe24e3'},
    {title: "Harley-Davidson Museum", location: {lat: 43.031939, lng: -87.916455}, venueID: '4ad4ac8af964a5209ae820e3'},
  ];
// Makes "map" variable global
var map;

// Create a new blank array for all the listing markers.
var markers = [];

// Gets the map loaded, and marker array created with all locations
function initMap() {
  var styles = [
    {
      featureType: 'landscape',
      stylers: [
        { color: '#C2EDC2' }
      ]
    },{
      featureType: 'water',
      stylers: [
        { color: '#C2E8ED' }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#f44141' },
        { lightness: -40 }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'on' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        { lightness: 100 }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { lightness: -100 }
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#f0e4d3' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#f4cd41' },
        { lightness: -25 }
      ]
    }
  ];

  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.038902, lng: -87.906471},
    zoom: 13,
    styles: styles
  });

  var largeInfowindow = new google.maps.InfoWindow();

  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('00a68c');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('bfd833');

  var pickMarker = function (marker) {
    return function() {
      largeInfowindow.open(map, marker);
      populateInfoWindow(marker, largeInfowindow);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 800);
    };
  };
  
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    var venueID = locations[i].venueID;
    
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      venueID: venueID,
      icon: defaultIcon, 
      animation: google.maps.Animation.DROP,
      id: i
    });
    
    // Add Custom Marker Attribute for venueID to be called in Foursquare  
    marker.set("venueID", locations[i].venueID);

    // Push the marker to our array of markers.
    markers.push(marker);

    // Event listeners to trigger color change of markers when mouseover and mouseout.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });

    // Event puts marker instances in "pickMarker" variable
    google.maps.event.addListener(marker, 'click', pickMarker(marker));
  }

  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage; 
  }  
}

// Pops up a window to alert client if there is an error loading the map
window.onerror = (function() {
    alert ("An error has occurred while loading the map....Please try again");
});

// Knockout.js watching to update selected location on map when changed
var viewModel = {
  locations: ko.observableArray(locations),
  selectedOption: ko.observable('')
};

// Drops the marker on the selected location from the filter drop-dowm 
function showMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
    if (markers[i].title === document.getElementById('unique-marker').text){
      markers[i].setAnimation(google.maps.Animation.DROP);
      markers[i].setMap(map);
      var singleInfowindow = new google.maps.InfoWindow();
      populateInfoWindow(markers[i], singleInfowindow);
    }
    else if (document.getElementById('unique-marker').text === ""){
      markers[i].setAnimation(google.maps.Animation.DROP);
      markers[i].setMap(map);
    }
  }  
}

// This starts Knockout.js
ko.applyBindings(viewModel);

// This function populates the infowindow when the marker is clicked. 
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  infowindow.setContent("Loading...");
  infowindow.open(map, marker);
  // Make sure the marker property is cleared if the infowindow is closed.
  infowindow.addListener('closeclick',function(){
    infowindow.setMarker = null;
  });

  // Variables for Foursquare ajax request
  var fsqClientID = '?client_id=N05QZFW15GK1VPKCAOKFTFQOPSIOR4T5UUMV0DM2YUBQBID4';
  var fsqClientSecret = '&client_secret=VWXXE0PAQSN2NXGQNEI3F1SPOGH3RZVGUW5VSMBZABF0WGR1';
  var versionParam = '&v=20180510';

  // FourSquare ajax request for venue info
  $.ajax({
    url: 'https://api.foursquare.com/v2/venues/' + marker.get("venueID") + fsqClientID + fsqClientSecret + versionParam,
    dataType: "json",
    success: function(data) {

      // Variables to populate location.contentString 
      var venueInfo = data.response.venue;
      var description = venueInfo.hasOwnProperty("description") ? venueInfo.description : "";
      var openStatus = venueInfo.hasOwnProperty("hours") ? venueInfo.hours.status : "Foursquare does not have info";
      var address = venueInfo.location.hasOwnProperty("formattedAddress") ? venueInfo.location.formattedAddress : "Foursquare does not have info";
      var rating = venueInfo.hasOwnProperty("rating") ? venueInfo.rating + ' / 10' : "No rating available";
      var tips = venueInfo.tips.hasOwnProperty("groups") ? venueInfo.tips.groups["0"].items["0"].text : "No tip available";

      // content for the infowindow 
      location.contentString = '<div class="infowindow">' +
          '<div class="infocontent">' +
              '<h2>' + marker.title + '</h2>' +
              '<p>' + description + '</p>' +
              '<p><strong>Opening hours:</strong> ' + openStatus + '</p>' +
              '<p><strong>Location:</strong> ' + address + '</p>' +
              '<p><strong>Rating:</strong> ' + rating + '</p>' +
              '<p><strong>Best Tip:</strong> ' + tips + '</p>' +
              '<p>Click to read more on <a href="' + venueInfo.canonicalUrl + '?ref=' + fsqClientID + '" target="_blank">Foursquare</a></p>' +
              '<p class="attribution">By Foursquare</p>' +
          '</div>' +  
          '</div>';
      infowindow.setContent(location.contentString);
    }   
  });

  // Pops up a window to alert client if there is an error with the AJAX call
  window.onerror = (function() {
    alert ("An error has occurred while loading the marker details....Please try again");
  });       
}
