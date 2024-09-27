let input = document.getElementById('input');
let translatedParagraph = document.getElementById('translatedParagraph');
const enButton = document.getElementById('enButton');
const esButton = document.getElementById('esButton');
const frButton = document.getElementById('frButton');
const enButton2 = document.getElementById('enButton2');
const esButton2 = document.getElementById('esButton2');
const frButton2 = document.getElementById('frButton2');
let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');
let langpair1 = 'en';
let langpair2 = 'es';

const updateButtonClasses = () => {
    enButton.classList.toggle('navbar-button-selected', langpair1 === 'en');
    esButton.classList.toggle('navbar-button-selected', langpair1 === 'es');
    frButton.classList.toggle('navbar-button-selected', langpair1 === 'fr');
    select1.classList.toggle('navbar-button-selected', langpair1 === select1.value);
    enButton2.classList.toggle('navbar-button-selected', langpair2 === 'en');
    esButton2.classList.toggle('navbar-button-selected', langpair2 === 'es');
    frButton2.classList.toggle('navbar-button-selected', langpair2 === 'fr');
    select2.classList.toggle('navbar-button-selected', langpair2 === select2.value);
};

function updateLanguage1() {
    langpair1 = select1.value;
    updateButtonClasses();
}

function updateLanguage2() {
    langpair2 = select2.value;
    updateButtonClasses();
}

select1.addEventListener('change', updateLanguage1);
select2.addEventListener('change', updateLanguage2);

enButton.addEventListener('click', () => {
    langpair1 = 'en';
    updateButtonClasses();
});
esButton.addEventListener('click', () => {
    langpair1 = 'es';
    updateButtonClasses();
});
frButton.addEventListener('click', () => {
    langpair1 = 'fr';
    updateButtonClasses();
});
enButton2.addEventListener('click', () => {
    langpair2 = 'en';
    updateButtonClasses();
});
esButton2.addEventListener('click', () => {
    langpair2 = 'es';
    updateButtonClasses();
});
frButton2.addEventListener('click', () => {
    langpair2 = 'fr';
    updateButtonClasses();
});

updateButtonClasses();

function replaceSpaces(text) {
    return text.split(' ').join('%20');
}

const translateText = async () => {
    let text = replaceSpaces(input.value);
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${langpair1}|${langpair2}`);
        const data = await response.json();
        let translatedText = data.responseData.translatedText;
        translatedParagraph.innerText = translatedText;
        console.log(data);
        console.log(translatedText);
    } catch (error) {
        console.log(error);
    }
}

const translateButton = document.getElementById('translateButton');
translateButton.addEventListener('click', translateText);

const copyButton1 = document.getElementById('copyButton1');
copyButton1.addEventListener('click', () => {
    navigator.clipboard.writeText(input.value)
        .then(() => {
            alert('Copied to clipboard');
        })
        .catch(err => {
            console.error('Error to copy to clipboard', err);
        });
});
const copyButton2 = document.getElementById('copyButton2');
copyButton2.addEventListener('click', () => {
    navigator.clipboard.writeText(translatedParagraph.innerText)
        .then(() => {
            alert('Copied to clipboard');
        })
        .catch(err => {
            console.error('Error to copy to clipboard', err);
        });
});