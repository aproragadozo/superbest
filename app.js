var myApp = angular.module('myApp', ["angucomplete", "ngAnimate"]);

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
	/*$scope.image = "";
    $scope.keyword = '';
    $scope.flickrQuery = function () {
        $http.post('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=160f672f62d2f429e0f06fe9eb8cb555&tags=' + $scope.keyword +'&format=json&extras=width_b,height_b&privacy_filter=1&sort=interestingness-desc&nojsoncallback=1')
            .then(function (response) {
                $scope.image = 
				"https://farm" + response.data.photos.photo[0].farm + ".staticflickr.com/" + response.data.photos.photo[0].server + "/" + response.data.photos.photo[0].id +"_" + response.data.photos.photo[0].secret +"_b.jpg";
				
            },
			function (response, status) {

                console.log(response);

            });
    };*/
	$scope.larch = [];
	function getFonts(){
		$http.get('https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=AIzaSyCDe9HThI7KnVoHvEmffVwJ7D6VR8cFj1U')
		.then(function(response){
			var _data = angular.fromJson(response).data.items;
			for (item in _data) {
				$scope.larch.push({name: _data[item].family});
			};
			return $scope.larch;
		})
	};
	getFonts();
	$scope.majom = {};
	$scope.farben = [];
	$scope.tester = function(event) {
					$(".bubble").css("display", "none");
					$scope.farben = [];
					var rainbow = randomColor({count: 6, luminosity: 'light'});
					for(var col in rainbow){
						$scope.farben.push({hex: rainbow[col]});
					}
					$(event.currentTarget).children(".bubble").css("display", "flex");
					/*
					$http.get("http://www.colr.org/json/colors/random/7")
						.success(function(data){
							$scope.farben = [];
							for(var hex in data.colors){
								$scope.farben.push({hex: "#" + data.colors[hex].hex, name: (data.colors[hex].tags[0] === undefined) ? "unknown" : data.colors[hex].tags[0].name})
							}
					});
						*/
					}
		
	// a két bubble click handlere
	$scope.fester = function(event, color){
		$scope.colorOne = color;
		event.currentTarget.closest(".color").style.backgroundColor = color;
		$(".bubble").css("display", "none");
		$scope.toggler(event);
	}
	$scope.bester = function(event, color){
		$scope.colorTwo = color;
		event.currentTarget.closest(".color").style.backgroundColor = color;
		$(".bubble").css("display", "none");
		$scope.toggler(event);
	}
	// a függvény, ami intézi az animációt
	// a backspace-t és a delete-et valahogy nagyon hácolva ignoráljuk
	$scope.toggler = function(event){
		var bal = $("#egyes");
		var jobb = $("#kettes");
		console.log("running");
		if(typeof event === "undefined") { event = jQuery.Event("click"); }
		if(event.which === 8 || event.which === 46) {return;}
		else if(!bal.hasClass("balra") || !jobb.hasClass("jobbra")) {
			bal.addClass("balra"); jobb.addClass("jobbra");
			}
		else {
			bal.toggleClass("balra").toggleClass("balra").toggleClass("balra");
			jobb.toggleClass("jobbra").toggleClass("jobbra").toggleClass("jobbra");
			}
		};
	
	$scope.fontOne = {};
	$scope.fontTwo = '';
	$scope.szinek = ["#0F8DFC","rgba(135,1,101)","#F00285","hsla(190,41%,95%,1)","#94B77E","#4C060A","#053F32","#ED8074","#788364"];
	$scope.character = '';
	$scope.colorOne = 'rgb(255, 0, 0)';
	$scope.colorTwo = 'rgb(0, 0, 255)';
	
}]);