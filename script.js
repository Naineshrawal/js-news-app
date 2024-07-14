const API_KEY = "d07303fd7a0b463fa4c4aab01c58a2a3";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', () => fetchNews('india'));
// function reload(){
//     window.location.reload();
// }

async function fetchNews(query) {
    // console.log(`${url}${query}&apiKey=${API_KEY}`);
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description
    
    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    });
    
    newsSource.innerHTML = `${article.source.name} > ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blanck')
    })
    
}
let currentSelectedNav = null;
function onNavItemClick(id){
    console.log("hii");
    console.log(`${url}${id}&apiKey=${API_KEY}`);
    fetchNews(id)
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active')
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active')
}

const searchBtn = document.getElementById('search-btn');
const searchText = document.querySelector('#search-text');


searchBtn.addEventListener('click', ()=>{
    const query = searchText.value;
    console.log(query);
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active')
    currentSelectedNav = null;

})