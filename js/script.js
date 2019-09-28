'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.list.tags';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorListSelector = '.list.authors';
const optListItemClass = 'item';

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

const calculateTagsParams = (tags) => {
    const params = {
        max: 0,
        min: 9999
    };

    for (let tag in tags) {
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.max);
    }

    return params;
};

const calculateTagClass = (count, params) => {
    const classNumber = Math.floor((count - params.min) / (params.max - params.min) * optCloudClassCount + 1);
    return classNumber;
};

const generateTags = () => {

    let allTags = {};
    let allTagsHtml = '';
    const tagList = document.querySelector(optTagsListSelector);
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
        const articleTags = article.querySelector(optArticleTagsSelector);
        const tags = article.getAttribute('data-tags');
        const tagsArr = tags.split(' ');
        let html = '';

        for (let tag of tagsArr) {
            const tagHtml = `<li><a href="#tag-${tag}">${tag}</a></li>`;
            html += `${tagHtml} `;

            (!Object.prototype.hasOwnProperty.call(allTags, tag)) ? (allTags[tag] = 1) : (allTags[tag]++);
        }
        articleTags.innerHTML = html;
    }

    const tagsParams = calculateTagsParams(allTags);


    for (let tag in allTags) {
        const tagLinkClass = calculateTagClass(allTags[tag], tagsParams);
        allTagsHtml += `<li class="${optListItemClass} ${optCloudClassPrefix}${tagLinkClass}"><a href="#tag-${tag}">${tag}</a></li> `;
    }
    tagList.innerHTML = allTagsHtml;
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

    let allAuthors = {};
    let allAuthorsHtml = '';
    const articles = document.querySelectorAll(optArticleSelector);
    const authorList = document.querySelector(optAuthorListSelector);

    for (let article of articles) {
        const articleAuthor = article.querySelector(optArticleAuthorSelector);
        const author = article.getAttribute('data-author');

        let html = '';

        const authorHtml = `<a href="#author-${author}">${author}</a>`;
        html += `${authorHtml} `;

        (!Object.prototype.hasOwnProperty.call(allAuthors, author)) ? (allAuthors[author] = 1) : (allAuthors[author]++);
        articleAuthor.innerHTML = html;
    }

    for (let author in allAuthors) {
        allAuthorsHtml += `<li><a href="#author-${author}">${author} (${allAuthors[author]})</a></li> `;
    }

    authorList.innerHTML = allAuthorsHtml;
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
