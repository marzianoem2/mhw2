/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function addHTML(maxchoice, section) {
    const title = section.querySelector('div h1');
    const par = section.querySelector('div p');

    title.textContent = RESULTS_MAP[maxchoice]['title'];
    par.textContent = RESULTS_MAP[maxchoice]['contents'];

    return;
}

function showresults() {
    const section = document.querySelector('.hidden-section');
    let c = 0;
    let maxchoice;
    let maxn = 0;

    section.classList.add('shown');

    for (let j in answers) {
        for (let i in answers) {
            if (answers[j] === answers[i]) {
                c++;
            }
        }

        count[answers[j]] = c;
        c = 0;
    }

    for (let key in count) {
        if (count[key] > maxn) {
            maxn = count[key];
            maxchoice = key;
        }
    }

    addHTML(maxchoice, section);

    return;
}

function onClick(event) {
    const selected = event.currentTarget;
    const img = selected.querySelector('.checkbox');
    const type = selected.dataset.questionId;
    const choice = selected.dataset.choiceId;
    let desel;
    let notselected = document.querySelectorAll('[data-question-id='+type+']');
    let img2;

    answers[type] = choice;

    img.src = 'images/checked.png';
    selected.classList.add('sfondo');
    for (let item of notselected) {
        item.classList.add('nonselezionato');
    }
    selected.classList.remove('nonselezionato');
    
    desel = document.querySelector('.sfondo.nonselezionato');
    if (desel !== null) {
        desel.classList.remove('sfondo');
        img2 = desel.querySelector('.checkbox');
        img2.src = 'images/unchecked.png';
    }
        
    if (Object.keys(answers).length === 3) {
         for (let item of possible_answers) {
            item.removeEventListener('click', onClick);
        }

        showresults();
    }

    return;
}

function resetPage() {
    const section_result = document.querySelector('.hidden-section');
    const p = section_result.querySelector('div p');
    const h1 = section_result.querySelector('div h1');

    p.textContent = '';
    h1.textContent = '';
    for (let item of possible_answers) {
        item.classList.remove('nonselezionato');
        item.classList.remove('sfondo');
        item.querySelector('.checkbox').src = 'images/unchecked.png';
        item.addEventListener('click', onClick);
    }
    section_result.classList.remove('shown');
    for (let i in answers) {
        delete answers[i];
    }
    for (let i in count) {
        delete count[i];
    }

    return;
}

// main
let answers = {}; // chiave question id, valore choice id
let count = {}; // chiave choice id, valore conteggio ricorrenze
const possible_answers = document.querySelectorAll('.choice-grid div');
const button_reset = document.querySelector('.hidden-section div button');

for (let items of possible_answers) {
    items.addEventListener('click', onClick);
}
button_reset.addEventListener('click', resetPage);