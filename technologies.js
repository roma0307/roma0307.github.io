const iconContainers = document.querySelectorAll('.icon-container');
const icons = [];

iconContainers.forEach(container => {
    const containerIcons = container.children;
    icons.push(...containerIcons);
});

// Теперь переменная iconContainer содержит контейнер, а переменная icons содержит все вложенные иконки

const currentPlayer = "player5"; // Замените на текущего игрока
const player = JSON.parse(sessionStorage.getItem('playerData'))[currentPlayer];
const knownTechnologies = player.techs;

// Проверяем, определена ли переменная knownTechnologies и является ли она массивом
if (knownTechnologies && Array.isArray(knownTechnologies)) {
    // Преобразуйте knownTechnologies в множество (Set) для оптимизации проверок
    const knownTechSet = new Set(knownTechnologies);

    // Проходим по иконкам и устанавливаем непрозрачность, если технология неизвестна
    for (const icon of icons) {
        const techId = icon.id;
        // Добавляем обработчик события клика
        icon.addEventListener('click', () => {
        if (knownTechSet.has(techId)) {
                // Показываем поп-ап с информацией о технологии
                showPopup(techId, tech[techId].description,tech[techId].cost, "known");
        } else {
                showPopup(techId, tech[techId].description, tech[techId].cost, "unknown");
                }
        });

        if (!knownTechSet.has(techId)) {
            icon.style.opacity = '0.2';
        }
    }
} else {
    console.error("knownTechnologies не определена или не является массивом");
}


// Переменная для хранения открытого поп-апа
let openPopup = null;

// Функция для создания поп-ап окна с описанием технологии
function createPopupElement(name, description, cost, known) {
    if (known === "known") {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    popup.innerHTML = `
            <div class="popup">
                <div class="background"></div>
                <span  class="popupdesc">${description}</span>
                <span  class="popupcost">Уже улучшено</span>
                <div class="pic"></div>
                <span  class="closeButton">Закрыть</span>
                </div>
            </div>
        `;
            return popup;

    } else {
        const popup = document.createElement("div");
        popup.classList.add("popup");

        popup.innerHTML = `
            <div class="popup">
                <div class="background"></div>
                <span  class="popupdesc">${description}</span>
                <span  class="popupcost">Стоимость $${cost}</span>
                <div class="pic"></div>
                <span  class="closeButton">Закрыть</span>
                <div class="buyButton" id="technologies-btn">
                <div class="popubtn"></div>
                <span class="popubtn-txt">Куплю</span>
                </div>
            </div>
        `;
            return popup;

    }

}

// Функция для закрытия поп-ап окна, просто заново грузим страницу
function closePopup() {
    window.location.href = "technologies.html";
}

// Функция для отображения поп-ап окна
function showPopup(techId, description, cost, known) {
    const popupContainer = document.querySelector(".popup-container");
    const popup = createPopupElement(techId, description, cost, known);

    // Отобразите контейнер и поп-ап
    popupContainer.style.display = "flex"; // Используйте "flex" для центрирования
    document.body.appendChild(popupContainer);
    popupContainer.appendChild(popup);
    // Обновите переменную с открытым поп-апом
    openPopup = popup;
    if (known === 'unknown'){
        // Добавьте обработчик события для кнопки "Купить" в поп-ап окне
        const buyButton = popup.querySelector(".buyButton");
        buyButton.addEventListener("click", () => {
        // Проверьте, хватает ли игроку денег
        const currentPlayer = "player5"; // Замените на текущего игрока
        const playerData = JSON.parse(sessionStorage.getItem('playerData'));
        const player = playerData[currentPlayer];
        if (player.total_money >= cost) {
            // Вычитайте стоимость из общего количества денег игрока
            player.total_money -= cost;
            player.techs.push(techId); // techId должен содержать ID купленной технологии
            // Обновите отображение информации об игроке
            updatePlayerInfo();
            // Закройте поп-ап окно
            closePopup();

            // Обновите данные в SessionStorage
            sessionStorage.setItem('playerData', JSON.stringify(playerData));
            // Обновите отображение иконок технологий на странице
            const iconContainer = document.querySelector('.icon-container');
            const icons = iconContainer.querySelectorAll('.ore, .gold, .diamonds, .oil, .uranium, .oxygen, .h3');

            icons.forEach((icon, index) => {
                const techId = `tech${index + 1}`;
                if (!player.techs.includes(techId)) {
                    icon.style.opacity = '0.2';
                }
        });
        // Закройте поп-ап окно
        closePopup();
        } else {
             alert("Недостаточно денег для покупки!");
        }
    });
    }

}


// Вызов функции для обновления информации об игроке при загрузке страницы
window.addEventListener("load", () => {
    updatePlayerInfo();
});

// Обработчик события для кнопки "Закрыть"
const closeTechnologiesButton = document.getElementById("closeTechnologies");
closeTechnologiesButton.addEventListener("click", () => {

    window.location.href = "index.html"; // Замените на путь к вашей главной странице
});

// Обработчик события для кнопки "Закрыть" внутри поп-ап окна
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("closeButton")) {
        // Закройте поп-ап окно
        closePopup();
    }
});



// Функция для обновления информации об игроке на странице
function updatePlayerInfo() {
    const currentPlayer = "player5"; // Замените на текущего игрока
    const player = JSON.parse(sessionStorage.getItem('playerData'))[currentPlayer];

    const attackPerSecondElement = document.getElementById("attackPerSecond");
    attackPerSecondElement.textContent = player.attack_per_sec;

    const incomePerSecondElement = document.getElementById("incomePerSecond");
    incomePerSecondElement.textContent = player.income_per_sec;

    const totalMoneyElement = document.getElementById("totalMoney");
    totalMoneyElement.textContent = player.total_money;

    const attackPointsElement = document.getElementById("attackPoints");
    attackPointsElement.textContent = player.attack_points;
}


