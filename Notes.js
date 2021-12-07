var nav = document.querySelector('nav');
var ul = document.querySelector('ul');
var notes_view = document.querySelector('.notes')
    var dots = document.querySelector('.dots');
    var anchor = document.querySelectorAll('a')
async function getNotes() {
  try {
    const response = await axios.get('http://localhost:8000/api/notes');
    
    response.data.forEach(obj =>{
      notes_view.innerHTML += `<div><code>${obj.title}</code>
      <div>${obj.note}</div>
      
      </div>`
    })
    
    
  } catch (error) {
    console.error(error);
  }
}

dots.addEventListener('click', () => {
  nav.classList.toggle('nav_visible')
  ul.classList.toggle('ul_visible')
  anchor.forEach(e => e.classList.toggle('a_visible'))
})
function postNote(){
  axios.post('http://localhost:8000/api/notes',{
    
    
  }).then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}