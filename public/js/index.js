'use strict';
console.log('alive');

let results = [];

const fetchData = fetch(
    '/data'
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
        h3.textContent = data.title;
        col.appendChild(h3);

        const p = document.createElement('p');
        p.className = 'text-center text-light';
        p.textContent = data.companyname;
        col.appendChild(p);
    });

}