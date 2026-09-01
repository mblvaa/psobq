const QUESTS = [
  {
    day: 1,
    title: "Первый день в аптеке",
    topic: "Введение в психологию общения",
    enabled: true,
    password: "day1"
  },

  {
    day: 2,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    day: 3,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    day: 4,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    day: 5,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    day: 6,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  }
];


/* =========================================================
   ОБЪЕКТЫ КОМНАТЫ
========================================================= */

const OBJECTS = [

  {
    id: "phone",
    name: "Телефон",
    x: 10.5,
    y: 79,
    width: 13,
    height: 22,
    active: true
  },

  {
    id: "computer",
    name: "Компьютер",
    x: 28,
    y: 72,
    width: 22,
    height: 29,
    active: true
  },

  {
    id: "journal",
    name: "Журнал",
    x: 51,
    y: 80,
    width: 19,
    height: 22,
    active: true
  },

  {
    id: "medicineCabinet",
    name: "Шкаф препаратов",
    x: 19,
    y: 31,
    width: 18,
    height: 47,
    active: true
  },

  {
    id: "fridge",
    name: "Холодильник",
    x: 5.5,
    y: 47,
    width: 11,
    height: 41,
    active: true
  },

  {
    id: "cashbox",
    name: "Касса",
    x: 72.5,
    y: 80,
    width: 20,
    height: 22,
    active: true
  },

  {
    id: "safe",
    name: "Сейф",
    x: 61,
    y: 47,
    width: 11,
    height: 31,
    active: true
  },

  {
    id: "locker",
    name: "Служебный шкафчик",
    x: 49.5,
    y: 42,
    width: 13,
    height: 43,
    active: true
  },

  {
    id: "box",
    name: "Коробка",
    x: 39,
    y: 51,
    width: 9,
    height: 15,
    active: true
  },

  {
    id: "board",
    name: "Доска объявлений",
    x: 31,
    y: 28,
    width: 11,
    height: 19,
    active: true
  },

  {
    id: "clock",
    name: "Часы",
    x: 33,
    y: 12,
    width: 8,
    height: 12,
    active: true
  },

  {
    id: "calendar",
    name: "Календарь",
    x: 40,
    y: 28,
    width: 7,
    height: 16,
    active: true
  },

  {
    id: "trash",
    name: "Корзина",
    x: 83,
    y: 61,
    width: 8,
    height: 18,
    active: true
  },

  {
    id: "firstAid",
    name: "Аптечка",
    x: 35.5,
    y: 39,
    width: 9,
    height: 11,
    active: true
  },

  {
    id: "door",
    name: "Дверь",
    x: 76,
    y: 39,
    width: 13,
    height: 43,
    active: true
  }

];


/* =========================================================
   УЧЕБНЫЕ ЗАДАНИЯ

   Пока прописаны вручную.

   Позже эти данные будет создавать
   администратор через редактор.
========================================================= */

const QUESTIONS = {

  phone: {
    title: "Телефон",
    text: "Что является предметом изучения психологии?",

    options: [
      "Закономерности возникновения, развития и функционирования психики",
      "Только строение головного мозга",
      "Только поведение человека в обществе",
      "Способы лечения психических заболеваний"
    ],

    correct: 0
  },


  locker: {
    title: "Карточка в шкафчике",

    text:
      "Какое понятие обозначает свойство высокоорганизованной материи отражать объективную действительность?",

    options: [
      "Психика",
      "Общение",
      "Темперамент",
      "Память"
    ],

    correct: 0
  }

};


/* =========================================================
   СОСТОЯНИЕ ИГРЫ

   Вот это уже настоящая механика.
========================================================= */

const gameState = {

  phoneSolved: false,

  fridgeClueKnown: false,

  fridgeSearched: false,

  smallKeyFound: false,

  lockerOpened: false,

  lockerSolved: false,

  digit7Found: false

};


/* =========================================================
   ИНВЕНТАРЬ И ЗАМЕТКИ
========================================================= */

let inventory = [];

let foundNotes = [];


/* =========================================================
   ЭЛЕМЕНТЫ
========================================================= */

const screens = {

  start:
    document.getElementById("start-screen"),

  login:
    document.getElementById("login-screen"),

  game:
    document.getElementById("game-screen")

};


