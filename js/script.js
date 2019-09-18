'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

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

const generateTitleLinks = () => {
    const titleList = document.querySelector(optTitleListSelector);
    const articles = document.querySelectorAll(optArticleSelector);

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

const tagClickHandler = (event) => {
    /* prevent default action for this event */

    /* make new constant named "clickedElement" and give it the value of "this" */

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    /* make a new constant "tag" and extract tag from the "href" constant */

    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
};

const addClickListenersToTags = () => {
    /* find all links to tags */

    /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
};


generateTitleLinks();
generateTags();
addClickListenersToTags();
