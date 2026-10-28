const button = document.querySelector(".home button");
const home = document.querySelector(".home");
const genre = document.querySelector(".genre");
const opening = document.querySelector(".opening");
const allAnimeButton = document.querySelector(".all-anime-button");
const genreButtons = document.querySelectorAll(".genre button");
const animeList = document.querySelector(".anime-list");
const selectedGenre = document.querySelector(".selected-genre");
const animeCards = document.querySelector(".anime-cards");
const drawButton = document.querySelector("#drawButton");
const result = document.querySelector("#result");
const resultTitle = document.querySelector("#resultTitle");
const resultImage = document.querySelector("#resultImage");
const animeSearch = document.querySelector("#animeSearch");
const searchButton = document.querySelector("#searchButton");
const searchResult = document.querySelector("#searchResult");


searchButton.addEventListener("click", function() {
  const keyword = animeSearch.value.trim();

  // 何も入力されていない場合
  if (keyword === "") {
    return;
  }

  // アニメを探す
  const foundAnime = animeData.find(function(anime) {
    return anime.title.includes(keyword);
  });

  // アニメが見つからなかった場合
  if (!foundAnime) {
    searchResult.style.display = "block";
    searchTitle.textContent = "作品が見つかりませんでした";
    searchImage.style.display = "none";
    return;
  }

  // 見つかったアニメを画面に表示する
  searchResult.style.display = "block";
  searchTitle.textContent = foundAnime.title;
  searchImage.src = foundAnime.image;
  searchImage.alt = foundAnime.title;
  searchImage.style.display = "block";
});

button.addEventListener("click", function() {
  opening.style.display = "none";
  home.style.display = "none";
  genre.style.display = "grid";
});

// 最初はメイン画面を隠しておく
home.style.display = "none";

// ロゴが表示されてから3秒後に消し始める
setTimeout(function() {
  opening.classList.add("fade-out");

  // ロゴが消えたあとにメイン画面を表示
  setTimeout(function() {
    opening.style.display = "none";
    home.style.display = "block";

    // 文章のアニメーションを開始
    home.classList.add("show-content");
  }, 500);

}, 3200);

/*
allAnimeButton.addEventListener("click", function() {
  const selectedAnime = animeData.filter(function(anime) {
    return animeData;
  });
  
  animeCards.innerHTML = "";

  selectedAnime.forEach(function(anime) {
    const item = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = anime.title;

    item.appendChild(title);
    animeCards.appendChild(item);
    console.log("追加先は同じ？", animeCards === document.querySelector(".anime-cards"));
console.log("追加後の数", animeCards.children.length);
    console.log(animeCards.children.length);
});
    selectedGenre.textContent = "全アニメ";
    genre.style.display = "none";
    animeList.style.display = "block";

console.log("処理終了後の作品数:", animeCards.children.length);
console.log("処理終了後のHTML:", animeCards.innerHTML);
});
*/

genreButtons.forEach(function(genreButton) {
genreButton.addEventListener("click",function() {

    // 条件にあうアニメを選び出す　//
    const selectedAnime = animeData.filter(function(anime) {
      return anime.genres.includes(genreButton.textContent);
    });

    // 
    animeCards.innerHTML = "";


// 以下のコードは、あらかじめ用意したanimedataのデータを使って作品ごとのカードを食っている //
selectedAnime.forEach(function(anime) {
  const item = document.createElement("div");
  item.classList.add("anime-card")

  //ポスター画像を作る//
  const poster = document.createElement("img");
  poster.src = anime.image;
  poster.alt = anime.title;
  poster.classList.add("anime-poster");

  //作品タイトルを作る//
  const title = document.createElement("h3");
  title.textContent = anime.title;

  //カードを追加する//
  item.appendChild(poster);
  item.appendChild(title);
  animeCards.appendChild(item);
});

  selectedGenre.textContent = genreButton.textContent;

  genre.style.display = "grid";
  animeList.style.display = "block";

  });
});

