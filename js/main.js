let thumbnails = document.getElementsByClassName('thumbnail')
let featured = document.getElementById('featured')
let activeImages = document.getElementsByClassName('active')
let slider = document.getElementById('slider')
let slug = document.getElementById('slug')
let title = document.getElementById('title')
let price = document.getElementById('price')
let desc = document.getElementById('desc')
let modal = document.getElementById('modal')
let modalClose = document.getElementById('modalClose')
let modalTitle = document.getElementById('modalTitle')
let modalContent = document.getElementById('modalContent')
let variantColors = document.getElementById('variantColors')
let variantSizes = document.getElementById('variantSizes')

function variantVerify(option, id, value){
	document.getElementById('variant_'+option).value = value;
}

(function(){
	fetch('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js')
	.then(function(res){ return res.json(); })
	.then(function(data){
		loadData(data)
		console.log(data)
	})
	.catch(function(error){ console.log(error)})
}());

function loadData(data){

	slug.innerHTML = 'Catalog / Sneackers / <span>' + data.title + '</span>';
	title.innerHTML = data.title; modalTitle.innerHTML = data.title; 
	price.innerHTML = '$' + data.price + ' <span class="grey fs-14">$' + data.compare_at_price + '</span>';
	desc.innerHTML = data.description;

	// Slider
	active = ""; html = "";
	for (var i=0; i < data.images.length; i++){
		if(i == 0){ active = "active"; featured.src = data.images[i]; }else{ active = "" }
		html += '<img class="thumbnail ' + active + '" src="'+data.images[i]+'">';
	}
	slider.innerHTML = html;
	
	for(var i=0; i < thumbnails.length; i++){
		thumbnails[i].addEventListener('mousedown', function(){	
		if (activeImages.length > 0){
			activeImages[0].classList.remove('active')
		}
		this.classList.add('active')
			featured.src = this.src
		})
	}

	// variante de color
	var htmlVariant = "Color: ";
	for (var i=0; i < data.options[0].values.length; i++){
		htmlVariant += '<div class="radio-item-colors" style="background-color:' + data.options[0].values[i] + '">'+
		'<input type="radio" id="rcolor_' + data.options[0].values[i] + '" name="variant_0" value="' + data.options[0].values[i] + '" data-stock="1" onchange="variantVerify(0,' + i + ',this.value)">'+
		'<label for="rcolor_' + data.options[0].values[i] + '"></label></div>';
	}
	variantColors.innerHTML = htmlVariant;

	// variante de tamaño
	var htmlVariant = "Size: ";
	for (var i=0; i < data.options[1].values.length; i++){
		htmlVariant += '<div class="radio-item-sizes">'+
		'<input type="radio" id="rsize_' + data.options[1].values[i] + '" name="variant_1" value="' + data.options[1].values[i] + '" data-stock="1" onchange="variantVerify(1,' + i + ',this.value)">'+
		'<label for="rsize_' + data.options[1].values[i] + '">' + data.options[1].values[i] + '</label></div>';
	}
	variantSizes.innerHTML = htmlVariant;

	modalOpen.onclick = function() {
		htmlModal = "Color: ";
		htmlModal += document.getElementById('variant_0').value;
		htmlModal += "<br>Size: ";
		htmlModal += document.getElementById('variant_1').value;
		modalContent.innerHTML = htmlModal;
		modal.style.display = "block";
	}

	modalClose.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

}