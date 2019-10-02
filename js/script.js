/* eslint-disable no-undef */
'use strict';

const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.list.tags',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorListSelector: '.list.authors',
    listItemClass: 'item',
};

const templates = {

    articleListItem: Handlebars.compile(document.querySelector('#template-article-listItem').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-authorListLink').innerHTML)
};

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
    const titleList = document.querySelector(opt.titleListSelector);
    const articles = document.querySelectorAll(opt.articleSelector + customselector);

    let html = '';

    titleList.innerHTML = '';

    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
        const linkHTMLData = {href: articleId, title: articleTitle};
        const linkHTML = templates.articleListItem(linkHTMLData);
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
    const classNumber = Math.floor((count - params.min) / (params.max - params.min) * opt.cloudClassCount + 1);
    return classNumber;
};

const generateTags = () => {

    let allTags = {};
    const allTagsData = {tags: []};
    const tagList = document.querySelector(opt.tagsListSelector);
    const articles = document.querySelectorAll(opt.articleSelector);

    for (let article of articles) {
        const articleTags = article.querySelector(opt.articleTagsSelector);
        const tags = article.getAttribute('data-tags');
        const tagsArr = tags.split(' ');
        let html = '';

        for (let tag of tagsArr) {
            const tagHtmlData = {href: `tag-${tag}`, title: tag};
            const tagHtml = templates.articleListItem(tagHtmlData);
            html += `${tagHtml} `;

            (!allTags[tag]) ? (allTags[tag] = 1) : (allTags[tag]++);
        }
        articleTags.innerHTML = html;
    }

    const tagsParams = calculateTagsParams(allTags);


    for (let tag in allTags) {

        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
        });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

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
    let allAuthorsData = {authors: []};
    const articles = document.querySelectorAll(opt.articleSelector);
    const authorList = document.querySelector(opt.authorListSelector);

    for (let article of articles) {
        const articleAuthor = article.querySelector(opt.articleAuthorSelector);
        const author = article.getAttribute('data-author');

        let html = '';

        const authorHtmlData = {author: author};
        const authorHtml = templates.articleAuthor(authorHtmlData);

        html += `${authorHtml} `;

        (!Object.prototype.hasOwnProperty.call(allAuthors, author)) ? (allAuthors[author] = 1) : (allAuthors[author]++);
        articleAuthor.innerHTML = html;
    }

    for (let author in allAuthors) {

        allAuthorsData.authors.push({
            author: author,
            count: allAuthors[author]
        });
    }

    authorList.innerHTML = templates.authorListLink(allAuthorsData);
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
