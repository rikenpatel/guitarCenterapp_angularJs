var app = angular.module('myApp',['ui.router'])

// Controllers
app.controller('homeCtrl',function($scope,$http,$state,x){
	$scope.data=[];
	$scope.i=0;
	$http.get('JSON/guitardata.json')
		.success(function(resp){
			$scope.data = resp.allProducts;
			// console.log($scope.data);
		});

	$scope.nextbtn = function(){
		if($scope.i==6){
			$scope.i==0;
		}
		else
		{
			$scope.i=$scope.i+1;
		}
	}
	$scope.prevbtn = function(){
		if($scope.i==0)
		{
			$scope.i==6;
		}
		else
		{
			$scope.i=$scope.i-1;
		}
	}
	$scope.buybtn = function(){
		x.y=$scope.data[$scope.i];
		$state.go('purchase');
	}
});

app.controller('purchaseCtrl',function($scope,x,$state){
	$scope.a=x.y;

	$scope.fillup_form = true;
	$scope.printed_info = false;

	$scope.reviewbtn = function(){
		// Use ng-disabled property with form name.$invalid or if else condition
		$scope.fillup_form = false;
		$scope.printed_info = true;
	}

	$scope.editbtn = function(){
		$scope.fillup_form = true;
		$scope.printed_info = false;
	}

	$scope.buybtn = function(){
		// alert("buy btn");
		$state.go('confirmation');
	}
});

app.controller('confirmationCtrl',function($scope,x,$state){
	$scope.b=x.y;

	$scope.homebtn = function(){
		$state.go('home');
	}
});

app.directive('navDir',function(){
	return{
		restrict:'AE',
		templateUrl:'navbar1.html',
		translator:'true'
	}
});


// Services
app.service('x',function(){
	this.y = [];
});


// Config
app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('home')

	$stateProvider
		.state('home',{
			url:"/home",
			templateUrl:"home.html",
			controller:"homeCtrl"
		})
		.state('purchase',{
			url:"/purchase",
			templateUrl:"purchase.html",
			controller:"purchaseCtrl"
		})
		.state('confirmation',{
			url:"/confirmation",
			templateUrl:"confirmation.html",
			controller:"confirmationCtrl"
		})

});