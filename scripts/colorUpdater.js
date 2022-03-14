//import * as tinycolor from './tinycolor';



var active1, active2, active3, active4, active5;

var palViewBase = true;
var palViewPro = false;
var palViewDeu = false;
var palViewTri = false;

window.addEventListener("load", startup, false);
function startup()
{
  //fetching all the input children and arrayifying them
  var children = Array.from($("#activepalette").children('input'));

  //apply some listeners to them
  children.forEach(picker =>
      addEventListener("input", updateColor, false),
      addEventListener("change", updateColor, false));

  //just to get colors on them on load
  //var children = Array.from($("#activepalette").children('input'));
  $(".sampleText").each(function(index, element) {element.innerHTML = ("<img src='images/warning.png' /><div class='tooltip'> HELPPPPP </div><span> Sample Text </span>")});
  
  updateColor(null, false);
    
}

function selectPalView(mode)
{
  palViewBase = false;
  palViewPro = false;
  palViewDeu = false;
  palViewTri = false;

  switch(mode){
    case "base":
        palViewBase = true;
        break;
    case "protanopia":
        palViewPro = true;
        break;
    case "deuteranopia":
        palViewDeu = true;
        break;
    case "tritanopia":
        palViewTri = true;
        break;
  }

  updateColor(null, true)
}

function updateColor(event, override)
{
  //fetching all the input children and arrayifying them
  var palettes = Array.from($("#activepalette").children('input'));
  var basepalette = Array.from($("#basepalette").children('.colorblock'));
  var pal1 = Array.from($("#modpalette1").children('.colorblock'));
  var pal2 = Array.from($("#modpalette2").children('.colorblock'));
  var pal3 = Array.from($("#modpalette3").children('.colorblock'));
  var palView = Array.from($("#palletViews").children('.Palletcolorblock'));

  //iterate through each one and apply color value to div
  for (i = 0; i < palettes.length; i++)
  {
    //coloring the pickers
    //but not if it has a lock
    if (override || basepalette[i].classList.contains("unlock"))
    {
      $(palettes[i]).css({ "backgroundColor": palettes[i].value });
      $(basepalette[i]).css({ "backgroundColor": palettes[i].value });
      if(palViewBase)
      {
        $(palView[i]).css({ "backgroundColor": palettes[i].value });
      }
    }
  }

  if(palViewBase)
  {
    updatePalViewText(palettes, override, basepalette);
  }

  protanopia(palettes, pal1, override);
  deuteranopia(palettes, pal2, override);
  tritanopia(palettes, pal3, override);
}



