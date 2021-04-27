// Get the modal
// const modal = document.getElementById("admin-user-edit-modal");
const editModal = document.getElementsByClassName("admin-user-edit-modal");
const deleteModal = document.getElementsByClassName("admin-user-delete-modal");

// Get the button that opens the modal
const editBtn = document.getElementsByClassName("admin-user-edit-modal-btn");
const deleteBtn = document.getElementsByClassName("admin-user-delete-modal-btn");

// Get the <close> element that closes the modal
const closeEditBtn = document.getElementsByClassName("close-modal-edit");
const closeDeleteBtn = document.getElementsByClassName("close-modal-delete");

for (let i=0; i<editBtn.length; i++) {
  editBtn[i].onclick = function() {
    editModal[i].style.display = 'block';
  }
}

for (let i=0; i<deleteBtn.length; i++) {
  deleteBtn[i].onclick = function() {
    deleteModal[i].style.display = 'block';
  }
}

for (let i=0; i<editModal.length; i++) {
  closeEditBtn[i].onclick = function() {
    editModal[i].style.display = 'none';
  }
}

for (let i=0; i<deleteModal.length; i++) {
  closeDeleteBtn[i].onclick = function() {
    deleteModal[i].style.display = 'none';
  }
}
