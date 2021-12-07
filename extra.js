var li_active = document.querySelector('.active_li_blank');
var dots = document.querySelector('.dots');
var noteselect = document.querySelector('#noteselect');
dots.addEventListener('click', ()=>{
  li_active.classList.toggle('active_li')
})
noteselect.addEventListener('input',()=>{
  
})
async function LoadEditNote(){
      
          try {
            const response = await axios.get('http://localhost:8000/api/notes');
      
            response.data.forEach(obj => {
              noteselect.innerHTML += `<option value=${obj.id}>${obj.title}</option>`
            })
      
      
          } catch (error) {
            console.error(error);
          }
    }
    let note ;
    

    
    var note_category = document.querySelector('#note_category')
    var message = document.querySelector('.message');
    var notes = []
    var out = document.querySelector('.out');
    var out_text = document.querySelector('.out_textarea');
    var note_title = document.querySelector('#note_title');
    var sizeofPen = document.querySelector('#pen_size');
    
LoadEditNote()
noteselect.addEventListener('input', () => {
     async function GetNote() {
 
       try {
         note = await axios.get(`http://localhost:8000/api/notes/${noteselect.value}/`);
            alert(JSON.stringify(note))
   note_category.value = note.data.category;
  note_title.value = note.data.title;
  out.innerHTML = note.data.note;
  out_text.value = note.data.note;
 
 
 
       } catch (error) {
         alert(error)
       }
     }
GetNote()  
})

async function putNote(data) {

  try {
    const response = await axios({method:'put',
    url:`http://localhost:8000/api/notes/${noteselect.value}/`,headers:{
      'Content-Type':'application/json'
    },
      data:{
        'title':note_title.value,
        'note':out.innerHTML,
        'category':note_category.value
      }
    });

    if (response.status == 200){
      
      message.innerHTML = 'Saved'
      setTimeout(()=>{
        message.innerHTML = ''
      }, 3000)
    }


  } catch (error) {
    alert(error)
  }
}