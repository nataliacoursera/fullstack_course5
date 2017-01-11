(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var buylist = this;
		buylist.items = ShoppingListCheckOffService.getBuyItems();
		buylist.checkoffItem = function(itemIndex){
			ShoppingListCheckOffService.checkoffItem(itemIndex);
		}
	}
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var boughtlist = this;
		boughtlist.items = ShoppingListCheckOffService.getBoughtItems();

	}

	function ShoppingListCheckOffService(){
		var service = this;
		var boughtitems = [];
		var buyitems = [  {
			    name: "Milk",
			    quantity: "2"
			  },
			  {
			    name: "Donuts",
			    quantity: "200"
			  },
			  {
			    name: "Cookies",
			    quantity: "300"
			  },
			  {
			    name: "Chocolate",
			    quantity: "5"
  			}];
		service.checkoffItem = function (itemIndex){
			boughtitems.push(buyitems[itemIndex]);
			buyitems.splice(itemIndex, 1);

		};

		  service.getBuyItems = function () {
    		return buyitems;

  		};
  		  service.getBoughtItems = function () {
    		return boughtitems;

  		}
	}

})();
