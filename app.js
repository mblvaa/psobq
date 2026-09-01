/* =========================================================
   1. КОНФИГУРАЦИЯ КВЕСТОВ

   ВАЖНО:
   Ниже находятся ДАННЫЕ квеста.
   Сам движок расположен дальше и не знает,
   что такое телефон, холодильник или Павлов.

   Позже именно этот блок будет приходить
   из Google Sheets / админ-панели.
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
   КОНФИГУРАЦИЯ ДНЯ 1
========================================================= */

const QUEST_CONFIG = {

  day1: {

    /* -------------------------
       УЧЕБНЫЕ ЗАДАНИЯ
    ------------------------- */

    tasks: {

      psychology: {
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
            металлическая пластинка.
          </p>

          <div class="clue-card">
            На ней выгравирована цифра:
            <strong style="font-size:32px;">
              7
            </strong>
          </div>
        `
      },


      history: {
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
            Файл закрывается,
            и на экране остается одна цифра.
          </p>

          <div class="clue-card">
            <strong style="font-size:32px;">
              2
            </strong>
          </div>
        `
      }

    },


    /* -------------------------
       ПРЕДМЕТЫ КОМНАТЫ

       interactions читаются сверху вниз.

       Движок выбирает первое действие,
       условия которого подходят.
    ------------------------- */

    objects: [

      {
        id: "phone",
        name: "Телефон",

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
                  «Ищите там,
                  где всегда холодно».
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


      {
        id: "fridge",
        name: "Холодильник",

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


      {
        id: "locker",
        name: "Служебный шкафчик",

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


      {
        id: "journal",
        name: "Журнал",

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
                  Пароль:
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


      {
        id: "computer",
        name: "Компьютер",

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


      /* Пока просто заглушки.
         Позже их настроим через данные. */

      {
        id: "medicineCabinet",
        name: "Шкаф препаратов",

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
              `
            }
          }
        ]
      },


      {
        id: "cashbox",
        name: "Касса",

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


      {
        id: "safe",
        name: "Сейф",
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
                <p>Сейф закрыт.</p>
              `
            }
          }
        ]
      },


      {
        id: "board",
        name: "Доска объявлений",
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


      {
        id: "clock",
        name: "Часы",
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
                <p>Часы продолжают идти.</p>
              `
            }
          }
        ]
      },


      {
        id: "calendar",
        name: "Календарь",
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
                  Сейчас он выглядит совершенно обычно.
                </p>
              `
            }
          }
        ]
      },


      {
        id: "box",
        name: "Коробка",
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


      {
        id: "trash",
        name: "Корзина",
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
                  Для квеста это вполне разумно.
                </p>
              `
            }
          }
        ]
      },


      {
        id: "firstAid",
        name: "Аптечка",
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


      {
        id: "door",
        name: "Выход",

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
              `
            }
          }
        ]
      }

    ]
  }
};


/* =========================================================
   2. СОСТОЯНИЕ ИГРЫ

   Это универсальное состояние.
   Здесь больше нет отдельных переменных
   phoneSolved, journalSolved и т.д.
========================================================= */

let gameState = {
  flags: {},
  inventory: [],
  notes: []
};


let selectedQuest = QUESTS[0];

let currentConfig = null;


/* =========================================================
   3. ЭЛЕМЕНТЫ СТРАНИЦЫ
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


/* =========================================================
   4. ЭКРАНЫ
========================================================= */

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


/* =========================================================
   5. СТАРТОВАЯ СТРАНИЦА
========================================================= */

function renderDays() {

  const grid =
    document.getElementById(
      "days-grid"
    );


  grid.innerHTML = "";


  QUESTS.forEach(quest => {

    const button =
      document.createElement("button");


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


    grid.appendChild(button);

  });

}


/* =========================================================
   6. ЗАПУСК КВЕСТА
========================================================= */

function startQuest() {

  currentConfig =
    QUEST_CONFIG[
      selectedQuest.id
    ];


  /*
    При новом запуске
    состояние обнуляется.
  */

  gameState = {
    flags: {},
    inventory: [],
    notes: []
  };


  renderInventory();

  renderHotspots();

  showScreen("game");

}


/* =========================================================
   7. ИНТЕРАКТИВНЫЕ ЗОНЫ
========================================================= */

function renderHotspots() {

  const host =
    document.getElementById(
      "hotspots"
    );


  host.innerHTML = "";


  currentConfig.objects
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

          tapEffect(button);

          interactWithObject(
            object
          );

        }
      );


      host.appendChild(button);

    });

}


/* =========================================================
   8. УНИВЕРСАЛЬНАЯ ЛОГИКА ОБЪЕКТА
========================================================= */

function interactWithObject(
  object
) {

  /*
    Перебираем взаимодействия
    сверху вниз.

    Выполняется первое подходящее.
  */

  const interaction =
    object.interactions.find(
      interaction =>
        checkConditions(
          interaction.conditions || []
        )
    );


  if (!interaction) {

    return;

  }


  runAction(
    interaction.action
  );

}


/* =========================================================
   9. ПРОВЕРКА УСЛОВИЙ
========================================================= */

function checkConditions(
  conditions
) {

  return conditions.every(
    condition => {

      if (
        condition.type === "flag"
      ) {

        return Boolean(
          gameState.flags[
            condition.flag
          ]
        ) === condition.value;

      }


      if (
        condition.type === "hasItem"
      ) {

        return hasItem(
          condition.itemId
        ) === condition.value;

      }


      return true;

    }
  );

}


/* =========================================================
   10. УНИВЕРСАЛЬНЫЕ ДЕЙСТВИЯ
========================================================= */

