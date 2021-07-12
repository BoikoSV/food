(function(){
    const menu = document.querySelector('.menu');
    const button = menu.querySelector('#hamburger-icon');
    const menuList = menu.querySelector('.menu__list');


    function toggleBtn(){
        button.classList.toggle('active');
    }

    function hiddenBtn(){
        if(document.documentElement.offsetWidth >= 769){
            button.style.display = 'none';
        }
        if(document.documentElement.offsetWidth < 769){
            button.style.display = 'inline-block';
        }
    }
    hiddenBtn();

    function toggleMenu(){
        menuList.classList.toggle('header__menu-list--open');
        if(menuList.classList.contains('header__menu-list--open')){
            menuList.classList.remove('header__menu-list--close');
        }else{
            menuList.classList.add('header__menu-list--close');
        }
    }

    function closeMenu(){
        button.classList.remove('active');
        menuList.classList.remove('header__menu-list--open');
        menuList.classList.remove('header__menu-list--close');
    }

    button.addEventListener('click', function(){
        toggleBtn();
        toggleMenu();
    })

    window.addEventListener('resize', function(){
        if(document.documentElement.clientWidth >= 769){
            closeMenu();
        }
        hiddenBtn();
    })

})();