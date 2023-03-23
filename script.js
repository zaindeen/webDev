var URL = window.confirm('hello madam! This is to declare that the assignment was done by me and was not copied!\nClick OK to see github link\nCancel to continue');
if(URL){
    window.open('https://github.com/zaindeen/webDev');
}
tvshows_ep_drop = document.querySelectorAll('.dropdown');
tvshows_ep_drop.forEach(
    drop => {drop.addEventListener('click',onWClick)}
);
click = [0,0,0];
totalTime = [0,0,0];
let prev = [[0,0],[0,0],[0,0]];

// creating total time watched
const timeBox  = document.createElement('div');
const timeText = document.createElement('div');
const time  = document.createElement('div');

//class names
timeBox.classList.add('timeBox');
timeText.classList.add('text');
time.classList.add('total_time');
//values
timeText.innerHTML='Total Time Spent'
time.textContent = '0 days, 0 hours, 0 mins'
//appending
const container = document.querySelector('.container');
container.appendChild(timeBox);
timeBox.appendChild(timeText);
timeBox.appendChild(time);

// calculating total time
function compute(){
    var total = totalTime[0]+totalTime[1]+totalTime[2];
    var day = Math.floor(total/1440);
    total%=1440;
    var hour = Math.floor(total/60);
    total%=60;
    var min = Math.floor(total);
    time.innerHTML='';
    time.textContent= day+' days, '+hour+' hours, '+min+' mins';
}

function create_drop_W(vertical,seasonNumber,show){
    //when season is selected the dropdown is hidden
    if(seasonNumber === 0){
        const hide = document.querySelector('.show_'+prev[show][0]+'_season_'+prev[show][1]);
        hide.classList.add('hidden');
    }

    // if the dropdown is already created just the hidden is removed 
    const ifExist = document.querySelector('.show_'+show+'_season_'+seasonNumber);
    if(ifExist !== null){
        ifExist.classList.remove('hidden');
        return;
    }

    // for season number and check box
    const seasContainer = document.createElement('div');
    const seas = document.createElement('h2');
    const marcar = document.createElement('label');
    const check_box = document.createElement("input");
    
    //class 
    seasContainer.classList.add('show_'+show+'_season_'+seasonNumber);
    seas.classList.add('season_heading');
    check_box.classList.add('cbox');
    check_box.id = 'show_'+show+'_sea_'+seasonNumber;

    check_box.style.margin = "0px 10px 0px 0px";
    marcar.classList.add('Marcar_Todos');

    seas.textContent = 'Season '+seasonNumber;
    check_box.type = "checkbox";
    marcar.innerHTML = 'Select All';

    vertical.appendChild(seasContainer);
    seasContainer.appendChild(seas);
    seasContainer.appendChild(check_box);
    seasContainer.appendChild(marcar);

    // for the episodes and its detail
    for(let i=0;i<TV_SHOWS[show].seasons[seasonNumber-1].length;i++){
        const episode = document.createElement('div');
        const img = document.createElement('img');
        const descDiv = document.createElement('div');
        const descCheck = document.createElement('input'); 
        descCheck.type = 'checkbox';
        const descTitle = document.createElement('h3');
        const descDate = document.createElement('span');
        const descSumm = document.createElement('p');

        // adding class 
        descCheck.style.margin = "20px 10px auto 0px";
        episode.classList.add('episode_box');
        img.classList.add('episode_images');
        descDiv.classList.add('description');
        descCheck.classList.add('check_box_'+show+'_'+seasonNumber);
        descCheck.id = 'check_box_' + seasonNumber + "_" + i;
        descTitle.classList.add('episode_title');
        descDate.classList.add('airing_date');
        descSumm.classList.add('episode_summary');

        //adding img src and desc from json
        if(i>8)
            descTitle.textContent = 'S0' + seasonNumber + 'E' + parseInt(i+1) +': '+ TV_SHOWS[show].seasons[seasonNumber-1][i].runtime +' min';
        else
            descTitle.textContent = 'S0' + seasonNumber + 'E0' + parseInt(i+1) +': '+TV_SHOWS[show].seasons[seasonNumber-1][i].runtime +' min';
        img.src = TV_SHOWS[show].seasons[seasonNumber-1][i].image;
        var [year,month,date] = TV_SHOWS[show].seasons[seasonNumber-1][i].airdate.split("-");
        descDate.textContent = date + "/" + month + "/" + year ;
        descSumm.textContent = TV_SHOWS[show].seasons[seasonNumber-1][i].summary;

        seasContainer.appendChild(episode);
        episode.appendChild(img);
        episode.appendChild(descCheck);
        episode.appendChild(descDiv);
        descDiv.appendChild(descTitle);
        descDiv.appendChild(descDate);
        descDiv.appendChild(descSumm);
    }
    // event Listeners to all the check boxes as soon as they are created for time cal
    check_Box = document.querySelectorAll('.cbox');
    check_Box.forEach(
        checkBoxAll =>{
        checkBoxAll.addEventListener('change',checkAll);
        }
    );
    check_Box_epi = document.querySelectorAll('.check_box_'+show+'_'+seasonNumber);
    check_Box_epi.forEach(
        checkBoxAllEpi =>{
        checkBoxAllEpi.addEventListener('change',calTime);
        }
    );
}


function onWClick(event){
    const season = event.currentTarget;
    const val = parseInt(season.id);
    const vertical = document.querySelectorAll('.vertical');
    const number = parseInt(season.value.split(" ")[1]);

    if(number!==0 & click[val]===0){
        create_drop_W(vertical[val],number,val);
        click[val] = 1;
    }
    else if(number!== 0 & click[val]!==0){
        if(prev[val][1]!==0){
        const hide = document.querySelector('.show_'+prev[val][0]+'_season_'+prev[val][1]); 
        hide.classList.add('hidden');
        }   
        create_drop_W(vertical[val],number,val);
    }
    else{
        if(prev[val][1]!==0){
        const hide = document.querySelector('.show_'+prev[val][0]+'_season_'+prev[val][1]); 
        hide.classList.add('hidden');
        }
    }
    // to know the current element in each show's dropdown so it can be hide at next dropdown
    prev[val][0] = val;
    prev[val][1] = number;
}

function checkAll(event){
    const present = event.currentTarget;
    const showNum = present.id.split('_')[1];
    const seaNum = present.id.split('_')[3];    
    const cbox = document.getElementById('show_'+showNum+'_sea_'+seaNum);
    const check_box_ep = document.querySelectorAll('.check_box_'+showNum+'_'+seaNum);
    if(cbox.checked){
    check_box_ep.forEach(
        check =>{
            if(check.checked !== true){
                check.checked = true;
                calTimeAll(check);
            }
        }
    );
    }
    else{
        check_box_ep.forEach(
            check =>{
                if(check.checked !== false){
                    check.checked = false;
                    calTimeAll(check);
                }
            }
        ); 
    }
}

function calTime(event){
    const element = event.currentTarget;
    const showNum = element.className.split('_')[2];
    const seasonNum = element.id.split('_')[2];
    const epiNum = element.id.split('_')[3];
    if(element.checked)
        totalTime[showNum] += TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    else
        totalTime[showNum] -= TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    compute();
}
function calTimeAll(elementAll){
    const showNum = elementAll.className.split('_')[2];
    const seasonNum = elementAll.id.split('_')[2];
    const epiNum = elementAll.id.split('_')[3];
    if(elementAll.checked)
        totalTime[showNum] += TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    else
        totalTime[showNum] -= TV_SHOWS[showNum].seasons[seasonNum-1][epiNum].runtime;
    compute();
}

