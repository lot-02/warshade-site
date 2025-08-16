
    

    // 1. Job Class Paths
    const jobPaths = {
    swordsman: [
        ["Knight", "Lord Knight", "Rune Knight"],
        ["Crusader", "Paladin", "Royal Guard"]
    ],
    mage: [
        ["Wizard", "High Wizard", "Warlock"],
        ["Sage", "Professor", "Sorcerer"]
    ],
    acolyte: [
        ["Priest", "High Priest", "Archbishop"],
        ["Monk", "Champion", "Shura"]
    ],
    merchant: [
        ["Blacksmith", "Whitesmith", "Mechanic"],
        ["Alchemist", "Creator", "Genetic"]
    ],
    archer: [
        ["Hunter", "Sniper", "Ranger"],
        ["Bard", "Clown", "Minstrel"],
        ["Dancer", "Gypsy", "Wanderer"]
    ],
    thief: [
        ["Assassin", "Assassin Cross", "Guillotine Cross"],
        ["Rogue", "Stalker", "Shadow Chaser"]
    ]
    };

    // 2. Folder path map for images
    const folderMap = {
    swordsman: 'swordsman-path',
    mage: 'mage-path',
    acolyte: 'acolyte-path',
    archer: 'archer-path',
    merchant: 'merchant-path',
    thief: 'thief-path'
    };






    let currentJobBase = '';
let currentBranchStages = []; // Stores current stage per branch

