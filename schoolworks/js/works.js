'use strict';
const links = document.querySelectorAll(".--item_link");
const popWrap = document.querySelector(".popup__wrap");
const poplinks = document.querySelectorAll(".provi__popup");
const rmbtn = document.querySelector(".__pop__rm");
const popBg = document.querySelector('#popup__bg');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const Carousels = document.querySelectorAll('.carousel');

const slideBtn = document.querySelector('.slidebtn_wrap');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
//ポップアップ開く関数
function popOpen(obj) {
    obj.classList.add('is-open');
}
//ポップアップ閉じる関数
function popClose(obj) {
    obj.classList.remove('is-open');
}
//それぞれのサムネイルで処理を分ける
links.forEach(el => {
    let index = [].slice.call(links).indexOf(el);
    //クリックしたサムネイルの中身の画像を取得する
    let carouItems = Carousels[index].querySelectorAll('.__imgbox__img');
    //その長さも取得
    let carLength = carouItems.length;
    el.addEventListener('click', () => {
        popOpen(poplinks[index]);
        popOpen(popWrap);
        popOpen(popBg);
        popOpen(Carousels[index]);
        //画像の数が1だったらスライドボタン必要ないので消す
        if (Carousels[index].querySelectorAll('.__imgbox__img').length === 1) { slideBtn.classList.add('is-hidden'); } else { slideBtn.classList.remove('is-hidden'); }
        rmbtn.addEventListener('click', () => {
            popClose(poplinks[index]);
            popClose(popWrap);
            popClose(popBg);
            popClose(Carousels[index]);
            slideBtn.classList.add('is-visible');
            // 動画は止める
            document.querySelector('.--video').pause();
            // 初期化↓
            for (let j = 0; j < carLength; j++) { carouItems[j].classList.remove('open'); }
        });
        popBg.addEventListener('click', () => {
            popClose(poplinks[index]);
            popClose(popWrap);
            popClose(popBg);
            popClose(Carousels[index]);
            slideBtn.classList.add('is-visible');
            document.querySelector('.--video').pause();
            // 初期化↓
            for (let j = 0; j < carLength; j++) { carouItems[j].classList.remove('open'); }
        });

        // 戻る進むボタンの切り替え
        function showSlideBtn(b) { b.classList.toggle('is-visible'); }

        Carousels[index].addEventListener('click', () => showSlideBtn(slideBtn));
        //サムネクリックで1番目の画像を表示
        carouItems[0].classList.add('open');

        let x = 0;
        //戻るボタンの処理
        prev.addEventListener('click', () => {
            if (x === 0) {
                // スライドしてインデックス番号が0に達したらループ
                x = carLength - 1;
                carouItems[carLength - 1].classList.add('open');
                carouItems[0].classList.remove('open');
            } else {
                carouItems[x].classList.remove('open');
                carouItems[x - 1].classList.add('open');
                x -= 1;
            }
        });
        //進むボタンの処理
        next.addEventListener('click', () => {
            if (x === carLength - 1) {
                // スライドしてインデックス番号がmaxに達したらループ
                x = 0;
                carouItems[0].classList.add('open');
                carouItems[carLength - 1].classList.remove('open');
            } else {
                carouItems[x].classList.remove('open');
                carouItems[x + 1].classList.add('open');
                x += 1;
            }
        });

    }, false);

    // 拡大縮小
    // let y = 1;

    // function expan(el) {
    //     y += 0.1;
    //     el.style.transform = `scale(${y})`;
    // }

    // function reduct(el) {
    //     y -= 0.1;
    //     el.style.transform = `scale(${y})`;
    // }

    // minus.addEventListener('click', () => {
    //     reduct(Carousels[index]);
    // });

    // plus.addEventListener('click', () => {
    //     expan(Carousels[index]);
    // });

});