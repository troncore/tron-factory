
//return 32 bytes
function SHA256(msgBytes) {
  var shaObj = new jsSHA("SHA-256", "HEX");
  var msgHex = byteArray2hexStr(msgBytes);
  shaObj.update(msgHex);
  var hashHex = shaObj.getHash("HEX");
  var hashBytes = hexStr2byteArray(hashHex);
  return hashBytes;
}

//return pubkey by 65 bytes, priKeyBytes is byte[]
function getPubKeyFromPriKey(priKeyBytes) {
  var EC = elliptic.ec;
  var ec = new EC('secp256k1');
  var key = ec.keyFromPrivate(priKeyBytes, 'bytes');
  var pubkey = key.getPublic();
  var x = pubkey.x;
  var y = pubkey.y;
  var xHex = x.toString('hex');
  while (xHex.length < 64) {
    xHex = "0" + xHex;
  }
  var yHex = y.toString('hex');
  while (yHex.length < 64) {
    yHex = "0" + yHex;
  }
  var pubkeyHex = "04" + xHex + yHex;
  var pubkeyBytes = hexStr2byteArray(pubkeyHex);
  return pubkeyBytes;
}

//return address by bytes, pubBytes is byte[]
function computeAddress(add_pre_fix, pubBytes) {
  if (pubBytes.length == 65) {
    pubBytes = pubBytes.slice(1);
  }
  var hash = CryptoJS.SHA3(pubBytes).toString();
  var addressHex = hash.substring(24);
  addressHex = add_pre_fix + addressHex;
  var addressBytes = hexStr2byteArray(addressHex);
  return addressBytes;
}

//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
  var hash0 = SHA256(addressBytes);
  var hash1 = SHA256(hash0);
  var checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  var base58Check = encode58(checkSum);

  return base58Check;
}

function decodeBase58Address(base58Sting) {
  var zeroAddress = hexStr2byteArray(
    "000000000000000000000000000000000000000000");
  if (typeof (base58Sting) != 'string') {
    alert("Input format error!");
    return;
  }
  if (base58Sting.length <= 4) {
    alert("Input length error!");
    return;
  }
  var address = decode58(base58Sting);
  if (base58Sting.length <= 4) {
    alert("Decode58 output length error!");
    return;
  }
  var len = address.length;
  var offset = len - 4;
  var checkSum = address.slice(offset);
  address = address.slice(0, offset);
  var hash0 = SHA256(address);
  var hash1 = SHA256(hash0);
  var checkSum1 = hash1.slice(0, 4);
  if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2]
    == checkSum1[2] && checkSum[3] == checkSum1[3]
  ) {
    return address;
  }
  alert("Check sum error!");
  return zeroAddress;
}

function do64Encode() {
  var src = document.getElementById('ascii').value;
  if (src.length < 2 || (src.length & 1) != 0) {
    alert("Input length error!");
    return;
  }
  var bytes = hexStr2byteArray(src);
  document.getElementById('base64').value = base64EncodeToString(bytes);
}

function do64Decode() {
  var src = document.getElementById('base64').value;
  var bytes = base64DecodeFromString(src);
  document.getElementById('ascii').value = byteArray2hexStr(bytes);
}

function do58Encode() {
  var src = document.getElementById('ascii1').value;
  if (src.length < 2 || (src.length & 1) != 0) {
    alert("Input length error!");
    return;
  }
  var bytes = hexStr2byteArray(src);
  document.getElementById('base58').value = getBase58CheckAddress(bytes);
}

function do58Decode() {
  var src = document.getElementById('base58').value;
  var bytes = decodeBase58Address(src);
  document.getElementById('ascii1').value = byteArray2hexStr(bytes);
}

function pubkey2Address() {
  var pubKeyHex = document.getElementById('pubkey').value;
  var net = document.getElementsByName('net0');
  if (pubKeyHex.length != 130) {
    alert("Input length error!");
    return;
  }
  var pubKey = hexStr2byteArray(pubKeyHex);
  var address;
  if (net[0].checked == true) {
    address = computeAddress(add_pre_fix_main, pubKey);
  } else {
    address = computeAddress(add_pre_fix_test, pubKey);
  }
  document.getElementById('addresshex').value = byteArray2hexStr(address);
  document.getElementById('address58').value = getBase58CheckAddress(address);

}

function getRndPriKey() {
  var array = new Array(32);
  var count = 0;
  for (var i = 0; i < 32; i++) {
    array[i] = 0;
    for (var j = 0; j < 8; j++) {
      var random = Math.random();
      if (random >= 0.5) {
        array[i] |= (1 << j);
        count++;
      }
    }
  }
  var hexString = byteArray2hexStr(array);
  return hexString;
}

function prikey2Address() {
  var priKeyHex = document.getElementById('prikey').value;
  var net = document.getElementsByName('net1');

  if (priKeyHex == null || priKeyHex.length == 0) {
    priKeyHex = getRndPriKey();
    document.getElementById('prikey').value = priKeyHex;
  }
  if (priKeyHex.length != 64) {
    alert("Input length error!");
    return;
  }

  var pubKey = getPubKeyFromPriKey(hexStr2byteArray(priKeyHex));
  document.getElementById('pubkey1').value = byteArray2hexStr(pubKey);
  var address;
  if (net[0].checked == true) {
    address = computeAddress(add_pre_fix_main, pubKey);
  } else {
    address = computeAddress(add_pre_fix_test, pubKey);
  }

  document.getElementById('addresshex1').value = byteArray2hexStr(address);
  document.getElementById('address581').value = getBase58CheckAddress(address);
}

