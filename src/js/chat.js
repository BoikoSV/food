(function(){

    const chat = document.querySelector('.chat');           //Весь чат
    const messageList = chat.querySelector('.message__list');   //Список сообщений
    const chatCountText = chat.querySelector('.chat__count-text'); //Показывает количество введенных символов
    const textArea = chat.querySelector('.chat__textarea'); //Текстовое поле
    const chatContent = chat.querySelector('.chat__main');
    const message = 'Lorem ipsum dolor, sit amet consectetur adique quas quod mollitia, quos tempora?';
    

    const settings = {
        isChatOpen: false,
        maxLengthMessage: 100,
        guestStatus: "guest",
        adminStatus: "admin",
        adminName: "Administrator",
        guestName: "Guest"
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

    //Получить текст с текстового поля
    function getTextFromTextarea(){
        let text = textArea.value;
        textArea.value = '';
        return text;
    }

    //Скролить вниз
    function scrollToBottom(){
        chatContent.scrollTop += chatContent.offsetHeight;
    }

    //Получить точное время
    function getTime(){
        let time = new Date();
        return time.getHours() + ':' + time.getMinutes();
    }

    //Проверка на пустоту инпута
    function isEmptyMessage(){
        return textArea.value.trim().length === 0;
    }
    //Создает html сообщение
    function createHtmlMessage(status, message, name, time){
        return `
        <li class="message__item message-item message-item--${status}">
                <p class="message-item__text">
                    ${message}
                </p>
                <div class="message-item__author-info">
                    <p class="message-item__name">${name}</p>
                    <div class="message-item__date-time">${time}</div>
                </div>
            </li>
        `
    }

    //Вставляет сообщение в чат
    function sendMessageToChat(htmlMessage){
        messageList.insertAdjacentHTML('beforeend', htmlMessage);
        scrollToBottom();
    }

    function sendBotMessage(){
        const botMessage = message.slice(0, Math.random() * message.length);
        let htmlMessage = createHtmlMessage('admin', botMessage, settings.adminName, getTime());
                sendMessageToChat(htmlMessage);
    }


    /**
     *  События
     */
    chat.addEventListener('click', function(event){
        //открытие чата
        if(settings.isChatOpen === false){
            openChat();
            scrollToBottom();
            return;
        }
        
        //Закрытие чата
        if(event.target.closest('.chat__header-button')){
            closeChat();
            return;
        }

        if(event.target.closest('.chat__footer-btn')){
            if(!isEmptyMessage()){
                let htmlMessage = createHtmlMessage('guest', getTextFromTextarea(), settings.guestName, getTime());
                sendMessageToChat(htmlMessage);
                setTimeout(sendBotMessage, 2000);
            }
        }
    })

    //Считает количество введенных символов
    textArea.addEventListener('input', function(){
        countSymbols(this.value);
    })

    textArea.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            if(!isEmptyMessage()){
                let htmlMessage = createHtmlMessage('guest', getTextFromTextarea(), settings.guestName, getTime());
                sendMessageToChat(htmlMessage);
                setTimeout(sendBotMessage, 2000);
            }
        }
    })
})();