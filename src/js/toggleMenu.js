(function(){
    const menu = document.querySelector('.menu');
    const button = menu.querySelector('#hamburger-icon');

    
    button.addEventListener('click', function(){
        toggleBtn();
    })

    function toggleBtn(){
        button.classList.toggle('active');
    }
})();