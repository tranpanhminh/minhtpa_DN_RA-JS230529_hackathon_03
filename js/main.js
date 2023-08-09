"use strict";
// Tạo Class PlayerManagement
class PlayerManagement {
    constructor() {
        this.players = this.initPlayers();
        this.renderPlayers();
        this.updateRanking();
    }
    // Database Player ban đầu
    initPlayers() {
        const players = [
            { name: "Minh Cường", point: 0, ranking: "no-ranking" },
            { name: "Quốc Hải", point: 5, ranking: "no-ranking" },
            { name: "Phú Hoàng", point: 10, ranking: "no-ranking" },
        ];
        if (!localStorage.getItem("players")) {
            localStorage.setItem("players", JSON.stringify(players));
        }
        return JSON.parse(localStorage.getItem("players") || "");
    }
    // Hàm tổng điểm của Player
    sumPoint(players) {
        let sum = 0;
        for (let i = 0; i < players.length; i++) {
            sum += Number(players[i].point);
        }
        return sum;
    }
    // Hàm Render Player
    renderPlayers() {
        const players = this.players;
        const sum = this.sumPoint(players);
        const pointBoardElement = document.querySelector(".point-board");
        let pointBoardElementContent = `<table>
      <tr>
          <td>Players:</td>
          <td>${players.length}</td>
      </tr>
      <tr>
          <td>Total Points:</td>
          <td>${sum}</td>
      </tr>
    </table>`;
        const mainElement = document.querySelector("main");
        let mainElementContent = "";
        if (players.length > 0) {
            for (let i = 0; i < players.length; i++) {
                mainElementContent += `<section class="player-info">
                <div class="group-icon">
                <button class="remove-btn" onclick="playerManagement.handleRemove(${i})">x</button>
                    <i class="fa-solid fa-trophy ${players[i].ranking}" id="trophy"></i>
                    <p class="player-name">${players[i].name}</p>
                </div>
          
                <div class="point-grade">
                    <button class="minus-btn" onclick="playerManagement.handleMinus(${i})">-</button>
                    <span class="point pg">${players[i].point}</span>
                    <button class="plus-btn" onclick="playerManagement.handlePlus(${i})">+</button>
                </div>
            </section>`;
            }
        }
        else {
            mainElementContent += `<div class="no-player-notification">Không còn người chơi</div>`;
            const toastLiveExample = document.getElementById("liveToastNotify");
            bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
        }
        pointBoardElement.innerHTML = pointBoardElementContent;
        mainElement.innerHTML = mainElementContent;
    }
    // Hàm Set Data lên Local
    savePlayers() {
        localStorage.setItem("players", JSON.stringify(this.players));
    }
    // Hàm Add Player
    handleAdd() {
        const inputPlayerName = document.querySelector(".input-player");
        const playerName = inputPlayerName.value.trim();
        // Validate không được phép nhập số
        if (/^[\p{L} ]+$/u.test(playerName)) {
            const newPlayer = {
                name: playerName,
                point: 0,
                ranking: "no-ranking",
            };
            this.players.push(newPlayer);
            this.savePlayers();
            inputPlayerName.value = "";
            this.renderPlayers();
            // Hiển thị thông báo sau khi Add
            const toastLiveExample = document.getElementById("liveToastNotify");
            const changeToastBody = document.querySelector(".toast-body");
            changeToastBody.innerHTML = "Đã thêm người chơi";
            bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
        }
        else {
            const toastLiveExample = document.getElementById("liveToastNotify");
            const changeToastBody = document.querySelector(".toast-body");
            changeToastBody.innerHTML = "Tên người chơi không hợp lệ!";
            bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
        }
    }
    // Hàm tăng điểm
    handlePlus(i) {
        this.players[i].point++;
        this.savePlayers();
        this.updateRankingAndRender();
    }
    // Hàm giảm điểm
    handleMinus(i) {
        this.players[i].point--;
        if (this.players[i].point < 0) {
            this.players[i].point = 0;
        }
        this.savePlayers();
        this.updateRankingAndRender();
    }
    // Hàm tìm kiếm Player cao điểm và cập nhật Ranking
    updateRanking() {
        let maxPoint = 0;
        // Tìm Player có điểm cao nhất
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].point > maxPoint) {
                maxPoint = this.players[i].point;
            }
        }
        // Set Ranking cho thành viên có điểm cao nhất
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].point === maxPoint) {
                this.players[i].ranking = "top-ranking";
            }
            else {
                this.players[i].ranking = "no-ranking";
            }
            if (this.players[i].point === 0) {
                this.players[i].ranking = "no-ranking";
            }
        }
        this.savePlayers();
        this.renderPlayers();
    }
    // Hàm cập nhật Ranking và Ranking
    updateRankingAndRender() {
        this.updateRanking();
        this.renderPlayers();
    }
    // Function xóa Player
    handleRemove(i) {
        this.players.splice(i, 1);
        this.savePlayers();
        this.renderPlayers();
        const toastLiveExample = document.getElementById("liveToastNotify");
        const changeToastBody = document.querySelector(".toast-body");
        changeToastBody.innerHTML = "Đã xóa người chơi";
        bootstrap.Toast.getOrCreateInstance(toastLiveExample).show();
    }
}
const playerManagement = new PlayerManagement();
