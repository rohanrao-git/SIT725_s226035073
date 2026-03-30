const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = '<div class="col s4 center-align">'+
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light">'+
      '<img class="activator" src="'+item.image+'">'+
      '</div><div class="card-content">'+
      '<span class="card-title activator grey-text text-darken-4">'+item.cityname+
      '<i class="material-icons right">more_vert</i></span>'+
      '<p>'+item.description+'</p></div>'+
      '<div class="card-reveal">'+
      '<span class="card-title grey-text text-darken-4">'+item.cityname+
      '<i class="material-icons right">close</i></span>'+
      '<p class="card-text">'+item.description+'</p>'+
      '</div></div></div>';
    $("#card-section").append(itemToAppend)
  });
}

const getSkylines = () => {
  $.get('/api/skylines', (response) => {
    console.log('API Response:', response);
    if(response.statusCode == 200) {
      addCards(response.data);
    } else {
      console.log('Error: statusCode is not 200');
    }
  }).fail((error) => {
    console.log('AJAX Error:', error);
  })
}

$(document).ready(function(){
  $('.materialboxed').materialbox();
  getSkylines();
});
