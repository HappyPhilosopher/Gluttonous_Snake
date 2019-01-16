'use strict';
(function() {
    let that = null;
    class Game {
        constructor(map) {
            this.food = new Food();
            this.snake = new Snake();
            this.map = map;
            that = this;
        }

        init(map) {
            this.food.init(this.map);
            this.snake.init(this.map);
            this.snakeMove(this.food, this.map);
            this.control();
        }

        snakeMove(food, map) {
            let timer = setInterval(function() {
                this.snake.move(food, map);
                this.snake.init(map);
                // 限制小蛇移动位置
                let maxX = this.map.offsetWidth / this.snake.width;
                let maxY = this.map.offsetHeight / this.snake.width;
                let headX = this.snake.body[0].x;
                let headY = this.snake.body[0].y;
                // 如果蛇头撞到限制空间，清除定时器并弹出“GAME OVER!”
                if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                    alert('GAME OVER!');
                    clearInterval(timer);
                }
                // 如果蛇头撞到蛇身，清除定时器并弹出“GAME OVER!”
                for (let i = this.snake.body.length - 1; i > 0; i--) {
                    if (headX === this.snake.body[i].x && headY === this.snake.body[i].y) {
                        alert('GAME OVER!');
                        clearInterval(timer);
                    }
                }
            }.bind(that), 100);
        }

        control() {
            document.addEventListener('keydown', function(event) {
                event = event || window.event;
                switch (event.keyCode) {
                    case 37:
                        this.snake.direction = 'left';
                        break;
                    case 38:
                        this.snake.direction = 'top';
                        break;
                    case 39:
                        this.snake.direction = 'right';
                        break;
                    case 40:
                        this.snake.direction = 'bottom';
                        break;
                }
            }.bind(that), false);
        }
    }

    window.Game = Game;
}());