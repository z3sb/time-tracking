const main = document.querySelector('main');
const options = document.querySelector('.options');

fetch('./data.json')
.then(res => res.json())
.then((data) => {
  for(let i = 0; i < data.length; i++){
    let box = document.createElement('div');
    box.classList.add('box');

    let content = document.createElement('div');
    content.classList.add('content');

    let title = document.createElement('div');
    title.classList.add('title');

    let p = document.createElement('p');

    let button = document.createElement('button');
    let img = document.createElement('img');
    img.src = './images/icon-ellipsis.svg';
    button.appendChild(img);
    content.appendChild(title);
    for (const [key, value] of Object.entries(data[i])){
      if(key == 'title'){
        p.textContent = value;
        box.classList.add(value.toLowerCase().replace(' ', '-'));
      } else {
        for(let [timeKey, timeValue] of Object.entries(value)){
          let text = document.createElement('div');
          text.classList.add('text');
          for(let [cur, pre] of Object.entries(timeValue)){
            text.classList.add(timeKey);
            if(cur == 'current'){
              var h1 = document.createElement('h1');
              h1.textContent = pre + 'hrs';
              text.appendChild(h1);
            } else{
              let p = document.createElement('p');
              if(timeKey == 'daily'){
                p.textContent = 'Yesterday - '
              }  else if(timeKey == 'weekly'){
                text.classList.add('active')
                p.textContent = 'Last Week - '
              } else{
                p.textContent = 'Last Month - '
              }
              p.textContent += pre + 'hrs';
              text.appendChild(p);
            }
            content.appendChild(text);
          }
        }
      }
    }
    button.appendChild(img);
    title.appendChild(p)
    title.appendChild(button);
    box.appendChild(content);
    main.appendChild(box);
  }
})
options.addEventListener('click', (e) => {
  let target = e.target;
  switch(target.id){
    case 'daily':
    case 'weekly':
    case 'monthly':
      let times = document.querySelectorAll('.box .content .text');
      times.forEach(e => e.classList.remove('active'));
      document.querySelectorAll(`.box .content .${target.id}`).forEach(e => e.classList.add('active'));
      break;
  }
})

let buttons = document.querySelectorAll('.person .options button');
buttons.forEach((e) => {
  e.addEventListener('click', () => {
    buttons.forEach(n => n.classList.remove('active'));
    e.classList.add('active')
  })
})