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
  Координаты объектов на новой картинке.

  x / y — центр зоны в процентах.
  width / height — размер зоны в процентах.

  Позже мы еще сможем немного
  подправить их по фактическому виду сайта.
*/

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


/*
  Пока только демонстрационные реакции.

  На следующем этапе сюда уже
  подключим состояние игры.
*/

const OBJECT_MESSAGES = {

  phone: {
    title: "Телефон",
    text:
      "Телефон молчит. Но выглядит так, будто он еще пригодится."
  },

  computer: {
    title: "Компьютер",
    text:
      "Экран включен. Для доступа к системе потребуется пароль."
  },

  journal: {
    title: "Журнал учета",
    text:
      "Толстый журнал лежит прямо на рабочем столе. Кажется, его стоит изучить."
  },

  medicineCabinet: {
    title: "Шкаф препаратов",
    text:
      "На полках много упаковок. Возможно, среди них что-то спрятано."
  },

  fridge: {
    title: "Холодильник",
    text:
      "Внутри прохладно. Пока ничего необычного не видно."
  },

  cashbox: {
    title: "Касса",
    text:
      "Касса закрыта на ключ."
  },

  safe: {
    title: "Сейф",
    text:
      "На сейфе кодовый замок. Вы пока не знаете комбинацию."
  },

  locker: {
    title: "Служебный шкафчик",
    text:
      "Шкафчик закрыт. В замке явно должен быть ключ."
  },

  box: {
    title: "Коробка",
    text:
      "Обычная коробка. По крайней мере, на первый взгляд."
  },

  board: {
    title: "Доска объявлений",
    text:
      "На доске несколько записок и служебных объявлений."
  },

  clock: {
    title: "Часы",
    text:
      "Часы идут. Время тоже иногда бывает подсказкой."
  },

  calendar: {
    title: "Календарь",
    text:
      "Обычный календарь. Возможно, дата пригодится позже."
  },

  trash: {
    title: "Корзина",
    text:
      "Вы действительно решили заглянуть в мусорную корзину. Для escape room это разумное решение."
  },

  firstAid: {
    title: "Аптечка",
    text:
      "Аптечка закрыта. Пока нет причин ее открывать."
  },

  door: {
    title: "Выход",
    text:
      "Дверь заперта. Рядом электронный кодовый замок. Нужно найти способ открыть дверь."
  }

};


/* =========================
   ЭЛЕМЕНТЫ ИНТЕРФЕЙСА
========================= */

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


let inventory = [];


let foundNotes = [];


/* =========================
   ЭКРАНЫ
========================= */

function showScreen(name) {

  Object.values(screens)
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


/* =========================
   СТАРТОВАЯ СТРАНИЦА
========================= */

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


/* =========================
   ИГРОВАЯ СЦЕНА
========================= */

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
            object
          );

        }
      );


      host.appendChild(
        button
      );

    });

}


/*
  Небольшая визуальная реакция
  на телефонный тап.
*/

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


/* =========================
   ВЗАИМОДЕЙСТВИЕ С ПРЕДМЕТОМ
========================= */

function openObject(object) {

  const message =
    OBJECT_MESSAGES[
      object.id
    ];


  if (!message) {

    return;

  }


  openOverlay(`
    <h3>
      ${message.title}
    </h3>

    <p>
      ${message.text}
    </p>

    <button
      class="primary-btn"
      id="object-close"
    >
      Продолжить осмотр
    </button>
  `);


  document
    .getElementById(
      "object-close"
    )
    .addEventListener(
      "click",
      closeOverlay
    );

}


/* =========================
   МОДАЛЬНОЕ ОКНО
========================= */

function openOverlay(html) {

  overlayContent.innerHTML =
    html;


  overlay.hidden =
    false;

}


function closeOverlay() {

  overlay.hidden =
    true;

}


/* =========================
   ИНВЕНТАРЬ
========================= */

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


    slot.textContent =
      inventory[i] || "";


    slots.appendChild(
      slot
    );

  }

}


/* =========================
   ПАРОЛЬ
========================= */

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

          const scene =
            document.getElementById(
              "scene-wrap"
            );


          /*
            На мобильном стартуем
            чуть левее центра.
          */

          if (
            window.innerWidth
            < 760
          ) {

            scene.scrollLeft =
              180;

          }

        }
      );

    }
  );


/*
  Enter тоже запускает квест.
*/

passwordInput.addEventListener(
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


/* =========================
   НАВИГАЦИЯ
========================= */

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


/* =========================
   ИНВЕНТАРЬ
========================= */

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


/* =========================
   ЗАМЕТКИ
========================= */

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


/* =========================
   ПОДСКАЗКА
========================= */

document
  .getElementById(
    "hint-btn"
  )
  .addEventListener(
    "click",
    () => {

      openOverlay(`
        <h3>
          Подсказка
        </h3>

        <p>
          Осматривайте комнату.
          Не каждый предмет обязательно
          содержит задание.
        </p>

        <p>
          Некоторые вещи могут
          пригодиться только после того,
          как вы найдете ключ,
          пароль или другую улику.
        </p>
      `);

    }
  );


/* =========================
   МЕНЮ
========================= */

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
          День 1
        </p>

        <p class="meta-note">
          В следующих версиях здесь
          появятся перезапуск квеста
          и выход на стартовую страницу.
        </p>
      `);

    }
  );


/* =========================
   ЗАПУСК
========================= */

renderDays();

renderHotspots();

renderInventory();
