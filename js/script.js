const menuButton = document.querySelector('.menu-button');
const drawer = document.querySelector('.drawer');
const closeButton = document.querySelector('.close-button');
const overlay = document.querySelector('.menu-overlay');

function setMenu(open) {
  if (!drawer || !overlay || !menuButton) return;

  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);

  menuButton.setAttribute('aria-expanded', String(open));
  overlay.setAttribute('aria-hidden', String(!open));
}

menuButton?.addEventListener('click', () => setMenu(true));
closeButton?.addEventListener('click', () => setMenu(false));
overlay?.addEventListener('click', () => setMenu(false));

document.querySelectorAll('.drawer a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

// ==============================
// プロフィール画像スライダー
// ==============================

const profileImage = document.getElementById("profile-image");
const prevButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");
const dotsContainer = document.getElementById("slider-dots");

if (
  profileImage &&
  prevButton &&
  nextButton &&
  dotsContainer
) {

  // HTMLに書かれている画像一覧を取得
  const profileImages = profileImage.dataset.images
    .split(",")
    .map(image => image.trim());

  let currentImage = 0;


  function showImage() {

    // 画像を変更
    profileImage.src = profileImages[currentImage];

    // ●○○を作り直す
    dotsContainer.innerHTML = "";

    profileImages.forEach((image, index) => {

      const dot = document.createElement("button");

      dot.type = "button";
      dot.classList.add("slider-dot");

      // 今表示している画像なら強調
      if (index === currentImage) {
        dot.classList.add("active");
      }

      // ●○をクリックしたとき
      dot.addEventListener("click", () => {
        currentImage = index;
        showImage();
      });

      dotsContainer.appendChild(dot);

    });
  }


  // 「＞」ボタン
  nextButton.addEventListener("click", () => {

    currentImage++;

    if (currentImage >= profileImages.length) {
      currentImage = 0;
    }

    showImage();

  });


  // 「＜」ボタン
  prevButton.addEventListener("click", () => {

    currentImage--;

    if (currentImage < 0) {
      currentImage = profileImages.length - 1;
    }

    showImage();

  });


  // 最初の画像を表示
  showImage();

}