const overlay =
  document.getElementById("overlay");


const overlayContent =
  document.getElementById("overlay-content");


const passwordInput =
  document.getElementById("quest-password");


const passwordError =
  document.getElementById("password-error");


let selectedQuest =
  QUESTS[0];


/* =========================================================
   ЭКРАНЫ
========================================================= */

function showScreen(name) {

  Object
    .values(screens)
    .forEach(screen => {

      screen.classList.remove(
        "screen--active"
      );

    });


  screens[name]
    .classList.add(
      "screen--active"
    );

}


/* =========================================================
   СТАРТОВАЯ СТРАНИЦА
========================================================= */

function renderDays() {

  const grid =
    document.getElementById(
      "days-grid"
    );


  grid.innerHTML = "";


  QUESTS.forEach(quest => {

    const button =
      document.createElement(
        "button"
      );


    button.className =
      "day-btn";


    button.disabled =
      !quest.enabled;


    button.innerHTML = `
      <strong>
        ДЕНЬ ${quest.day}
      </strong>

      <span>
        ${quest.title}
      </span>
    `;


    button.addEventListener(
      "click",
      () => {

        selectedQuest =
          quest;


        document
          .getElementById(
            "login-day-label"
          )
          .textContent =
          `ДЕНЬ ${quest.day}`;


        document
          .getElementById(
            "login-title"
          )
          .textContent =
          quest.title;


        document
          .getElementById(
            "login-topic"
          )
          .textContent =
          quest.topic;


        passwordInput.value =
          "";


        passwordError.textContent =
          "";


        showScreen(
          "login"
        );

      }
    );


    grid.appendChild(
      button
    );

  });

}


/* =========================================================
   ИНТЕРАКТИВНЫЕ ОБЛАСТИ
========================================================= */

function renderHotspots() {

  const host =
    document.getElementById(
      "hotspots"
    );


  host.innerHTML = "";


  OBJECTS
    .filter(object => object.active)
    .forEach(object => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "hotspot";


      button.style.left =
        `${object.x}%`;


      button.style.top =
        `${object.y}%`;


      button.style.width =
        `${object.width}%`;


      button.style.height =
        `${object.height}%`;


      button.title =
        object.name;


      button.setAttribute(
        "aria-label",
        object.name
      );


      button.addEventListener(
        "click",
        () => {

          tapEffect(
            button
          );


          openObject(
            object.id
          );

        }
      );


      host.appendChild(
        button
      );

    });

}


/* =========================================================
   ЭФФЕКТ ТАПА
========================================================= */

function tapEffect(button) {

  button.classList.add(
    "hotspot--tap"
  );


  setTimeout(
    () => {

      button.classList.remove(
        "hotspot--tap"
      );

    },

    220
  );

}


/* =========================================================
   РАБОТА С ПРЕДМЕТАМИ
========================================================= */

function openObject(id) {

  if (id === "phone") {

    openPhone();

    return;
  }


  if (id === "fridge") {

    openFridge();

    return;
  }


  if (id === "locker") {

    openLocker();

    return;
  }


  if (id === "door") {

    openOverlay(`
      <h3>
        Выход
      </h3>

      <div class="locked-box">
        Дверь заперта.
        Рядом электронный кодовый замок.
      </div>

      <p>
        Пока у вас недостаточно информации,
        чтобы подобрать код.
      </p>
    `);

    return;
  }


  if (id === "cashbox") {

    openOverlay(`
      <h3>
        Касса
      </h3>

      <div class="locked-box">
        Касса закрыта на ключ.
      </div>
    `);

    return;
  }


  if (id === "computer") {

    openOverlay(`
      <h3>
        Компьютер
      </h3>

      <p>
        Система просит пароль.
      </p>

      <p class="meta-note">
        Эту ветку мы подключим следующей.
      </p>
    `);

    return;
  }


  if (id === "journal") {

    openOverlay(`
      <h3>
        Журнал учета
      </h3>

      <p>
        Журнал выглядит важным.
      </p>

      <p class="meta-note">
        В следующей ветке здесь появится
        задание на этапы развития психологии.
      </p>
    `);

    return;
  }


  if (id === "medicineCabinet") {

    openOverlay(`
      <h3>
        Шкаф препаратов
      </h3>

      <p>
        На полках множество упаковок.
      </p>

      <p class="meta-note">
        Позже отсюда начнется третья
        игровая ветка.
      </p>
    `);

    return;
  }


  const names = {

    safe:
      "Сейф",

    box:
      "Коробка",

    board:
      "Доска объявлений",

    clock:
      "Часы",

    calendar:
      "Календарь",

    trash:
      "Корзина",

    firstAid:
      "Аптечка"

  };


  openOverlay(`
    <h3>
      ${names[id] || "Предмет"}
    </h3>

    <p>
      Пока здесь ничего полезного
      обнаружить не удалось.
    </p>
  `);

}


