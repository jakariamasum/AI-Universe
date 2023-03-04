let rootData;

// fetch all items
const fetchAllData=(limit)=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools').then(res=>res.json())
    .then(data=>singleData(data.data.tools,limit))
}

// single items details
const singleData=(data,limit)=>{
    toggleLoader(true);
    if(limit && data.length>=6)
    {
        data=data.slice(0,6);
        document.getElementById('see-more').classList.remove('hidden');
    } 
    else if(data.length===6)
    {
        data=data.slice(0,6);
        
        document.getElementById('see-more').classList.remove('hidden');
    } 
    else {
        document.getElementById('see-more').classList.add('hidden');
    }

     rootData=data;
    const container=document.getElementById('container');
    container.innerText='';

    data.forEach(result=>{
        const div=document.createElement('div'); 
        div.innerHTML=`
    <div class="card card-compact w-full bg-base-100 shadow-xl border-solid border-2 border-gray-500 p-5 ">
    <figure><img src="${result.image}" alt="${result.name}" class="h-[300px]" /></figure>
    <div class="card-body ">
                    <h2 class="card-title text-3xl font-semibold text-[#111111]">Features</h2>
                    <ol id="${result.id}" class="list-decimal ml-5 text-[#585858] mb-6"></ol>
                    <hr>
                    <div class="card-actions justify-between items-center mt-3">
                        <div>
                            <h1 class="text-3xl font-semibold mb-4 text-[#111111]">${result.name}</h1>
                            <div class="flex items-center text-[#585858]">
                            <i class="fa-solid fa-calendar-days mr-3"></i>
                            <p>${result.published_in}</p>
                            </div>
                            </div>
                        <div>
                            <label for="my-modal-3" class="cursor-pointer" onclick="showModal('${result.id}')"><i class="fa-solid fa-arrow-right-long text-red-500" ></i></label>
                        </div>
                    </div>
                </div>
                </div>
                `
                container.appendChild(div);
                featuresItems(result.features,result.id);
    })
    toggleLoader(false)                
};


// add features list
const featuresItems=(data,id)=>{
    //console.log(data,id)
    const ol=document.getElementById(id);
    data.forEach(result=>{
        const li=document.createElement('li'); 
        li.innerText=result;
        ol.appendChild(li);
    })
};


// fetch modal details
const showModal=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url).then(res=>res.json()).then(data=>addModalDetails(data.data))
};


// add modal details
const addModalDetails=(data)=>{
    const modalContainer=document.getElementById('modal-container'); 
    const {image_link,pricing,features,input_output_examples,description,integrations,id}=data;
    modalContainer.innerHTML=`
    <div class="lg:flex justify-between lg:p-5">

                <div class="bg-red-100 border-solid border-2 border-red-300 rounded-lg  w-full lg:w-[55%] p-8">
                    <p class="font-semibold mb-6">${description}</p>
                    <div class="grid grid-cols-1 rounded-lg lg:grid-cols-3 gap-4 ">
                        <p class="text-green-500 bg-green-50 text-center font-bold">${pricing?(pricing[0].price==='0' || pricing[0].price==='No cost')?"Free of Cost/":pricing[0].price:"Free of Cost/"} <br> ${pricing?pricing[0].plan:"Basic"}</p>
                        <p class="text-yellow-500 bg-green-50 text-center" font-bold>${pricing?(pricing[1].price==='0' || pricing[1].price==='No cost')?"Free of Cost/":pricing[1].price:"Free of"} <br> ${pricing?pricing[1].plan:"Cost/Pro"}</p>
                        <p class="text-red-500 bg-green-50 text-center font-bold">${pricing?(pricing[2].price==='0' || pricing[2].price==='No cost')?"Free of Cost/":pricing[2].price:"Free of Cost/"} <br> ${pricing?pricing[2].plan:"Enterprise"}</p>
                    </div>

                    <div class="grid grid-cols-1 mt-6 lg:grid-cols-2 gap-4">
                        <div>
                            <h1 class="text-2xl font-semibold">Features</h1>
                        <ol id="1${id}" class="list-disc text-[#585858] ml-7"></ol>
                        </div>
                        <div>
                            <h1 class="text-2xl font-semibold">Integrations</h1>
                        <ol id="2${id}" class="list-disc ml-7"></ol>
                        </div>
                    </div>
                </div>

                    <div class="w-full mt-5 relative lg:w-[45%] lg:ml-5">
                    <img src="${image_link[0]}" class="relative h-[340px]">
                    ${data.accuracy.score? `<div class="badge absolute bottom-[390px] right-[25px] bg-red-400 p-4">${data.accuracy.score?(data.accuracy.score)*100 +"% accuracy":''}</div>`:''}
                    <div id="example${id}" class="text-center mt-6"></div>
                    </div>
                </div>
                    `
                    modalFeatures(features,'1'+id)
                    integrationsFeatures(integrations,'2'+id)
                    addExample(input_output_examples,'example'+id)
};
                
                
// integrations Features lists
const integrationsFeatures=(data,id)=>
{
    const ol=document.getElementById(id);
    if(data===null)
    {
        ol.innerText="No data Found";
    }
    else{
        for(const singleData of data){
            const li=document.createElement('li');
            li.innerText=singleData; 
            ol.appendChild(li);
        }
    }
};

// modal features lists
const modalFeatures=(data,id)=>{
    const ol=document.getElementById(id);
     for(const single in data){
        const li=document.createElement('li');
        li.innerText=data[single].feature_name; 
        ol.appendChild(li);
     }
};


// set example for modals
const addExample=(data,id)=>{
    const div=document.getElementById(id);
    const p1=document.createElement('p');
    p1.classList.add('txt-2xl');
    p1.classList.add('font-semibold');
    p1.classList.add('text-[#111111]');
    const p2=document.createElement('p');
    p2.classList.add('text-gray-500');
    if(data===null)
    {
        p1.innerText="Can you give any example?";
        div.appendChild(p1);
        p2.innerText="No! Not Yet! Take a break!!!"; 
        div.appendChild(p2);
    }
    else{
        
        p1.innerText=data[0].input;
        div.appendChild(p1);
        p2.innerText=data[0].output; 
        div.appendChild(p2);
    }
};


// loader functionality
const toggleLoader=(response)=>{
    if(response)
    document.getElementById('loader').classList.remove('hidden');
    else
    document.getElementById('loader').classList.add('hidden');
};

// see more button's functionality
document.getElementById('see-btn').addEventListener('click',()=>{
    fetchAllData()
});

// sort btn functionality
document.getElementById('sort-btn').addEventListener('click',function(){
    const sorting=(a,b)=>{
        const dateA=new Date(a.published_in);
        const dateB=new Date(b.published_in);
        if(dateA>dateB){
            return 1;
        } 
        else if(dateA <dateB){
            return -1;
        }
        else return 0;
    };
     singleData(rootData.sort(sorting));
})

