  const wrapper = document.querySelector(".wrapper"),
  editableInput = wrapper.querySelector(".editable"),
  readonlyInput = wrapper.querySelector(".readonly"),
  placeholder = wrapper.querySelector(".placeholder"),
  counter = wrapper.querySelector(".counter"),
  button = wrapper.querySelector("button");
  let textArea = document.querySelector('.placeholder');
  
  editableInput.onfocus = ()=>{
    placeholder.style.color = "#c5ccd3";
  }
  editableInput.onblur = ()=>{
    placeholder.style.color = "#98a5b1";
  }
  
  editableInput.onkeyup = (e)=>{
    let element = e.target;
    validated(element);
  }
  editableInput.onkeypress = (e)=>{
    let element = e.target;
    validated(element);
    placeholder.style.display = "none";
  }
  
  function validated(element){
    let text;
    let maxLength = 100;
    let currentlength = element.innerText.length;
  
    if(currentlength <= 0){
      placeholder.style.display = "block";
      counter.style.display = "none";
      button.classList.remove("active");
    }else{
      placeholder.style.display = "none";
      counter.style.display = "block";
      button.classList.add("active");
    }
  
    counter.innerText = maxLength - currentlength;
  
    if(currentlength > maxLength){
      let overText = element.innerText.substr(maxLength);
      overText = `<span class="highlight">${overText}</span>`; 
      text = element.innerText.substr(0, maxLength) + overText; 
      readonlyInput.style.zIndex = "1";
      counter.style.color = "#e0245e";
      button.classList.remove("active");
    }else{
      readonlyInput.style.zIndex = "-1";
      counter.style.color = "#333";
    }
    readonlyInput.innerHTML = text; 
  }


  function createTask(){
    var x = document.getElementById("inprogress");
    var y = document.getElementById("done");
    var z = document.getElementById("create-new-task-block");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "flex";
    }
}


var uid = new ShortUniqueId();
textArea.addEventListener('keydown',function(e){
    let key = e.key;
    if(key === "Enter"){
        if(textArea.value == ""){
            textArea.value = "";
            alert("Please Enter some task!");
            return;
        }
        generateTicket(textArea.value,taskColor); 
        textArea.value = "";
        modal.style.display = 'none'
        addModal = true
    }
})

function generateTicket(task,priority,ticketId){
    let id;
    if(ticketId){ 
        id = ticketId 
    }else{ 
        id = uid.rnd(); 
    }
     
    let ticketCont = document.createElement("div");
    ticketCont.className = "ticket-cont";
    ticketCont.innerHTML = `<div class="ticket-color ${priority}"></div>
                            <div class="ticket-id">#${id}</div>
                            <div class="ticket-area">${task}</div>
                            <div class="lock-unlock"><i class="fa-solid fa-lock"></i></div>`
    console.log(ticketCont)
    mainCont.appendChild(ticketCont);
    if(!ticketId){
        ticketArr.push({id:id,task:task,color:taskColor});
        let stringifiedArr = JSON.stringify(ticketArr);
        localStorage.setItem('tasks',stringifiedArr);
        console.log(ticketArr);
    }

}






