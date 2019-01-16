'use strict';
(function() {
    let elements = [];

    // 创建食物对象
    class Food {
        constructor(width = 20, height = 20, x = 0, y = 0, color = 'green') {
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.color = color;
        }

        init(map) {
            this.removeSelf();
            let div = document.createElement('div');
            map.appendChild(div);
            div.style.position = 'absolute';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = this.color;
            this.x = Number.parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
            this.y = Number.parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
            div.style.left = this.x + 'px';
            div.style.top = this.y + 'px';
            elements.push(div);
        }

        removeSelf() {
            elements.forEach((item, index) => {
                item.parentNode.removeChild(item);
                elements.splice(index, 1);
            });
        }
    }

    window.Food = Food;
}());