drawButton.addEventListener("click", function() {
  const number = Math.floor(Math.random() * animeData.length);
  const selectedAnime = animeData[number];

  resultTitle.textContent = selectedAnime.title;
  result.style.display = "block"

  if (selectedAnime.image) {
    resultImage.src = selectedAnime.image;
    resultImage.style.display = "block";
  } else {
    resultImage.style.display = "none";
  }
});

const animeData = [
  {
    title: "五等分の花嫁",
    genres: "恋愛",
    image: "images/hanayome.jpg"
  },
{
    title: "冴えない彼女の育て方",
    genres: "恋愛",
    image: "images/saekano.jpg"
  },
{
    title: "夫婦以上、恋人未満",
    genres: "恋愛",
    image: "images/huuhu.jpg"
  },
{
    title: "僕は友達が少ない",
    genres: "恋愛",
    image: "images/haganai.jpg"
  },
{
    title: "１００カノ",
    genres: ["恋愛","ギャグ"],
    image: "images/100kano.png"
  },
{
    title: "甲鉄城のカバネリ",
    genres: "アクション",
    image: "images/kabaneri.jpg"
  },
{
    title: "ダンジョンに出会いを求めているのは間違っているだろうか",
    genres: "アクション",
    image: "images/dannmati.jpg"
  },
{
    title: "進撃の巨人",
    genres: "アクション",
    image: "images/shingeki.png"
  },
{
    title: "ギルティクラウン",
    genres: "アクション",
    image: "images/girukura.jpg"
  },
{
    title: "黄泉のツガイ",
    genres: "アクション",
    image: "images/yominotugi.jpg"
  },
{
    title: "うらみちお兄さん",
    genres: "ギャグ",
    image: "images/uramiti.jpg"
  },
{
    title: "銀魂",
    genres: ["アクション","ギャグ"],
    image: "images/ginntama.jpg"
  },
{
    title: "ぐらんぶる",
    genres: "ギャグ",
    image: "images/gurannburu.jpg"
  },
{
    title: "ギャグ漫画日和",
    genres: "ギャグ",
    image: "images/gyagu.jpg"
  },
  {
    title: "境界の彼方",
    genres: "SF",
    image: "images/kyoukai.jpg"
  },
  {
    title: "ヴァニタスの手記",
    genres: "SF",
    image: "images/shuki.jpg"
  },
  {
    title: "僕だけがいない街",
    genres: "SF",
    image: "images/bokudake.jpg"
  },
{
    title: "不滅のあなたへ",
    genres: ["SF","アクション"],
    image: "images/humetu.jpg"
  },
{
    title: "夏へのトンネル、さよならの出口",
    genres: "SF",
    image: "images/natuheno.jpg"
  },
{
    title: "無職転生",
    genres: ["異世界","アクション"],
    image: "images/mushoku.png"
  },
{
    title: "異世界のんびり農家",
    genres: "異世界",
    image: "images/nouka.png"
  },
{
    title: "とんでもスキルで異世界放浪飯",
    genres: "異世界",
    image: "images/mashi.jpg"
  },
{
    title: "転生したらスライムだった件",
    genres: "異世界",
    image: "images/suraimu.jpg"
  },
{
    title: "史上最強の大魔王、村人Aに転生する",
    genres: "異世界",
    image: "images/murabito.jpg"
  },
{
    title: "盾の勇者の成り上がり",
    genres: "異世界",
    image: "images/tate.jpg"
  },
{
    title: "Angel Beats!",
    genres: "感動",
    image: "images/angel.jpg"
  },
{
    title: "８６",
    genres: ["感動","アクション"],
    image: "images/86.jpg"
  },
{
    title: "あの日見た花の名前を僕たちはまだ知らない",
    genres: "感動",
    image: "images/anohana.jpg"
  },
{
    title: "プラティックメモリーズ",
    genres: "感動",
    image: "images/memorise.jpg"
  },
{
    title: "神様になった日",
    genres: "感動",
    image: "images/kamisama.jpg"
  },
];













