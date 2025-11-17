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

let countourId = 0;
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

document.addEventListener("DOMContentLoaded", (event) => {
    getData();
    // openAfficheModal()

})
// les données delocalStorage
let datalist = JSON.parse(localStorage.getItem("Data")) || [];
console.log(datalist);

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
addExperience.addEventListener("click", (e) => {
    e.preventDefault()
    creatElxperienceItem()

})

function SetData() {
    // debugger;
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const photo = document.getElementById("photo").value;
    // const minicompany = document.getElementById("company").value;
    // const miniroleExperience = document.getElementById("roleExperience").value;
    // const minifrom = document.getElementById("from").value;
    // const minito = document.getElementById("to").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;


    if (!formValidation()) {

        return;
    }
    console.log(inputexpervalue());

    const data = {
        nom: name,
        role: role,
        photo: photo,
        experience: inputexpervalue(),
        email: email,
        phone: phone
    };
    console.log(data);
    datalist.push(data);
    localStorage.setItem("Data", JSON.stringify(datalist));

    getData();

    clearInputs();
}

function getData() {
    const data = JSON.parse(localStorage.getItem("Data")) || [];



    if (data.length > 0) {
        console.log("Nombre d'éléments", data.length);

        console.log("hello")
        placeTache.innerHTML = "";


        data.forEach((minidata, index, array) => {
            placeTache.innerHTML += `
                <div id-coutor="${index}" class="cards w-[95%] h-20 bg-gray-200 border-2 border-gray-200 rounded-2xl flex items-center p-2 gap-2 mb-2">
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
            countourId++;
            openAfficheModal()
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

// getData();

function formValidation() {
    const inputs = [
        document.getElementById("name"),
        document.getElementById("role"),
        document.getElementById("photo"),
        document.getElementById("company"),
        document.getElementById("roleExperience"),
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
                            <input type="text" class ="inputexper" id="company">
                            <span class="showError"></span></span>
                        </div>

                        <div class="boxInput">
                            <label for="Role">Role :</label>
                            <br>
                            <input type="text" class ="inputexper" id="roleExperience">
                            <span class="showError"></span></span>
                        </div>

                        <div class="boxInput">
                            <label for="from">From :</label>
                            <br>
                            <input type="date" class ="inputexper" id="from">
                            <span class="showError"></span></span>
                        </div>

                        <div class="boxInput">
                            <label for="to">To :</label>
                            <br>
                            <input type="date" class ="inputexper" id="to">
                            <span class="showError"></span></span>
                        </div>


                    </div>
                    
    `;


}
function inputexpervalue() {
    // debugger;
    const inputexper = document.querySelectorAll(".inputexper");
    console.log(`Number of experience inputs: ${inputexper.length}`);

    const experienceContainers = document.querySelectorAll(".boxInputExperience");
    const experiences = [];



    experienceContainers.forEach(container => {
        const company = container.querySelector("#company")?.value || "";
        const roleExperience = container.querySelector("#roleExperience")?.value || "";
        const from = container.querySelector("#from")?.value || "";
        const to = container.querySelector("#to")?.value || "";

        // const companyOrigin = container.querySelector(".companyOrigin")?.value || "";
        // const roleOrigin = container.querySelector(".roleOrigin")?.value || "";
        // const fromOrigin = container.querySelector(".fromOrigin")?.value || "";
        // const toOrigin = container.querySelector(".toOrigin")?.value || "";

        if (company || roleExperience || from || to) {

            experiences.push({
                company: company,
                roleExperience: roleExperience,
                from: from,
                to: to
            });
        }
    });

    console.log("Experiences:", experiences);
    console.log(datalist[datalist.length - 1])

    // // Add experiences to the last worker in datalist
    // if (datalist.length > 0 && experiences.length > 0) {
    //     // datalist[datalist.length].experience.push(experiences) ;
    //     // localStorage.setItem("Data", JSON.stringify(datalist));
    //     SetData(experiences)
    // }
    return experiences;
}

function afficheData(dataaffiche) {

    const data = JSON.parse(localStorage.getItem("Data")) || [];
    const affichName = document.getElementById("affichName").textContent = `${dataaffiche.nom}`
    const afficheImgView = document.getElementById("afficheImgView").src = `${dataaffiche.photo}`
    const AfficheRole = document.getElementById("AfficheRole").textContent = `${dataaffiche.role}`
    const AfficheEmail = document.getElementById("AfficheEmail").textContent = `${dataaffiche.email}`
    const AffichePhone = document.getElementById("AffichePhone").textContent = `${dataaffiche.phone}`
    const AfficheLocation = document.getElementById("AfficheLocation").textContent = `${dataaffiche.location}`

    dataaffiche.experience.forEach((exp) => {
        boxWorkExperiece.innerHTML += `
            <div class="w-full border-2 border-gray-200 p-4 rounded-lg">
                                <h2 class="font-bold mb-5 text-blue-500 text-2xl" id="AfficheCompany">${exp.company}</h2>
                                <div class="w-full flex gap-2 rounded-lg">
                                    <h3 class="font-bold mb-3">Role :</h3>
                                    <p id="AfficheRoleExper">${exp.roleExperience}</p>
                                </div>
                                <div class="w-full flex gap-2 rounded-lg">
                                    <h3 class="font-bold">Period :</h3>
                                    <p ><span id="AfficheFrom">${exp.from}</span>  - <span id="AfficheTo">${exp.to}</span> </p>
                                </div>
                            </div>
        `

    });
    manageAfficheModal.style.display = "flex"
    modalCloseBtnAffichage.addEventListener("click", () => {
        manageAfficheModal.style.display = "none"
        boxWorkExperiece.innerHTML = ""
    });
}
function openAfficheModal() {
    const afficheDataBtn = document.querySelectorAll(".cards");

    let datalist = JSON.parse(localStorage.getItem("Data")) || [];

    afficheDataBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const btnClicked = datalist[btn.getAttribute("id-coutor")]
            console.log(btnClicked);
            afficheData(btnClicked)
            
        })
    })

}

// localStorage.removeItem("Data")

