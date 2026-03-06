// unified page loader
window.addEventListener('load', function () {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");

    // 1. Remove the preloader immediately
    if (preloader) preloader.remove();

    // 2. Show the content immediately (no timeout)
    if (content) {
        content.style.display = 'flex';
    }

    // 3. Re-enable scrolling immediately
    document.body.style.overflow = 'auto';
});


// audio autoplay
window.addEventListener('click', () => {
    const audio = document.querySelector('audio');
    audio?.play().catch(e => console.log("Audio waiting for interaction"));
}, { once: true });

// post sliders
let currentIdx = 0;
function moveSlide(direction) {
    const slides = document.getElementById('slides');
    const imgList = document.querySelectorAll('.slides img');
    if (!slides || imgList.length === 0) return;

    currentIdx += direction;
    if (currentIdx >= imgList.length) currentIdx = 0;
    if (currentIdx < 0) currentIdx = imgList.length - 1;

    slides.style.transform = `translateX(${currentIdx * -100}%)`;
}

// hobbies sliders
let hobbyPositions = {
    hobbySlides1: 0,
    hobbySlides2: 0,
    hobbySlides3: 0,
    hobbySlides4: 0
};

function moveHobbySlide(direction, sliderId) {
    const slidesContainer = document.getElementById(sliderId);
    if (!slidesContainer) return; // safety check

    const imgList = slidesContainer.querySelectorAll('img');

    // update position for specific slider
    hobbyPositions[sliderId] += direction;

    // loop logic
    if (hobbyPositions[sliderId] >= imgList.length) {
        hobbyPositions[sliderId] = 0;
    }
    if (hobbyPositions[sliderId] < 0) {
        hobbyPositions[sliderId] = imgList.length - 1;
    }

    // move the container
    const offset = hobbyPositions[sliderId] * -100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
}

// like logic
const likeBtn = document.getElementById('likeBtn');
const likeCountLabel = document.getElementById('likeCount');

if (likeBtn && likeCountLabel) {
    let likes = parseInt(localStorage.getItem('postLikes')) || 142;
    let isLiked = localStorage.getItem('isLiked') === 'true';

    likeCountLabel.innerText = likes;
    if (isLiked) likeBtn.classList.add('liked');

    likeBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        if (isLiked) {
            likes++;
            likeBtn.classList.add('liked');
        } else {
            likes--;
            likeBtn.classList.remove('liked');
        }
        likeCountLabel.innerText = likes;
        localStorage.setItem('postLikes', likes);
        localStorage.setItem('isLiked', isLiked);
    });
}

// -commentinggg
const sendBtn = document.getElementById('sendBtn');
const commentBox = document.getElementById('commentBox');
const commentDisplay = document.getElementById('commentDisplay');

if (sendBtn && commentBox && commentDisplay) {
    sendBtn.addEventListener('click', () => {
        if (commentBox.value.trim() !== "") {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Guest:</strong> ${commentBox.value}`;
            commentDisplay.appendChild(p);
            commentBox.value = "";
        }
    });
}


// contact form
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        contactForm.style.display = 'none';
        successMessage.style.display = 'grid';
    });
}