let height = 6; //보드의 높이
let width = 5; //보드의 너비
let row = 0; //사용자가 입력한 줄 위치
let col = 0; //사용자가 입력한 열 위치

let gameOver = false;
//let word = "SQUID";
let wordList = ["APPLE", "SQUID", "RAISE","MYSQL","BOARD"];
let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase(); 
//Math.random: 0~1 사이 소수점 출력 Math.fllor : 소수점 날림 
console.log(word);

window.onload = function(){
    intialize();
}

function intialize() {

    // 보드판 만들기
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile"> </span>
            let tile = document.createElement("span"); //스팬 태그 만들기
            tile.id = r.toString() + "-" + c.toString(); //0-0, 0-1, ..., 6-5
            tile.classList.add("tile"); //타일 태그 추가하기
            tile.innerText = "";
            document.getElementById("board").appendChild(tile); //보드 태그에 tile태그 추가
        }
    }

    //키보드판 만들기
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for(let i=0; i <keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for(let j=0; j< currRow.length; j++){
            let keyTile = document.createElement("div");
            let key =currRow[j];
            keyTile.innerText = key;

            if(key == "Enter"){
                keyTile.id="Enter";
                
            }
            else if(key == "⌫"){
                keyTile.id="Backspace";
            }
            else if("A" <= key && key <= "Z"){
                keyTile.id = "Key" + key // "Key" + "A"
            }

            keyTile.addEventListener("click", processKey);

            if(key == "Enter"){
                keyTile.classList.add("enter-key-tile");
            } else{
                keyTile.classList.add("key-tile");
            }

            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }

    //누르면 이벤트 발생 
    document.addEventListener("keyup", (e) => { //e: 매개변수
        processInput(e); // 사용자가 키보드를 누르는 거 인식하고 동작하는 메소드

    })
}


function processKey() {
    let e = {"code" : this.id};
    processInput(e);
    update();
}


function processInput(e) {
    if (gameOver) return; 

        // alert(e.code); 키를 누르면 "KeyA, keyZ" 형식으로 alert
        if ("KeyA" <= e.code && e.code <= "KeyZ") { //A~Z 까지의 알파벳만 반응
            if (col < width) { 
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") { //비어있다면
                    currTile.innerText = e.code[3]; // e.code[3]: KeyA -> A만 입력
                    col += 1; //열 +1
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }

            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update(); //엔터 누르면 동작하는 메서드
            row += 1; //다음 줄
            col = 0; //열은 0번째로
        }


        if (!gameOver && row == height) { //게임이 끝나지 않고 6번의 기회를 다 쓰면
            gameOver = true; // 게임이 끝나고
            document.getElementById("answer").innerText = "정답:" +word;
        }

}

//Enter 눌렀을 때
function update() {
    //입력한 값이 맞는지 확인
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present"); //노란색 타일이 있으면 제거하고
            keyTile.classList.add("correct"); //초록 타일로 교체
            correct += 1;

        } // Is it in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.add("present"); //노란색 타일
            
        } // Not in the word
        else {
            currTile.classList.add("absent");
        }
        
        //5개의 값이 모두 맞으면
        if (correct == width) {
            gameOver = true; //게임 끝
            document.getElementById("answer").innerText = "WOW! Bingo!";
        }

    }
}