/* =========================================================
   ТЕЛЕФОН
========================================================= */

function openPhone() {

  if (
    gameState.phoneSolved
  ) {

    openOverlay(`
      <h3>
        Телефон
      </h3>

      <p>
        В трубке больше ничего нет.
      </p>

      <div class="clue-card">
        Последнее сообщение:
        <strong>
          «Ищите там, где всегда холодно».
        </strong>
      </div>
    `);

    return;
  }


  openQuestion(
    QUESTIONS.phone,

    () => {

      gameState.phoneSolved =
        true;


      gameState.fridgeClueKnown =
        true;


      addNote(
        "Телефон: «Ищите там, где всегда холодно»."
      );


      openOverlay(`
        <h3>
          Верно!
        </h3>

        <div class="success-box">
          Из трубки слышится короткое сообщение:
        </div>

        <div class="clue-card">
          «Если хотите выбраться,
          ищите там, где всегда холодно».
        </div>

        <p>
          Подсказка добавлена
          в заметки.
        </p>
      `);

    }

  );

}


/* =========================================================
   ХОЛОДИЛЬНИК
========================================================= */

function openFridge() {

  if (
    !gameState.fridgeClueKnown
  ) {

    openOverlay(`
      <h3>
        Холодильник
      </h3>

      <p>
        Холодильник заполнен препаратами.
      </p>

      <p>
        Сейчас ничего необычного
        вы не замечаете.
      </p>
    `);

    return;
  }


  if (
    !gameState.smallKeyFound
  ) {

    openOverlay(`
      <h3>
        Холодильник
      </h3>

      <p>
        После телефонной подсказки
        вы осматриваете холодильник
        внимательнее.
      </p>

      <div class="success-box">
        За одной из упаковок
        обнаруживается маленький ключ.
      </div>

      <button
        class="object-action-btn"
        id="take-small-key"
      >
        🔑 Забрать ключ
      </button>
    `);


    document
      .getElementById(
        "take-small-key"
      )
      .addEventListener(
        "click",
        () => {

          gameState.fridgeSearched =
            true;


          gameState.smallKeyFound =
            true;


          addInventoryItem({
            id: "smallKey",
            icon: "🔑",
            name: "Маленький ключ"
          });


          openOverlay(`
            <h3>
              Ключ найден
            </h3>

            <p>
              Маленький ключ добавлен
              в инвентарь.
            </p>

            <p>
              Теперь осталось понять,
              что именно он открывает.
            </p>
          `);

        }
      );


    return;
  }


  openOverlay(`
    <h3>
      Холодильник
    </h3>

    <p>
      Вы уже нашли здесь
      маленький ключ.
    </p>
  `);

}


/* =========================================================
   СЛУЖЕБНЫЙ ШКАФЧИК
========================================================= */

