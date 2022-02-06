'use strict';
console.log('alive');

let results = [];

const fetchData = fetch(
    './data/data.json'
).then((res) => res.json());

const data = Promise.all([fetchData]);


data.then((res) => Load(res));


const Load = (res) => {

    results = res[0];
    console.log(results)

    results.forEach(data => {
        const div = document.createElement('div');
        div.className = 'container';
        document.getElementById('content').appendChild(div);

        const row = document.createElement('div');
        row.className = 'row';
        div.appendChild(row);

        const col = document.createElement('div');
        col.className = 'col bg-primary my-3 py-3 rounded-3';
        row.appendChild(col);

        const h3 = document.createElement('h3');
        h3.className = 'text-center text-light';
        h3.textContent = data.jobTitle;
        col.appendChild(h3);

        const p = document.createElement('p');
        p.className = 'text-center text-light';  
        p.textContent = `Företag: ${data.companyName}`;
        col.appendChild(p);

        const location = document.createElement('p');
        location.className = 'text-center text-light';
        location.textContent = data.location;
        col.appendChild(location);

        

        const desc = document.createElement('p');
        desc.className = 'text-light m-1 p-3 desc';
        desc.id = 'desc'
        desc.textContent = data.description;
        col.appendChild(desc);


        const date = document.createElement('p');
        date.className = 'text-start text-light';
        date.textContent = data.date;
        col.appendChild(date);

        
        var a = document.createElement('a');
        a.href = data.jobLink;
        col.appendChild(a);
        a.className = 'text-end text light';
        var link = document.createTextNode('\u{1F517}');
        a.appendChild(link);
         

    });

}


