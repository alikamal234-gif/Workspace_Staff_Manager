const addNewJobBtn = document.getElementById("openinformations")
const informations = document.querySelector(".modal-overlay")
const modalClose = document.querySelector(".modal-close-btn")
const manageJobModalTache = document.getElementById("manage-job-modal-tache")
const modalCloseBtnManageTache = document.getElementById("modal-close-btn-manage-tache")
const btnAdd = document.querySelectorAll(".btnAdd")
const saveWorker = document.getElementById("saveWorker")
const placeTache = document.getElementById("placeTache")
const placeExperience = document.getElementById("placeExperience")
const addExperience = document.getElementById("addExperience")
const inputexper = document.querySelectorAll(".inputexper")
const manageAfficheModal = document.getElementById("manage-affiche-modal")
const boxWorkExperiece = document.getElementById("boxWorkExperiece")
const modalCloseBtnAffichage = document.getElementById("modal-close-btn-affichage")
const modalContentTache = document.querySelector(".modal-content-tache")
const FiltrageEmplyer = document.getElementById("FiltrageEmplyer")
const clearAllEmployer = document.getElementById("clearAllEmployer")

//================= les objects de validation rejex =====================================
const validationRegex = [
    {
        id: "name",
        regex: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
        message: "Le nom doit contenir uniquement des lettres (2-50 caractères)"
    },
    {
        id: "photo",
        regex: /^https?:\/\/.+/,
        message: "L'URL de la photo doit être une image valide (png, jpg, jpeg, gif, webp)"
    },
    {
        id: "email",
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Veuillez entrer une adresse email valide"
    },
    {
        id: "phone",
        regex: /^(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        message: "Veuillez entrer un numéro de téléphone valide"
    },
    {
        id: "role",
        regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
        message: "Le rôle doit contenir uniquement des lettres (2-30 caractères)"
    },
    {
        id: "company",
        regex: /^[a-zA-Z0-9À-ÿ\s&.,-]{2,50}$/,
        message: "Le nom de l'entreprise doit être valide (2-50 caractères)"
    },
    {
        id: "roleExperience",
        regex: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
        message: "Le rôle doit contenir uniquement des lettres (2-30 caractères)"
    }
];

// ==============================================================================
let datalist = JSON.parse(localStorage.getItem("Data")) || [];

document.addEventListener("DOMContentLoaded", (event) => {
    clearAllEmployerbtn();
    getData();
    affichageFilter();
    modalClose.addEventListener("click", () => {
    informations.style.display = "none"
    
})
})

// ===================== addevent listiner =========================================
addNewJobBtn.addEventListener("click", () => {
    currentEditIndex = null; // Réinitialiser pour mode ajout
    saveWorker.textContent = "Sauvegarder";
    informations.style.display = "flex";
})



btnAdd.forEach(btn => {
    btn.addEventListener("click", () => {
        manageJobModalTache.style.display = "flex"
    })
})

modalClose.addEventListener("click", () => {
    informations.style.display = "none";
    cancelEdit(); // ← AJOUTER ICI
})

saveWorker.addEventListener("click", handleSaveWorker); // ← CHANGER ICI

document.getElementById("photo").addEventListener("input", () => {
    document.getElementById("imageView").src = document.getElementById("photo").value
})

addExperience.addEventListener("click", (e) => {
    e.preventDefault()
    creatElxperienceItem()
})



// ========================== stocke les dataes dans localeStorage =====================
function SetData() {
    datalist = JSON.parse(localStorage.getItem("Data")) || [];
    
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const photo = document.getElementById("photo").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!formValidation()) {
        return;
    }

    const data = {
        isAsind: false,
        nom: name,
        role: role,
        photo: photo,
        experience: inputexpervalue(),
        email: email,
        phone: phone
    };
    
    datalist.push(data);
    localStorage.setItem("Data", JSON.stringify(datalist));

    getData();
    clearInputs();
}

