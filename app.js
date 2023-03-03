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
    //console.log(data,id)
    const ol=document.getElementById(id)
    data.forEach(result=>{
        const li=document.createElement('li'); 
        li.innerText=result;
        ol.appendChild(li)
    })
}


// fetch modal details
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
                    <div class="grid grid-cols-3 gap-4 rounded-lg">
                        <p class="text-green-500 bg-green-50 text-center">${pricing[0].price?pricing[0].price:"Not available"} <br> ${pricing[0].plan?pricing[0].plan:"Not available"}</p>
                        <p class="text-yellow-500 bg-green-50 text-center">${pricing[1].price?pricing[1].price:"Not available"} <br> ${pricing[1].plan?pricing[0].plan:"Not available"}</p>
                        <p class="text-red-500 bg-green-50 text-center">${pricing[2].price?pricing[2].price:"Not available"} <br> ${pricing[2].plan?pricing[2].plan:"Not available"}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h1>Features</h1>
                        <ol id="1${data.id}" class="list-disc">
                            
                        </ol>
                        </div>
                        <div>
                            <h1>Integrations</h1>
                        <ol id="2${data.id}" class="list-disc">
                            
                        </ol>
                        </div>
                    </div>
                </div>
                <div class="ml-5">
                    <img src="${image_link[0]}">
                    <div id="example${data.id}" class="text-center">
                    </div>
                </div>
            </div>
    `
    modalFeatures(data.features,'1'+data.id)
    integrationsFeatures(data.integrations,'2'+data.id)
    addExample(data.input_output_examples,'example'+data.id)
}


// integrations Features lists
const integrationsFeatures=(data,id)=>
{
    //  console.log( data,1+id)
    const ol=document.getElementById(id);
     for(const single of data){
         const li=document.createElement('li');
         // console.log(single)
         li.innerText=single; 
         ol.appendChild(li)
     }
   // console.log(ol) 
}

// modal features lists
const modalFeatures=(data,id)=>{
    //  console.log(data['1'])
    const ol=document.getElementById(id);
     for(const single in data){
        const li=document.createElement('li');
        // console.log(data[single].feature_name)
        li.innerText=data[single].feature_name; 
        ol.appendChild(li)
     }
    
}


// set example for modals
const addExample=(data,id)=>{
    console.log(data,id)
    const div=document.getElementById(id);
    // console.log(div)
    if(data.length===0)
    {
        const p1=document.createElement('p');
        const p2=document.createElement('p');
        p1.innerText="Can you give any example?";
        div.appendChild(p1);
        p2.innerText="No! Not Yet! Take a break!!!"; 
        div.appendChild(p2);
    }
    else{
        const p1=document.createElement('p');
        const p2=document.createElement('p');
        p1.innerText=data[0].input;
        div.appendChild(p1);
        p2.innerText=data[0].output; 
        div.appendChild(p2);
    }
}