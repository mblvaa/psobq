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


/*
  Все потенциальные объекты комнаты.

  x и y — положение кнопки
  относительно картинки в процентах.
*/

const OBJECTS = [

  {
    id: 1,
    name: "Телефон",
    x: 10.5,
    y: 71.5,
    type: "task",
    active: true
  },

  {
    id: 2,
    name: "Компьютер",
    x: 35.7,
    y: 61.5,
    type: "task",
    active: true
  },

  {
    id: 3,
    name: "Журнал",
    x: 50,
    y: 70.5,
    type: "task",
    active: true
  },

  {
    id: 4,
    name: "Шкаф препаратов",
    x: 21.5,
    y: 28.5,
    type: "task",
    active: true
  },

  {
    id: 5,
    name: "Холодильник",
    x: 9.5,
    y: 45,
    type: "container",
    active: true
  },

  {
    id: 6,
    name: "Касса",
    x: 73.6,
    y: 77.5,
    type: "task",
    active: true
  },

  {
    id: 7,
    name: "Сейф",
    x: 60.5,
    y: 37.5,
    type: "locked",
    active: false
  },

  {
    id: 8,
    name: "Служебный шкафчик",
    x: 51.5,
    y: 34.5,
    type: "locked",
    active: true
  },

  {
    id: 9,
    name: "Коробка",
    x: 40.5,
    y: 50.5,
    type: "container",
    active: false
  },

  {
    id: 10,
    name: "Доска объявлений",
    x: 35,
    y: 24.5,
    type: "clue",
    active: false
  },

  {
    id: 11,
    name: "Часы",
    x: 40,
    y: 14.5,
    type: "clue",
    active: false
  },

  {
    id: 12,
    name: "Календарь",
    x: 45.5,
    y: 29,
    type: "clue",
    active: false
  },

  {
    id: 13,
    name: "Корзина",
    x: 83.8,
    y: 56,
    type: "container",
    active: false
  },

  {
    id: 14,
    name: "Аптечка",
    x: 41.5,
    y: 39,
    type: "container",
    active: false
  },

  {
    id: 15,
    name: "Дверь",
    x: 74,
    y: 39,
    type: "exit",
    active: true
  }
];


/*
  Временные задания.

  Позже все это будет приходить
  из администраторской части.
*/

const demoQuestions = {

  1: {
    title: "Телефон",

    text:
      "Что изучает психология?",

    options: [
      "Закономерности психики и поведения",
      "Только строение мозга",
      "Только межличностные конфликты"
    ],

    correct: 0
  },


  2: {
    title: "Компьютер",

    text:
      "Что из перечисленного ближе всего к понятию психики?",

    options: [
      "Способ отражения действительности",
      "Набор лекарств",
      "Метод измерения температуры"
    ],

    correct: 0
  },


  3: {
    title: "Журнал",

    text:
      "Позже здесь будет задание типа «Последовательность» для этапов развития психологии.",

    options: [
      "Понятно",
      "Еще раз"
    ],

    correct: 0
  },


  4: {
    title: "Шкаф препаратов",

    text:
      "Позже администратор сможет привязать сюда любое задание.",

    options: [
      "Продолжить"
    ],

    correct: 0
  },


  6: {
    title: "Касса",

    text:
      "В финальной версии касса сможет быть закрыта ключом и содержать часть кода выхода.",

    options: [
      "Продолжить"
    ],

    correct: 0
  },


  8: {
    title: "Служебный шкафчик",

    text:
      "Шкафчик можно будет открыть найденным в комнате ключом.",

    options: [
      "Осмотреть замок"
    ],

    correct: 0
  }

};


/* ЭКРАНЫ */

const screens = {

  start:
    document.getElementById("start-screen"),

  login:
    document.getElementById("login-screen"),

  game:
    document.getElementById("game-screen")
};


/* ЭЛЕМЕНТЫ */

const overlay =
  document.getElementById("overlay");

const overlayContent =
  document.getElementById("overlay-content");

const passwordInput =
  document.getElementById("quest-password");

const passwordError =
  document.getElementById("password-error");


/* СОСТОЯНИЕ ИГРЫ */

let selectedQuest = QUESTS[0];

let foundNotes = [];

let inventory = [];


/* ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ */

function showScreen(name) {

  Object.values(screens).forEach(
    screen =>
      screen.classList.remove(
        "screen--active"
      )
  );

  screens[name].classList.add(
    "screen--active"
  );

}


/* СОЗДАНИЕ КНОПОК ДНЕЙ */

function renderDays() {

  const grid =
    document.getElementById("days-grid");

  grid.innerHTML = "";

  QUESTS.forEach(quest => {

    const btn =
      document.createElement("button");

    btn.className = "day-btn";

    btn.disabled =
      !quest.enabled;

    btn.innerHTML = `
      <strong>
        ДЕНЬ ${quest.day}
      </strong>

      <span>
        ${quest.title}
      </span>
    `;

    btn.addEventListener(
      "click",
      () => {

        selectedQuest = quest;

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

        passwordInput.value = "";

        passwordError.textContent = "";

        showScreen("login");

      }
    );

    grid.appendChild(btn);

  });

}


/* ИНТЕРАКТИВНЫЕ ТОЧКИ */

