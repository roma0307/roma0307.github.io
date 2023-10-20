

// Функция для обновления цветов штатов на карте
function displayStateData() {
    const mapObject = document.getElementById("map");
    const svgDocument = mapObject.contentDocument;

    // Проверяем, есть ли данные в sessionStorage
    const storedStateData = JSON.parse(sessionStorage.getItem('stateData'));

    for (const stateId in stateData) {
        const state = stateData[stateId];
        const stateElement = svgDocument.querySelector(`.${stateId}`);
        if (stateElement) {
            if (storedStateData) {
                // Если данные есть в sessionStorage, используем их
                stateElement.setAttribute("fill", storedStateData[stateId].ownership === "neutral" ? "gray" : playerData[storedStateData[stateId].ownership].color);
                                       // Проверка, был ли уже установлен обработчик
                if (!stateElement.hasClickHandler) {
                    // Создаем функцию-обработчик клика для штата
                    const clickHandler = () => {
                        // Получаем данные о штате
                            const storedStateData = JSON.parse(sessionStorage.getItem('stateData'));

                                                 // Проверьте, есть ли данные о штате в storedStateData
                            if (storedStateData && storedStateData[stateId]) {
                                const storedState = storedStateData[stateId]; // Получите данные о штате из storedStateData
                                const stateName = storedState.name;
                                const ownership = storedState.ownership;
                                const defensePoints = storedState.defense;

                                alert(`Название штата: ${stateName}\nПринадлежность игроку: ${ownership}\nОчки защиты: ${defensePoints}`);
                            } else {
                                // Данные о штате не найдены, обработайте эту ситуацию, как вам удобно
                                alert(`Данные о штате ${stateName} не найдены.`);
                            }
                        };

                    // Добавляем обработчик клика
                    stateElement.addEventListener('click', clickHandler);
                    stateElement.hasClickHandler = true; // Устанавливаем флаг
                }
            } else {
                // Иначе, используем начальные данные
                stateElement.setAttribute("fill", state.ownership === "neutral" ? "gray" : playerData[state.ownership].color);
            }
        } else {
            console.log(`State ${stateId} element not found in SVG.`);
        }
    }
}


function updatePlayerInfo(playerId) {
    const playerInfo = document.getElementById("playerInfo");
    const incomePerSecondElement = document.getElementById("incomePerSecond");
    const attackPerSecondElement = document.getElementById("attackPerSecond");

    const totalMoneyElement = document.getElementById("totalMoney");
    const attackPointsElement = document.getElementById("attackPoints");

    const playerData = JSON.parse(sessionStorage.getItem('playerData'));
    const player = playerData[playerId];

    // Обновляем информацию об игроке, включая показатель атаки
    incomePerSecondElement.textContent = player.income_per_sec;
    attackPerSecondElement.textContent = player.attack_per_sec;
    totalMoneyElement.textContent = player.total_money;
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
    // Перерисовываем карту
    displayStateData();
}

