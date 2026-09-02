const API_URL = "https://script.google.com/macros/s/AKfycbzPITphK0shtoO5PAhIVxFhb4rIG-ETi8UfkCGr0zsyeZ4TZZRtJygBlsoDWx5agDyX/exec";
const STORAGE_KEY = "psychologyEscapeBuilderV3";

let playToken = "";
let adminToken = "";
let gameStartedAt = 0;
let gameErrors = 0;
let gameHints = 0;
let previewMode = false;
let questCompleting = false;


async function apiPost(action, data = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      action,
      ...data
    })
  });

  const text = await response.text();

  let result;

  try {
    result = JSON.parse(text);
  } catch (error) {
    throw new Error("Сервер вернул некорректный ответ.");
  }

  if (!response.ok || result.ok === false) {
    throw new Error(
      result.error ||
      result.message ||
      "Ошибка связи с сервером."
    );
  }

  return result;
}


function makeEmptyQuest(day) {
  return {
    day,
    enabled: false,
    title: `День ${day}`,
    topic: "",
    password: `day${day}`,
    tasks: {},
    objects: []
  };
}


const DEFAULT_DATA = {

  quests: {

    day1: {
      day: 1,
      enabled: true,
      title: "Первый день в аптеке",
      topic: "Введение в психологию общения",
      password: "day1",

      tasks: {

        psychology: {
          id: "psychology",
          title: "Психология",
          type: "singleChoice",

          question:
            "Что является предметом изучения психологии?",

          options: [
            "Закономерности возникновения, развития и функционирования психики",
            "Только строение головного мозга",
            "Только поведение человека в обществе",
            "Способы лечения психических заболеваний"
          ],

          correct: [0],
          answers: [],
          order: [],
          pairs: [],

          successMessage:
            "Из трубки слышится сообщение: «Ищите там, где всегда холодно»",

          rewards: [
            {
              type: "flag",
              value: "fridgeClueKnown",
              name: "",
              icon: ""
            },

            {
              type: "note",
              value:
                "Телефон: «Ищите там, где всегда холодно».",
              name: "",
              icon: ""
            }
          ]
        },


        psyche: {
          id: "psyche",
          title: "Психика",
          type: "singleChoice",

          question:
            "Как называется свойство высокоорганизованной материи отражать объективную действительность?",

          options: [
            "Психика",
            "Общение",
            "Темперамент",
            "Память"
          ],

          correct: [0],
          answers: [],
          order: [],
          pairs: [],

          successMessage:
            "За карточкой обнаруживается металлическая пластинка с цифрой 7.",

          rewards: [
            {
              type: "note",
              value: "Найдена цифра: 7.",
              name: "",
              icon: ""
            }
          ]
        },


        history: {
          id: "history",
          title: "Основные этапы развития психологии",
          type: "ordering",

          question:
            "Расположите этапы развития представлений о предмете психологии в правильном порядке.",

          options: [],
          correct: [],
          answers: [],

          order: [
            "Душа",
            "Сознание",
            "Поведение",
            "Психика"
          ],

          pairs: [],

          successMessage:
            "На полях журнала обнаружена запись: PAVLOV.",

          rewards: [
            {
              type: "note",
              value: "Пароль от компьютера: PAVLOV.",
              name: "",
              icon: ""
            }
          ]
        },


        mentalActivity: {
          id: "mentalActivity",
          title: "Психическая деятельность",
          type: "singleChoice",

          question:
            "Что наиболее точно описывает психическую деятельность?",

          options: [
            "Совокупность психических процессов, состояний и свойств, обеспечивающих отражение действительности и регуляцию поведения",
            "Только процесс мышления",
            "Только эмоциональные реакции",
            "Любая физическая активность"
          ],

          correct: [0],
          answers: [],
          order: [],
          pairs: [],

          successMessage:
            "На экране остается цифра 2.",

          rewards: [
            {
              type: "note",
              value: "Найдена цифра: 2.",
              name: "",
              icon: ""
            }
          ]
        },


        everydayPsychology: {
          id: "everydayPsychology",
          title: "Житейская психология",
          type: "multipleChoice",

          question:
            "Какие признаки характерны для житейской психологии?",

          options: [
            "Основана на личном опыте",
            "Часто носит интуитивный характер",
            "Всегда проверяется научным экспериментом",
            "Передается через наблюдения, советы и жизненный опыт"
          ],

          correct: [0, 1, 3],
          answers: [],
          order: [],
          pairs: [],

          successMessage:
            "За упаковками обнаруживается небольшой ключ с символом ₽.",

          rewards: [
            {
              type: "item",
              value: "cashKey",
              name: "Ключ от кассы",
              icon: "🔑"
            }
          ]
        },


        communicationPsychology: {
          id: "communicationPsychology",
          title: "Психология общения",
          type: "textInput",

          question:
            "Как называется раздел психологии, изучающий закономерности взаимодействия и общения людей? Введите словосочетание.",

          options: [],
          correct: [],

          answers: [
            "психология общения"
          ],

          order: [],
          pairs: [],

          successMessage:
            "На внутренней стороне крышки кассы вы видите цифру 9.",

          rewards: [
            {
              type: "note",
              value: "Найдена цифра: 9.",
              name: "",
              icon: ""
            }
          ]
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

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "task",
            taskId: "psychology"
          }
        },


        {
          id: "fridge",
          name: "Холодильник",
          active: true,

          x: 5.5,
          y: 47,
          width: 11,
          height: 41,

          requirement: {
            type: "flag",
            key: "fridgeClueKnown",
            consume: false
          },

          fallback:
            "В холодильнике стоят препараты. Ничего необычного вы пока не замечаете.",

          action: {
            type: "giveItem",

            item: {
              id: "smallKey",
              name: "Маленький ключ",
              icon: "🔑"
            }
          }
        },


        {
          id: "locker",
          name: "Служебный шкафчик",
          active: true,

          x: 49.5,
          y: 42,
          width: 13,
          height: 43,

          requirement: {
            type: "item",
            key: "smallKey",
            consume: true
          },

          fallback:
            "Шкафчик заперт. На дверце маленькая замочная скважина.",

          action: {
            type: "task",
            taskId: "psyche"
          }
        },


        {
          id: "journal",
          name: "Журнал",
          active: true,

          x: 51,
          y: 80,
          width: 19,
          height: 22,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "task",
            taskId: "history"
          }
        },


        {
          id: "computer",
          name: "Компьютер",
          active: true,

          x: 28,
          y: 72,
          width: 22,
          height: 29,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "passwordTask",
            password: "PAVLOV",
            taskId: "mentalActivity"
          }
        },


        {
          id: "medicineCabinet",
          name: "Шкаф препаратов",
          active: true,

          x: 19,
          y: 31,
          width: 18,
          height: 47,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "task",
            taskId: "everydayPsychology"
          }
        },


        {
          id: "cashbox",
          name: "Касса",
          active: true,

          x: 72.5,
          y: 80,
          width: 20,
          height: 22,

          requirement: {
            type: "item",
            key: "cashKey",
            consume: true
          },

          fallback:
            "Касса закрыта на ключ.",

          action: {
            type: "task",
            taskId: "communicationPsychology"
          }
        },


        {
          id: "safe",
          name: "Сейф",
          active: true,

          x: 61,
          y: 47,
          width: 11,
          height: 31,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "message",
            message:
              "Сейф закрыт. Похоже, сегодня он не нужен."
          }
        },


        {
          id: "board",
          name: "Доска объявлений",
          active: true,

          x: 31,
          y: 28,
          width: 11,
          height: 19,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "message",
            message:
              "Расписание смен, объявления и старые записки."
          }
        },


        {
          id: "clock",
          name: "Часы",
          active: true,

          x: 33,
          y: 12,
          width: 8,
          height: 12,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "message",
            message:
              "Часы идут. Время явно не собирается вам помогать."
          }
        },


        {
          id: "calendar",
          name: "Календарь",
          active: true,

          x: 40,
          y: 28,
          width: 7,
          height: 16,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "message",
            message:
              "Обычный календарь."
          }
        },


        {
          id: "trash",
          name: "Корзина",
          active: true,

          x: 83,
          y: 61,
          width: 8,
          height: 18,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "message",
            message:
              "Вы проверили даже мусор. В escape room это вполне разумно."
          }
        },


        {
          id: "firstAid",
          name: "Аптечка",
          active: true,

          x: 35.5,
          y: 39,
          width: 9,
          height: 11,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "message",
            message:
              "Пока аптечка вам не нужна."
          }
        },


        {
          id: "door",
          name: "Выход",
          active: true,

          x: 76,
          y: 39,
          width: 13,
          height: 43,

          requirement: {
            type: "none",
            key: "",
            consume: false
          },

          fallback: "",

          action: {
            type: "codeLock",
            code: "792",

            hint:
              "На панели три символа: ☎ → ₽ → 💻",

            success:
              "ПОЗДРАВЛЯЕМ С УСПЕШНЫМ ЗАВЕРШЕНИЕМ СМЕНЫ!"
          }
        }

      ]
    },


    day2: makeEmptyQuest(2),
    day3: makeEmptyQuest(3),
    day4: makeEmptyQuest(4),
    day5: makeEmptyQuest(5),
    day6: makeEmptyQuest(6)

  }

};


