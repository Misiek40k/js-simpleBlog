'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';

function titleClickHandler(event) {

    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.posts .post.active');
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    targetArticle.classList.add('active');
}

const generateTitleLinks = (customselector = '') => {
    const titleList = document.querySelector(optTitleListSelector);
    const articles = document.querySelectorAll(optArticleSelector + customselector);

    let html = '';

    titleList.innerHTML = '';

    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
        html += linkHTML;
    }

    titleList.insertAdjacentHTML('beforeend', html);

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
};

const generateTags = () => {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
        const articleTags = article.querySelector(optArticleTagsSelector);
        const tags = article.getAttribute('data-tags');
        const tagsArr = tags.split(' ');
        let html = '';

        for (let tag of tagsArr) {
            const tagHtml = `<li><a href="#tag-${tag}">${tag}</a></li>`;
            html += `${tagHtml} `;
        }
        articleTags.innerHTML = html;
    }
};

function tagClickHandler(event) {

    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeLinks = document.querySelectorAll('a.active');
    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

    for (let link of activeLinks) {
        link.classList.remove('active');
    }

    for (let link of tagLinks) {
        link.classList.add('active');
    }

    generateTitleLinks(`[data-tags~="${tag}"]`);
}

const addClickListenersToTags = () => {
    const links = document.querySelectorAll(`a[href^="#tag-"]`);

    for (let link of links) {
        link.addEventListener('click', tagClickHandler);
    }
};

const generateAuthors = () => {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
        const articleAuthor = article.querySelector(optArticleAuthorSelector);
        const author = article.getAttribute('data-author');

        let html = '';

        const authorHtml = `<a href="#author-${author}">${author}</a>`;
        html += `${authorHtml} `;

        articleAuthor.innerHTML = html;
    }
};

function authorClickHandler(event) {

    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeLinks = document.querySelectorAll('a.active');
    const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

    for (let link of activeLinks) {
        link.classList.remove('active');
    }

    for (let link of authorLinks) {
        link.classList.add('active');
    }

    generateTitleLinks(`[data-author="${author}"]`);
}

const addClickListenersToAuthors = () => {
    const links = document.querySelectorAll(`a[href^="#author-"]`);

    for (let link of links) {
        link.addEventListener('click', authorClickHandler);
    }
};

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
