var locationsArray = [
    {title: 'The Bronze Fonz', location: {lat: 43.0410, lng: -87.9098}},
    {title: "Shaker's Cigar Bar", location: {lat: 43.0268, lng: -87.9125}},
    {title: "International Exports Ltd.", location: {lat: 43.0404, lng: -87.9101}},
    {title: "Pabst Mansion", location: {lat: 43.0392, lng: -87.9380}},
    {title: "Art Smart's", location: {lat: 43.053048, lng: -87.898395}},
  ];

var viewModel = {
  locations: ko.observableArray(locationsArray),
  selectedOption: ko.observable(''),
  getCurrentLocations: function() {
    var selectedVal = this.selectedOption();

    return this.locations.filter(function(f) {
      return f.location == selectedVal;
    });
  }
};

ko.applyBindings(viewModel);
