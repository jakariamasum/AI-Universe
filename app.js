// fetch all itmes
const container=document.getElementById('container');
const fetchAllData=()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools').then(res=>res.json())
    .then(data=>{
        data.data.tools.forEach(result=>{
            singleData(result)
        })
    })
}

// single items details
const singleData=(data)=>{
    const {image,features,name,published_in,id}=data;
    //console.log( features)
     const div=document.createElement('div'); 
     div.innerHTML=`
     <div class="card card-compact w-full bg-base-100 shadow-xl border-solid border-2 border-gray-500 p-5">
                <figure><img src="${image}" alt="${name}" class="h-[300px]" /></figure>
                <div class="card-body ">
                    <h2 class="card-title">Features</h2>
                    <ol id="${id}" class="list-decimal ml-3"></ol>
                    <hr>
                    <div class="card-actions justify-between items-center mt-6">
                        <div>
                            <h1 class="text-3xl font-semibold mb-4">${name}</h1>
                            <div class="flex items-center">
                                <i class="fa-solid fa-calendar-days mr-3"></i>
                                <p>${published_in}</p>
                            </div>
                        </div>
                        <div>
                            <label for="my-modal-3" class="cursor-pointer" onclick="showModal('${id}')"><i class="fa-solid fa-arrow-right-long" ></i></label>
                        </div>
                    </div>
                </div>
                </div>
                `
     container.appendChild(div)
     
     featuresItems(features,id)
    }
    
    fetchAllData()

    // add features list
const featuresItems=(data,id)=>{
    const ol=document.getElementById(id)
    data.forEach(result=>{
        const li=document.createElement('li'); 
        li.innerText=result;
        ol.appendChild(li)
    })
}


// modal details
const showModal=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url).then(res=>res.json()).then(data=>addModalDetails(data.data))
}


// add modal details
const addModalDetails=(data)=>{
    console.log(data)
    const modalContainer=document.getElementById('modal-container'); 
    const {image_link,pricing,features,input_output_examples,description}=data
    modalContainer.innerHTML=`
    <div class="flex justify-between p-12">
                <div>
                    <p>${description}</p>
                    <div class="grid grid-cols-3 gap-4 rounded-lg bg-white">
                        <p class="text-green-500">${pricing[0].price} <br> ${pricing[0].plan}</p>
                        <p class="text-yellow-500">${pricing[1].price} <br> ${pricing[1].plan}</p>
                        <p class="text-red-500">${pricing[2].price} <br> ${pricing[2].plan}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h1>Features</h1>
                        <ul>
                            <li>dfn</li>
                            <li>dsfknq</li>
                            <li>dflkl</li>
                        </ul>
                        </div>
                        <div>
                            <h1>Features</h1>
                        <ul>
                            <li>dfn</li>
                            <li>dsfknq</li>
                            <li>dflkl</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="${image_link[0]}">
                </div>
            </div>
    `
}