// ========================== get data from localeStorage et afficher dans le sidebar ==============================
function getData() {
    const data = JSON.parse(localStorage.getItem("Data")) || [];

    if (data.length > 0) {
        console.log("Nombre d'éléments", data.length);
        placeTache.innerHTML = "";

        data.forEach((minidata, index) => {
            placeTache.innerHTML += `
                <div id-coutor="${index}" class="cards w-[95%] h-20 bg-gray-200 border-2 border-gray-200 rounded-2xl flex items-center p-2 gap-2 mb-2 cursor-pointer">
                    <div class="w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden">
                        <img src="${minidata.photo}" alt="${minidata.nom}" class="afficheimg w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h2 class="affichenom font-bold">${minidata.nom}</h2>
                        <p class="textRole text-gray-500">${minidata.role}</p>
                    </div>
                    <div>
                        <button class="editBtn text-yellow-500 font-bold hover:text-yellow-600">Edit</button>
                    </div>
                </div>
            `;
        });

        displaySidbar();
        openAfficheModal();
        attachEditEvents(); // ← AJOUTER ICI
        
    } else {
        placeTache.innerHTML = `
            <div class="text-center p-4 text-gray-500">
                Aucun employé enregistré
            </div>
        `;
    }
}
// ======================= clear all input after click sur save =================================================
// ======================= clear all input after click sur save =================================================
function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("imageView").src = "";
    
    placeExperience.innerHTML = "";
    
    informations.style.display = "none";
    
    // Réinitialiser pour mode ajout
    currentEditIndex = null;
    saveWorker.textContent = "Sauvegarder";
}

function formValidation() {
    const inputs = [
        document.getElementById("name"),
        document.getElementById("role"),
        document.getElementById("photo"),
        document.getElementById("email"),
        document.getElementById("phone")
    ];

    for (let input of inputs) {
        if (!validationRegexInput(input)) {
            return false;
        }
    }
    return true;
}

function validationRegexInput(input) {
    const inputId = input.id;
    for (const valid of validationRegex) {
        if (valid.id === inputId) {
            if (!valid.regex.test(input.value)) {
                input.nextElementSibling.innerHTML = `${valid.message}`
                input.nextElementSibling.style.display = "flex"
                return false;
            }
        }
    }
    if (input.nextElementSibling) {
        input.nextElementSibling.style.display = "none"
    }
    return true;
}

function creatElxperienceItem() {
    placeExperience.innerHTML += `
         <div class="boxInputExperience">
            <div class="boxInput">
                <label for="Company">Company :</label>
                <br>
                <input type="text" class="inputexper" id="company">
                <span class="showError"></span>
            </div>
            <div class="boxInput">
                <label for="Role">Role :</label>
                <br>
                <input type="text" class="inputexper" id="roleExperience">
                <span class="showError"></span>
            </div>
            <div class="boxInput">
                <label for="from">From :</label>
                <br>
                <input type="date" class="inputexper" id="from">
                <span class="showError"></span>
            </div>
            <div class="boxInput">
                <label for="to">To :</label>
                <br>
                <input type="date" class="inputexper" id="to">
                <span class="showError"></span>
            </div>
        </div>
    `;
}

function inputexpervalue() {
    const experienceContainers = document.querySelectorAll(".boxInputExperience");
    const experiences = [];

    experienceContainers.forEach(container => {
        const company = container.querySelector("#company")?.value || "";
        const roleExperience = container.querySelector("#roleExperience")?.value || "";
        const from = container.querySelector("#from")?.value || "";
        const to = container.querySelector("#to")?.value || "";

        if (company || roleExperience || from || to) {
            experiences.push({
                company: company,
                roleExperience: roleExperience,
                from: from,
                to: to
            });
        }
    });

    return experiences;
}

function afficheData(dataaffiche) {
    const affichName = document.getElementById("affichName");
    const afficheImgView = document.getElementById("afficheImgView");
    const AfficheRole = document.getElementById("AfficheRole");
    const AfficheEmail = document.getElementById("AfficheEmail");
    const AffichePhone = document.getElementById("AffichePhone");

    if (affichName) affichName.textContent = dataaffiche.nom;
    if (afficheImgView) afficheImgView.src = dataaffiche.photo;
    if (AfficheRole) AfficheRole.textContent = dataaffiche.role;
    if (AfficheEmail) AfficheEmail.textContent = dataaffiche.email;
    if (AffichePhone) AffichePhone.textContent = dataaffiche.phone;

    boxWorkExperiece.innerHTML = "";

    if (dataaffiche.experience && Array.isArray(dataaffiche.experience)) {
        dataaffiche.experience.forEach((exp) => {
            boxWorkExperiece.innerHTML += `
                <div class="w-full border-2 border-gray-200 p-4 rounded-lg">
                    <h2 class="font-bold mb-5 text-blue-500 text-2xl">${exp.company}</h2>
                    <div class="w-full flex gap-2 rounded-lg">
                        <h3 class="font-bold mb-3">Role :</h3>
                        <p>${exp.roleExperience}</p>
                    </div>
                    <div class="w-full flex gap-2 rounded-lg">
                        <h3 class="font-bold">Period :</h3>
                        <p><span>${exp.from}</span> - <span>${exp.to}</span></p>
                    </div>
                </div>
            `;
        });
    }

    manageAfficheModal.style.display = "flex";
}

