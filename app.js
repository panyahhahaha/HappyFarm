// Happy Farm - Game Engine & Logic with Multi-User Authorization & Play Logs
const questionsData = window.questionsData;

// Global authorization states
let usersDB = {};
let currentUser = null;
let sessionStartStats = {
  time: null,
  coins: 0,
  xp: 0
};

// Current active game state references (will point to usersDB[currentUser])
let state = null;

// Crop metadata
const cropMeta = {
  carrot: { name: 'Carrot (แครอท)', emoji: '🥕', growTime: 10, xpReward: 10, seedCost: 5, sellPrice: 12 },
  tomato: { name: 'Tomato (มะเขือเทศ)', emoji: '🍅', growTime: 20, xpReward: 20, seedCost: 10, sellPrice: 28 },
  corn: { name: 'Corn (ข้าวโพด)', emoji: '🌽', growTime: 30, xpReward: 30, seedCost: 18, sellPrice: 48 },
  pumpkin: { name: 'Pumpkin (ฟักทอง)', emoji: '🎃', growTime: 45, xpReward: 50, seedCost: 28, sellPrice: 85 }
};

// Active quiz tracking
let activeQuiz = {
  question: null,
  correctCallback: null,
  incorrectCallback: null,
  rewardCoins: 0,
  rewardXp: 0
};

// Plot timers store
const plotTimers = {};

// Season Metadata
const seasonMeta = [
  { name: 'Spring', displayName: 'Spring (ฤดูใบไม้ผลิ)', icon: '🌸', color: '#c2185b', bgCardColor: '#fff3f8', borderCardColor: '#ff80ab' },
  { name: 'Summer', displayName: 'Summer (ฤดูร้อน)', icon: '☀️', color: '#f57c00', bgCardColor: '#fffde7', borderCardColor: '#ffd54f' },
  { name: 'Autumn', displayName: 'Autumn (ฤดูใบไม้ร่วง)', icon: '🍁', color: '#e64a19', bgCardColor: '#fbe9e7', borderCardColor: '#ff8a65' },
  { name: 'Winter', displayName: 'Winter (ฤดูหนาว)', icon: '❄️', color: '#0097a7', bgCardColor: '#e0f7fa', borderCardColor: '#80deea' }
];

// Truck & Quest Animation states (transient)
let truckState = 'idle'; // 'idle', 'driving_away', 'away', 'returning'
let truckXOffset = 0;
let truckYOffset = 0;
let truckTimer = 0;
let activeDeliverQuest = null;
let weatherParticles = [];
let questRenderTimer = 0;

// Clouds on canvas sky
let canvasClouds = [
  { x: 50, y: 35, size: 18, speed: 6, opacity: 0.8 },
  { x: 250, y: 65, size: 26, speed: 4, opacity: 0.75 },
  { x: 450, y: 25, size: 14, speed: 9, opacity: 0.8 },
  { x: 120, y: 75, size: 22, speed: 5, opacity: 0.65 }
];

// DOM Elements cache
const els = {
  // Stats
  coinCount: document.getElementById('coin-count'),
  levelIndicator: document.getElementById('level-indicator'),
  xpText: document.getElementById('xp-text'),
  xpBarInner: document.getElementById('xp-bar-inner'),
  ageSelect: document.getElementById('age-select'),
  
  // Tabs & Views
  farmCanvas: document.getElementById('farm-canvas'),
  farmCanvasContainer: document.getElementById('farm-canvas-container'),
  seedInventory: document.getElementById('seed-inventory'),
  harvestStock: document.getElementById('harvest-stock'),
  marketItemsGrid: document.getElementById('market-items-grid'),
  
  // Quiz Modals
  quizModal: document.getElementById('quiz-modal'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalQuizContent: document.getElementById('modal-quiz-content'),
  modalTitle: document.getElementById('modal-title'),
  questionVisual: document.getElementById('question-visual'),
  questionText: document.getElementById('question-text'),
  questionOptions: document.getElementById('question-options'),
  feedbackSuccess: document.getElementById('feedback-success'),
  successMsg: document.getElementById('success-msg'),
  successReward: document.getElementById('success-reward'),
  successContinueBtn: document.getElementById('success-continue-btn'),
  feedbackFail: document.getElementById('feedback-fail'),
  failMsg: document.getElementById('fail-msg'),
  failContinueBtn: document.getElementById('fail-continue-btn'),
  
  // Game Modes
  modeMath: document.getElementById('mode-math'),
  modeEnglish: document.getElementById('mode-english'),
  
  // Authentication Elements
  loginOverlay: document.getElementById('login-overlay'),
  loginFormView: document.getElementById('login-form-view'),
  registerFormView: document.getElementById('register-form-view'),
  loginFarmerSelect: document.getElementById('login-farmer-select'),
  loginPin: document.getElementById('login-pin'),
  btnLogin: document.getElementById('btn-login'),
  registerName: document.getElementById('register-name'),
  registerPin: document.getElementById('register-pin'),
  btnRegister: document.getElementById('btn-register'),
  btnShowRegister: document.getElementById('btn-show-register'),
  btnShowLogin: document.getElementById('btn-show-login'),
  currentFarmerName: document.getElementById('current-farmer-name'),
  btnSwitchUser: document.getElementById('btn-switch-user'),
  
  // Farmer Profile Tab Elements
  profileFarmerName: document.getElementById('profile-farmer-name'),
  profileJoinDate: document.getElementById('profile-join-date'),
  profileStatLevel: document.getElementById('profile-stat-level'),
  profileStatCoins: document.getElementById('profile-stat-coins'),
  profileSessionsCount: document.getElementById('profile-sessions-count'),
  profileLogsTbody: document.getElementById('profile-logs-tbody'),
  btnLogout: document.getElementById('btn-logout'),
  btnReset: document.getElementById('btn-reset'),
  pastureFence: null,
  lessonTopicsGrid: document.getElementById('lesson-topics-grid'),
  profileBadgesGrid: document.getElementById('profile-badges-grid'),
  owlClassroomModal: document.getElementById('owl-classroom-modal'),
  owlCloseBtn: document.getElementById('owl-close-btn'),
  owlSlideView: document.getElementById('owl-slide-view'),
  owlClassroomTitle: document.getElementById('owl-classroom-title'),
  owlLessonVisual: document.getElementById('owl-lesson-visual'),
  owlLessonText: document.getElementById('owl-lesson-text'),
  btnOwlPrev: document.getElementById('btn-owl-prev'),
  btnOwlNext: document.getElementById('btn-owl-next'),
  btnOwlStartTest: document.getElementById('btn-owl-start-test'),
  owlPageIndicator: document.getElementById('owl-page-indicator'),
  owlTestView: document.getElementById('owl-test-view'),
  owlTestTracker: document.getElementById('owl-test-tracker'),
  owlTestVisual: document.getElementById('owl-test-visual'),
  owlTestQuestion: document.getElementById('owl-test-question'),
  owlTestOptions: document.getElementById('owl-test-options'),
  owlFeedbackSuccess: document.getElementById('owl-feedback-success'),
  owlSuccessMsg: document.getElementById('owl-success-msg'),
  owlSuccessReward: document.getElementById('owl-success-reward'),
  owlSuccessContinueBtn: document.getElementById('owl-success-continue-btn'),
  imageLightbox: document.getElementById('image-lightbox'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxCaption: document.getElementById('lightbox-caption'),
  
  btnSuccessSpeak: document.getElementById('btn-success-speak'),
  successExplanationText: document.getElementById('success-explanation-text'),
  btnFailSpeak: document.getElementById('btn-fail-speak'),
  failExplanationText: document.getElementById('fail-explanation-text'),
  owlTestExplanationBox: document.getElementById('owl-test-explanation-box'),
  btnOwlTestSpeak: document.getElementById('btn-owl-test-speak'),
  owlTestExplanationText: document.getElementById('owl-test-explanation-text'),
  btnOwlTestNext: document.getElementById('btn-owl-test-next'),
  btnTabStudent: document.getElementById('btn-tab-student'),
  btnTabParent: document.getElementById('btn-tab-parent'),
  
  // Family & Romance Tab Elements
  familyView: document.getElementById('family-view'),
  romanceSetupPanel: document.getElementById('romance-setup-panel'),
  partnerSelect: document.getElementById('partner-select'),
  btnStartRomance: document.getElementById('btn-start-romance'),
  romanceActivePanel: document.getElementById('romance-active-panel'),
  activePartnerName: document.getElementById('active-partner-name'),
  relationshipStatus: document.getElementById('relationship-status'),
  romancePtsText: document.getElementById('romance-pts-text'),
  romanceProgressBar: document.getElementById('romance-progress-bar'),
  btnFamilyChat: document.getElementById('btn-family-chat'),
  btnFamilyGift: document.getElementById('btn-family-gift'),
  btnFamilyPropose: document.getElementById('btn-family-propose'),
  familyHouseName: document.getElementById('family-house-name'),
  btnUpgradeHouse: document.getElementById('btn-upgrade-house'),
  childNonePanel: document.getElementById('child-none-panel'),
  childActivePanel: document.getElementById('child-active-panel'),
  childEmoji: document.getElementById('child-emoji'),
  childStageText: document.getElementById('child-stage-text'),
  childGradeText: document.getElementById('child-grade-text'),
  childGrowthText: document.getElementById('child-growth-text'),
  childProgressBar: document.getElementById('child-progress-bar'),
  btnChildHomework: document.getElementById('btn-child-homework'),
  teenagerTaskPanel: document.getElementById('teenager-task-panel'),
  childTaskSelect: document.getElementById('child-task-select')
};

// Initialize Game System
function init() {
  loadUsersDB();
  setupEventListeners();
  
  // Set up auth view
  populateFarmerDropdown();
  if (Object.keys(usersDB).length === 0) {
    // Show register form first if database is empty
    showRegisterForm();
  } else {
    showLoginForm();
  }
  
  // Initialize isometric canvas game engine
  initCanvasEngine();
}

// User accounts database management
function loadUsersDB() {
  const db = localStorage.getItem('happy_farm_users');
  if (db) {
    try {
      usersDB = JSON.parse(db);
    } catch (e) {
      console.error("Could not load users DB", e);
      usersDB = {};
    }
  }
}

function saveUsersDB() {
  localStorage.setItem('happy_farm_users', JSON.stringify(usersDB));
}

// Get fresh default profile state for a user
function getNewUserState(username, pin) {
  return {
    username: username,
    pin: pin,
    joinDate: new Date().toLocaleDateString(),
    coins: 100,
    level: 1,
    xp: 0,
    selectedAgeGroup: 'level-kg', // Kindergarten default
    activeSeed: 'carrot',
    plots: [
      { id: 0, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 1, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 2, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 3, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 4, isLocked: true, lockCost: 50, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 5, isLocked: true, lockCost: 100, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 6, isLocked: true, lockCost: 200, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 7, isLocked: true, lockCost: 350, state: 'empty', cropType: null, progress: 0, isWatered: false },
      { id: 8, isLocked: true, lockCost: 500, state: 'empty', cropType: null, progress: 0, isWatered: false }
    ],
    inventory: { carrot: 5, tomato: 0, pumpkin: 0, corn: 0 },
    harvestStock: { carrot: 0, tomato: 0, pumpkin: 0, corn: 0, egg: 0, milk: 0, bacon: 0, wool: 0 },
    animals: {
      chicken: { count: 0, unlocked: false, cost: 80, product: 'egg', productPrice: 15, name: 'Clucky Chicken', emoji: '🐔', instances: [] },
      cow: { count: 0, unlocked: false, cost: 180, product: 'milk', productPrice: 35, name: 'Daisy Cow', emoji: '🐮', instances: [] },
      pig: { count: 0, unlocked: false, cost: 280, product: 'bacon', productPrice: 55, name: 'Bacon Pig', emoji: '🐷', instances: [] },
      sheep: { count: 0, unlocked: false, cost: 380, product: 'wool', productPrice: 75, name: 'Wooly Sheep', emoji: '🐑', instances: [] }
    },
    currentSeasonIdx: 0,
    seasonTimer: 90,
    activeQuests: [],
    logs: [], // play logs array
    badges: [], // earned achievements array
    family: {
      houseLevel: 1,
      partnerName: "",
      partnerRomance: 0,
      isMarried: false,
      childStage: "none", // "none", "infant", "student", "teenager", "adult"
      childAge: 0,
      childSchoolGrade: 0, // 0 (KG), 1-6 (Grade 1-6)
      childGrowthProgress: 0, // 0-100
      assignedTask: "idle", // "idle", "auto_water", "auto_harvest"
      farmerAge: 18 // Farmer starting age
    },
    quizHistory: {
      lastQuizDate: "",
      questionsSolvedToday: 0,
      challengeDayProgress: 0,
      answeredCorrectlyIds: [],
      monthlyCompleted: false,
      streakShields: 0,
      weaknesses: {}
    }
  };
}

// User state migration for legacy profiles
function migrateUserState(userState) {
  if (!userState) return userState;
  const defaultState = getNewUserState(userState.username, userState.pin);
  
  if (userState.coins === undefined) userState.coins = defaultState.coins;
  if (userState.level === undefined) userState.level = defaultState.level;
  if (userState.xp === undefined) userState.xp = defaultState.xp;
  if (userState.selectedAgeGroup === undefined) userState.selectedAgeGroup = defaultState.selectedAgeGroup;
  if (userState.activeSeed === undefined) userState.activeSeed = defaultState.activeSeed;
  
  if (!userState.plots) {
    userState.plots = defaultState.plots;
  } else {
    while (userState.plots.length < 9) {
      const id = userState.plots.length;
      userState.plots.push({
        id: id,
        isLocked: id >= 4,
        lockCost: id === 4 ? 50 : id === 5 ? 100 : id === 6 ? 200 : id === 7 ? 350 : 500,
        state: 'empty',
        cropType: null,
        progress: 0,
        isWatered: false
      });
    }
  }

  if (!userState.inventory) {
    userState.inventory = defaultState.inventory;
  } else {
    for (const key in defaultState.inventory) {
      if (userState.inventory[key] === undefined) {
        userState.inventory[key] = defaultState.inventory[key];
      }
    }
  }

  if (!userState.harvestStock) {
    userState.harvestStock = defaultState.harvestStock;
  } else {
    for (const key in defaultState.harvestStock) {
      if (userState.harvestStock[key] === undefined) {
        userState.harvestStock[key] = defaultState.harvestStock[key];
      }
    }
  }

  if (!userState.animals) {
    userState.animals = defaultState.animals;
  } else {
    for (const key in defaultState.animals) {
      if (!userState.animals[key]) {
        userState.animals[key] = defaultState.animals[key];
      } else {
        for (const prop in defaultState.animals[key]) {
          if (userState.animals[key][prop] === undefined) {
            userState.animals[key][prop] = defaultState.animals[key][prop];
          }
        }
      }
    }
  }

  if (userState.currentSeasonIdx === undefined) userState.currentSeasonIdx = defaultState.currentSeasonIdx;
  if (userState.seasonTimer === undefined) userState.seasonTimer = defaultState.seasonTimer;
  if (!userState.activeQuests) userState.activeQuests = defaultState.activeQuests;
  if (!userState.logs) userState.logs = defaultState.logs;
  if (!userState.badges) userState.badges = defaultState.badges;

  if (!userState.family) {
    userState.family = defaultState.family;
  } else {
    for (const prop in defaultState.family) {
      if (userState.family[prop] === undefined) {
        userState.family[prop] = defaultState.family[prop];
      }
    }
  }

  if (!userState.quizHistory) {
    userState.quizHistory = defaultState.quizHistory;
  } else {
    for (const prop in defaultState.quizHistory) {
      if (userState.quizHistory[prop] === undefined) {
        userState.quizHistory[prop] = defaultState.quizHistory[prop];
      }
    }
  }

  return userState;
}

// User Actions: Logins & Registrations
function showRegisterForm() {
  els.loginFormView.classList.remove('active');
  els.registerFormView.classList.add('active');
}

function showLoginForm() {
  els.registerFormView.classList.remove('active');
  els.loginFormView.classList.add('active');
  populateFarmerDropdown();
}

function populateFarmerDropdown() {
  els.loginFarmerSelect.innerHTML = '';
  const users = Object.keys(usersDB);
  if (users.length === 0) {
    const opt = document.createElement('option');
    opt.textContent = "No Profiles - Please Register first";
    els.loginFarmerSelect.appendChild(opt);
    return;
  }
  users.forEach(username => {
    const opt = document.createElement('option');
    opt.value = username;
    opt.textContent = username;
    els.loginFarmerSelect.appendChild(opt);
  });
}

function handleLogin() {
  const username = els.loginFarmerSelect.value;
  const pin = els.loginPin.value;

  if (!username || !usersDB[username]) {
    alert("Please select a valid profile name!");
    return;
  }

  if (usersDB[username].pin !== pin) {
    alert("Incorrect 4-Digit PIN Passcode! (รหัสผ่านไม่ถูกต้อง)");
    els.loginPin.value = '';
    return;
  }

  // Success login!
  loginUser(username);
}

function handleRegister() {
  const nameInput = els.registerName.value.trim();
  const pinInput = els.registerPin.value.trim();

  if (!nameInput) {
    alert("Please enter a name! (กรุณาใส่ชื่อฟาร์มเมอร์)");
    return;
  }

  if (nameInput.length < 2) {
    alert("Name must be at least 2 characters long!");
    return;
  }

  if (usersDB[nameInput]) {
    alert("This name is already registered! Choose another name.");
    return;
  }

  if (!/^\d{4}$/.test(pinInput)) {
    alert("PIN passcode must be exactly 4 numbers! (รหัสผ่านต้องเป็นตัวเลข 4 หลัก)");
    return;
  }

  // Create User Profile
  usersDB[nameInput] = getNewUserState(nameInput, pinInput);
  saveUsersDB();
  
  // Clear forms
  els.registerName.value = '';
  els.registerPin.value = '';
  
  // Login directly
  loginUser(nameInput);
}

function loginUser(username) {
  currentUser = username;
  state = migrateUserState(usersDB[currentUser]);
  usersDB[currentUser] = state;
  saveUsersDB();
  
  // Record session start points
  sessionStartStats = {
    time: Date.now(),
    coins: state.coins,
    xp: state.xp
  };
  
  // Setup header selector
  els.currentFarmerName.textContent = currentUser;
  els.ageSelect.value = state.selectedAgeGroup;

  // Clear inputs
  els.loginPin.value = '';

  // Close Login overlay
  els.loginOverlay.classList.remove('active');

  // Activate primary view (Farm View)
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-farm').classList.add('active');
  document.getElementById('farm-view').classList.add('active');

  // Initialize seasons and quests if missing
  if (state.currentSeasonIdx === undefined) state.currentSeasonIdx = 0;
  if (state.seasonTimer === undefined) state.seasonTimer = 90;
  if (state.activeQuests === undefined || state.activeQuests.length === 0) {
    state.activeQuests = generateQuests();
  }
  
  applySeasonUI();

  // Render everything & start crop tickers
  renderAll();
  renderLessons();
  resumeCrops();
  
  // Start custom game engine 60 FPS loop
  startCanvasEngine();
}

function logoutUser() {
  if (!currentUser) return;

  saveSessionAndGame();
  
  // Stop all crop timers
  Object.keys(plotTimers).forEach(id => {
    clearInterval(plotTimers[id]);
    delete plotTimers[id];
  });

  currentUser = null;
  state = null;

  els.currentFarmerName.textContent = 'Guest';

  // Open Entrance Screen
  populateFarmerDropdown();
  els.loginOverlay.classList.add('active');
  
  // Stop custom game engine loop
  stopCanvasEngine();
}

function saveSessionAndGame() {
  if (!currentUser || !state) return;

  // Calculate session logs
  const endTime = Date.now();
  const durationSec = Math.round((endTime - sessionStartStats.time) / 1000);
  
  // Only record logs if playtime is more than 3 seconds to avoid noise
  if (durationSec >= 3) {
    const netCoins = state.coins - sessionStartStats.coins;
    const netXp = state.xp - sessionStartStats.xp;
    
    const logEntry = {
      date: new Date().toLocaleString(),
      duration: durationSec,
      coinsGained: netCoins,
      xpGained: netXp
    };
    
    if (!state.logs) state.logs = [];
    state.logs.unshift(logEntry);
  }

  // Save current profile to database
  usersDB[currentUser] = state;
  saveUsersDB();
}

// Reset data of active user
function resetActiveUserData() {
  if (confirm("Are you sure you want to reset all progress for this profile? Your coins, crops, levels, and learning logs will be lost!")) {
    const name = currentUser;
    const pin = state.pin;
    
    // Reinitialize state
    usersDB[name] = getNewUserState(name, pin);
    saveUsersDB();
    
    // Reload user
    loginUser(name);
  }
}

// Page Close Event Hook
window.addEventListener('beforeunload', () => {
  if (currentUser) {
    saveSessionAndGame();
  }
});

// Setup Event Listeners
function setupEventListeners() {
  // BGM Toggle Listener
  const musicToggle = document.getElementById('btn-music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      AudioEngine.init();
      const statusEl = document.getElementById('music-status');
      if (AudioEngine.bgmPlaying) {
        AudioEngine.stopBGM();
        if (statusEl) statusEl.textContent = 'Music: Off';
        musicToggle.style.backgroundColor = '#e8f5e9';
        musicToggle.style.borderColor = '#4caf50';
      } else {
        AudioEngine.startBGM();
        if (statusEl) statusEl.textContent = 'Music: On';
        musicToggle.style.backgroundColor = '#c8e6c9';
        musicToggle.style.borderColor = '#2e7d32';
      }
      AudioEngine.playSFX('click');
    });
  }

  // Navigation Tabs switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AudioEngine.playSFX('click');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      document.getElementById(target).classList.add('active');

      if (target === 'settings-view') {
        renderFarmerProfile();
      }
      if (target === 'farm-view') {
        resizeCanvas();
      }
      if (target === 'family-view') {
        renderFamilyPanel();
      }
    });
  });

  // Age group selector
  els.ageSelect.addEventListener('change', (e) => {
    if (state) {
      state.selectedAgeGroup = e.target.value;
      saveUsersDB();
      renderLessons(); // Re-populate classroom topics
    }
  });

  // Dialog mod-close actions
  // Dialog mod-close actions
  const handleContinueClick = () => {
    AudioEngine.playSFX('click');
    if (activeSession) {
      if (activeSession.currentIndex + 1 < activeSession.questions.length) {
        loadSessionQuestion(activeSession.currentIndex + 1);
      } else {
        finishSession();
      }
    } else {
      closeModal();
    }
  };
  els.successContinueBtn.addEventListener('click', handleContinueClick);
  els.failContinueBtn.addEventListener('click', handleContinueClick);
  els.modalCloseBtn.addEventListener('click', () => {
    activeSession = null;
    stopQuizTimer();
    closeModal();
  });

  // Challenge barns triggers
  els.modeMath.addEventListener('click', () => startDirectQuiz('math'));
  els.modeEnglish.addEventListener('click', () => startDirectQuiz('english'));

  // Authorization Form Listeners
  els.btnShowRegister.addEventListener('click', (e) => { e.preventDefault(); showRegisterForm(); });
  els.btnShowLogin.addEventListener('click', (e) => { e.preventDefault(); showLoginForm(); });
  els.btnLogin.addEventListener('click', handleLogin);
  els.btnRegister.addEventListener('click', handleRegister);
  els.btnSwitchUser.addEventListener('click', logoutUser);
  els.btnLogout.addEventListener('click', logoutUser);
  els.btnReset.addEventListener('click', resetActiveUserData);

  // Submit on enter keys
  els.loginPin.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin(); });
  els.registerPin.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleRegister(); });

  // Family & Romance Action Listeners
  els.btnStartRomance.addEventListener('click', () => {
    AudioEngine.playSFX('click');
    startRomance();
  });
  els.btnFamilyChat.addEventListener('click', () => {
    AudioEngine.playSFX('click');
    chatWithPartner();
  });
  els.btnFamilyGift.addEventListener('click', () => {
    AudioEngine.playSFX('click');
    giveGiftToPartner();
  });
  els.btnFamilyPropose.addEventListener('click', () => {
    AudioEngine.playSFX('click');
    proposeMarriage();
  });
  els.btnUpgradeHouse.addEventListener('click', () => {
    AudioEngine.playSFX('click');
    upgradeHouse();
  });
  els.btnChildHomework.addEventListener('click', () => {
    AudioEngine.playSFX('click');
    startChildHomework();
  });
  els.childTaskSelect.addEventListener('change', (e) => {
    AudioEngine.playSFX('click');
    changeChildTask(e);
  });

  // Owl Classroom Action Listeners
  els.owlCloseBtn.addEventListener('click', closeOwlClassroom);
  els.owlSuccessContinueBtn.addEventListener('click', closeOwlClassroom);
  els.btnOwlPrev.addEventListener('click', () => navigateLessonSlide(-1));
  els.btnOwlNext.addEventListener('click', () => navigateLessonSlide(1));
  els.btnOwlStartTest.addEventListener('click', startPostTest);
  els.btnTabStudent.addEventListener('click', () => switchClassroomTab('student'));
  els.btnTabParent.addEventListener('click', () => switchClassroomTab('parent'));

  // Chalkboard Visual Fullscreen Zoom (Lightbox) for all classroom/quiz visuals
  ['owl-lesson-visual', 'owl-test-visual', 'question-visual'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
          AudioEngine.playSFX('click');
          els.lightboxImg.src = e.target.src;
          els.lightboxCaption.textContent = e.target.alt || "รายละเอียดรูปภาพ";
          els.imageLightbox.style.display = 'flex';
        }
      });
    }
  });
  els.imageLightbox.addEventListener('click', () => {
    AudioEngine.playSFX('click');
    els.imageLightbox.style.display = 'none';
  });

  // Audio Speech Narration Action Listeners
  els.btnSuccessSpeak.addEventListener('click', () => {
    const q = activeQuiz.question;
    if (q) speakText(q.explanation || 'ยินดีด้วยครับ! คุณตอบได้ถูกต้อง.', els.btnSuccessSpeak);
  });
  els.btnFailSpeak.addEventListener('click', () => {
    const q = activeQuiz.question;
    if (q) speakText(q.explanation || `ข้อนี้ตอบคือ: ${q.answer}`, els.btnFailSpeak);
  });
  els.btnOwlTestSpeak.addEventListener('click', () => {
    const topic = activeLessonState.topic;
    const q = topic.postTest[activeLessonState.testQuestionIdx];
    if (q) speakText(q.explanation || `เฉลยคำตอบคือ ${q.answer}`, els.btnOwlTestSpeak);
  });

  // Post test next button listener
  els.btnOwlTestNext.addEventListener('click', () => {
    stopSpeaking();
    els.owlTestExplanationBox.style.display = 'none';
    
    activeLessonState.testQuestionIdx++;
    const topic = activeLessonState.topic;
    
    if (activeLessonState.testQuestionIdx < topic.postTest.length) {
      renderPostTestQuestion();
    } else {
      evaluatePostTest();
    }
  });
}

