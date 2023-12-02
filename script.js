const botonBuscar = document.getElementById('buscar');
  const inputIngrediente = document.getElementById('ingredient');
  const resultadoSpan = document.getElementById('spandos');
  const imageRecipe = document.getElementById('imageRecipe');
  const primerIngrediente = document.getElementById('ing');
  const segundoIngrediente = document.getElementById("ing2");
  const tercerIngrediente = document.getElementById("ing3");
  const cuartoIngrediente = document.getElementById("ing4");
  //event listener al botón para el evento 'click'
  botonBuscar.addEventListener('click', handleClick);


  async function getData(ingrediente) {
    try {
      //URL con el ingrediente proporcionado
      const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingrediente}&app_id=98a6c836&app_key=912d0970d45618eb92fd3106197cbc99`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error de red - código ${response.status}`);
      }

      const data = await response.json();
      const result = data.hits;

      // se accede al primer valor, luego a 'recipe', y finalmente a 'label'
      const primerResultado = result[0].recipe.label;
      const imageUrl = result[0].recipe.image;
      const ingredients = result[0].recipe.ingredientLines[0];
      const ingredientsdos = result[0].recipe.ingredientLines[1]
      const ingredienttres = result[0].recipe.ingredientLines[2]
      const ingredientecuatro = result[0].recipe.ingredientLines[3]

      // se inyecta el resultado en el span
      resultadoSpan.innerHTML = primerResultado;
      imageRecipe.src = imageUrl;
      primerIngrediente.innerHTML = ingredients;
      segundoIngrediente.innerHTML = ingredientsdos;
      tercerIngrediente.innerHTML = ingredienttres;
      cuartoIngrediente.innerHTML = ingredientecuatro;

      console.log('Respuesta de la API:', result);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  function handleClick() {
    //valor del input
    const ingredienteABuscar = inputIngrediente.value;

    // Llama a la función getData() con el ingrediente proporcionado
    getData(ingredienteABuscar);
  }