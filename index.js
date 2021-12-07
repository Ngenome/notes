    var colors=document.querySelector('#color-select');
    var bgcolor=document.querySelector('#bgcolor-select');
    var font=document.querySelector('#font-select');
       var fontval=document.querySelector('.fontval');
    var headingval=document.querySelector('.headingval');
 
    var li_active = document.querySelector('.active_li_blank');
    //var dots = document.querySelector('.dots');
   // var noteselect = document.querySelector('#noteselect');
    
    var dots = document.querySelector('.dots');
    var alldots = document.querySelectorAll('.dot')
    var anchor = document.querySelectorAll('a');
    var nav = document.querySelector('nav');
    var ul = document.querySelector('ul');
    
    var can1 = new handwriting.Canvas(document.getElementById("can"));
  var SizeOfFont= document.querySelector('#fontSize');
   var  canvas = document.querySelector('#can');
   
    var note_category = document.querySelector('#note_category')
    var message = document.querySelector('.message');
    var notes = []
    var out = document.querySelector('.out');
    var out_text = document.querySelector('.out_textarea');
    var note_title= document.querySelector('#note_title');
    var sizeofPen = document.querySelector('#pen_size');
    can1.setLineWidth(sizeofPen.value);
    SizeOfFont.addEventListener('input', ()=>{
      out.style['font-size'] =`${SizeOfFont.value}px`
      
    })
    dots.addEventListener('click', ()=>{
      nav.classList.toggle('nav_visible')
      ul.classList.toggle('ul_visible')
      alldots.forEach(adot=>adot.classList.toggle('dot_after'));
      anchor.forEach(e=>e.classList.toggle('a_visible'))
    })
    dots.addEventListener('click', () => {
      li_active.classList.toggle('active_li')
    })
    sizeofPen.addEventListener('input', ()=>{
      console.log(sizeofPen.value);
      can1.setLineWidth(sizeofPen.value);

      
    })
    
  function recog(){
    can1.recognize()
    can1.erase()
  }

        //Set callback function
    can1.setCallBack(function(data, err) {
        if(err) {
          alert( err);
        message.innerHTML = err
          
        }
        else {
          
            output_data= `${data}` ;
            x = output_data.replaceAll('nstit', '<h2>')
           y = x.replaceAll('enstit', '</h2>').replaceAll('xcde', '<code>').replaceAll('xecde', '</code>').replaceAll('xspan', '<span>').replaceAll('xespan', '</span>').replaceAll('xthree', '<h3>').replaceAll('xethree', '</h3>').replaceAll('xSpan', '<span>').replaceAll('xws', '<pre>').replaceAll('xews', '</pre>').replaceAll('xbr', '<br/>').replaceAll('xrl', '<hr/>').replaceAll('xsp', ' ').replaceAll('xpr','<p>').replaceAll('xepr','</p>'); 
            
            out.innerHTML += y
            
        }
    });
    
  
    //Set line width shown on the canvas element (default: 3)
    
    //Set options
    can1.setOptions(
        {
            language: "en",
            numOfReturn: 1,
            width : window.innerWidth, 
            height:window.innerHeight/3,
        }
    );

    //recognize captured trace
    can1.set_Undo_Redo(true, false);

    //turn on both functionalities
    can1.set_Undo_Redo(true, true);
	 function undo(){
	   can1.undo();
    //set canvas and stored trace to the last state (stroke)

    
    
	 }
	 function redo(){
	   
    can1.redo();
    
    
    
	 }
    //Clear canvas, captured trace, and stored steps
    function clearit(){
      
      can1.erase()
      
    }
    function postNote() {
      axios( {method:'POST',url:'http://localhost:8000/api/notes/',data: {
    'title':note_title.value,
  
    'note':out.innerHTML,
    'category':note_category.value,
    
        },headers:{
          'Content-Type':'application/json'
        },

      }).then(function(response) {
          message.innerHTML = JSON.stringify(response.status)
        })
        .catch(function(error) {
          message.innerHTML = error
        });
    }
  // setInterval(function checkReplaceAllTags() {
      
     
  //   kwds = ['nstit','enstit','xcde','xecde','xspan', 'xespan','xthree','xethree','xrl','xws','xews','xpr','xepr','xbr']
  //   kwds.forEach(kwd=>{ 
  //     if (out.innerHTML.includes(kwd)){
  //       e = out.innerHTML.replaceAll('xpr', '<p> ')
  //   g = e.replaceAll('enstit', '</h2>').replaceAll('xcde', '<code>').replaceAll('xecde', '</code>').replaceAll('xspan', '<span>').replaceAll('xespan', '</span>').replaceAll('xthree', '<h3>').replaceAll('xethree', '</h3>').replaceAll('xSpan', '<span>').replaceAll('xws', '<pre>').replaceAll('xews', '</pre>').replaceAll('xbr', '<br/>').replaceAll('xrl', '<hr/>').replaceAll('xsp', ' ').replaceAll('xpr', '<p>').replaceAll('xepr', '</p>');
     
  //   out.innerHTML= ''
  //   out.innerHTML+= g;
  //   outlen = out.innerHTML.length
  //   out.setSelectionRange(outlen, outlen);
     
  //     }
  //   })
     
   
  // },1000)
   // setTimeout(()=>{
     // alert(out.innerHTML.length);
//    },5000)
colors.addEventListener('input',()=>{
  alert(colors.value);
})
function execChangeFont(){
  
  document.execCommand('fontName',true,font.value)
}
function execChangeColor(){
  
  document.execCommand('foreColor',true,colors.value)
}
function setBackgroundColor(){
  
  document.execCommand('backColor',true,bgcolor.value)
}
function boldenText(){
  
  document.execCommand('bold',true)
}
function execIncFont() {

  document.execCommand('increaseFontSize', true)
}
function IncFont() {

  document.execCommand('fontSize', true, fontval.value)
}
function execHeading() {

  document.execCommand('heading', true,` H${headingval.value }`)
}

function Italicize(){
  document.execCommand('italic', true)
}
function Underline(){
  document.execCommand('underline', true)
}
function alertSelection(e){
  alert(e)
}