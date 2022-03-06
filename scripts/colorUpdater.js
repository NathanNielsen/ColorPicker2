var active1, active2, active3, active4, active5;

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
  updateColor();
}

function updateColor(event)
{
  //fetching all the input children and arrayifying them
  var palettes = Array.from($("#activepalette").children('input'));
  var basepalette = Array.from($("#basepalette").children('.colorblock'));
  var pal1 = Array.from($("#modpalette1").children('.colorblock'));
  var pal2 = Array.from($("#modpalette2").children('.colorblock'));
  var pal3 = Array.from($("#modpalette3").children('.colorblock'));

  //iterate through each one and apply color value to div
  for (i = 0; i < palettes.length; i++)
  {
    //coloring the pickers
    //but not if it has a lock
    if (basepalette[i].classList.contains("unlock"))
    {
      $(palettes[i]).css({ "backgroundColor": palettes[i].value });
      $(basepalette[i]).css({ "backgroundColor": palettes[i].value });
    }
  }

  protanopia(palettes, pal1);
  deuteranopia(palettes, pal2);
  tritanopia(palettes, pal3);
}

function protanopia(palettes, pal){
    applyColorblind(palettes, pal, [
        [0.367322, 0.860646, -0.227968],
        [0.280085, 0.672501, 0.047413],
        [-0.011820, 0.042940, 0.968881]
    ])
}

function deuteranopia(palettes, pal) {
    applyColorblind(palettes, pal, [
        [0.152286, 1.052583, -0.204868],
        [0.114503, 0.786281, 0.099216],
        [-0.003882, -0.048116, 1.051998]
    ])
}

function tritanopia(palettes, pal) {
    applyColorblind(palettes, pal, [
        [1.255528, -0.076749, -0.178779],
        [-0.078411, 0.930809, 0.147602],
        [0.004733, 0.691367, 0.303900]
    ])
}

function applyColorblind(palettes, pal, colorblindMatrix)
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
        colorToOutput = colorToOutput + (inputColors[i][k] * colorblindMatrix[k][j]);
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
    outputColors[i] = "#" + compositeColor;
  }

  for (i = 0; i < palettes.length; i++)
  {
    if (basepalette[i].classList.contains("unlock"))
    {
      $(pal[i]).css({ "backgroundColor": outputColors[i] });
    }
  }
}

function generate(scheme)
{
    //should take the color from the lonely color box
    //and the forms input
    //and use it to generate a palette
}