// Formatting Helper for Duration
function formatPlaytime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  return remainingSecs > 0 ? `${minutes}m ${remainingSecs}s` : `${minutes}m`;
}

// Rendering Farmer Profile & Session Logs
function renderFarmerProfile() {
  if (!state) return;
  els.profileFarmerName.textContent = currentUser;
  els.profileJoinDate.textContent = state.joinDate || 'N/A';
  els.profileStatLevel.textContent = `⭐ ${state.level}`;
  els.profileStatCoins.textContent = `🪙 ${state.coins}`;
  els.profileSessionsCount.textContent = state.logs ? state.logs.length : 0;

  // Build Logs Table body
  els.profileLogsTbody.innerHTML = '';
  
  if (!state.logs || state.logs.length === 0) {
    els.profileLogsTbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; color:#888; padding:20px;">
          No play history logs recorded yet. Play and answer questions, then switch user/sign out to view your logs!
        </td>
      </tr>
    `;
    return;
  }

  state.logs.forEach(log => {
    const row = document.createElement('tr');
    const displayCoins = log.coinsGained >= 0 ? `+${log.coinsGained}` : log.coinsGained;
    const displayXp = log.xpGained >= 0 ? `+${log.xpGained}` : log.xpGained;
    
    row.innerHTML = `
      <td><strong>${log.date}</strong></td>
      <td>⏱️ ${formatPlaytime(log.duration)}</td>
      <td style="color:${log.coinsGained >= 0 ? 'var(--gold-dark)' : 'red'}; font-weight:bold;">${displayCoins}</td>
      <td style="color:#00bcff; font-weight:bold;">${displayXp}</td>
    `;
    els.profileLogsTbody.appendChild(row);
  });

  // Render earned medals showcase
  renderBadges();
}

// General Renderers
function renderAll() {
  if (!state) return;
  checkDailyStreakReset();
  renderStats();
  renderPlots();
  renderInventory();
  renderHarvestStock();
  renderMarket();
  renderPasture();
  renderQuests();
  renderFamilyPanel();
  updateStudyWidget();
}

function renderPasture() {
  if (!state) return;
  syncCanvasAnimals();
}

function renderStats() {
  els.coinCount.textContent = state.coins;
  els.levelIndicator.textContent = state.level;
  
  const xpNeeded = state.level * 100;
  els.xpText.textContent = `${state.xp}/${xpNeeded}`;
  const xpPercent = Math.min((state.xp / xpNeeded) * 100, 100);
  els.xpBarInner.style.width = `${xpPercent}%`;
}

function renderPlots() {
  renderPlots3D();
}

function renderInventory() {
  els.seedInventory.innerHTML = '';
  Object.keys(state.inventory).forEach(seedKey => {
    const crop = cropMeta[seedKey];
    const seedEl = document.createElement('div');
    seedEl.className = `seed-item ${state.activeSeed === seedKey ? 'active' : ''}`;
    seedEl.dataset.seed = seedKey;

    seedEl.innerHTML = `
      <div class="seed-info">
        <span class="seed-icon">${crop.emoji}</span>
        <div>
          <div class="seed-name">${crop.name}</div>
          <div class="seed-time">⏱️ ${crop.growTime}s</div>
        </div>
      </div>
      <div class="seed-count">${state.inventory[seedKey]}</div>
    `;

    seedEl.addEventListener('click', () => {
      state.activeSeed = seedKey;
      renderInventory();
    });

    els.seedInventory.appendChild(seedEl);
  });
}

function renderHarvestStock() {
  els.harvestStock.innerHTML = '';
  
  Object.keys(state.harvestStock).forEach(stockKey => {
    const count = state.harvestStock[stockKey];
    if (count === 0) return;

    const itemEl = document.createElement('div');
    itemEl.className = 'harvest-item';

    let emoji = '';
    let name = '';
    let sellPrice = 0;

    if (cropMeta[stockKey]) {
      emoji = cropMeta[stockKey].emoji;
      name = cropMeta[stockKey].name.split(' ')[0];
      sellPrice = cropMeta[stockKey].sellPrice;
    } else if (['egg', 'milk', 'bacon', 'wool'].includes(stockKey)) {
      if (stockKey === 'egg') {
        emoji = '🥚'; name = 'Egg'; sellPrice = state.animals.chicken.productPrice;
      } else if (stockKey === 'milk') {
        emoji = '🥛'; name = 'Milk'; sellPrice = state.animals.cow.productPrice;
      } else if (stockKey === 'bacon') {
        emoji = '🥓'; name = 'Bacon'; sellPrice = state.animals.pig.productPrice;
      } else if (stockKey === 'wool') {
        emoji = '🧶'; name = 'Wool'; sellPrice = state.animals.sheep.productPrice;
      }
    }

    itemEl.innerHTML = `
      <div class="harvest-info">
        <span class="harvest-emoji">${emoji}</span>
        <div>
          <div class="harvest-count">x${count}</div>
          <div style="font-size:0.75rem; color:#777;">Price: 🪙${sellPrice} ea</div>
        </div>
      </div>
      <button class="sell-btn" data-item="${stockKey}">
        Sell for 🪙${sellPrice * count}
      </button>
    `;

    itemEl.querySelector('.sell-btn').addEventListener('click', () => sellItem(stockKey));
    els.harvestStock.appendChild(itemEl);
  });

  const totalStock = Object.values(state.harvestStock).reduce((a, b) => a + b, 0);
  if (totalStock === 0) {
    els.harvestStock.innerHTML = `
      <div style="text-align:center; padding:20px; color:#888; font-size:0.9rem;">
        Your inventory basket is empty. Harvest some crops to sell them here!
      </div>
    `;
  }
}

function renderMarket() {
  els.marketItemsGrid.innerHTML = '';

  // Seeds sale
  Object.keys(cropMeta).forEach(seedKey => {
    const crop = cropMeta[seedKey];
    const card = document.createElement('div');
    card.className = 'market-card';
    card.innerHTML = `
      <span class="market-badge">Seed</span>
      <div class="market-item-icon">${crop.emoji}</div>
      <div class="market-item-name">${crop.name}</div>
      <div class="market-item-desc">Grow time: ${crop.growTime}s. Sells for 🪙${crop.sellPrice}.</div>
      <div class="market-item-price">🪙 ${crop.seedCost}</div>
      <button class="market-buy-btn" data-seed="${seedKey}">Buy Seed Pack</button>
    `;

    const buyBtn = card.querySelector('.market-buy-btn');
    if (state.coins < crop.seedCost) buyBtn.disabled = true;

    buyBtn.addEventListener('click', () => buySeeds(seedKey, crop.seedCost));
    els.marketItemsGrid.appendChild(card);
  });

  // Animals sale
  Object.keys(state.animals).forEach(animalKey => {
    const animal = state.animals[animalKey];
    const card = document.createElement('div');
    card.className = 'market-card';
    
    let productText = '';
    if (animal.product === 'egg') productText = '🥚 Eggs';
    else if (animal.product === 'milk') productText = '🥛 Milk';
    else if (animal.product === 'bacon') productText = '🥓 Bacon';
    else if (animal.product === 'wool') productText = '🧶 Wool';
    
    const isEnglish = (animalKey === 'chicken' || animalKey === 'sheep');
    const challengeText = isEnglish ? 'English spelling' : 'Math';

    const activeCount = animal.instances ? animal.instances.length : 0;
    const isMax = activeCount >= 3;

    card.innerHTML = `
      <span class="market-badge" style="background:#ea4c89;">Livestock</span>
      <div class="market-item-icon">${animal.emoji}</div>
      <div class="market-item-name">${animal.name}</div>
      <div class="market-item-desc">
        Gives ${productText} (🪙${animal.productPrice} ea) when playing ${challengeText} quizzes!
        <br><strong style="color:var(--text-dark);">Active: ${activeCount}/3</strong>
      </div>
      <div class="market-item-price">🪙 ${animal.cost}</div>
      <button class="market-buy-btn" data-animal="${animalKey}" ${isMax ? 'disabled' : ''}>
        ${activeCount === 0 ? 'Adopt Animal' : (isMax ? 'Max Limit (3/3)' : 'Adopt Another')}
      </button>
    `;

    const buyBtn = card.querySelector('.market-buy-btn');
    if (!isMax && state.coins < animal.cost) buyBtn.disabled = true;

    buyBtn.addEventListener('click', () => {
      // Direct adoption click
      if (state.coins >= animal.cost) {
        state.coins -= animal.cost;
        animal.unlocked = true;
        if (!animal.instances) animal.instances = [];
        const newId = animalKey + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        animal.instances.push({ id: newId, age: 0, fedCount: 0 });
        animal.count = animal.instances.length;
        
        usersDB[currentUser] = state;
        saveUsersDB();
        renderAll();
        sync3DAnimals();
        AudioEngine.playSFX('correct');
        alert(`Congratulations! You adopted a baby ${animal.name}! (ยินดีด้วย! คุณได้รับเลี้ยงลูกสัตว์ใหม่แล้ว)`);
      } else {
        AudioEngine.playSFX('incorrect');
        alert("Not enough coins! (เหรียญทองไม่เพียงพอ)");
      }
    });
    els.marketItemsGrid.appendChild(card);
  });

  // Gifts & Marriage Items in Market
  // Gift box
  const giftCard = document.createElement('div');
  giftCard.className = 'market-card';
  giftCard.innerHTML = `
    <span class="market-badge" style="background:#ab47bc; color:white;">Romance</span>
    <div class="market-item-icon">🎁</div>
    <div class="market-item-name">Gift Box (กล่องของขวัญ)</div>
    <div class="market-item-desc">Give to your partner in the Family tab to increase romance points by +15.</div>
    <div class="market-item-price">🪙 20</div>
    <button class="market-buy-btn" id="market-buy-gift-btn">Buy & Send Gift</button>
  `;
  const buyGiftBtn = giftCard.querySelector('#market-buy-gift-btn');
  if (state.coins < 20 || !state.family.partnerName) buyGiftBtn.disabled = true;
  buyGiftBtn.addEventListener('click', () => {
    giveGiftToPartner();
  });
  els.marketItemsGrid.appendChild(giftCard);

  // Wedding Ring
  const ringCard = document.createElement('div');
  ringCard.className = 'market-card';
  ringCard.innerHTML = `
    <span class="market-badge" style="background:#ff5252; color:white;">Marriage</span>
    <div class="market-item-icon">💍</div>
    <div class="market-item-name">Wedding Ring (แหวนแต่งงาน)</div>
    <div class="market-item-desc">Propose marriage to your beloved partner. Requires 100 Romance Points!</div>
    <div class="market-item-price">🪙 500</div>
    <button class="market-buy-btn" id="market-buy-ring-btn">Buy & Propose</button>
  `;
  const buyRingBtn = ringCard.querySelector('#market-buy-ring-btn');
  if (state.coins < 500 || !state.family.partnerName || state.family.partnerRomance < 100 || state.family.isMarried) buyRingBtn.disabled = true;
  buyRingBtn.addEventListener('click', () => {
    proposeMarriage();
  });
  els.marketItemsGrid.appendChild(ringCard);

  // Streak Freeze Item
  const freezeCard = document.createElement('div');
  freezeCard.className = 'market-card';
  const shieldsCount = state.quizHistory.streakShields || 0;
  freezeCard.innerHTML = `
    <span class="market-badge" style="background:#0288d1; color:white;">Study Protection</span>
    <div class="market-item-icon">🛡️</div>
    <div class="market-item-name">Streak Freeze (โล่แช่แข็ง)</div>
    <div class="market-item-desc">
      ช่วยป้องกันไม่ให้สถิติวันสะสมการเรียนย้อนกลับเป็น 0 หากคุณข้ามวันทำโจทย์ (มีติดตัวไว้ปลอดภัยกว่า!)
      <br><strong style="color:var(--text-dark);">Active Shields: ${shieldsCount}</strong>
    </div>
    <div class="market-item-price">🪙 150</div>
    <button class="market-buy-btn" id="market-buy-freeze-btn">Buy Streak Freeze</button>
  `;
  const buyFreezeBtn = freezeCard.querySelector('#market-buy-freeze-btn');
  if (state.coins < 150) buyFreezeBtn.disabled = true;
  buyFreezeBtn.addEventListener('click', () => {
    if (state.coins >= 150) {
      state.coins -= 150;
      if (!state.quizHistory.streakShields) state.quizHistory.streakShields = 0;
      state.quizHistory.streakShields++;
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      AudioEngine.playSFX('correct');
      alert(`🛡️ ซื้อ Streak Freeze สำเร็จ! คุณมีตัวช่วยป้องกันการข้ามวันสะสมคงเหลือ ${state.quizHistory.streakShields} อัน`);
    } else {
      AudioEngine.playSFX('incorrect');
      alert("เหรียญทองไม่เพียงพอ! (ต้องใช้ 150 เหรียญ)");
    }
  });
  els.marketItemsGrid.appendChild(freezeCard);
}

// Unlock plots
function unlockPlot(plotId) {
  const plot = state.plots[plotId];
  if (state.coins >= plot.lockCost) {
    state.coins -= plot.lockCost;
    plot.isLocked = false;
    
    // Save state immediately
    usersDB[currentUser] = state;
    saveUsersDB();
    renderAll();
    
    const event = window.event;
    if (event) {
      createFloatingText(event.clientX, event.clientY, `-${plot.lockCost}`, 'red');
    }
  } else {
    alert("Not enough coins! (เหรียญทองไม่เพียงพอ)");
  }
}

// Planting crop mechanics
function plantSeed(plotId) {
  const seedType = state.activeSeed;
  if (state.inventory[seedType] > 0) {
    state.inventory[seedType]--;
    const plot = state.plots[plotId];
    plot.state = 'growing';
    plot.cropType = seedType;
    plot.progress = 0;
    plot.isWatered = false;

    usersDB[currentUser] = state;
    saveUsersDB();
    renderAll();
    startPlotTimer(plotId);
  } else {
    alert(`You don't have any ${seedType} seeds left! Buy some at the Market. (เมล็ดพันธุ์หมดแล้ว)`);
  }
}

function startPlotTimer(plotId) {
  if (plotTimers[plotId]) clearInterval(plotTimers[plotId]);

  const crop = cropMeta[state.plots[plotId].cropType];
  const totalSeconds = crop.growTime;
  
  plotTimers[plotId] = setInterval(() => {
    if (!state || !currentUser) {
      clearInterval(plotTimers[plotId]);
      return;
    }
    const plot = state.plots[plotId];
    if (!plot || plot.state !== 'growing') {
      clearInterval(plotTimers[plotId]);
      return;
    }

    const increment = (100 / totalSeconds) * (plot.isWatered ? 2 : 1);
    plot.progress = Math.min(plot.progress + increment, 100);

    if (plot.progress >= 100) {
      plot.state = 'ready';
      plot.progress = 100;
      clearInterval(plotTimers[plotId]);
      
      usersDB[currentUser] = state;
      saveUsersDB();
      renderPlots();
    } else {
      updatePlotProgressUI(plotId, plot.progress);
    }
  }, 1000);
}

function updatePlotProgressUI(plotId, progress) {
  renderPlots3D();
}

function resumeCrops() {
  if (!state) return;
  state.plots.forEach(plot => {
    if (plot.state === 'growing') {
      startPlotTimer(plot.id);
    }
  });
}

// Watering triggers quiz overlay
function waterCrop(plotId) {
  const plot = state.plots[plotId];
  if (plot.isWatered) {
    alert("This crop is already watered! (พืชชนิดนี้ถูกรดน้ำไปแล้ว)");
    return;
  }

  const subject = Math.random() > 0.5 ? 'math' : 'english';
  const questions = questionsData[state.selectedAgeGroup][subject];
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  activeQuiz = {
    question: randomQuestion,
    correctCallback: () => {
      plot.isWatered = true;
      plot.progress = Math.min(plot.progress + 40, 100);
      addCoins(10);
      addXp(15);
      
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
    },
    incorrectCallback: () => {},
    rewardCoins: 10,
    rewardXp: 15
  };

  showQuizModal(`Watering Boost (${subject.toUpperCase()})`);
}

