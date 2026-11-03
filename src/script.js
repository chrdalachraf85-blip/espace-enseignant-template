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
    const div2 = document.createElement("div")
    const buttonAbsence = document.createElement("button")
    const label = document.createElement("label")
    const input = document.createElement("input") 
    const buttonadd = document.createElement("button") 


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
    spanMoyenne.className = "font-serif text-xl"
    div2.className = "flex gap-2"
    buttonAbsence.className = "btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper"
    label.classList.add("flex-1")
    
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
    
    
    const abrname = eleve.prenom[0] + eleve.nom[0]
    spanshortname.textContent = abrname



    buttonSpam.append(spanshortname)
    
    spanNom.textContent = `${eleve.prenom} ${eleve.nom}`
    spanholder.append(spanNom)



    spanAbsence.textContent = `${eleve.absences} absence${eleve.absences === 1 ? "" : "s"}`
    spanholder.append(spanAbsence)
    buttonSpam.append(spanholder)
    
    spanMoyenne.textContent = `${moyenne}`
    buttonSpam.append(spanMoyenne);

    div1.append(buttonSpam);
    li.append(div1)

    buttonAbsence.textContent = "Absence"
    

    label.append(input)
    div2.append(buttonAbsence, label ,buttonadd)
    div1.append(div2)
    
    return (li)
}

const ele = eleves.map(creerLigne)
ele.forEach(i => listeEleves.append(i))

compteur.textContent = `${eleves.length} élèves`

























