function applyLock(blockIndex)
{
    var basepalette = Array.from($("#basepalette").children('.colorblock'));

    //lock
    if (basepalette[blockIndex].classList.contains("unlock"))
    {
      basepalette[blockIndex].classList.add("lock");
      basepalette[blockIndex].classList.remove("unlock");

      basepalette[blockIndex].innerHTML = "";
      basepalette[blockIndex].innerHTML = "<img src='images/lock_closed.svg' />";
    }
    //unlock 
    else if (basepalette[blockIndex].classList.contains("lock"))
    {
      basepalette[blockIndex].classList.add("unlock");
      basepalette[blockIndex].classList.remove("lock");

      basepalette[blockIndex].innerHTML = "";
      basepalette[blockIndex].innerHTML = "<img src='images/lock_open.svg' />";
    }
}