function harvestCrop(plotId) {
  const plot = state.plots[plotId];
  if (plot.state === 'ready') {
    const cropKey = plot.cropType;
    const crop = cropMeta[cropKey];
    AudioEngine.playSFX('harvest');

    state.harvestStock[cropKey]++;
    plot.state = 'empty';
    plot.cropType = null;
    plot.progress = 0;
    plot.isWatered = false;

    addXp(crop.xpReward);
    
    usersDB[currentUser] = state;
    saveUsersDB();
    renderAll();

    const event = window.event;
    if (event) {
      createFloatingText(event.clientX, event.clientY, `+${crop.xpReward} XP`, '#00bcff');
    }
  }
}

function sellItem(stockKey) {
  const count = state.harvestStock[stockKey];
  if (count > 0) {
    let sellPrice = 0;
    if (cropMeta[stockKey]) {
      sellPrice = cropMeta[stockKey].sellPrice;
    } else if (stockKey === 'egg') {
      sellPrice = state.animals.chicken.productPrice;
    } else if (stockKey === 'milk') {
      sellPrice = state.animals.cow.productPrice;
    } else if (stockKey === 'bacon') {
      sellPrice = state.animals.pig.productPrice;
    } else if (stockKey === 'wool') {
      sellPrice = state.animals.sheep.productPrice;
    }

    const earnings = sellPrice * count;
    state.coins += earnings;
    state.harvestStock[stockKey] = 0;

    usersDB[currentUser] = state;
    saveUsersDB();
    renderAll();

    const event = window.event;
    if (event) {
      createFloatingText(event.clientX, event.clientY, `+${earnings} 🪙`, 'var(--gold-dark)');
    }
  }
}

function buySeeds(seedKey, cost) {
  if (state.coins >= cost) {
    state.coins -= cost;
    state.inventory[seedKey]++;
    
    usersDB[currentUser] = state;
    saveUsersDB();
    renderAll();

    const event = window.event;
    if (event) {
      createFloatingText(event.clientX, event.clientY, `-🪙${cost}`, 'red');
    }
  } else {
    alert("Not enough coins! (เหรียญทองไม่เพียงพอ)");
  }
}

function handleAnimalClick(animalKey, instanceId) {
  const animal = state.animals[animalKey];
  if (!animal.instances) animal.instances = [];

  // If we are calling this and the animal is not adopted at all (0 instances)
  if (animal.instances.length === 0) {
    if (state.coins >= animal.cost) {
      state.coins -= animal.cost;
      animal.unlocked = true;
      const newId = animalKey + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
      animal.instances.push({ id: newId, age: 0, fedCount: 0 });
      animal.count = animal.instances.length;
      
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      sync3DAnimals();
      AudioEngine.playSFX('correct');
      alert(`Congratulations! You adopted a baby ${animal.name}! (ยินดีด้วย! คุณได้รับเลี้ยงลูกสัตว์ใหม่แล้ว)`);
    } else {
      AudioEngine.playSFX('incorrect');
      alert("Not enough coins! (เหรียญทองไม่เพียงพอ)");
    }
    return;
  }

  // Find the specific instance being clicked (or grab the first one if not specified)
  let inst = animal.instances.find(i => i.id === instanceId);
  if (!inst) inst = animal.instances[0];

  const subject = (animalKey === 'chicken' || animalKey === 'sheep') ? 'english' : 'math';
  const questions = questionsData[state.selectedAgeGroup][subject];
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  // Define rewards and task description based on age
  let rewardCoins = 5;
  let rewardXp = 20;
  let caringAction = "";
  
  if (inst.age === 0) {
    caringAction = `Helping Baby ${animal.name} grow up!`;
  } else if (inst.age === 5) {
    caringAction = `Caring for Elder ${animal.name} (Retirement Prep!)`;
    rewardCoins = 15;
    rewardXp = 40;
  } else {
    caringAction = `Feeding ${animal.name} (Age: ${inst.age}/5)`;
  }

  activeQuiz = {
    question: randomQuestion,
    correctCallback: () => {
      const productKey = animal.product;
      
      if (inst.age === 0) {
        // Grow to Adult (age 1)
        inst.age = 1;
        addCoins(rewardCoins);
        addXp(rewardXp);
        createFloatingText(mouseX, mouseY, `Grew Up!`, '#4caf50');
      } else if (inst.age === 5) {
        // Elder yields double product and retires!
        state.harvestStock[productKey] += 2;
        addCoins(rewardCoins + 100); // Retirement bonus
        addXp(rewardXp + 100);       // Retirement bonus
        
        // Push Retirement badge
        const badgeName = "🏆 Animal Sanctuary Hero";
        if (!state.badges.includes(badgeName)) {
          state.badges.push(badgeName);
        }
        
        // Remove instance
        const idx = animal.instances.findIndex(i => i.id === inst.id);
        if (idx !== -1) animal.instances.splice(idx, 1);
        animal.count = animal.instances.length;
        
        createFloatingText(mouseX, mouseY, `Retired! +🪙100`, '#ffd700');
        alert(`🎉 Happy Retirement! your ${animal.name} has retired to the Happy Farm Sanctuary! Received a bonus of 🪙100 Coins & ⭐100 XP!`);
      } else {
        // Adult feeding (age 1 to 4)
        state.harvestStock[productKey]++;
        inst.fedCount++;
        inst.age++; // Grows older by 1 step
        addCoins(rewardCoins);
        addXp(rewardXp);
        createFloatingText(mouseX, mouseY, `+1 ${productKey.toUpperCase()}`, '#ffd700');
      }

      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      sync3DAnimals();
    },
    incorrectCallback: () => {},
    rewardCoins: rewardCoins,
    rewardXp: rewardXp,
    customRewardDesc: inst.age === 5 ? `+2 ${animal.emoji} ${animal.product.toUpperCase()}` : (inst.age === 0 ? `Growth Boost` : `+1 ${animal.emoji} ${animal.product.toUpperCase()}`)
  };

  showQuizModal(caringAction);
}

function startDirectQuiz(subject) {
  const todayStr = new Date().toISOString().split('T')[0];
  
  if (state.quizHistory.lastQuizDate !== todayStr) {
    state.quizHistory.questionsSolvedToday = 0;
  }
  
  if (state.quizHistory.questionsSolvedToday >= 30) {
    alert("คุณทำโจทย์แบบฝึกหัดครบ 30 ข้อสำหรับวันนี้แล้ว! กลับมาเรียนรู้ใหม่ในวันพรุ่งนี้นะครับ 🦉 (Daily Study Limit Reached!)");
    return;
  }
  
  const sessionQuestions = window.generateQuestionsForSession(state.selectedAgeGroup, subject, state.quizHistory.answeredCorrectlyIds, 30);
  
  if (sessionQuestions.length === 0) {
    alert("ไม่มีคำถามเหลือสำหรับระดับชั้นนี้แล้วครับ!");
    return;
  }
  
  activeSession = {
    questions: sessionQuestions,
    currentIndex: 0,
    subject: subject,
    sessionCorrectCount: 0
  };
  
  loadSessionQuestion(0);
}

function addXp(amount) {
  state.xp += amount;
  const xpNeeded = state.level * 100;
  if (state.xp >= xpNeeded) {
    state.xp -= xpNeeded;
    state.level++;
    state.coins += 50;
    setTimeout(() => {
      alert(`⭐ LEVEL UP! You are now level ${state.level}! You earned 50 bonus coins! (เลเวลอัปแล้ว!)`);
    }, 500);
  }
}

function addCoins(amount) {
  state.coins += amount;
}

// Modal control
function showQuizModal(title) {
  els.modalTitle.textContent = title;
  const q = activeQuiz.question;
  els.questionText.textContent = q.question;
  els.questionVisual.innerHTML = q.visual || '';
  els.questionOptions.innerHTML = '';
  
  const options = [...q.options];
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = opt;
    btn.addEventListener('click', () => handleOptionClick(opt, btn));
    els.questionOptions.appendChild(btn);
  });

  els.modalQuizContent.classList.add('active');
  els.feedbackSuccess.classList.remove('active');
  els.feedbackFail.classList.remove('active');
  els.quizModal.classList.add('active');
}

function handleOptionClick(selectedOpt, btnEl) {
  stopQuizTimer();
  const q = activeQuiz.question;
  const isCorrect = selectedOpt === q.answer;

  if (isCorrect) {
    AudioEngine.playSFX('correct');
  } else {
    AudioEngine.playSFX('incorrect');
  }

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.answer) {
      btn.classList.add('correct');
    } else if (btn.textContent === selectedOpt && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  setTimeout(() => {
    els.modalQuizContent.classList.remove('active');
    
    if (isCorrect) {
      els.feedbackSuccess.classList.add('active');
      let rewardText = `🪙 +${activeQuiz.rewardCoins} Coins`;
      if (activeQuiz.customRewardDesc) {
        rewardText += ` & ${activeQuiz.customRewardDesc}`;
      }
      els.successReward.innerHTML = `<span>🎁 Rewards: </span> ${rewardText}`;
      
      // Update explanation text
      const explanation = q.explanation || 'ยินดีด้วยครับ! คุณตอบได้ถูกต้อง.';
      els.successExplanationText.innerHTML = explanation;

      activeQuiz.correctCallback();
    } else {
      els.feedbackFail.classList.add('active');
      els.failMsg.innerHTML = `Don't worry! Try again next time.<br>The correct answer was: <strong>${q.answer}</strong>`;
      
      // Update explanation text
      const explanation = q.explanation || `ข้อนี้เฉลยคำตอบคือ: ${q.answer}`;
      els.failExplanationText.innerHTML = explanation;

      activeQuiz.incorrectCallback();
    }
  }, 800);
}

function closeModal() {
  stopSpeaking();
  els.quizModal.classList.remove('active');
}

// ==========================================
// 30-Question Daily Exercise Session & Timers
// ==========================================
let activeSession = null;
let quizTimer = {
  intervalId: null,
  timeLeft: 30,
  isActive: false
};

function loadSessionQuestion(idx) {
  if (!activeSession) return;
  activeSession.currentIndex = idx;
  const q = activeSession.questions[idx];
  
  activeQuiz = {
    question: q,
    correctCallback: () => {
      activeSession.sessionCorrectCount++;
      
      const todayStr = new Date().toISOString().split('T')[0];
      if (state.quizHistory.lastQuizDate !== todayStr) {
        state.quizHistory.lastQuizDate = todayStr;
        state.quizHistory.questionsSolvedToday = 0;
      }
      state.quizHistory.questionsSolvedToday++;
      
      if (!state.quizHistory.answeredCorrectlyIds.includes(q.id)) {
        state.quizHistory.answeredCorrectlyIds.push(q.id);
      }
      
      addCoins(15);
      addXp(15);
      
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      updateStudyWidget();
    },
    incorrectCallback: () => {
      const todayStr = new Date().toISOString().split('T')[0];
      if (state.quizHistory.lastQuizDate !== todayStr) {
        state.quizHistory.lastQuizDate = todayStr;
        state.quizHistory.questionsSolvedToday = 0;
      }
      state.quizHistory.questionsSolvedToday++;
      
      if (!state.quizHistory.weaknesses) state.quizHistory.weaknesses = {};
      const typeKey = q.type || 'unknown';
      state.quizHistory.weaknesses[typeKey] = (state.quizHistory.weaknesses[typeKey] || 0) + 1;
      
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      updateStudyWidget();
    },
    rewardCoins: 15,
    rewardXp: 15
  };
  
  els.modalQuizContent.classList.add('active');
  els.feedbackSuccess.classList.remove('active');
  els.feedbackFail.classList.remove('active');
  
  stopQuizTimer();
  
  // Show modal with session progress
  showQuizModal(`Challenge: Q${idx + 1}/30`);
  
  if (state.selectedAgeGroup !== 'level-kg') {
    startQuizTimer();
  } else {
    const tContainer = document.getElementById('quiz-timer-container');
    const tText = document.getElementById('quiz-timer-text');
    if (tContainer) tContainer.style.display = 'none';
    if (tText) tText.style.display = 'none';
  }
}

function finishSession() {
  stopQuizTimer();
  
  const todayStr = new Date().toISOString().split('T')[0];
  let message = "";
  
  if (state.quizHistory.questionsSolvedToday >= 30) {
    const lastIncDate = state.quizHistory.lastIncrementDate || "";
    if (lastIncDate !== todayStr) {
      state.quizHistory.lastIncrementDate = todayStr;
      state.quizHistory.lastQuizDate = todayStr;
      state.quizHistory.challengeDayProgress++;
      
      // Milestone Day 10
      if (state.quizHistory.challengeDayProgress === 10 && !state.badges.includes('study_day_10')) {
        state.badges.push('study_day_10');
        state.coins += 100;
        state.xp += 100;
        message += "\n\n🎉 ยินดีด้วย! คุณสะสมวันเรียนครบ 10 วัน ปลดล็อคตราเกียรติยศ 'Study Scholar 📜' และรับโบนัส 100 เหรียญทอง!";
      }
      // Milestone Day 20
      if (state.quizHistory.challengeDayProgress === 20 && !state.badges.includes('study_day_20')) {
        state.badges.push('study_day_20');
        state.coins += 200;
        state.xp += 200;
        message += "\n\n🎉 ยินดีด้วย! คุณสะสมวันเรียนครบ 20 วัน ปลดล็อคตราเกียรติยศ 'Expert Explorer 🔍' และรับโบนัส 200 เหรียญทอง!";
      }
      // Milestone Day 30
      if (state.quizHistory.challengeDayProgress >= 30 && !state.quizHistory.monthlyCompleted) {
        state.quizHistory.monthlyCompleted = true;
        state.coins += 500;
        state.xp += 500;
        if (!state.badges.includes('monthly_mastermind')) {
          state.badges.push('monthly_mastermind');
        }
        message += "\n\n🎉 ยินดีด้วยอย่างยิ่ง! คุณผ่านความท้าทายเรียนรู้วันละ 30 ข้อครบ 1 เดือน (30 วัน) แล้ว! ได้รับเหรียญโบนัส +500 Coins และ +500 XP พร้อมตราเกียรติยศสูงสุด 'Monthly Mastermind 🌟🏆'!";
      }
    }
  }
  
  alert(`🏆 แบบฝึกหัดสำเร็จ!\nคุณตอบถูก ${activeSession.sessionCorrectCount} จาก 30 ข้อ\nสะสมทำภารกิจสำเร็จ: วันที่ ${state.quizHistory.challengeDayProgress} / 30 วัน${message}`);
  
  activeSession = null;
  closeModal();
  updateStudyWidget();
}

function startQuizTimer() {
  stopQuizTimer();
  
  quizTimer.timeLeft = 30;
  quizTimer.isActive = true;
  
  const container = document.getElementById('quiz-timer-container');
  const bar = document.getElementById('quiz-timer-bar');
  const text = document.getElementById('quiz-timer-text');
  
  if (container && bar && text) {
    container.style.display = 'block';
    text.style.display = 'block';
    bar.style.width = '100%';
    text.textContent = `เวลาที่เหลือ: 30 วินาที`;
    text.classList.remove('timer-pulse');
  }
  
  quizTimer.intervalId = setInterval(() => {
    if (!quizTimer.isActive) {
      stopQuizTimer();
      return;
    }
    
    quizTimer.timeLeft--;
    
    if (bar) {
      const pct = (quizTimer.timeLeft / 30) * 100;
      bar.style.width = `${pct}%`;
    }
    if (text) {
      text.textContent = `เวลาที่เหลือ: ${quizTimer.timeLeft} วินาที`;
      if (quizTimer.timeLeft <= 10) {
        text.classList.add('timer-pulse');
      } else {
        text.classList.remove('timer-pulse');
      }
    }
    
    if (quizTimer.timeLeft <= 0) {
      stopQuizTimer();
      handleQuizTimeout();
    }
  }, 1000);
}

function stopQuizTimer() {
  quizTimer.isActive = false;
  if (quizTimer.intervalId) {
    clearInterval(quizTimer.intervalId);
    quizTimer.intervalId = null;
  }
  const text = document.getElementById('quiz-timer-text');
  if (text) text.classList.remove('timer-pulse');
}

function handleQuizTimeout() {
  AudioEngine.playSFX('incorrect');
  stopSpeaking();
  
  els.modalQuizContent.classList.remove('active');
  els.feedbackFail.classList.add('active');
  
  const q = activeQuiz.question;
  els.failMsg.innerHTML = `หมดเวลาแล้ว! (Time's Up!)<br>คำตอบที่ถูกต้องคือ: <strong>${q.answer}</strong>`;
  
  const explanation = q.explanation || `ข้อนี้เฉลยคำตอบคือ: ${q.answer}`;
  els.failExplanationText.innerHTML = explanation;
  
  activeQuiz.incorrectCallback();
}

function updateStudyWidget() {
  if (!state) return;
  const challengeDayEl = document.getElementById('study-challenge-day');
  const todayProgressEl = document.getElementById('study-today-progress');
  const progressBarEl = document.getElementById('study-day-progress-bar');
  const statusBadgeEl = document.getElementById('study-status-badge');
  const weaknessListEl = document.getElementById('study-weakness-list');
  
  const todayStr = new Date().toISOString().split('T')[0];
  const solvedToday = state.quizHistory.questionsSolvedToday || 0;
  const completedDays = state.quizHistory.challengeDayProgress || 0;
  
  if (state.quizHistory.lastQuizDate !== todayStr) {
    if (todayProgressEl) todayProgressEl.textContent = `Today's solved: 0 / 30 questions`;
    if (statusBadgeEl) {
      statusBadgeEl.textContent = `📝 Study active`;
      statusBadgeEl.style.color = `#2e7d32`;
    }
  } else {
    if (todayProgressEl) todayProgressEl.textContent = `Today's solved: ${solvedToday} / 30 questions`;
    if (statusBadgeEl) {
      if (solvedToday >= 30) {
        statusBadgeEl.textContent = `✅ Completed for today!`;
        statusBadgeEl.style.color = `#ff9800`;
      } else {
        statusBadgeEl.textContent = `📝 Study active`;
        statusBadgeEl.style.color = `#2e7d32`;
      }
    }
  }
  
  if (challengeDayEl) challengeDayEl.textContent = `Day ${completedDays} / 30 Completed`;
  
  if (progressBarEl) {
    const dayPct = (completedDays / 30) * 100;
    progressBarEl.style.width = `${dayPct}%`;
  }

  // Populate Weakness List (Parent Dashboard Report Card)
  if (weaknessListEl) {
    if (state.quizHistory.weaknesses && Object.keys(state.quizHistory.weaknesses).length > 0) {
      const sorted = Object.entries(state.quizHistory.weaknesses)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
      
      if (sorted.length > 0) {
        const typeNames = {
          count: 'การนับจำนวนสิ่งของ 🔢',
          shape: 'รูปทรงเรขาคณิต 🔴🟦',
          comparison: 'เปรียบเทียบขนาด (เล็ก-ใหญ่) 🐘🐭',
          matching: 'จับคู่ความสัมพันธ์ของสิ่งของ 🐰🥕',
          addition: 'การบวกเลข ➕',
          subtraction: 'การลบเลข ➖',
          multiplication: 'การคูณเลข ✖️',
          division: 'การหารเลข ➗',
          decimals: 'เรื่องทศนิยม 0.5',
          volume: 'การหาปริมาตรลูกบาศก์ 📦',
          equation: 'โจทย์แก้สมการตัวแปร x',
          gcd: 'หา ห.ร.ม. (หารร่วมมาก)',
          lcm: 'หา ค.ร.น. (คูณร่วมน้อย)',
          spelling: 'การสะกดคำศัพท์ภาษาอังกฤษ 🔤',
          grammar: 'ไวยากรณ์สรรพนาม (He/She/It)',
          conjunction: 'คำเชื่อมประโยค (so/but/because)',
          grammar_passive: 'ไวยากรณ์ประโยคถูกกระทำ (Passive Voice)',
          idiom: 'สำนวนภาษาอังกฤษ (Idioms)'
        };
        
        let html = '<span style="color:#d84315; font-weight:bold;">⚠️ จุดที่ควรฝึกฝนเพิ่มเติม:</span><ul style="margin: 4px 0 0 16px; padding: 0;">';
        sorted.slice(0, 3).forEach(([type, count]) => {
          const name = typeNames[type] || type;
          html += `<li>${name} (ตอบผิด ${count} ครั้ง)</li>`;
        });
        html += '</ul><span style="font-size:0.75rem; color:#795548; display:block; margin-top:4px;">* แนะนำให้คุณแม่/คุณครูชวนน้องทบทวนบทเรียนเรื่องนี้ร่วมกันนะครับ 🦉</span>';
        weaknessListEl.innerHTML = html;
      } else {
        weaknessListEl.innerHTML = 'ยังไม่มีประวัติการทำผิดพลาด คุณครูยังไม่พบจุดอ่อนของเด็กๆ ครับ! ยอดเยี่ยมมาก 🎉';
      }
    } else {
      weaknessListEl.innerHTML = 'ยังไม่มีประวัติการทำผิดพลาด คุณครูยังไม่พบจุดอ่อนของเด็กๆ ครับ! ยอดเยี่ยมมาก 🎉';
    }
  }
}