function renderHotspots() {

  const host =
    document.getElementById("hotspots");

  host.innerHTML = "";

  OBJECTS
    .filter(obj => obj.active)
    .forEach(obj => {

      const btn =
        document.createElement("button");

      btn.className = "hotspot";

      btn.style.left =
        `${obj.x}%`;

      btn.style.top =
        `${obj.y}%`;

      btn.textContent =
        obj.id;

      btn.title =
        obj.name;

      btn.setAttribute(
        "aria-label",
        obj.name
      );

      btn.addEventListener(
        "click",
        () => openObject(obj)
      );

      host.appendChild(btn);

    });

}


/* НАЖАТИЕ НА ОБЪЕКТ */

function openObject(obj) {

  /*
    Дверь
  */

  if (obj.type === "exit") {

    openOverlay(`
      <h3>Дверь заперта</h3>

      <p>
        На двери установлен
        электронный кодовый замок.
      </p>

      <p>
        Чтобы выбраться из аптеки,
        придется найти код.
      </p>

      <p class="meta-note">
        В следующей версии здесь уже
        будет настоящее поле ввода кода.
      </p>
    `);

    return;
  }


  /*
    Тайник
  */

  if (
    obj.type === "container" &&
    !demoQuestions[obj.id]
  ) {

    openOverlay(`
      <h3>${obj.name}</h3>

      <p>
        Пока здесь ничего нет.
      </p>

      <p class="meta-note">
        Позже администратор сможет
        спрятать сюда ключ, записку,
        цифру или другой предмет.
      </p>
    `);

    return;
  }


  /*
    Учебное задание
  */

  const question =
    demoQuestions[obj.id];


  if (!question) {

    openOverlay(`
      <h3>${obj.name}</h3>

      <p>
        Сейчас этот объект
        не участвует в квесте.
      </p>
    `);

    return;
  }


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
  `);


  overlayContent
    .querySelectorAll(
      "[data-answer]"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const answer =
            Number(
              btn.dataset.answer
            );


          if (
            answer ===
            question.correct
          ) {

            foundNotes.push(
              `${question.title}: задание выполнено`
            );


            overlayContent.innerHTML = `
              <h3>Верно!</h3>

              <p>
                В настоящем квесте
                здесь появится игровая
                награда.
              </p>

              <p>
                Например:
                ключ, код, пароль
                или новая улика.
              </p>

              <button
                class="primary-btn"
                id="continue-btn"
              >
                Продолжить
              </button>
            `;


            document
              .getElementById(
                "continue-btn"
              )
              .addEventListener(
                "click",
                closeOverlay
              );

          }

          else {

            btn.textContent =
              `${btn.textContent} — попробуйте еще`;

          }

        }
      );

    });

}


/* МОДАЛЬНОЕ ОКНО */

function openOverlay(html) {

  overlayContent.innerHTML = html;

  overlay.hidden = false;

}


function closeOverlay() {

  overlay.hidden = true;

}


/* ИНВЕНТАРЬ */

function renderInventory() {

  const slots =
    document.getElementById(
      "inventory-slots"
    );

  slots.innerHTML = "";


  for (
    let i = 0;
    i < 6;
    i++
  ) {

    const slot =
      document.createElement("div");

    slot.className =
      "inventory-slot";

    slot.textContent =
      inventory[i] || "пусто";

    slots.appendChild(slot);

  }

}


/* НАЗАД */

document
  .getElementById(
    "back-to-start"
  )
  .addEventListener(
    "click",
    () => showScreen("start")
  );


/* ПРОВЕРКА ПАРОЛЯ */

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


      showScreen("game");


      /*
        На мобильном немного
        сдвигаем комнату вправо,
        чтобы стартовый кадр
        выглядел лучше.
      */

      requestAnimationFrame(
        () => {

          document
            .getElementById(
              "scene-wrap"
            )
            .scrollLeft = 260;

        }
      );

    }
  );


/* ЗАКРЫТИЕ ОКНА */

document
  .getElementById(
    "overlay-close"
  )
  .addEventListener(
    "click",
    closeOverlay
  );


overlay.addEventListener(
  "click",
  event => {

    if (
      event.target === overlay
    ) {

      closeOverlay();

    }

  }
);


/* ИНВЕНТАРЬ */

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
                item =>
                  `<p>${item}</p>`
              )
              .join("")

          : "<p>Пока пусто.</p>";


      openOverlay(`
        <h3>Инвентарь</h3>
        ${content}
      `);

    }
  );


/* ЗАМЕТКИ */

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
                note =>
                  `<p>• ${note}</p>`
              )
              .join("")

          : "<p>Пока ничего не найдено.</p>";


      openOverlay(`
        <h3>Заметки</h3>
        ${content}
      `);

    }
  );


/* ПОДСКАЗКА */

document
  .getElementById(
    "hint-btn"
  )
  .addEventListener(
    "click",
    () => {

      openOverlay(`
        <h3>Подсказка</h3>

        <p>
          Осматривайте предметы.
        </p>

        <p>
          Некоторые задания будут
          открывать другие объекты
          или давать предметы
          для инвентаря.
        </p>
      `);

    }
  );


/* МЕНЮ */

document
  .getElementById(
    "menu-btn"
  )
  .addEventListener(
    "click",
    () => {

      openOverlay(`
        <h3>Меню</h3>

        <p>
          Позже здесь появятся:
        </p>

        <p>
          • начать квест заново<br>
          • правила<br>
          • выйти на стартовую страницу
        </p>
      `);

    }
  );


/* СТАРТ */

renderDays();

renderHotspots();

renderInventory();
