"use strict";

var callsomeone = function callsomeone(someone) {
  return someone + '你好';
};

document.getElementById('person').innerHTML = callsomeone('aa');