function checkDailyStreakReset() {
  if (!state || !state.quizHistory) return;
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Set initial lastQuizDate if empty so we start tracking
  if (!state.quizHistory.lastQuizDate) {
    state.quizHistory.lastQuizDate = todayStr;
    usersDB[currentUser] = state;
    saveUsersDB();
    return;
  }
  
  if (state.quizHistory.lastQuizDate !== todayStr) {
    // Day changed! Check if they failed to finish yesterday's 30 questions
    if (state.quizHistory.questionsSolvedToday < 30) {
      if (state.quizHistory.streakShields > 0) {
        state.quizHistory.streakShields--;
        alert(`🛡️ คุณทำแบบฝึกหัดไม่ครบ 30 ข้อในวันก่อน แต่สถิติสะสมของคุณได้รับการปกป้องด้วย Streak Freeze! (หักโล่ 1 อัน คงเหลือ ${state.quizHistory.streakShields} อัน)`);
      } else {
        state.quizHistory.challengeDayProgress = 0;
        alert("😢 คุณไม่ได้ทำแบบฝึกหัดต่อเนื่องครบ 30 ข้อในวันก่อน ทำให้วันสะสมย้อนกลับไปเริ่มที่วันที่ 0 ใหม่ครับ มารักษาความต่อเนื่องใหม่นะ! 🦉");
      }
    } else {
      // Check for skipped days (not logging in at all)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lastDateParts = state.quizHistory.lastQuizDate.split('-');
      if (lastDateParts.length === 3) {
        const lastDate = new Date(parseInt(lastDateParts[0]), parseInt(lastDateParts[1]) - 1, parseInt(lastDateParts[2]));
        lastDate.setHours(0, 0, 0, 0);
        
        const timeDiff = today.getTime() - lastDate.getTime();
        const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        if (diffDays > 1) {
          let shieldsNeeded = diffDays - 1;
          let shieldsUsed = 0;
          while (state.quizHistory.streakShields > 0 && shieldsNeeded > shieldsUsed) {
            state.quizHistory.streakShields--;
            shieldsUsed++;
          }
          
          if (shieldsUsed >= shieldsNeeded) {
            alert(`🛡️ สถิติการสะสมได้รับการปกป้องโดย Streak Freeze! (หักโล่ ${shieldsUsed} อัน เพื่อชดเชยวันที่ขาดหายไป คงเหลือโล่ ${state.quizHistory.streakShields} อัน)`);
          } else {
            state.quizHistory.challengeDayProgress = 0;
            alert("😢 คุณข้ามวันฝึกหัดไป ทำให้วันสะสมย้อนกลับไปเริ่มที่วันที่ 0 ใหม่ครับ มารักษาความต่อเนื่องใหม่นะ! 🦉");
          }
        }
      }
    }
    
    // Reset daily solved count for the new day
    state.quizHistory.questionsSolvedToday = 0;
    state.quizHistory.lastQuizDate = todayStr;
    usersDB[currentUser] = state;
    saveUsersDB();
    updateStudyWidget();
  }
}


// Owl School Classroom Engine States
let activeLessonState = {
  topic: null,
  page: 0,
  testScore: 0,
  testQuestionIdx: 0
};

// Render topic selections inside Learning Barn
function renderLessons() {
  if (!state || !els.lessonTopicsGrid) return;
  els.lessonTopicsGrid.innerHTML = '';

  const lessons = window.lessonsData[state.selectedAgeGroup] || [];
  
  if (lessons.length === 0) {
    els.lessonTopicsGrid.innerHTML = `
      <div style="color:var(--white); opacity:0.8; padding:20px; font-size:0.95rem;">
        No lessons available for this level yet!
      </div>
    `;
    return;
  }

  lessons.forEach(topic => {
    const isCompleted = state.badges && state.badges.includes(topic.badgeId);
    const card = document.createElement('button');
    card.className = 'topic-card';
    
    card.innerHTML = `
      <div class="topic-card-subject">${topic.subject}</div>
      <div class="topic-card-title">${topic.title}</div>
      <div style="font-size:0.75rem; color:#777; margin-top:4px;">
        ${isCompleted ? '✅ Passed (สอบผ่านแล้ว)' : '📖 Study Lesson'}
      </div>
    `;
    
    card.addEventListener('click', () => startLesson(topic));
    els.lessonTopicsGrid.appendChild(card);
  });
}

// Render achievement badges inside Farmer Profile tab
function renderBadges() {
  if (!state || !els.profileBadgesGrid) return;
  els.profileBadgesGrid.innerHTML = '';

  const lessons = window.lessonsData[state.selectedAgeGroup] || [];
  
  lessons.forEach(topic => {
    const isUnlocked = state.badges && state.badges.includes(topic.badgeId);
    const badgeEl = document.createElement('div');
    badgeEl.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
    
    badgeEl.innerHTML = `
      <span class="badge-emoji">${isUnlocked ? topic.badgeEmoji : '🔒'}</span>
      <div class="badge-name-lbl">${isUnlocked ? topic.badgeName.split(' ')[0] : 'Locked'}</div>
    `;
    
    // Add title hint for parents
    badgeEl.title = isUnlocked ? `Unlocked: ${topic.badgeName}` : `Complete the "${topic.title.split(' ')[0]}" post-test to unlock!`;
    
    els.profileBadgesGrid.appendChild(badgeEl);
  });

  if (lessons.length === 0 && (!state.badges || state.badges.length === 0)) {
    els.profileBadgesGrid.innerHTML = '<div style="font-size:0.8rem; color:#999;">No badges in this level.</div>';
  }

  // Custom study progression badges
  const studyBadges = [
    { id: 'study_day_10', name: 'Study Scholar', emoji: '📜', desc: 'Complete Day 10 of the Study Challenge' },
    { id: 'study_day_20', name: 'Expert Explorer', emoji: '🔍', desc: 'Complete Day 20 of the Study Challenge' },
    { id: 'monthly_mastermind', name: 'Monthly Mastermind', emoji: '🏆', desc: 'Complete Day 30 of the Study Challenge' }
  ];

  studyBadges.forEach(cb => {
    const isUnlocked = state.badges && state.badges.includes(cb.id);
    const badgeEl = document.createElement('div');
    badgeEl.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
    badgeEl.innerHTML = `
      <span class="badge-emoji">${isUnlocked ? cb.emoji : '🔒'}</span>
      <div class="badge-name-lbl">${isUnlocked ? cb.name.split(' ')[0] : 'Locked'}</div>
    `;
    badgeEl.title = isUnlocked ? `Unlocked: ${cb.name} - ${cb.desc}` : `Locked: ${cb.desc}`;
    els.profileBadgesGrid.appendChild(badgeEl);
  });
}

// Owl Lesson Slide Flow Controllers
let currentClassroomTab = 'student'; // 'student' or 'parent'
let savedStudentPage = 0; // save the current student slide page index (0 or 1)

function switchClassroomTab(tab) {
  currentClassroomTab = tab;
  stopSpeaking();
  
  if (tab === 'student') {
    els.btnTabStudent.classList.add('active');
    els.btnTabParent.classList.remove('active');
    
    // Restore saved student page
    activeLessonState.page = savedStudentPage;
  } else {
    els.btnTabStudent.classList.remove('active');
    els.btnTabParent.classList.add('active');
    
    // Save student page before switching to parent guide
    if (activeLessonState.page !== 2) {
      savedStudentPage = activeLessonState.page;
    }
    // Set to page 2 (Parent Guide)
    activeLessonState.page = 2;
  }
  
  renderLessonSlide();
}

function startLesson(topic) {
  activeLessonState = {
    topic: topic,
    page: 0,
    testScore: 0,
    testQuestionIdx: 0
  };
  savedStudentPage = 0;
  currentClassroomTab = 'student';

  els.owlClassroomTitle.textContent = `Pearn rean pean sanook: ${topic.title}`;
  
  // Set tab active state
  els.btnTabStudent.classList.add('active');
  els.btnTabParent.classList.remove('active');
  
  // Set views active inside modal
  els.owlSlideView.style.display = 'block';
  els.owlTestView.style.display = 'none';
  els.owlFeedbackSuccess.style.display = 'none';
  
  // Open modal
  els.owlClassroomModal.classList.add('active');
  
  renderLessonSlide();
}

function renderLessonSlide() {
  const topic = activeLessonState.topic;
  const slide = topic.slides[activeLessonState.page];
  
  els.owlLessonVisual.innerHTML = slide.visual;
  els.owlLessonText.innerHTML = slide.text;
  
  if (currentClassroomTab === 'student') {
    // Show navigation for student (page 0 or 1)
    els.owlPageIndicator.textContent = `Slide ${activeLessonState.page + 1}/2`;
    els.btnOwlPrev.style.display = activeLessonState.page === 0 ? 'none' : 'block';
    
    if (activeLessonState.page === 1) {
      // Last page of student slides: show Start Test
      els.btnOwlNext.style.display = 'none';
      els.btnOwlStartTest.style.display = 'block';
    } else {
      els.btnOwlNext.style.display = 'block';
      els.btnOwlStartTest.style.display = 'none';
    }
  } else {
    // Parent guide view (page 2)
    els.owlPageIndicator.textContent = `คู่มือผู้ปกครอง (Parent Guide)`;
    els.btnOwlPrev.style.display = 'none';
    els.btnOwlNext.style.display = 'none';
    els.btnOwlStartTest.style.display = 'none';
  }
}

function navigateLessonSlide(direction) {
  if (currentClassroomTab === 'student') {
    activeLessonState.page = Math.max(0, Math.min(activeLessonState.page + direction, 1));
    savedStudentPage = activeLessonState.page;
    renderLessonSlide();
  }
}

// Owl Post-Test engine
function startPostTest() {
  els.owlSlideView.style.display = 'none';
  els.owlTestView.style.display = 'block';
  
  activeLessonState.testQuestionIdx = 0;
  activeLessonState.testScore = 0;
  
  renderPostTestQuestion();
}

function renderPostTestQuestion() {
  const topic = activeLessonState.topic;
  const q = topic.postTest[activeLessonState.testQuestionIdx];
  
  // Hide explanation box
  els.owlTestExplanationBox.style.display = 'none';
  
  els.owlTestTracker.textContent = `Question ${activeLessonState.testQuestionIdx + 1} of ${topic.postTest.length}`;
  els.owlTestVisual.innerHTML = q.visual || '';
  els.owlTestQuestion.textContent = q.question;
  
  els.owlTestOptions.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = opt;
    btn.addEventListener('click', () => handlePostTestAnswer(opt, btn));
    els.owlTestOptions.appendChild(btn);
  });
}

function handlePostTestAnswer(selectedOpt, btnEl) {
  const topic = activeLessonState.topic;
  const q = topic.postTest[activeLessonState.testQuestionIdx];
  const isCorrect = selectedOpt === q.answer;

  if (isCorrect) {
    AudioEngine.playSFX('correct');
  } else {
    AudioEngine.playSFX('incorrect');
  }

  // Disable all options
  document.querySelectorAll('#owl-test-options .option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.answer) {
      btn.classList.add('correct');
    } else if (btn.textContent === selectedOpt && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    activeLessonState.testScore++;
  }

  // Show chalkboard explanation box
  const explanation = q.explanation || `เฉลยคำตอบคือ ${q.answer}`;
  els.owlTestExplanationText.innerHTML = explanation;
  els.owlTestExplanationBox.style.display = 'block';
}

function evaluatePostTest() {
  const topic = activeLessonState.topic;
  
  if (activeLessonState.testScore === topic.postTest.length) {
    // PASSED PERFECTLY (3/3)
    completeLessonSuccess();
  } else {
    // FAILED - Guide back to study
    alert(`🦉 Oh no! You scored ${activeLessonState.testScore}/${topic.postTest.length}. Let's review the lesson and try again! (สู้ๆ นะ อ่านบทเรียนอีกรอบและลองใหม่กันครับ)`);
    
    // Reset back to lesson page 0
    els.owlTestView.style.display = 'none';
    els.owlSlideView.style.display = 'block';
    activeLessonState.page = 0;
    savedStudentPage = 0;
    currentClassroomTab = 'student';
    els.btnTabStudent.classList.add('active');
    els.btnTabParent.classList.remove('active');
    renderLessonSlide();
  }
}

function completeLessonSuccess() {
  const topic = activeLessonState.topic;
  
  // Award badge & rewards if not earned already
  if (!state.badges) state.badges = [];
  
  const isNewBadge = !state.badges.includes(topic.badgeId);
  if (isNewBadge) {
    state.badges.push(topic.badgeId);
    state.coins += 30; // 30 bonus coins!
    state.xp += 30;    // 30 bonus XP!
    
    usersDB[currentUser] = state;
    saveUsersDB();
  }

  // Show Success Screen
  els.owlTestView.style.display = 'none';
  els.owlFeedbackSuccess.style.display = 'flex';
  
  els.owlSuccessMsg.innerHTML = `Awesome job! You answered all questions correctly.<br>You are officially a certified <strong>${topic.badgeName}</strong>!`;
  els.owlSuccessReward.innerHTML = `
    <span>🎁 Rewards unlocked:</span><br>
    🪙 +30 Coins & ⭐ +30 XP<br>
    🎖️ Badge: ${topic.badgeEmoji} ${topic.badgeName}
  `;
  
  // Refresh stats & profile view
  renderAll();
  renderLessons();
}

function closeOwlClassroom() {
  stopSpeaking();
  els.owlTestExplanationBox.style.display = 'none';
  els.owlClassroomModal.classList.remove('active');
}

// ==========================================
// ==========================================
// Text-to-Speech (TTS) Dummy Functions (Disabled)
// ==========================================
function speakText(text, btnEl) {
  // TTS reading is disabled as requested by the user
}
function stopSpeaking() {
  // TTS reading is disabled
}

// ==========================================
// Web Audio API Retro 8-Bit Audio Engine
// ==========================================
const AudioEngine = {
  ctx: null,
  bgmTimeout: null,
  bgmPlaying: false,
  volume: 0.12,
  
  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  },
  
  playSFX(type) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    
    switch (type) {
      case 'water':
        this.noiseSplash(now);
        break;
      case 'harvest':
        this.synthSweep(now, 220, 880, 0.1, 'sine');
        break;
      case 'correct':
        this.synthNote(now, 523.25, 0.12, 'triangle'); // C5
        this.synthNote(now + 0.12, 659.25, 0.12, 'triangle'); // E5
        this.synthNote(now + 0.24, 783.99, 0.25, 'triangle'); // G5
        break;
      case 'incorrect':
        this.synthSweep(now, 180, 90, 0.3, 'sawtooth');
        break;
      case 'truck':
        this.synthTruck(now);
        break;
      case 'click':
        this.synthSweep(now, 500, 700, 0.04, 'sine');
        break;
      case 'animal_chicken':
        this.synthSweep(now, 600, 1000, 0.12, 'triangle');
        this.synthSweep(now + 0.15, 600, 1000, 0.12, 'triangle');
        break;
      case 'animal_cow':
        this.synthSweep(now, 150, 100, 0.4, 'sine');
        break;
      case 'animal_pig':
        this.synthSweep(now, 200, 150, 0.15, 'sawtooth');
        this.synthSweep(now + 0.2, 200, 150, 0.15, 'sawtooth');
        break;
      case 'animal_sheep':
        this.synthSweep(now, 300, 350, 0.35, 'triangle');
        break;
    }
  },
  
  synthNote(time, freq, duration, type) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(this.volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + duration);
  },

  synthSweep(time, startFreq, endFreq, duration, type) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + duration);
    gain.gain.setValueAtTime(this.volume * 0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + duration);
  },

  noiseSplash(time) {
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(200, time + 0.25);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volume * 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    noise.start(time);
    noise.stop(time + 0.25);
  },

  synthTruck(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(85, time);
    osc.frequency.linearRampToValueAtTime(140, time + 0.6);
    osc.frequency.linearRampToValueAtTime(65, time + 1.6);
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(this.volume * 0.4, time + 0.2);
    gain.gain.linearRampToValueAtTime(this.volume * 0.4, time + 1.3);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 2.0);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(time);
    osc.stop(time + 2.0);
  },

  startBGM() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.bgmPlaying) return;
    this.bgmPlaying = true;
    
    // A beautiful, relaxing and cheerful farm melody (pentatonic G major / E minor)
    const melody = [
      { freq: 392.00, dur: 1.0 },  // G4
      { freq: 440.00, dur: 1.0 },  // A4
      { freq: 493.88, dur: 2.0 },  // B4
      { freq: 440.00, dur: 1.0 },  // A4
      { freq: 392.00, dur: 1.0 },  // G4
      { freq: 329.63, dur: 2.0 },  // E4
      
      { freq: 392.00, dur: 1.0 },  // G4
      { freq: 440.00, dur: 1.0 },  // A4
      { freq: 493.88, dur: 1.5 },  // B4
      { freq: 587.33, dur: 0.5 },  // D5
      { freq: 440.00, dur: 3.0 },  // A4
      { freq: 0.0,    dur: 1.0 },  // Rest
      
      { freq: 493.88, dur: 1.0 },  // B4
      { freq: 587.33, dur: 1.0 },  // D5
      { freq: 659.25, dur: 2.0 },  // E5
      { freq: 587.33, dur: 1.0 },  // D5
      { freq: 493.88, dur: 1.0 },  // B4
      { freq: 392.00, dur: 2.0 },  // G4
      
      { freq: 329.63, dur: 1.0 },  // E4
      { freq: 392.00, dur: 1.0 },  // G4
      { freq: 440.00, dur: 1.5 },  // A4
      { freq: 392.00, dur: 0.5 },  // G4
      { freq: 392.00, dur: 3.0 },  // G4
      { freq: 0.0,    dur: 1.0 }   // Rest
    ];
    
    let noteIdx = 0;
    const baseBeat = 0.32; // speed of the beats
    
    const playNextBGMNote = () => {
      if (!this.bgmPlaying) return;
      const now = this.ctx.currentTime;
      const note = melody[noteIdx];
      const duration = note.dur * baseBeat;
      
      if (note.freq > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle'; // Soft triangle wave for a woodwind/flute-like soothing sound
        osc.frequency.setValueAtTime(note.freq, now);
        
        gain.gain.setValueAtTime(this.volume * 0.12, now);
        // smooth exponential decay for an organic, relaxing sound
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.95);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + duration * 0.95);
      }
      
      noteIdx = (noteIdx + 1) % melody.length;
      this.bgmTimeout = setTimeout(playNextBGMNote, duration * 1000);
    };
    
    playNextBGMNote();
  },
  
  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }
};

// ============================================================================
// REMOVED LEGACY 2D ENGINE CODE
// ============================================================================


// ============================================================================
// ============================================================================
// THREE.JS 3D GAME ENGINE
// ============================================================================
let scene, camera, renderer, controls;
let groundMesh;
let active3DPlots = [];
let active3DAnimals = [];
let active3DParticles = [];
let farmerHelper3D = {
  mesh: null,
  state: 'idle', // 'idle', 'walking', 'working'
  targetPos: null,
  wanderTimer: 0,
  animTime: 0,
  emojiTimer: 0,
  activeEmojiSprite: null,
  currentTask: null,
  workTimer: 0
};
let weather3DParticlesGroup = null;
let truck3DMesh = null;
let canvasEngineRunning = false;
let animationFrameId = null;
let lastTime = 0;
let hoveredPlotId = null;
let canvas = null;
let zoomScale = 1.0;
let mouseX = 0, mouseY = 0;

const engineAnimals = []; // Compatibility dummy
const engineParticles = []; // Compatibility dummy

const pastureBounds = {
  minX: -22, maxX: -6,
  minZ: 2, maxZ: 22
};

function initCanvasEngine() {
  canvas = els.farmCanvas;
  if (!canvas) return;

  const w = els.farmCanvasContainer.clientWidth || 750;
  const h = 520;

  // WebGL Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Scene
  scene = new THREE.Scene();
  
  // Sky color (set initially)
  renderer.setClearColor(0x81d4fa, 1);

  // Fog
  scene.fog = new THREE.FogExp2(0x81d4fa, 0.007);

  // Camera
  camera = new THREE.PerspectiveCamera(40, w / h, 1, 1000);
  camera.position.set(0, 36, 46);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 15;
  controls.maxDistance = 80;
  controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
  controls.target.set(0, 0, 5);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
  dirLight.position.set(25, 45, 20);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 150;
  
  const d = 40;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  scene.add(dirLight);

  // Add all static elements to 3D scene
  build3DWorld();

  // Resize listener
  window.addEventListener('resize', resizeCanvas);

  // Mouse events
  setupCanvasEvents();
}

function resizeCanvas() {
  if (!renderer || !camera) return;
  const w = els.farmCanvasContainer.clientWidth || 750;
  const h = 520;
  
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  
  renderer.setSize(w, h);
}

function startCanvasEngine() {
  if (!canvasEngineRunning) {
    canvasEngineRunning = true;
    lastTime = performance.now();
    
    // Sync active state UI & ground coloring
    applySeasonUI();
    
    // Sync 3D animals to match active user state
    sync3DAnimals();
    
    // Re-render / update 3D plot statuses
    renderPlots3D();
    
    // Start game loop
    animationFrameId = requestAnimationFrame(gameLoop);
  }
}

