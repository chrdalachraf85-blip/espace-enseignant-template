import { groupes, eleves } from "./data.js"

const listeEleves = document.querySelector("#liste-eleves")
const compteur = document.querySelector("#compteur")

function creerLigne(eleve){
    const li = document.createElement("li")
    const div1 = document.createElement("div")
    const buttonSpam = document.createElement("button")
    const spanshortname = document.createElement("span")
    const spanholder = document.createElement("span")
    const spanNom = document.createElement("span")
    const spanAbsence = document.createElement("span")
    const spanMoyenne = document.createElement("span")
    spanMoyenne.id ="moyenne"
    const badgeParents = document.createElement("span")
    const div2 = document.createElement("div")
    const buttonAbsence = document.createElement("button")
    const label = document.createElement("label")
    const input = document.createElement("input") 
    const buttonadd = document.createElement("button") 
    const p = document.createElement("p")
    p.id = "error-note"

    li.dataset.id = eleve.id
    buttonSpam.type = "button"
    buttonadd.type= "button"
    buttonadd.textContent = "Ajouter la note"
    buttonAbsence.type = "button"
    input.type = "number"
    input.placeholder = "Note"
    input.min = 0
    input.max = 20
    input.step = 0.25

    li.className = "rounded-2xl border border-line bg-card p-3"
    div1.className = "flex flex-col gap-3 lg:flex-row lg:items-center"
    spanholder.className = "min-w-0 flex-1"
    buttonSpam.className = "btn-fiche flex min-h-11 flex-1 items-center gap-3 text-left"
    spanshortname.className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand"
    spanNom.className = "block truncate font-medium"
    spanAbsence.className = "block text-sm text-muted"
    spanAbsence.dataset.role = "absences"
    spanshortname.dataset.role = "initials"
    badgeParents.className = "hidden badge ml-1 whitespace-nowrap rounded-full bg-alert px-2 py-0.5 text-xs font-medium text-white"
    badgeParents.dataset.role = "badge-parents"
    badgeParents.textContent = "Prévenir les parents"
    spanMoyenne.className = "font-serif text-xl"
    div2.className = "flex gap-2"
    buttonAbsence.className = "btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper"
    p.className = "message mt-2 text-xs text-alert hidden"
    label.classList.add("flex-1")
    p.textContent ="note doit être un nombre entre 0 et 20."

    input.className = "h-11 w-full rounded-full border border-line bg-paper px-4 text-sm lg:w-24"
    buttonadd.className = "btn-note h-11 rounded-full bg-ink px-3 sm:px-4 text-sm font-medium text-white hover:bg-brand"
    let moyenne;
    if(eleve.notes.length > 0){
        const sum = eleve.notes.reduce((total, note) => total + note, 0)
        moyenne = (sum / eleve.notes.length).toFixed(2)
        moyenne += " / 20"
    }else{
        moyenne = "—";
    }
   
    if(eleve.absences >= 3){
        li.classList.add ("alerte")
        spanshortname.classList.remove ("bg-brand-soft" ,"text-brand")
        spanshortname.classList.add ("bg-alert" ,"text-white")
        badgeParents.classList.remove("hidden")
    }
    


    const abrname = eleve.prenom[0] + eleve.nom[0]
    spanshortname.textContent = abrname



    buttonSpam.append(spanshortname)
    
    spanNom.textContent = `${eleve.prenom} ${eleve.nom}`
    spanholder.append(spanNom)



    spanAbsence.textContent = `${eleve.absences} absence${eleve.absences === 1 ? "" : "s"}`
    spanholder.append(spanAbsence)
    spanholder.append(badgeParents)
    buttonSpam.append(spanholder)
    
    spanMoyenne.textContent = `${moyenne}`
    buttonSpam.append(spanMoyenne);

    div1.append(buttonSpam);
    li.append(div1)
    li.append(p)

    buttonAbsence.textContent = "Absence"
    

    label.append(input)
    div2.append(buttonAbsence, label ,buttonadd)
    div1.append(div2)
    li.append(p)
    return (li)
}

