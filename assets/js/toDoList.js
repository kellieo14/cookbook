
$(".hide-all-conversion").hide();
$(".hide").hide();
$(".hide-all-shopping").hide();
$(".breakfast-toggle").hide();
$(".dinner-toggle").hide();
$(".dessert-toggle").hide();

var ingredientListArray = [];
var directionsArray = [];
var shoppingListArray = [];
var noteArray =[];

// $("ul").on("click", "li", function() {
// 	$(this).toggleClass("completed")
// });


var recipe = {
	// name: ;
	// author: ;
	// ingredients: []
	// directions: [];
	// additional notes: [];
	// category:
}

//save recipe to object
$(".save").on("click", function(){
	saveRecipe();
	Cookies.set("recipe", JSON.stringify("recipe"), {expires: 7});
	// console.log(Cookies.get());
});

function saveRecipe() {
	recipe.name = $(".recipe-title").val();
	recipe.author = $(".author").val();
	recipe.ingredients = ingredientListArray;
	recipe.directions = directionsArray;
	recipe.notes = noteArray;
	recipe.category = $("#category").val();
}




//clear new recipe when exit button is pushed
$(".exit").click(function(){
	$(".new-recipe").show();
	$(".hide").hide();
	$(".ingredient").children().remove();
	$(".direction").children().remove();
	$(".recipe-title").val("");
	$(".ingredient").val("");
	$(".direction-title").val("");
	$(".titles").fadeToggle();
	$(".author").val("");
});


$("ul").on("click", ".fa-trash", function(event){
	var toDelete = $(this).closest("li");
	var toDeleteText = toDelete.text();
	var ulCheck = $(this).closest("ul").attr('class');
	if (ulCheck === "list") {
		var indexNumber =(shoppingListArray.indexOf(toDeleteText));
		shoppingListArray.splice(indexNumber, 1);
		// console.log(shoppingListArray);

	} else if (ulCheck === "ingredient") {
		var ingredientIndexNumber = (ingredientListArray.indexOf(toDeleteText));
		ingredientListArray.splice(ingredientIndexNumber, 1);
		console.log(ingredientListArray);

	} else if(ulCheck ==="direction") {
		var directionsIndexNumber = (directionsArray.indexOf(toDeleteText));
		directionsArray.splice(directionsIndexNumber, 1);
		console.log(directionsArray);

}	else if(ulCheck ==="note") {
		var noteIndexNumber = (noteArray.indexOf(toDeleteText));
		noteArray.splice(noteIndexNumber, 1);
		console.log(noteArray);

}	toDelete.fadeOut(500, function(){
		$(this).remove();
	});
 	event.stopPropagation();
});


//show add new recipe and view all recipe when on titles//

$(".breakfast-div").mouseenter(function(){
	$(".breakfast-toggle").show();
});

$(".breakfast-div").mouseleave(function(){
	$(".breakfast-toggle").hide();
});

$(".dinner-div").mouseenter(function(){
	$(".dinner-toggle").show();
});

$(".dinner-div").mouseleave(function(){
	$(".dinner-toggle").hide();
});

$(".dessert-div").mouseenter(function(){
	$(".dessert-toggle").show();
});

$(".dessert-div").mouseleave(function(){
	$(".dessert-toggle").hide();
});


//make new recipe form appear
$(".add-new-recipe").on("click", function(){
	$(".hide").fadeToggle();
	$(".titles").fadeToggle();
});

//add item from recipe to shopping cart when icon clicked
$("ul").on("click",".fa-shopping-cart", function(event){
	var newItem = $(this).closest("li").text();
	$(".hide-list").show();
	doubleCheck(newItem);
});


// //Add new ingredients to new recipe
$(".ingredient").keypress(function(event){
	if(event.which === 13){
		var todoText = $(this).val();
		$(this).val("");
		ingredientListArray.push(todoText);
		console.log(ingredientListArray);
		$(".ingredient").append("<li class='ingredientArray'>" + todoText + "<span><i class='fa fa-trash'></i></span>" + "<span><i class='fa fa-pencil-alt'></i></span>" + "<span><i class='fa fa-shopping-cart'></i></span>" + "</li>");
	}
});

//Add directions to new recipe
$(".direction-title").keypress(function(event){
	if(event.which === 13){
		var todoText = $(this).val();
		$(this).val("");
		directionsArray.push(todoText);
		console.log(directionsArray);
		$(".direction").append("<li>" + todoText + "<span><i class='fa fa-trash'></i></span>" + "<span><i class='fa fa-pencil-alt'></i></span>" + "</li>");
	}
});


//Add new notes to recipe

