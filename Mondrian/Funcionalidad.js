console.log("Cargando html y javasript");

//Espera hasta que todo el contenido del html haya cargado
window.onload=function(){

	console.log("Cargados html y javasript");

	//variables utilizadas
	$mondrian = document.getElementById('Mondrian');//Agarra div con ID Mondrian
	$buttonQuantity = document.getElementById('Quantity');//Agarra button con ID Quantity
	$buttonColor = document.getElementById('Color');//Agarra button con ID Color
	$inputPercentage = document.getElementById('Percentage')//Agarra input con ID Percentage
	$inputX = document.getElementById('x');//Agarra input con ID x
	$inputY = document.getElementById('y');//Agarra input con ID y
	$x = 0;
	$y = 0;
	$rowContent = [];
	$columnContent = [];
	$coloredSquaresList = [];
	$coloredQuantity = 0;

	console.log("Variables cargadas");

//Funciones usadas para pintar los cuadros
//.....................................................................................................
	
	//limpia las variables y los colores generados anteriormente
	function resetColors(){

		if($coloredSquaresList.length > 0){

			console.log("Borrando colores anteriores");	

			$coloredSquaresList.forEach(function(element){$columnContent[element].removeAttribute("class");});
			$coloredSquaresList = [];
			$columnContent.forEach(function(element){element.removeAttribute("style");});
			
			console.log("Colores anteriores borrados exitosamente");	
		}
	}
	
	//Numeros aleatorios dependiendo de los valores dados
	function random (max, min){

		return Math.floor((Math.random() * max) + min);
	}

	//Cantidad de cuadros a pintar dependiendo de porcentaje seleccionado
	function percentage (total, percentage){

		return Math.floor( percentage * (total) /100 ); 
	}

	//Ubicaciones aleatorias para los cuadros con color
	function differentNumbers(){

		var tmp = 0;
		if($coloredSquaresList.length == 0){
			return random($columnContent.length , 0);
		}else{
			do{
				tmp = random($columnContent.length , 0);
			}while($coloredSquaresList.indexOf(tmp) != -1)
			return tmp;
		}
	}

	//Cambia los tamaños de los cuadros
	function deform(){
		//filas y columnas
		for (var row = 0; row < $y-1; row++) {
			for (var column  = 0; column < $x-1; column++) {
				if($rowContent[row].childNodes[column].getAttribute("class") == $rowContent[row].childNodes[column+1].getAttribute("class") && $rowContent[row].childNodes[column].getAttribute("class") != "white"){
					$rowContent[row].childNodes[column].setAttribute("style","border-right-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
					$rowContent[row].childNodes[column+1].setAttribute("style","border-left-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
				}else if($rowContent[row].childNodes[column].getAttribute("class") == $rowContent[row+1].childNodes[column].getAttribute("class") && $rowContent[row].childNodes[column].getAttribute("class") != "white"){
					$rowContent[row].childNodes[column].setAttribute("style","border-bottom-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
					$rowContent[row+1].childNodes[column].setAttribute("style","border-top-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
				}
			}
		}

		//cuadros
		for (var row = 0; row < $y-1; row++) {
			for (var column  = 0; column < $x-1; column++) {
				if($rowContent[row].childNodes[column].getAttribute("class") == $rowContent[row].childNodes[column+1].getAttribute("class") && 
				   $rowContent[row].childNodes[column].getAttribute("class") == $rowContent[row+1].childNodes[column].getAttribute("class") &&
				   $rowContent[row].childNodes[column].getAttribute("class") == $rowContent[row+1].childNodes[column+1].getAttribute("class") &&
				   $rowContent[row].childNodes[column].getAttribute("class") != "white"){
						$rowContent[row].childNodes[column].setAttribute("style","border-right-color:" + $rowContent[row].childNodes[column].getAttribute("class")+ ";border-bottom-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
						$rowContent[row].childNodes[column+1].setAttribute("style","border-left-color:" + $rowContent[row].childNodes[column].getAttribute("class")+ ";border-bottom-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
						$rowContent[row+1].childNodes[column].setAttribute("style","border-right-color:" + $rowContent[row].childNodes[column].getAttribute("class")+ ";border-top-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
						$rowContent[row+1].childNodes[column+1].setAttribute("style","border-left-color:" + $rowContent[row].childNodes[column].getAttribute("class")+ ";border-top-color:" + $rowContent[row].childNodes[column].getAttribute("class"));
				}
			}
		}
	}

	//pinta los cuadros y llama a las otras funciones
	function paint(){

		resetColors();

		$coloredQuantity = percentage( $columnContent.length, parseInt($inputPercentage.value) ); //Cantidad de cuadros coloreados

		console.log("Cantidad de cuadros a pintar: "+$coloredQuantity);	
		
		var tempNumber = 0;
		for (var paint = 0; paint < $coloredQuantity; paint++ ) {
			tempNumber = differentNumbers();//numeros aleatorios de 0 hasta el ultimo cuadro existente
			$coloredSquaresList.push(tempNumber); //guardar la ubicacion de los cuadros pintados
			switch(random(5, 1)) { //numeros aleatorios de 1 al 5
			    case 1:
			        $columnContent[tempNumber].setAttribute("class","red");
			        break;
			    case 2:
			        $columnContent[tempNumber].setAttribute("class","blue");
			        break;
			    case 3:
			        $columnContent[tempNumber].setAttribute("class","yellow");
			        break;
			    case 4:
			        $columnContent[tempNumber].setAttribute("class","black");
			        break;
			    case 5:
			        $columnContent[tempNumber].setAttribute("class","white");
			        break;
			} 
		};
		console.log("Cuadros pintados: " + $coloredSquaresList);	

		deform();

	}
//.....................................................................................................


//Funciones usadas para crear los cuadros
//.....................................................................................................
	
	//limpia las variables usadas y los cuadros generados anteriormente
	function resetSquares(){
		if($columnContent.length > 0){

			console.log("Borrando contenido anterior");		

			$rowContent.forEach(function(element){$mondrian.removeChild(element);});
			$columnContent = [];
			$rowContent = [];
			$coloredSquaresList = [];

			console.log("Contenido anterior borrado exitosamente");	
		}
	}

	//Genera la cantidad de cuadros solicitada
	function fillTable(){

		console.log("Creando cuadros con funcion fillTable");

		var elementSum =0;
		for (var row = 0; row < $y; row++) {
			//console.log("fila "+row);
			$rowContent.push(document.createElement('tr'));
			$mondrian.appendChild($rowContent[row]);
			for (var column = 0; column < $x; column++) {
				//console.log("columna "+(column+elementSum));
				$columnContent.push(document.createElement('td'));
				$rowContent[row].appendChild($columnContent[column+elementSum]);
			};
			elementSum += $x;
		};
	}

	//Obtiene el ancho y alto de la tabla que se usara
	function getMatrixSize(){

		console.log("Boton pulsado, ejecutando funcion getSize");

		resetSquares();

		$x = parseInt($inputX.value);
		$y = parseInt($inputY.value);
		console.log("Ancho: "+ $x);
		console.log("Alto: "+ $y);

		fillTable();
	}
//.....................................................................................................


//Eventos de los elementos de la interfaz
//.....................................................................................................
	$buttonQuantity.addEventListener("click",getMatrixSize);
	$buttonColor.addEventListener("click",paint);
//.....................................................................................................


}