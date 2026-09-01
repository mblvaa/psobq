/* =========================================================
   1. СПИСОК КВЕСТОВ
========================================================= */

const QUESTS = [
  {
    id: "day1",
    day: 1,
    title: "Первый день в аптеке",
    topic: "Введение в психологию общения",
    enabled: true,
    password: "day1"
  },

  {
    id: "day2",
    day: 2,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    id: "day3",
    day: 3,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    id: "day4",
    day: 4,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    id: "day5",
    day: 5,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  },

  {
    id: "day6",
    day: 6,
    title: "Смена еще не открыта",
    topic: "",
    enabled: false
  }
];


/* =========================================================
   2. КОНФИГУРАЦИЯ КВЕСТА

   Это содержательная часть.

   Позже эти данные будут загружаться
   из Google Sheets через Apps Script.
========================================================= */

const QUEST_CONFIG = {

  day1: {

    /* =====================================================
       УЧЕБНЫЕ ЗАДАНИЯ
    ===================================================== */

    tasks: {

      psychology: {
        id: "psychology",

        type: "singleChoice",

        title: "Телефон",

        question:
          "Что является предметом изучения психологии?",

        options: [
          "Закономерности возникновения, развития и функционирования психики",
          "Только строение головного мозга",
          "Только поведение человека в обществе",
          "Способы лечения психических заболеваний"
        ],

        correct: 0,

        successEffects: [
          {
            type: "setFlag",
            flag: "phoneSolved"
          },

          {
            type: "setFlag",
            flag: "fridgeClueKnown"
          },

          {
            type: "addNote",
            text:
              "Телефон: «Ищите там, где всегда холодно»."
          }
        ],

        successMessage: `
          <h3>Верно!</h3>

          <div class="success-box">
            Из трубки слышится короткое сообщение.
          </div>

          <div class="clue-card">
            «Если хотите выбраться,
            ищите там, где всегда холодно».
          </div>

          <p>
            Подсказка добавлена в заметки.
          </p>
        `
      },


      psyche: {
        id: "psyche",

        type: "singleChoice",

        title: "Карточка в шкафчике",

        question:
          "Какое понятие обозначает свойство высокоорганизованной материи отражать объективную действительность?",

        options: [
          "Психика",
          "Общение",
          "Темперамент",
          "Память"
        ],

        correct: 0,

        successEffects: [
          {
            type: "setFlag",
            flag: "lockerSolved"
          },

          {
            type: "addNote",
            text:
              "Найдена цифра: 7."
          }
        ],

        successMessage: `
          <h3>Верно!</h3>

          <p>
            За карточкой обнаруживается
            небольшая металлическая пластинка.
          </p>

          <div class="clue-card">
            На ней выгравирована цифра:
            <strong style="font-size:32px;">
              7
            </strong>
          </div>

          <p>
            Цифра сохранена в заметках.
          </p>
        `
      },


      history: {
        id: "history",

        type: "singleChoice",

        title: "Запись в журнале",

        question:
          "Расположите этапы развития представлений о предмете психологии в правильном порядке.",

        options: [
          "Душа → сознание → поведение → психика",
          "Психика → поведение → сознание → душа",
          "Сознание → душа → психика → поведение",
          "Поведение → душа → сознание → психика"
        ],

        correct: 0,

        successEffects: [
          {
            type: "setFlag",
            flag: "journalSolved"
          },

          {
            type: "setFlag",
            flag: "computerPasswordKnown"
          },

          {
            type: "addNote",
            text:
              "В журнале найден пароль: PAVLOV."
          }
        ],

        successMessage: `
          <h3>Верно!</h3>

          <p>
            На полях журнала вы замечаете
            сделанную карандашом запись.
          </p>

          <div class="clue-card">
            <strong>PAVLOV</strong>
          </div>

          <p>
            Похоже на пароль.
          </p>
        `
      },


      mentalActivity: {
        id: "mentalActivity",

        type: "singleChoice",

        title: "Файл на компьютере",

        question:
          "Что наиболее точно описывает психическую деятельность?",

        options: [
          "Совокупность психических процессов, состояний и свойств, обеспечивающих отражение действительности и регуляцию поведения",
          "Только процесс мышления",
          "Только эмоциональные реакции человека",
          "Любая физическая активность"
        ],

        correct: 0,

        successEffects: [
          {
            type: "setFlag",
            flag: "computerSolved"
          },

          {
            type: "addNote",
            text:
              "На компьютере найдена цифра: 2."
          }
        ],

        successMessage: `
          <h3>Верно!</h3>

          <p>
            После ответа файл закрывается,
            а на экране остается одна цифра.
          </p>

          <div class="clue-card">
            <strong style="font-size:32px;">
              2
            </strong>
          </div>

          <p>
            Цифра сохранена в заметках.
          </p>
        `
      }

    },


    /* =====================================================
       ПРЕДМЕТЫ КОМНАТЫ
    ===================================================== */

    objects: [

      /* =======================
         ТЕЛЕФОН
      ======================= */

      {
        id: "phone",
        name: "Телефон",

        active: true,

        x: 10.5,
        y: 79,

        width: 13,
        height: 22,

        interactions: [

          {
            conditions: [
              {
                type: "flag",
                flag: "phoneSolved",
                value: true
              }
            ],

            action: {
              type: "message",

              html: `
                <h3>Телефон</h3>

                <p>
                  В трубке больше ничего нет.
                </p>

                <div class="clue-card">
                  Последнее сообщение:
                  <strong>
                    «Ищите там, где всегда холодно».
                  </strong>
                </div>
              `
            }
          },


          {
            conditions: [],

            action: {
              type: "task",
              taskId: "psychology"
            }
          }

        ]
      },


      /* =======================
         ХОЛОДИЛЬНИК
      ======================= */

      {
        id: "fridge",
        name: "Холодильник",

        active: true,

        x: 5.5,
        y: 47,

        width: 11,
        height: 41,

        interactions: [

          {
            conditions: [
              {
                type: "hasItem",
                itemId: "smallKey",
                value: true
              }
            ],

            action: {
              type: "message",

              html: `
                <h3>Холодильник</h3>

                <p>
                  Вы уже нашли здесь ключ.
                </p>
              `
            }
          },


          {
            conditions: [
              {
                type: "flag",
                flag: "smallKeyTaken",
                value: true
              }
            ],

            action: {
              type: "message",

              html: `
                <h3>Холодильник</h3>

                <p>
                  Больше ничего полезного здесь нет.
                </p>
              `
            }
          },


          {
            conditions: [
              {
                type: "flag",
                flag: "fridgeClueKnown",
                value: true
              }
            ],

            action: {
              type: "giveItem",

              title: "Холодильник",

              text:
                "За одной из упаковок лежит маленький ключ.",

              item: {
                id: "smallKey",
                icon: "🔑",
                name: "Маленький ключ"
              },

              buttonText:
                "🔑 Забрать ключ",

              effects: [
                {
                  type: "setFlag",
                  flag: "smallKeyTaken"
                }
              ]
            }
          },


          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Холодильник</h3>

                <p>
                  В холодильнике стоят препараты.
                </p>

                <p>
                  Ничего необычного
                  вы пока не замечаете.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         СЛУЖЕБНЫЙ ШКАФЧИК
      ======================= */

      {
        id: "locker",
        name: "Служебный шкафчик",

        active: true,

        x: 49.5,
        y: 42,

        width: 13,
        height: 43,

        interactions: [

          {
            conditions: [
              {
                type: "flag",
                flag: "lockerSolved",
                value: true
              }
            ],

            action: {
              type: "message",

              html: `
                <h3>Служебный шкафчик</h3>

                <p>
                  Шкафчик открыт.
                </p>

                <div class="clue-card">
                  Найденная цифра:
                  <strong>7</strong>
                </div>
              `
            }
          },


          {
            conditions: [
              {
                type: "flag",
                flag: "lockerOpened",
                value: true
              }
            ],

            action: {
              type: "task",
              taskId: "psyche"
            }
          },


          {
            conditions: [
              {
                type: "hasItem",
                itemId: "smallKey",
                value: true
              }
            ],

            action: {
              type: "unlockWithItem",

              title:
                "Служебный шкафчик",

              itemId:
                "smallKey",

              itemName:
                "маленький ключ",

              buttonText:
                "🔑 Открыть шкафчик",

              effects: [
                {
                  type: "setFlag",
                  flag: "lockerOpened"
                }
              ],

              afterHtml: `
                <h3>Шкафчик открыт</h3>

                <p>
                  Ключ подошел.
                </p>

                <p>
                  На внутренней стороне дверцы
                  прикреплена карточка.
                </p>

                <p>
                  Нажмите на шкафчик еще раз,
                  чтобы изучить ее.
                </p>
              `
            }
          },


          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Служебный шкафчик</h3>

                <div class="locked-box">
                  Шкафчик заперт.
                </div>

                <p>
                  На дверце небольшая
                  замочная скважина.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         ЖУРНАЛ
      ======================= */

      {
        id: "journal",
        name: "Журнал",

        active: true,

        x: 51,
        y: 80,

        width: 19,
        height: 22,

        interactions: [

          {
            conditions: [
              {
                type: "flag",
                flag: "journalSolved",
                value: true
              }
            ],

            action: {
              type: "message",

              html: `
                <h3>Журнал учета</h3>

                <p>
                  Вы уже изучили эту страницу.
                </p>

                <div class="clue-card">
                  На полях записано:
                  <strong>PAVLOV</strong>
                </div>
              `
            }
          },


          {
            conditions: [],

            action: {
              type: "task",
              taskId: "history"
            }
          }

        ]
      },


      /* =======================
         КОМПЬЮТЕР
      ======================= */

      {
        id: "computer",
        name: "Компьютер",

        active: true,

        x: 28,
        y: 72,

        width: 22,
        height: 29,

        interactions: [

          {
            conditions: [
              {
                type: "flag",
                flag: "computerSolved",
                value: true
              }
            ],

            action: {
              type: "message",

              html: `
                <h3>Компьютер</h3>

                <p>
                  Файл уже изучен.
                </p>

                <div class="clue-card">
                  На экране:
                  <strong>2</strong>
                </div>
              `
            }
          },


          {
            conditions: [
              {
                type: "flag",
                flag: "computerUnlocked",
                value: true
              }
            ],

            action: {
              type: "task",
              taskId: "mentalActivity"
            }
          },


          {
            conditions: [
              {
                type: "flag",
                flag: "computerPasswordKnown",
                value: true
              }
            ],

            action: {
              type: "password",

              title:
                "Компьютер",

              password:
                "PAVLOV",

              placeholder:
                "Введите пароль",

              effects: [
                {
                  type: "setFlag",
                  flag: "computerUnlocked"
                }
              ],

              successHtml: `
                <h3>Доступ разрешен</h3>

                <p>
                  Компьютер разблокирован.
                </p>

                <p>
                  На рабочем столе появился файл.
                </p>

                <p>
                  Нажмите на компьютер еще раз,
                  чтобы открыть его.
                </p>
              `
            }
          },


          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Компьютер</h3>

                <div class="locked-box">
                  Система заблокирована.
                </div>

                <p>
                  Требуется пароль.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         ШКАФ ПРЕПАРАТОВ
      ======================= */

      {
        id: "medicineCabinet",
        name: "Шкаф препаратов",

        active: true,

        x: 19,
        y: 31,

        width: 18,
        height: 47,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Шкаф препаратов</h3>

                <p>
                  На полках множество упаковок.
                </p>

                <p>
                  Пока здесь ничего
                  необычного не найдено.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         КАССА
      ======================= */

      {
        id: "cashbox",
        name: "Касса",

        active: true,

        x: 72.5,
        y: 80,

        width: 20,
        height: 22,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Касса</h3>

                <div class="locked-box">
                  Касса закрыта на ключ.
                </div>
              `
            }
          }

        ]
      },


      /* =======================
         СЕЙФ
      ======================= */

      {
        id: "safe",
        name: "Сейф",

        active: true,

        x: 61,
        y: 47,

        width: 11,
        height: 31,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Сейф</h3>

                <p>
                  Сейф закрыт.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         КОРОБКА
      ======================= */

      {
        id: "box",
        name: "Коробка",

        active: true,

        x: 39,
        y: 51,

        width: 9,
        height: 15,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Коробка</h3>

                <p>
                  Ничего интересного.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         ДОСКА ОБЪЯВЛЕНИЙ
      ======================= */

      {
        id: "board",
        name: "Доска объявлений",

        active: true,

        x: 31,
        y: 28,

        width: 11,
        height: 19,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Доска объявлений</h3>

                <p>
                  Пока ничего полезного.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         ЧАСЫ
      ======================= */

      {
        id: "clock",
        name: "Часы",

        active: true,

        x: 33,
        y: 12,

        width: 8,
        height: 12,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Часы</h3>

                <p>
                  Часы продолжают идти.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         КАЛЕНДАРЬ
      ======================= */

      {
        id: "calendar",
        name: "Календарь",

        active: true,

        x: 40,
        y: 28,

        width: 7,
        height: 16,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Календарь</h3>

                <p>
                  Сейчас он выглядит
                  совершенно обычно.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         КОРЗИНА
      ======================= */

      {
        id: "trash",
        name: "Корзина",

        active: true,

        x: 83,
        y: 61,

        width: 8,
        height: 18,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Корзина</h3>

                <p>
                  Вы осмотрели даже мусор.
                </p>

                <p>
                  Для escape room
                  это вполне разумное решение.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         АПТЕЧКА
      ======================= */

      {
        id: "firstAid",
        name: "Аптечка",

        active: true,

        x: 35.5,
        y: 39,

        width: 9,
        height: 11,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Аптечка</h3>

                <p>
                  Пока она вам не нужна.
                </p>
              `
            }
          }

        ]
      },


      /* =======================
         ДВЕРЬ
      ======================= */

      {
        id: "door",
        name: "Выход",

        active: true,

        x: 76,
        y: 39,

        width: 13,
        height: 43,

        interactions: [

          {
            conditions: [],

            action: {
              type: "message",

              html: `
                <h3>Выход</h3>

                <div class="locked-box">
                  Дверь заперта.
                </div>

                <p>
                  Рядом расположен
                  электронный кодовый замок.
                </p>

                <p>
                  Нужно найти код.
                </p>
              `
            }
          }

        ]
      }

    ]
  }

};


/* =========================================================
   3. СОСТОЯНИЕ ИГРЫ
========================================================= */

let gameState = {
  flags: {},
  inventory: [],
  notes: []
};


let selectedQuest =
  QUESTS[0];


let currentConfig =
  null;


/* =========================================================
   4. ЭЛЕМЕНТЫ СТРАНИЦЫ
========================================================= */

const screens = {

  start:
    document.getElementById(
      "start-screen"
    ),

  login:
    document.getElementById(
      "login-screen"
    ),

  game:
    document.getElementById(
      "game-screen"
    ),

  admin:
    document.getElementById(
      "admin-screen"
    )

};


const overlay =
  document.getElementById(
    "overlay"
  );


const overlayContent =
  document.getElementById(
    "overlay-content"
  );


const passwordInput =
  document.getElementById(
    "quest-password"
  );


const passwordError =
  document.getElementById(
    "password-error"
  );


/* =========================================================
   5. ЭКРАНЫ
========================================================= */

function showScreen(name) {

  Object.values(
    screens
  ).forEach(
    screen => {

      if (!screen) {
        return;
      }


      screen.classList.remove(
        "screen--active"
      );

    }
  );


  if (
    screens[name]
  ) {

    screens[name]
      .classList.add(
        "screen--active"
      );

  }

}


/* =========================================================
   6. СТАРТОВАЯ СТРАНИЦА
========================================================= */

function renderDays() {

  const grid =
    document.getElementById(
      "days-grid"
    );


  if (!grid) {
    return;
  }


  grid.innerHTML =
    "";


  QUESTS.forEach(
    quest => {

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

    }
  );

}


/* =========================================================
   7. ЗАПУСК КВЕСТА
========================================================= */

function startQuest() {

  currentConfig =
    QUEST_CONFIG[
      selectedQuest.id
    ];


  if (!currentConfig) {

    console.error(
      "Конфигурация квеста не найдена"
    );

    return;
  }


  gameState = {
    flags: {},
    inventory: [],
    notes: []
  };


  renderInventory();

  renderHotspots();

  showScreen(
    "game"
  );

}


/* =========================================================
   8. ИНТЕРАКТИВНЫЕ ЗОНЫ
========================================================= */

function renderHotspots() {

  const host =
    document.getElementById(
      "hotspots"
    );


  if (
    !host ||
    !currentConfig
  ) {
    return;
  }


  host.innerHTML =
    "";


  currentConfig.objects
    .filter(
      object =>
        object.active !== false
    )
    .forEach(
      object => {

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


            interactWithObject(
              object
            );

          }
        );


        host.appendChild(
          button
        );

      }
    );

}


/* =========================================================
   9. ВЗАИМОДЕЙСТВИЕ С ПРЕДМЕТОМ
========================================================= */

function interactWithObject(
  object
) {

  const interaction =
    object.interactions.find(
      interaction =>
        checkConditions(
          interaction.conditions || []
        )
    );


  if (!interaction) {

    openOverlay(`
      <h3>
        ${escapeHtml(
          object.name
        )}
      </h3>

      <p>
        Здесь пока ничего не происходит.
      </p>
    `);

    return;
  }


  runAction(
    interaction.action
  );

}


/* =========================================================
   10. ПРОВЕРКА УСЛОВИЙ
========================================================= */

function checkConditions(
  conditions
) {

  return conditions.every(
    condition => {

      if (
        condition.type ===
        "flag"
      ) {

        return Boolean(
          gameState.flags[
            condition.flag
          ]
        ) ===
        condition.value;

      }


      if (
        condition.type ===
        "hasItem"
      ) {

        return hasItem(
          condition.itemId
        ) ===
        condition.value;

      }


      return true;

    }
  );

}


/* =========================================================
   11. УНИВЕРСАЛЬНЫЕ ДЕЙСТВИЯ
========================================================= */

function runAction(
  action
) {

  if (!action) {
    return;
  }


  if (
    action.type ===
    "message"
  ) {

    openOverlay(
      action.html
    );

    return;
  }


  if (
    action.type ===
    "task"
  ) {

    openTask(
      action.taskId
    );

    return;
  }


  if (
    action.type ===
    "giveItem"
  ) {

    showItemAction(
      action
    );

    return;
  }


  if (
    action.type ===
    "unlockWithItem"
  ) {

    showUnlockAction(
      action
    );

    return;
  }


  if (
    action.type ===
    "password"
  ) {

    showPasswordAction(
      action
    );

    return;
  }


  console.warn(
    "Неизвестный тип действия:",
    action.type
  );

}


/* =========================================================
   12. ЗАПУСК УЧЕБНОГО ЗАДАНИЯ
========================================================= */

function openTask(
  taskId
) {

  const task =
    currentConfig.tasks[
      taskId
    ];


  if (!task) {

    console.error(
      "Задание не найдено:",
      taskId
    );

    return;
  }


  if (
    task.type ===
    "singleChoice"
  ) {

    openSingleChoiceTask(
      task
    );

    return;
  }


  openOverlay(`
    <h3>
      Задание
    </h3>

    <p>
      Этот тип задания
      пока не поддерживается.
    </p>
  `);

}


/* =========================================================
   13. ЗАДАНИЕ: ОДИН ПРАВИЛЬНЫЙ ОТВЕТ
========================================================= */

function openSingleChoiceTask(
  task
) {

  const options =
    task.options
      .map(
        (
          option,
          index
        ) => `
          <button
            class="choice-btn"
            data-answer="${index}"
          >
            ${escapeHtml(
              option
            )}
          </button>
        `
      )
      .join("");


  openOverlay(`
    <h3>
      ${escapeHtml(
        task.title
      )}
    </h3>

    <p>
      ${escapeHtml(
        task.question
      )}
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
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const answer =
              Number(
                button.dataset.answer
              );


            if (
              answer ===
              task.correct
            ) {

              applyEffects(
                task.successEffects || []
              );


              openOverlay(
                task.successMessage ||
                `
                  <h3>Верно!</h3>

                  <p>
                    Задание выполнено.
                  </p>
                `
              );

            }

            else {

              const feedback =
                document.getElementById(
                  "question-feedback"
                );


              if (feedback) {

                feedback.textContent =
                  "Ответ неверный. Попробуйте еще раз.";

              }

            }

          }
        );

      }
    );

}


/* =========================================================
   14. ПОЛУЧЕНИЕ ПРЕДМЕТА
========================================================= */

function showItemAction(
  action
) {

  openOverlay(`
    <h3>
      ${escapeHtml(
        action.title || "Предмет"
      )}
    </h3>

    <div class="success-box">
      ${escapeHtml(
        action.text || ""
      )}
    </div>

    <button
      class="object-action-btn"
      id="take-item-btn"
    >
      ${action.buttonText || "Забрать"}
    </button>
  `);


  const button =
    document.getElementById(
      "take-item-btn"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    () => {

      addItem(
        action.item
      );


      applyEffects(
        action.effects || []
      );


      openOverlay(`
        <h3>
          Предмет найден
        </h3>

        <p>
          ${escapeHtml(
            action.item.name
          )}
          добавлен в инвентарь.
        </p>
      `);

    }
  );

}


/* =========================================================
   15. ОТКРЫТИЕ ПРЕДМЕТА КЛЮЧОМ
========================================================= */

function showUnlockAction(
  action
) {

  openOverlay(`
    <h3>
      ${escapeHtml(
        action.title || "Запертый предмет"
      )}
    </h3>

    <p>
      У вас есть
      ${escapeHtml(
        action.itemName || "подходящий предмет"
      )}.
    </p>

    <button
      class="object-action-btn"
      id="unlock-object-btn"
    >
      ${action.buttonText || "Открыть"}
    </button>
  `);


  const button =
    document.getElementById(
      "unlock-object-btn"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    () => {

      removeItem(
        action.itemId
      );


      applyEffects(
        action.effects || []
      );


      openOverlay(
        action.afterHtml ||
        `
          <h3>
            Открыто
          </h3>
        `
      );

    }
  );

}


/* =========================================================
   16. ВВОД ПАРОЛЯ
========================================================= */

function showPasswordAction(
  action
) {

  openOverlay(`
    <h3>
      ${escapeHtml(
        action.title || "Пароль"
      )}
    </h3>

    <input
      id="object-password"
      class="text-input"
      type="text"
      autocomplete="off"
      placeholder="${escapeHtml(
        action.placeholder ||
        "Введите пароль"
      )}"
    >

    <button
      class="primary-btn"
      id="object-password-btn"
    >
      Ввести
    </button>

    <p
      id="object-password-error"
      class="error-text"
    ></p>
  `);


  const input =
    document.getElementById(
      "object-password"
    );


  const button =
    document.getElementById(
      "object-password-btn"
    );


  if (
    !input ||
    !button
  ) {
    return;
  }


  const check =
    () => {

      const value =
        input.value
          .trim()
          .toUpperCase();


      const correctPassword =
        String(
          action.password
        )
          .trim()
          .toUpperCase();


      if (
        value !==
        correctPassword
      ) {

        const error =
          document.getElementById(
            "object-password-error"
          );


        if (error) {

          error.textContent =
            "Пароль не подходит.";

        }


        return;
      }


      applyEffects(
        action.effects || []
      );


      openOverlay(
        action.successHtml ||
        `
          <h3>
            Доступ разрешен
          </h3>
        `
      );

    };


  button.addEventListener(
    "click",
    check
  );


  input.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        check();

      }

    }
  );

}


/* =========================================================
   17. ЭФФЕКТЫ

   Это основа конструктора.

   Задание или предмет может:
   - установить флаг;
   - добавить заметку;
   - выдать предмет.
========================================================= */

function applyEffects(
  effects
) {

  effects.forEach(
    effect => {

      if (
        effect.type ===
        "setFlag"
      ) {

        gameState.flags[
          effect.flag
        ] =
          effect.value !== undefined
            ? effect.value
            : true;


        return;
      }


      if (
        effect.type ===
        "addNote"
      ) {

        addNote(
          effect.text
        );


        return;
      }


      if (
        effect.type ===
        "giveItem"
      ) {

        addItem(
          effect.item
        );


        return;
      }


      console.warn(
        "Неизвестный эффект:",
        effect.type
      );

    }
  );

}


/* =========================================================
   18. ИНВЕНТАРЬ
========================================================= */

function addItem(
  item
) {

  if (
    !item ||
    !item.id
  ) {
    return;
  }


  if (
    hasItem(
      item.id
    )
  ) {
    return;
  }


  gameState.inventory.push(
    item
  );


  renderInventory();

}


function removeItem(
  itemId
) {

  gameState.inventory =
    gameState.inventory.filter(
      item =>
        item.id !== itemId
    );


  renderInventory();

}


function hasItem(
  itemId
) {

  return gameState.inventory.some(
    item =>
      item.id === itemId
  );

}


/* =========================================================
   19. ЗАМЕТКИ
========================================================= */

function addNote(
  text
) {

  if (!text) {
    return;
  }


  if (
    gameState.notes.includes(
      text
    )
  ) {
    return;
  }


  gameState.notes.push(
    text
  );

}


/* =========================================================
   20. НИЖНИЙ ИНВЕНТАРЬ
========================================================= */

function renderInventory() {

  const slots =
    document.getElementById(
      "inventory-slots"
    );


  if (!slots) {
    return;
  }


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


    const item =
      gameState.inventory[i];


    if (item) {

      slot.innerHTML = `
        <span style="font-size:22px;">
          ${item.icon || "📦"}
        </span>
      `;


      slot.title =
        item.name || "Предмет";

    }


    slots.appendChild(
      slot
    );

  }

}


/* =========================================================
   21. МОДАЛЬНОЕ ОКНО
========================================================= */

function openOverlay(
  html
) {

  if (
    !overlay ||
    !overlayContent
  ) {
    return;
  }


  overlayContent.innerHTML =
    html;


  overlay.hidden =
    false;

}


function closeOverlay() {

  if (!overlay) {
    return;
  }


  overlay.hidden =
    true;

}


/* =========================================================
   22. ВИЗУАЛЬНАЯ РЕАКЦИЯ НА НАЖАТИЕ
========================================================= */

function tapEffect(
  button
) {

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
   23. ВХОД В КВЕСТ
========================================================= */

const enterQuestButton =
  document.getElementById(
    "enter-quest"
  );


if (
  enterQuestButton
) {

  enterQuestButton.addEventListener(
    "click",
    () => {

      if (
        passwordInput.value
          .trim() !==
        selectedQuest.password
      ) {

        passwordError.textContent =
          "Неверный пароль";

        return;
      }


      passwordError.textContent =
        "";


      startQuest();


      requestAnimationFrame(
        () => {

          if (
            window.innerWidth < 760
          ) {

            const scene =
              document.getElementById(
                "scene-wrap"
              );


            if (scene) {

              scene.scrollLeft =
                180;

            }

          }

        }
      );

    }
  );

}


if (
  passwordInput
) {

  passwordInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        enterQuestButton?.click();

      }

    }
  );

}


/* =========================================================
   24. НАВИГАЦИЯ
========================================================= */

const backToStartButton =
  document.getElementById(
    "back-to-start"
  );


if (
  backToStartButton
) {

  backToStartButton.addEventListener(
    "click",
    () => {

      showScreen(
        "start"
      );

    }
  );

}


const overlayCloseButton =
  document.getElementById(
    "overlay-close"
  );


if (
  overlayCloseButton
) {

  overlayCloseButton.addEventListener(
    "click",
    closeOverlay
  );

}


if (
  overlay
) {

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

}


/* =========================================================
   25. КНОПКА ИНВЕНТАРЯ
========================================================= */

const inventoryButton =
  document.getElementById(
    "inventory-btn"
  );


if (
  inventoryButton
) {

  inventoryButton.addEventListener(
    "click",
    () => {

      const content =
        gameState.inventory.length

          ? gameState.inventory
              .map(
                item => `
                  <div class="inventory-item">

                    <div class="inventory-item__icon">
                      ${item.icon || "📦"}
                    </div>

                    <div>
                      ${escapeHtml(
                        item.name || "Предмет"
                      )}
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

}


/* =========================================================
   26. КНОПКА ЗАМЕТОК
========================================================= */

const notesButton =
  document.getElementById(
    "notes-btn"
  );


if (
  notesButton
) {

  notesButton.addEventListener(
    "click",
    () => {

      const content =
        gameState.notes.length

          ? gameState.notes
              .map(
                note => `
                  <div class="clue-card">
                    ${escapeHtml(
                      note
                    )}
                  </div>
                `
              )
              .join("")

          : `
              <p>
                Пока ничего не найдено.
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

}


/* =========================================================
   27. ПОДСКАЗКА
========================================================= */

const hintButton =
  document.getElementById(
    "hint-btn"
  );


if (
  hintButton
) {

  hintButton.addEventListener(
    "click",
    () => {

      let hint =
        "Осмотрите предметы на стойке и в помещении.";


      if (
        !gameState.flags.phoneSolved
      ) {

        hint =
          "Обратите внимание на телефон.";

      }

      else if (
        gameState.flags.fridgeClueKnown &&
        !gameState.flags.smallKeyTaken
      ) {

        hint =
          "Телефон говорил о месте, где всегда холодно.";

      }

      else if (
        hasItem("smallKey") &&
        !gameState.flags.lockerOpened
      ) {

        hint =
          "У вас есть маленький ключ. Поищите небольшую замочную скважину.";

      }

      else if (
        gameState.flags.lockerOpened &&
        !gameState.flags.lockerSolved
      ) {

        hint =
          "В открытом шкафчике осталась карточка.";

      }

      else if (
        !gameState.flags.journalSolved
      ) {

        hint =
          "Изучите журнал на стойке.";

      }

      else if (
        gameState.flags.computerPasswordKnown &&
        !gameState.flags.computerUnlocked
      ) {

        hint =
          "Вы нашли слово, похожее на пароль. Возможно, оно подходит к компьютеру.";

      }

      else if (
        gameState.flags.computerUnlocked &&
        !gameState.flags.computerSolved
      ) {

        hint =
          "Компьютер разблокирован. Откройте найденный файл.";

      }

      else {

        hint =
          "Две ветки уже можно пройти. Третью мы подключим через конструктор.";

      }


      openOverlay(`
        <h3>
          Подсказка
        </h3>

        <p>
          ${escapeHtml(
            hint
          )}
        </p>
      `);

    }
  );

}


/* =========================================================
   28. МЕНЮ
========================================================= */

const menuButton =
  document.getElementById(
    "menu-btn"
  );


if (
  menuButton
) {

  menuButton.addEventListener(
    "click",
    () => {

      openOverlay(`
        <h3>
          ${escapeHtml(
            selectedQuest.title
          )}
        </h3>

        <p>
          ${escapeHtml(
            selectedQuest.topic
          )}
        </p>
      `);

    }
  );

}


/* =========================================================
   29. АДМИН-ПАНЕЛЬ
========================================================= */

const ADMIN_STORAGE_KEY =
  "psychologyEscapeAdminConfig";


let adminQuestId =
  "day1";


let adminObjectId =
  null;


let adminTaskId =
  null;


/* =========================================================
   30. ЗАГРУЗКА СОХРАНЕННОЙ КОНФИГУРАЦИИ
========================================================= */

function loadAdminConfig() {

  const saved =
    localStorage.getItem(
      ADMIN_STORAGE_KEY
    );


  if (!saved) {
    return;
  }


  try {

    const parsed =
      JSON.parse(
        saved
      );


    Object.keys(
      parsed
    ).forEach(
      questId => {

        if (
          QUEST_CONFIG[
            questId
          ]
        ) {

          QUEST_CONFIG[
            questId
          ] =
            parsed[
              questId
            ];

        }

      }
    );

  }

  catch (
    error
  ) {

    console.error(
      "Не удалось загрузить настройки администратора:",
      error
    );

  }

}


/* =========================================================
   31. СОХРАНЕНИЕ КОНФИГУРАЦИИ
========================================================= */

function saveAdminConfig() {

  localStorage.setItem(
    ADMIN_STORAGE_KEY,
    JSON.stringify(
      QUEST_CONFIG
    )
  );

}


/* =========================================================
   32. ОТКРЫТИЕ АДМИНКИ
========================================================= */

function openAdmin() {

  showScreen(
    "admin"
  );


  renderAdminQuestSelect();

}


/* =========================================================
   33. ВЫБОР КВЕСТА В АДМИНКЕ
========================================================= */

function renderAdminQuestSelect() {

  const select =
    document.getElementById(
      "admin-quest-select"
    );


  if (!select) {
    return;
  }


  select.innerHTML =
    "";


  QUESTS.forEach(
    quest => {

      if (
        !QUEST_CONFIG[
          quest.id
        ]
      ) {

        return;
      }


      const option =
        document.createElement(
          "option"
        );


      option.value =
        quest.id;


      option.textContent =
        `День ${quest.day}: ${quest.title}`;


      select.appendChild(
        option
      );

    }
  );


  select.value =
    adminQuestId;


  renderAdminObjects();

  renderAdminTasks();

}


/* =========================================================
   34. СПИСОК ПРЕДМЕТОВ
========================================================= */

function renderAdminObjects() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  if (!config) {
    return;
  }


  const select =
    document.getElementById(
      "admin-object-select"
    );


  if (!select) {
    return;
  }


  select.innerHTML =
    "";


  config.objects.forEach(
    object => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        object.id;


      option.textContent =
        object.name;


      select.appendChild(
        option
      );

    }
  );


  if (
    !adminObjectId ||
    !config.objects.some(
      object =>
        object.id ===
        adminObjectId
    )
  ) {

    adminObjectId =
      config.objects[0]?.id ||
      null;

  }


  if (
    adminObjectId
  ) {

    select.value =
      adminObjectId;

  }


  loadAdminObjectForm();

}


/* =========================================================
   35. СПИСОК ЗАДАНИЙ
========================================================= */

function renderAdminTasks() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  if (!config) {
    return;
  }


  const taskSelect =
    document.getElementById(
      "admin-task-select"
    );


  const objectTaskSelect =
    document.getElementById(
      "admin-object-task"
    );


  if (
    !taskSelect ||
    !objectTaskSelect
  ) {

    return;
  }


  taskSelect.innerHTML =
    "";


  objectTaskSelect.innerHTML =
    "";


  Object.entries(
    config.tasks
  ).forEach(
    (
      [
        taskId,
        task
      ]
    ) => {

      const option1 =
        document.createElement(
          "option"
        );


      option1.value =
        taskId;


      option1.textContent =
        task.title ||
        taskId;


      taskSelect.appendChild(
        option1
      );


      const option2 =
        option1.cloneNode(
          true
        );


      objectTaskSelect
        .appendChild(
          option2
        );

    }
  );


  if (
    !adminTaskId ||
    !config.tasks[
      adminTaskId
    ]
  ) {

    adminTaskId =
      Object.keys(
        config.tasks
      )[0] ||
      null;

  }


  if (
    adminTaskId
  ) {

    taskSelect.value =
      adminTaskId;

  }


  loadAdminTaskForm();

}


/* =========================================================
   36. ЗАГРУЗКА ПРЕДМЕТА В ФОРМУ
========================================================= */

function loadAdminObjectForm() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  if (!config) {
    return;
  }


  const object =
    config.objects.find(
      item =>
        item.id ===
        adminObjectId
    );


  if (!object) {
    return;
  }


  const activeInput =
    document.getElementById(
      "admin-object-active"
    );


  const nameInput =
    document.getElementById(
      "admin-object-name"
    );


  const xInput =
    document.getElementById(
      "admin-object-x"
    );


  const yInput =
    document.getElementById(
      "admin-object-y"
    );


  const widthInput =
    document.getElementById(
      "admin-object-width"
    );


  const heightInput =
    document.getElementById(
      "admin-object-height"
    );


  if (
    !activeInput ||
    !nameInput ||
    !xInput ||
    !yInput ||
    !widthInput ||
    !heightInput
  ) {

    return;
  }


  activeInput.checked =
    object.active !== false;


  nameInput.value =
    object.name || "";


  xInput.value =
    object.x ?? 0;


  yInput.value =
    object.y ?? 0;


  widthInput.value =
    object.width ?? 10;


  heightInput.value =
    object.height ?? 10;


  /*
    В первой версии админки
    редактируем базовое взаимодействие:
    последнее взаимодействие объекта.
  */

  const interaction =
    object.interactions[
      object.interactions.length - 1
    ];


  const action =
    interaction?.action || {
      type: "message"
    };


  const actionTypeSelect =
    document.getElementById(
      "admin-action-type"
    );


  if (!actionTypeSelect) {
    return;
  }


  actionTypeSelect.value =
    action.type === "task"
      ? "task"
      : "message";


  const objectTaskSelect =
    document.getElementById(
      "admin-object-task"
    );


  const messageInput =
    document.getElementById(
      "admin-object-message"
    );


  if (
    action.type ===
    "task"
  ) {

    if (
      objectTaskSelect
    ) {

      objectTaskSelect.value =
        action.taskId || "";

    }

  }

  else {

    if (
      messageInput
    ) {

      messageInput.value =
        stripHtml(
          action.html || ""
        );

    }

  }


  updateAdminActionFields();

}


/* =========================================================
   37. ЗАГРУЗКА ЗАДАНИЯ В ФОРМУ
========================================================= */

function loadAdminTaskForm() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  if (
    !config ||
    !adminTaskId
  ) {

    return;
  }


  const task =
    config.tasks[
      adminTaskId
    ];


  if (!task) {
    return;
  }


  const titleInput =
    document.getElementById(
      "admin-task-title"
    );


  const questionInput =
    document.getElementById(
      "admin-task-question"
    );


  const optionsInput =
    document.getElementById(
      "admin-task-options"
    );


  const correctInput =
    document.getElementById(
      "admin-task-correct"
    );


  if (
    !titleInput ||
    !questionInput ||
    !optionsInput ||
    !correctInput
  ) {

    return;
  }


  titleInput.value =
    task.title || "";


  questionInput.value =
    task.question || "";


  optionsInput.value =
    (
      task.options ||
      []
    ).join(
      "\n"
    );


  correctInput.value =
    Number(
      task.correct || 0
    ) + 1;

}


/* =========================================================
   38. ПЕРЕКЛЮЧЕНИЕ ПОЛЕЙ ДЕЙСТВИЯ
========================================================= */

function updateAdminActionFields() {

  const select =
    document.getElementById(
      "admin-action-type"
    );


  if (!select) {
    return;
  }


  const type =
    select.value;


  const messageFields =
    document.getElementById(
      "admin-message-fields"
    );


  const taskFields =
    document.getElementById(
      "admin-task-fields"
    );


  if (
    messageFields
  ) {

    messageFields.hidden =
      type !== "message";

  }


  if (
    taskFields
  ) {

    taskFields.hidden =
      type !== "task";

  }

}


/* =========================================================
   39. СОХРАНЕНИЕ ПРЕДМЕТА
========================================================= */

function saveAdminObject() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  if (!config) {
    return;
  }


  const object =
    config.objects.find(
      item =>
        item.id ===
        adminObjectId
    );


  if (!object) {
    return;
  }


  object.active =
    document
      .getElementById(
        "admin-object-active"
      )
      .checked;


  object.name =
    document
      .getElementById(
        "admin-object-name"
      )
      .value
      .trim();


  object.x =
    Number(
      document
        .getElementById(
          "admin-object-x"
        )
        .value
    );


  object.y =
    Number(
      document
        .getElementById(
          "admin-object-y"
        )
        .value
    );


  object.width =
    Number(
      document
        .getElementById(
          "admin-object-width"
        )
        .value
    );


  object.height =
    Number(
      document
        .getElementById(
          "admin-object-height"
        )
        .value
    );


  const type =
    document
      .getElementById(
        "admin-action-type"
      )
      .value;


  let interaction =
    object.interactions[
      object.interactions.length - 1
    ];


  if (!interaction) {

    interaction = {
      conditions: [],
      action: {}
    };


    object.interactions.push(
      interaction
    );

  }


  interaction.conditions =
    [];


  if (
    type === "task"
  ) {

    interaction.action = {
      type: "task",

      taskId:
        document
          .getElementById(
            "admin-object-task"
          )
          .value
    };

  }

  else {

    const message =
      document
        .getElementById(
          "admin-object-message"
        )
        .value
        .trim();


    interaction.action = {
      type: "message",

      html: `
        <h3>
          ${escapeHtml(
            object.name
          )}
        </h3>

        <p>
          ${escapeHtml(
            message
          )}
        </p>
      `
    };

  }


  saveAdminConfig();


  showAdminStatus(
    "Предмет сохранен."
  );


  renderAdminObjects();

}


/* =========================================================
   40. СОХРАНЕНИЕ ЗАДАНИЯ
========================================================= */

function saveAdminTask() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  if (
    !config ||
    !adminTaskId
  ) {
    return;
  }


  const task =
    config.tasks[
      adminTaskId
    ];


  if (!task) {
    return;
  }


  const options =
    document
      .getElementById(
        "admin-task-options"
      )
      .value
      .split("\n")
      .map(
        item =>
          item.trim()
      )
      .filter(
        Boolean
      );


  const correct =
    Number(
      document
        .getElementById(
          "admin-task-correct"
        )
        .value
    ) - 1;


  if (
    options.length < 2
  ) {

    showAdminStatus(
      "Нужно минимум два варианта ответа.",
      true
    );

    return;
  }


  if (
    correct < 0 ||
    correct >=
    options.length
  ) {

    showAdminStatus(
      "Проверьте номер правильного ответа.",
      true
    );

    return;
  }


  task.title =
    document
      .getElementById(
        "admin-task-title"
      )
      .value
      .trim();


  task.question =
    document
      .getElementById(
        "admin-task-question"
      )
      .value
      .trim();


  task.options =
    options;


  task.correct =
    correct;


  saveAdminConfig();


  showAdminStatus(
    "Задание сохранено."
  );


  renderAdminTasks();

}


/* =========================================================
   41. ПРЕДПРОСМОТР КВЕСТА ИЗ АДМИНКИ
========================================================= */

function previewAdminQuest() {

  const quest =
    QUESTS.find(
      quest =>
        quest.id ===
        adminQuestId
    );


  if (!quest) {
    return;
  }


  selectedQuest =
    quest;


  currentConfig =
    QUEST_CONFIG[
      adminQuestId
    ];


  gameState = {
    flags: {},
    inventory: [],
    notes: []
  };


  renderInventory();

  renderHotspots();

  showScreen(
    "game"
  );

}


/* =========================================================
   42. СБРОС ЛОКАЛЬНЫХ ИЗМЕНЕНИЙ
========================================================= */

function resetAdminConfig() {

  const confirmed =
    window.confirm(
      "Удалить все изменения, сделанные через админ-панель?"
    );


  if (!confirmed) {
    return;
  }


  localStorage.removeItem(
    ADMIN_STORAGE_KEY
  );


  window.location.reload();

}


/* =========================================================
   43. СТАТУС АДМИНКИ
========================================================= */

function showAdminStatus(
  text,
  isError = false
) {

  const status =
    document.getElementById(
      "admin-status"
    );


  if (!status) {
    return;
  }


  status.textContent =
    text;


  status.style.color =
    isError
      ? "#ff8d8d"
      : "";


  setTimeout(
    () => {

      status.textContent =
        "";

      status.style.color =
        "";

    },

    2500
  );

}


/* =========================================================
   44. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ:
       УБРАТЬ HTML ИЗ ТЕКСТА
========================================================= */

function stripHtml(
  html
) {

  const temp =
    document.createElement(
      "div"
    );


  temp.innerHTML =
    html;


  return temp.textContent
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


/* =========================================================
   45. ЗАЩИТА ТЕКСТА ДЛЯ HTML
========================================================= */

function escapeHtml(
  text
) {

  return String(
    text ?? ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


/* =========================================================
   46. СОБЫТИЯ АДМИНКИ
========================================================= */

const openAdminButton =
  document.getElementById(
    "open-admin"
  );


if (
  openAdminButton
) {

  openAdminButton.addEventListener(
    "click",
    openAdmin
  );

}


const adminBackButton =
  document.getElementById(
    "admin-back"
  );


if (
  adminBackButton
) {

  adminBackButton.addEventListener(
    "click",
    () => {

      showScreen(
        "start"
      );

    }
  );

}


const adminQuestSelect =
  document.getElementById(
    "admin-quest-select"
  );


if (
  adminQuestSelect
) {

  adminQuestSelect.addEventListener(
    "change",
    event => {

      adminQuestId =
        event.target.value;


      adminObjectId =
        null;


      adminTaskId =
        null;


      renderAdminObjects();

      renderAdminTasks();

    }
  );

}


const adminObjectSelect =
  document.getElementById(
    "admin-object-select"
  );


if (
  adminObjectSelect
) {

  adminObjectSelect.addEventListener(
    "change",
    event => {

      adminObjectId =
        event.target.value;


      loadAdminObjectForm();

    }
  );

}


const adminTaskSelect =
  document.getElementById(
    "admin-task-select"
  );


if (
  adminTaskSelect
) {

  adminTaskSelect.addEventListener(
    "change",
    event => {

      adminTaskId =
        event.target.value;


      loadAdminTaskForm();

    }
  );

}


const adminActionType =
  document.getElementById(
    "admin-action-type"
  );


if (
  adminActionType
) {

  adminActionType.addEventListener(
    "change",
    updateAdminActionFields
  );

}


const adminSaveObjectButton =
  document.getElementById(
    "admin-save-object"
  );


if (
  adminSaveObjectButton
) {

  adminSaveObjectButton.addEventListener(
    "click",
    saveAdminObject
  );

}


const adminSaveTaskButton =
  document.getElementById(
    "admin-save-task"
  );


if (
  adminSaveTaskButton
) {

  adminSaveTaskButton.addEventListener(
    "click",
    saveAdminTask
  );

}


const adminPreviewButton =
  document.getElementById(
    "admin-preview"
  );


if (
  adminPreviewButton
) {

  adminPreviewButton.addEventListener(
    "click",
    previewAdminQuest
  );

}


const adminResetButton =
  document.getElementById(
    "admin-reset"
  );


if (
  adminResetButton
) {

  adminResetButton.addEventListener(
    "click",
    resetAdminConfig
  );

}


/* =========================================================
   47. ЗАПУСК САЙТА
========================================================= */

loadAdminConfig();

renderDays();

renderInventory();