function updateGameStatus() {
    const playerData = JSON.parse(sessionStorage.getItem('playerData'));
    let stateData = JSON.parse(sessionStorage.getItem('stateData'));

    // Проверяем, есть ли данные о штатах в SessionStorage, и если нет, используем начальные данные
    if (!stateData) {
        stateData = initialStateData;
    }
    for (const playerId in playerData) {
        const player = playerData[playerId];
        const playerTechs = player.techs;
        // Переменная для хранения суммы значений value
        let moneyValue = 0;
        let attackValue = 0;
        if (playerId !== 'player5') {
            // Проверяем есть ли деньги у каждого игрока кроме 5 на каждую технологию и делаем покупку если хватает
            for (const techId in tech) {
                if (!player.techs.includes(techId)) {
                    if (player.total_money > tech[techId].cost) {
                        player.total_money -= tech[techId].cost;
                        player.techs.push(techId);
                    }
               }
            }
        }

        // Перебираем techs игрока и считаем сумму value
        playerTechs.forEach(techId => {
            if (tech[techId] && tech[techId].money_value) {
                moneyValue += tech[techId].money_value;
            }
        });
        playerTechs.forEach(techId => {
            if (tech[techId] && tech[techId].attack_value) {
                attackValue += tech[techId].attack_value;
            }
        });
        player.income_per_sec = moneyValue;
                // Золото исходя из количества штатов — мало, то в плюс, много, то в минус
        if (player.owned_states.length < 5) {
                player.income_per_sec += player.owned_states.length * 2;
            }
        else {
            player.income_per_sec -= player.owned_states.length;
            }
        player.attack_per_sec = attackValue
        sessionStorage.setItem('playerData', JSON.stringify(playerData));
    }
    // Перебираем каждого игрока
    for (const playerId in playerData) {
        const player = playerData[playerId];
        player.total_money += player.income_per_sec;
        player.attack_points += player.attack_per_sec; // Увеличиваем атаку на 10
        sessionStorage.setItem('playerData', JSON.stringify(playerData));
        updatePlayerInfo(playerId);

        // Перебираем штаты, которые принадлежат игроку
        for (const stateId of player.owned_states) {
            // Проверяем, существует ли штат с данным stateId в stateData
            if (stateData[stateId]) {
                const state = stateData[stateId];
                const neighboringStates = state.neighbors.filter(
                    neighbor => stateData[neighbor] && stateData[neighbor].ownership !== playerId
                );


                // Перебираем соседей каждого штата
                for (const neighborId of neighboringStates) {
                    // Проверяем, существует ли соседний штат в stateData
                    if (stateData[neighborId]) {
                        const neighborState = stateData[neighborId];

                        //для штата на которого готовится нападение находим соседей, которые принадлежат и не принадлежат игроку
                        const neighboringStatesNei = neighborState.neighbors.filter(
                        neighbor => stateData[neighbor] && stateData[neighbor].ownership !== playerId
                        );
                        const neighboringStatesYai = neighborState.neighbors.filter(
                        neighbor => stateData[neighbor] && stateData[neighbor].ownership == playerId
                        );

                        const own = (neighboringStatesNei.length / (neighboringStatesYai.length + neighboringStatesNei.length));

                        const neighborDefensePoints = neighborState.defense + own * 100;
                        const playerAttackPoints = player.attack_points;

                        // Если у игрока достаточно атаки, он захватывает штат
                        if (playerAttackPoints > neighborDefensePoints) {
                            // Найдем текущего владельца штата
                            const previousOwner = stateData[neighborId].ownership;
                            // Если найден текущий владелец, удалим завоеванный штат у него
                            if (playerData[previousOwner]) {
                                const indexOfConqueredState = playerData[previousOwner].owned_states.indexOf(neighborId);
                                if (indexOfConqueredState !== -1) {
                                    playerData[previousOwner].owned_states.splice(indexOfConqueredState, 1);
                                }
                            }
                            // Вычитаем атаку из защиты соседа
                            player.attack_points -= neighborState.defense;
                            // Штат становится игроку
                            neighborState.ownership = playerId;
                            // Увеличиваем защиту штата
                            neighborState.defense += 50;
                            // Проверяем, не является ли штат дубликатом
                            if (!player.owned_states.includes(neighborId)) {
                                // Добавляем штат в массив принадлежащих игроку
                                player.owned_states.push(neighborId);}
                            // Обновление данных в SessionStorage
                            sessionStorage.setItem('stateData', JSON.stringify(stateData));
                            sessionStorage.setItem('playerData', JSON.stringify(playerData));

                        }
                    }
                }
            }
        }
    }

    // Сохраняем обновленные данные в SessionStorage
    sessionStorage.setItem('stateData', JSON.stringify(stateData));
    sessionStorage.setItem('playerData', JSON.stringify(playerData));

}


window.addEventListener("load", () => {
    // Загрузка данных и SessionStorage
    if (!sessionStorage.getItem('playerData')) {
        // Если данных нет в SessionStorage, загрузите их из data.js
        const initialPlayerData = playerData;
        sessionStorage.setItem('playerData', JSON.stringify(initialPlayerData));
    }

    // Проверка статуса игроков каждую секунду
    setInterval(updateGameStatus, 1000);


    updatePlayerInfo("player5");
});
