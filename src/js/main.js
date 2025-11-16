const addNewJobBtn = document.getElementById("openinformations")
const informations = document.querySelector(".modal-overlay")
const modalClose = document.querySelector(".modal-close-btn")
const manageJobModalTache = document.getElementById("manage-job-modal-tache")
const modalCloseBtnManageTache = document.getElementById("modal-close-btn-manage-tache")
const btnAdd = document.querySelectorAll(".btnAdd")
const saveWorker = document.getElementById("saveWorker")
const placeTache = document.getElementById("placeTache")

const validationRegex = [
    {
        id : "name",
        regex: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
        message: "Le nom doit contenir uniquement des lettres (2-50 caractères)"
    },
    {
        id : "photo",
        regex: /^https?:\/\/.+/,
        message: "L'URL de la photo doit être une image valide (png, jpg, jpeg, gif, webp)"
    },
    {
        id : "email",
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Veuillez entrer une adresse email valide"
    },
    {
        id : "phone",
        regex: /^(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        message: "Veuillez entrer un numéro de téléphone valide"
    },
    {
        id : "role",
        regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
        message: "Le rôle doit contenir uniquement des lettres (2-30 caractères)"
    },
    {
        id : "company",
        regex: /^[a-zA-Z0-9À-ÿ\s&.,-]{2,50}$/,
        message: "Le nom de l'entreprise doit être valide (2-50 caractères)"
    },
    {
        id : "roleExperience",
        regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
        message: "Le rôle doit contenir uniquement des lettres (2-30 caractères)"
    }
];


// les données delocalStorage
let datalist = JSON.parse(localStorage.getItem("Data")) || [];

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
 
const name = document.getElementById("name").value;
const role = document.getElementById("role").value;
const photo = document.getElementById("photo").value;
const company = document.getElementById("company").value;
const roleExperience = document.getElementById("roleExperience").value;
const from = document.getElementById("from").value;
const to = document.getElementById("to").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;


if(!formValidation()){
        
        return;
    }
const data = {
    nom: name,
    role: role,
    photo: photo,
    experience: {
        company: company,
        roleExperience: roleExperience,
        from: from,
        to: to,
    },
    email: email,
    phone: phone
};
    
    datalist.push(data);
    localStorage.setItem("Data", JSON.stringify(datalist));
    getData();
    clearInputs();
}

function getData() {
    const data = JSON.parse(localStorage.getItem("Data")) || [];
    
    

    if (data.length > 0) {
        console.log("Nombre d'éléments", data.length);
        
        
        placeTache.innerHTML = "";
        
        
        data.forEach(minidata => {
            placeTache.innerHTML += `
                <div class="w-[95%] h-20 bg-gray-200 border-2 border-gray-200 rounded-2xl flex items-center p-2 gap-2 mb-2">
                    <div class="w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden">
                        <img src="${minidata.photo}" alt="${minidata.nom}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h2 class="font-bold">${minidata.nom}</h2>
                        <p class="text-gray-500">${minidata.role}</p>
                    </div>
                    <div>
                        <button class="text-yellow-500 font-bold hover:text-yellow-600">Edit</button>
                    </div>
                </div>
            `;
        });
    } else {
        placeTache.innerHTML = `
            <div class="text-center p-4 text-gray-500">
                Aucun employé enregistré
            </div>
        `;
    }
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("company").value = "";
    document.getElementById("roleExperience").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    
    document.getElementById("imageView").src = "";
}

getData();

function formValidation(){
    const inputs = [
        document.getElementById("name"),
        document.getElementById("role"),
        document.getElementById("photo"),
        document.getElementById("company"),
        document.getElementById("roleExperience"),
        document.getElementById("email"),
        document.getElementById("phone")
    ];
    
    for(let input of inputs) {
        
        if(!validationRegexInput(input)){
            return false;
        }
    }
    return true;
}


function validationRegexInput(input){

    const inputId = input.id;
    for(const valid of validationRegex){
        if(valid.id === inputId){
            if(!valid.regex.test(input.value)){
                input.nextElementSibling.innerHTML = `${valid.message}`
                input.nextElementSibling.style.display = "flex"
                return false;
            }
        }
    }
    if(input.nextElementSibling){
        input.nextElementSibling.style.display = "none"
    }
    return true;
}