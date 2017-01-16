(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'list.html',
    scope: {
      items: '<',
      onRemove: '&',
      showError:'<'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true,
  };

  return ddo;
}


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    
    ctrl.searchTerm = '';
    ctrl.foundItems = []
    ctrl.showError = false;

    ctrl.getAllItems = function(){
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      promise.then(function(response){
        if (response.length!==0){
            ctrl.showError = false;
            ctrl.foundItems=response;
            console.log ('response getAllItems'+response);

        }else{
          ctrl.showError=true;
          console.log ('response getAllItems else');

        }
      })
      .catch(function(error){
        console.log("Error getAllItems" + error);
        ctrl.showError = true;
      })
    };
     ctrl.removeItem = function (itemIndex) {
    ctrl.foundItems.splice(itemIndex, 1);
    };

  }
  MenuSearchService.$inject = ['$http', 'ApiBasePath', '$filter']
  function MenuSearchService($http, ApiBasePath) {
    var service=this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath)
      }).then(function(result){
        var found = result.data.menu_items;
        var foundItemsIn = [];
        console.log("getMatchedMenuItems")
        if (searchTerm.length !==0)
          {for (var i=0; i<found.length; i++){
                  if (found[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1){
                      foundItemsIn.push(found[i]);
                      console.log( "found[i]" + found[i]);
                  }
                }
              }
        console.log( ' foundItemsIn' + foundItemsIn);
        return foundItemsIn;
        
      });
    };
  }

  
})();
