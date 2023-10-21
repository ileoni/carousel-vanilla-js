class Slide
{
    constructor()
    {
        this.element = null;
        this.vertical = true;
        this.toggle = false;
        this.position = {
            x: 0, y: 0, top: 0, left: 0,
        };
    }
    handlerMouseEvents () {
        const events = ['mouseup', 'mousedown', 'mouseleave'];
        events.map(event => {
            this.element.addEventListener(event, ({
                type, pageX, pageY
            }) => {
                if(type === "mousedown") {
                    this.position = {
                        x: pageX,
                        y: pageY,
                        top: this.element.scrollTop,
                        left: this.element.scrollLeft
                    }
                    this.toggle = true;
                } else {
                    this.toggle = false;
                }
            })
        })
    }
    handlerMouseMove () {
        this.element.addEventListener('mousemove', ({
            pageX, pageY
        }) => {
            if(this.toggle) {
                if(this.vertical) {
                    const displacementY = pageY - this.position.y;
                    this.element.scrollTop = this.position.top - displacementY;
                } else {

                    const displacementX = pageX - this.position.x;
                    this.element.scrollLeft = this.position.left - displacementX;
                }
            }
        })
    }
    activated()
    {
        this.handlerMouseEvents();
        this.handlerMouseMove();
    }
}

export default Slide;