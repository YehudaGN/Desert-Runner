class Score {
    constructor (text, x, y, a, color, size) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.a = a;
        this.color = color;
        this.size = size;
      }
    
      Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
      }
}

export default Score;