function checkRead(location)
{
  var bg = ($(location).parent().parent().css("backgroundColor"));
  var text = ($(location).css("color"));
  var readable =  tinycolor.isReadable(bg, text, {level:"AA",size:"large"});
  console.log(bg);
  console.log(text);
  console.log(readable);
  if(!readable){
    $(location).addClass("unreadable");
    $(location).removeClass("readable");
    //console.log("Should be an img here,", $(location).children('img'));
  }
  else{
    $(location).addClass("readable");
    $(location).removeClass("unreadable");
  }
  var colorToOutput = Math.floor(tinycolor.readability(bg, text)*100)/100;
  $(location).html("<img src='images/warning.png' /><div class='tooltip'> Contrast: " + colorToOutput + "</div><span> Sample Text </span>");
}
function updatePalViewText(outputColors, override, basepalette)
{
  if (override || basepalette[0].classList.contains("unlock"))
  {
    $("#b2t1").css({ "color": outputColors[0].value });
    $("#b3t1").css({ "color": outputColors[0].value });
    $("#b4t1").css({ "color": outputColors[0].value });
    $("#b5t1").css({ "color": outputColors[0].value });
    checkRead("#b2t1")
    checkRead("#b3t1")
    checkRead("#b4t1")
    checkRead("#b5t1")
  }

  if (override || basepalette[1].classList.contains("unlock"))
  {
    $("#b1t1").css({ "color": outputColors[1].value });
    $("#b3t2").css({ "color": outputColors[1].value });
    $("#b4t2").css({ "color": outputColors[1].value });
    $("#b5t2").css({ "color": outputColors[1].value });
    checkRead("#b1t1")
    checkRead("#b3t2")
    checkRead("#b4t2")
    checkRead("#b5t2")
  }

  if (override || basepalette[2].classList.contains("unlock"))
  {
    $("#b1t2").css({ "color": outputColors[2].value });
    $("#b2t2").css({ "color": outputColors[2].value });
    $("#b4t3").css({ "color": outputColors[2].value });
    $("#b5t3").css({ "color": outputColors[2].value });
    checkRead("#b1t2")
    checkRead("#b2t2")
    checkRead("#b4t3")
    checkRead("#b5t3")
  }

  if (override || basepalette[3].classList.contains("unlock"))
  {
    $("#b1t3").css({ "color": outputColors[3].value });
    $("#b2t3").css({ "color": outputColors[3].value });
    $("#b3t3").css({ "color": outputColors[3].value });
    $("#b5t4").css({ "color": outputColors[3].value });
    checkRead("#b1t3")
    checkRead("#b2t3")
    checkRead("#b3t3")
    checkRead("#b5t4")
  }

  if (override || basepalette[4].classList.contains("unlock"))
  {
    $("#b1t4").css({ "color": outputColors[4].value });
    $("#b2t4").css({ "color": outputColors[4].value });
    $("#b3t4").css({ "color": outputColors[4].value });
    $("#b4t4").css({ "color": outputColors[4].value });
    checkRead("#b1t4")
    checkRead("#b2t4")
    checkRead("#b3t4")
    checkRead("#b4t4")
  }
}

function updatePalViewTextPure(outputColors, override, basepalette)
{
  if (override || basepalette[0].classList.contains("unlock"))
  {
    $("#b2t1").css({ "color": outputColors[0]});
    $("#b3t1").css({ "color": outputColors[0]});
    $("#b4t1").css({ "color": outputColors[0]});
    $("#b5t1").css({ "color": outputColors[0]});
    checkRead("#b2t1")
    checkRead("#b3t1")
    checkRead("#b4t1")
    checkRead("#b5t1")
  }

  if (override || basepalette[1].classList.contains("unlock"))
  {
    $("#b1t1").css({ "color": outputColors[1]});
    $("#b3t2").css({ "color": outputColors[1]});
    $("#b4t2").css({ "color": outputColors[1]});
    $("#b5t2").css({ "color": outputColors[1]});
    checkRead("#b1t1")
    checkRead("#b3t2")
    checkRead("#b4t2")
    checkRead("#b5t2")
  }

  if (override || basepalette[2].classList.contains("unlock"))
  {
    $("#b1t2").css({ "color": outputColors[2]});
    $("#b2t2").css({ "color": outputColors[2]});
    $("#b4t3").css({ "color": outputColors[2]});
    $("#b5t3").css({ "color": outputColors[2]});
    checkRead("#b1t2")
    checkRead("#b2t2")
    checkRead("#b4t3")
    checkRead("#b5t3")
  }

  if (override || basepalette[3].classList.contains("unlock"))
  {
    $("#b1t3").css({ "color": outputColors[3]});
    $("#b2t3").css({ "color": outputColors[3]});
    $("#b3t3").css({ "color": outputColors[3]});
    $("#b5t4").css({ "color": outputColors[3]});
    checkRead("#b1t3")
    checkRead("#b2t3")
    checkRead("#b3t3")
    checkRead("#b5t4")
  }

  if (override || basepalette[4].classList.contains("unlock"))
  {
    $("#b1t4").css({ "color": outputColors[4]});
    $("#b2t4").css({ "color": outputColors[4]});
    $("#b3t4").css({ "color": outputColors[4]});
    $("#b4t4").css({ "color": outputColors[4]});
    checkRead("#b1t4")
    checkRead("#b2t4")
    checkRead("#b3t4")
    checkRead("#b4t4")
  }
}

