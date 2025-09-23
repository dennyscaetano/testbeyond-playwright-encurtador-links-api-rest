export function generateULID() {
    const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    
    function encodeRandom(time) {
      let str = '';
      for (let i = 0; i < 10; i++) {
        str = ENCODING[time % 32] + str;
        time = Math.floor(time / 32);
      }
      return str;
    }
  
    function randomPart(len) {
      let str = '';
      for (let i = 0; i < len; i++) {
        str += ENCODING[Math.floor(Math.random() * 32)];
      }
      return str;
    }
  
    return encodeRandom(Date.now()) + randomPart(16);
  }