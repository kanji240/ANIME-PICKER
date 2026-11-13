const button = document.querySelector(".home button");
const home = document.querySelector(".home");
const genre = document.querySelector(".genre");
const opening = document.querySelector(".opening");
const allAnimeButton = document.querySelector(".all-anime-button");
const genreButtons = document.querySelectorAll(".genre-button");
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
const backButton = document.querySelector("#backButton")
const searchBackButton = document.querySelector("#searchBackButton");
const animeDetail = document.querySelector(".anime-detail");
const detailTitle = document.querySelector("#detailTitle");
const detailImage = document.querySelector("#detailImage");
const detailSynopsis = document.querySelector("#detailSynopsis");
const watchedButtonText= document.querySelector("#watchedButtonText");
const synopsisToggle = document.querySelector("#synopsisToggle");

function searchAnime() {
  const keyword = animeSearch.value.trim();

  // 何も入力されていない場合
  if (keyword === "") {
    return;
  }

  // アニメを探す
  const foundAnime = animeData.find(function(anime) {
    const normalizedkeyword = keyword.normalize("NFKC");

    return (
    anime.title.normalize("NFKC").includes(normalizedkeyword) ||
    (anime.reading || "").includes(normalizedkeyword)
    );
  });
  // normalize("NFKC").includes(keyword.normalize("NFKC"));は、半角、全角でも検索できるようにする

  // アニメが見つからなかった場合
  if (!foundAnime) {
    searchResult.style.display = "block";
    searchTitle.textContent = "作品が見つかりませんでした";
    searchImage.style.display = "none";
    return;
  }

  // 見つかったアニメを表示する
  searchResult.style.display = "block";
  searchTitle.textContent = foundAnime.title;
  searchImage.src = foundAnime.image;
  searchImage.alt = foundAnime.title;
  searchImage.style.display = "block";
}

// 検索ボタンを押したとき
searchButton.addEventListener("click", searchAnime);

// Enterキーを押したとき
animeSearch.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchAnime();
  }
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

  // ポスターをクリックしたとき
  poster.addEventListener("click", function() {

  detailTitle.textContent = anime.title;
  detailImage.src = anime.image;
  detailImage.alt = anime.title;
  detailSynopsis.textContent = anime.synopsis;
  detailSynopsis.classList.remove("is-expanded");
synopsisToggle.textContent = "続きを読む ▼";

  animeList.style.display = "none";
  animeDetail.style.display = "block";

});

  //作品タイトルを作る//
  // const title = document.createElement("h3");
  // title.textContent = anime.title;

  //カードを追加する//
  item.appendChild(poster);
  // item.appendChild(title);
  animeCards.appendChild(item);
});

  selectedGenre.textContent = genreButton.textContent;

  genre.style.display = "none";
  animeList.style.display = "block";

  });
});

const detailBackButton = document.querySelector("#detailBackButton");

detailBackButton.addEventListener("click", function() {
  animeDetail.style.display = "none";
  animeList.style.display = "block";

});

backButton.addEventListener("click", function() {
  animeList.style.display = "none";
  genre.style.display = "grid";
});