/* =========================================================
   ОБЩАЯ БИБЛИОТЕКА ПРЕДМЕТОВ КОМНАТЫ

   Геометрия предметов (название, X, Y, ширина и высота)
   общая для всех дней.

   В каждом дне отдельно хранятся только:
   - активность предмета;
   - условие доступа;
   - действие;
   - связанное задание / пароль / награда.
========================================================= */

DEFAULT_DATA.roomObjects =
  DEFAULT_DATA.quests.day1.objects.map(
    object => ({
      id: object.id,
      name: object.name,
      x: object.x,
      y: object.y,
      width: object.width,
      height: object.height
    })
  );


let APP_DATA =
  structuredClone(
    DEFAULT_DATA
  );


let selectedQuestId =
  "day1";


let adminQuestId =
  "day1";


let adminTaskId =
  null;


let adminObjectId =
  null;


let adminUnlocked =
  false;


let gameState =
  createGameState();


function createGameState() {
  return {
    flags: {},
    inventory: [],
    notes: [],
    completedTasks: {},
    unlockedObjects: {},
    takenObjects: {}
  };
}


/* DOM */

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


/* ОБЩИЕ */

function escapeHtml(text) {
  return String(
    text ?? ""
  )
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function uid(prefix) {
  return (
    prefix +
    "_" +
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .slice(2, 6)
  );
}


function normalize(text) {
  return String(
    text ?? ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}


function showScreen(name) {

  if (
    name === "admin" &&
    !adminUnlocked
  ) {
    name = "adminLogin";
  }


  Object.values(
    screens
  ).forEach(
    screen => {
      screen?.classList.remove(
        "screen--active"
      );
    }
  );


  screens[name]
    ?.classList.add(
      "screen--active"
    );
}


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


function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      APP_DATA
    )
  );
}


function loadData() {

  const raw =
    localStorage.getItem(
      STORAGE_KEY
    );


  if (raw) {

    try {
      APP_DATA =
        JSON.parse(
          raw
        );
    }

    catch (error) {
      console.error(
        "Ошибка загрузки конфигурации",
        error
      );
    }
  }


  migrateRoomObjects();
}


function roomObjectFromLegacy(
  object
) {

  return {
    id: object.id,
    name:
      object.name ||
      "Предмет",
    x:
      Number.isFinite(
        Number(object.x)
      )
        ? Number(object.x)
        : 50,
    y:
      Number.isFinite(
        Number(object.y)
      )
        ? Number(object.y)
        : 50,
    width:
      Number.isFinite(
        Number(object.width)
      )
        ? Number(object.width)
        : 10,
    height:
      Number.isFinite(
        Number(object.height)
      )
        ? Number(object.height)
        : 10
  };
}


function defaultQuestObjectConfig(
  id,
  active = false
) {

  return {
    id,
    active,

    requirement: {
      type: "none",
      key: "",
      consume: false
    },

    fallback: "",

    action: {
      type: "message",
      message:
        "Пока здесь ничего полезного."
    }
  };
}


function migrateRoomObjects() {

  if (
    !Array.isArray(
      APP_DATA.roomObjects
    ) ||
    APP_DATA.roomObjects.length === 0
  ) {

    const day1Objects =
      APP_DATA.quests?.day1?.objects;


    const source =
      Array.isArray(day1Objects) &&
      day1Objects.length
        ? day1Objects
        : DEFAULT_DATA.roomObjects;


    APP_DATA.roomObjects =
      source.map(
        roomObjectFromLegacy
      );
  }


  const knownIds =
    new Set(
      APP_DATA.roomObjects.map(
        object => object.id
      )
    );


  Object.values(
    APP_DATA.quests || {}
  ).forEach(
    quest => {

      if (!Array.isArray(quest.objects)) {
        quest.objects = [];
      }


      quest.objects.forEach(
        object => {

          if (
            object?.id &&
            !knownIds.has(
              object.id
            )
          ) {

            APP_DATA.roomObjects.push(
              roomObjectFromLegacy(
                object
              )
            );

            knownIds.add(
              object.id
            );
          }
        }
      );
    }
  );


  APP_DATA.roomObjects =
    APP_DATA.roomObjects.map(
      roomObjectFromLegacy
    );
}


function roomObjectDefinition(
  id
) {

  return APP_DATA.roomObjects
    .find(
      object =>
        object.id === id
    );
}


function questObjectConfig(
  quest,
  id,
  create = false
) {

  let object =
    quest.objects.find(
      item =>
        item.id === id
    );


  if (
    !object &&
    create
  ) {

    object =
      defaultQuestObjectConfig(
        id,
        false
      );

    quest.objects.push(
      object
    );
  }


  return object || null;
}


function effectiveQuestObject(
  quest,
  id
) {

  const definition =
    roomObjectDefinition(id);


  if (!definition) {
    return null;
  }


  const config =
    questObjectConfig(
      quest,
      id,
      false
    ) ||
    defaultQuestObjectConfig(
      id,
      false
    );


  return {
    ...config,
    ...definition,
    id
  };
}


function questObjects(
  quest
) {

  return APP_DATA.roomObjects
    .map(
      definition =>
        effectiveQuestObject(
          quest,
          definition.id
        )
    )
    .filter(Boolean);
}


/* СТАРТ */

