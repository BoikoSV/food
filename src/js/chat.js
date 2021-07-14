(function(){

    const chat = document.querySelector('.chat');           //Весь чат
    const messageList = chat.querySelector('.message__list');   //Список сообщений
    const chatCountText = chat.querySelector('.chat__count-text'); //Показывает количество введенных символов
    const textArea = chat.querySelector('.chat__textarea');

    const settings = {
        isChatOpen: false,
        maxLengthMessage: 100,
    }

    //Методы которые отрабатывают сразу
    setMaxLengthTextarea();



    //Открыть чат
    function openChat(){
        
        if(settings.isChatOpen === false){
            chat.classList.remove('chat--close');
            chat.classList.add('chat--open');
            settings.isChatOpen = true;
        }
    }

    //Закрытие чата
    function closeChat(){
        if(settings.isChatOpen === true){
            chat.classList.remove('chat--open');
            chat.classList.add('chat--close');
            settings.isChatOpen = false;
        }
    }

    
    //Устанавливает ограничение на количество символов в textarea
    function setMaxLengthTextarea(){
        textArea.maxLength = settings.maxLengthMessage;
    }


    //Считает и выводит введенное количество символов
    function countSymbols(message){
        let max = settings.maxLengthMessage;
        chatCountText.innerHTML = message.length + '/' + max;
        if(message.length === max){
            chatCountText.classList.add('chat__count-text--warning');
        }
        if(message.length < max){
            chatCountText.classList.remove('chat__count-text--warning');
        }
    }



    chat.addEventListener('click', function(event){
        console.log(settings.isChatOpen);
        //открытие чата
        if(settings.isChatOpen === false){
            openChat();
            return;
        }
        
        //Закрытие чата
        if(event.target.closest('.chat__header-button')){
            closeChat();
            return;
        }

    })

    //Считает количество введенных символов
    textArea.addEventListener('input', function(){
        countSymbols(this.value);
    })

    
})();