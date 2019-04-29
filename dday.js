const dday=document.querySelector('.js-dday');

const firstDate=new Date("May 18, 2017").getTime();

const nowDate=new Date().getTime();

const gap=nowDate - firstDate;

let day=Math.floor(gap/(1000*60*60*24));

document.querySelector('.show').innerHTML=`오늘은 우리의 ${day}일`

console.log(gap);

