'use strict';
(function() {
    let elements = [];

    class Snake {
        constructor(width = 20, height = 20, direction = 'right') {
            this.width = width;
            this.height = height;
            this.direction = direction;
            this.body = [
                {x: 3, y: 2, color: 'red'},
                {x: 2, y: 2, color: 'orange'},
                {x: 1, y: 2, color: 'orange'}
            ];
        }

        init(map) {
            this.removeSelf();

            this.body.forEach((item, index) => {
                let div = document.createElement('div');
                map.appendChild(div);
                div.style.position = 'absolute';
                div.style.left = item.x * this.width + 'px';
                div.style.top = item.y * this.height + 'px';
                div.style.width = this.width + 'px';
                div.style.height = this.height + 'px';
                div.style.backgroundColor = item.color;

                elements.push(div);
            });
        }

        removeSelf() {
            // 保证小蛇移动时最先删除的是尾巴
            let i = elements.length - 1;
            for (; i >= 0; i--) {
                let ele = elements[i];
                ele.parentNode.removeChild(ele);
                elements.splice(i, 1);
            }
        }

        move(food, map) {
            // 小蛇身体移动方式
            let i = elements.length - 1;
            for (; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }

            // 判断方向，方向改变，小蛇头的方向随之改变
            switch (this.direction) {
                case 'right':
                    this.body[0].x++;
                    break;
                case 'left':
                    this.body[0].x--;
                    break;
                case 'top':
                    this.body[0].y--;
                    break;
                case 'bottom':
                    this.body[0].y++;
                    break;
            }

            // 判断小蛇是否吃到了食物，吃到则在蛇尾添加一段（样式为原蛇尾的样式），然后初始化食物
            let headX = this.body[0].x * this.width;
            let headY = this.body[0].y * this.height;
            if (headX === food.x && headY === food.y) {
                let snake_tail = this.body[this.body.length - 1];
                this.body.push({
                    x: snake_tail.x,
                    y: snake_tail.y,
                    color: snake_tail.color
                });
                food.init(map);
            }
        }
    }

    window.Snake = Snake;
}());
