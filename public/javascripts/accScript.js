const addEventListeners = (array, mode)=>{
  for (let i=0; i<array.length; i++){
    array[i].addEventListener('click', () => {
      if (mode === 'accordion'){
        array[i].classList.toggle('accordion-active')
        const panel = array[i].nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      } else if (mode === 'user-show-edit-modal'){
        userEditModalArray[i].style.display = 'block';
      } else if (mode === 'user-show-delete-modal'){
        userDeleteModalArray[i].style.display = 'block';
      } else if (mode === 'user-hide-edit-modal'){
        userEditModalArray[i].style.display = 'none'
      } else if (mode === 'user-hide-delete-modal'){
        userDeleteModalArray[i].style.display = 'none'
      } else if (mode === 'alloy-show-edit-modal'){
        alloyEditModalArray[i].style.display = 'block';
      } else if (mode === 'alloy-show-delete-modal'){
        alloyDeleteModalArray[i].style.display = 'block';
      } else if (mode === 'alloy-hide-edit-modal'){
        alloyEditModalArray[i].style.display = 'none'
      } else if (mode === 'alloy-hide-delete-modal'){
        alloyDeleteModalArray[i].style.display = 'none'
      } else if (mode === 'alloy-add-component-form'){
        alloyFormInputDiv.innerHTML += `<input type="text" name="components" placeholder="Component name"></input>`
        const panel = document.querySelectorAll('.accordion-panel')[1];
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else if (mode === 'alloy-add-component-edit-modal'){
        alloyEditModalInputArray[i].innerHTML += `<input type="text" name="components" placeholder="Component name"></input>`
        alloyEditModalArray[i].style.maxHeight = alloyEditModalArray[i].scrollHeight + 'px';
      }
    })
  }
}

// Accordion buttons events //
const accBtnArray = document.querySelectorAll('.accordion-btn');
addEventListeners(accBtnArray, 'accordion')

// User table events //
const userEditTdBtnArray = document.querySelectorAll('.event-ap-users-edit-btn')
const userDeleteTdBtnArray = document.querySelectorAll('.event-ap-users-delete-btn')
const userEditModalArray = document.querySelectorAll('.event-ap-users-edit-modal')
const userDeleteModalArray = document.querySelectorAll('.event-ap-users-delete-modal')
addEventListeners(userEditTdBtnArray, 'user-show-edit-modal')
addEventListeners(userDeleteTdBtnArray, 'user-show-delete-modal')

// User modal events //
const closeUserEditModalBtnArray = document.querySelectorAll('.event-users-close-edit-modal-btn')
const closeUserDeleteModalBtnArray = document.querySelectorAll('.event-users-close-delete-modal-btn')
addEventListeners(closeUserEditModalBtnArray, 'user-hide-edit-modal')
addEventListeners(closeUserDeleteModalBtnArray, 'user-hide-delete-modal')

// Alloy table events //
const alloyEditTdBtnArray = document.querySelectorAll('.event-ap-alloys-edit-btn')
const alloyDeleteTdBtnArray = document.querySelectorAll('.event-ap-alloys-delete-btn')
const alloyEditModalArray = document.querySelectorAll('.event-ap-alloys-edit-modal')
const alloyDeleteModalArray = document.querySelectorAll('.event-ap-alloys-delete-modal')
addEventListeners(alloyEditTdBtnArray, 'alloy-show-edit-modal')
addEventListeners(alloyDeleteTdBtnArray, 'alloy-show-delete-modal')

// Alloy modal events //
const closeAlloyEditModalBtnArray = document.querySelectorAll('.event-alloys-close-edit-modal-btn')
const closeAlloyDeleteModalBtnArray = document.querySelectorAll('.event-alloys-close-delete-modal-btn')
const alloyEditModalAddComponentBtnArray = document.querySelectorAll('.event-ap-alloys-edit-modal-add-component-btn')
const alloyEditModalInputArray = document.querySelectorAll('.event-alloys-edit-modal-input')
addEventListeners(closeAlloyEditModalBtnArray, 'alloy-hide-edit-modal')
addEventListeners(closeAlloyDeleteModalBtnArray, 'alloy-hide-delete-modal')
addEventListeners(alloyEditModalAddComponentBtnArray, 'alloy-add-component-edit-modal')

// Alloy form events//
const alloyAddComponentFormBtn = [document.querySelector('#event-ap-alloys-add-component-form-btn')]
const alloyFormInputDiv = document.querySelector('#ap-alloys-form-input-div')
addEventListeners(alloyAddComponentFormBtn, 'alloy-add-component-form')