function updatePlayerTable() {
    // Получаем данные из SessionStorage
    const sessionData = JSON.parse(sessionStorage.getItem('playerData'));

    // Создаем массив игроков
    const players = [];
    for (const playerId in sessionData) {
        const player = sessionData[playerId];
        players.push({
            id: playerId,
            name: player.name,
            totalMoney: player.total_money,
            moneypersec: player.income_per_sec,
            persec: player.attack_per_sec,
            ownedStates: player.owned_states.length,
        });
    }

    // Отсортировать массив игроков по количеству владеемых штатов
    players.sort((a, b) => b.ownedStates - a.ownedStates);

    // Создаем таблицу HTML
    const table = document.createElement("table");
    table.classList.add("player-table");

    // Создаем заголовки таблицы
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = ["name", "$ total", "$ / sec", "attack", "regs"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Создаем строки таблицы с данными игроков
    const tbody = table.createTBody();
    players.forEach(player => {
        const row = tbody.insertRow();
        row.classList.add("player-row");

        const cellName = row.insertCell();
        cellName.textContent = player.name;

        const cellMoney = row.insertCell();
        cellMoney.textContent = player.totalMoney;

        const cellMon = row.insertCell();
        cellMon.textContent = player.moneypersec;

        const cellPer = row.insertCell();
        cellPer.textContent = player.persec;

        const cellOwnedStates = row.insertCell();
        cellOwnedStates.textContent = player.ownedStates;
    });

    // Находим ваш DIV (замените "your-div-id" на идентификатор вашего DIV)
    const yourDiv = document.getElementById("table");

    // Очищаем ваш DIV перед обновлением
    yourDiv.innerHTML = '';

    // Вставляем новую таблицу в ваш DIV
    yourDiv.appendChild(table);
}

// Обновлять таблицу каждую секунду
setInterval(updatePlayerTable, 1000);


window.addEventListener("load", () => {
    // Загрузка данных и SessionStorage
    if (!sessionStorage.getItem('playerData')) {
        // Если данных нет в SessionStorage, загрузите их из data.js
        const initialPlayerData = playerData;
        sessionStorage.setItem('playerData', JSON.stringify(initialPlayerData));
    }

    if (!sessionStorage.getItem('stateData')) {
        // Если данных нет в SessionStorage, загрузите их из data.js
        const initialStateData = stateData;
        sessionStorage.setItem('stateData', JSON.stringify(initialStateData));
    }

    // Проверка статуса игроков каждую секунду
    setInterval(updateGameStatus, 1000);


    displayStateData();
    updatePlayerInfo("player5");
});

// Обработчик события для кнопки "Технологии"
const closeTechnologiesButton = document.getElementById("technologies-btn");
closeTechnologiesButton.addEventListener("click", () => {
    window.location.href = "technologies.html";
});

// Получите кнопку "Начать сначала" по ее id
const resetButton = document.getElementById("resetButton");

// Добавьте обработчик события при клике на кнопку
resetButton.addEventListener("click", () => {
    // Удалите данные из SessionStorage
    sessionStorage.removeItem("playerData");
    sessionStorage.removeItem("stateData");

    // Перезагрузите страницу, чтобы загрузить данные изначально
    window.location.reload();
});



const help = document.getElementById("help");
help.addEventListener("click", () => {
    alert("Вы начинаете в штате California. Ваша задача — стать самым главным государством на материке.  Для этого вы должны прокачивать технологии, зарабатывать деньги и завоевывать новые регионы.");
    alert("На главном экране вы увидите карту регионов. Справа вверху отображены ваши показатели бюджета и очков влияния (а рядом скорость их набора) — очки влияния тратятся на завоевание соседних регионов.");
    alert("Регионы присоединяются к вашему государству автоматически, как только ваши очки влияния станут больше, чем у соседнего региона. Для ускорения получения денег и очков влияния нужно прокачивать технологии, на отдельном экране вы можете потратить деньги на прокачку технологий.");
});

// Проверьте, был ли тур завершен
const tourCompleted = localStorage.getItem("tourCompleted");

if (!tourCompleted) {
    // Если тур не завершен, покажите сообщение с помощью alert
    alert("Вы начинаете в штате California. Ваша задача — стать самым главным государством на материке. Для этого вы должны прокачивать технологии, зарабатывать деньги и завоевывать новые регионы.");
    alert("На главном экране вы увидите карту регионов. Справа вверху отображены ваши показатели бюджета и очков влияния (а рядом скорость их набора) — очки влияния тратятся на завоевание соседних регионов.");
    alert("Регионы присоединяются к вашему государству автоматически, как только ваши очки влияния станут больше, чем у соседнего региона. Для ускорения получения денег и очков влияния нужно прокачивать технологии, на отдельном экране вы можете потратить деньги на прокачку технологий.");

    localStorage.setItem("tourCompleted", "true");
}