function stopCanvasEngine() {
  canvasEngineRunning = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function gameLoop(timestamp) {
  if (!canvasEngineRunning) return;
  
  let dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  if (dt > 0.1) dt = 0.1;
  
  const container = els.farmCanvasContainer;
  if (container && container.clientWidth > 0 && renderer) {
    const rect = container.getBoundingClientRect();
    if (renderer.domElement.width !== Math.round(rect.width * Math.min(window.devicePixelRatio, 2))) {
      resizeCanvas();
    }
  }

  // Update animations and states
  updateSeasonTime(dt);
  updateAnimals3D(dt);
  updateWeatherParticles3D(dt);
  update3DParticles(dt);
  updateTruck3D(dt);
  updateWaterDrops3D(dt);
  updateFarmerHelper3D(dt);
  
  // Update quests
  updateQuests(dt);

  if (controls) controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
  
  animationFrameId = requestAnimationFrame(gameLoop);
}

function build3DWorld() {
  // Ground
  const groundGeo = new THREE.BoxGeometry(80, 2, 80);
  const groundMat = new THREE.MeshLambertMaterial({ color: 0x66bb6a });
  groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.position.y = -1.0;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Dirt Path / Road (Z: 25)
  const roadGeo = new THREE.BoxGeometry(80, 0.1, 8);
  const roadMat = new THREE.MeshLambertMaterial({ color: 0x78909c });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.set(0, 0.05, 25);
  road.receiveShadow = true;
  scene.add(road);

  // Farmhouse (X: -18, Z: -18)
  const houseGroup = new THREE.Group();
  houseGroup.position.set(-18, 0, -18);
  
  const houseBody = new THREE.Mesh(new THREE.BoxGeometry(7, 5, 7), new THREE.MeshLambertMaterial({ color: 0xffecb3 }));
  houseBody.position.y = 2.5;
  houseBody.castShadow = true;
  houseBody.receiveShadow = true;
  houseGroup.add(houseBody);

  const houseRoof = new THREE.Mesh(new THREE.ConeGeometry(5.8, 3.5, 4), new THREE.MeshLambertMaterial({ color: 0xd84315 }));
  houseRoof.position.y = 5.0 + 1.75;
  houseRoof.rotation.y = Math.PI / 4;
  houseRoof.castShadow = true;
  houseGroup.add(houseRoof);

  const door = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.5, 0.1), new THREE.MeshLambertMaterial({ color: 0x5d4037 }));
  door.position.set(0, 1.25, 3.51);
  houseGroup.add(door);

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.5, 0.8), new THREE.MeshLambertMaterial({ color: 0x78909c }));
  chimney.position.set(2.0, 5.0, -2.0);
  chimney.castShadow = true;
  houseGroup.add(chimney);

  scene.add(houseGroup);

  // Red Barn (X: 0, Z: -22)
  const barnGroup = new THREE.Group();
  barnGroup.position.set(0, 0, -22);

  const barnBody = new THREE.Mesh(new THREE.BoxGeometry(11, 7, 8), new THREE.MeshLambertMaterial({ color: 0xd32f2f }));
  barnBody.position.y = 3.5;
  barnBody.castShadow = true;
  barnBody.receiveShadow = true;
  barnGroup.add(barnBody);

  const roofGroup = new THREE.Group();
  roofGroup.position.y = 7.0;
  const roofL = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.5, 9.0), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  roofL.position.set(-2.5, 1.8, 0);
  roofL.rotation.z = -0.6;
  roofL.castShadow = true;
  roofGroup.add(roofL);

  const roofR = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.5, 9.0), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  roofR.position.set(2.5, 1.8, 0);
  roofR.rotation.z = 0.6;
  roofR.castShadow = true;
  roofGroup.add(roofR);
  barnGroup.add(roofGroup);

  const barnDoor = new THREE.Mesh(new THREE.BoxGeometry(3, 4, 0.1), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  barnDoor.position.set(0, 2.0, 4.01);
  barnGroup.add(barnDoor);

  scene.add(barnGroup);

  // Silo (X: 18, Z: -18)
  const siloGroup = new THREE.Group();
  siloGroup.position.set(18, 0, -18);

  const siloBody = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 10, 16), new THREE.MeshLambertMaterial({ color: 0xb0bec5 }));
  siloBody.position.y = 5.0;
  siloBody.castShadow = true;
  siloBody.receiveShadow = true;
  siloGroup.add(siloBody);

  const siloDome = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x78909c }));
  siloDome.position.y = 10.0;
  siloDome.castShadow = true;
  siloGroup.add(siloDome);

  scene.add(siloGroup);

  // Roadside Shop Counter (X: 16, Z: 18)
  const shopGroup = new THREE.Group();
  shopGroup.position.set(16, 0, 18);
  
  const counter = new THREE.Mesh(new THREE.BoxGeometry(5, 2.2, 2.5), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
  counter.position.y = 1.1;
  counter.castShadow = true;
  shopGroup.add(counter);

  const awning = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.4, 3.2), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  awning.position.set(0, 3.8, 0.8);
  awning.rotation.x = 0.25;
  awning.castShadow = true;
  shopGroup.add(awning);

  const strip1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 3.3), new THREE.MeshLambertMaterial({ color: 0xe53935 }));
  strip1.position.set(-1.6, 3.8, 0.8);
  strip1.rotation.x = 0.25;
  shopGroup.add(strip1);

  const strip2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 3.3), new THREE.MeshLambertMaterial({ color: 0xe53935 }));
  strip2.position.set(1.6, 3.8, 0.8);
  strip2.rotation.x = 0.25;
  shopGroup.add(strip2);

  const poleL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.8), new THREE.MeshLambertMaterial({ color: 0xd7ccc8 }));
  poleL.position.set(-2.4, 1.9, 1.8);
  shopGroup.add(poleL);

  const poleR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.8), new THREE.MeshLambertMaterial({ color: 0xd7ccc8 }));
  poleR.position.set(2.4, 1.9, 1.8);
  shopGroup.add(poleR);

  scene.add(shopGroup);

  // Delivery Notice Board (X: 9, Z: 19)
  const boardGroup = new THREE.Group();
  boardGroup.position.set(9, 0, 19);

  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3), new THREE.MeshLambertMaterial({ color: 0x5d4037 }));
  post.position.y = 1.5;
  post.castShadow = true;
  boardGroup.add(post);

  const panel = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.8, 0.25), new THREE.MeshLambertMaterial({ color: 0x8d6e63 }));
  panel.position.y = 2.4;
  panel.castShadow = true;
  boardGroup.add(panel);

  const paper = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 0.05), new THREE.MeshLambertMaterial({ color: 0xfffdf5 }));
  paper.position.set(0, 2.4, 0.13);
  boardGroup.add(paper);

  scene.add(boardGroup);

  // Delivery Truck (Z: 25, default X: -3)
  truck3DMesh = new THREE.Group();
  truck3DMesh.position.set(-3, 0, 25);
  
  const cab = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.0, 2.2), new THREE.MeshLambertMaterial({ color: 0x1e88e5 }));
  cab.position.set(1.25, 1.4, 0);
  cab.castShadow = true;
  truck3DMesh.add(cab);

  const bed = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.8, 2.2), new THREE.MeshLambertMaterial({ color: 0xf5f5f5 }));
  bed.position.set(-1.5, 1.3, 0);
  bed.castShadow = true;
  truck3DMesh.add(bed);

  const wheelGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 12);
  wheelGeo.rotateX(Math.PI / 2);
  const wheelMat = new THREE.MeshLambertMaterial({ color: 0x212121 });

  const w1 = new THREE.Mesh(wheelGeo, wheelMat); w1.position.set(-1.8, 0.6, 1.15); w1.castShadow = true; truck3DMesh.add(w1);
  const w2 = new THREE.Mesh(wheelGeo, wheelMat); w2.position.set(-1.8, 0.6, -1.15); w2.castShadow = true; truck3DMesh.add(w2);
  const w3 = new THREE.Mesh(wheelGeo, wheelMat); w3.position.set(1.0, 0.6, 1.15); w3.castShadow = true; truck3DMesh.add(w3);
  const w4 = new THREE.Mesh(wheelGeo, wheelMat); w4.position.set(1.0, 0.6, -1.15); w4.castShadow = true; truck3DMesh.add(w4);

  scene.add(truck3DMesh);

  // White Pasture Fences around the animal pen (X: -24 to -5, Z: 0 to 25)
  buildPastureFenceLine(-24, 0, -24, 24, 12, true);
  buildPastureFenceLine(-24, 24, -5, 24, 10, false);
  buildPastureFenceLine(-5, 24, -5, 0, 10, true);
  buildPastureFenceLine(-24, 0, -5, 0, 10, false);

  // Pond (X: -18, Z: 10)
  const pond = new THREE.Mesh(new THREE.RingGeometry(0, 5, 20), new THREE.MeshBasicMaterial({ color: 0x0288d1, side: THREE.DoubleSide }));
  pond.rotation.x = -Math.PI / 2;
  pond.position.set(-18, 0.02, 10);
  scene.add(pond);

  // Decor Trees
  build3DTree(-28, -25);
  build3DTree(-30, -10);
  build3DTree(28, -25);
  build3DTree(26, -5);
  build3DTree(-10, -28);
  build3DTree(10, -28);
  build3DTree(30, 10);
  build3DTree(28, 25);
  build3DTree(-10, 28);
  initFarmerHelper3D();
}

function build3DTree(tx, tz) {
  const tree = new THREE.Group();
  tree.position.set(tx, 0, tz);

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 3.5, 8), new THREE.MeshLambertMaterial({ color: 0x5d4037 }));
  trunk.position.y = 1.75;
  trunk.castShadow = true;
  tree.add(trunk);

  const leaves1 = new THREE.Mesh(new THREE.ConeGeometry(2.5, 3, 6), new THREE.MeshLambertMaterial({ color: 0x388e3c }));
  leaves1.position.y = 4.0;
  leaves1.castShadow = true;
  tree.add(leaves1);

  const leaves2 = new THREE.Mesh(new THREE.ConeGeometry(2.0, 2.5, 6), new THREE.MeshLambertMaterial({ color: 0x4caf50 }));
  leaves2.position.y = 5.25;
  leaves2.castShadow = true;
  tree.add(leaves2);

  const leaves3 = new THREE.Mesh(new THREE.ConeGeometry(1.4, 2, 6), new THREE.MeshLambertMaterial({ color: 0x81c784 }));
  leaves3.position.y = 6.25;
  leaves3.castShadow = true;
  tree.add(leaves3);

  scene.add(tree);
}

function buildPastureFenceLine(x1, z1, x2, z2, segments, isVertical) {
  const group = new THREE.Group();
  const start = isVertical ? z1 : x1;
  const end = isVertical ? z2 : x2;
  const length = Math.abs(end - start);
  const step = length / segments;

  for (let i = 0; i <= segments; i++) {
    const coord = start + i * step;
    const px = isVertical ? x1 : coord;
    const pz = isVertical ? coord : z1;

    const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.2, 0.3), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    post.position.set(px, 1.1, pz);
    post.castShadow = true;
    group.add(post);

    if (i < segments) {
      const nextCoord = start + (i + 1) * step;
      const midCoord = (coord + nextCoord) / 2;
      const barX = isVertical ? x1 : midCoord;
      const barZ = isVertical ? midCoord : z1;

      const barW = isVertical ? 0.15 : step;
      const barD = isVertical ? step : 0.15;

      const barUpper = new THREE.Mesh(new THREE.BoxGeometry(barW, 0.2, barD), new THREE.MeshLambertMaterial({ color: 0xffffff }));
      barUpper.position.set(barX, 1.5, barZ);
      barUpper.castShadow = true;
      group.add(barUpper);

      const barLower = new THREE.Mesh(new THREE.BoxGeometry(barW, 0.2, barD), new THREE.MeshLambertMaterial({ color: 0xffffff }));
      barLower.position.set(barX, 0.8, barZ);
      barLower.castShadow = true;
      group.add(barLower);
    }
  }
  scene.add(group);
}

function initFarmerHelper3D() {
  if (!scene) return;
  
  if (farmerHelper3D.mesh) {
    scene.remove(farmerHelper3D.mesh);
    farmerHelper3D.mesh = null;
  }
  
  if (farmerHelper3D.activeEmojiSprite) {
    scene.remove(farmerHelper3D.activeEmojiSprite);
    farmerHelper3D.activeEmojiSprite = null;
  }

  const farmerGroup = new THREE.Group();
  farmerGroup.position.set(-10, 0, -10);
  
  const skinMat = new THREE.MeshLambertMaterial({ color: 0xffd54f });
  const shirtMat = new THREE.MeshLambertMaterial({ color: 0x1e88e5 });
  const pantsMat = new THREE.MeshLambertMaterial({ color: 0x5e35b1 });
  const bootsMat = new THREE.MeshLambertMaterial({ color: 0x3e2723 });
  const hatMat = new THREE.MeshLambertMaterial({ color: 0xffb74d });

  const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.35), bootsMat);
  lLeg.name = "lLeg";
  lLeg.position.set(0.22, 0.35, 0);
  lLeg.castShadow = true;
  farmerGroup.add(lLeg);

  const rLeg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.35), bootsMat);
  rLeg.name = "rLeg";
  rLeg.position.set(-0.22, 0.35, 0);
  rLeg.castShadow = true;
  farmerGroup.add(rLeg);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.6), shirtMat);
  body.name = "body";
  body.position.set(0, 1.25, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  farmerGroup.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), skinMat);
  head.name = "head";
  head.position.set(0, 2.15, 0);
  head.castShadow = true;
  farmerGroup.add(head);

  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.08, 8), hatMat);
  brim.position.set(0, 2.52, 0);
  brim.castShadow = true;
  farmerGroup.add(brim);

  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.35, 8), hatMat);
  crown.position.set(0, 2.72, 0);
  crown.castShadow = true;
  farmerGroup.add(crown);

  const lArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.8, 0.24), skinMat);
  lArm.name = "lArm";
  lArm.position.set(0.58, 1.35, 0);
  lArm.castShadow = true;
  farmerGroup.add(lArm);

  const rArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.8, 0.24), skinMat);
  rArm.name = "rArm";
  rArm.position.set(-0.58, 1.35, 0);
  rArm.castShadow = true;
  farmerGroup.add(rArm);

  scene.add(farmerGroup);

  farmerHelper3D.mesh = farmerGroup;
  farmerHelper3D.state = 'idle';
  farmerHelper3D.targetPos = new THREE.Vector3(-10, 0, -10);
  farmerHelper3D.wanderTimer = 0;
  farmerHelper3D.animTime = 0;
  farmerHelper3D.emojiTimer = 0;
  farmerHelper3D.activeEmojiSprite = null;
  farmerHelper3D.currentTask = null;
  farmerHelper3D.workTimer = 0;
}