function openLocker() {

  if (
    !gameState.lockerOpened
  ) {

    if (
      !hasInventoryItem(
        "smallKey"
      )
    ) {

      openOverlay(`
        <h3>
          Служебный шкафчик
        </h3>

        <div class="locked-box">
          Шкафчик заперт.
        </div>

        <p>
          На дверце обычная
          небольшая замочная скважина.
        </p>
      `);

      return;
    }


    openOverlay(`
      <h3>
        Служебный шкафчик
      </h3>

      <p>
        У вас есть маленький ключ.
      </p>

      <button
        class="object-action-btn"
        id="use-small-key"
      >
        🔑 Использовать ключ
      </button>
    `);


    document
      .getElementById(
        "use-small-key"
      )
      .addEventListener(
        "click",
        () => {

          removeInventoryItem(
            "smallKey"
          );


          gameState.lockerOpened =
            true;


          openOverlay(`
            <h3>
              Шкафчик открыт
            </h3>

            <p>
              Ключ подошел.
            </p>

            <p>
              На внутренней стороне дверцы
              прикреплена карточка
              с вопросом.
            </p>

            <button
              class="primary-btn"
              id="locker-question-btn"
            >
              Прочитать карточку
            </button>
          `);


          document
            .getElementById(
              "locker-question-btn"
            )
            .addEventListener(
              "click",
              openLockerQuestion
            );

        }
      );


    return;
  }


  if (
    !gameState.lockerSolved
  ) {

    openLockerQuestion();

    return;
  }


  openOverlay(`
    <h3>
      Служебный шкафчик
    </h3>

    <p>
      Шкафчик открыт.
    </p>

    <div class="clue-card">
      Найденная цифра:
      <strong>7</strong>
    </div>
  `);

}


/* =========================================================
   ЗАДАНИЕ В ШКАФЧИКЕ
========================================================= */

function openLockerQuestion() {

  openQuestion(
    QUESTIONS.locker,

    () => {

      gameState.lockerSolved =
        true;


      gameState.digit7Found =
        true;


      addNote(
        "Найдена цифра: 7."
      );


      openOverlay(`
        <h3>
          Верно!
        </h3>

        <p>
          За карточкой обнаруживается
          небольшая металлическая пластинка.
        </p>

        <div class="clue-card">
          На ней выгравирована цифра:
          <strong style="font-size: 32px;">
            7
          </strong>
        </div>

        <p>
          Цифра сохранена
          в заметках.
        </p>
      `);

    }
  );

}


/* =========================================================
   УНИВЕРСАЛЬНОЕ ЗАДАНИЕ
========================================================= */

function openQuestion(
  question,
  onSuccess
) {

  const options =
    question.options
      .map(
        (option, index) => `
          <button
            class="choice-btn"
            data-answer="${index}"
          >
            ${option}
          </button>
        `
      )
      .join("");


  openOverlay(`
    <h3>
      ${question.title}
    </h3>

    <p>
      ${question.text}
    </p>

    <div class="choice-list">
      ${options}
    </div>

    <p
      id="question-feedback"
      class="error-text"
    ></p>
  `);


  overlayContent
    .querySelectorAll(
      "[data-answer]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const answer =
            Number(
              button.dataset.answer
            );


          if (
            answer ===
            question.correct
          ) {

            onSuccess();

          }

          else {

            document
              .getElementById(
                "question-feedback"
              )
              .textContent =
              "Ответ неверный. Попробуйте еще раз.";

          }

        }
      );

    });

}


/* =========================================================
   ИНВЕНТАРЬ
========================================================= */

function addInventoryItem(
  item
) {

  if (
    hasInventoryItem(
      item.id
    )
  ) {

    return;
  }


  inventory.push(
    item
  );


  renderInventory();

}


function removeInventoryItem(
  id
) {

  inventory =
    inventory.filter(
      item =>
        item.id !== id
    );


  renderInventory();

}


function hasInventoryItem(
  id
) {

  return inventory.some(
    item =>
      item.id === id
  );

}


/* =========================================================
   ЗАМЕТКИ
========================================================= */

function addNote(
  text
) {

  if (
    foundNotes.includes(
      text
    )
  ) {

    return;
  }


  foundNotes.push(
    text
  );

}


/* =========================================================
   ОТРИСОВКА ИНВЕНТАРЯ
========================================================= */

function renderInventory() {

  const slots =
    document.getElementById(
      "inventory-slots"
    );


  slots.innerHTML =
    "";


  for (
    let i = 0;
    i < 6;
    i++
  ) {

    const slot =
      document.createElement(
        "div"
      );


    slot.className =
      "inventory-slot";


    if (
      inventory[i]
    ) {

      slot.innerHTML = `
        <span style="font-size: 22px;">
          ${inventory[i].icon}
        </span>
      `;


      slot.title =
        inventory[i].name;

    }


    slots.appendChild(
      slot
    );

  }

}


/* =========================================================
   МОДАЛЬНОЕ ОКНО
========================================================= */

