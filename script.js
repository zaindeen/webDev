tvshows_ep_drop = document.querySelectorAll('.dropdown');
tvshows_ep_drop.forEach(
    drop => {drop.addEventListener('click',onWClick)}
);
clickW = 0;
totalTime = new Array(3);
totalTime[0] = totalTime[1] = totalTime[2] = 0;
let prev = [0,0];

function create_drop_W(vertical,seasonNumber,show){
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
    check_box.classList.add('cbox_'+show);
    marcar.classList.add('Marcar_Todos');

    seas.textContent = 'Season '+seasonNumber;
    check_box.type = "checkbox";
    marcar.for =  'ws01';
    marcar.innerHTML = 'Marcar todos';

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
        episode.classList.add('episode_box');
        img.classList.add('episode_images');
        descDiv.classList.add('description');
        descCheck.classList.add('check_box_'+show);
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
    check_Box = document.querySelectorAll('.cbox_'+show);
    check_Box.forEach(
        checkBoxAll =>{
        checkBoxAll.addEventListener('click',checkAll);
        }
    );
    check_Box_epi = document.querySelectorAll('.check_box_'+show);
    check_Box_epi.forEach(
        checkBoxAllEpi =>{
        checkBoxAllEpi.addEventListener('click',calTime);
        }
    );
}


function onWClick(event){
    const season = event.currentTarget;
    const val = parseInt(season.id);
    const vertical = document.querySelectorAll('.vertical');
    const number = parseInt(season.value.split(" ")[1]);

    if(number!=0 & clickW===0){
        create_drop_W(vertical[val],number,val);
        clickW = 1;
    }
    else if(number!=0 & clickW!=0){
        const hide = document.querySelector('.show_'+prev[0]+'_season_'+prev[1]); 
        if(prev[0]===val)
            hide.classList.add('hidden');   
        create_drop_W(vertical[val],number,val);
    }
    else{
        const hide = document.querySelector('.show_'+prev[0]+'_season_'+prev[1]); 
        hide.classList.add('hidden');
    }

    if(number!==0)
        prev = [val,number];
    console.log(prev);
}

function checkAll(event){
    const present = event.currentTarget;
    const num = present.className.split('_')[1];    
    const cbox = document.querySelector('.cbox_'+num);
    const check_box_ep = document.querySelectorAll('.check_box_'+num);
    if(cbox.checked){
    check_box_ep.forEach(
        check =>{
            check.checked = true;
        }
    );
    }
    else{
        check_box_ep.forEach(
            check =>{
                check.checked = false;
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
    console.log(totalTime + ' min');
}