function openJobPath(job) {
  currentJobBase = job;
  const panel = document.getElementById('jobPathPanel');
  const content = document.getElementById('jobPathContent');
  const paths = jobPaths[job];

  const exitHint = document.getElementById('exitHint');
exitHint.classList.add('show');

// Auto-hide after 6 seconds
setTimeout(() => {
  exitHint.classList.remove('show');
}, 3000);

  currentBranchStages = paths.map(() => 0);


  content.innerHTML = '';
  panel.style.display = 'flex';
  panel.classList.add('split-panel');

  // Set modal background to base class
  setJobPanelBackground(job, job);

  paths.forEach((branch, branchIndex) => {
    const currentStage = currentBranchStages[branchIndex];
    const jobName = branch[currentStage];
    const imgName = jobName.toLowerCase().replace(/ /g, '-');

    const column = document.createElement('div');
    column.className = 'job-branch-column';
    column.style.backgroundImage = `url(images/${job}-path/${imgName}.png)`;

    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.textContent = jobName;

    // ✨ Add job base class for glowing text-shadow
    jobCard.classList.add(currentJobBase.toLowerCase());

    // Single click = set modal background
    jobCard.addEventListener('click', () => {
      setJobPanelBackground(imgName, job);
    });

    // Double click = evolve
    jobCard.addEventListener('dblclick', () => {
      if (currentBranchStages[branchIndex] < branch.length - 1) {
        currentBranchStages[branchIndex]++;
        updateBranchColumn(job, branch, branchIndex);
      }
    });

    // Back button
    const backBtn = document.createElement('button');
    backBtn.textContent = '⬅ Back';
    backBtn.className = 'back-btn';
    backBtn.addEventListener('click', () => {
      if (currentBranchStages[branchIndex] > 0) {
        currentBranchStages[branchIndex]--;
        updateBranchColumn(job, branch, branchIndex);
      }
    });

    // ✅ Wrap buttons in flex container for layout control
    const controls = document.createElement('div');
    controls.className = 'job-controls';
    controls.appendChild(jobCard);
    controls.appendChild(backBtn);

    column.appendChild(controls);
    content.appendChild(column);
  });
}


    function updateBranchColumn(job, branch, branchIndex) {
  const content = document.getElementById('jobPathContent');
  const column = content.children[branchIndex];
  const stage = currentBranchStages[branchIndex];
  const jobName = branch[stage];
  const imgName = jobName.toLowerCase().replace(/ /g, '-');

  column.style.backgroundImage = `url(images/${job}-path/${imgName}.png)`;

  const jobCard = column.querySelector('.job-card');
  jobCard.textContent = jobName;

  // ✅ Change modal background to reflect current job
  setJobPanelBackground(imgName, job);
}










    function setJobPanelBackground(imageName, baseClass = null) {
  const panel = document.getElementById('jobPathPanel');
  let path;

  if (baseClass) {
    // For base class (like acolyte)
    path = `images/${baseClass}-path/${imageName}.png`;
  } else {
    // For specific job class, find its base path from mapping
    const jobEntry = Object.entries(jobPaths).find(([key, paths]) =>
      paths.some(branch => branch.includes(imageName.replace(/-/g, ' ')))
    );
    if (jobEntry) {
      const [base, _] = jobEntry;
      path = `images/${base}-path/${imageName}.png`;
    } else {
      // fallback default background
      path = `images/default-bg.jpg`;
    }
  }

  panel.style.backgroundImage = `url('${path}')`;
}

    function closeJobPath() {
  document.getElementById('jobPathPanel').style.display = 'none';

  // Optional: also clear content and reset background
  document.getElementById('jobPathContent').innerHTML = '';
  document.getElementById('jobPathPanel').style.backgroundImage = '';
    }


    document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeJobPath();
    document.getElementById('exitHint').classList.remove('show');
  }
});




    document.addEventListener('DOMContentLoaded', function () {
      const mediaToggle = document.getElementById('mediaToggle');
      const mediaPanel = document.getElementById('mediaPanel');
      const triangleIcon = document.getElementById('triangleIcon');

      mediaToggle.addEventListener('click', function () {
        mediaPanel.classList.toggle('show');
        triangleIcon.style.transform = mediaPanel.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
      });

    document.addEventListener('click', function (e) {
        if (!mediaToggle.contains(e.target) && !mediaPanel.contains(e.target)) {
          mediaPanel.classList.remove('show');
          triangleIcon.style.transform = 'rotate(0deg)';
        }
      });
    });
  





    
  document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.event-slide');
  const dotContainer = document.getElementById('sliderDots');
  let currentIndex = 0;
  let interval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    dot.addEventListener('click', () => goToSlide(index));
    dotContainer.appendChild(dot);
  });

  const dots = dotContainer.querySelectorAll('.slider-dot');

  function updateSlides() {
    slides.forEach((slide, idx) => {
      slide.classList.remove('active');
      dots[idx].classList.remove('active');
    });

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
    resetAutoSlide();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 6000);
  }

  function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
  }

  updateSlides();
  startAutoSlide();
});
    
    //transition of sections
    const sections = document.querySelectorAll("section");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom && sectionTop > -section.clientHeight) {
    section.classList.add("reveal");
    } else {
    section.classList.remove("reveal");
    }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);


  const followBtn = document.getElementById("followBtn");
  const socialLinks = document.getElementById("socialLinks");

  followBtn.addEventListener("click", () => {
    socialLinks.classList.toggle("hidden");
  });

  const logoImg = document.getElementById('logo-img');
  const logos = [
    'images/logo1.png',
    'images/logo2.png',
    'images/logo30.png'
    
  ];

  let current = 0;

    setInterval(() => {
    current = (current + 1) % logos.length;
    logoImg.style.opacity = 0;

    setTimeout(() => {
      logoImg.src = logos[current];
      logoImg.style.opacity = 1;
    }, 300);
  }, 3000); // Change logo every 3 seconds



    document.addEventListener('DOMContentLoaded', function () {
        const bgmToggle = document.getElementById('bgmToggle');
        const bgmPlayer = document.getElementById('bgmPlayer');
        let isPlaying = true;

        bgmToggle.addEventListener('click', function () {
        if (isPlaying) {
            bgmPlayer.pause();
            bgmToggle.textContent = '🔇 Music: OFF';
        } else {
            bgmPlayer.play();
            bgmToggle.textContent = '🔊 Music: ON'; 
        }
        isPlaying = !isPlaying;
        });
    });






    const mediaModal = document.getElementById("mediaModal");
    const modalContentArea = document.getElementById("modalContentArea");
    const closeModal = document.getElementById("closeModal");

    document.querySelector("a[href='#wallpapers']").addEventListener("click", () => {
      showWallpaperGrid(); // 👈 loads grid view
    });

    const wallpaperImages = [
      { src: "images/RobotDragon.webp", alt: "Wallpaper 1" },
      { src: "images/TreeMan.webp", alt: "Wallpaper 2" },
      { src: "images/Dimo.webp", alt: "Wallpaper 3" },
      { src: "images/GlitchMinotaur.webp", alt: "Wallpaper 4" }
    ];

    let currentWallpaperIndex = 0;

    function showWallpaperModal(index) {
      const image = wallpaperImages[index];
      currentWallpaperIndex = index;

      modalContentArea.innerHTML = `
        <div class="fullscreen-image">
          <img src="${image.src}" alt="${image.alt}">
          <div style="margin-top: 10px;">
            <a href="${image.src}" download style="color:white;">⬇ Download</a>
          </div>
          <div class="nav-buttons">
            <button onclick="prevWallpaper()" class="nav-btn">⬅ Prev</button>
            <button onclick="nextWallpaper()" class="nav-btn">Next ➡</button>
          </div>
          <br><button onclick="showWallpaperGrid()" class="back-btn">⬅ Back to Grid</button>
        </div>
      `;
    }

    function prevWallpaper() {
      currentWallpaperIndex = (currentWallpaperIndex - 1 + wallpaperImages.length) % wallpaperImages.length;
      showWallpaperModal(currentWallpaperIndex);
    }

    function nextWallpaper() {
      currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpaperImages.length;
      showWallpaperModal(currentWallpaperIndex);
    }


    function showWallpaperGrid() {
    mediaModal.classList.remove("hidden");

    modalContentArea.innerHTML = `
      <h2>🎨 Wallpapers</h2>
      <div class="wallpaper-grid">
        ${wallpaperImages.map((img, index) => `
          <img src="${img.src}" alt="${img.alt}" class="modal-img" onclick="showWallpaperModal(${index})">
        `).join('')}
      </div>
      <p style="margin-top: 1rem; font-size: 0.9rem; color: #aaa;">Click image to view.</p>
    `;
  }

            const bgmPlayer = document.getElementById("bgmPlayer");
        // const modalContentArea = document.getElementById("modalContentArea");
        // const mediaModal = document.getElementById("mediaModal");

        // List of BGM tracks
        const musicTracks = [
          {
            name: "Crush",
            file: "music/Tessa Violet - Crush (Lyrics) [VpWyNjr_KVY].mp3",
            image: "mBG/mbg40.jpg"
          },
          {
            name: "The Days",
            file: "music/CHRYSTAL - THE DAYS (NOTION REMIX) (Lyrics) [r52Skqzbe2A].mp3",
            image: "mBG/mbg22.jpg"
          },
          {
            name: "Tek It",
            file: "music/Cafuné - Tek It (Sped Up) [Lyrics] [Wejy_JlB4hE].mp3",
            image: "mBG/mbg1.png"
          },
          {
            name: "Chlorine",
            file: "music2/twenty one pilots - Chlorine (Official Video) [eJnQBXmZ7Ek].mp3",
            image: "mBG/mbg23.jpg"                                           //
          },
          {
            name: "Freefall",
            file: "music/freefall [SJtyejNSYoo].mp3",
            image: "mBG/mbg2.jpg"
          },
          // {
          //   name: "Don't Go",
          //   file: "music2/The Hunger Games (MV) - Please Don't Go (Mike Posner) [RV6AqBJmb-I].mp3",
          //   image: "mBG/mbg2.jpg"                                           //
          // },
          {
            name: "All We Know",
            file: "music2/The Chainsmokers – All We Know (Lyrics _ Lyric Video) ft. Phoebe Ryan [Future Bass] [RAOVAl9Djzc].mp3",
            image: "mBG/mbg24.jpg"                                           //
          },
          {
            name: "Tie Me Down",
            file: "music/Tie me down - Speed up [jR0vr9pwevY].mp3",
            image: "mBG/mbg3.jpg"
          },
          {
            name: "Supalonely",
            file: "music2/BENEE - Supalonely ft. Gus Dapperton [Rb6Scz-5YOs].mp3",
            image: "mBG/mbg25.jpg"                     //
          },
          {
            name: "Sunset Lover",
            file: "music2/Petit Biscuit - Sunset Lover (Official Music Video) [4fQeaM62mOY].mp3",
            image: "mBG/mbg26.jpg"                     //
          },
          {
            name: "My Type",
            file: "music2/The Chainsmokers - My Type (Audio) ft. Emily Warren [o16rCMSVfI8].mp3",
            image: "mBG/mbg27.jpg"                     //
          },
          {
            name: "After Dark",
            file: "music/mr kitty - after dark [ sped up + reverb + bass boosted ] [ibB6vbfYvqo].mp3",
            image: "mBG/mbg4.jpg"
          },
          {
            name: "Middle",
            file: "music2/DJ Snake ft. Bipolar Sunshine - Middle (Official Audio) [mOKqNxN4jWM].mp3",
            image: "mBG/mbg28.jpg"                     //
          },
          {
            name: "Ride",
            file: "music/Ride - SoMo (Spedup) [0AZP9YuSYPQ].mp3",
            image: "mBG/mbg5.jpg"
          },
          {
            name: "Kiss Me More",
            file: "music2/Doja Cat - Kiss Me More (Lyrics) ft. SZA [Ab6E2BsuLJ0].mp3",
            image: "mBG/mbg29.jpg"                     //
          },
          {
            name: "Obsessed",
            file: "music/obsessed - sped up [S_rbbR7jcr4].mp3",
            image: "mBG/mbg6.jpg"
          },
          {                 
            name: "Isekai",          
            file: "music2/Isekai [UIPA_D2kNWU].mp3",
            image: "mBG/mbg30.jpg"                     //
          },
          {                 
            name: "Alone",          
            file: "music2/Marshmello - Alone (Official Music Video) [ALZHF5UqnU4].mp3",
            image: "mBG/mbg31.jpg"                     //
          },
          {
            name: "Overdose",
            file: "music/なとり - overdose (sped up) [ZAfW37X8ceU].mp3",
            image: "mBG/mbg7.jpg"
          },
          {
            name: "Luther",
            file: "music2/luther [XVveECQmiAk].mp3",
            image: "mBG/mbg32.jpg"                       //
          },
          {
            name: "Wait",
            file: "music2/Maroon 5 - Wait (Official Music Video) [4uTNVumfm84].mp3",
            image: "mBG/mbg33.jpg"                       //
          },
          {
            name: "Happier",
            file: "music2/Marshmello ft. Bastille - Happier (Official Music Video) [m7Bc3pLyij0].mp3",
            image: "mBG/mbg34.jpg"                                   //
          },
          {
            name: "5 O’Clock",
            file: "music/T Pain - 5 O’Clock (LYRICS) [gHMEQz854S4].mp3",
            image: "mBG/mbg8.jpg"
          },
          {
            name: "Paris",
            file: "music2/The Chainsmokers - Paris (Official Video) [fRNkQH4DVg8].mp3",
            image: "mBG/mbg35.jpg"                                   //
          },
          {
            name: "Psycho",
            file: "music/russ - psycho (sped up) [Nj9swIh1Upg].mp3",
            image: "mBG/mbg9.jpg"
          },
          {
            name: "Talking to Myself",
            file: "music/Talking to myself - brb. (lirik terjemah) [UZbECze6A3k].mp3",
            image: "mBG/mbg21.png"
          },
          {
            name: "50 Feet",
            file: "music/50 Feet - SoMo ( sped up ) [VoXtVl6Xm-g].mp3",
            image: "mBG/mbg11.jpg"
          },
          {
            name: "Swim",
            file: "music/chase atlantic - swim (speed up) [3i9ZOClqwl0].mp3",
            image: "mBG/mbg12.jpg"
          },
          {
            name: "Hesitations",
            file: "music/Hesitations - Shiloh Dynasty (Lyrics) [ssHpYF3ZL2A].mp3",
            image: "mBG/mbg13.jpg"
          },
          {
            name: "oui",
            file: "music/jeremih - oui [sped up] [b_fWtrFRYAw].mp3",
            image: "mBG/mbg14.jpg"
          },
          {
            name: "Collide",
            file: "music/Justine Skye - Collide (Sped Up _ TikTok Remix) (Lyrics) ft. Tyga [SQGkw9sTJWY].mp3",
            image: "mBG/mbg15.jpg"
          },
          {
            name: "Moonlight",
            file: "music/Kali Uchis - Moonlight (Lyrics) sped up [iu8BheaCqmU].mp3",
            image: "mBG/mbg16.jpg"
          },
          {
            name: "Middle of the Night",
            file: "music/middle of the night- Elley Duhé [sped up] [mCamTZwTdFg].mp3",
            image: "mBG/mbg17.jpg"
          },
          {
            name: "Shinunoga E - Wa",
            file: "music/Fujii Kaze - Shinunoga E - Wa ꒰ Sped up ꒱ [92oQu7TsIW8].mp3",
            image: "mBG/mbg18.jpg"
          },
          {
            name: "Hot",
            file: "music/Liili - Hot (Lyric video) [uejK46Kesh0].mp3",
            image: "mBG/mbg19.jpg"
          },
          {
            name: "Best of Me",
            file: "music2/NEFFEX - Best of Me [Official Video] [0Wa_CR0H8g4].mp3",
            image: "mBG/mbg36.jpg"                    //
          },
          {
            name: "Careless",
            file: "music2/NEFFEX - Careless 💔 [Copyright Free] No.19 [Z6L4u2i97Rw].mp3",
            image: "mBG/mbg37.jpg"                    //
          },
          {
            name: "Cold",
            file: "music2/NEFFEX - Cold ❄️[Copyright Free] No.60 [WzQBAc8i73E].mp3",
            image: "mBG/mbg38.jpg"                    //
          },
          {
            name: "Grateful",
            file: "music2/NEFFEX - Grateful [Copyright Free] No.54 [83RUhxsfLWs].mp3",
            image: "mBG/mbg10.jpg"                    //
          },
          {
            name: "Life",
            file: "music2/NEFFEX - Life ✨ [Copyright Free] No.42 [TPCaWQQo11A].mp3",
            image: "mBG/mbg39.jpeg"                    //
          }
        ];

       let currentTrackIndex = 0;

        function changeTrack(index) {
          const track = musicTracks[index];
          currentTrackIndex = index;

          const player = document.getElementById("bgmPlayer");
          player.src = track.file;
          player.play();

          // Update album image and track title
          document.getElementById("albumImage").src = track.image;
          document.getElementById("nowPlaying").textContent = track.name;

          // Glow effect
          document.querySelectorAll(".carousel-item").forEach((item, idx) => {
            item.classList.toggle("playing", idx === index);
          });
        }

        // function shuffleTrack() {
        //   const random = Math.floor(Math.random() * musicTracks.length);
        //   changeTrack(random);
        // }

        

        function renderMusicPanel() {
          let html = `
            <div class="music-panel-grid">
              <div class="carousel-vertical">
          `;

          musicTracks.forEach(track => {
            html += `
              <div class="carousel-item">
                <button onclick="changeTrack('${track.file}', '${track.name}', '${track.image}', this.parentElement)">▶ ${track.name}</button>
              </div>
            `;
          });

          html += `
                </div>
                  <div class="music-right-panel">
                    <img id="albumImage" src="mBG/mbg20.jpeg" class="album-art"/>
                    <marquee> <h3 id="nowPlaying">🎵 Pick Song/Select Again</h3> </marquee>
                    <audio id="bgmPlayer" loop>
                      <source src="" type="audio/mpeg">
                    </audio>
                    <div class="bgm-controls">
                      <button onclick="playPreviousTrack()">⏮</button>
                      <button id="playPauseBtn" onclick="togglePlayPause()">▶</button>
                      <button onclick="playNextTrack()">⏭</button>
                      <button onclick="shuffleTrack()">🔀</button>
                      <button id="loopBtn" onclick="toggleLoop()">🔂</button>
                    </div>
                </div>
          `;

          document.getElementById("modalContentArea").innerHTML = html;
          document.getElementById("mediaModal").classList.remove("hidden");
          // changeTrack(0); // Auto play first track
        }

        document.querySelector("a[href='#music']").addEventListener("click", renderMusicPanel);



        
        


    // let currentTrackIndex = 0;
    let isLooping = true; // Use this if needed for 🔂 loop icon

    function changeTrack(src, name, image, element = null) {
      const player = document.getElementById("bgmPlayer");
      const nowPlaying = document.getElementById("nowPlaying");
      const albumImage = document.getElementById("albumImage");
      const playPauseBtn = document.getElementById("playPauseBtn");

      

      albumImage.src = image ||  randomDefault;

      player.src = src;
      player.play();

      nowPlaying.textContent = `🎵 Now Playing: ${name}`;
      albumImage.src = image;
      playPauseBtn.textContent = "⏸";

      // Update currentTrackIndex
      const index = musicTracks.findIndex(track => track.file === src);
      if (index !== -1) currentTrackIndex = index;

      // Remove previous glow
      document.querySelectorAll(".carousel-item").forEach(item => {
        item.classList.remove("playing");
      });

      // Add glow to current
      if (element) {
        element.classList.add("playing");
      }
    }

    function playNextTrack() {
      currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
      const nextTrack = musicTracks[currentTrackIndex];
      const trackElement = findTrackElement(nextTrack.name);
      changeTrack(nextTrack.file, nextTrack.name, nextTrack.image, trackElement);
    }

    function playPreviousTrack() {
      currentTrackIndex = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
      const prevTrack = musicTracks[currentTrackIndex];
      const trackElement = findTrackElement(prevTrack.name);
      changeTrack(prevTrack.file, prevTrack.name, prevTrack.image, trackElement);
    }

    function shuffleTrack() {
      const randomIndex = Math.floor(Math.random() * musicTracks.length);
      const randomTrack = musicTracks[randomIndex];
      const trackElement = findTrackElement(randomTrack.name);
      changeTrack(randomTrack.file, randomTrack.name, randomTrack.image, trackElement);
    }

    function togglePlayPause() {
      const player = document.getElementById("bgmPlayer");
      const btn = document.getElementById("playPauseBtn");

      if (player.paused) {
        player.play();
        btn.textContent = "⏸";
      } else {
        player.pause();
        btn.textContent = "▶";
      }
    }

    // Utility: find track button in the carousel
    function findTrackElement(name) {
      const buttons = document.querySelectorAll(".carousel-item button");
      for (const btn of buttons) {
        if (btn.textContent.includes(name)) {
          return btn.closest(".carousel-item");
        }
      }
      return null;
    }

    function toggleLoop() {
      const bgmPlayer = document.getElementById("bgmPlayer");
      isLooping = !isLooping;

      if (isLooping) {
        bgmPlayer.loop = true;
        document.getElementById("loopBtn").textContent = "🔂"; // Loop icon
      } else {
        bgmPlayer.loop = false;
        document.getElementById("loopBtn").textContent = "➡️"; // Unloop icon (you can customize)
      }
    }


        document.getElementById("bgmPlayer").addEventListener("ended", function () {
            if (!isLooping) {
              playNextTrack();
            }
          });

    










        const fanArtImages = [
          { src: "fanArt/fa1.jpg", alt: "Fan Art 1" },
          { src: "fanArt/fa11.jpg", alt: "Fan Art 11" },
          
          { src: "fanArt/fa15.jpg", alt: "Fan Art 15" },
          { src: "fanArt/fa9.jpg", alt: "Fan Art 9" },
          { src: "fanArt/fa3.jpg", alt: "Fan Art 3" },
          { src: "fanArt/fa4.jpg", alt: "Fan Art 4" },
          { src: "fanArt/fa5.jpg", alt: "Fan Art 5" },
          { src: "fanArt/fa10.jpg", alt: "Fan Art 10" },
          { src: "fanArt/fa12.jpg", alt: "Fan Art 12" },
          { src: "fanArt/fa6.jpg", alt: "Fan Art 6" },
          { src: "fanArt/fa7.jpg", alt: "Fan Art 7" },
          { src: "fanArt/fa13.jpg", alt: "Fan Art 13" },
          { src: "fanArt/fa14.jpg", alt: "Fan Art 14" },
          { src: "fanArt/fa8.png", alt: "Fan Art 8" },
          { src: "fanArt/fa2.jpg", alt: "Fan Art 2" },
          { src: "fanArt/fa16.jpg", alt: "Fan Art 16" }


          
        ];

        let currentFanArtIndex = 0;

        document.querySelector("a[href='#fanworks']").addEventListener("click", () => {
          showFanArtGrid(); // Load grid view
        });

        // Show grid view
        function showFanArtGrid() {
          modalContentArea.innerHTML = `
            <h2>🎭 Fan Creations</h2>
            <div class="fanart-grid">
              ${fanArtImages.map((img, index) => `
                <img src="${img.src}" alt="${img.alt}" class="modal-img" data-index="${index}">
              `).join('')}
            </div>
          `;
          mediaModal.classList.remove("hidden");

          // Attach click listeners to each image
          document.querySelectorAll('.modal-img').forEach(img => {
            img.addEventListener('click', (e) => {
              const index = parseInt(e.target.getAttribute("data-index"));
              showFanArtModal(index);
            });
          });
        }

        // Show fullscreen modal view
        function showFanArtModal(index) {
          const image = fanArtImages[index];
          currentFanArtIndex = index;

          modalContentArea.innerHTML = `
            <div class="fullscreen-image">
              <img src="${image.src}" alt="${image.alt}">
              <div style="margin-top: 10px;">
                <a href="${image.src}" download style="color:white;">⬇ Download</a>
              </div>
              <div class="nav-buttons">
                <button onclick="prevFanArt()" class="nav-btn">⬅ Prev</button>
                <button onclick="nextFanArt()" class="nav-btn">Next ➡</button>
              </div>
              <br><button onclick="showFanArtGrid()" class="back-btn">⬅ Back to Grid</button>
            </div>
          `;
        }

        // Navigate Prev
        function prevFanArt() {
          currentFanArtIndex = (currentFanArtIndex - 1 + fanArtImages.length) % fanArtImages.length;
          showFanArtModal(currentFanArtIndex);
        }

        // Navigate Next
        function nextFanArt() {
          currentFanArtIndex = (currentFanArtIndex + 1) % fanArtImages.length;
          showFanArtModal(currentFanArtIndex);
        }

        // Close modal when X is clicked
        closeModal.addEventListener("click", () => {
          mediaModal.classList.add("hidden");
        });


    



    async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
      showDashboard(username); // 💡 This will handle all dashboard updates

    } else {
      alert(result.message || "Invalid credentials");
    }
  } catch (err) {
    alert("Login failed. Backend may not be running.");
    console.error(err);
  }
}

           function showDashboard(username) {
            document.getElementById('loginPanel').style.display = 'none';
            document.getElementById('registerPanel').style.display = 'none';
            document.getElementById('playerDashboard').style.display = 'block';
            document.getElementById('playerName').textContent = username;

            // 🎁 Daily reward
            const rewards = [
                "100 Gold", "10 Gems", "EXP Boost", "Exclusive Wallpaper", "Free Card Pack"
            ];
            const dailyQuests = [
                "Login 2 days in a row", "Click Explore Now", "Check Latest News", "Change your background music"
            ];

            const reward = rewards[Math.floor(Math.random() * rewards.length)];
            const quest = dailyQuests[Math.floor(Math.random() * dailyQuests.length)];

            document.getElementById('dailyRewardMsg').textContent = reward;
            document.getElementById('dailyQuest').textContent = quest;

            // 🎨 Random QR styles & colors
            const styles = ["dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"];
            const colors = ["#00ffff", "#ff00ff", "#ff9900", "#00ff00", "#ff3333", "#0099ff"];

            const randomStyle = styles[Math.floor(Math.random() * styles.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            // 🆕 Generate QR dynamically
            const qrContainer = document.getElementById('npcQRCode');
            qrContainer.innerHTML = `
                <h3 style="text-align:center;">Scan for Collectibles</h3>
                <div id="npcQRBox" style="display:flex; justify-content:center; margin:1rem 0;"></div>
                <p style="font-size: 0.9rem; text-align:center;">Voice Pack</p>
            `;

            const qrCode = new QRCodeStyling({
                width: 140,
                height: 140,
                type: "svg",
                // 🔗 Hosted on GitHub Pages so it works anywhere
                data: "https://lot-02.github.io/warshade-npc-rewards/npc-reward.html",
                dotsOptions: {
                    color: randomColor,
                    type: randomStyle
                },
                backgroundOptions: {
                    color: "#000000"
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 4
                }
            });

            qrCode.append(document.getElementById("npcQRBox"));
        }

    
          function claimReward() {
            const reward = document.getElementById("dailyRewardMsg")?.textContent || "a mystery reward";
            alert(`🎉 You claimed ${reward}!`);
          }

          function topUp() {
            alert("💳 Top-up feature is under development!\nStay tuned for premium perks.");
          }
          



  function logout() {
    document.getElementById('playerDashboard').style.display = 'none';
    document.getElementById('loginPanel').style.display = 'block';
  }
    

  function showRegister() {
    document.getElementById('loginPanel').style.display = 'none';
    document.getElementById('registerPanel').style.display = 'block';
  }

  function showLogin() {
    document.getElementById('registerPanel').style.display = 'none';
    document.getElementById('loginPanel').style.display = 'block';
  }

  

  async function register() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (!username || !password || !confirmPassword) {
    alert("Please fill in all fields!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
      alert("Registration successful! You can now log in.");
      showLogin();
    } else {
      alert(result.message || "Registration failed.");
    }
  } catch (err) {
    alert("Registration failed. Backend may not be running.");
    console.error(err);
  }
}

// const bgmPlayer = document.getElementById("bgmPlayer");
const muteIcon = document.getElementById("bgmToggleIcon");
const volumeSlider = document.getElementById("volumeSlider");

// Mute/Unmute Toggle
muteIcon.addEventListener("click", () => {
  bgmPlayer.muted = !bgmPlayer.muted;
  muteIcon.textContent = bgmPlayer.muted ? "🔇" : "🔊";
});

// Volume Slider
volumeSlider.addEventListener("input", () => {
  bgmPlayer.volume = volumeSlider.value;
});

    
  




      const emailTemplates = [
            {
              subject: "Welcome to Warshade!",
              body: `Greetings, Warrior!\n\nThanks for signing up. You’ll now receive:\n• ⚔️ Early access to patch notes\n• 🎁 In-game giveaways\n• 🔥 Sneak peeks at future events\n\n— The Warshade Dev Team`
            },
            {
              subject: "Your Warshade Adventure Begins",
              body: `Dear Hero,\n\nYou're now on the frontline of Warshade updates.\nExpect epic news, bonus codes, and hidden lore.\n\nStay sharp,\n🛡️ Team Warshade`
            },
            {
              subject: "Get Ready for Glory!",
              body: `Salutations!\n\nThanks for joining the ranks. Watch your inbox for:\n- Exclusive art drops\n- Beta test invites\n- Dev blogs from the Shadow Realm\n\n⚔️ Fight with honor!`
            }
          ];

          function typeText(element, text, speed = 20) {
            let index = 0;
            element.innerHTML = "";
            const interval = setInterval(() => {
              if (index < text.length) {
                element.innerHTML += text[index] === "\n" ? "<br>" : text[index];
                index++;
              } else {
                clearInterval(interval);
              }
            }, speed);
          }

          function fakeSubscribe() {
            const emailInput = document.getElementById("fakeEmail");
            const confirmation = document.getElementById("confirmationMsg");
            const emailPreview = document.getElementById("emailPreview");
            const dynamicEmail = document.getElementById("dynamicEmail");
            const emailBody = document.getElementById("emailBody");
            const emailSubject = document.getElementById("emailSubject");
            const unsubscribeBtn = document.getElementById("unsubscribeBtn");

            const email = emailInput.value.trim();

            if (email !== "") {
              // 🧹 CLEANUP previous state
              clearTimeout(confirmation.hideTimeout);
              confirmation.classList.remove("error");
              confirmation.style.opacity = "0"; // Reset opacity
              confirmation.style.display = "none"; // Reset display

              // ✅ Set new confirmation
              confirmation.textContent = "✅ Subscribed successfully!";
              confirmation.style.display = "block";
              setTimeout(() => {
                confirmation.style.opacity = "1";
              }, 10); // Force reflow for fade-in

              // Hide after a while
              confirmation.hideTimeout = setTimeout(() => {
                confirmation.style.opacity = "0";
                setTimeout(() => {
                  confirmation.style.display = "none";
                }, 600);
              }, 6000); 

              // Show new random email preview
              const template = emailTemplates[Math.floor(Math.random() * emailTemplates.length)];
              dynamicEmail.textContent = email;
              emailSubject.textContent = template.subject;
              emailBody.textContent = "";
              emailBody.classList.remove("typing");
              emailPreview.style.display = "block";
              emailPreview.classList.add("email-preview-show", "showing");
              unsubscribeBtn.style.display = "inline-block";

              // Type animation
              emailBody.classList.add("typing");
              typeText(emailBody, template.body);

              // Clear input
              emailInput.value = "";
            }
          }


          function unsubscribe() {
            const confirmation = document.getElementById("confirmationMsg");
            const emailPreview = document.getElementById("emailPreview");
            const unsubscribeBtn = document.getElementById("unsubscribeBtn");

            clearTimeout(confirmation.hideTimeout);
            confirmation.textContent = "❌ You’ve been unsubscribed.";
            confirmation.className = "error"; // optional styling
            confirmation.style.display = "block";
            confirmation.style.opacity = "1";

            // Auto-hide
            confirmation.hideTimeout = setTimeout(() => {
              confirmation.style.opacity = "0";
              setTimeout(() => {
                confirmation.style.display = "none";
              }, 400);
            }, 6000);

            // Hide preview
            emailPreview.classList.remove("showing");
            setTimeout(() => {
              emailPreview.style.display = "none";
            }, 400);

            unsubscribeBtn.style.display = "none";
          }


          