function showFarmerEmoji(emojiChar) {
  if (!scene || !farmerHelper3D.mesh) return;
  
  if (farmerHelper3D.activeEmojiSprite) {
    scene.remove(farmerHelper3D.activeEmojiSprite);
    farmerHelper3D.activeEmojiSprite = null;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emojiChar, 32, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  
  sprite.position.copy(farmerHelper3D.mesh.position);
  sprite.position.y += 3.8;
  sprite.scale.set(2.0, 2.0, 1.0);
  
  scene.add(sprite);
  farmerHelper3D.activeEmojiSprite = sprite;
  farmerHelper3D.emojiTimer = 1.8;
}

function updateEmojiSprite(dt) {
  if (!farmerHelper3D.activeEmojiSprite) return;
  
  const sprite = farmerHelper3D.activeEmojiSprite;
  farmerHelper3D.emojiTimer -= dt;
  
  sprite.position.x = farmerHelper3D.mesh.position.x;
  sprite.position.z = farmerHelper3D.mesh.position.z;
  sprite.position.y += dt * 1.0;
  
  if (farmerHelper3D.emojiTimer <= 0) {
    scene.remove(sprite);
    farmerHelper3D.activeEmojiSprite = null;
  } else {
    sprite.material.opacity = Math.max(0, farmerHelper3D.emojiTimer / 1.8);
  }
}

function spawnWaterEffectParticles(worldPos) {
  if (!scene) return;
  const count = 3;
  for (let i = 0; i < count; i++) {
    const geom = new THREE.SphereGeometry(0.15, 4, 4);
    const mat = new THREE.MeshLambertMaterial({ color: 0x00bcd4 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(worldPos);
    mesh.position.y += 0.8;
    
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 4,
      Math.random() * 5 + 3,
      (Math.random() - 0.5) * 4
    );
    
    scene.add(mesh);
    active3DParticles.push({
      mesh: mesh,
      velocity: velocity,
      life: 0.6
    });
  }
}

function spawnStarEffectParticles(worldPos) {
  if (!scene) return;
  const count = 8;
  for (let i = 0; i < count; i++) {
    const geom = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const mat = new THREE.MeshLambertMaterial({ color: 0xffd700 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(worldPos);
    mesh.position.y += 0.8;
    
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 6,
      Math.random() * 6 + 4,
      (Math.random() - 0.5) * 6
    );
    
    scene.add(mesh);
    active3DParticles.push({
      mesh: mesh,
      velocity: velocity,
      life: 0.8
    });
  }
}

function updateFarmerHelper3D(dt) {
  if (!scene || !state || !farmerHelper3D.mesh) return;

  const farmer = farmerHelper3D;
  const mesh = farmer.mesh;
  
  farmer.animTime += dt;
  updateEmojiSprite(dt);

  // 1. Idle Scanning State
  if (farmer.state === 'idle') {
    farmer.workTimer += dt;
    
    let targetTask = null;
    
    // Scan for dry plots (Priority 1)
    for (let i = 0; i < state.plots.length; i++) {
      const plot = state.plots[i];
      if (!plot.isLocked && plot.state === 'growing' && !plot.isWatered) {
        const row = Math.floor(plot.id / 3);
        const col = plot.id % 3;
        const pX = -6 + col * 7.5;
        const pZ = -2 + row * 7.5;
        targetTask = { type: 'water', targetId: plot.id, pos: new THREE.Vector3(pX, 0, pZ) };
        break;
      }
    }
    
    // Scan for ready plots (Priority 2)
    if (!targetTask) {
      for (let i = 0; i < state.plots.length; i++) {
        const plot = state.plots[i];
        if (!plot.isLocked && plot.state === 'ready') {
          const row = Math.floor(plot.id / 3);
          const col = plot.id % 3;
          const pX = -6 + col * 7.5;
          const pZ = -2 + row * 7.5;
          targetTask = { type: 'harvest', targetId: plot.id, pos: new THREE.Vector3(pX, 0, pZ) };
          break;
        }
      }
    }
    
    // Visit Animals in pen (Priority 3)
    if (!targetTask && farmer.workTimer > 8.0 && active3DAnimals.length > 0) {
      const randAnim = active3DAnimals[Math.floor(Math.random() * active3DAnimals.length)];
      if (randAnim) {
        targetTask = { type: 'feed', targetId: randAnim.instanceId, pos: randAnim.mesh.position.clone(), animalRef: randAnim };
      }
    }
    
    if (targetTask) {
      farmer.currentTask = targetTask;
      farmer.state = 'walking';
      farmer.targetPos.copy(targetTask.pos);
      if (targetTask.type === 'water' || targetTask.type === 'harvest') {
        farmer.targetPos.z += 2.2;
      } else {
        farmer.targetPos.x += 1.0;
      }
      showFarmerEmoji('💡');
    } else {
      // Idle Wandering
      farmer.wanderTimer += dt;
      if (farmer.wanderTimer > 6.0) {
        farmer.wanderTimer = 0;
        const wX = -12 + (Math.random() - 0.5) * 10;
        const wZ = -12 + (Math.random() - 0.5) * 10;
        farmer.state = 'walking';
        farmer.targetPos.set(wX, 0, wZ);
        if (Math.random() > 0.6) {
          showFarmerEmoji('🎵');
        }
      }
      
      // Stand idle breathing
      const body = mesh.getObjectByName('body');
      if (body) {
        body.scale.y = 1.0 + Math.sin(farmer.animTime * 3) * 0.02;
        body.rotation.x = 0;
      }
      const lLeg = mesh.getObjectByName('lLeg');
      const rLeg = mesh.getObjectByName('rLeg');
      const lArm = mesh.getObjectByName('lArm');
      const rArm = mesh.getObjectByName('rArm');
      if (lLeg) lLeg.rotation.x = 0;
      if (rLeg) rLeg.rotation.x = 0;
      if (lArm) lArm.rotation.x = 0;
      if (rArm) rArm.rotation.x = 0;
      mesh.position.y = 0;
    }
  }

  // 2. Walking State
  if (farmer.state === 'walking') {
    farmer.workTimer = 0;
    const currentPos = mesh.position.clone();
    const distance = currentPos.distanceTo(farmer.targetPos);
    
    if (distance > 0.5) {
      const speed = 5.0;
      const dir = farmer.targetPos.clone().sub(currentPos).normalize();
      
      mesh.position.addScaledVector(dir, speed * dt);
      
      const angle = Math.atan2(dir.x, dir.z);
      mesh.rotation.y = angle;

      const swingSpeed = 12.0;
      const swing = Math.sin(farmer.animTime * swingSpeed) * 0.5;
      const lLeg = mesh.getObjectByName('lLeg');
      const rLeg = mesh.getObjectByName('rLeg');
      const lArm = mesh.getObjectByName('lArm');
      const rArm = mesh.getObjectByName('rArm');
      if (lLeg) lLeg.rotation.x = swing;
      if (rLeg) rLeg.rotation.x = -swing;
      if (lArm) lArm.rotation.x = -swing;
      if (rArm) rArm.rotation.x = swing;
      
      mesh.position.y = Math.abs(Math.sin(farmer.animTime * swingSpeed)) * 0.15;
    } else {
      if (farmer.currentTask) {
        farmer.state = 'working';
        farmer.workTimer = 0;
      } else {
        farmer.state = 'idle';
        mesh.position.y = 0;
      }
    }
  }

  // 3. Working State
  if (farmer.state === 'working') {
    farmer.workTimer += dt;
    
    const body = mesh.getObjectByName('body');
    const lArm = mesh.getObjectByName('lArm');
    const rArm = mesh.getObjectByName('rArm');
    if (body) body.rotation.x = 0.35;
    if (lArm) { lArm.rotation.x = 1.2; lArm.rotation.z = Math.sin(farmer.animTime * 20) * 0.15; }
    if (rArm) { rArm.rotation.x = 1.2; rArm.rotation.z = -Math.sin(farmer.animTime * 20) * 0.15; }
    
    if (farmer.currentTask) {
      const dir = farmer.currentTask.pos.clone().sub(mesh.position).normalize();
      mesh.rotation.y = Math.atan2(dir.x, dir.z);
    }
    
    if (farmer.currentTask && farmer.currentTask.type === 'water' && Math.random() > 0.7) {
      spawnWaterEffectParticles(farmer.currentTask.pos);
    }

    if (farmer.workTimer > 1.8) {
      const task = farmer.currentTask;
      if (task.type === 'water') {
        const plot = state.plots[task.targetId];
        if (plot && plot.state === 'growing' && !plot.isWatered) {
          plot.isWatered = true;
          plot.progress = Math.min(plot.progress + 40, 100);
          usersDB[currentUser] = state;
          saveUsersDB();
          renderAll();
          AudioEngine.playSFX('water');
          showFarmerEmoji('🌱');
        }
      } else if (task.type === 'harvest') {
        const plot = state.plots[task.targetId];
        if (plot && plot.state === 'ready') {
          const cropKey = plot.cropType;
          const crop = cropMeta[cropKey];
          state.harvestStock[cropKey]++;
          plot.state = 'empty';
          plot.cropType = null;
          plot.progress = 0;
          plot.isWatered = false;
          addXp(crop.xpReward);
          usersDB[currentUser] = state;
          saveUsersDB();
          renderAll();
          AudioEngine.playSFX('harvest');
          showFarmerEmoji('🎉');
          spawnStarEffectParticles(task.pos);
        }
      } else if (task.type === 'feed') {
        if (task.animalRef) {
          task.animalRef.jumpTimer = 0.5;
        }
        showFarmerEmoji('❤️');
        spawnStarEffectParticles(task.pos);
        AudioEngine.playSFX('correct');
      }
      
      farmer.currentTask = null;
      farmer.state = 'idle';
      farmer.workTimer = 0;
      mesh.position.y = 0;
    }
  }
}

function renderPlots3D() {
  if (!scene || !state) return;

  active3DPlots.forEach(p => {
    scene.remove(p.group);
  });
  active3DPlots = [];

  const startX = -6;
  const startZ = -2;
  const spacing = 7.5;

  state.plots.forEach(plot => {
    const row = Math.floor(plot.id / 3);
    const col = plot.id % 3;

    const plotX = startX + col * spacing;
    const plotZ = startZ + row * spacing;

    const plotGroup = new THREE.Group();
    plotGroup.position.set(plotX, 0, plotZ);

    let soilColor = 0x8d6e63;
    if (plot.state === 'growing' && plot.isWatered) soilColor = 0x4e3015;
    else if (plot.state === 'ready') soilColor = 0x5d4037;
    if (plot.isLocked) soilColor = 0x9e9e9e;

    const soilGeo = new THREE.BoxGeometry(5.2, 0.5, 5.2);
    const soilMat = new THREE.MeshLambertMaterial({ color: soilColor });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.25;
    soil.receiveShadow = true;
    soil.userData = { type: 'plot', plotId: plot.id };
    plotGroup.add(soil);

    const borderMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.6, 0.25), borderMat); b1.position.set(0, 0.3, 2.7); b1.castShadow = true; plotGroup.add(b1);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.6, 0.25), borderMat); b2.position.set(0, 0.3, -2.7); b2.castShadow = true; plotGroup.add(b2);
    const b3 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.6, 5.6), borderMat); b3.position.set(2.7, 0.3, 0); b3.castShadow = true; plotGroup.add(b3);
    const b4 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.6, 5.6), borderMat); b4.position.set(-2.7, 0.3, 0); b4.castShadow = true; plotGroup.add(b4);

    const postGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.9, 8);
    const capGeo = new THREE.SphereGeometry(0.25, 8, 8);
    const capMat = new THREE.MeshLambertMaterial({ color: 0xff4081 });

    const createCornerPost = (cx, cz) => {
      const p = new THREE.Mesh(postGeo, borderMat);
      p.position.set(cx, 0.45, cz);
      p.castShadow = true;
      plotGroup.add(p);
      const c = new THREE.Mesh(capGeo, capMat);
      c.position.set(cx, 0.9, cz);
      c.castShadow = true;
      plotGroup.add(c);
    };

    createCornerPost(2.7, 2.7);
    createCornerPost(-2.7, 2.7);
    createCornerPost(2.7, -2.7);
    createCornerPost(-2.7, -2.7);

    if (plot.isLocked) {
      const chainGeo = new THREE.BoxGeometry(3, 0.15, 3);
      const chainMat = new THREE.MeshLambertMaterial({ color: 0x37474f });
      const chain = new THREE.Mesh(chainGeo, chainMat);
      chain.position.y = 0.6;
      plotGroup.add(chain);

      const lockBox = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.6), new THREE.MeshLambertMaterial({ color: 0xffd54f }));
      lockBox.position.set(0, 1.0, 0);
      lockBox.castShadow = true;
      lockBox.userData = { type: 'plot', plotId: plot.id };
      plotGroup.add(lockBox);
      
      const lockArch = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.5, 8, 1, 0, Math.PI), new THREE.MeshLambertMaterial({ color: 0x78909c }));
      lockArch.position.set(0, 1.5, 0);
      plotGroup.add(lockArch);
    }

    let cropMesh = null;
    if (plot.state === 'growing' || plot.state === 'ready') {
      const cropGroup = new THREE.Group();
      cropGroup.position.set(0, 0.5, 0);

      const sizeScale = plot.state === 'ready' ? 1.0 : (0.2 + 0.8 * (plot.progress / 100));

      if (plot.cropType === 'carrot') {
        const carrotGeo = new THREE.ConeGeometry(0.5 * sizeScale, 1.8 * sizeScale, 8);
        carrotGeo.rotateX(Math.PI);
        const carrotMat = new THREE.MeshLambertMaterial({ color: 0xff9800 });
        const c1 = new THREE.Mesh(carrotGeo, carrotMat);
        c1.position.y = 0.2 * sizeScale;
        c1.castShadow = true;
        cropGroup.add(c1);

        const leafGeo = new THREE.CylinderGeometry(0.08 * sizeScale, 0.08 * sizeScale, 1.2 * sizeScale, 6);
        const leafMat = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
        for (let i = 0; i < 3; i++) {
          const l = new THREE.Mesh(leafGeo, leafMat);
          l.position.set((Math.random() - 0.5) * 0.4, 1.3 * sizeScale, (Math.random() - 0.5) * 0.4);
          l.rotation.z = (Math.random() - 0.5) * 0.5;
          l.rotation.x = (Math.random() - 0.5) * 0.5;
          cropGroup.add(l);
        }
      } else if (plot.cropType === 'tomato') {
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 2.5 * sizeScale, 8), new THREE.MeshLambertMaterial({ color: 0x2e7d32 }));
        stalk.position.y = 1.25 * sizeScale;
        stalk.castShadow = true;
        cropGroup.add(stalk);

        if (plot.state === 'ready' || plot.progress > 50) {
          const tomGeo = new THREE.SphereGeometry(0.48 * sizeScale, 8, 8);
          const tomMat = new THREE.MeshLambertMaterial({ color: 0xe53935 });
          
          const t1 = new THREE.Mesh(tomGeo, tomMat); t1.position.set(-0.6 * sizeScale, 1.5 * sizeScale, 0.3 * sizeScale); t1.castShadow = true; cropGroup.add(t1);
          const t2 = new THREE.Mesh(tomGeo, tomMat); t2.position.set(0.6 * sizeScale, 1.0 * sizeScale, -0.3 * sizeScale); t2.castShadow = true; cropGroup.add(t2);
          const t3 = new THREE.Mesh(tomGeo, tomMat); t3.position.set(0.2 * sizeScale, 2.0 * sizeScale, 0.5 * sizeScale); t3.castShadow = true; cropGroup.add(t3);
        }
      } else if (plot.cropType === 'corn') {
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.25 * sizeScale, 0.35 * sizeScale, 4.0 * sizeScale, 8), new THREE.MeshLambertMaterial({ color: 0x4caf50 }));
        stalk.position.y = 2.0 * sizeScale;
        stalk.castShadow = true;
        cropGroup.add(stalk);

        if (plot.state === 'ready' || plot.progress > 50) {
          const earGeo = new THREE.CylinderGeometry(0.3 * sizeScale, 0.38 * sizeScale, 1.8 * sizeScale, 8);
          const earMat = new THREE.MeshLambertMaterial({ color: 0xffeb3b });
          const ear = new THREE.Mesh(earGeo, earMat);
          ear.position.set(0.2 * sizeScale, 2.4 * sizeScale, 0);
          ear.rotation.z = -0.3;
          ear.castShadow = true;
          cropGroup.add(ear);

          const leafGeo = new THREE.BoxGeometry(0.1, 2.0 * sizeScale, 0.8 * sizeScale);
          const leafL = new THREE.Mesh(leafGeo, new THREE.MeshLambertMaterial({ color: 0x2e7d32 }));
          leafL.position.set(-0.3 * sizeScale, 2.0 * sizeScale, 0);
          leafL.rotation.z = 0.4;
          cropGroup.add(leafL);
        }
      } else if (plot.cropType === 'pumpkin') {
        const pumpkinGeo = new THREE.SphereGeometry(1.2 * sizeScale, 8, 8);
        pumpkinGeo.scale(1.0, 0.75, 1.0);
        const pumpkinMat = new THREE.MeshLambertMaterial({ color: 0xff9800 });
        const pump = new THREE.Mesh(pumpkinGeo, pumpkinMat);
        pump.position.y = 0.6 * sizeScale;
        pump.castShadow = true;
        cropGroup.add(pump);

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.6), new THREE.MeshLambertMaterial({ color: 0x5d4037 }));
        stem.position.set(0, 1.1 * sizeScale, 0);
        cropGroup.add(stem);
      }

      cropGroup.traverse(child => {
        if (child.isMesh) {
          child.userData = { type: 'plot', plotId: plot.id };
        }
      });

      plotGroup.add(cropGroup);
      cropMesh = cropGroup;
    }

    let waterDropMesh = null;
    if (plot.state === 'growing' && !plot.isWatered) {
      const dropGeo = new THREE.ConeGeometry(0.38, 0.9, 6);
      const dropMat = new THREE.MeshLambertMaterial({ color: 0x00bcd4, transparent: true, opacity: 0.85 });
      const drop = new THREE.Mesh(dropGeo, dropMat);
      
      const invDrop = new THREE.Mesh(dropGeo, dropMat);
      invDrop.rotation.x = Math.PI;
      invDrop.position.y = -0.3;
      
      const doubleCone = new THREE.Group();
      doubleCone.add(drop);
      doubleCone.add(invDrop);
      
      doubleCone.position.set(0, 3.2, 0);
      doubleCone.traverse(child => {
        if (child.isMesh) child.userData = { type: 'plot', plotId: plot.id };
      });
      plotGroup.add(doubleCone);
      waterDropMesh = doubleCone;
    }

    scene.add(plotGroup);
    active3DPlots.push({
      id: plot.id,
      group: plotGroup,
      waterDrop: waterDropMesh,
      crop: cropMesh
    });
  });
}

function updateWaterDrops3D(dt) {
  const time = performance.now() / 1000;
  active3DPlots.forEach(p => {
    if (p.waterDrop) {
      p.waterDrop.rotation.y = time * 2;
      p.waterDrop.position.y = 3.2 + Math.sin(time * 6) * 0.25;
    }
  });
}

function sync3DAnimals() {
  if (!scene || !state) return;

  // Create a map of active instances in the state
  const activeInstances = {};
  Object.keys(state.animals).forEach(animalKey => {
    const animal = state.animals[animalKey];
    if (!animal.instances) animal.instances = [];
    animal.instances.forEach(inst => {
      activeInstances[inst.id] = inst;
    });
  });

  // Remove 3D models that are no longer in the active instances list (e.g. retired)
  for (let i = active3DAnimals.length - 1; i >= 0; i--) {
    const a3d = active3DAnimals[i];
    if (!activeInstances[a3d.instanceId]) {
      scene.remove(a3d.mesh);
      active3DAnimals.splice(i, 1);
    }
  }

  // Add 3D models for new instances, or update scales/colors of existing ones
  Object.keys(state.animals).forEach(animalKey => {
    const animal = state.animals[animalKey];
    animal.instances.forEach(inst => {
      let a3d = active3DAnimals.find(a => a.instanceId === inst.id);
      if (!a3d) {
        a3d = spawn3DAnimal(animalKey, inst.id);
      }
      
      // Update scale based on age: 0 = Baby (0.5), 1-4 = Adult (1.0), 5 = Elder (0.85)
      let scaleValue = 1.0;
      if (inst.age === 0) {
        scaleValue = 0.5; // Baby
      } else if (inst.age === 5) {
        scaleValue = 0.85; // Elder
      }
      a3d.mesh.scale.set(scaleValue, scaleValue, scaleValue);
      
      // Visual feedback for Elder animals (golden emissive glow)
      a3d.mesh.traverse(child => {
        if (child.isMesh && child.material) {
          if (inst.age === 5) {
            if (child.material.emissive) {
              child.material.emissive.setHex(0x332200); // Elder golden tint
            }
          } else {
            if (child.material.emissive) {
              child.material.emissive.setHex(0x000000);
            }
          }
        }
      });
    });
  });
}

function spawn3DAnimal(type, instanceId) {
  const animalGroup = new THREE.Group();
  
  const startX = pastureBounds.minX + Math.random() * (pastureBounds.maxX - pastureBounds.minX);
  const startZ = pastureBounds.minZ + Math.random() * (pastureBounds.maxZ - pastureBounds.minZ);
  animalGroup.position.set(startX, 0, startZ);

  if (type === 'chicken') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 1.2), new THREE.MeshLambertMaterial({ color: 0xffeb3b }));
    body.position.y = 0.95;
    body.castShadow = true;
    animalGroup.add(body);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 0.6), new THREE.MeshLambertMaterial({ color: 0xffeb3b }));
    head.position.set(0, 1.45, 0.45);
    head.castShadow = true;
    animalGroup.add(head);

    const comb = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.4), new THREE.MeshLambertMaterial({ color: 0xe53935 }));
    comb.position.set(0, 1.9, 0.4);
    animalGroup.add(comb);

    const beak = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.3), new THREE.MeshLambertMaterial({ color: 0xff9800 }));
    beak.position.set(0, 1.4, 0.8);
    animalGroup.add(beak);
  } else if (type === 'cow') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.9, 3.4), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    body.position.y = 1.95;
    body.castShadow = true;
    body.receiveShadow = true;
    animalGroup.add(body);

    const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.1), new THREE.MeshLambertMaterial({ color: 0x212121 })); s1.position.set(1.11, 2.2, 0.4); animalGroup.add(s1);
    const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.1), new THREE.MeshLambertMaterial({ color: 0x212121 })); s2.position.set(-1.11, 1.8, -0.6); animalGroup.add(s2);
    const s3 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.MeshLambertMaterial({ color: 0x212121 })); s3.position.set(0, 2.91, -0.8); animalGroup.add(s3);

    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.4), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    head.position.set(0, 2.9, 1.9);
    head.castShadow = true;
    animalGroup.add(head);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.6, 0.5), new THREE.MeshLambertMaterial({ color: 0xf8bbd0 }));
    snout.position.set(0, 2.6, 2.65);
    animalGroup.add(snout);

    const legGeo = new THREE.BoxGeometry(0.5, 1.2, 0.5);
    const legMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const l1 = new THREE.Mesh(legGeo, legMat); l1.position.set(0.85, 0.6, 1.2); l1.castShadow = true; animalGroup.add(l1);
    const l2 = new THREE.Mesh(legGeo, legMat); l2.position.set(-0.85, 0.6, 1.2); l2.castShadow = true; animalGroup.add(l2);
    const l3 = new THREE.Mesh(legGeo, legMat); l3.position.set(0.85, 0.6, -1.2); l3.castShadow = true; animalGroup.add(l3);
    const l4 = new THREE.Mesh(legGeo, legMat); l4.position.set(-0.85, 0.6, -1.2); l4.castShadow = true; animalGroup.add(l4);
  } else if (type === 'pig') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 2.5), new THREE.MeshLambertMaterial({ color: 0xf48fb1 }));
    body.position.y = 1.3;
    body.castShadow = true;
    body.receiveShadow = true;
    animalGroup.add(body);

    const head = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 1.1), new THREE.MeshLambertMaterial({ color: 0xf48fb1 }));
    head.position.set(0, 1.7, 1.3);
    head.castShadow = true;
    animalGroup.add(head);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.3), new THREE.MeshLambertMaterial({ color: 0xf06292 }));
    snout.position.set(0, 1.5, 1.95);
    animalGroup.add(snout);

    const legGeo = new THREE.BoxGeometry(0.35, 0.7, 0.35);
    const legMat = new THREE.MeshLambertMaterial({ color: 0xf48fb1 });
    const l1 = new THREE.Mesh(legGeo, legMat); l1.position.set(0.65, 0.35, 0.9); l1.castShadow = true; animalGroup.add(l1);
    const l2 = new THREE.Mesh(legGeo, legMat); l2.position.set(-0.65, 0.35, 0.9); l2.castShadow = true; animalGroup.add(l2);
    const l3 = new THREE.Mesh(legGeo, legMat); l3.position.set(0.65, 0.35, -0.9); l3.castShadow = true; animalGroup.add(l3);
    const l4 = new THREE.Mesh(legGeo, legMat); l4.position.set(-0.65, 0.35, -0.9); l4.castShadow = true; animalGroup.add(l4);
  } else if (type === 'sheep') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.6, 2.6), new THREE.MeshLambertMaterial({ color: 0xf5f5f5 }));
    body.position.y = 1.5;
    body.castShadow = true;
    body.receiveShadow = true;
    animalGroup.add(body);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 1.0), new THREE.MeshLambertMaterial({ color: 0x212121 }));
    head.position.set(0, 1.8, 1.4);
    head.castShadow = true;
    animalGroup.add(head);

    const legGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 8);
    const legMat = new THREE.MeshLambertMaterial({ color: 0x212121 });
    const l1 = new THREE.Mesh(legGeo, legMat); l1.position.set(0.65, 0.4, 0.9); l1.castShadow = true; animalGroup.add(l1);
    const l2 = new THREE.Mesh(legGeo, legMat); l2.position.set(-0.65, 0.4, 0.9); l2.castShadow = true; animalGroup.add(l2);
    const l3 = new THREE.Mesh(legGeo, legMat); l3.position.set(0.65, 0.4, -0.9); l3.castShadow = true; animalGroup.add(l3);
    const l4 = new THREE.Mesh(legGeo, legMat); l4.position.set(-0.65, 0.4, -0.9); l4.castShadow = true; animalGroup.add(l4);
  }

  animalGroup.traverse(child => {
    if (child.isMesh) {
      child.userData = { type: 'animal', animalKey: type, instanceId: instanceId };
    }
  });

  scene.add(animalGroup);

  active3DAnimals.push({
    type: type,
    instanceId: instanceId,
    mesh: animalGroup,
    targetX: startX,
    targetZ: startZ,
    speed: 1.5 + Math.random() * 2.0,
    idleTime: 0,
    jumpTimer: 0
  });

  return active3DAnimals[active3DAnimals.length - 1];
}

function updateAnimals3D(dt) {
  const time = performance.now() / 1000;
  
  active3DAnimals.forEach(a => {
    if (a.jumpTimer > 0) {
      a.jumpTimer -= dt;
      const h = Math.sin((a.jumpTimer / 0.5) * Math.PI) * 1.8;
      a.mesh.position.y = h;
    } else {
      a.mesh.position.y = 0;
    }

    if (a.idleTime > 0) {
      a.idleTime -= dt;
      a.mesh.scale.set(1, 1 + Math.sin(time * 4) * 0.02, 1);
    } else {
      const dx = a.targetX - a.mesh.position.x;
      const dz = a.targetZ - a.mesh.position.z;
      const dist = Math.hypot(dx, dz);

      if (dist < 0.3) {
        a.idleTime = 1.0 + Math.random() * 3.0;
        a.mesh.scale.set(1, 1, 1);
        a.targetX = pastureBounds.minX + Math.random() * (pastureBounds.maxX - pastureBounds.minX);
        a.targetZ = pastureBounds.minZ + Math.random() * (pastureBounds.maxZ - pastureBounds.minZ);
      } else {
        const moveAmt = a.speed * dt;
        a.mesh.position.x += (dx / dist) * moveAmt;
        a.mesh.position.z += (dz / dist) * moveAmt;

        const angle = Math.atan2(dx, dz);
        a.mesh.rotation.y = angle;

        a.mesh.position.y = Math.abs(Math.sin(time * 12)) * 0.45;
        a.mesh.rotation.z = Math.sin(time * 12) * 0.08;
      }
    }
  });
}

