 

 const canvas=document.getElementById('canvas')
 const ctx=canvas.getContext('2d')
 let l=canvas.width;
 let h=canvas.height;

 
 // fetcher function
async function fetcher(callback){  
    var random=Math.random()*1000;
    const url="https://api.themoviedb.org/3/movie/" +random + "?api_key=c967154cfd0854ae53b2834793f6fc00"; 
    fetch(url).then(function(response){
        response.json().then(function(data){
            if(data.status_code ){
                  fetcher(callback)
            }
            else if(!checker(data.original_title)){
                  fetcher(callback)
            }
            else{ 
               // console.log(data.title)
                localStorage.setItem("title",data.original_title)
                localStorage.setItem("overview",data.overview)
                callback()
            } 
        })
    }) 
}


window.onload =  function(){
    fetcher(function(){
        workspace_setter(localStorage.getItem('title'))
        //console.log(localStorage.getItem('title'))
    }) 
 
    //   setTimeout(function(){
    //     workspace_setter(localStorage.getItem('title'))
    //     console.log(localStorage.getItem('title'))
    // },1000)
    

}; 
 
 
 


function checker(string){
    for(var i=0;i<string.length;i++){
        var x=string.charCodeAt(i);
        if(x>=65&&x<=90 || x>=97&&x<=122 ||x==32){continue;}
        else{
            return false;
        } 
    }
    return true;
}
 


var lines=[
    [l/10,9*h/10,9*l/10,9*h/10],
    [4*l/10,h/10,4*l/10,9*h/10],
    [4*l/10,h/10,6*l/10,h/10],
    [l/10,9*h/10,9*l/10,9*h/10],
    [.6*l,.44*h ,.6*l,.65*h ],
    [.6*l,.65*h,.7*l ,.75*h ],
    [.6*l,.65*h,.5*l , .75*h],
    [.6*l,.44*h,.7*l ,.54*h ],
    [.6*l,.44*h,.5*l ,.54*h ],
    [6*l/10,h/10,6*l/10,.24*h ]
]
 

 function draw(index){
     if(index===3){
        
        ctx.moveTo(6*l/10,2*h/10)
        ctx.beginPath()
        ctx.arc(.6*l,.34*h,h/10,0,Math.PI*2,false)
        
        ctx.lineWidth=5;
        ctx.strokeStyle='white'
        ctx.stroke()
        return;

     }
     ctx.beginPath()
     ctx.moveTo(lines[index][0],lines[index][1])
     ctx.lineTo(lines[index][2],lines[index][3])
     ctx.lineWidth=5;
     ctx.strokeStyle='white'
     ctx.stroke()
 } 
 
  

 function workspace_setter(title){
     var s="";
      
     for(var i=0;i<title.length;i++){
         if(title[i]==' '){s+= '\xa0\xa0' ;}
         else{s+="_ "}
     }
    var work= document.getElementById('work'); 
    work.textContent=s;
  }





  var drawn=0;
  function button_sensor(index){
    const button=document.querySelectorAll('.button') 
    button[index].setAttribute('disabled','disabled')
    var title= localStorage.getItem('title').toUpperCase() 
    var work=  document.getElementById('work').textContent ;
   
  var match = 0;
      for(var i=0;i<title.length;i++){ 
         
            if(index+65 == title.charCodeAt(i)){
                match++;
                work = setCharAt( work , 2*i, title.charAt(i));
                 document.getElementById('work').textContent =work;
            } 
             
     }
     var lives_left = document.getElementById('lives_left') 
    

    if(match==0){
        var lives_left = document.getElementById('lives_left')
        lives_left.textContent=parseInt(lives_left.textContent)-1;
        draw(drawn)
        drawn++
    }
    if(parseInt(lives_left.textContent)==0){
        document.getElementById('result').textContent="YOU LOST" 
         setTimeout( function(){
            alert('YOU LOST')
            location.reload()
        }, 1000);
        
     }
     
  }

  // function to replace the characters in work
  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
  
const hint_button = document.getElementById('hint_button') 
 hint_button.addEventListener('click',function(){
    var hint_text = document.getElementById('hint_text')
     hint_text.textContent=localStorage.getItem('overview')
 })

 
