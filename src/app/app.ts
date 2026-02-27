import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from './Player.interface';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('flip7');

  addPlayer() {
    if (this.newPlayer) {
      this.players.push({
        name: this.newPlayer,
        score: 0,
        id: this.currentId++,
        marks: true,
        scoreToAdd: '',
      });
      this.newPlayer = '';
    }
  }

  deletePlayer(id: number) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  score() {
    this.phase = 'score';
  }

  mark() {
    for (let player of this.players) {
      let scoreToAdd = player.scoreToAdd;
      for (let val of scoreToAdd.split(' ')) {
        player.score += +val;
      }
      player.scoreToAdd = '';
      player.marks = true;
    }

    let playersAbove200 = this.players.filter((player) => player.score >= 200);
    if (playersAbove200.length > 0) {
      this.phase = 'end';
      let maxScore = Math.max(...playersAbove200.map((player) => player.score));
      this.winners = playersAbove200.filter((player) => player.score === maxScore);
      this.winnersText = this.winners.map((winner) => winner.name).join(' et ');
    }
  }

  phase = 'init';
  currentId = 0;
  newPlayer = '';
  winnersText = '';
  players: Player[] = [];
  winners: Player[] = [];
}
