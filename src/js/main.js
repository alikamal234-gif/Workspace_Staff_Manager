const addNewJobBtn = document.getElementById("openinformations")
const informations = document.querySelector(".modal-overlay")
const modalClose = document.querySelector(".modal-close-btn")
const manageJobModalTache = document.getElementById("manage-job-modal-tache")
const modalCloseBtnManageTache = document.getElementById("modal-close-btn-manage-tache")
const btnAdd = document.querySelectorAll(".btnAdd")

addNewJobBtn.addEventListener("click",()=>{
    informations.style.display = "flex"
})
modalClose.addEventListener("click",()=>{
    informations.style.display = "none"
})

btnAdd.forEach(btn => {
    btn.addEventListener("click",()=>{
    manageJobModalTache.style.display = "flex"
})
})
modalCloseBtnManageTache.addEventListener("click",()=>{
    manageJobModalTache.style.display = "none"
})