function updateWeatherParticles3D(dt) {
  if (!scene || !state) return;

  const currentSeason = state.currentSeasonIdx;

  if (!weather3DParticlesGroup) {
    weather3DParticlesGroup = new THREE.Group();
    scene.add(weather3DParticlesGroup);
    spawnWeatherParticlesGroup3D(currentSeason);
  }

  let fallSpeed = 3.5;
  if (currentSeason === 1) fallSpeed = -1.5; // Summer rises
  
  const time = performance.now() / 1000;

  weather3DParticlesGroup.children.forEach(p => {
    p.position.y -= fallSpeed * dt;
    p.position.x += Math.sin(time + p.position.y) * 0.02;

    if (currentSeason === 1) { // rises
      if (p.position.y > 32) {
        p.position.y = 0.5;
        p.position.x = (Math.random() - 0.5) * 70;
        p.position.z = (Math.random() - 0.5) * 70;
      }
    } else { // falls
      if (p.position.y < 0.2) {
        p.position.y = 30;
        p.position.x = (Math.random() - 0.5) * 70;
        p.position.z = (Math.random() - 0.5) * 70;
      }
    }

    if (currentSeason === 0 || currentSeason === 2) {
      p.rotation.x += dt * 2.0;
      p.rotation.y += dt * 1.5;
    }
  });
}

function spawnWeatherParticlesGroup3D(seasonIdx) {
  weather3DParticlesGroup.clear();

  let count = 80;
  let color = 0xffffff;
  let isBox = false;

  if (seasonIdx === 0) { // Spring
    color = 0xf8bbd0;
    isBox = true;
    count = 90;
  } else if (seasonIdx === 1) { // Summer
    color = 0xfff59d;
    count = 50;
  } else if (seasonIdx === 2) { // Autumn
    color = 0xe64a19;
    isBox = true;
    count = 90;
  } else if (seasonIdx === 3) { // Winter
    color = 0xffffff;
    count = 120;
  }

  for (let i = 0; i < count; i++) {
    let pGeo;
    if (isBox) {
      pGeo = new THREE.BoxGeometry(0.35, 0.08, 0.35);
    } else {
      pGeo = new THREE.SphereGeometry(0.18, 5, 5);
    }

    const pMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.7 });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.set(
      (Math.random() - 0.5) * 70,
      Math.random() * 30 + 0.5,
      (Math.random() - 0.5) * 70
    );

    weather3DParticlesGroup.add(pMesh);
  }
}

function rebuildWeatherParticles3D() {
  if (weather3DParticlesGroup) {
    scene.remove(weather3DParticlesGroup);
    weather3DParticlesGroup = null;
  }
}

function spawnWaterParticles(screenX, screenY) {
  AudioEngine.playSFX('water');
  if (!scene || active3DPlots.length === 0) return;
  const activePlot = active3DPlots.find(p => p.id === hoveredPlotId);
  const worldPos = activePlot ? activePlot.group.position.clone() : new THREE.Vector3(0, 0.25, 0);
  
  const count = 15;
  for (let i = 0; i < count; i++) {
    const geom = new THREE.SphereGeometry(0.2, 4, 4);
    const mat = new THREE.MeshLambertMaterial({ color: 0x00bcd4 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(worldPos);
    mesh.position.y += 0.8;

    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 6,
      Math.random() * 7 + 4,
      (Math.random() - 0.5) * 6
    );

    scene.add(mesh);
    active3DParticles.push({
      mesh: mesh,
      velocity: velocity,
      life: 0.8
    });
  }
}

function spawnStarParticles(screenX, screenY) {
  let worldPos = new THREE.Vector3(0, 0.8, 0);
  if (hoveredPlotId !== null && hoveredPlotId !== undefined) {
    const p = active3DPlots.find(pl => pl.id === hoveredPlotId);
    if (p) worldPos.copy(p.group.position);
  } else if (active3DAnimals.length > 0) {
    const active = active3DAnimals.find(a => a.jumpTimer > 0);
    if (active) worldPos.copy(active.mesh.position);
  }

  const count = 12;
  for (let i = 0; i < count; i++) {
    const geom = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const mat = new THREE.MeshLambertMaterial({ color: 0xffd700 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(worldPos);
    mesh.position.y += 0.8;

    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 8,
      Math.random() * 8 + 5,
      (Math.random() - 0.5) * 8
    );

    scene.add(mesh);
    active3DParticles.push({
      mesh: mesh,
      velocity: velocity,
      life: 1.0
    });
  }
}

function spawnClickRipple(x, y) {
  // simple 2D placeholder or dummy in 3D
}

function update3DParticles(dt) {
  const gravity = -16.0;
  for (let i = active3DParticles.length - 1; i >= 0; i--) {
    const p = active3DParticles[i];
    p.life -= dt;
    
    p.velocity.y += gravity * dt;
    p.mesh.position.addScaledVector(p.velocity, dt);

    p.mesh.rotation.x += dt * 4;
    p.mesh.rotation.y += dt * 3;

    if (p.life <= 0) {
      scene.remove(p.mesh);
      active3DParticles.splice(i, 1);
    }
  }
}

function updateTruck3D(dt) {
  if (!state || !truck3DMesh || truckState === 'idle') return;
  
  truckTimer += dt;
  const speed = 35.0; // 3D units per second

  if (truckState === 'driving_away') {
    truck3DMesh.position.x += speed * dt;
    truck3DMesh.position.y = Math.abs(Math.sin(truckTimer * 30)) * 0.18;

    if (Math.random() < 0.2) {
      const pGeo = new THREE.SphereGeometry(0.3 + Math.random() * 0.3, 4, 4);
      const pMat = new THREE.MeshBasicMaterial({ color: 0x78909c, transparent: true, opacity: 0.5 });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.copy(truck3DMesh.position);
      pMesh.position.x -= 2.0;
      pMesh.position.y += 0.8;
      scene.add(pMesh);
      
      active3DParticles.push({
        mesh: pMesh,
        velocity: new THREE.Vector3(-4 - Math.random() * 4, 2 + Math.random() * 3, (Math.random() - 0.5) * 2),
        life: 0.7
      });
    }

    if (truckTimer >= 1.8) {
      truckState = 'away';
      truckTimer = 0;
      truck3DMesh.position.set(-60, 0, 25);
    }
  } else if (truckState === 'away') {
    if (truckTimer >= 1.2) {
      truckState = 'returning';
      truckTimer = 0;
    }
  } else if (truckState === 'returning') {
    truck3DMesh.position.x += speed * dt;
    truck3DMesh.position.y = Math.abs(Math.sin(truckTimer * 30)) * 0.18;

    if (Math.random() < 0.2) {
      const pGeo = new THREE.SphereGeometry(0.3 + Math.random() * 0.3, 4, 4);
      const pMat = new THREE.MeshBasicMaterial({ color: 0x78909c, transparent: true, opacity: 0.5 });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.copy(truck3DMesh.position);
      pMesh.position.x -= 2.0;
      pMesh.position.y += 0.8;
      scene.add(pMesh);
      
      active3DParticles.push({
        mesh: pMesh,
        velocity: new THREE.Vector3(-4 - Math.random() * 4, 2 + Math.random() * 3, (Math.random() - 0.5) * 2),
        life: 0.7
      });
    }

    if (truck3DMesh.position.x >= -3) {
      truck3DMesh.position.x = -3;
      truck3DMesh.position.y = 0;
      truckState = 'idle';
      truckTimer = 0;
      
      if (activeDeliverQuest) {
        addCoins(activeDeliverQuest.rewardCoins);
        addXp(activeDeliverQuest.rewardXp);
        
        // Spawn star particles and text floaters in 3D
        const pos = project3DToScreen(truck3DMesh.position);
        spawnStarParticles();
        createFloatingText(pos.x, pos.y - 40, `+🪙${activeDeliverQuest.rewardCoins} +⭐${activeDeliverQuest.rewardXp}`, '#ffd700');
        
        const qIndex = state.activeQuests.findIndex(q => q.id === activeDeliverQuest.id);
        if (qIndex !== -1) {
          state.activeQuests[qIndex] = generateSingleQuest();
        }
        
        activeDeliverQuest = null;
        renderAll();
        saveUsersDB();
      }
    }
  }
}

function project3DToScreen(vector3) {
  if (!renderer || !camera || !canvas) return { x: 0, y: 0 };
  
  const tempV = vector3.clone();
  tempV.project(camera);
  
  const widthHalf = canvas.clientWidth / 2;
  const heightHalf = canvas.clientHeight / 2;
  
  return {
    x: (tempV.x * widthHalf) + widthHalf,
    y: -(tempV.y * heightHalf) + heightHalf
  };
}

function createFloatingText(x, y, text, color) {
  const container = els.farmCanvasContainer;
  if (!container) return;
  
  const rect = container.getBoundingClientRect();
  let localX, localY;

  // Convert client-relative coordinate (like event.clientX) to container-relative coordinate
  if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    localX = x - rect.left;
    localY = y - rect.top;
  } else {
    // Already local coordinate (from project3DToScreen or canvas coordinate)
    localX = x;
    localY = y;
  }
  
  const pop = document.createElement('div');
  pop.className = 'floating-text-pop';
  pop.innerText = text;
  pop.style.color = color;
  pop.style.left = `${localX}px`;
  pop.style.top = `${localY}px`;
  
  container.appendChild(pop);
  
  setTimeout(() => {
    pop.remove();
  }, 1000);
}

function updateHoverHighlight() {
  active3DPlots.forEach(p => {
    const soilMesh = p.group.children.find(child => child.userData && child.userData.type === 'plot');
    if (soilMesh && soilMesh.material) {
      if (p.id === hoveredPlotId) {
        soilMesh.material.emissive.setHex(0x222222);
      } else {
        soilMesh.material.emissive.setHex(0x000000);
      }
    }
  });
}

function setupCanvasEvents() {
  if (!canvas) return;

  const getRaycastIntersection = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    const targets = [];
    scene.traverse(child => {
      if (child.isMesh && child.userData && (child.userData.type === 'plot' || child.userData.type === 'animal')) {
        targets.push(child);
      }
    });
    
    const intersects = raycaster.intersectObjects(targets, true);
    if (intersects.length > 0) {
      return intersects[0];
    }
    return null;
  };

  canvas.addEventListener('mousemove', e => {
    if (!state) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    const hit = getRaycastIntersection(e.clientX, e.clientY);
    let hoveredAnimal = null;
    let nextHoveredPlotId = null;

    if (hit) {
      const data = hit.object.userData;
      if (data.type === 'animal') {
        hoveredAnimal = data.animalKey;
      } else if (data.type === 'plot') {
        nextHoveredPlotId = data.plotId;
      }
    }

    if (hoveredAnimal) {
      canvas.style.cursor = 'pointer';
      hoveredPlotId = null;
    } else if (nextHoveredPlotId !== null) {
      canvas.style.cursor = 'pointer';
      hoveredPlotId = nextHoveredPlotId;
    } else {
      canvas.style.cursor = 'default';
      hoveredPlotId = null;
    }

    updateHoverHighlight();
  });

  canvas.addEventListener('click', e => {
    if (!state) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const hit = getRaycastIntersection(e.clientX, e.clientY);

    if (hit) {
      const data = hit.object.userData;
      if (data.type === 'animal') {
        const animalKey = data.animalKey;
        const instanceId = data.instanceId;
        const animalObj = active3DAnimals.find(a => a.instanceId === instanceId);
        if (animalObj) {
          animalObj.jumpTimer = 0.5; // Jump animation
        }
        
        // Play animal click SFX
        AudioEngine.playSFX('animal_' + animalKey);

        // Spawn star particles above the animal
        const screenPos = project3DToScreen(hit.point);
        spawnStarParticles();
        
        handleAnimalClick(animalKey, instanceId);
        return;
      } else if (data.type === 'plot') {
        const plotId = data.plotId;
        const plot = state.plots[plotId];
        
        if (plot) {
          const screenPos = project3DToScreen(hit.point);
          mouseX = screenPos.x;
          mouseY = screenPos.y;
          
          if (plot.isLocked) {
            unlockPlot(plotId);
          } else {
            if (plot.state === 'empty') {
              plantSeed(plotId);
            } else if (plot.state === 'growing') {
              if (!plot.isWatered) {
                waterCrop(plotId);
                spawnWaterParticles();
              } else {
                alert("This crop is already watered! (พืชชนิดนี้ถูกรดน้ำไปแล้ว)");
              }
            } else if (plot.state === 'ready') {
              harvestCrop(plotId);
              spawnStarParticles();
            }
          }
        }
      }
    }
  });
}

function updateSeasonTime(dt) {
  if (!state) return;
  if (state.seasonTimer === undefined) state.seasonTimer = 90;
  state.seasonTimer -= dt;
  if (state.seasonTimer <= 0) {
    state.currentSeasonIdx = (state.currentSeasonIdx + 1) % 4;
    state.seasonTimer = 90; // Reset timer
    applySeasonUI();
    saveUsersDB();
  }
  
  // Update season UI badge
  const iconEl = document.getElementById('season-icon');
  const textEl = document.getElementById('season-indicator-text');
  if (iconEl && textEl) {
    const seasons = [
      { name: 'Spring', icon: '🌸' },
      { name: 'Summer', icon: '☀️' },
      { name: 'Autumn', icon: '🍁' },
      { name: 'Winter', icon: '❄️' }
    ];
    const s = seasons[state.currentSeasonIdx];
    iconEl.innerText = s.icon;
    textEl.innerText = `${s.name} (${Math.ceil(state.seasonTimer)}s)`;
  }
  
  // Tick family updates (accumulate time)
  if (state.family) {
    if (!state.familyAccumulatedTime) state.familyAccumulatedTime = 0;
    state.familyAccumulatedTime += dt;
    if (state.familyAccumulatedTime >= 60) {
      state.familyAccumulatedTime -= 60;
      tickFamilyGrowth();
    }
    
    if (!state.helperAccumulatedTime) state.helperAccumulatedTime = 0;
    state.helperAccumulatedTime += dt;
    if (state.helperAccumulatedTime >= 10) {
      state.helperAccumulatedTime -= 10;
      runChildHelperAI();
    }
  }
}

function applySeasonUI() {
  if (!state || !renderer || !scene) return;
  const season = state.currentSeasonIdx !== undefined ? state.currentSeasonIdx : 0;
  
  let skyColor = 0x81d4fa;
  let groundColor = 0x66bb6a;
  
  if (season === 0) { // Spring
    skyColor = 0xfad0c4;
    groundColor = 0x8ebd59;
  } else if (season === 1) { // Summer
    skyColor = 0x81d4fa;
    groundColor = 0x6dbb48;
  } else if (season === 2) { // Autumn
    skyColor = 0xffcc80;
    groundColor = 0xc59262;
  } else { // Winter
    skyColor = 0xcfd8dc;
    groundColor = 0xe0f7fa;
  }
  
  renderer.setClearColor(skyColor, 1);
  if (scene.fog) {
    scene.fog.color.setHex(skyColor);
  }
  
  if (groundMesh && groundMesh.material) {
    groundMesh.material.color.setHex(groundColor);
  }
  
  rebuildWeatherParticles3D();
}

function generateSingleQuest() {
  const allowedItems = ['carrot'];
  
  if (state.level >= 2) allowedItems.push('tomato');
  if (state.level >= 3) allowedItems.push('corn');
  if (state.level >= 4) allowedItems.push('pumpkin');
  
  if (state.animals && state.animals.chicken && state.animals.chicken.count > 0) allowedItems.push('egg');
  if (state.animals && state.animals.cow && state.animals.cow.count > 0) allowedItems.push('milk');
  if (state.animals && state.animals.pig && state.animals.pig.count > 0) allowedItems.push('bacon');
  if (state.animals && state.animals.sheep && state.animals.sheep.count > 0) allowedItems.push('wool');
  
  const numItems = Math.random() < 0.6 ? 1 : 2;
  const requirements = {};
  
  const shuffled = [...allowedItems].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(numItems, shuffled.length); i++) {
    const itemKey = shuffled[i];
    let maxQty = 3;
    if (itemKey === 'carrot') maxQty = 5;
    else if (itemKey === 'egg') maxQty = 4;
    else maxQty = 2;
    
    requirements[itemKey] = 1 + Math.floor(Math.random() * maxQty);
  }
  
  let totalCoinsVal = 0;
  let totalXpVal = 0;
  
  Object.keys(requirements).forEach(itemKey => {
    const qty = requirements[itemKey];
    let unitCoin = 0;
    if (cropMeta[itemKey]) {
      unitCoin = cropMeta[itemKey].sellPrice;
    } else {
      if (itemKey === 'egg') unitCoin = state.animals.chicken.productPrice;
      else if (itemKey === 'milk') unitCoin = state.animals.cow.productPrice;
      else if (itemKey === 'bacon') unitCoin = state.animals.pig.productPrice;
      else if (itemKey === 'wool') unitCoin = state.animals.sheep.productPrice;
    }
    
    totalCoinsVal += Math.ceil(unitCoin * qty * 1.5);
    totalXpVal += Math.ceil(unitCoin * qty * 0.7);
  });
  
  return {
    id: 'q_' + Math.random().toString(36).substr(2, 9),
    requirements: requirements,
    rewardCoins: totalCoinsVal,
    rewardXp: totalXpVal,
    timer: 120, // 2 minutes auto refresh if uncompleted
    maxTimer: 120
  };
}

function generateQuests() {
  const quests = [];
  for (let i = 0; i < 3; i++) {
    quests.push(generateSingleQuest());
  }
  return quests;
}

function updateQuests(dt) {
  if (!state || currentUser === null) return;
  if (!state.activeQuests || state.activeQuests.length === 0) {
    state.activeQuests = generateQuests();
    renderQuests();
    return;
  }
  
  let changed = false;
  state.activeQuests.forEach(quest => {
    quest.timer -= dt;
    if (quest.timer <= 0) {
      const newQuest = generateSingleQuest();
      quest.id = newQuest.id;
      quest.requirements = newQuest.requirements;
      quest.rewardCoins = newQuest.rewardCoins;
      quest.rewardXp = newQuest.rewardXp;
      quest.timer = newQuest.timer;
      quest.maxTimer = newQuest.maxTimer;
      changed = true;
    }
  });
  
  questRenderTimer += dt;
  if (questRenderTimer >= 1.0) {
    questRenderTimer = 0;
    renderQuests();
  }
  
  if (changed) {
    renderQuests();
    saveUsersDB();
  }
}

