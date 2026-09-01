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
   2. НАСТРОЙКИ
========================================================= */

const ADMIN_PASSWORD = "admin2026";

const ADMIN_STORAGE_KEY =
  "psychologyEscapeAdminConfig";


/* =========================================================
   3. КОНФИГУРАЦИЯ ДНЯ 1
========================================================= */

const QUEST_CONFIG = {

  day1: {

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
            <strong style="font-size:32px;">7</strong>
          </div>
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
            <strong style="font-size:32px;">2</strong>
          </div>
        `
      }

    },


    objects: [

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
                  Нажмите на шкафчик еще раз.
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
                  Нажмите на компьютер еще раз.
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
              `
            }
          }
        ]
      },


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
                <p>Сейф закрыт.</p>
              `
            }
          }
        ]
      },


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
                <p>Ничего интересного.</p>
              `
            }
          }
        ]
      },


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
                <p>Пока ничего полезного.</p>
              `
            }
          }
        ]
      },


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
                <p>Часы продолжают идти.</p>
              `
            }
          }
        ]
      },


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
                <p>Обычный календарь.</p>
              `
            }
          }
        ]
      },


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
                <p>Ничего полезного.</p>
              `
            }
          }
        ]
      },


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
                <p>Пока она вам не нужна.</p>
              `
            }
          }
        ]
      },


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
              `
            }
          }
        ]
      }

    ]
  }

};


/* =========================================================
   4. СОСТОЯНИЕ
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


let adminQuestId =
  "day1";


let adminObjectId =
  null;


let adminTaskId =
  null;


/* =========================================================
   5. ЭЛЕМЕНТЫ
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

  adminLogin:
    document.getElementById(
      "admin-login-screen"
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
   6. ЭКРАНЫ
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
   7. СТАРТОВАЯ СТРАНИЦА
========================================================= */

function renderDays() {

  const grid =
    document.getElementById(
      "days-grid"
    );


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
   8. ЗАПУСК КВЕСТА
========================================================= */

function startQuest() {

  currentConfig =
    QUEST_CONFIG[
      selectedQuest.id
    ];


  if (!currentConfig) {
    return;
  }


  gameState = {
    flags: {},
    inventory: [],
    notes: []
  };


  document
    .getElementById(
      "game-day-title"
    )
    .textContent =
    `День ${selectedQuest.day}`;


  renderInventory();

  renderHotspots();

  showScreen(
    "game"
  );

}


/* =========================================================
   9. HOTSPOTS
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
   10. ОБЪЕКТЫ
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
    return;
  }


  runAction(
    interaction.action
  );

}


/* =========================================================
   11. УСЛОВИЯ
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
   12. ДЕЙСТВИЯ
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

  }

}


/* =========================================================
   13. ЗАДАНИЯ
========================================================= */

function openTask(
  taskId
) {

  const task =
    currentConfig.tasks[
      taskId
    ];


  if (!task) {
    return;
  }


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
   14. SINGLE CHOICE
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
            ${escapeHtml(option)}
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

      }
    );

}


/* =========================================================
   15. ВЫДАЧА ПРЕДМЕТА
========================================================= */

