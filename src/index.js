document.addEventListener("DOMContentLoaded", () => {
  const hogContainer = document.querySelector('#hog-container')
  const hogForm = document.querySelector('#hog-form')
  hogForm.addEventListener('submit', handleSubmit)
  getHogs()

  function getHogs() {
    fetch('http://localhost:3000/hogs')
      .then(r => r.json())
      .then(hogs => hogs.forEach(displayHog))
  }

  function postHog(data) {
    fetch('http://localhost:3000/hogs', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(r => r.json())
      .then(displayHog)
  }

  function patchHogGrease(e) {
    let data = {
      greased: e.target.checked
    }
    fetch(`http://localhost:3000/hogs/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  function deleteHog(e) {
    e.target.parentNode.remove()
    fetch(`http://localhost:3000/hogs/${e.target.dataset.id}`, {
      method: "DELETE"
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      specialty: e.target.specialty.value,
      image: e.target.img.value,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": e.target.weight.value,
      "highest medal achieved": e.target.medal.value,
      greased: e.target.greased.checked
    }
    postHog(data)
  }

  function displayHog(hog) {
    const div = document.createElement('div')
    div.className = 'hog-card'
    const img = document.createElement('img')
    img.src = hog.image
    img.style.maxWidth = '250px'
    const h2 = document.createElement('h2')
    h2.innerText = hog.name
    const specialty = document.createElement('p')
    specialty.innerText = `Specialty: ${hog.specialty}`
    const medal = document.createElement('p')
    medal.innerText = `Highest medal achieved: ${hog['highest medal achieved']}`
    const weight = document.createElement('p')
    weight.innerText = `Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: ${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}`
    const pGreased = document.createElement('p')
    pGreased.innerText = 'Greased: '
    const checkGreased = document.createElement('input')
    checkGreased.type = 'checkbox'
    checkGreased.checked = !!hog.greased
    checkGreased.dataset.id = hog.id
    checkGreased.addEventListener('click', patchHogGrease)
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.className = 'delete'
    deleteButton.dataset.id = hog.id
    deleteButton.addEventListener('click', deleteHog)

    pGreased.append(checkGreased)
    div.append(h2, img, specialty, medal, weight, pGreased, deleteButton)
    hogContainer.append(div)
  }
})