function protanopia(palettes, pal, override){
  
    applyColorblind(palettes, pal, [
        [0.367322, 0.860646, -0.227968],
        [0.280085, 0.672501, 0.047413],
        [-0.011820, 0.042940, 0.968881]
    ], palViewPro, override)
    /*applyColorblind(palettes, pal, [
      [0, 1.05118294, -0.05116099],
      [0,1,0],
      [0,0,1]
    ])*/
}

function deuteranopia(palettes, pal, override) {
    applyColorblind(palettes, pal, [
        [0.152286, 1.052583, -0.204868],
        [0.114503, 0.786281, 0.099216],
        [-0.003882, -0.048116, 1.051998]
    ], palViewDeu, override)
}

function tritanopia(palettes, pal, override) {
  
    applyColorblind(palettes, pal, [
        [1.255528, -0.076749, -0.178779],
        [-0.078411, 0.930809, 0.147602],
        [0.004733, 0.691367, 0.303900]
    ], palViewTri, override)
    /*
   applyColorblind(palettes, pal, [[1,0,0],
    [0,1,0],
    [0,0,1]])*/
}

/*function multiply3x3by1x3(leftm, rightm){
    const toReturn = newArray(3);
    for(i=0;i<3;i++){
      toStore = 0;
      for(j=0;j<3;j++){
        toStore = toStore + (leftm[j][i]
      }
    }
}
*/
function applyColorblind(palettes, pal, colorblindMatrix, doPalView, override)
{
  const inputColors = new Array(palettes.length);
  const outputColors = new Array(palettes.length);
  var basepalette = Array.from($("#basepalette").children('.colorblock'));

  for (i = 0; i < palettes.length; i++)
  {
    var inputColor = parseInt(palettes[i].value.substring(1), 16);
    //console.log(inputColor);
    //console.log(palettes[i].value);
    inputColors[i] = new Array(3);
    outputColors[i] = new Array(3);
    inputColors[i][2] = inputColor % 256;
    inputColor = inputColor / 256;
    inputColor = Math.floor(inputColor);
    inputColors[i][1] = inputColor % 256;
    inputColor = inputColor / 256;
    inputColor = Math.floor(inputColor);
    inputColors[i][0] = inputColor % 256;
  }

  //console.log(inputColors);
  for (i = 0; i < palettes.length; i++)
  {
    for (j = 0; j < 3; j++)
    {
      var colorToOutput = 0;
      for (k = 0; k < 3; k++)
      {
        colorToOutput = colorToOutput + (inputColors[i][k] * colorblindMatrix[j][k]);
      }
      colorToOutput = Math.min(Math.max(colorToOutput, 0), 255)
      outputColors[i][j] = colorToOutput;
    }
    var compositeColor = Math.round(outputColors[i][0]);
    compositeColor *= 256;
    compositeColor += Math.round(outputColors[i][1]);
    compositeColor *= 256;
    compositeColor += Math.round(outputColors[i][2]);
    var compositeColor = compositeColor.toString(16);
    while(compositeColor.length < 6){
      compositeColor = "0" + compositeColor;
    }
    outputColors[i] = "#" + compositeColor;
  }
  console.log(outputColors);
  var palView = Array.from($("#palletViews").children('.Palletcolorblock'));
  for(i = 0; i < palettes.length; i++)
  {
    if(override || basepalette[i].classList.contains("unlock"))
    {
      $(pal[i]).css({ "backgroundColor": outputColors[i] });

      if(doPalView)
      {
        $(palView[i]).css({ "backgroundColor": outputColors[i]});
      }
    }
  }

  if(doPalView)
  {
    updatePalViewTextPure(outputColors, override, basepalette);
  }
}