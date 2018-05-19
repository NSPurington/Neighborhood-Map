$(function() {
  // Data from server
  var people = [
    { name: "Bill Gates", category: "Tech" },
    { name: "Steve Jobs", category: "Tech" },
    { name: "Jeff Bezos", category: "Tech" },
    { name: "George Clooney", category: "Entertainment" },
    { name: "Meryl Streep", category: "Entertainment" },
    { name: "Amy Poehler", category: "Entertainment" },
    { name: "Lady of Lórien", category: "Fictional" },
    { name: "BB8", category: "Fictional" },
    { name: "Michael Scott", category: "Fictional" }
  ];
  
  // View Model
  function PeopleViewModel() {
    var self = this;
    
    // import starting data
    self.people = people;
    
    // currently selected category
    self.selectedCategory = ko.observable("All");
    
    // filtered people list
    self.filteredPeople = ko.computed(function() {
      var category = self.selectedCategory();
      
      if(category === "All") {
        return self.people;
      } else {
        var tempList = self.people.slice();

        return tempList.filter(function(person) {
          return person.category === category;
        });
      }
    });
  }
  
  ko.applyBindings(new PeopleViewModel());
});





// var filterList = function() {
//   this.locations = ko.observableArray([
//     { name: "The Bronze Fonz"}
//     { name: "Shakers Cigar Bar"}
//     { name: "International Exports Ltd."}
//     { name: "Pabst Mansion"}
//     { name: "Art Smart's"}
//   ]);

//   var listValues = {
//     optionValues : ["The Bronze Fonz", "Shakers Cigar Bar", "International Exports Ltd.", "Pabst Mansion", "Art Smart's"],
//     selectedOptionValue : ko.observable()
//   };  

//   this.locationsToShow = ko.observable("Select...")

//   this.filteredLocations = ko.pureComputed(function() {
//     // Filtered list of locations
//     var selectedLocations = this.selectedOptionValue();
//     if (selectedLocations == "all") return this.locations();
//     return ko.utils.arrayFilter(this.locations(), function(location) {
//       return location.name == selectedLocations;
//     });
//   }, this);
// };
// ko.applyBindings(new filterList);
