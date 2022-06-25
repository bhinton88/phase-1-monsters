let page = 1;

document.addEventListener("DOMContentLoaded", function() {
  
  getMonsters()
  createMonsterForm()

  const upButton = document.querySelector('#forward')
  const downButton = document.querySelector('#back')


  upButton.addEventListener('click', function() {
    const monsterDiv = document.querySelector('#monster-container')
    monsterDiv.innerHTML = ''
    pageUp()
  })

  downButton.addEventListener('click', function() {
    const monsterDiv = document.querySelector('#monster-container')
    monsterDiv.innerHTML = ''
    pageDown()
  })
})

function getMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(data => data.map(monster => createMonsterCard(monster)))
}

function createMonsterCard(monster){
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const h4 = document.createElement('h4')
  const p = document.createElement('p')

  h2.textContent = monster.name
  h4.textContent = monster.age
  p.innerText = monster.description
  div.append(h2,h4,p)
  document.querySelector('#monster-container').appendChild(div)
}

// create form elements, takes three inputs 

function createMonsterForm(){
  const form = document.createElement('form')
  form.id = "monster-form"
  const inputName = document.createElement('input')
  inputName.id = "name"
  inputName.placeholder = "name"
  const inputAge = document.createElement('input')
  inputAge.id = "age"
  inputAge.placeholder ="age"
  const inputDescription = document.createElement('input')
  inputDescription.id = "description"
  inputDescription.placeholder ="description"
  const button = document.createElement('button')
  button.textContent = "create"

  form.append(inputName, inputAge, inputDescription,button)
  document.querySelector('#create-monster').appendChild(form)

  form.addEventListener('submit', function(e) {
    e.preventDefault()
    submitNewMonster(e)
})
}

// now lets handle the button event listener for a new page of monsters

function pageUp () {
  page++ 
  getMonsters(page)
}

function pageDown() {
  page--
  getMonsters(page)
}

function submitNewMonster(e){
  let monsterObj ={
    name: e.target.name.value,
    age: e.target.age.value,
    description: e.target.description.value
  }
  createMonsterCard(monsterObj)
  postMonster(monsterObj)
}

function postMonster(object){

  fetch("http://localhost:3000/monsters" , {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(object)
  })
  .then(response => response.json())
  .then(data => console.log(data))
}