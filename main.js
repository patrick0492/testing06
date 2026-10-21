// Light dark mode
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle ? themeToggle.querySelector('i') : null;

const currentThemeSetting = localStorage.getItem('theme') || 'dark';
if (currentThemeSetting === 'dark'){
  document.body.setAttribute('data-theme', 'dark');
  if (icon) icon.classList.replace('ph-moon', 'ph-sun');
}
if (themeToggle){
  themeToggle.addEventListener('click', () =>{
    const isDarkModeActive = document.body.hasAttribute ('data-theme');

    if(isDarkModeActive){
      document.body.removeAttribute ('data-theme');
      localStorage.setItem ('theme', 'light');
      if (icon) icon.classList.replace ('ph-sun', 'ph-moon');
    } else{
      document.body.setAttribute ('data-theme', 'dark');
      localStorage.setItem ('theme', 'dark');
      if (icon) icon.classList.replace ('ph-moon', 'ph-sun');
    }

  })
}
// dynamic date and elapsed time
const dateEl = document.getElementById('current-date');
if (dateEl){
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  dateEl.textContent = new Date ()
  .toLocaleDateString ('en-GB', options)
  .replace(/,/g, '');
}
const timerEl = document.getElementById('timer');
let [hours, minutes, seconds] = [1, 45, 12];
if(timerEl){
  setInterval(() =>{
    seconds++;
    if (seconds > 59) {seconds = 0; minutes++;}
    if (minutes > 59) {minutes = 0; hours++;}

    const paddedH = String(hours).padStart(2, '0');
    const paddedM = String(minutes).padStart(2, '0');
    const paddedS = String(seconds).padStart(2, '0');

    timerEl.textContent = paddedH + ':' + paddedM + ':' + paddedS;
  }, 1000);
}
// real time chat submissions
const chatInput = document.getElementById('chat-input');
const btnSend = document.getElementById('btn-send');
const chatContainer = document.getElementById('chat-container');

function sendGroupMessage(){
  const rawMessage = chatInput ? chatInput.value.trim() : '';
  if(!rawMessage)return;
  const messageTemplate = `
  <div class="message right">
  <div class="msg-header">
  <div class="msg-user">
  <img src="video.png" class='avatar' style='width:28px; height: 28px'>
  Michaela Bosark
  </div>
  <div class='msg-time'>Just now</div>
  </div>
  <div class='msg-bubble'>${rawMessage}
  </div>
  </div>`;

  if(chatContainer){
    chatContainer.insertAdjacentHTML ('beforeEnd', messageTemplate);

    chatInput.value = '';
    chatContainer.scrollTo({top: chatContainer.scrollHeight, behavior: 'smooth'});
  }
}
if(btnSend) btnSend.addEventListener('click', sendGroupMessage);
if (chatInput){
  chatInput.addEventListener('keypress', (e) =>{
    if (e.key === 'Enter') sendGroupMessage ();
  });
}

const sidebar = document.getElementById('mobile-sidebar');
const overlay = document.getElementById('mobile-overlay');
const pnlParticipants = document.getElementById('participants-panel');
const pnlChat = document.getElementById('panel-chat');

