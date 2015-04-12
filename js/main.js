
_donut = "";
_bars  = "";

function first_load(){
	
	$("#img_loading_categories").css("visibility", "visible");
	
	getCarsCategories();
	
	$("#formCategoria").on("change", function(){
		
		var data  = $(this).val().split("-");
		var idcat = data[0];
		
		if(idcat !== ""){
			
			update_quantities(data[1]);
			
			$("#img_loading_brands").css("visibility", "visible");
			$("#img_loading_keywords").css("visibility", "visible");
			
			$("#formMarca").attr("disabled", "disabled");
			
			getCarsCategoriesBrands(idcat);
			getKeyWordsFromTrends(idcat);
			destroy_donut_graph();
			destroy_bars_graph();
			
			load_suggested_price("");
			
		}else{
		
			$("#formMarca").attr("disabled", "disabled");
			$("#formMarca").children().remove();
			
			var appd = "<option value='' selected='selected'>Seleccione...</option>";
			$("#formMarca").append(appd);
		
			$("#listKeywords").empty();
			
			update_quantities("[seleccione categoría]");
			destroy_donut_graph();
			destroy_bars_graph();
			
			load_suggested_price("");
			
		}
		
	});
	
	$("#formMarca").on("change", function(){
		
		var data  = $(this).val().split("-");
		var idcat = data[0];
		
		if(idcat !== ""){
			
			update_quantities(data[1]);
			
			var data  = $("#formCategoria").val().split("-");
			var idcat = data[0];
			
			category = {"name": $("#formCategoria :selected").text(), "value": data[1]};
			
			var data  = $("#formMarca").val().split("-");
			var idcat = data[0];
			
			brand    = {"name": $("#formMarca :selected").text(), "value": data[1]};
			
			$("#img_loading_bars").css("visibility", "visible");
			
			generate_donut_graph(category, brand);
			generate_bar_graph(data[0]);
			
		}else{
			
			var data  = $("#formCategoria").val().split("-");
			var idcat = data[0];
			
			update_quantities(data[1]);
			destroy_donut_graph();
			destroy_bars_graph();
			
			load_suggested_price("");
			
		}
		
	});
	
}

function update_quantities($quantity){

	$("#spn_quantities").html($quantity);
	
}

// AJAX Callbacks Data API

function getCarsCategories(){
	
	$.ajax({
		url:"ajax.php",
		data:{ action: "get_cars_categories" },
		dataType:"json",
		error:function(obj,cad,ex){
			
			$("#img_loading_categories").css("visibility", "hidden");
			alert("Error al cargar las categorias");
			
		},success:function(datos){
			
			var data = datos;
			
			for(var j in data){
				var appd = "<option value='" + data[j].category_id + "-" + data[j].items + "'>" + data[j].category_name + "</option>";
		 	 	$("#formCategoria").append(appd);
			}
			
			$("#img_loading_categories").css("visibility", "hidden");
			$("#formCategoria").attr("disabled", false);
			
		}
	});
	
}

function getCarsCategoriesBrands(IDCat){
	
	$.ajax({
		url:"ajax.php",
		data:{action:"get_cars_category_brands",category_id:IDCat},
		dataType:"json",
		error:function(obj,cad,ex){
			
			$("#img_loading_brands").css("visibility", "hidden");
			alert("Error al cargar las marcas");
		
		},success:function(datos){
			
			var data = datos;
		 	 
			$("#formMarca").children().remove();
			
			var appd = "<option value='' selected='selected'>Seleccione...</option>";
			$("#formMarca").append(appd);

			for(var j in data){
				var appd = "<option value='" + data[j].category_id + "-" + data[j].items + "'>" + data[j].category_name + "</option>";
		 	 	$("#formMarca").append(appd);
			}
			
			$("#img_loading_brands").css("visibility", "hidden");
			$("#formMarca").attr("disabled", false);
			
		}
	});
	
}

function getKeyWordsFromTrends(IDCat){
	
	$.ajax({
		url:"ajax.php",
		data:{action:"get_category_trendings", category_id:IDCat},
		dataType:"json",
		error:function(obj,cad,ex){
			
			$("#img_loading_keywords").css("visibility", "hidden");
			alert("Error al cargar las palabras más buscadas")
		
		},success:function(datos){
			
			var keywd = datos;
			$("#listKeywords").empty();
			
			for(var k in keywd){
				var appd = "<li>" + keywd[k] + "</li>";
				$("#listKeywords").append(appd);
			}
			
			$("#img_loading_keywords").css("visibility", "hidden");
			
		}
	});
	
}

function generate_donut_graph(category, brand){
	
	if(_donut == ""){
		
		_donut = Morris.Donut({
		  element: 'morris-donut-chart',
		  data: [
		    {label: category.name, value: category.value},
		    {label: brand.name, value: brand.value}
		  ]
		});
		
	}else{
		
		_donut.setData([
		    {label: category.name, value: category.value},
		    {label: brand.name, value: brand.value}
		]);
		
	}
	
}

function destroy_donut_graph(){
	
	if(_donut != ""){
		_donut.setData([]);
	}
	
}

function generate_bar_graph(IDCat){
	
	destroy_bars_graph();
	
	$.ajax({
		url:"ajax.php",
		data:{action:"get_lowest_and_highest", category_id:IDCat},
		dataType:"json",
		error:function(obj,cad,ex){
			
			$("#img_loading_bars").css("visibility", "hidden");
			alert("Error al generar gráfico de promedio de precios")
		
		},success:function(datos){
			
			if(_bars == ""){
				
				_bars = Morris.Bar({
					  element: 'morris-bars-chart',
					  data: [
					    { x: 'menor', y: datos.lowest},
					    { x: 'promedio', y: datos.average},
					    { x: 'mayor', y: datos.highest}
					  ],
					  xkey: 'x',
					  ykeys: ['y'],
					  labels: ['Precio']
					});
				
			}else{
				
				_bars.setData([
				    { x: 'menor', y: datos.lowest},
				    { x: 'promedio', y: datos.average},
				    { x: 'mayor', y: datos.highest}
				]);
				
			}
			
			load_suggested_price(datos.formated_average);
			$("#img_loading_bars").css("visibility", "hidden");
			
		}
	});
	
}

function destroy_bars_graph(){
	
	if(_bars != ""){
		_bars.setData([]);
	}
	
}

function load_suggested_price(value){
	
	var visibility = "hidden";
	var html       = "";
	
	if(value !== ""){
		visibility = "visible";
	}
	
	$("#p_suggested_price").css("visibility", visibility);
	$("#spn_suggested_price").html(value);
	
	
}