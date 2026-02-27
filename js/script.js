window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    setTimeout(() => {
        preloader.remove();
        content.style.display = 'block';
        document.body.style.overflow = 'auto';
    }, 2000); // 2 seconds
});

