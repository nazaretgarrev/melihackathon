function first_load(){
	
	$("#img_loading_categories").css("visibility", "visible");
	
	getCarsCategories();
	
	$("#formCategoria").on("change", function(){
		
		var data  = $(this).val().split("-");
		var idcat = data[0];
		
		if(idcat !== ""){
			
			update_quantities(data[1]);
			
			$("#img_loading_brands").css("visibility", "visible");
			$("#formMarca").attr("disabled", "disabled");
			
			getCarsCategoriesBrands(idcat);
			
		}else{
		
			$("#formMarca").attr("disabled", "disabled");
			$("#formMarca").children().remove();
			
			var appd = "<option value='' selected='selected'>Seleccione...</option>";
			$("#formMarca").append(appd);
			
			update_quantities("[seleccione categoría]");
			
		}
		
	});
	
	$("#formMarca").on("change", function(){
		
		var data  = $(this).val().split("-");
		var idcat = data[0];
		
		if(idcat !== ""){
			
			update_quantities(data[1]);
			
		}else{
			
			var data  = $("#formCategoria").val().split("-");
			var idcat = data[0];
			
			update_quantities(data[1]);
			
		}
		
	});
	
}

function update_quantities($quantity){

	$("#spn_quantities").html($quantity);
	
}

// AJAX Callbacks Data API

/*
function getUserData()
{
	$.ajax({
		url:"http://localhost/melihackathon/ajax.php?action=get_user_data",
		dataType:"json",
		error:function(obj,cad,ex){
		},
		success:function(datos)
		{
			
		}
	});
}
*/

function getCarsCategories(){
	
	$.ajax({
		url:"ajax.php",
		data:{ action: "get_cars_categories" },
		dataType:"json",
		error:function(obj,cad,ex){
			
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




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*


var accion_usuario = function(){
	'operacionToFrontend':function(e,div){
		if(e is 'hover' and div is '$elDiv')
		{
			this.eventos_accion.hover_form_precioauto();
			//...
		}
	}
	'eventos_accion':{
		'hover_form_precioauto':function()
		{
			// Devuelve resultado de autos similares
			resultado_autos.
		}
	}
}

var resultado_autos = function()
{
	'lista_autos':[],
	'':function(){
		$.ajax({
			// Recurso
			(function(){
				new auto_similar(...);
			})();
		});
	},
	'ordenar':function(tipoOrden){
		this.lista_autos.sort(function(){
			//tipoOrden
		});
		return this.lista_autos;
	}
	'metricas':function(tipoData){

	}

}

var auto_similar = function(automovil,datos...){
	'data_desc':{
		'precio':0000,
		'marca':'',
		'modelo':'',
		// Tiene GPS? , tiene radio? ...
	}

}

*/