function main2test() {
  var mainAddress = document.getElementById('mainaddress').value;
  var address = decodeBase58Address(mainAddress);
  if (address == null) {
    return null;
  }
  if (address.length != 21) {
    return null;
  }
  if (address) {
    if (pre_fix_main != address[0]) {
      return null;
    }
  }
  address[0] = pre_fix_test;

  var testAddress = getBase58CheckAddress(address);
  document.getElementById('testaddress').value = testAddress;
}

function test2main() {
  var testAddress = document.getElementById('testaddress').value;
  var address = decodeBase58Address(testAddress);
  if (address == null) {
    return null;
  }
  if (address.length != 21) {
    return null;
  }
  if (address) {
    if (pre_fix_test != address[0]) {
      return null;
    }
  }
  address[0] = pre_fix_main;

  var mainAddress = getBase58CheckAddress(address);
  document.getElementById('mainaddress').value = mainAddress;

}



function Base64() {

  // private property
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    //    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for encoding
  this.encodeIgnoreUtf8 = function (inputBytes) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    //    input = _utf8_encode(input);
    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // public method for decoding
  this.decodeToByteArray = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    var outBytes = _out2ByteArray(output);
    return outBytes;
  }

  // private method for UTF-8 decoding
  _out2ByteArray = function (utftext) {
    var byteArray = new Array(utftext.length)
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }
    return byteArray;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3
          & 63));
        i += 3;
      }
    }
    return string;
  }
}

//字符串转byteArray数据格式
function stringToBytes(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;

}

//byteArray数据格式转字符串
function bytesToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

/* Convert a hex char to value */
function hexChar2byte(c) {
  var d = 0;
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  return d;
}

/* Check if a char is hex char */
function isHexChar(c) {
  if ((c >= 'A' && c <= 'F') ||
    (c >= 'a' && c <= 'f') ||
    (c >= '0' && c <= '9')) {
    return 1;
  }
  return 0;
}

/* Convert HEX string to byte array */

//16进制的ASCII字符串转为byteArray格式。
function hexStr2byteArray(str) {
  var byteArray = Array();
  var d = 0;
  var i = 0;
  var j = 0;
  var k = 0;

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 == (j % 2)) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}

/* Convert a byte to string */
function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

/* Convert byte arry to HEX string */

//byteArray格式数据转为16进制的ASCII字符串。
function byteArray2hexStr(byteArray) {
  var str = "";
  for (var i = 0; i < (byteArray.length - 1); i++) {
    str += byte2hexStr(byteArray[i]);
  }
  str += byte2hexStr(byteArray[i]);
  return str;
}

//return baset64 String
//将byteArray格式数据编码为base64字符串
function base64EncodeToString(bytes) {
  // var string = bytesToString(bytes);
  var b = new Base64();
  var string64 = b.encodeIgnoreUtf8(bytes);
  return string64
}

//从base64字符串中解码出原文，格式为byteArray格式
function base64DecodeFromString(string64) {
  var b = new Base64();
  var decodeBytes = b.decodeToByteArray(string64);
  //  var decodeBytes = stringToBytes(decodeString);
  return decodeBytes;
}

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var ALPHABET_MAP = {}
for (var i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET.charAt(i)] = i
}
var BASE = 58

function encode58(buffer) {
  if (buffer.length === 0) {
    return ''
  }

  var i, j, digits = [0]
  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) {
      digits[j] <<= 8
    }

    digits[0] += buffer[i]

    var carry = 0
    for (j = 0; j < digits.length; ++j) {
      digits[j] += carry

      carry = (digits[j] / BASE) | 0
      digits[j] %= BASE
    }

    while (carry) {
      digits.push(carry % BASE)

      carry = (carry / BASE) | 0
    }
  }

  // deal with leading zeros
  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) {
    digits.push(0)
  }

  return digits.reverse().map(function (digit) {
    return ALPHABET[digit]
  }).join('')
}

function decode58(string) {
  if (string.length === 0) {
    return []
  }

  var i, j, bytes = [0]
  for (i = 0; i < string.length; i++) {
    var c = string[i]
    if (!(c in ALPHABET_MAP)) {
      throw new Error('Non-base58 character')
    }

    for (j = 0; j < bytes.length; j++) {
      bytes[j] *= BASE
    }
    bytes[0] += ALPHABET_MAP[c]

    var carry = 0
    for (j = 0; j < bytes.length; ++j) {
      bytes[j] += carry

      carry = bytes[j] >> 8
      bytes[j] &= 0xff
    }

    while (carry) {
      bytes.push(carry & 0xff)

      carry >>= 8
    }
  }

  // deal with leading zeros
  for (i = 0; string[i] === '1' && i < string.length - 1; i++) {
    bytes.push(0)
  }

  return bytes.reverse()
}