function showItemAction(
  action
) {

  openOverlay(`
    <h3>
      ${escapeHtml(
        action.title
      )}
    </h3>

    <div class="success-box">
      ${escapeHtml(
        action.text
      )}
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
   16. ОТКРЫТИЕ КЛЮЧОМ
========================================================= */

function showUnlockAction(
  action
) {

  openOverlay(`
    <h3>
      ${escapeHtml(
        action.title
      )}
    </h3>

    <p>
      У вас есть
      ${escapeHtml(
        action.itemName
      )}.
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
   17. ПАРОЛЬ ОБЪЕКТА
========================================================= */

function showPasswordAction(
  action
) {

  openOverlay(`
    <h3>
      ${escapeHtml(
        action.title
      )}
    </h3>

    <input
      id="object-password"
      class="text-input"
      type="text"
      autocomplete="off"
      placeholder="${escapeHtml(
        action.placeholder
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


  const check =
    () => {

      if (
        input.value
          .trim()
          .toUpperCase() !==
        String(
          action.password
        )
          .trim()
          .toUpperCase()
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
   18. ЭФФЕКТЫ
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

      }


      else if (
        effect.type ===
        "addNote"
      ) {

        addNote(
          effect.text
        );

      }


      else if (
        effect.type ===
        "giveItem"
      ) {

        addItem(
          effect.item
        );

      }

    }
  );

}


/* =========================================================
   19. ИНВЕНТАРЬ
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

  return gameState.inventory.some(
    item =>
      item.id === itemId
  );

}


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
        item.name;

    }


    slots.appendChild(
      slot
    );

  }

}


/* =========================================================
   20. ЗАМЕТКИ
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
   21. OVERLAY
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
   22. TAP EFFECT
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

document
  .getElementById(
    "enter-quest"
  )
  .addEventListener(
    "click",
    () => {

      if (
        passwordInput.value.trim() !==
        selectedQuest.password
      ) {

        passwordError.textContent =
          "Неверный пароль";

        return;
      }


      passwordError.textContent =
        "";


      startQuest();

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
   24. ОБЫЧНАЯ НАВИГАЦИЯ
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
   25. ИНВЕНТАРЬ
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
                      ${escapeHtml(
                        item.name
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


/* =========================================================
   26. ЗАМЕТКИ
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
                    ${escapeHtml(note)}
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


/* =========================================================
   27. ПОДСКАЗКА
========================================================= */

document
  .getElementById(
    "hint-btn"
  )
  .addEventListener(
    "click",
    () => {

      let hint =
        "Осмотрите предметы в аптеке.";


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
          "У вас есть маленький ключ.";

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
          "Найденное слово похоже на пароль.";

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


/* =========================================================
   28. МЕНЮ
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


/* =========================================================
   29. АДМИН-ВХОД
========================================================= */

function openAdminLogin() {

  const input =
    document.getElementById(
      "admin-password"
    );


  const error =
    document.getElementById(
      "admin-password-error"
    );


  input.value =
    "";


  error.textContent =
    "";


  showScreen(
    "adminLogin"
  );

}


function checkAdminPassword() {

  const input =
    document.getElementById(
      "admin-password"
    );


  const error =
    document.getElementById(
      "admin-password-error"
    );


  if (
    input.value.trim() !==
    ADMIN_PASSWORD
  ) {

    error.textContent =
      "Неверный пароль.";

    return;
  }


  error.textContent =
    "";


  showScreen(
    "admin"
  );


  renderAdminQuestSelect();

}


document
  .getElementById(
    "open-admin"
  )
  .addEventListener(
    "click",
    openAdminLogin
  );


document
  .getElementById(
    "enter-admin"
  )
  .addEventListener(
    "click",
    checkAdminPassword
  );


document
  .getElementById(
    "admin-password"
  )
  .addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        checkAdminPassword();

      }

    }
  );


document
  .getElementById(
    "admin-login-back"
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
    "admin-back"
  )
  .addEventListener(
    "click",
    () => {

      showScreen(
        "start"
      );

    }
  );


/* =========================================================
   30. LOCAL STORAGE
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
      error
    );

  }

}


function saveAdminConfig() {

  localStorage.setItem(
    ADMIN_STORAGE_KEY,
    JSON.stringify(
      QUEST_CONFIG
    )
  );

}


/* =========================================================
   31. АДМИН: КВЕСТЫ
========================================================= */

function renderAdminQuestSelect() {

  const select =
    document.getElementById(
      "admin-quest-select"
    );


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
   32. АДМИН: ОБЪЕКТЫ
========================================================= */

function renderAdminObjects() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  const select =
    document.getElementById(
      "admin-object-select"
    );


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
      config.objects[0]?.id;

  }


  select.value =
    adminObjectId;


  loadAdminObjectForm();

}


/* =========================================================
   33. АДМИН: ЗАДАНИЯ
========================================================= */

function renderAdminTasks() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  const taskSelect =
    document.getElementById(
      "admin-task-select"
    );


  const objectTaskSelect =
    document.getElementById(
      "admin-object-task"
    );


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

      const option =
        document.createElement(
          "option"
        );


      option.value =
        taskId;


      option.textContent =
        task.title;


      taskSelect.appendChild(
        option
      );


      objectTaskSelect
        .appendChild(
          option.cloneNode(
            true
          )
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
      )[0];

  }


  taskSelect.value =
    adminTaskId;


  loadAdminTaskForm();

}


/* =========================================================
   34. ФОРМА ОБЪЕКТА
========================================================= */

function loadAdminObjectForm() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  const object =
    config.objects.find(
      item =>
        item.id ===
        adminObjectId
    );


  if (!object) {
    return;
  }


  document
    .getElementById(
      "admin-object-active"
    )
    .checked =
    object.active !== false;


  document
    .getElementById(
      "admin-object-name"
    )
    .value =
    object.name;


  document
    .getElementById(
      "admin-object-x"
    )
    .value =
    object.x;


  document
    .getElementById(
      "admin-object-y"
    )
    .value =
    object.y;


  document
    .getElementById(
      "admin-object-width"
    )
    .value =
    object.width;


  document
    .getElementById(
      "admin-object-height"
    )
    .value =
    object.height;


  const interaction =
    object.interactions[
      object.interactions.length - 1
    ];


  const action =
    interaction?.action || {
      type: "message"
    };


  const actionType =
    action.type === "task"
      ? "task"
      : "message";


  document
    .getElementById(
      "admin-action-type"
    )
    .value =
    actionType;


  if (
    actionType === "task"
  ) {

    document
      .getElementById(
        "admin-object-task"
      )
      .value =
      action.taskId;

  }

  else {

    document
      .getElementById(
        "admin-object-message"
      )
      .value =
      stripHtml(
        action.html || ""
      );

  }


  updateAdminActionFields();

}


/* =========================================================
   35. ФОРМА ЗАДАНИЯ
========================================================= */

function loadAdminTaskForm() {

  const task =
    QUEST_CONFIG[
      adminQuestId
    ]
      .tasks[
        adminTaskId
      ];


  if (!task) {
    return;
  }


  document
    .getElementById(
      "admin-task-title"
    )
    .value =
    task.title;


  document
    .getElementById(
      "admin-task-question"
    )
    .value =
    task.question;


  document
    .getElementById(
      "admin-task-options"
    )
    .value =
    task.options.join(
      "\n"
    );


  document
    .getElementById(
      "admin-task-correct"
    )
    .value =
    task.correct + 1;

}


/* =========================================================
   36. ТИП ДЕЙСТВИЯ
========================================================= */

function updateAdminActionFields() {

  const type =
    document
      .getElementById(
        "admin-action-type"
      )
      .value;


  document
    .getElementById(
      "admin-message-fields"
    )
    .hidden =
    type !== "message";


  document
    .getElementById(
      "admin-task-fields"
    )
    .hidden =
    type !== "task";

}


/* =========================================================
   37. СОХРАНЕНИЕ ОБЪЕКТА
========================================================= */

function saveAdminObject() {

  const config =
    QUEST_CONFIG[
      adminQuestId
    ];


  const object =
    config.objects.find(
      item =>
        item.id ===
        adminObjectId
    );


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
   38. СОХРАНЕНИЕ ЗАДАНИЯ
========================================================= */

function saveAdminTask() {

  const task =
    QUEST_CONFIG[
      adminQuestId
    ]
      .tasks[
        adminTaskId
      ];


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
   39. ПРЕДПРОСМОТР
========================================================= */

function previewAdminQuest() {

  const quest =
    QUESTS.find(
      quest =>
        quest.id ===
        adminQuestId
    );


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


  document
    .getElementById(
      "game-day-title"
    )
    .textContent =
    `День ${selectedQuest.day}`;


  renderInventory();

  renderHotspots();

  showScreen(
    "game"
  );

}


/* =========================================================
   40. СБРОС
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
   41. СТАТУС
========================================================= */

function showAdminStatus(
  text,
  isError = false
) {

  const status =
    document.getElementById(
      "admin-status"
    );


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
   42. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
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
   43. СОБЫТИЯ АДМИНКИ
========================================================= */

document
  .getElementById(
    "admin-quest-select"
  )
  .addEventListener(
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


document
  .getElementById(
    "admin-object-select"
  )
  .addEventListener(
    "change",
    event => {

      adminObjectId =
        event.target.value;


      loadAdminObjectForm();

    }
  );


document
  .getElementById(
    "admin-task-select"
  )
  .addEventListener(
    "change",
    event => {

      adminTaskId =
        event.target.value;


      loadAdminTaskForm();

    }
  );


document
  .getElementById(
    "admin-action-type"
  )
  .addEventListener(
    "change",
    updateAdminActionFields
  );


document
  .getElementById(
    "admin-save-object"
  )
  .addEventListener(
    "click",
    saveAdminObject
  );


document
  .getElementById(
    "admin-save-task"
  )
  .addEventListener(
    "click",
    saveAdminTask
  );


document
  .getElementById(
    "admin-preview"
  )
  .addEventListener(
    "click",
    previewAdminQuest
  );


document
  .getElementById(
    "admin-reset"
  )
  .addEventListener(
    "click",
    resetAdminConfig
  );


/* =========================================================
   44. ЗАПУСК
========================================================= */

loadAdminConfig();

renderDays();

renderInventory();