function clearAllEmployerbtn(){
    clearAllEmployer.addEventListener("click", () => {
        localStorage.clear();
        datalist = [];
        location.reload();
    });
}

function openAfficheModal() {
    const afficheDataBtn = document.querySelectorAll(".cards");
    const datalist = JSON.parse(localStorage.getItem("Data")) || [];

    afficheDataBtn.forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });

    document.querySelectorAll(".cards").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("id-coutor");
            const btnClicked = datalist[index];
            if (btnClicked) {
                afficheData(btnClicked);
            }
        });
    });
}

// ==================== FONCTIONS DE FILTRAGE ET PLACEMENT ====================
let placedEmployees = [];

function affichageFilter() {
    const roomsRoles = {
        conférence: ["Nettoyage", "Manager", "Other"],
        serveurs: ["Techniciens IT", "Manager", "Nettoyage"],
        sécurité: ["Agents de sécurité", "Manager", "Nettoyage"],
        Réception: ["Réceptionniste", "Nettoyage", "Manager"],
        personnel: ["Nettoyage", "Manager", "Other"],
        archives: ["Manager", "Other"]
    };

    btnAdd.forEach(btn => {
        btn.addEventListener("click", () => {
            const room = btn.getAttribute("name-rooms");
            const allowedRoles = roomsRoles[room];
            
            placedEmployees = placedEmployees.filter(emp => emp.room === room);
            FiltrageEmplyer.innerHTML = "";
            
            if (allowedRoles) {
                filterEmployersRole(allowedRoles, btn);
            }
        });
    });
}

function filterEmployersRole(allowedRoles, btn){
    const data = JSON.parse(localStorage.getItem("Data")) || [];
    FiltrageEmplyer.innerHTML = "";

    data.forEach((minidata, index) => {
        if(minidata.isAsind === false && allowedRoles.includes(minidata.role)){
            FiltrageEmplyer.innerHTML += `
                <div id-coutor="${index}" class="cardsfilter w-[95%] h-20 bg-gray-200 border-2 border-gray-200 rounded-2xl flex items-center p-2 gap-2 mb-2 cursor-pointer">
                    <div class="w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden">
                        <img src="${minidata.photo}" alt="${minidata.nom}" class="afficheimg w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h2 class="affichenom font-bold">${minidata.nom}</h2>
                        <p class="textRole text-gray-500">${minidata.role}</p>
                    </div>
                </div>
            `;
        }
    });

    attachFilterEvents(allowedRoles, btn);
}
function attachFilterEvents(allowedRoles, btn) {
    const cardsfilter = document.querySelectorAll(".cardsfilter");
    const data = JSON.parse(localStorage.getItem("Data")) || [];
    const placedeplacement = btn.parentElement.parentElement.firstElementChild;

    cardsfilter.forEach((card) => {
        card.addEventListener("click", () => {
            const index = card.getAttribute("id-coutor");
            const minidata = data[index];
            
            if (minidata && !minidata.isAsind) {
                minidata.isAsind = true;
                placedeplacement.innerHTML += `
                    <div id-coutor="${index}" class="placed-employee w-30 bg-gray-200 border-2 border-gray-200 rounded-2xl flex flex-col items-center p-2 gap-2 mb-2">
                        <div class="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden">
                            <img src="${minidata.photo}" alt="${minidata.nom}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1">
                            <h2 class="font-bold text-sm">${minidata.nom}</h2>
                            <p class="textRole text-gray-500 text-xs">${minidata.role}</p>
                        </div>
                    </div>
                `;
                
                localStorage.setItem("Data", JSON.stringify(data));
                card.remove(); 
                displaySidbar();
            }else{
                alert("lah ij3el xi baraka")
            }
        });
    });
}