function renderDays() {

  const grid =
    document.getElementById(
      "days-grid"
    );


  grid.innerHTML = "";


  Object.entries(
    APP_DATA.quests
  )
    .sort(
      (a, b) =>
        a[1].day -
        b[1].day
    )
    .forEach(
      ([id, quest]) => {

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
            ${escapeHtml(
              quest.title
            )}
          </span>
        `;


        button.addEventListener(
          "click",
          () => {

            selectedQuestId =
              id;


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


            document
              .getElementById(
                "quest-password"
              )
              .value =
              "";


            document
              .getElementById(
                "password-error"
              )
              .textContent =
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


/* ИГРА */

function currentQuest() {
  return APP_DATA
    .quests[
      selectedQuestId
    ];
}


function startQuest() {

  gameState =
    createGameState();

  gameStartedAt = Date.now();
  gameErrors = 0;
  gameHints = 0;
  questCompleting = false;


  const quest =
    currentQuest();


  document
    .getElementById(
      "game-day-title"
    )
    .textContent =
    `День ${quest.day}`;


  renderInventory();

  renderHotspots();

  showScreen(
    "game"
  );
}


function renderHotspots() {

  const host =
    document.getElementById(
      "hotspots"
    );


  host.innerHTML =
    "";


  const quest =
    currentQuest();


  questObjects(quest)
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


        button.setAttribute(
          "aria-label",
          object.name
        );


        button.title =
          object.name;


        button.addEventListener(
          "click",
          () => {

            button.classList.add(
              "hotspot--tap"
            );


            setTimeout(
              () =>
                button
                  .classList
                  .remove(
                    "hotspot--tap"
                  ),

              200
            );


            interactObject(
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


function requirementPassed(
  object
) {

  if (
    gameState.unlockedObjects[
      object.id
    ]
  ) {
    return true;
  }


  const requirement =
    object.requirement || {
      type: "none"
    };


  if (
    requirement.type ===
    "none"
  ) {
    return true;
  }


  if (
    requirement.type ===
    "flag"
  ) {
    return Boolean(
      gameState.flags[
        requirement.key
      ]
    );
  }


  if (
    requirement.type ===
    "task"
  ) {
    return Boolean(
      gameState.completedTasks[
        requirement.key
      ]
    );
  }


  if (
    requirement.type ===
    "item"
  ) {
    return hasItem(
      requirement.key
    );
  }


  return false;
}


function unlockRequirement(
  object
) {

  const requirement =
    object.requirement;


  if (
    !requirement ||
    requirement.type ===
    "none"
  ) {
    return;
  }


  if (
    requirement.type ===
      "item" &&
    requirement.consume
  ) {

    removeItem(
      requirement.key
    );

  }


  gameState
    .unlockedObjects[
      object.id
    ] =
    true;
}


function interactObject(
  object
) {

  if (
    !requirementPassed(
      object
    )
  ) {

    openOverlay(`
      <h3>
        ${escapeHtml(
          object.name
        )}
      </h3>

      <div class="locked-box">
        ${escapeHtml(
          object.fallback ||
          "Пока это недоступно."
        )}
      </div>
    `);

    return;
  }


  unlockRequirement(
    object
  );


  runObjectAction(
    object
  );
}


function runObjectAction(
  object
) {

  const action =
    object.action || {};


  if (
    action.type ===
    "message"
  ) {

    openOverlay(`
      <h3>
        ${escapeHtml(
          object.name
        )}
      </h3>

      <p>
        ${escapeHtml(
          action.message ||
          "Ничего необычного."
        )}
      </p>
    `);

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

    giveObjectItem(
      object
    );

    return;
  }


  if (
    action.type ===
    "passwordTask"
  ) {

    openPasswordTask(
      object
    );

    return;
  }


  if (
    action.type ===
    "codeLock"
  ) {

    openCodeLock(
      object
    );

  }
}


function giveObjectItem(
  object
) {

  if (
    gameState.takenObjects[
      object.id
    ]
  ) {

    openOverlay(`
      <h3>
        ${escapeHtml(
          object.name
        )}
      </h3>

      <p>
        Здесь больше ничего нет.
      </p>
    `);

    return;
  }


  const item =
    object.action.item;


  openOverlay(`
    <h3>
      ${escapeHtml(
        object.name
      )}
    </h3>

    <div class="clue-card">
      Найден предмет:
      <strong>
        ${escapeHtml(
          item.name
        )}
      </strong>
    </div>

    <button
      id="take-object-item"
      class="object-action-btn"
      type="button"
    >
      ${escapeHtml(
        item.icon ||
        "📦"
      )}
      Забрать
    </button>
  `);


  document
    .getElementById(
      "take-object-item"
    )
    .addEventListener(
      "click",
      () => {

        addItem(
          item
        );


        gameState
          .takenObjects[
            object.id
          ] =
          true;


        openOverlay(`
          <h3>
            Предмет получен
          </h3>

          <p>
            ${escapeHtml(
              item.name
            )}
            добавлен в инвентарь.
          </p>
        `);

      }
    );
}


function openPasswordTask(
  object
) {

  const action =
    object.action;


  openOverlay(`
    <h3>
      ${escapeHtml(
        object.name
      )}
    </h3>

    <div class="locked-box">
      Требуется пароль.
    </div>

    <input
      id="object-password-input"
      class="text-input"
      type="text"
      autocomplete="off"
      placeholder="Введите пароль"
    >

    <br><br>

    <button
      id="object-password-check"
      class="primary-btn"
      type="button"
    >
      Ввести
    </button>

    <p
      id="object-password-error"
      class="error-text"
    ></p>
  `);


  const check =
    () => {

      const input =
        document.getElementById(
          "object-password-input"
        );


      if (
        normalize(
          input.value
        ) !==
        normalize(
          action.password
        )
      ) {

        if (!previewMode) {
          gameErrors += 1;
        }

        document
          .getElementById(
            "object-password-error"
          )
          .textContent =
          "Пароль не подходит.";

        return;
      }


      openTask(
        action.taskId
      );

    };


  document
    .getElementById(
      "object-password-check"
    )
    .addEventListener(
      "click",
      check
    );
}


function openCodeLock(
  object
) {

  const action =
    object.action;


  openOverlay(`
    <h3>
      ${escapeHtml(
        object.name
      )}
    </h3>

    <div class="locked-box">
      Кодовый замок
    </div>

    <div class="clue-card">
      ${escapeHtml(
        action.hint ||
        ""
      )}
    </div>

    <input
      id="code-lock-input"
      class="text-input"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      placeholder="Введите код"
    >

    <br><br>

    <button
      id="code-lock-check"
      class="primary-btn"
      type="button"
    >
      Открыть
    </button>

    <p
      id="code-lock-error"
      class="error-text"
    ></p>
  `);


  document
    .getElementById(
      "code-lock-check"
    )
    .addEventListener(
      "click",
      () => {

        const value =
          document
            .getElementById(
              "code-lock-input"
            )
            .value
            .trim();


        if (
          value !==
          String(
            action.code
          )
        ) {

          if (!previewMode) {
            gameErrors += 1;
          }

          document
            .getElementById(
              "code-lock-error"
            )
            .textContent =
            "Код неверный.";

          return;
        }


        finishQuest(action);

      }
    );
}


async function finishQuest(action) {

  if (questCompleting) {
    return;
  }


  if (previewMode) {

    openOverlay(`
      <h2>
        ${escapeHtml(
          action.success ||
          "Вы выбрались!"
        )}
      </h2>

      <div class="success-box">
        Дверь открыта.
      </div>

      <p>
        Это предпросмотр администратора.
        Результат не записан и персональный код не создан.
      </p>
    `);

    return;
  }


  if (!playToken) {

    openOverlay(`
      <h3>
        Ошибка
      </h3>

      <p>
        Игровая сессия не найдена.
        Вернитесь на стартовую страницу и войдите в квест заново.
      </p>
    `);

    return;
  }


  questCompleting = true;


  openOverlay(`
    <h2>
      ${escapeHtml(
        action.success ||
        "Вы выбрались!"
      )}
    </h2>

    <div class="success-box">
      Дверь открыта.
    </div>

    <p>
      Создаем ваш персональный код...
    </p>
  `);


  const quest =
    currentQuest();


  const durationSec =
    Math.max(
      0,
      Math.round(
        (Date.now() - gameStartedAt) / 1000
      )
    );


  try {

    const result =
      await apiPost(
        "completeQuest",
        {
          playToken,
          questId:
            selectedQuestId,
          day:
            quest.day,
          errors:
            gameErrors,
          hints:
            gameHints,
          durationSec
        }
      );


    const code =
      result.code ||
      result.completionCode ||
      "";


    if (!code) {
      throw new Error(
        "Сервер не вернул персональный код."
      );
    }


    openOverlay(`
      <h2>
        ${escapeHtml(
          action.success ||
          "ПОЗДРАВЛЯЕМ С УСПЕШНЫМ ЗАВЕРШЕНИЕМ СМЕНЫ!"
        )}
      </h2>

      <div class="success-box">
        Дверь открыта.
      </div>

      <p>
        Ваш персональный код:
      </p>

      <div class="clue-card">
        <strong style="font-size:1.45em;letter-spacing:.08em;">
          ${escapeHtml(code)}
        </strong>
      </div>

      <p>
        Сохраните этот код и предъявите преподавателю.
      </p>
    `);

  }

  catch (error) {

    questCompleting =
      false;


    openOverlay(`
      <h3>
        Дверь открыта, но код пока не получен
      </h3>

      <p>
        ${escapeHtml(
          error.message ||
          "Не удалось связаться с сервером."
        )}
      </p>

      <button
        id="retry-completion"
        class="primary-btn"
        type="button"
      >
        Получить код еще раз
      </button>
    `);


    document
      .getElementById(
        "retry-completion"
      )
      ?.addEventListener(
        "click",
        () =>
          finishQuest(action)
      );

  }
}


/* ЗАДАНИЯ */

function openTask(
  taskId
) {

  const task =
    currentQuest()
      .tasks[
        taskId
      ];


  if (!task) {

    openOverlay(`
      <h3>
        Ошибка
      </h3>

      <p>
        Задание не найдено.
      </p>
    `);

    return;
  }


  if (
    gameState.completedTasks[
      taskId
    ]
  ) {

    openOverlay(`
      <h3>
        ${escapeHtml(
          task.title
        )}
      </h3>

      <div class="success-box">
        Это задание уже выполнено.
      </div>

      <p>
        ${escapeHtml(
          task.successMessage ||
          ""
        )}
      </p>
    `);

    return;
  }


  if (
    task.type ===
    "singleChoice"
  ) {
    openSingleChoice(
      task
    );
  }


  else if (
    task.type ===
    "multipleChoice"
  ) {
    openMultipleChoice(
      task
    );
  }


  else if (
    task.type ===
    "textInput"
  ) {
    openTextTask(
      task
    );
  }


  else if (
    task.type ===
    "ordering"
  ) {
    openOrderingTask(
      task
    );
  }


  else if (
    task.type ===
    "matching"
  ) {
    openMatchingTask(
      task
    );
  }

}


function taskHeader(
  task
) {

  return `
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
  `;
}


function openSingleChoice(
  task
) {

  const html =
    task.options
      .map(
        (option, index) => `
          <button
            class="choice-btn"
            data-single="${index}"
            type="button"
          >
            ${escapeHtml(
              option
            )}
          </button>
        `
      )
      .join("");


  openOverlay(
    taskHeader(task) +
    `
      <div class="choice-list">
        ${html}
      </div>

      <p
        id="task-error"
        class="error-text"
      ></p>
    `
  );


  overlayContent
    .querySelectorAll(
      "[data-single]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const answer =
              Number(
                button.dataset.single
              );


            if (
              answer ===
              task.correct[0]
            ) {
              completeTask(
                task
              );
            }

            else {
              taskError();
            }

          }
        );

      }
    );
}


function openMultipleChoice(
  task
) {

  const html =
    task.options
      .map(
        (option, index) => `
          <label class="choice-check">
            <input
              type="checkbox"
              value="${index}"
              class="multi-answer"
            >

            <span>
              ${escapeHtml(
                option
              )}
            </span>
          </label>
        `
      )
      .join("");


  openOverlay(
    taskHeader(task) +
    `
      <div class="choice-list">
        ${html}
      </div>

      <br>

      <button
        id="multi-check"
        class="primary-btn"
        type="button"
      >
        Проверить
      </button>

      <p
        id="task-error"
        class="error-text"
      ></p>
    `
  );


  document
    .getElementById(
      "multi-check"
    )
    .addEventListener(
      "click",
      () => {

        const selected =
          [
            ...overlayContent
              .querySelectorAll(
                ".multi-answer:checked"
              )
          ]
            .map(
              input =>
                Number(
                  input.value
                )
            )
            .sort();


        const correct =
          [
            ...task.correct
          ].sort();


        if (
          JSON.stringify(
            selected
          ) ===
          JSON.stringify(
            correct
          )
        ) {

          completeTask(
            task
          );

        }

        else {
          taskError();
        }

      }
    );
}


function openTextTask(
  task
) {

  openOverlay(
    taskHeader(task) +
    `
      <input
        id="text-task-input"
        class="text-input"
        type="text"
        autocomplete="off"
      >

      <br><br>

      <button
        id="text-task-check"
        class="primary-btn"
        type="button"
      >
        Проверить
      </button>

      <p
        id="task-error"
        class="error-text"
      ></p>
    `
  );


  document
    .getElementById(
      "text-task-check"
    )
    .addEventListener(
      "click",
      () => {

        const value =
          normalize(
            document
              .getElementById(
                "text-task-input"
              )
              .value
          );


        const ok =
          task.answers
            .map(normalize)
            .includes(
              value
            );


        if (ok) {
          completeTask(
            task
          );
        }

        else {
          taskError();
        }

      }
    );
}


function openOrderingTask(
  task
) {

  const order =
    [...task.order]
      .sort(
        () =>
          Math.random() -
          0.5
      );


  function render() {

    openOverlay(
      taskHeader(task) +
      `
        <div
          id="order-list"
          class="order-list"
        >
          ${
            order
              .map(
                (item, index) => `
                  <div class="order-item">

                    <span>
                      ${escapeHtml(
                        item
                      )}
                    </span>

                    <div class="order-controls">

                      <button
                        type="button"
                        data-up="${index}"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        data-down="${index}"
                      >
                        ↓
                      </button>

                    </div>

                  </div>
                `
              )
              .join("")
          }
        </div>

        <br>

        <button
          id="order-check"
          class="primary-btn"
          type="button"
        >
          Проверить
        </button>

        <p
          id="task-error"
          class="error-text"
        ></p>
      `
    );


    overlayContent
      .querySelectorAll(
        "[data-up]"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const i =
                Number(
                  button.dataset.up
                );


              if (i === 0) {
                return;
              }


              [
                order[i - 1],
                order[i]
              ] =
              [
                order[i],
                order[i - 1]
              ];


              render();

            }
          );

        }
      );


    overlayContent
      .querySelectorAll(
        "[data-down]"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const i =
                Number(
                  button.dataset.down
                );


              if (
                i ===
                order.length - 1
              ) {
                return;
              }


              [
                order[i + 1],
                order[i]
              ] =
              [
                order[i],
                order[i + 1]
              ];


              render();

            }
          );

        }
      );


    document
      .getElementById(
        "order-check"
      )
      .addEventListener(
        "click",
        () => {

          if (
            JSON.stringify(
              order
            ) ===
            JSON.stringify(
              task.order
            )
          ) {

            completeTask(
              task
            );

          }

          else {
            taskError();
          }

        }
      );

  }


  render();
}


function openMatchingTask(
  task
) {

  const rights =
    task.pairs
      .map(
        pair =>
          pair.right
      )
      .sort(
        () =>
          Math.random() -
          0.5
      );


  const rows =
    task.pairs
      .map(
        (pair, index) => `
          <div class="match-row">

            <div>
              ${escapeHtml(
                pair.left
              )}
            </div>

            <select
              class="admin-input match-select"
              data-match="${index}"
            >

              <option value="">
                Выберите
              </option>

              ${
                rights
                  .map(
                    right => `
                      <option
                        value="${escapeHtml(
                          right
                        )}"
                      >
                        ${escapeHtml(
                          right
                        )}
                      </option>
                    `
                  )
                  .join("")
              }

            </select>

          </div>
        `
      )
      .join("");


  openOverlay(
    taskHeader(task) +
    rows +
    `
      <button
        id="matching-check"
        class="primary-btn"
        type="button"
      >
        Проверить
      </button>

      <p
        id="task-error"
        class="error-text"
      ></p>
    `
  );


  document
    .getElementById(
      "matching-check"
    )
    .addEventListener(
      "click",
      () => {

        const selects =
          [
            ...overlayContent
              .querySelectorAll(
                ".match-select"
              )
          ];


        const ok =
          selects.every(
            select => {

              const index =
                Number(
                  select.dataset.match
                );


              return (
                select.value ===
                task.pairs[
                  index
                ].right
              );

            }
          );


        if (ok) {
          completeTask(
            task
          );
        }

        else {
          taskError();
        }

      }
    );
}


function taskError() {

  if (!previewMode) {
    gameErrors += 1;
  }


  const target =
    document.getElementById(
      "task-error"
    );


  if (target) {
    target.textContent =
      "Пока неверно. Попробуйте еще раз.";
  }
}


function completeTask(
  task
) {

  gameState
    .completedTasks[
      task.id
    ] =
    true;


  applyRewards(
    task.rewards || []
  );


  openOverlay(`
    <h3>
      Верно!
    </h3>

    <div class="success-box">
      ${escapeHtml(
        task.successMessage ||
        "Задание выполнено."
      )}
    </div>
  `);
}


/* НАГРАДЫ */

function applyRewards(
  rewards
) {

  rewards.forEach(
    reward => {

      if (
        reward.type ===
        "note"
      ) {

        addNote(
          reward.value
        );

      }


      else if (
        reward.type ===
        "flag"
      ) {

        gameState
          .flags[
            reward.value
          ] =
          true;

      }


      else if (
        reward.type ===
        "item"
      ) {

        addItem({
          id:
            reward.value,

          name:
            reward.name ||
            reward.value,

          icon:
            reward.icon ||
            "📦"
        });

      }

    }
  );
}


/* ИНВЕНТАРЬ */

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


  gameState
    .inventory
    .push(
      item
    );


  renderInventory();
}


function removeItem(
  id
) {

  gameState.inventory =
    gameState
      .inventory
      .filter(
        item =>
          item.id !== id
      );


  renderInventory();
}


function hasItem(
  id
) {

  return gameState
    .inventory
    .some(
      item =>
        item.id === id
    );
}


function addNote(
  text
) {

  if (
    !gameState.notes.includes(
      text
    )
  ) {

    gameState
      .notes
      .push(
        text
      );

  }
}


function renderInventory() {

  const host =
    document.getElementById(
      "inventory-slots"
    );


  host.innerHTML =
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

      slot.textContent =
        item.icon ||
        "📦";


      slot.title =
        item.name;

    }


    host.appendChild(
      slot
    );

  }
}


/* ВХОД В ИГРУ */

document
  .getElementById(
    "enter-quest"
  )
  .addEventListener(
    "click",
    async () => {

      const quest =
        currentQuest();


      const input =
        document
          .getElementById(
            "quest-password"
          )
          .value;


      const errorElement =
        document
          .getElementById(
            "password-error"
          );


      errorElement.textContent =
        "Проверяем пароль...";


      try {

        const result =
          await apiPost(
            "startQuest",
            {
              questId:
                selectedQuestId,

              day:
                quest.day,

              password:
                input
            }
          );


        playToken =
          result.playToken ||
          result.token ||
          "";


        if (!playToken) {
          throw new Error(
            "Сервер не создал игровую сессию."
          );
        }


        previewMode =
          false;


        errorElement.textContent =
          "";


        startQuest();

      }

      catch (error) {

        playToken =
          "";


        errorElement.textContent =
          error.message ===
          "INVALID_PASSWORD"
            ? "Неверный пароль."
            : (
                error.message ||
                "Не удалось войти в квест."
              );

      }

    }
  );


document
  .getElementById(
    "back-to-start"
  )
  .addEventListener(
    "click",
    () =>
      showScreen(
        "start"
      )
  );


/* АДМИН-ПАРОЛЬ */

document
  .getElementById(
    "open-admin"
  )
  .addEventListener(
    "click",
    () => {

      adminUnlocked =
        false;


      adminToken =
        "";


      document
        .getElementById(
          "admin-password"
        )
        .value =
        "";


      document
        .getElementById(
          "admin-password-error"
        )
        .textContent =
        "";


      showScreen(
        "adminLogin"
      );

    }
  );


document
  .getElementById(
    "enter-admin"
  )
  .addEventListener(
    "click",
    checkAdminLogin
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
        checkAdminLogin();
      }

    }
  );


async function checkAdminLogin() {

  const value =
    document
      .getElementById(
        "admin-password"
      )
      .value;


  const errorElement =
    document
      .getElementById(
        "admin-password-error"
      );


  errorElement.textContent =
    "Проверяем пароль...";


  try {

    const result =
      await apiPost(
        "adminLogin",
        {
          password:
            value
        }
      );


    adminToken =
      result.adminToken ||
      result.token ||
      "";


    if (!adminToken) {
      throw new Error(
        "Сервер не создал сессию администратора."
      );
    }


    adminUnlocked =
      true;


    errorElement.textContent =
      "";


    renderAdminQuestSelect();


    showScreen(
      "admin"
    );

  }

  catch (error) {

    adminUnlocked =
      false;


    adminToken =
      "";


    errorElement.textContent =
      error.message ===
      "INVALID_ADMIN_PASSWORD"
        ? "Неверный пароль."
        : (
            error.message ||
            "Не удалось войти в админ-панель."
          );

  }
}


document
  .getElementById(
    "admin-login-back"
  )
  .addEventListener(
    "click",
    () => {

      adminUnlocked =
        false;

      adminToken =
        "";

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

      adminUnlocked =
        false;

      adminToken =
        "";

      showScreen(
        "start"
      );

    }
  );


/* АДМИН — ДНИ */

function adminQuest() {
  return APP_DATA
    .quests[
      adminQuestId
    ];
}


function renderAdminQuestSelect() {

  if (!adminUnlocked) {
    return;
  }


  const select =
    document.getElementById(
      "admin-quest-select"
    );


  select.innerHTML =
    "";


  Object.entries(
    APP_DATA.quests
  )
    .sort(
      (a, b) =>
        a[1].day -
        b[1].day
    )
    .forEach(
      ([id, quest]) => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          id;


        option.textContent =
          `День ${quest.day}`;


        select.appendChild(
          option
        );

      }
    );


  select.value =
    adminQuestId;


  loadAdminQuestForm();

  renderAdminTaskList();

  renderAdminObjectList();
}


function loadAdminQuestForm() {

  const quest =
    adminQuest();


  document
    .getElementById(
      "admin-quest-enabled"
    )
    .checked =
    quest.enabled;


  document
    .getElementById(
      "admin-quest-title"
    )
    .value =
    quest.title;


  document
    .getElementById(
      "admin-quest-topic"
    )
    .value =
    quest.topic;


  document
    .getElementById(
      "admin-quest-password"
    )
    .value =
    quest.password;
}


document
  .getElementById(
    "admin-quest-select"
  )
  .addEventListener(
    "change",
    event => {

      adminQuestId =
        event.target.value;


      adminTaskId =
        null;


      adminObjectId =
        null;


      loadAdminQuestForm();

      renderAdminTaskList();

      renderAdminObjectList();

    }
  );


document
  .getElementById(
    "admin-save-quest"
  )
  .addEventListener(
    "click",
    async () => {

      const quest =
        adminQuest();


      quest.enabled =
        document
          .getElementById(
            "admin-quest-enabled"
          )
          .checked;


      quest.title =
        document
          .getElementById(
            "admin-quest-title"
          )
          .value
          .trim();


      quest.topic =
        document
          .getElementById(
            "admin-quest-topic"
          )
          .value
          .trim();


      quest.password =
        document
          .getElementById(
            "admin-quest-password"
          )
          .value;


      try {

        await apiPost(
          "setQuestPassword",
          {
            adminToken,
            questId:
              adminQuestId,
            day:
              quest.day,
            password:
              quest.password
          }
        );


        saveData();

        renderDays();


        adminStatus(
          "Настройки дня и пароль сохранены."
        );

      }

      catch (error) {

        adminStatus(
          error.message ||
          "Не удалось сохранить пароль дня на сервере.",
          true
        );

      }
    }
  );

/* АДМИН — ОБЪЕКТЫ */

function renderAdminObjectList() {

  const select =
    document.getElementById(
      "admin-object-select"
    );


  select.innerHTML =
    "";


  APP_DATA.roomObjects
    .forEach(
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
    !APP_DATA.roomObjects.some(
      object =>
        object.id ===
        adminObjectId
    )
  ) {

    adminObjectId =
      APP_DATA.roomObjects[0]
        ?.id ||
      null;

  }


  if (
    adminObjectId
  ) {

    select.value =
      adminObjectId;


    loadAdminObject();

  }

  else {

    clearAdminObject();

  }


  fillTaskOptions(
    document.getElementById(
      "admin-object-task"
    )
  );
}


function selectedAdminObject() {

  if (!adminObjectId) {
    return null;
  }


  return effectiveQuestObject(
    adminQuest(),
    adminObjectId
  );
}


function selectedRoomObjectDefinition() {

  if (!adminObjectId) {
    return null;
  }


  return roomObjectDefinition(
    adminObjectId
  );
}


function selectedQuestObjectConfig(
  create = false
) {

  if (!adminObjectId) {
    return null;
  }


  return questObjectConfig(
    adminQuest(),
    adminObjectId,
    create
  );
}


function clearAdminObject() {

  document
    .getElementById(
      "admin-object-active"
    )
    .checked =
    false;


  [
    "admin-object-name",
    "admin-object-x",
    "admin-object-y",
    "admin-object-width",
    "admin-object-height",
    "admin-requirement-key",
    "admin-object-fallback",
    "admin-object-message",
    "admin-object-item-id",
    "admin-object-item-name",
    "admin-object-item-icon",
    "admin-object-password",
    "admin-object-code",
    "admin-object-code-hint",
    "admin-object-success"
  ].forEach(
    id => {

      document
        .getElementById(
          id
        )
        .value =
        "";

    }
  );


  document
    .getElementById(
      "admin-requirement-type"
    )
    .value =
    "none";


  document
    .getElementById(
      "admin-requirement-consume"
    )
    .checked =
    false;


  document
    .getElementById(
      "admin-object-action"
    )
    .value =
    "message";


  updateRequirementFields();

  updateObjectActionFields();
}


function loadAdminObject() {

  const object =
    selectedAdminObject();


  if (!object) {

    clearAdminObject();

    return;

  }


  document
    .getElementById(
      "admin-object-active"
    )
    .checked =
    object.active === true;


  document
    .getElementById(
      "admin-object-name"
    )
    .value =
    object.name || "";


  document
    .getElementById(
      "admin-object-x"
    )
    .value =
    object.x ?? 50;


  document
    .getElementById(
      "admin-object-y"
    )
    .value =
    object.y ?? 50;


  document
    .getElementById(
      "admin-object-width"
    )
    .value =
    object.width ?? 10;


  document
    .getElementById(
      "admin-object-height"
    )
    .value =
    object.height ?? 10;


  const req =
    object.requirement || {
      type: "none",
      key: "",
      consume: false
    };


  document
    .getElementById(
      "admin-requirement-type"
    )
    .value =
    req.type || "none";


  document
    .getElementById(
      "admin-requirement-key"
    )
    .value =
    req.key || "";


  document
    .getElementById(
      "admin-requirement-consume"
    )
    .checked =
    Boolean(
      req.consume
    );


  document
    .getElementById(
      "admin-object-fallback"
    )
    .value =
    object.fallback || "";


  const action =
    object.action || {
      type: "message",
      message:
        "Пока здесь ничего полезного."
    };


  document
    .getElementById(
      "admin-object-action"
    )
    .value =
    action.type ||
    "message";


  document
    .getElementById(
      "admin-object-message"
    )
    .value =
    action.message || "";


  fillTaskOptions(
    document.getElementById(
      "admin-object-task"
    )
  );


  document
    .getElementById(
      "admin-object-task"
    )
    .value =
    action.taskId || "";


  document
    .getElementById(
      "admin-object-item-id"
    )
    .value =
    action.item?.id || "";


  document
    .getElementById(
      "admin-object-item-name"
    )
    .value =
    action.item?.name || "";


  document
    .getElementById(
      "admin-object-item-icon"
    )
    .value =
    action.item?.icon || "";


  document
    .getElementById(
      "admin-object-password"
    )
    .value =
    action.password || "";


  document
    .getElementById(
      "admin-object-code"
    )
    .value =
    action.code || "";


  document
    .getElementById(
      "admin-object-code-hint"
    )
    .value =
    action.hint || "";


  document
    .getElementById(
      "admin-object-success"
    )
    .value =
    action.success || "";


  updateRequirementFields();

  updateObjectActionFields();
}


document
  .getElementById(
    "admin-object-select"
  )
  .addEventListener(
    "change",
    event => {

      adminObjectId =
        event.target.value;


      loadAdminObject();

    }
  );


/*
  Новый предмет комнаты создается ОДИН РАЗ
  в общей библиотеке.

  Во всех днях он сразу становится доступен
  для настройки.

  В текущем дне новый предмет включаем,
  в остальных днях оставляем выключенным.
*/

document
  .getElementById(
    "admin-add-object"
  )
  .addEventListener(
    "click",
    () => {

      const id =
        uid("object");


      APP_DATA.roomObjects.push({
        id,

        name:
          "Новый предмет",

        x: 50,
        y: 50,

        width: 10,
        height: 10
      });


      Object.entries(
        APP_DATA.quests
      )
        .forEach(
          ([questId, quest]) => {

            quest.objects.push(
              defaultQuestObjectConfig(
                id,
                questId ===
                  adminQuestId
              )
            );

          }
        );


      adminObjectId =
        id;


      saveData();

      renderAdminObjectList();


      adminStatus(
        "Предмет добавлен в общую комнату."
      );

    }
  );


/*
  Удаление предмета — глобальное.

  Если удалить телефон как физический объект,
  он исчезнет из всех дней.

  Если предмет нужен в других днях,
  но не нужен в текущем — его надо просто
  выключить галочкой «Активен».
*/

document
  .getElementById(
    "admin-delete-object"
  )
  .addEventListener(
    "click",
    () => {

      if (
        !adminObjectId
      ) {
        return;
      }


      const definition =
        selectedRoomObjectDefinition();


      if (!definition) {
        return;
      }


      if (
        !confirm(
          `Удалить предмет «${definition.name}» из комнаты во всех днях?`
        )
      ) {
        return;
      }


      APP_DATA.roomObjects =
        APP_DATA.roomObjects
          .filter(
            object =>
              object.id !==
              adminObjectId
          );


      Object.values(
        APP_DATA.quests
      )
        .forEach(
          quest => {

            quest.objects =
              quest.objects.filter(
                object =>
                  object.id !==
                  adminObjectId
              );

          }
        );


      adminObjectId =
        null;


      saveData();

      renderAdminObjectList();


      adminStatus(
        "Предмет удален из всех дней."
      );

    }
  );


function updateRequirementFields() {

  const type =
    document
      .getElementById(
        "admin-requirement-type"
      )
      .value;


  document
    .getElementById(
      "admin-requirement-key-wrap"
    )
    .style.display =
    type === "none"
      ? "none"
      : "block";


  document
    .getElementById(
      "admin-consume-wrap"
    )
    .style.display =
    type === "item"
      ? "flex"
      : "none";
}


document
  .getElementById(
    "admin-requirement-type"
  )
  .addEventListener(
    "change",
    updateRequirementFields
  );


function updateObjectActionFields() {

  document
    .querySelectorAll(
      ".object-action-fields"
    )
    .forEach(
      element => {

        element.style.display =
          "none";

      }
    );


  const type =
    document
      .getElementById(
        "admin-object-action"
      )
      .value;


  if (
    type === "message"
  ) {

    showActionField(
      "object-action-message"
    );

  }


  if (
    type === "task"
  ) {

    showActionField(
      "object-action-task"
    );

  }


  if (
    type === "giveItem"
  ) {

    showActionField(
      "object-action-item"
    );

  }


  if (
    type ===
    "passwordTask"
  ) {

    showActionField(
      "object-action-password"
    );

    showActionField(
      "object-action-task"
    );

  }


  if (
    type === "codeLock"
  ) {

    showActionField(
      "object-action-code"
    );

  }
}


function showActionField(
  id
) {

  document
    .getElementById(
      id
    )
    .style.display =
    "block";
}


document
  .getElementById(
    "admin-object-action"
  )
  .addEventListener(
    "change",
    updateObjectActionFields
  );


/*
  СОХРАНЕНИЕ ПРЕДМЕТА

  name/x/y/width/height
  сохраняются в ОБЩЕЙ комнате.

  active/requirement/fallback/action
  сохраняются только для выбранного дня.
*/

document
  .getElementById(
    "admin-save-object"
  )
  .addEventListener(
    "click",
    () => {

      const definition =
        selectedRoomObjectDefinition();


      if (!definition) {
        return;
      }


      const config =
        selectedQuestObjectConfig(
          true
        );


      if (!config) {
        return;
      }


      /* ОБЩИЕ ПАРАМЕТРЫ */

      definition.name =
        document
          .getElementById(
            "admin-object-name"
          )
          .value
          .trim() ||
        "Предмет";


      definition.x =
        Number(
          document
            .getElementById(
              "admin-object-x"
            )
            .value
        );


      definition.y =
        Number(
          document
            .getElementById(
              "admin-object-y"
            )
            .value
        );


      definition.width =
        Number(
          document
            .getElementById(
              "admin-object-width"
            )
            .value
        );


      definition.height =
        Number(
          document
            .getElementById(
              "admin-object-height"
            )
            .value
        );


      /* НАСТРОЙКИ ТЕКУЩЕГО ДНЯ */

      config.active =
        document
          .getElementById(
            "admin-object-active"
          )
          .checked;


      config.requirement = {
        type:
          document
            .getElementById(
              "admin-requirement-type"
            )
            .value,

        key:
          document
            .getElementById(
              "admin-requirement-key"
            )
            .value
            .trim(),

        consume:
          document
            .getElementById(
              "admin-requirement-consume"
            )
            .checked
      };


      config.fallback =
        document
          .getElementById(
            "admin-object-fallback"
          )
          .value
          .trim();


      const type =
        document
          .getElementById(
            "admin-object-action"
          )
          .value;


      if (
        type === "message"
      ) {

        config.action = {
          type,

          message:
            document
              .getElementById(
                "admin-object-message"
              )
              .value
        };

      }


      else if (
        type === "task"
      ) {

        config.action = {
          type,

          taskId:
            document
              .getElementById(
                "admin-object-task"
              )
              .value
        };

      }


      else if (
        type === "giveItem"
      ) {

        config.action = {
          type,

          item: {
            id:
              document
                .getElementById(
                  "admin-object-item-id"
                )
                .value
                .trim(),

            name:
              document
                .getElementById(
                  "admin-object-item-name"
                )
                .value
                .trim(),

            icon:
              document
                .getElementById(
                  "admin-object-item-icon"
                )
                .value
                .trim()
          }
        };

      }


      else if (
        type ===
        "passwordTask"
      ) {

        config.action = {
          type,

          password:
            document
              .getElementById(
                "admin-object-password"
              )
              .value,

          taskId:
            document
              .getElementById(
                "admin-object-task"
              )
              .value
        };

      }


      else if (
        type ===
        "codeLock"
      ) {

        config.action = {
          type,

          code:
            document
              .getElementById(
                "admin-object-code"
              )
              .value,

          hint:
            document
              .getElementById(
                "admin-object-code-hint"
              )
              .value,

          success:
            document
              .getElementById(
                "admin-object-success"
              )
              .value
        };

      }


      saveData();

      renderAdminObjectList();


      adminStatus(
        "Предмет сохранен. Положение общее, действие настроено для этого дня."
      );

    }
  );


/* АДМИН — ЗАДАНИЯ */

function fillTaskOptions(
  select
) {

  if (!select) {
    return;
  }


  select.innerHTML =
    "";


  const emptyOption =
    document.createElement(
      "option"
    );


  emptyOption.value =
    "";


  emptyOption.textContent =
    "— не выбрано —";


  select.appendChild(
    emptyOption
  );


  Object.values(
    adminQuest().tasks
  )
    .forEach(
      task => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          task.id;


        option.textContent =
          task.title;


        select.appendChild(
          option
        );

      }
    );
}


function renderAdminTaskList() {

  const select =
    document.getElementById(
      "admin-task-select"
    );


  fillTaskOptions(
    select
  );


  if (
    !adminTaskId ||
    !adminQuest()
      .tasks[
        adminTaskId
      ]
  ) {

    adminTaskId =
      Object.keys(
        adminQuest().tasks
      )[0] ||
      null;

  }


  if (
    adminTaskId
  ) {

    select.value =
      adminTaskId;


    loadAdminTask();

  }

  else {

    clearAdminTask();

  }


  fillTaskOptions(
    document.getElementById(
      "admin-object-task"
    )
  );
}


function selectedAdminTask() {

  return adminQuest()
    .tasks[
      adminTaskId
    ];
}


function clearAdminTask() {

  document
    .getElementById(
      "admin-task-title"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-task-question"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-task-options"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-task-correct"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-task-answers"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-task-order"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-task-pairs"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-task-success"
    )
    .value =
    "";


  document
    .getElementById(
      "admin-rewards"
    )
    .innerHTML =
    "";
}


function loadAdminTask() {

  const task =
    selectedAdminTask();


  if (!task) {
    return;
  }


  document
    .getElementById(
      "admin-task-title"
    )
    .value =
    task.title || "";


  document
    .getElementById(
      "admin-task-type"
    )
    .value =
    task.type;


  document
    .getElementById(
      "admin-task-question"
    )
    .value =
    task.question || "";


  document
    .getElementById(
      "admin-task-options"
    )
    .value =
    (task.options || [])
      .join("\n");


  document
    .getElementById(
      "admin-task-correct"
    )
    .value =
    (task.correct || [])
      .map(
        index =>
          index + 1
      )
      .join(",");


  document
    .getElementById(
      "admin-task-answers"
    )
    .value =
    (task.answers || [])
      .join("\n");


  document
    .getElementById(
      "admin-task-order"
    )
    .value =
    (task.order || [])
      .join("\n");


  document
    .getElementById(
      "admin-task-pairs"
    )
    .value =
    (task.pairs || [])
      .map(
        pair =>
          `${pair.left} | ${pair.right}`
      )
      .join("\n");


  document
    .getElementById(
      "admin-task-success"
    )
    .value =
    task.successMessage || "";


  updateTaskEditor();


  renderRewards(
    task.rewards || []
  );
}


document
  .getElementById(
    "admin-task-select"
  )
  .addEventListener(
    "change",
    event => {

      adminTaskId =
        event.target.value ||
        null;


      if (
        adminTaskId
      ) {

        loadAdminTask();

      }

      else {

        clearAdminTask();

      }

    }
  );


document
  .getElementById(
    "admin-add-task"
  )
  .addEventListener(
    "click",
    () => {

      const id =
        uid("task");


      adminQuest()
        .tasks[id] = {
          id,

          title:
            "Новое задание",

          type:
            "singleChoice",

          question: "",

          options: [
            "Вариант 1",
            "Вариант 2"
          ],

          correct: [0],

          answers: [],
          order: [],
          pairs: [],

          successMessage:
            "Задание выполнено.",

          rewards: []
        };


      adminTaskId =
        id;


      saveData();

      renderAdminTaskList();


      adminStatus(
        "Новое задание добавлено."
      );

    }
  );


document
  .getElementById(
    "admin-delete-task"
  )
  .addEventListener(
    "click",
    () => {

      if (
        !adminTaskId
      ) {
        return;
      }


      if (
        !confirm(
          "Удалить это задание?"
        )
      ) {
        return;
      }


      const removedTaskId =
        adminTaskId;


      delete adminQuest()
        .tasks[
          removedTaskId
        ];


      /*
        Если предмет текущего дня ссылался
        на удаленное задание, убираем ссылку,
        но сам предмет комнаты не удаляем.
      */

      adminQuest()
        .objects
        .forEach(
          object => {

            if (
              object.action?.taskId ===
              removedTaskId
            ) {

              object.action = {
                type: "message",

                message:
                  "Для этого предмета еще не назначено задание."
              };

            }

          }
        );


      adminTaskId =
        null;


      saveData();

      renderAdminTaskList();

      renderAdminObjectList();


      adminStatus(
        "Задание удалено."
      );

    }
  );


document
  .getElementById(
    "admin-task-type"
  )
  .addEventListener(
    "change",
    updateTaskEditor
  );


function updateTaskEditor() {

  const type =
    document
      .getElementById(
        "admin-task-type"
      )
      .value;


  const choice =
    document.getElementById(
      "task-editor-choice"
    );


  const correct =
    document.getElementById(
      "task-editor-correct"
    );


  const text =
    document.getElementById(
      "task-editor-text"
    );


  const ordering =
    document.getElementById(
      "task-editor-ordering"
    );


  const matching =
    document.getElementById(
      "task-editor-matching"
    );


  choice.style.display =
    (
      type === "singleChoice" ||
      type === "multipleChoice"
    )
      ? "block"
      : "none";


  correct.style.display =
    (
      type === "singleChoice" ||
      type === "multipleChoice"
    )
      ? "block"
      : "none";


  text.style.display =
    type === "textInput"
      ? "block"
      : "none";


  ordering.style.display =
    type === "ordering"
      ? "block"
      : "none";


  matching.style.display =
    type === "matching"
      ? "block"
      : "none";


  document
    .getElementById(
      "admin-correct-help"
    )
    .textContent =
    type === "multipleChoice"
      ? "Несколько номеров через запятую: 1,2,4"
      : "Номер правильного варианта: например 2";
}


/* НАГРАДЫ */

function renderRewards(
  rewards
) {

  const host =
    document.getElementById(
      "admin-rewards"
    );


  host.innerHTML =
    "";


  rewards.forEach(
    reward => {

      addRewardRow(
        reward
      );

    }
  );
}


function addRewardRow(
  reward = {
    type: "note",
    value: "",
    name: "",
    icon: ""
  }
) {

  const host =
    document.getElementById(
      "admin-rewards"
    );


  const row =
    document.createElement(
      "div"
    );


  row.className =
    "reward-row";


  row.innerHTML = `
    <select
      class="admin-input reward-type"
    >
      <option value="note">
        Заметка / подсказка
      </option>

      <option value="item">
        Предмет / ключ
      </option>

      <option value="flag">
        Игровой флаг
      </option>
    </select>

    <input
      class="admin-input reward-value"
      type="text"
      placeholder="Текст или ID"
    >

    <input
      class="admin-input reward-name"
      type="text"
      placeholder="Название предмета"
    >

    <input
      class="admin-input reward-icon"
      type="text"
      placeholder="🔑"
    >

    <button
      class="reward-delete"
      type="button"
    >
      ×
    </button>
  `;


  row
    .querySelector(
      ".reward-type"
    )
    .value =
    reward.type;


  row
    .querySelector(
      ".reward-value"
    )
    .value =
    reward.value || "";


  row
    .querySelector(
      ".reward-name"
    )
    .value =
    reward.name || "";


  row
    .querySelector(
      ".reward-icon"
    )
    .value =
    reward.icon || "";


  row
    .querySelector(
      ".reward-delete"
    )
    .addEventListener(
      "click",
      () =>
        row.remove()
    );


  host.appendChild(
    row
  );
}


document
  .getElementById(
    "admin-add-reward"
  )
  .addEventListener(
    "click",
    () =>
      addRewardRow()
  );


function collectRewards() {

  return [
    ...document
      .querySelectorAll(
        ".reward-row"
      )
  ]
    .map(
      row => ({
        type:
          row
            .querySelector(
              ".reward-type"
            )
            .value,

        value:
          row
            .querySelector(
              ".reward-value"
            )
            .value
            .trim(),

        name:
          row
            .querySelector(
              ".reward-name"
            )
            .value
            .trim(),

        icon:
          row
            .querySelector(
              ".reward-icon"
            )
            .value
            .trim()
      })
    )
    .filter(
      reward =>
        reward.value
    );
}


document
  .getElementById(
    "admin-save-task"
  )
  .addEventListener(
    "click",
    () => {

      const task =
        selectedAdminTask();


      if (!task) {
        return;
      }


      const type =
        document
          .getElementById(
            "admin-task-type"
          )
          .value;


      task.title =
        document
          .getElementById(
            "admin-task-title"
          )
          .value
          .trim();


      task.type =
        type;


      task.question =
        document
          .getElementById(
            "admin-task-question"
          )
          .value
          .trim();


      task.options =
        document
          .getElementById(
            "admin-task-options"
          )
          .value
          .split("\n")
          .map(
            value =>
              value.trim()
          )
          .filter(Boolean);


      task.correct =
        document
          .getElementById(
            "admin-task-correct"
          )
          .value
          .split(",")
          .map(
            value =>
              Number(
                value.trim()
              ) - 1
          )
          .filter(
            value =>
              value >= 0
          );


      task.answers =
        document
          .getElementById(
            "admin-task-answers"
          )
          .value
          .split("\n")
          .map(
            value =>
              value.trim()
          )
          .filter(Boolean);


      task.order =
        document
          .getElementById(
            "admin-task-order"
          )
          .value
          .split("\n")
          .map(
            value =>
              value.trim()
          )
          .filter(Boolean);


      task.pairs =
        document
          .getElementById(
            "admin-task-pairs"
          )
          .value
          .split("\n")
          .map(
            line =>
              line
                .split("|")
                .map(
                  value =>
                    value.trim()
                )
          )
          .filter(
            values =>
              values.length >= 2 &&
              values[0] &&
              values[1]
          )
          .map(
            values => ({
              left:
                values[0],

              right:
                values[1]
            })
          );


      task.successMessage =
        document
          .getElementById(
            "admin-task-success"
          )
          .value
          .trim();


      task.rewards =
        collectRewards();


      saveData();

      renderAdminTaskList();

      renderAdminObjectList();


      adminStatus(
        "Задание сохранено."
      );

    }
  );


/* ПРЕДПРОСМОТР */

document
  .getElementById(
    "admin-preview"
  )
  .addEventListener(
    "click",
    () => {

      selectedQuestId =
        adminQuestId;


      previewMode =
        true;


      playToken =
        "";


      gameStartedAt =
        Date.now();


      gameErrors =
        0;


      gameHints =
        0;


      questCompleting =
        false;


      gameState =
        createGameState();


      document
        .getElementById(
          "game-day-title"
        )
        .textContent =
        `День ${adminQuest().day}`;


      renderInventory();

      renderHotspots();

      showScreen(
        "game"
      );

    }
  );


/* RESET */

document
  .getElementById(
    "admin-reset"
  )
  .addEventListener(
    "click",
    () => {

      if (
        !confirm(
          "Удалить все настройки конструктора и вернуть исходную версию?"
        )
      ) {
        return;
      }


      localStorage.removeItem(
        STORAGE_KEY
      );


      APP_DATA =
        structuredClone(
          DEFAULT_DATA
        );


      /*
        У day1 уже есть настроенные объекты.
        Для остальных дней общая библиотека
        будет показываться автоматически.
      */

      migrateRoomObjects();


      adminQuestId =
        "day1";


      adminTaskId =
        null;


      adminObjectId =
        null;


      saveData();

      renderDays();

      renderAdminQuestSelect();


      adminStatus(
        "Исходная конфигурация восстановлена."
      );

    }
  );


function adminStatus(
  text,
  error = false
) {

  const element =
    document.getElementById(
      "admin-status"
    );


  element.textContent =
    text;


  element.style.color =
    error
      ? "#ff9999"
      : "#79e9c2";


  setTimeout(
    () => {

      element.textContent =
        "";

    },

    2600
  );
}


/* ИГРОВЫЕ КНОПКИ */

document
  .getElementById(
    "inventory-btn"
  )
  .addEventListener(
    "click",
    () => {

      const html =
        gameState.inventory.length
          ? gameState.inventory
              .map(
                item => `
                  <div class="inventory-item">

                    <div class="inventory-item__icon">
                      ${escapeHtml(
                        item.icon ||
                        "📦"
                      )}
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
          : "<p>Пока пусто.</p>";


      openOverlay(`
        <h3>
          Инвентарь
        </h3>

        ${html}
      `);

    }
  );


document
  .getElementById(
    "notes-btn"
  )
  .addEventListener(
    "click",
    () => {

      const html =
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
          : "<p>Пока ничего не найдено.</p>";


      openOverlay(`
        <h3>
          Заметки
        </h3>

        ${html}
      `);

    }
  );


document
  .getElementById(
    "hint-btn"
  )
  .addEventListener(
    "click",
    () => {

      if (
        !previewMode
      ) {

        gameHints += 1;

      }


      openOverlay(`
        <h3>
          Подсказка
        </h3>

        <p>
          Осматривайте предметы комнаты.
          Некоторые из них становятся полезны
          только после других находок.
        </p>
      `);

    }
  );


document
  .getElementById(
    "menu-btn"
  )
  .addEventListener(
    "click",
    () => {

      const quest =
        currentQuest();


      openOverlay(`
        <h3>
          ${escapeHtml(
            quest.title
          )}
        </h3>

        <p>
          ${escapeHtml(
            quest.topic
          )}
        </p>

        <button
          id="leave-game"
          class="secondary-btn"
          type="button"
        >
          Выйти из смены
        </button>
      `);


      document
        .getElementById(
          "leave-game"
        )
        .addEventListener(
          "click",
          () => {

            closeOverlay();


            playToken =
              "";


            previewMode =
              false;


            questCompleting =
              false;


            showScreen(
              "start"
            );

          }
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
      event.target ===
      overlay
    ) {

      closeOverlay();

    }

  }
);


/* =========================================================
   ЗАПУСК

   loadData() загружает старые настройки.

   migrateRoomObjects() внутри loadData()
   автоматически превращает старую структуру
   в новую с общей библиотекой предметов.

   saveData() сразу сохраняет миграцию,
   чтобы при следующем открытии браузера
   она уже была постоянной.
========================================================= */

loadData();

saveData();

renderDays();

renderInventory();

updateRequirementFields();

updateObjectActionFields();

updateTaskEditor();
