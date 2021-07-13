(function(){
    const productsList = document.querySelector('.products__list');
    const productsLoad = document.querySelector('.products__load');

    //Достать заданное количество элементов в массиве
    function takeProducts(count){
        return products.splice(0, count);
    }

    //Есть ли еще элементы в массиве
    function isNoEmptyProducts(){
        return products.length > 0;
    }
    //Обернуть один элемент в html
    function wrapOneProductToHtml(product){
       return  `
        <li class="product__item product" data-product-id="${product.productId}">
    <div class="product__img-box">
        <img src="dist/images/${product.productImg}" alt="" class="product__img">
    </div>
    <div class="product__text-box">
        <h4 class="product__title">${product.productName}</h4>
        <p class="product__text">${product.productText}</p>
        <span class="product__price">${product.productPrice}</span>
        <div class="product__stars" data-star="${product.productStar}">
            <form action="" class="product__stars-form">
                <input type="radio" name="star" disabled>
            
        
                ${createRadios(product.productId, product.productStars)}
                
            </form>
        </div>
        <button class="product__add">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.51 0 0 114.497 0 256c0 141.49 114.497 256 256 256 141.49 0 256-114.497 256-256C512 114.51 397.503 0 256 0zm0 477.867c-122.337 0-221.867-99.529-221.867-221.867S133.663 34.133 256 34.133 477.867 133.663 477.867 256 378.337 477.867 256 477.867z"/><path d="M371.345 238.933h-98.278v-98.278c0-9.425-7.641-17.067-17.067-17.067s-17.067 7.641-17.067 17.067v98.278h-98.278c-9.425 0-17.067 7.641-17.067 17.067s7.641 17.067 17.067 17.067h98.278v98.278c0 9.425 7.641 17.067 17.067 17.067s17.067-7.641 17.067-17.067v-98.278h98.278c9.425 0 17.067-7.641 17.067-17.067s-7.642-17.067-17.067-17.067z"/></svg>
        </button>
    </div>
</li>
        `;
    }

    //Создать инпуты с выбранным
    function createRadios(id, stars){
        let radioList = '';
        for(let i = 1; i <= 5; i++){
            radioList += `
            <label for="star-${id}-${i}" class="star star${i}"><span class="icon-star"></span></label>
            <input type="radio" ${(i + '') === stars ? 'checked' : ''} name="star" id="star-${id}-${i}">
            `
        }
        return radioList;
    }

    //в цыкле вывести нужное количество элементов
    function showProducts(count){
        if(isNoEmptyProducts()){
            let portion = takeProducts(count);
            insertPortionToHtml(portion);
        }
        if(!isNoEmptyProducts()){
            productsLoad.remove();
        }
    }

    //Вставить определенное количество продуктов в html
    function insertPortionToHtml(portion){
        portion.forEach(product => {
           productsList.insertAdjacentHTML('beforeend', wrapOneProductToHtml(product))
        });
    }
    showProducts(6) //Вывести первых 6 товаров при загрузки страницы


    productsLoad.addEventListener('click', function(){
        showProducts(6);
        //setTimeout(showProducts, 500, 6);
    })
})();