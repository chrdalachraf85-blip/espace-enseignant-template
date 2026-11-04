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
group1.textContent = "group1"
group2.textContent = "group2"
group3.textContent = "group3"
group1.value = 1
group2.value = 2
group3.value = 3

const select = document.querySelector("#filtre-groupe")
select.append(group1,group2,group3)
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





























