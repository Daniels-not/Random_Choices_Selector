const choices_tag = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

function createTag(text) {
    // when you press enter its going to create a tag
    // if you use a (',') and then write a tag it will create a tag
    // if you don't use a (',') and you don't write a tag it will not create a tag
    const tag = text.split(',').filter(choice => choice.trim() !== '').map(choice => choice.trim());

    choices_tag.innerHTML = '';

    tag.forEach(choice => {
        const span = document.createElement('span');
        span.classList.add('tag', 'animate__animated', 'animate__fadeIn');
        span.innerText = choice;
        choices_tag.appendChild(span);
    })
}

function randomSelect(){
    const time = 30;

    // make a intermittent with the tags
    const interval = setInterval(() => {
        const randomTag = pickRandomTag();

        highlightTag(randomTag);

        setTimeout(() => {
            endHighlightTag(randomTag);
        } , 100);
    }, 100)

    // stop the intermittent after the time is over
    setTimeout(() => {

        clearInterval(interval);

        setTimeout(() => {
            const randomTag = pickRandomTag();

            highlightTag(randomTag);
        }, 100)

    }, time * 100);
}

// select a random tag
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    const randomTag = tags[Math.floor(Math.random() * tags.length)];
    return randomTag;
}

function highlightTag(tag) {
    tag.classList.add('highlight');
}

function endHighlightTag(tag) {
    tag.classList.remove('highlight');
}

textarea.addEventListener('keydown', function(e) {
    createTag(e.target.value);

    // as soon as you finish typing your choice it will clear the textarea
    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = '';
            randomSelect();
        }, 10)
    }
})