function renderQuests() {
  const container = document.getElementById('quests-list');
  if (!container || !state) return;
  
  container.innerHTML = '';
  
  if (!state.activeQuests || state.activeQuests.length === 0) {
    state.activeQuests = generateQuests();
  }
  
  state.activeQuests.forEach(quest => {
    const card = document.createElement('div');
    card.className = 'quest-card';
    
    let canDeliver = true;
    const needsListHtml = [];
    
    Object.keys(quest.requirements).forEach(itemKey => {
      const needed = quest.requirements[itemKey];
      const owned = state.harvestStock[itemKey] || 0;
      const isComplete = owned >= needed;
      if (!isComplete) canDeliver = false;
      
      let emoji = '🥕';
      if (cropMeta[itemKey]) emoji = cropMeta[itemKey].emoji;
      else if (itemKey === 'egg') emoji = '🥚';
      else if (itemKey === 'milk') emoji = '🥛';
      else if (itemKey === 'bacon') emoji = '🥓';
      else if (itemKey === 'wool') emoji = '🧶';
      
      needsListHtml.push(`
        <div class="quest-need-item ${isComplete ? 'complete' : ''}">
          <span>${emoji}</span> ${owned}/${needed}
        </div>
      `);
    });
    
    const pct = Math.max(0, (quest.timer / 120) * 100);
    
    card.innerHTML = `
      <div class="quest-header">
        <span>📦 Order Quest</span>
        <span style="font-size:0.75rem; color:#8d6e63;">⏱️ ${Math.round(quest.timer)}s</span>
      </div>
      <div class="quest-timer-bar">
        <div class="quest-timer-fill" style="width: ${pct}%;"></div>
      </div>
      <div class="quest-needs">
        ${needsListHtml.join('')}
      </div>
      <div class="quest-footer">
        <div class="quest-rewards">
          🪙+${quest.rewardCoins} ⭐+${quest.rewardXp}
        </div>
        <button class="quest-btn" ${(!canDeliver || truckState !== 'idle') ? 'disabled' : ''} onclick="deliverQuest('${quest.id}')">
          ${truckState !== 'idle' ? '🚚...' : 'Deliver'}
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

window.deliverQuest = function(questId) {
  if (truckState !== 'idle') return;
  const questIndex = state.activeQuests.findIndex(q => q.id === questId);
  if (questIndex === -1) return;
  
  const quest = state.activeQuests[questIndex];
  
  let canDeliver = true;
  Object.keys(quest.requirements).forEach(itemKey => {
    const needed = quest.requirements[itemKey];
    const owned = state.harvestStock[itemKey] || 0;
    if (owned < needed) canDeliver = false;
  });
  
  if (!canDeliver) return;
  
  Object.keys(quest.requirements).forEach(itemKey => {
    const needed = quest.requirements[itemKey];
    state.harvestStock[itemKey] -= needed;
  });
  
  renderHarvestStock();
  triggerTruckAnimation(quest);
};

function triggerTruckAnimation(quest) {
  AudioEngine.playSFX('truck');
  truckState = 'driving_away';
  truckTimer = 0;
  activeDeliverQuest = quest;
  renderQuests();
}

// ==========================================
// 👨‍👩‍👧‍👦 Family, Romance & Child Growth Functions
// ==========================================

function renderFamilyPanel() {
  if (!state || !state.family) return;

  // Header stats card farmer age update
  if (els.currentFarmerName) {
    els.currentFarmerName.textContent = currentUser + ` (${state.family.farmerAge || 18} ปี)`;
  }

  // 1. Romance Section
  if (!state.family.partnerName) {
    els.romanceSetupPanel.style.display = 'block';
    els.romanceActivePanel.style.display = 'none';
  } else {
    els.romanceSetupPanel.style.display = 'none';
    els.romanceActivePanel.style.display = 'block';
    
    els.activePartnerName.textContent = state.family.partnerName;
    
    // Status text
    let statusText = "คบหากันอยู่ (Dating) 💖";
    if (state.family.isMarried) {
      statusText = "คู่ชีวิต (Married) 💍";
    }
    els.relationshipStatus.textContent = statusText;
    
    // Romance points
    const romancePts = state.family.partnerRomance || 0;
    els.romancePtsText.textContent = `${romancePts}/100`;
    els.romanceProgressBar.style.width = `${romancePts}%`;
    
    // Propose button shows only if points are 100 and not married
    if (romancePts >= 100 && !state.family.isMarried) {
      els.btnFamilyPropose.style.display = 'block';
    } else {
      els.btnFamilyPropose.style.display = 'none';
    }
  }

  // 2. House Section
  let houseName = "บ้านกระท่อมไม้ Cottage (เลเวล 1)";
  let upgradeCost = 1000;
  if (state.family.houseLevel === 2) {
    houseName = "บ้านเดี่ยว Town House (เลเวล 2)";
    upgradeCost = 2000;
  } else if (state.family.houseLevel >= 3) {
    houseName = "คฤหาสน์ Grand Estate (เลเวล 3)";
    upgradeCost = 0;
  }
  els.familyHouseName.textContent = houseName;
  
  const upgradeBtn = els.btnUpgradeHouse;
  if (state.family.houseLevel >= 3) {
    upgradeBtn.textContent = "Fully Upgraded";
    upgradeBtn.disabled = true;
    upgradeBtn.style.background = "#888";
    upgradeBtn.style.borderColor = "#777";
  } else {
    upgradeBtn.textContent = `🏠 Upgrade (🪙${upgradeCost})`;
    upgradeBtn.disabled = state.coins < upgradeCost;
    upgradeBtn.style.background = "";
    upgradeBtn.style.borderColor = "";
  }

  // 3. Child Section
  if (!state.family.isMarried || state.family.childStage === "none") {
    els.childNonePanel.style.display = 'block';
    els.childActivePanel.style.display = 'none';
  } else {
    els.childNonePanel.style.display = 'none';
    els.childActivePanel.style.display = 'block';
    
    let stageText = "ทารก (Infant)";
    let emoji = "👶";
    
    // Default hiding
    els.btnChildHomework.style.display = 'none';
    els.teenagerTaskPanel.style.display = 'none';
    
    if (state.family.childStage === "infant") {
      emoji = "👶";
      stageText = `ทารกวัยแบเบาะ (Infant) - อายุ ${state.family.childAge || 0} ปี`;
    } else if (state.family.childStage === "student") {
      emoji = "👦";
      stageText = `วัยนักเรียน (Student - Grade ${state.family.childSchoolGrade || 1}) - อายุ ${state.family.childAge || 7} ปี`;
      els.btnChildHomework.style.display = 'block';
    } else if (state.family.childStage === "teenager") {
      emoji = "🧑";
      stageText = `วัยรุ่นช่วยงาน (Teenager) - อายุ ${state.family.childAge || 13} ปี`;
      els.teenagerTaskPanel.style.display = 'block';
      els.childTaskSelect.value = state.family.assignedTask || "idle";
    } else if (state.family.childStage === "adult") {
      emoji = "🧑‍🌾";
      stageText = `ผู้ใหญ่สืบทอด (Adult) - อายุ ${state.family.childAge || 18} ปี`;
    }
    
    els.childEmoji.textContent = emoji;
    els.childStageText.textContent = stageText;
    
    const progress = state.family.childGrowthProgress || 0;
    els.childGrowthText.textContent = `${progress}%`;
    els.childProgressBar.style.width = `${progress}%`;
  }
}

function startRomance() {
  if (!state || !state.family) return;
  const selectEl = els.partnerSelect;
  state.family.partnerName = selectEl.value;
  state.family.partnerRomance = 10; // Start at 10 pts
  state.family.isMarried = false;
  state.family.childStage = "none";
  state.family.childAge = 0;
  state.family.childGrowthProgress = 0;
  
  usersDB[currentUser] = state;
  saveUsersDB();
  renderAll();
  AudioEngine.playSFX('correct');
  
  alert(`💖 คุณเริ่มจีบ ${state.family.partnerName} แล้ว! พูดคุยและมอบของขวัญเพื่อเพิ่มค่าความรักให้ครบ 100 แต้ม เพื่อขอแต่งงาน!`);
}

function chatWithPartner() {
  if (!state || !state.family || !state.family.partnerName) return;
  
  // Increase romance
  const oldRomance = state.family.partnerRomance || 0;
  state.family.partnerRomance = Math.min(oldRomance + 5, 100);
  
  usersDB[currentUser] = state;
  saveUsersDB();
  renderAll();
  AudioEngine.playSFX('correct');
  
  // Cute NPC dialogue
  let reply = "ยินดีที่ได้คุยกับเธอนะ!";
  if (state.family.partnerName.includes("Sam")) {
    const dialogs = [
      "วันนี้เธอน่ารักจัง! ฉันมีเมล็ดพันธุ์ดีๆ มานำเสนอเธอเสมอเลยนะ 🌾",
      "การปลูกผักในแปลงต้องใส่ใจ เช่นเดียวกับการดูแลคนพิเศษนะ! 😉",
      "มีเมล็ดพันธุ์พืชผักอะไรที่เธอต้องการไหม? ฉันเตรียมไว้ให้เธอเพียบเลย!"
    ];
    reply = dialogs[Math.floor(Math.random() * dialogs.length)];
  } else if (state.family.partnerName.includes("Lana")) {
    const dialogs = [
      "ฮึบ! ตัดไม้เหนื่อยๆ แต่พอได้ยินเสียงของเธอแล้วหายเหนื่อยเป็นปลิดทิ้งเลย 🪓",
      "อยากสร้างบ้านใหม่หลังใหญ่กว่าเดิมไหม? ปรึกษาฉันได้เสมอนะ!",
      "อากาศวันนี้สดชื่นมากเลยนะ เหมาะกับการทำฟาร์มร่วมกันมากๆ"
    ];
    reply = dialogs[Math.floor(Math.random() * dialogs.length)];
  } else if (state.family.partnerName.includes("Fiona")) {
    const dialogs = [
      "ทำฟาร์มคนเดียวมันเหนื่อย แต่ถ้าเราแชร์ปัญหาร่วมกัน มันก็น่าสนุกดีนะ 👩‍🌾",
      "วันนี้ผลผลิตของคุณเป็นอย่างไรบ้าง? มะเขือเทศฉันกำลังลูกโตน่ากินเชียว!",
      "ดีใจจังเลยที่เราเป็นเพื่อนบ้านชาวสวนที่คอยสนับสนุนกันตลอด"
    ];
    reply = dialogs[Math.floor(Math.random() * dialogs.length)];
  }
  
  alert(`💬 ${state.family.partnerName}: "${reply}" \n\n(แต้มความรักเพิ่มขึ้น +5! ปัจจุบัน: ${state.family.partnerRomance}/100)`);
}

function giveGiftToPartner() {
  if (!state || !state.family || !state.family.partnerName) return;
  if (state.coins < 20) {
    AudioEngine.playSFX('incorrect');
    alert("คุณมีเหรียญทองไม่เพียงพอ! (ต้องใช้ 🪙20)");
    return;
  }
  
  state.coins -= 20;
  const oldRomance = state.family.partnerRomance || 0;
  state.family.partnerRomance = Math.min(oldRomance + 15, 100);
  
  usersDB[currentUser] = state;
  saveUsersDB();
  renderAll();
  AudioEngine.playSFX('correct');
  
  alert(`🎁 คุณส่งมอบกล่องของขวัญแสนสวยงามให้ ${state.family.partnerName}! \n\n(แต้มความรักเพิ่มขึ้น +15! ปัจจุบัน: ${state.family.partnerRomance}/100)`);
}

function proposeMarriage() {
  if (!state || !state.family || !state.family.partnerName) return;
  if (state.family.partnerRomance < 100) {
    alert("คุณต้องการแต้มความรัก 100 แต้มก่อนแต่งงาน!");
    return;
  }
  if (state.coins < 500) {
    AudioEngine.playSFX('incorrect');
    alert("คุณต้องการแหวนแต่งงานราคา 🪙500 เหรียญทอง!");
    return;
  }
  
  state.coins -= 500;
  state.family.isMarried = true;
  state.family.houseLevel = 2; // Upgraded automatically to Level 2
  state.family.childStage = "infant";
  state.family.childAge = 1;
  state.family.childGrowthProgress = 0;
  
  usersDB[currentUser] = state;
  saveUsersDB();
  renderAll();
  AudioEngine.playSFX('correct');
  
  alert(`🎉💍 ยินดีด้วยอย่างยิ่ง! คุณได้ขอแต่งงานกับ ${state.family.partnerName} สำเร็จแล้ว!\n\n` +
        `พวกคุณย้ายเข้าอยู่ด้วยกันและได้อัปเกรดบ้านเป็น Town House (เลเวล 2) เพื่อต้อนรับทารกน้อยวัยแบเบาะ (Infant) ทายาทคนแรกของฟาร์ม! 👶`);
}

function upgradeHouse() {
  if (!state || !state.family) return;
  let upgradeCost = 1000;
  if (state.family.houseLevel === 2) {
    upgradeCost = 2000;
  } else if (state.family.houseLevel >= 3) {
    return;
  }
  
  if (state.family.houseLevel === 1 && !state.family.isMarried) {
    alert("คุณต้องแต่งงานสร้างครอบครัวก่อน จึงจะสามารถอัปเกรดบ้านเป็นเลเวล 2 ได้!");
    return;
  }
  
  if (state.coins < upgradeCost) {
    AudioEngine.playSFX('incorrect');
    alert("คุณมีเหรียญทองไม่เพียงพอสำหรับการอัปเกรดบ้าน!");
    return;
  }
  
  state.coins -= upgradeCost;
  state.family.houseLevel++;
  
  usersDB[currentUser] = state;
  saveUsersDB();
  renderAll();
  AudioEngine.playSFX('correct');
  
  alert(`🏡 ยินดีด้วย! บ้านฟาร์มของคุณได้รับการอัปเกรดเป็นเลเวล ${state.family.houseLevel} เรียบร้อยแล้ว!`);
}

function startChildHomework() {
  if (!state || !state.family || state.family.childStage !== 'student') return;
  
  const gradeLevels = ['level-kg', 'level-p1', 'level-p2', 'level-p3', 'level-p4', 'level-p5', 'level-p6'];
  const gradeIdx = state.family.childSchoolGrade || 1;
  const gradeKey = gradeLevels[gradeIdx] || 'level-p1';
  
  const subject = Math.random() > 0.5 ? 'math' : 'english';
  const questions = questionsData[gradeKey] ? questionsData[gradeKey][subject] : questionsData['level-p1'][subject];
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  
  activeQuiz = {
    question: randomQuestion,
    correctCallback: () => {
      // Correct answer: child gains +20% growth progress
      const oldProgress = state.family.childGrowthProgress || 0;
      state.family.childGrowthProgress = Math.min(oldProgress + 20, 100);
      addCoins(20);
      addXp(20);
      
      let hasLeveledUp = false;
      if (state.family.childGrowthProgress >= 100) {
        state.family.childGrowthProgress = 0;
        
        if (state.family.childSchoolGrade < 6) {
          state.family.childSchoolGrade++;
          state.family.childAge++;
          alert(`🎓 ทายาทของคุณสอบผ่านและขึ้นชั้นเรียนเป็น Grade ${state.family.childSchoolGrade} แล้ว!`);
        } else {
          state.family.childStage = "teenager";
          state.family.assignedTask = "idle";
          state.family.childAge = 13;
          hasLeveledUp = true;
        }
      }
      
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      
      setTimeout(() => {
        if (hasLeveledUp) {
          alert("🎉 ยอดเยี่ยมมาก! ทายาทของคุณทำการบ้านเสร็จทั้งหมดและเรียนจบ ป.6 เติบโตสู่วัยรุ่น (Teenager) แล้ว! คุณสามารถมอบหมายภารกิจช่วยงานฟาร์มได้แล้ว");
        } else {
          alert(`📚 คุณช่วยสอนการบ้านลูกถูกต้อง! ได้รับ 🪙20 XP20 และความก้าวหน้าการเรียนรู้ลูกเพิ่มขึ้น +20% (ปัจจุบัน: ${state.family.childGrowthProgress}%)`);
        }
      }, 500);
    },
    incorrectCallback: () => {
      alert("คำตอบยังไม่ถูกต้อง ลองช่วยทำการบ้านวิชานี้ใหม่อีกครั้งนะ!");
    },
    rewardCoins: 20,
    rewardXp: 20
  };
  
  showQuizModal(`สอนการบ้านลูก: Grade ${state.family.childSchoolGrade} (${subject.toUpperCase()})`);
}

function changeChildTask(e) {
  if (!state || !state.family) return;
  state.family.assignedTask = e.target.value;
  usersDB[currentUser] = state;
  saveUsersDB();
  alert(`🛠️ มอบหมายงานให้ทายาท: ${e.target.value === 'idle' ? 'พักผ่อน' : (e.target.value === 'auto_water' ? 'ช่วยรดน้ำแปลงผัก' : 'ช่วยเก็บเกี่ยวผลผลิต')}`);
}

function tickFamilyGrowth() {
  if (!state || !state.family) return;

  // Increment farmer age
  state.family.farmerAge = (state.family.farmerAge || 18) + 1;

  // Increment child growth progress passively if married
  if (state.family.isMarried && state.family.childStage !== "none" && state.family.childStage !== "adult") {
    const oldProgress = state.family.childGrowthProgress || 0;
    state.family.childGrowthProgress = Math.min(oldProgress + 5, 100);
    
    if (state.family.childGrowthProgress >= 100) {
      state.family.childGrowthProgress = 0;
      if (state.family.childStage === "infant") {
        state.family.childStage = "student";
        state.family.childSchoolGrade = 1;
        state.family.childAge = 7;
        alert("🎉 ทายาทวัยทารกเติบโตกลายเป็น วัยนักเรียน (Student - Grade 1) แล้ว! ช่วยทำการบ้านสะสมรางวัลการเรียนรู้กันเถอะ!");
      } else if (state.family.childStage === "student") {
        if (state.family.childSchoolGrade < 6) {
          state.family.childSchoolGrade++;
          state.family.childAge++;
          alert(`🎓 ทายาทของคุณเติบโตและเลื่อนระดับชั้นเรียนขึ้นเป็น Grade ${state.family.childSchoolGrade} แล้ว!`);
        } else {
          state.family.childStage = "teenager";
          state.family.assignedTask = "idle";
          state.family.childAge = 13;
          alert("🎉 ทายาทของคุณทำการเรียนจบประถมและเติบโตสู่วัยรุ่น (Teenager) แล้ว! คุณสามารถมอบหมายภารกิจช่วยงานฟาร์มในแปลงดินได้แล้ว");
        }
      } else if (state.family.childStage === "teenager") {
        state.family.childStage = "adult";
        state.family.assignedTask = "idle";
        state.family.childAge = 18;
        alert("🎉 ทายาทวัยรุ่นเติบโตเป็น วัยผู้ใหญ่ (Adult) อายุ 18 ปีบริบูรณ์แล้ว! พร้อมสืบทอดดูแลฟาร์ม Happy Farm ต่อจากคุณในเจเนอเรชั่นถัดไปเมื่อคุณรีไทร์");
      }
    }
  }

  // Generational inheritance check (at age 80)
  if (state.family.farmerAge >= 80) {
    triggerInheritance();
  }

  usersDB[currentUser] = state;
  saveUsersDB();
  renderAll();
}

function runChildHelperAI() {
  if (!state || !state.family || !state.family.isMarried || state.family.childStage !== 'teenager') return;
  
  const task = state.family.assignedTask;
  if (task === 'auto_water') {
    let wateredAny = false;
    for (let i = 0; i < state.plots.length; i++) {
      const plot = state.plots[i];
      if (!plot.isLocked && plot.state === 'growing' && !plot.isWatered) {
        plot.isWatered = true;
        plot.progress = Math.min(plot.progress + 40, 100);
        wateredAny = true;
        break; // Water one plot per helper tick
      }
    }
    if (wateredAny) {
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      AudioEngine.playSFX('water');
    }
  } else if (task === 'auto_harvest') {
    let harvestedAny = false;
    for (let i = 0; i < state.plots.length; i++) {
      const plot = state.plots[i];
      if (!plot.isLocked && plot.state === 'ready') {
        const cropKey = plot.cropType;
        const crop = cropMeta[cropKey];
        state.harvestStock[cropKey]++;
        plot.state = 'empty';
        plot.cropType = null;
        plot.progress = 0;
        plot.isWatered = false;
        addXp(crop.xpReward);
        
        harvestedAny = true;
        break; // Harvest one plot per helper tick
      }
    }
    if (harvestedAny) {
      usersDB[currentUser] = state;
      saveUsersDB();
      renderAll();
      AudioEngine.playSFX('harvest');
    }
  }
}

function triggerInheritance() {
  const hasAdultHeir = state.family.isMarried && state.family.childStage === 'adult';
  const inheritedCoins = Math.max(100, Math.floor(state.coins * 0.8));
  
  let msg = "";
  if (hasAdultHeir) {
    msg = `👴 คุณอายุครบ 80 ปีแล้ว! ได้เวลาเกษียณอายุการทำสวนและยกมอบฟาร์มให้ทายาทของคุณดูแลสืบสานต่อ.\n\n` +
          `ทายาทคนใหม่ (วัย 18 ปี) ได้รับสืบทอดฟาร์มพร้อมกับมรดกสะสม 🪙${inheritedCoins} เหรียญทอง (80% ของเหรียญที่คุณเก็บหอมรอมริบ)!\n` +
          `เลเวลของฟาร์มจะเริ่มต้นนับใหม่ในเจเนอเรชั่นถัดไปของครอบครัว!`;
  } else {
    msg = `👴 คุณอายุครบ 80 ปีแล้วและไม่มีทายาทสืบทอดฟาร์ม! ร่างกายเหนื่อยล้าเกินกว่าจะทำสวนต่อ จึงตัดสินใจขายฟาร์มส่งต่อให้ชาวสวนคนใหม่.\n\n` +
          `ชาวสวนคนใหม่ (วัย 18 ปี) ได้รับสืบทอดฟาร์มต่อพร้อมเงินตั้งตัว 🪙${inheritedCoins} เหรียญทอง (80% ของเงินสะสม)!\n` +
          `ขอบคุณสำหรับการทำสวนและเคียงข้างช่วยเหลือ Professor Owl ตลอดชีวิตวัยทำงาน!`;
  }
  
  alert(msg);
  
  // generational reset
  state.coins = inheritedCoins;
  state.level = 1;
  state.xp = 0;
  state.activeSeed = 'carrot';
  state.inventory = { carrot: 5, tomato: 0, pumpkin: 0, corn: 0 };
  state.harvestStock = { carrot: 0, tomato: 0, pumpkin: 0, corn: 0, egg: 0, milk: 0, bacon: 0, wool: 0 };
  
  // Re-lock plots except first 4
  state.plots = [
    { id: 0, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 1, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 2, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 3, isLocked: false, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 4, isLocked: true, lockCost: 50, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 5, isLocked: true, lockCost: 100, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 6, isLocked: true, lockCost: 200, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 7, isLocked: true, lockCost: 350, state: 'empty', cropType: null, progress: 0, isWatered: false },
    { id: 8, isLocked: true, lockCost: 500, state: 'empty', cropType: null, progress: 0, isWatered: false }
  ];
  
  // Reset livestock
  state.animals = {
    chicken: { count: 0, unlocked: false, cost: 80, product: 'egg', productPrice: 15, name: 'Clucky Chicken', emoji: '🐔', instances: [] },
    cow: { count: 0, unlocked: false, cost: 180, product: 'milk', productPrice: 35, name: 'Daisy Cow', emoji: '🐮', instances: [] },
    pig: { count: 0, unlocked: false, cost: 280, product: 'bacon', productPrice: 55, name: 'Bacon Pig', emoji: '🐷', instances: [] },
    sheep: { count: 0, unlocked: false, cost: 380, product: 'wool', productPrice: 75, name: 'Wooly Sheep', emoji: '🐑', instances: [] }
  };
  
  // Family state reset
  state.family = {
    houseLevel: 1,
    partnerName: "",
    partnerRomance: 0,
    isMarried: false,
    childStage: "none",
    childAge: 0,
    childSchoolGrade: 0,
    childGrowthProgress: 0,
    assignedTask: "idle",
    farmerAge: 18
  };
  
  usersDB[currentUser] = state;
  saveUsersDB();
  
  // Clear any active plot timers
  Object.keys(plotTimers).forEach(id => {
    clearInterval(plotTimers[id]);
    delete plotTimers[id];
  });
  
  sync3DAnimals();
  renderAll();
}

// Compatibility dummy/hooks for legacy code
function preRenderSprites() {}
function syncCanvasAnimals() {
  sync3DAnimals();
}
// Start everything after all declarations are fully initialized
init();