searchBackButton.addEventListener("click", function() {
  searchResult.style.display = "none";
  animeSearch.value = "";
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

// リストに入れたあとのチェックアニメーション
watchedButton.addEventListener("click", function() {

  const watchedAnime = JSON.parse(
    localStorage.getItem("watchedAnime") || "[]"
  );

  const currentTitle = detailTitle.textContent;

  const alreadyAdded = watchedAnime.some(function(item) {
    return item.title === currentTitle;
  });

  if (alreadyAdded) {

    const updatedAnime = watchedAnime.filter(function(item) {
      return item.title !== currentTitle;
    });

    localStorage.setItem("watchedAnime", JSON.stringify(updatedAnime));

    watchedButtonText.textContent = "MY LIBRARY";
    watchedButton.classList.remove("is-added");

  } else {

    watchedAnime.push({
      title: currentTitle,
      image: detailImage.src
    });

    localStorage.setItem("watchedAnime", JSON.stringify(watchedAnime));

    watchedButtonText.textContent = "✓ ADDED TO LIBRARY";
    watchedButton.classList.add("is-added");

  }

});

synopsisToggle.addEventListener("click", function() {

  detailSynopsis.classList.toggle("is-expanded");

  if (detailSynopsis.classList.contains("is-expanded")) {
    synopsisToggle.textContent = "閉じる ▲";
  } else {
    synopsisToggle.textContent = "続きを読む ▼";
  }

});

const animeData = [
  {

    title: "五等分の花嫁",
    reading:"ごとうぶんのはなよめ",
    genres: "恋愛",
    image: "images/hanayome.jpg",
    synopsis: "貧乏な高校生・上杉風太郎は、好条件の家庭教師アルバイトを引き受けるが、教え子はなんと同級生の美少女五つ子姉妹だった！全員が「落第寸前」「勉強嫌い」という問題児ばかり。最初は反発されるも、風太郎は彼女たちと向き合い信頼を築いていく。やがて恋心も芽生え、将来の花嫁となる「一人」へと繋がるラブコメ物語。"
  },
{
    title: "冴えない彼女の育て方",
    reading:"さえないかのじょのそだてかた",
    genres: "恋愛",
    image: "images/saekano.jpg",
    synopsis: "オタク高校生の安芸倫也は、桜の坂道で出会った目立たないクラスメイト・加藤恵をモデルに同人ゲーム制作を決意。美少女イラストレーターの幼なじみ・英梨々や人気ラノベ作家の先輩・詩羽を巻き込み、サークルを結成する。個性豊かな仲間と衝突しながら、冴えない彼女を最高のヒロインへと育て上げる青春ラブコメ。"
  },
{
    title: "夫婦以上、恋人未満",
    reading:"ふうふいじょう、こいびとみまん",
    genres: "恋愛",
    image: "images/huuhu.jpg",
    synopsis: "夫婦以上、恋人未満。』は、高校の伝統授業「夫婦実習」で強制的にペアを組まされた、地味な男子高校生・薬院次郎と派手なギャル・渡辺星のラブコメディです。お互いに別の好きな人がいる2人は、優秀な成績を収めて与えられる「パートナー交換の権利」を得るため、仕方なく「理想の夫婦」を演じる共同生活を始める"
  },
{
    title: "僕は友達が少ない",
    reading:"ぼくはともだちがすくない",
    genres: "恋愛",
    image: "images/haganai.jpg",
    synopsis: "友達ゼロの主人公：長谷川小鷹は、目つきの悪さと金髪により周囲から恐れられていた。聖クロニカ学園に転校しても相変わらずぼっちであったが、同じく友達ゼロの三日月夜空と出会い『隣人部』を設立することに。理事長の娘である柏崎星奈をはじめとする個性的な仲間と共に、今日も『談話室4』では騒がしい日常が繰り広げられる。残念系美少女との青春ラブコメディ"
  },
{
    title: "１００かの",
    genres: ["恋愛","コメディ"],
    image: "images/100kano.png",
    synopsis: "100人の女性に告白しては振られてきた愛城恋太郎。中学卒業の日に彼は神社の神様からお互いが好きで好きでたまらなくなる“運命の人”が100人いると告げられる。高校生になった恋太郎は早速2人の“運命の人”と出会い、その2人から告白される。しかし、恋太郎の“運命の人”はあと98人いる。。。"
  },
{
    title: "甲鉄城のカバネリ",
    reading:"こうてつじょうのかばねり",
    genres: "アクション",
    image: "images/kabaneri.jpg",
    synopsis: "噛んだ人間をウイルス感染させ同族に変える怪物・カバネに覆い尽くされた世界。かつてカバネによって妹を殺された少年・生駒が、独自の対カバネ武器・ツラヌキ筒やカバネウイルスの脳への侵食を止める"
  },
{
    title: "ダンジョンに出会いを求めているのは間違っているだろうか",
    genres: "アクション",
    image: "images/dannmati.jpg",
    synopsis: "巨大な地下迷宮がある都市オラリオを舞台に、女神ヘスティアと零細派閥を組む新米冒険者ベル・クラネルの成長を描くファンタジーです。ある日、最強の剣姫アイズに命を救われて一目惚れしたベルは、彼女に追いつくため、想いが生む特別なスキルを武器に異次元のスピードで成長し、仲間と共に数々の強敵へ挑む。"
  },
{
    title: "進撃の巨人",
    reading:"しんげきのきょじん",
    genres: "アクション",
    image: "images/shingeki.png",
    synopsis: "人類は突如出現した「巨人」により滅亡の淵に立たされた。生き残った人類は「ウォール・マリア」、「ウォール・ローゼ」、「ウォール・シーナ」という巨大な三重の城壁（甕城）の内側に生活圏を確保することで100年の間、辛うじてその命脈を保っていた"
  },
{
    title: "ギルティクラウン",
    genres: "アクション",
    image: "images/girukura.jpg",
    synopsis: "西暦2039年の日本（東京）。人の心から武器を取り出す「王の能力」を得た少年・集が、レジスタンスの少女・いのりや仲間と共に、ウイルスで荒廃しGHQに支配された日本の解放を目指して過酷な運命に立ち向かうSFアクション物語。（96文字）"
  },
{
    title: "黄泉のツガイ",
    reading:"よみのつがい",
    genres: "アクション",
    image: "images/yominotugi.jpg",
    synopsis: "山奥にある東村（ひがしむら）で明け方、男女の双子が産まれた。「夜と昼を別つ双子」（よるとひるをわかつふたご）の誕生に村人はおののく。東村では「夜と昼を別つ双子」は封（ふう）と解（かい）の力を得るとされていた。ユルはアサたちとともにツガイ使いたちとの戦いに身を投じることになる。"
  },
{
    title: "うらみちお兄さん",
    genres: "コメディ",
    image: "images/uramiti.jpg",
    synopsis: "MHKの教育番組『ママンとトゥギャザー』の体操のお兄さん、表田裏道（通称・うらみちお兄さん）は、子どもたちに笑顔を振りまく優しいお兄さんだが、しんどい、辛い、何もしたくないといった大人の社会に対する暗澹とした「裏の顔」が時々垣間見えてしまう。"
  },
{
    title: "銀魂",
    reading:"ぎんたま",
    genres: ["アクション","コメディ"],
    image: "images/ginntama.jpg",
    synopsis: "基本的には主人公の銀時たちと周囲の面々が繰り広げる1話から3話程度で完結するドタバタギャグコメディが描かれることが多いが、その中に混じって銀時の過去やそれにまつわる因縁を軸にしたストーリーが進められていく形となっている。"
  },
{
    title: "ぐらんぶる",
    genres: "コメディ",
    image: "images/gurannburu.jpg",
    synopsis: "海が近くにある大学への進学を機に、叔父が経営するダイビングショップ「グランブルー」に居候することになった北原伊織。そこで出会ったのはとびきりの美女、そして酒とスキューバダイビングと裸を愛する屈強な男たちだった。そして、元が馬鹿で無神経かつ鈍感な性格の伊織は彼らとの暴走にのめり込んでいく。"
  },
{
    title: "ギャグ漫画日和",
    genres: "コメディ",
    image: "images/gyagu.jpg",
    synopsis: "歴史上の偉人や名作のパロディ、日常の不条理をテーマにした1話完結のショートギャグアニメ。 聖徳太子と小野妹子、松尾芭蕉と河合曽良といった歴史上の人物が現代的な感覚やシュールな言動でボケとツッコミを繰り広げられる。"
  },
  {
    title: "境界の彼方",
    reading:"きょうかいのかなた",
    genres: "SF",
    image: "images/kyoukai.jpg",
    synopsis: "ある日、半妖夢で不死身の身体を持つ少年神原秋人は、今にも校舎の屋上から飛び降りそうな少女栗山未来を見つけ、助けようとする。しかし、彼女は妖夢を討伐して生計を立てる異界士であった。時に協力しながら妖夢討伐を行う2人であったが、やがて2人は大地主である名瀬家を巻き込んだ事件に関わっていく[1][6]。"
  },
  {
    title: "ヴァニタスの手記",
    genres: "SF",
    image: "images/shuki.jpg",
    synopsis: "蒸気機関による技術が発達し、吸血鬼(ヴァンピール)が存在する19世紀のフランス。吸血鬼の青年ノエは、吸血鬼に呪いを振り撒く魔導書「ヴァニタスの書」を探すためにパリへ向かい、その途中の飛行船の中である事件に遭遇した。その最中、吸血鬼の専門医を自称するヴァニタスと名乗る青年がノエの前に現れるが、彼はノエの探す「ヴァニタスの書」を手にしていた。その本は吸血鬼の命そのものとも言える、刻まれた真名を崩して狂わせることも、そして復元して正気に戻すこともできる機械仕掛けの魔導書。それを巡る人間と吸血鬼たちの「救い」の物語。"
  },
  {
    title: "僕だけがいない街",
    genres: "SF",
    image: "images/bokudake.jpg",
    synopsis: "事件や事故の直前に時間が巻き戻る現象「リバイバル」を持つ青年・藤沼悟。何者かに母を殺害された際、能力が暴走して18年前の小学5年生時代へタイムリープする。悟は母の死の真相と、当時起きた連続誘拐殺人事件の被害者である同級生・雛月加代らを救うため、過去を変えようと奔走するタイムリープ・サスペンス。"
  },
{
    title: "不滅のあなたへ",
    reading:"ふめつ",
    genres: ["SF","アクション"],
    image: "images/humetu.jpg",
    synopsis: "観察者によって、地上へ”球”が投げ込まれた。その”球”はありとあらゆるものの姿をうつし、変化することができる。”それ”は石、コケへと姿を変え、南方から現れたオオカミへと姿を変える。あてもなく歩き続けると、一人の少年に出会う。少年は豊かな土地に夢を馳せ、旅を始めるも挫折。志半ば命が尽きる。”それ”は少年の姿を獲得し、あらゆる刺激を求め、歩きはじめた。"
  },
{
    title: "夏へのトンネル、さよならの出口",
    genres: "SF",
    image: "images/natuheno.jpg",
    synopsis: "主人公の塔野カオルは電車の中で、女子たちが話をしているのを聞いた。それは、「ウラシマトンネルに入れば、欲しいものがなんでも手に入るが、その代わりに年を取ってしまう」という噂であった。"
  },
{
    title: "無職転生",
    reading:"むしょくてんせい",
    genres: ["異世界","アクション"],
    image: "images/mushoku.png",
    synopsis: "現代日本に暮らす20年近く引きこもる34歳無職の主人公は、親が死去したのに伴い兄弟に見限られて家を追い出されてしまう。家を出た後、トラックに轢かれかけた高校生3人を助けようとして事故死してしまう。ところが目が覚めた時、彼は赤ん坊になっていた。そして剣や魔法を目の当たりにし、異世界に転生したことに気づく。ルーデウス・グレイラットに転生した主人公は前世での後悔を振り返り、魔法を覚え、家族を大事にし、懸命に生きて、前世のトラウマを乗り越えて成長していく."
  },
{
    title: "異世界のんびり農家",
    reading:"いせかいのんびりのうか",
    genres: "異世界",
    image: "images/nouka.png",
    synopsis: "ブラック企業で酷使され闘病の末に若くして亡くなった青年・街尾火楽（ヒラク）が、神様から健康な肉体とどんな形にも変化する「万能農具」を授けられて異世界転生し、魔物だらけの危険な森で理想のスローライフ（農業）開拓に挑むファンタジー作品。"
  },
{
    title: "とんでもスキルで異世界放浪飯",
    genres: "異世界",
    image: "images/mashi.jpg",
    synopsis: "料理が趣味のごく平凡なサラリーマン向田剛志（ムコーダ）は、「勇者召喚」によって3人の少年少女たちと共に、異世界「レイセヘル王国」に召喚されてしまう。そこは魔王や魔物が存在し、冒険者たちが活躍する剣と魔法のファンタジー世界であった。だが、ムコーダの固有スキル「ネットスーパー」は、お金を支払うことで元の世界から様々な商品をお取り寄せできる上に、元の世界の食材を食べると「ステータスが一定時間アップする」という、凄まじいチート能力を秘めていた。"
  },
{
    title: "転生したらスライムだった件",
    reading:"てんせいしたら",
    genres: "異世界",
    image: "images/suraimu.jpg",
    synopsis: "通り魔に刺され異世界でスライムに転生したサラリーマン・三上悟は、リムルという名を得て天災級ドラゴン・ヴェルドラと友になる。相手の能力を奪うユニークスキルを駆使し、ゴブリンや鬼人など種族の垣根を越えた多くの仲間たちと出会い、誰もが楽しく暮らせる国づくりを目指して奔走する、爽快な異世界転生ファンタジー。"
  },
{
    title: "史上最強の大魔王、村人Aに転生する",
    reading:"しじょうさいきょうのだいまおう",
    genres: "異世界",
    image: "images/murabito.jpg",
    synopsis: "強大すぎる力ゆえの孤独に耐えかね、平凡な人生に憧れた史上最強の魔王ヴァルヴァトス。数千年後の未来へ「村人A」の少年アードとして転生するが、魔法が衰退した現代では常識外れの強さが隠しきれず、魔法学園の仲間たちと共に波乱の日常を送ることになる。"
  },
{
    title: "盾の勇者の成り上がり",
    reading:"たてのゆうしゃのなりあがり",
    genres: "異世界",
    image: "images/tate.jpg",
    synopsis: "図書館で四勇者について書かれた本を手にとった大学生の岩谷尚文は、盾の勇者として異世界にある国家メルロマルクに召喚された。そこには、剣の勇者天木錬、弓の勇者川澄樹、槍の勇者北村元康も召喚されていた。次元の亀裂から魔物が大量に湧き出すという波から世界を守るために仲間を連れて旅をすることを頼まれる。"
  },
{
    title: "Angel Beats!",
    genres: "感動",
    image: "images/angel.jpg",
    synopsis: "少年・音無結弦は自分の苗字以外の記憶を失った状態で、真夜中の「学園」で目覚める。音無は銃を構える少女・仲村ゆりと出会い、ここが死後の世界であると教えられ、彼女がリーダーを務める死んだ世界戦線（略称SSS、以降、戦線）に勧誘される。そのためこの世界を作った“神”の手先と考えられる、特殊能力を持つ天使と呼ばれる生徒会長と戦いを続けていた。なりゆきで戦線に加わった音無は、学園生活を送りつつ、戦線のメンバーと共にあらゆる作戦で天使に挑む。"
  },
{
    title: "８６",
    genres: ["感動","アクション"],
    image: "images/86.jpg",
    synopsis: "無人機による戦争を謳うサンマグノリア共和国。しかし実際は、人権を奪われた〈エイティシックス〉の少年少女たちが戦場に送られていた。最前線の隊長シンと後方の指揮官レーナは、国の欺瞞と死の運命に直面しながら通信越しに心を通わせ、それぞれの誇りを胸に過酷な戦場へと立ち向かうSFミリタリー"
  },
{
    title: "あの日見た花の名前を僕たちはまだ知らない",
    genres: "感動",
    image: "images/anohana.jpg",
    synopsis: "幼少期の事故で仲間「めんま」を亡くし、心の傷から疎遠になった6人組「超平和バスターズ」。高校生の夏、引きこもりの主人公・じんたんの前に幽霊となっためんまが現れる。彼女自身の忘れた「願い」を叶えるため、再び集まった仲間たちは過去の後悔や想いと向き合い、止まっていた時間が動き出す切ない青春群像劇。"
  },
{
    title: "プラティックメモリーズ",
    genres: "感動",
    image: "images/memorise.jpg",
    synopsis: "心を持つアンドロイド「ギフティア」が人間と共存する近未来が舞台。約9年4ヶ月の寿命を迎えたギフティアを回収する部署「ターミナルサービス」に就職した青年・ツカサは、自身も寿命が迫るギフティアの少女・アイラとコンビを組むことに。パートナーとして働く中で惹かれ合い、限られた時間と切ない運命に向き合う物語。"
  },
{
    title: "神様になった日",
    reading:"かみさまになったひ",
    genres: "感動",
    image: "images/kamisama.jpg",
    synopsis: "高校最後の夏休み、受験生の成神陽太の前に全知の神を自称する少女・ひなが現れ、「30日後に世界は終わる」と告げる。陽太はひなの不思議な力に振り回されながらも、仲間と賑やかな日々を過ごす。だが期限が迫る中、ひなは突如姿を消し、彼女が抱える過酷な秘密が明かされる。陽太は心を閉ざした彼女を救うため奔走する。"
  }
];