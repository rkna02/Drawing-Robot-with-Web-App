var al;
var Wrapper = {
  width: 76,
  height: 150,
  images: [],
  bgColor: '#cba3e9',
  
  // bgColor: '#ffffff',
  getElement(id) {
    var element = document.getElementById(id);
    if (element) {
      return element;
    }
    element = document.getElementsByName(id);
    if (element) {
      return element[0];
    }
    element = document.getElementsByClassName(id);
    if (element) {
      return element;
    }
    element = document.getElementsByTagName(id);
    if (element) {
      return element[0];
    }
    return null;
  },
  fillText(ctx, text) {
    // if(text==/^[a-z]*$/){
    //   text = text.toLocaleUpperCase();
    // } else if(i==/^[A-Z]*$/){
    //   text = text;
    // }
    text = /^[a-zA-Z]*$/.test(text) ? text.toLocaleUpperCase() : text;
    //ctx.rotate(Math.PI / 5);
    // ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.font = 'Bold 20px Microsoft JhengHei';
    ctx.translate(20, 20);
    ctx.fillText(text.slice(0, 1), 0, 0);
  },

  
  drawImage(text) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var image = new Image();
    var imageIndex = Math.floor(Math.random() * 10);
    var url = this.images[imageIndex];
    image.src = url;

    canvas.width = this.width;
    canvas.height = this.height;
    var self = this;
    var self = this;
    return new Promise(function (resolve) {
      image.onload = function () {
        var wScale = self.width / image.width;
        var yScale = self.height / image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * wScale, image.height * yScale);
        self.fillText(ctx, text);
        resolve(canvas);
      };
    });
  },
  

  resetBgColor() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },

  btn_submit() {
    var self = this;
    let content = this.getElement('content');
    if (!content.value) {
      return;
    }
    // if (content.value.length > 44) {
    //   return alert('The number of words entered cannot exceed 40.');
    // }
    
    if(al) {
      alert('invaild input, please enter only characters');
    }
    const aList = content.value.split('');
    const rowSize = Math.ceil(aList.length / 10);
    const contentSplit = [];

    for (let i = 0; i < rowSize; i++) {
      contentSplit.push(aList.splice(0, 10).join(''));
    }

    this.btn_clear();

    let splitList = [];
    contentSplit.forEach((item) => {
      console.log('item:', item);
      for (let i = 0; i < item.length; i++) {
        splitList.push(self.drawImage(item[i]));
      }
    });

    Promise.all(splitList).then(function (img) {
      let len = 0;
      contentSplit.forEach(function (item, index) {
        if (index) {
          len += contentSplit[index - 1].length;
        }
        for (let i = 0; i < item.length; i++) {
          self.ctx.drawImage(img[i + len], i * 35 + 50, index * 55 + i * 7);
        }
      });
    });
  },
  btn_clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.resetBgColor();
    let content = this.getElement('content');
    content.value = '';
  },

  init() {
    var self = this;
    this.canvas = this.getElement('canvas');
    this.ctx = canvas.getContext('2d');
    var btn_submit = this.getElement('submit');
    var btn_clear = this.getElement('clear');
    btn_submit.onclick = function () {
      self.btn_submit();
    };
    btn_clear.onclick = function () {
      self.btn_clear();
    };
    this.resetBgColor();
    for (let i = 1; i <= 35; i++) {
      this.images.push('./img/' + i + '.png');
      
      // this.images.push('./img/1.png');
    }
    
  },
};

window.onload = function () {
  Wrapper.init();
  // Wrapper.getElement('content').value = '加aaaaaa1231载-,d.a!@$图片等比例缩放';
  // Wrapper.btn_submit();
};
  