function toggleMobileSheet (type){
  if (window.innerWidth > 1024) return;
  if (type === 'participants'){
    pnlParticipants?.classList.add('active-panel');
    pnlChat?.classList.remove('active-panel');
    pnlChat.style.display = 'none';
    pnlParticipants.style.display = 'flex';
  } else{
    pnlChat?.classList.add('active-panel');
    pnlParticipants?.classList.remove('active-panel');
    pnlChat.style.display = 'flex';
    pnlParticipants.style.display = 'none';

    setTimeout (() =>{
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 300);
  }
  sidebar?.classList.add('show');
  overlay?.classList.add('active');
}
function closeMobileSheet(){
  sidebar?.classList.remove('show');
  overlay?.classList.remove('active');

  setTimeout(() =>{
    if (window.innerWidth > 1024){
      pnlParticipants?.classList.add('active-panel');
      pnlChat?.classList.add('active-panel');
    }
  }, 500);
}
if(overlay) overlay.addEventListener('click', closeMobileSheet);

window.addEventListener('resize', () =>{
  if (window.innerWidth > 1024){
    sidebar?.classList.remove('show');
    overlay?.classList.remove('active');
    pnlParticipants?.classList.remove('active-panel');
    pnlChat?.classList.remove('active-panel');
  } else{
    if (pnlParticipants?.classList.contains('active-panel') && pnlChat?.classList.contains('active-panel')){
      pnlChat.classList.remove('active-panel');
    }
  }
});

// simulated live chat feed
const ChatFeeds = [
  'Dimitry Polians: Hey everyone! I just uploaded the latest mockups.',
  'Christian Haguen: Perfect! Let me open the screenshare to review.',
  'Andrew Londre: Wow, these transitions look incredibly smooth.',
  "Michaela Bosark: Thanks! let's decide on the accent color today"
]
let captionIdx = 0;
const captionTextEl = document.querySelector('.caption-text');
if (captionTextEl){
  setInterval (() =>{
    captionIdx = (captionIdx + 1) % ChatFeeds.length;
    captionTextEl.style.opacity = '0';

    setTimeout(() =>{
      captionTextEl.textContent = ChatFeeds[captionIdx];
      captionTextEl.style.opacity = '1';
    },300)
  },5500)
}
// microphone & camera toggle
const btnToggleMic = document.getElementById('btn-toggle-mic');
const globalBtnMic = document.getElementById('global-btn-mic');
let isMutedState = true;

function toggleMicHardwareState(){
  isMutedState = !isMutedState;
  if (isMutedState){
    if (btnToggleMic){
      btnToggleMic.innerHTML = '<i class="ph ph-microphone-slash"></i>';
      btnToggleMic.classList.remove('active-red');
    }
    if (globalBtnMic){
      globalBtnMic.innerHTML = '<i class="ph ph-microphone-slash"></i><span>Unmuted</span>';
      globalBtnMic.classList.remove('active');
    }
  } else{
    if (btnToggleMic){
      btnToggleMic.innerHTML = '<i class="ph ph-microphone"></i>';
      btnToggleMic.classList.add('active-red');
    }
    if(globalBtnMic){
      globalBtnMic.innerHTML = '<i class="ph ph-microphone"></i><span>Mute</span>';
      globalBtnMic.classList.add('active');
    }
  }
}
if (btnToggleMic) btnToggleMic.addEventListener('click', toggleMicHardwareState);
if (globalBtnMic) globalBtnMic.addEventListener('click', toggleMicHardwareState);

const btnToggleCam = document.getElementById('btn-toggle-cam');
const globalBtnCam = document.getElementById('global-btn-cam');
const mainVideoEl = document.getElementById('main-video video');
const videoPlaceholder = document.getElementById('video-placeholder');
let isCamOffState = false;

function toggleCamHardwareState (){
  isCamOffState = !isCamOffState;
  if (isCamOffState){
    // camera turned off
    if (btnToggleCam){
      btnToggleCam.innerHTML = '<i class="ph ph-video-camera-slash"></i>';
      btnToggleCam.classList.add('active-red'); 
    }
    if (globalBtnCam){
      globalBtnCam.innerHTML = '<i class="ph ph-video-camera-slash"></i><span>Start Video</span>';
      globalBtnCam.classList.add('active'); 
    }
    if (mainVideoEl) mainVideoEl.style.opacity = '0';
    if (videoPlaceholder) videoPlaceholder.classList.add('active');
  } else{
    // camera turned on
    if (btnToggleCam){
      btnToggleCam.innerHTML = '<i class="ph ph-video-camera"></i>';
      btnToggleCam.classList.remove('active-red'); 
    }
    if(globalBtnCam){
      globalBtnCam.innerHTML = '<i class="ph ph-video-camera"></i><span>Stop Video</span>';
      globalBtnCam.classList.remove('active');
    }
    if (mainVideoEl) mainVideoEl.style.opacity = '1';
    if (videoPlaceholder) videoPlaceholder.classList.remove('active');
  }
}
if (btnToggleCam) btnToggleCam.addEventListener('click', toggleCamHardwareState);
if (globalBtnCam) globalBtnCam.addEventListener('click', toggleCamHardwareState);

// hangup button
const btnHangup = document.getElementById('btn-hang-up');
const endMeetingModal = document.getElementById('end-meeting-modal');
const btnRejoin = document.getElementById('btn-rejoin');

if (btnHangup){
  btnHangup.addEventListener('click', () =>{
    if (endMeetingModal){
      endMeetingModal.style.display = 'flex';
      void endMeetingModal.offsetWidth;
      endMeetingModal.style.opacity = '1';
      endMeetingModal.style.visibility = 'visible';
      if (mainVideoEl) mainVideoEl.pause();
    }
  });
}
if (btnRejoin){
  btnRejoin.addEventListener('click', () =>{
    if (endMeetingModal){
      endMeetingModal.style.opacity = '0';
      endMeetingModal.style.visibility = 'hidden';

      if (mainVideoEl){
        mainVideoEl.currentTime = 0;
        mainVideoEl.play().catch(err => console.warn('Stream play blocked:', err));
      }
      setTimeout(() =>{
        endMeetingModal.style.display = 'none';
      },400)
    }
  });
}
// Emoji reaction burst generator
const btnToggleReactions = document.getElementById('btn-toggle-reactions');
const reactionPicker = document.getElementById('reaction-picker');

if (btnToggleReactions){
  btnToggleReactions.addEventListener('click', (e) =>{
    e.stopPropagation();
    if (reactionPicker){
      const isHidden = reactionPicker.style.display === 'none';
      reactionPicker.style.display = isHidden ? 'flex' : 'none';
    }
  });
}
// close picker when clicking anywhere
document.addEventListener('click', (e) =>{
  if (reactionPicker && !reactionPicker.contains(e.target) && e.target !== btnToggleReactions){
    reactionPicker.style.display = 'none';
  }
});
// fire when emoji is clicked
function sendReaction (emoji){
  const mainVideoCard = document.querySelector('.main-video');
  if (!mainVideoCard) return;

  const burstCount = 10;
  for (let i = 0; i < burstCount; i++){
    setTimeout (() =>{
      const reactNode = document.createElement('div');
      reactNode.className = 'floating-reaction';
      reactNode.textContent = emoji;

      const randomRight = Math.floor(Math.random() * 60) + 15;
      const randomBottom = Math.floor(Math.random() * 40) + 20;

      reactNode.style.left = 'auto';
      reactNode.style.right = randomRight + 'px';
      reactNode.style.bottom = randomBottom + 'px';

      const duration = (4.5 + Math.random() * 2.0). toFixed(2);
      reactNode.style.animationDuration = duration + 's';

      const scale = (0.7 + Math.random() * 0.6). toFixed(2);
      reactNode.style.fontSize = (scale * 2.5) + 'rem';
      mainVideoCard.appendChild(reactNode);

      setTimeout(() =>{reactNode.remove();}, parseFloat (duration) * 1000);
    }, i * 100);
  }
}

// exclusive active state
// function setupExclsiveActiveState (parentSelector, childSelector, activeClass = 'active'){
//   const parents = document.querySelectorAll(parentSelector);

//   parents.forEach(parent =>{
//     const children = parent.querySelectorAll(childSelector);
//     children.forEach(child =>{
//       child.addEventListener('click', (e) =>{
//         if(child.tagName === 'A') e.preventDefault();
//         children.forEach(sibling =>{
//           sibling.classList.remove('active', 'active-blue', 'active-red');
//         });
//         if (activeClass === 'dynamic'){
//           const isDanger = child.id === 'btn-toggle-cam' || child.id === 'btn-toggle-mic';
//           child.classList.add(isDanger ? 'active-red' : 'active-blue');
//         } else{
//           child.classList.add(activeClass);
//         }
//       })
//     })
//   })
// }
// setupExclsiveActiveState('.nav-links', '.nav-link', 'active');
// setupExclsiveActiveState('.global-actions', '.global-btn', 'active');
// setupExclsiveActiveState('.overlay-controls', '.control-btn', 'active-blue');
// setupExclsiveActiveState('.main-video-action', '.action-btn', 'dynamic');

// chat input emoji picker
const btnChatEmoji = document.getElementById('btn-chat-emoji');
const chatEmojiPicker = document.getElementById('chat-emoji-picker');

if (btnChatEmoji){
  btnChatEmoji.addEventListener('click', (e) =>{
    e.stopPropagation();

    if(chatEmojiPicker){
      const isHidden = chatEmojiPicker.style.display === 'none';
      chatEmojiPicker.style.display = isHidden ? 'flex' : 'none';
    }
  })
}
document.addEventListener('click', (e) =>{
  if (chatEmojiPicker && !chatEmojiPicker.contains(e.target) !==btnChatEmoji){
    chatEmojiPicker.style.display = 'none';
  }
});
function appendChatEmoji (emoji){
  const chatInputElement = document.getElementById('chat-input');
  if (chatInputElement){
    chatInputElement.value += emoji;
    chatInputElement.focus();
  }
}

