(function(){
	'use strict';

	angular.module('LunchCheck', [])

	.controller('LunchCheckController', LunchCheckController);
	LunchCheckController.$inject = ['$scope', '$filter'];
	function LunchCheckController($scope){
		$scope.lunch = '';
		$scope.message = '';
		$scope.Mystyle={};
		
		$scope.ifTooMuch = function(){
			var noEmty = []
			var allFood = $scope.lunch.split(',');
			
			for (var i=0; i<allFood.length; i++){ 
				
				
				if((allFood[i].length > 0)&(allFood[i]!=" ")){
					noEmty.push(allFood[i]);
				}

			}
			console.log(noEmty);
			if((allFood.length==0)|(allFood[0]=="")){
				$scope.message="Please enter data first";
				$scope.Mystyle.mycolor="red";
			}
			else if (noEmty.length<=3){
				$scope.message='Enjoy!';
				$scope.Mystyle.mycolor="green";
			}
			else {
				$scope.message='Too much!';
				$scope.Mystyle.mycolor="green";
			}
			

		};
		$scope.sayMessage = function(){
			return message
		};

	}
})();
