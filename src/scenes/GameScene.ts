import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {

    drawGraphic ?: Phaser.GameObjects.Graphics;
    drawGraphics ?: Phaser.GameObjects.Graphics;
    drawRadius : number = 2;
    initPoints : Array<Phaser.Geom.Point>;
    randomPoint ?: Phaser.Geom.Point;
    randomTimes : number = 8000;
    _countText ?: Phaser.GameObjects.Text;

    constructor() {
        super('GameScene');
        
        this.initPoints = [];
    }
    
    init(){
        this.drawGraphics = this.add.graphics({ fillStyle: { color: 0x2266aa } });
    }

    preload()
    {
    }

    create()
    {
        this._countText = this.add.text(
            50, 200,
            `Remain Dots : ${this.randomTimes}`,
            {
                color: '#000',
                fontSize: '2em',
                fontStyle: 'bolder'
            }
        );

        let len = 300;
        let point1 = new Phaser.Geom.Point(400, 100);

        // Draw a triangle like this:
        //         /\
        //        /  \
        //       /    \
        //      /______\

        let nextPointX = 0;
        let nextPointY = 0;

        nextPointX = point1.x - Math.sin(Math.PI/180*30) * len;
        nextPointY = point1.y + Math.cos(Math.PI/180*30) * len;

        let point2 = new Phaser.Geom.Point(nextPointX, nextPointY); 

        nextPointX = point1.x + Math.sin(Math.PI/180*30) * len;

        let point3 = new Phaser.Geom.Point(nextPointX, nextPointY); 

        this.initPoints.push(point1);
        this.initPoints.push(point2);
        this.initPoints.push(point3);

        this.drawGraphics?.fillPointShape(point1, this.drawRadius);
        this.drawGraphics?.fillPointShape(point2, this.drawRadius);
        this.drawGraphics?.fillPointShape(point3, this.drawRadius);

        let triangle = new Phaser.Geom.Triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
        this.randomPoint = triangle.getRandomPoint();

        this.drawGraphics?.fillPointShape(new Phaser.Geom.Point(this.randomPoint!.x, this.randomPoint!.y), this.drawRadius);
    
    }

    update() {

        // loop some times to display
        if (this.randomTimes > 0){
            let randIdx = Phaser.Math.Between(0, 2);
            let centerPoint = Phaser.Geom.Point.Interpolate(this.initPoints[randIdx], this.randomPoint!, 0.5);

            this.randomPoint = centerPoint;

            this.drawGraphics?.fillPointShape(new Phaser.Geom.Point(this.randomPoint!.x, this.randomPoint!.y), this.drawRadius);
            
            this.randomTimes--;

            this._countText?.setText(`Remain Dots : ${this.randomTimes}`);
        }
    }
}