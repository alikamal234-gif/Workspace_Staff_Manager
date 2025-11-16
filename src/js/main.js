const addNewJobBtn = document.getElementById("openinformations")
const informations = document.querySelector(".modal-overlay")
const modalClose = document.querySelector(".modal-close-btn")
const manageJobModalTache = document.getElementById("manage-job-modal-tache")
const modalCloseBtnManageTache = document.getElementById("modal-close-btn-manage-tache")
const btnAdd = document.querySelectorAll(".btnAdd")
const saveWorker = document.getElementById("saveWorker")
const placeTache = document.getElementById("placeTache")

addNewJobBtn.addEventListener("click", () => {
    informations.style.display = "flex"
})
modalClose.addEventListener("click", () => {
    informations.style.display = "none"
})

btnAdd.forEach(btn => {
    btn.addEventListener("click", () => {
        manageJobModalTache.style.display = "flex"
    })
})
modalCloseBtnManageTache.addEventListener("click", () => {
    manageJobModalTache.style.display = "none"
})
saveWorker.addEventListener("click", (e) => {
    e.preventDefault()
    SetData()
})
document.getElementById("photo").addEventListener("input", () => {
    document.getElementById("imageView").src = document.getElementById("photo").value
})
function SetData() {

    const data = {
        nom: document.getElementById("name").value,
        role: document.getElementById("role").value,
        photo: document.getElementById("photo").value,
        experience: {
            company: document.getElementById("company").value,
            roleExperience: document.getElementById("roleExperience").value,
            from: document.getElementById("from").value,
            to: document.getElementById("to").value,
        },
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    }
    console.log(data)
    localStorage.setItem("Data", JSON.stringify(data))
    getData()
    clearInputs()
}
function getData() {
    const data = JSON.parse(localStorage.getItem("Data")) || [];

    placeTache.innerHTML += `
         <div class="w-[95%] h-20 bg-gray-200 border-2 border-gray-200 rounded-2xl flex items-center p-2 gap-2 ">
                <div class="w-15 h-15  rounded-full " style="border: 2px solid rgb(0, 166, 255);">
                    <img src="${data.photo}" alt="" class="w-full h-full rounded-full">
                </div>
                <div class="grow-1">
                    <h2 class="font-bold">${data.nom}</h2>
                    <p class="text-gray-500">${data.role}</p>
                </div>
                <div>
                    <h2 class="text-yellow-500 font-bold">Edit</h2>
                </div>

            </div>
    `
}
function clearInputs() {
     document.getElementById("name").value =""
     document.getElementById("role").value = ""
     document.getElementById("photo").value =""
     document.getElementById("company").value = ""
     document.getElementById("roleExperience").value = ""
     document.getElementById("from").value = ""
     document.getElementById("to").value = ""
     document.getElementById("email").value = ""
     document.getElementById("phone").value = ""
}