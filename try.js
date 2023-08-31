const loadData = (isclicked) =>{
  fetch('https://openapi.programming-hero.com/api/ai/tools')
      .then(response => response.json())
      .then(data => data.data.tools)
      .then(items => displayData(items, isclicked))
}


// step -1
let seemoreBtn = document.getElementById('seeMore');
const displayData = (items, isclicked) => {
    console.log(items)
    console.log(isclicked)
    
    if(isclicked !='clicked'){
        items=items.slice(0, 6);
    }
    if(isclicked === 'clicked'){
      seemoreBtn.classList.add('hidden')
        items = items.slice(6 , items.length)
    }

    items.forEach( item => {
        console.log(item)
        const cardContainer = document.getElementById('card-container');
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="card bg-base-100 shadow-xl max-h-[600px] border">
                <figure class="p-5"><img src="${item.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">Features</h2>
                  <ul class="list-decimal ml-4">
                    <li>${item.features[0]}</li>
                    <li>${item.features[1]}</li>
                    <li>${item.features[2]}</li>
                  </ul>
                  <h2 class="card-title">${item.name}</h2>
                  <p><i class="fa-regular fa-calendar"></i> ${item.published_in}</p>
                  <div class="card-actions justify-end">
                    <button onclick="handleClick('${item.id}')"><i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>
              </div>
    `;
    cardContainer.appendChild(card);
    })

}

loadData();

// step-2
seemoreBtn.addEventListener('click',()=>{
  loadData('clicked');
})

// step-3
const handleClick = (id) =>{
  console.log('clicked the arrow and get id', id);
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then( res => res.json())
    .then( data => displayDetails(data))
  
}

// step-4
const displayDetails = (data) =>{
  show_details.showModal()
  console.log(data.data)
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
  <form method="dialog" class="modal-box grid md:grid-cols-2 md:gap-4 lg:gap-9 max-w-6xl p-5 lg:p-20 ">
    <div class='border border-red-700 rounded-xl  p-6'>
      <h3 class="font-bold text-lg">
        ${data.data.description}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 text-center text-sm py-4">
        <div class="text-green-700 font-semibold py-2 md:py-0">
          ${data.data.pricing[0]?.plan}<br/>
          ${data.data.pricing[0]?.price}
        </div>
        <div class="text-orange-700 font-semibold py-2 md:py-0">
          ${data.data.pricing[1]?.plan}<br/>
          ${data.data.pricing[1]?.price}
        </div>
        <div class="text-red-700 font-semibold py-2 md:py-0">
          ${data.data.pricing[2]?.plan}<br/>
          ${data.data.pricing[2]?.price}
        </div>
      </div>
      <div class="flex-cols md:flex md:justify-between gap-3">
        <div>
          <h3 class='font-bold text-base'>Features</h3>
          <div class="text-xs text-gray-600">
          <li>${data.data.features[1]?.feature_name}</li>
          <li>${data.data.features[2]?.feature_name}</li>
          <li>${data.data.features[3]?.feature_name}</li>
          </div>
        </div>
        <div>
          <h3 class='font-bold text-base'>Integrations<h3>
          <div class="text-xs text-gray-600">
          <li>${data.data.integrations[0] || 'No data found'}</li>
          <li>${data.data.integrations[1] || 'No data found'}</li>
          <li>${data.data.integrations[2] || 'No data found'}</li>
          </div> 
        </div>
      </div>
    </div>
    <div class="p-8 text-center">
      <img src="${data.data.image_link[0] || data.data.image_link[1]}">
      <p class="font-bold text-lg py-3">${data.data.input_output_examples[0].input}</p>
      <p class="text-sm">${data.data.input_output_examples[0].output}</p>
      <div class="modal-action absolute top-[-23px] right-0">
      <!-- if there is a button in form, it will close the modal -->
      <button class=" bg-rose-500 text-white rounded-[50%] p-3"><i class="fa-solid fa-xmark fa-2x"></i></button>
    </div>
    </div>
    
  </form>

  `;
}


 