$(".note-input").keypress(function(event){
	if(event.which === 13){
		var noteText = $(this).val();
		$(this).val("");
		noteArray.push(noteText);
		console.log(noteArray);
		$(".note").append("<li>" + noteText + "<span><i class='fa fa-trash'></i></span>" + "<span><i class='fa fa-pencil-alt'></i></span>" + "</li>");
	}
});

$(".list-item").keypress(function(event){
	if(event.which === 13){
		var ingredient = $(this).val();
		console.log(shoppingListArray);
		$(this).val("");
		doubleCheck(ingredient);
	}
});

//checks to see if item is already in shopping cart
function doubleCheck(ingredient) {
	if (shoppingListArray.indexOf(ingredient) > -1) {
		alert("already in cart");
	} else {
		shoppingListArray.push(ingredient);
		$(".list").append("<li>" + ingredient + "<span><i class='fa fa-trash'></i></span><span><i class='fa fa-pencil-alt'></i></span>" + "</li>");
	}
}

$(".main-cat").click(function() {
	$(".hide").fadeToggle();
	$(".titles").fadeToggle();
});

$(".converter").click(function() {
	$(".hide-all-conversion").fadeToggle();
});

$(".converter-display").on("click", function(){
	$(".hide-all-conversion").fadeToggle();
});


$(".shopping-list-display").on("click", function() {
	$(".hide-all-shopping").fadeToggle();
});

$(".shop-list").click(function(){
	$(".hide-all-shopping").fadeToggle();
});


//Converter
$("#convertButton").on('click', function(event){
  var fromUnit = $("#fromUnit").val();
  var toUnit = $("#toUnit").val();
  var fromInput = parseFloat($(".fromInput").val());
  // $(".returnValue").remove();

   
if (fromUnit === toUnit) {
  appendValue(fromInput);
} else if (fromUnit === "cup" && toUnit ==="gram"){
  appendValue(cupToGram(fromInput));
} else if (fromUnit === "cup" && toUnit ==="ounce"){
  appendValue(cupToOunce(fromInput));
} else if (fromUnit === "cup" && toUnit ==="ml"){
  appendValue(cupToMl(fromInput)); 
} else if (fromUnit === "cup" && toUnit ==="pint"){
  appendValue(cupToPint(fromInput));
} else if (fromUnit === "gram" && toUnit ==="cup"){
  appendValue(gramToCup(fromInput));
} else if (fromUnit === "gram" && toUnit ==="ounce"){
  appendValue(gramToOunce(fromInput));
} else if (fromUnit === "ml" && toUnit ==="tsp"){
  appendValue(mlToTsp(fromInput));
} else if (fromUnit === "ml" && toUnit ==="cup"){
  appendValue(mlToCup(fromInput));
} else if (fromUnit === "ml" && toUnit ==="pint"){
  appendValue(mlToPint(fromInput));
} else if (fromUnit === "ounce" && toUnit ==="cup"){
  appendValue(ounceToCup(fromInput));
} else if (fromUnit === "ounce" && toUnit ==="gram"){
  appendValue(ounceToGram(fromInput));
} else if (fromUnit === "pint" && toUnit ==="cup"){
  appendValue(pintToCup(fromInput));
} else if (fromUnit === "pint" && toUnit ==="ml"){
  appendValue(pintToMl(fromInput));
} else if (fromUnit === "tsp" && toUnit ==="ml"){
  appendValue(tspToMl(fromInput));
}else {
  console.log("not working");
}
  
});

function appendValue(val) {
   $(".returnValue").text(val);
}
//Conversion Equations
function round(num){
  return parseFloat(Number.parseFloat(num).toPrecision(3)); 
}

function cupToGram(cup) {
  return cup * 340;
}

function gramToCup(gram) {
  var conversion = gram / 340;
  return round(conversion);
}

function ounceToGram(ounce) {
  return ounce * 28;
}

function gramToOunce(gram) {
  var conversion = gram / 28;
  return round(conversion);
}

function ounceToCup(ounce) {
  var conversion = ounce / 8;
  return round(conversion);
}

function cupToOunce(cup) {
  return cup * 8;
}

function tspToMl(tsp) {
  return tsp * 5;
}

function mlToTsp(ml) {
  var conversion = ml / 5;
  return round(conversion);
}

function cupToMl(cup) {
  return cup * 240;
}

function mlToCup(ml) {
  var conversion = ml / 240;
  return round(conversion);
}

function pintToCup(pint) {
  return pint * 2;
}

function cupToPint(cup) {
  var conversion = cup / 2
  return round(conversion);
}

function mlToPint(ml) {
  var conversion = ml / 475;
  return round(conversion);
}

function pintToMl(pint){
  return pint * 475;
}






