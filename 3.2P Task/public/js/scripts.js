const cardList = [
{
title: "Dubai",
image: "images/dubai.jpg",
link: "About Dubai",
description: "Known for its modern architecture and luxury shopping"
},
{
title: "Melbourne",
image: "images/melbourne.jpg",
link: "About Melbourne",
description: "Known for its vibrant culture and beautiful harbors"
},
{
title: "New York",
image: "images/nyc.jpg",
link: "About New York",
description: "Known for its bustling streets and iconic landmarks"
}
]
const clickMe = () => {
alert("Thanks for clicking me. Hope you have a nice day!")
}
const addCards = (items) => {
items.forEach(item => {
let itemToAppend = '<div class="col s4 center-align">'+
'<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
'</div><div class="card-content">'+
'<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p>'+item.description+'</p><p><a href="#">'+item.link+'</a></p></div>'+
'<div class="card-reveal">'+

'<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
'<p class="card-text">'+item.description+'</p>'+
'</div></div></div>';
$("#card-section").append(itemToAppend)
});
}
$(document).ready(function(){
$('.materialboxed').materialbox();
$('.modal').modal();
$('#clickMeButton').click(()=>{
    clickMe();
  })
  addCards(cardList);

  // Handle modal form submission
  $('#formSubmit').click((event)=>{
    event.preventDefault();
    const firstName = $('#first_name').val().trim();
    const lastName = $('#last_name').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if (!firstName || !lastName || !email || !password) {
      M.toast({ html: 'Please fill all fields' });
      return;
    }

    M.toast({ html: `Thanks ${firstName}! Form submitted successfully.` });
    $('#modal1').modal('close');
    $('#first_name').val('');
    $('#last_name').val('');
    $('#email').val('');
    $('#password').val('');
  });
});
