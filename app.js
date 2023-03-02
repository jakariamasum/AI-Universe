const container=document.getElementById('container');
const fetchAllData=()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools').then(res=>res.json())
    .then(data=>{
        data.data.tools.forEach(result=>{
            singleData(result)
        })
    })
}


const singleData=(data)=>{
     console.log(data)
     const div=document.createElement('div'); 
     div.innerHTML=`
     <div class="card card-compact w-full bg-base-100 shadow-xl border-solid border-2 border-gray-500 p-5">
                <figure><img src="${data.image}" alt="${data.name}" class="h-[300px]" /></figure>
                <div class="card-body ">
                    <h2 class="card-title">Features</h2>
                   
                    <hr>
                    <div class="card-actions justify-between items-center mt-6">
                        <div>
                            <h1 class="text-3xl font-semibold mb-4">${data.name}</h1>
                            <div class="flex items-center">
                                <i class="fa-solid fa-calendar-days mr-3"></i>
                                <p>${data.published_in}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </div>
                    </div>
                </div>
            </div>
     `
     container.appendChild(div)
    
}



fetchAllData()