function runAction(
  action
) {

  if (
    action.type === "message"
  ) {

    openOverlay(
      action.html
    );

    return;

  }


  if (
    action.type === "task"
  ) {

    openTask(
      action.taskId
    );

    return;

  }


  if (
    action.type === "giveItem"
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
    action.type === "password"
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
   11. УЧЕБНОЕ ЗАДАНИЕ
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


  /*
    Пока поддерживаем
    singleChoice.

    Потом сюда добавятся:
    multipleChoice
    ordering
    matching
    sorting
    textInput
  */

  if (
    task.type ===
    "singleChoice"
  ) {

    openSingleChoiceTask(
      task
    );

  }

}


/* =========================================================
   12. ОДИН ПРАВИЛЬНЫЙ ОТВЕТ
========================================================= */

function openSingleChoiceTask(
  task
) {

  const options =
    task.options
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
      ${task.title}
    </h3>

    <p>
      ${task.question}
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
            task.correct
          ) {

            applyEffects(
              task.successEffects || []
            );


            openOverlay(
              task.successMessage
            );

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
   13. ПОЛУЧЕНИЕ ПРЕДМЕТА
========================================================= */

function showItemAction(
  action
) {

  openOverlay(`
    <h3>
      ${action.title}
    </h3>

    <div class="success-box">
      ${action.text}
    </div>

    <button
      class="object-action-btn"
      id="take-item-btn"
    >
      ${action.buttonText}
    </button>
  `);


  document
    .getElementById(
      "take-item-btn"
    )
    .addEventListener(
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
            ${action.item.name}
            добавлен в инвентарь.
          </p>
        `);

      }
    );

}


/* =========================================================
   14. ОТКРЫТИЕ КЛЮЧОМ
========================================================= */

function showUnlockAction(
  action
) {

  openOverlay(`
    <h3>
      ${action.title}
    </h3>

    <p>
      У вас есть
      ${action.itemName}.
    </p>

    <button
      class="object-action-btn"
      id="unlock-object-btn"
    >
      ${action.buttonText}
    </button>
  `);


  document
    .getElementById(
      "unlock-object-btn"
    )
    .addEventListener(
      "click",
      () => {

        removeItem(
          action.itemId
        );


        applyEffects(
          action.effects || []
        );


        openOverlay(
          action.afterHtml
        );

      }
    );

}


/* =========================================================
   15. ПАРОЛЬ
========================================================= */

function showPasswordAction(
  action
) {

  openOverlay(`
    <h3>
      ${action.title}
    </h3>

    <input
      id="object-password"
      class="text-input"
      type="text"
      autocomplete="off"
      placeholder="${action.placeholder || "Пароль"}"
    />

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


  const check =
    () => {

      const value =
        input.value
          .trim()
          .toUpperCase();


      if (
        value !==
        String(
          action.password
        ).toUpperCase()
      ) {

        document
          .getElementById(
            "object-password-error"
          )
          .textContent =
          "Пароль не подходит.";

        return;

      }


      applyEffects(
        action.effects || []
      );


      openOverlay(
        action.successHtml
      );

    };


  document
    .getElementById(
      "object-password-btn"
    )
    .addEventListener(
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
   16. ЭФФЕКТЫ

   Именно этот механизм позволит
   администратору собирать квесты.
========================================================= */

function applyEffects(
  effects
) {

  effects.forEach(
    effect => {

      if (
        effect.type === "setFlag"
      ) {

        gameState.flags[
          effect.flag
        ] = true;

      }


      else if (
        effect.type === "addNote"
      ) {

        addNote(
          effect.text
        );

      }


      else if (
        effect.type === "giveItem"
      ) {

        addItem(
          effect.item
        );

      }


      else {

        console.warn(
          "Неизвестный эффект:",
          effect.type
        );

      }

    }
  );

}


/* =========================================================
   17. ИНВЕНТАРЬ
========================================================= */

function addItem(
  item
) {

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

  return gameState.inventory
    .some(
      item =>
        item.id === itemId
    );

}


/* =========================================================
   18. ЗАМЕТКИ
========================================================= */

function addNote(
  text
) {

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
   19. НИЖНИЙ ИНВЕНТАРЬ
========================================================= */

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
        item.name;

    }


    slots.appendChild(
      slot
    );

  }

}


/* =========================================================
   20. МОДАЛЬНОЕ ОКНО
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
   21. ЭФФЕКТ НАЖАТИЯ
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
   22. ПАРОЛЬ КВЕСТА
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


      startQuest();


      requestAnimationFrame(
        () => {

          if (
            window.innerWidth < 760
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


/* =========================================================
   23. НАВИГАЦИЯ
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


/* =========================================================
   24. ИНВЕНТАРЬ
========================================================= */

document
  .getElementById(
    "inventory-btn"
  )
  .addEventListener(
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
   25. ЗАМЕТКИ
========================================================= */

document
  .getElementById(
    "notes-btn"
  )
  .addEventListener(
    "click",
    () => {

      const content =
        gameState.notes.length

          ? gameState.notes
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
   26. ПОДСКАЗКА

   Пока простая.
   Позже подсказки тоже станут
   частью конфигурации.
========================================================= */

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
          Осматривайте разные предметы
          в комнате.
        </p>

        <p>
          Некоторые из них становятся
          полезными только после найденной
          информации или предмета.
        </p>
      `);

    }
  );


/* =========================================================
   27. МЕНЮ
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
          ${selectedQuest.title}
        </h3>

        <p>
          ${selectedQuest.topic}
        </p>
      `);

    }
  );


/* =========================================================
   28. ЗАПУСК САЙТА
========================================================= */

renderDays();

renderInventory();