const ele = eleves.map(creerLigne)
ele.forEach(i => listeEleves.append(i))
compteur.textContent = `${eleves.length} élèves`





const group1 = document.createElement("option")
const group2 = document.createElement("option")
const group3 = document.createElement("option")
group1.textContent = "Groupe 1"
group2.textContent = "Groupe 2"
group3.textContent = "Groupe 3"
group1.value = 1
group2.value = 2
group3.value = 3

const select = document.querySelector("#filtre-groupe")
select.append(group1.cloneNode(true), group2.cloneNode(true), group3.cloneNode(true))
const recherche = document.querySelector("#recherche")

function searchandfilter () {
    listeEleves.textContent = ""

    const elevesFiltred = select.value === "" ? eleves : eleves.filter(eleve => String(eleve.groupeId) === select.value)

    const search = recherche.value === "" ? elevesFiltred :  elevesFiltred.filter(eleve =>`${eleve.nom} ${eleve.prenom}`.toLowerCase().includes(recherche.value.toLowerCase()))
    
    const searched = search.map(creerLigne)
    
    searched.forEach(ligne => listeEleves.append(ligne))
    compteur.textContent = `${search.length} élèves`
}

select.addEventListener("change", searchandfilter)
recherche.addEventListener("input", searchandfilter)

/////////////

listeEleves.addEventListener("click", event => {
    const button = event.target.closest(".btn-absent")
    if (!button) return

    const row = button.closest("li[data-id]")
    if (!row) return

    const studentId = Number(row.dataset.id)
    const student = eleves.find(eleve => eleve.id === studentId)
    if (!student) return

    student.absences += 1
    row.querySelector('[data-role="absences"]').textContent =`${student.absences} absences`

    if (student.absences >= 3) {
        row.classList.add("alerte")
        const initials = row.querySelector('[data-role="initials"]')
        initials.classList.remove("bg-brand-soft", "text-brand")
        initials.classList.add("bg-alert", "text-white")
        row.querySelector('[data-role="badge-parents"]').classList.remove("hidden")
    }
})


//////////////////////////////////

listeEleves.addEventListener("click", event => {
    const addbutton = event.target.closest(".btn-note")
    if(!addbutton)return

    const row = addbutton.closest("li[data-id]")
    if (!row) return
    const input = row.querySelector('input[type="number"]')
    
    const studentId = Number(row.dataset.id)
    const selectedstudent = eleves.find(eleve => studentId === eleve.id)
    if(!selectedstudent)return

    const spanMoyenne = row.querySelector("#moyenne")  
    const error = document.querySelector("#error-note")

    if(input.value <= 20 && input.value >= 0 ){
        selectedstudent.notes.push(Number(input.value))
        error.classList.add("hidden")
    }else{
        error.classList.remove("hidden")
    }


    let moyenne;
    if(selectedstudent.notes.length > 0){
        const sum = selectedstudent.notes.reduce((total, note) => total + note, 0)
        moyenne = (sum / selectedstudent.notes.length).toFixed(2)
        moyenne += " / 20"
    }else{
        moyenne = "—";
    }
        spanMoyenne.textContent = `${moyenne}`
})


////////////////


const form = document.querySelector("#form-eleve")
const prenom = form.querySelector("#prenom")
const prenomMsg = form.querySelector("#prenom-msg")
const nom = form.querySelector("#nom")
const nomMsg = form.querySelector("#nom-msg")
const groupe = form.querySelector("#groupe")
const groupeMsg = form.querySelector("#groupe-msg")
const email = form.querySelector("#email")
const emailMsg = form.querySelector("#email-msg")
const telephone = form.querySelector("#telephone")
const telephoneMsg = form.querySelector("#telephone-msg")
const code = form.querySelector("#code")
const codeForce = form.querySelector("#code-force")
const codeMsg = form.querySelector("#code-msg")
const formSucces = form.querySelector("#form-succes")
const formErreur = form.querySelector("#form-erreur")


