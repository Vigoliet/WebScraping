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

}