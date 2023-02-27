import * as dotenv from 'dotenv'
dotenv.config()
// import express from 'express'

// items to be displayed individually
var second = document.querySelector('#second');
var gomb = document.querySelector("#gomb");
// defining the inputs aead of time
// for awesomplete's benefit
var firstFont = document.querySelector('#font-one');
var secondFont = document.querySelector('#font-two');

function awesompleter(lista, input1, input2){
    var tom = new Awesomplete(input1);
    tom.list = lista;
    var jerry = new Awesomplete(input2);
    jerry.list = lista;
};
// get the list of Google Fonts and push them into an array
$(document).ready(function() {
    $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=KEY ', function(response) {
        var fontNames = [];
        for (var item in response.items) {
                fontNames.push(response.items[item].family);
                }
        return awesompleter(fontNames, firstFont, secondFont);
    });
});
// make placeholder text fit in the inputs
document.querySelector('#character').setAttribute('size', document.querySelector('#character').getAttribute('placeholder').length);
document.querySelector('#font-one').setAttribute('size', document.querySelector('#font-one').getAttribute('placeholder').length);
document.querySelector('#font-two').setAttribute('size', document.querySelector('#font-two').getAttribute('placeholder').length);
// custom colorpicker1!
// 1. draw the image on the canvas
var canvas1 = document.querySelector('#canvas_picker');
var ctx1 = canvas1.getContext('2d');

var img = new Image();
$(img).load(function() {ctx1.drawImage(img, 100,100,650,650,0,0,600,300);});
img.src = 'background.jpg';

// 2. handle the click
$(canvas1).click(function(event) {
    // hova?
    var rect = canvas1.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY - rect.top;
    console.log(x +","+ y);
    // szín?
    var imgData = ctx1.getImageData(x, y, 1, 1).data;
    console.log(imgData);
    var R = imgData[0];
    var G = imgData[1];
    var B = imgData[2];
    var rgb = R +","+ G +","+ B;
    $('#rgb1 input').val(rgb);
	$("#color1").css({"background-color": "rgb("+rgb+")", "color": "white"});
});

// custom colorpicker2!
// 1. draw the image on the canvas
var canvas2 = document.querySelector('#canvas2');
var ctx2 = canvas2.getContext('2d');

// var img = new Image();
$(img).load(function() {ctx2.drawImage(img, 100,100,650,650,0,0,600,300);});
// img.src = 'zebra.png';

// 2. handle the click
$(canvas2).click(function(event) {
    // where 
    var rect = canvas2.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY - rect.top;
    // console.log(x +","+ y);
    // what color
    var imgData = ctx2.getImageData(x, y, 1, 1).data;
    console.log(imgData);
    var R = imgData[0];
    var G = imgData[1];
    var B = imgData[2];
    var rgb = R +","+ G +","+ B;
    $('#rgb2 input').val(rgb);
	$("#color2").css({"background-color": "rgb("+rgb+")", "color": "white"});
});

var egyes = document.querySelector("#egyes");
var kettes = document.querySelector("#kettes");
var compareFonts = function() {
        //dimmer.parentNode.removeChild(dimmer);
        document.querySelector('#top').style.display = 'none';
        // generate google fonts link from font user input

    // add + as separator to words in font user input
    var fontEgy, fontKetto;
    if(document.querySelector("#font-one").value.split(' ').length > 0) {
         fontEgy = document.querySelector("#font-one").value.split(' ').join('+');
    }
    else { fontEgy = document.querySelector("#font-one").value; }
    if (document.querySelector("#font-two").value.split(' ').length > 0) {
            fontKetto = document.querySelector("#font-two").value.split(' ').join('+');
    }
    else { fontKetto = document.querySelector("#font-one").value; }

    var fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.type = "text/css";
    fontLink.href = "http://fonts.googleapis.com/css?family=" + fontEgy + "|" + fontKetto;
    document.head.appendChild(fontLink);

    // css needs the original font user input, without +
    // experimental self-executing function to css-style egyes font
    
    var fontDivs = document.querySelectorAll(".family");
    (function(rgb) {
        egyes.style.fontFamily = "'" + document.querySelector("#font-one").value; + "'";
        //alert($('#rgb input').val());
        egyes.style.color = "rgb(" +$('#rgb1 input').val()+ ")";
        fontDivs[0].style.fontFamily = egyes.style.fontFamily;
        fontDivs[0].style.color = egyes.style.color || 'red';
    })();
    
    (function(rgb) {
        kettes.style.fontFamily = "'" + document.querySelector("#font-two").value + "'";
        kettes.style.color = "rgb(" +$('#rgb2 input').val()+ ")";
        fontDivs[1].style.fontFamily = kettes.style.fontFamily;
        fontDivs[1].style.color = kettes.style.color || 'blue';
    })();
    
    // using the empty span elements to align the baseline of different fonts
    document.querySelector('#bu').style.fontFamily = "'" + document.querySelector("#font-two").value + "'";
    document.querySelector('#da').style.fontFamily = "'" + document.querySelector("#font-one").value + "'";
    
    // this is the most important part of the script
    var key = $('#character').val() || "g";
    $('#na').append(key);
    var key2 = key;
    $('#no').append(key2);

    var font1 = document.createTextNode(document.querySelector("#font-one").value);
    var font2 = document.createTextNode(document.querySelector("#font-two").value);
    //fontDivs[0].style.fontFamily = egyes.style.fontFamily;
    //fontDivs[0].style.float = "left";
    //fontDivs[1].style.fontFamily = kettes.style.fontFamily;
    //fontDivs[1].style.float = "right";
    fontDivs[0].appendChild(font1);
    fontDivs[1].appendChild(font2);
    
    gomb.style.display = "block";
        
        if(window.innerWidth <= 768) {
            $('#egyes').animate({opacity: 0.5});
            //$('#egyes').addClass('transformY1');
            //$('#kettes').addClass('transformY2');
            var top = Math.max($(window).height() / 2 - $('#egyes')[0].offsetHeight / 2, 0);
            var left = Math.max($(window).width() / 2 - $('#egyes')[0].offsetWidth / 2, 0);
            $('#egyes, #kettes').css({top: top + "px", transition: 'top 2s ease-in-out'});
            $('#egyes, #kettes').css({left: left + "px", transition: 'left 2s ease-in-out'});
            $('#egyes, #kettes').css('position', 'fixed');
        }
        else {
            $('#egyes').animate({opacity: 0.5/*, left: "+=25%"*/});
            //$('#kettes').animate({left: "-=25%"});
            $('#egyes').addClass('transformed1');
            $('#kettes').addClass('transformed2');
        }
        //document.querySelector('#lightbox').style.display = 'none';
        document.querySelector('#reset').style.visibility = 'visible';
        document.querySelector('#resetButton').style.zIndex = '200';
        document.querySelector('#resetButton').style.textTransform = 'uppercase';
        //document.querySelector('#reset').classList.add('form-element');
        this.removeEventListener("click", arguments.callee);
        return false;
};


gomb.addEventListener("click", compareFonts);