function openOverlay(
  html
) {

  overlayContent.innerHTML =
    html;


  overlay.hidden =
    false;

}


function closeOverlay() {

  overlay.hidden =
    true;

}


/* =========================================================
   ПАРОЛЬ
========================================================= */

document
  .getElementById(
    "enter-quest"
  )
  .addEventListener(
    "click",
    () => {

      if (
        passwordInput
          .value
          .trim() !==
        selectedQuest.password
      ) {

        passwordError.textContent =
          "Неверный пароль";

        return;

      }


      showScreen(
        "game"
      );


      requestAnimationFrame(
        () => {

          if (
            window.innerWidth
            < 760
          ) {

            document
              .getElementById(
                "scene-wrap"
              )
              .scrollLeft =
              180;

          }

        }
      );

    }
  );


passwordInput
  .addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        document
          .getElementById(
            "enter-quest"
          )
          .click();

      }

    }
  );


/* =========================================================
   КНОПКИ
========================================================= */

document
  .getElementById(
    "back-to-start"
  )
  .addEventListener(
    "click",
    () => {

      showScreen(
        "start"
      );

    }
  );


document
  .getElementById(
    "overlay-close"
  )
  .addEventListener(
    "click",
    closeOverlay
  );


overlay
  .addEventListener(
    "click",
    event => {

      if (
        event.target === overlay
      ) {

        closeOverlay();

      }

    }
  );


/* =========================================================
   ОКНО ИНВЕНТАРЯ
========================================================= */

document
  .getElementById(
    "inventory-btn"
  )
  .addEventListener(
    "click",
    () => {

      const content =
        inventory.length

          ? inventory
              .map(
                item => `
                  <div class="inventory-item">

                    <div class="inventory-item__icon">
                      ${item.icon}
                    </div>

                    <div>
                      ${item.name}
                    </div>

                  </div>
                `
              )
              .join("")

          : `
              <p>
                Пока пусто.
              </p>
            `;


      openOverlay(`
        <h3>
          Инвентарь
        </h3>

        ${content}
      `);

    }
  );


/* =========================================================
   ЗАМЕТКИ
========================================================= */

document
  .getElementById(
    "notes-btn"
  )
  .addEventListener(
    "click",
    () => {

      const content =
        foundNotes.length

          ? foundNotes
              .map(
                note => `
                  <div class="clue-card">
                    ${note}
                  </div>
                `
              )
              .join("")

          : `
              <p>
                Пока ничего
                не найдено.
              </p>
            `;


      openOverlay(`
        <h3>
          Заметки
        </h3>

        ${content}
      `);

    }
  );


/* =========================================================
   ПОДСКАЗКА
========================================================= */

document
  .getElementById(
    "hint-btn"
  )
  .addEventListener(
    "click",
    () => {

      let hint =
        "Осмотритесь. Возможно, стоит начать с телефона.";


      if (
        gameState.phoneSolved &&
        !gameState.smallKeyFound
      ) {

        hint =
          "Телефон говорил о месте, где всегда холодно.";

      }


      else if (
        gameState.smallKeyFound &&
        !gameState.lockerOpened
      ) {

        hint =
          "У вас появился маленький ключ. Осмотрите предметы с замочными скважинами.";

      }


      else if (
        gameState.lockerOpened &&
        !gameState.lockerSolved
      ) {

        hint =
          "В открытом шкафчике осталась карточка.";

      }


      else if (
        gameState.digit7Found
      ) {

        hint =
          "Первая часть пути пройдена. В комнате должны быть и другие ветки.";

      }


      openOverlay(`
        <h3>
          Подсказка
        </h3>

        <p>
          ${hint}
        </p>
      `);

    }
  );


/* =========================================================
   МЕНЮ
========================================================= */

document
  .getElementById(
    "menu-btn"
  )
  .addEventListener(
    "click",
    () => {

      openOverlay(`
        <h3>
          Меню
        </h3>

        <p>
          День 1 —
          Первый день в аптеке
        </p>

        <p class="meta-note">
          Перезапуск и сохранение
          прохождения добавим позже.
        </p>
      `);

    }
  );


/* =========================================================
   ЗАПУСК
========================================================= */

renderDays();

renderHotspots();

renderInventory();