///////////////////////////////////////////////////////////////////////////////
const nomRegex = /^(?=.{2,}$)[\p{L} -]+$/u
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const telephoneRegex = /^(?:0[67]\d{8}|\+212[ -]?[67]\d{8})$/
const codeRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
//////////////////////////////////////////

groupe.append(group1, group2, group3)

const prenominput = prenom.value
const nominput = nom.value
const groupeinput = groupe.value
const emailinput = email.value
const telephoneinput = telephone.value
const codeinput = code.value
//////////////////////////////////

const fields = [
    {
        input: prenom,
        regex: nomRegex,
        errorMessage: "Lettres, espaces ou tirets (2 caractères minimum)."
    },
    {
        input: nom,
        regex: nomRegex,
        errorMessage: "Lettres, espaces ou tirets (2 caractères minimum)."
    },
    {
        input: groupe,
        errorMessage: "Choisissez un groupe."
    },
    {
        input: email,
        regex: emailRegex,
        errorMessage: "Exemple : parent@mail.ma"
    },
    {
        input: telephone,
        regex: telephoneRegex,
        errorMessage: "06 / 07 ou +212 6 / 7, puis 8 chiffres."
    },
    {
        input: code,
        regex: codeRegex,
        errorMessage: "8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial."
    }
]

function validateField(field) {
    const valeur = field.input.value.trim()
    const valide = field.regex ? field.regex.test(valeur) : valeur !== ""
    const boite = field.input.closest(".champ")
    const message = boite.querySelector(".message")

    boite.classList.remove("valide", "erreur")
    boite.classList.add(valide ? "valide" : "erreur")
    message.classList.remove("hidden")
    message.textContent = valide ? "Valide." : field.errorMessage
    return valide
}

//////////////////////////////////////

fields.forEach(field => {
    field.input.addEventListener("input", () => {
        validateField(field)
        formSucces.hidden = true
        formErreur.hidden = true
    })
    field.input.addEventListener("change", () => validateField(field))
})
////////////////////////////////////////////
form.addEventListener("submit", event => {
    event.preventDefault()
    formSucces.hidden = true
    formErreur.hidden = true

    const fieldsValid = fields.map(validateField)
    const firstInvalid = fieldsValid.indexOf(false)
    if (fieldsValid.every(valide => valide === true) === false) {
        fields[firstInvalid].input.focus()
        return
    }
/////////
    const groupeId = Number(groupe.value)
    const doublon = eleves.some(eleve =>
        eleve.groupeId === groupeId &&
        eleve.prenom.toLowerCase() === prenom.value.trim().toLowerCase() && eleve.nom.toLowerCase() === nom.value.trim().toLowerCase()
    )

    if (doublon) {
        formErreur.textContent = "Cet élève existe déjà dans ce groupe."
        formErreur.hidden = false
        groupe.focus()
        return
    }

    const nombreEleves = eleves.filter(eleve => eleve.groupeId === groupeId).length
    if (nombreEleves >= 15) {
        formErreur.textContent = "Ce groupe est complet (15 élèves)."
        formErreur.hidden = false
        groupe.focus()
        return
    }

    const nouvelEleve = {
        id: Math.max(...eleves.map(eleve => eleve.id)) + 1,
        prenom: prenom.value.trim(),
        nom: nom.value.trim(),
        groupeId,
        emailParent: email.value.trim(),
        telephoneParent: telephone.value.trim(),
        absences: 0,
        notes: []
    }

    eleves.push(nouvelEleve)
    searchandfilter()
    form.reset()
    fields.forEach(field => {
        field.input.closest(".champ").classList.remove("valide", "erreur")
        field.message.classList.add("hidden")
        field.message.textContent = field.errorMessage
    })
    codeForce.value = 0
    formSucces.hidden = false
})