function displaySidbar() {
    const data = JSON.parse(localStorage.getItem("Data")) || [];
    const cards = document.querySelectorAll("#placeTache .cards");
    
    cards.forEach(card => {
        const index = card.getAttribute("id-coutor");
        if (data[index] && data[index].isAsind === true) {
            card.style.display = "none";
        } else {
            card.style.display = "flex";
        }
    });
}

// ==================== FONCTION DE RETOUR DES EMPLOYÉS ====================
function returnAllEmployees() {
    const data = JSON.parse(localStorage.getItem("Data")) || [];
    
    data.forEach(employee => {
        employee.isAsind = false;
    });
    
    localStorage.setItem("Data", JSON.stringify(data));
    
    document.querySelectorAll('[name-rooms]').forEach(btn => {
        const placedeplacement = btn.parentElement.parentElement.firstElementChild;
        if (placedeplacement) {
            placedeplacement.innerHTML = '';
        }
    });
    
    getData();
    
    console.log("Tous les employés sont retournés à leur place initiale");
}

// ==================== FONCTIONS DE MODIFICATION ====================

let currentEditIndex = null;

function openEditForm(index) {
    const data = JSON.parse(localStorage.getItem("Data")) || [];
    const employee = data[index];
    
    if (!employee) return;
    
    currentEditIndex = index;
    
    document.getElementById("name").value = employee.nom || "";
    document.getElementById("role").value = employee.role || "";
    document.getElementById("photo").value = employee.photo || "";
    document.getElementById("email").value = employee.email || "";
    document.getElementById("phone").value = employee.phone || "";
    document.getElementById("imageView").src = employee.photo || "";
    
    placeExperience.innerHTML = "";
    if (employee.experience && Array.isArray(employee.experience)) {
        employee.experience.forEach(exp => {
            placeExperience.innerHTML += `
                <div class="boxInputExperience">
                    <div class="boxInput">
                        <label for="Company">Company :</label>
                        <br>
                        <input type="text" class="inputexper" id="company" value="${exp.company || ""}">
                        <span class="showError"></span>
                    </div>
                    <div class="boxInput">
                        <label for="Role">Role :</label>
                        <br>
                        <input type="text" class="inputexper" id="roleExperience" value="${exp.roleExperience || ""}">
                        <span class="showError"></span>
                    </div>
                    <div class="boxInput">
                        <label for="from">From :</label>
                        <br>
                        <input type="date" class="inputexper" id="from" value="${exp.from || ""}">
                        <span class="showError"></span>
                    </div>
                    <div class="boxInput">
                        <label for="to">To :</label>
                        <br>
                        <input type="date" class="inputexper" id="to" value="${exp.to || ""}">
                        <span class="showError"></span>
                    </div>
                </div>
            `;
        });
    }
    
    informations.style.display = "flex";
    
    saveWorker.textContent = "Modifier";
}

function updateEmployee() {
    if (currentEditIndex === null) return;
    
    const data = JSON.parse(localStorage.getItem("Data")) || [];
    
    if (!data[currentEditIndex]) {
        alert("Employé non trouvé!");
        return;
    }
    
    if (!formValidation()) {
        return;
    }
    
    data[currentEditIndex] = {
        isAsind: data[currentEditIndex].isAsind, 
        nom: document.getElementById("name").value,
        role: document.getElementById("role").value,
        photo: document.getElementById("photo").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        experience: inputexpervalue()
    };
    
    localStorage.setItem("Data", JSON.stringify(data));
    
    getData();
    
    cancelEdit();
    
    alert("Employé modifié avec succès!");
}

function cancelEdit() {
    currentEditIndex = null;
    clearInputs();
}

function attachEditEvents() {
    const editButtons = document.querySelectorAll(".editBtn");
    
    editButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            
            const card = btn.closest(".cards");
            const index = card.getAttribute("id-coutor");
            
            openEditForm(parseInt(index));
        });
    });
}

function handleSaveWorker(e) {
    e.preventDefault();
    
    if (currentEditIndex !== null) {
        updateEmployee();
    } else {
        SetData();
    }
}