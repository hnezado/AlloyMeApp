const addListenersToAccordion = (array, mode)=>{
  for (let i=0; i<array.length; i++){
    array[i].addEventListener("click", function(){
      if (mode === 'accordion'){
        this.classList.toggle("active")
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    })
  }
}

const acc = document.getElementsByClassName("accordion");
addListenersToAccordion(acc, 'accordion')

// const editUserBtnArray = document.getElementsByClassName("admin-user-edit")
// addListenersToAccordion(editUserBtnArray, 'editButton')
