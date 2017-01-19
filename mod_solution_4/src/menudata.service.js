(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
// .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function (){
    console.log('service');
    var response =  $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/categories.json")
    })
    return response;
  }
  service.getItemsForCategory = function(shortName) {
    console.log('short ' + shortName);
      return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
        params: {
          category: shortName
        }
      });
    };

}

})();
