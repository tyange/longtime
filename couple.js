const firstForm=document.querySelector(".askName"),
    userName=firstForm.querySelector(".userName"),
    secondForm=document.querySelector(".askMate"),
    greeting=document.querySelector(".greeting"),
    yBtn=secondForm.querySelector(".yes"),
    nBtn=secondForm.querySelector(".no"),
    thirdForm=document.querySelector(".askMateName"),
    mateName=thirdForm.querySelector(".mateName"),
    couple=document.querySelector(".js-couple"),
    fourthForm=document.querySelector(".askDate"),
    yourDate=fourthForm.querySelector(".date"),
    days=document.querySelector(".js-days"),
    reDoBtn=document.querySelector(".reDo");

const USER_LS="currentUser",
    USERMATE_LS="currentMate",
    SHOWING="showing",
    HIDING="hiding",
    FIRSTDATE_LS="firstDate";

    
    let saveName=function(text){
        localStorage.setItem(USER_LS,text);
    }
    let saveMate=function(text){
        localStorage.setItem(USERMATE_LS,text);
    }
    let secondPhase=function(text){
        firstForm.classList.remove(SHOWING);
        secondForm.classList.add(SHOWING);
        greeting.classList.add(SHOWING);
        greeting.innerText=`반갑습니다, ${text}님.`
        
        let yesMate= function(){
            yBtn.addEventListener('click',thirdPhase);
        };
        let noMate= function(){
            nBtn.addEventListener('click',justHi)
        };

        yesMate();
        noMate();
    }

    let nameSubmit=function(event){
        event.preventDefault();
        let currentValue=userName.value;
        saveName(currentValue);
        secondPhase(currentValue);
    }
    
    let askName= function(){
        firstForm.classList.add(SHOWING);
        firstForm.addEventListener('submit',nameSubmit);
    }

    
    let mateSubmit=function(event){
        event.preventDefault();
        let currentValue=mateName.value;
        saveMate(currentValue);
        printCouple();
        thirdForm.classList.remove(SHOWING);
        greeting.classList.remove(SHOWING);
        askDate();
    }
    let printCouple= function(){
        let you=localStorage.getItem(USER_LS),
            mate=localStorage.getItem(USERMATE_LS);
        couple.classList.add(SHOWING);
        couple.innerText=`${mate} ♥ ${you}`
    }

    let thirdPhase=function(){
        greeting.classList.remove(SHOWING);
        secondForm.classList.remove(SHOWING);
        thirdForm.classList.add(SHOWING);
        thirdForm.addEventListener('submit',mateSubmit);
    }
    let justHi=function(){
        secondForm.classList.remove(SHOWING);
    }
    
    function saveDate(date){
        localStorage.setItem(FIRSTDATE_LS,date);
    }
    function submitDate(event){
        event.preventDefault();
        let firstDate=yourDate.value;
        saveDate(firstDate);
        howLong();
        fourthForm.classList.remove(SHOWING);
    }
    function howLong(){
        const getDate=localStorage.getItem(FIRSTDATE_LS);
          
        let firstDate=new Date(getDate).getTime(),
            nowDate=new Date().getTime(),
            gap=nowDate - firstDate;

        let day=Math.floor((gap/(1000*60*60*24))+1);
        days.classList.add(SHOWING);
        days.innerText=`오늘은 우리가 만난지 ${day}일`;
        reDoBtn.classList.add(SHOWING);
        reDo();
        
        
    }

    function askDate(){
        fourthForm.classList.add(SHOWING);
        fourthForm.addEventListener('submit',submitDate);
        
    }

   
    function clearAll(){
        localStorage.clear();
        location.reload();
    }
    function reDo(){
        reDoBtn.addEventListener('click',clearAll);
    }


    let finallyCouple=function(){
        let currentUser=localStorage.getItem(USER_LS);
        let currentMate=localStorage.getItem(USERMATE_LS);
        let currentDate=localStorage.getItem(FIRSTDATE_LS);
    if(currentDate === null){
        askName();
    }else if(currentUser !== null && currentDate === null){
        
        secondPhase(currentUser);
    }else if(currentMate !== null && currentDate === null){
        thirdPhase();
    }
    else{
        printCouple();
        howLong();
    }
    
}

finallyCouple();