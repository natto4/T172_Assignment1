/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */

var listenData = 
{
  blackWhite: [0],
  timeTaken: [0]
};
var time1 = 0, time2 = 0;

_listen = function (event) 
{

  let gsArray = [], bwArray = []; //gsArray is the greyscale array, bwArray is the black and white array
  for (var i = 0; i < (event.detail.data.length) / 4; i++)//finding the greyscale translation of the RGBA data
  {
    gsArray[i] = (event.detail.data[0 + 4 * i] + event.detail.data[1 + 4 * i] + event.detail.data[2 + 4 * i]) / 3;
    //variable i represents each set of four numbers,
    //the first three being important, are averaged to find the greyscale equivalent
    //the fourth number is discarded
    //examples:
    //when i=0, data numbers 1, 2 and 3 are averaged. 
    //when i=3, data numbers 12, 13 and 14 (4*3, 4*3+1 and 4*3+2) are averaged.
  }
  for (var i = 0; i < gsArray.length; i++)//finding the average value of the greyscale data
  {
    var total = 0;
    total = total + gsArray[i]
  }



  if (total > 127.5 && listenData.blackWhite[listenData.blackWhite.length - 1] === 0) //was black and is now white
  {
    listenData.blackWhite.push(1); //record that image is now white

    time1 = event.timeStamp; //record time

    if (time2 != 0) //accounting for the first case where time2 = 0 
    {
      listenData.timeTaken.push(Math.abs(time2 - time1)); //record time passed for the tap  
    }
  }

  else if (total < 127.5 && listenData.blackWhite[listenData.blackWhite.length - 1] === 1) //was white and is now black
  {
    listenData.blackWhite.push(0); //record that image is now black 
    time2 = event.timeStamp; //Record time
    listenData.timeTaken.push(Math.abs(time2 - time1)); //record time passed for the half-gap/full-gap 
  }

  return listenData
};


/**
* Your header documentation here for clear
*/
clear = function ()
{
  listenData =
    {
      blackWhite: [0],
      timeTaken: [0],
    }
  time1 = 0, time2 = 0;
};

/**
* Your header documentation here for translate
*/
translate = function () 
{
  let datatT = listenData.timeTaken;
  let dataunit = datatT[1]; // data unit is the time of 1 tap. The time of one tap is the unit of measurement as 
  // half gap = time of 1 tap, full gap = time of 3 taps. It is taken at the 2nd element of the datatT array as the first element
  // should be describing a gap of an abitrary length of time. 
  let databW = listenData.blackWhite;

  let i = 1;
  let starCode = "";
  while (i <= datatT.length) 
  {
    if (databW[i] === 0 && datatT[i] == dataunit)
    {
      starCode += ""; //this is a halfgap
    }
    else if (databW[i] === 0 && datatT[i] > 2 * dataunit) 
    {
     
      starCode += " ";
      //javascript doesn't work well with floating points so we can't do *3 but instead must do the rounded
      //remainder when divided by the dataunit
    }

    else 
    {
      if ((i == datatT.length) && (databW[i] == 1)) //if the last element of databW is 1 an early termination alert will show
      {
        alert("Early termination detected. Refresh.");
       
      }

      else if (databW[i] == 1) 
      {
        starCode += "*";
      }

    }
    i++;

  }

  // Creating the tap code array
  let array = [["e", "t", "a", "n", "d"], ["o", "i", "r", "u", "c"], ["s", "h", "m", "f", "p"],
  ["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]];


  //step 5 below
  //input is starCode
  //check if each value is a * or a space

  let j = 0, count = 0, number = [];
  while (j <= starCode.length)
  {
    if (starCode.charAt(j) === "*")//checking if character j is a star or not
    {
      count++;//adding to the count
      if (count > 5)
      { 
        alert("too many successive taps. Refresh");
      }
    }
    else//if it is not a star, count will be output to variable number as a series of numbers, denoting the length of each chain of stars
    {
      number.push(count - 1);//minus 1 so that 1 star will refer to the 0th row/column instead of the 1st.
      count = 0;//resetting count to 0 for the next string of stars.
    }
    j++;//moving to the next character
  }
  let letters = "";

  let g = 0;
  for (g = 0; g <= number.length - 2; g = g + 2) //each loop reads two sets of values from the array number
  {
    letters += array[number[g]][number[g + 1]];
  }

  let output = "";

  for (let h = 0; h < letters.length; h++) //letters is the outputted array of letters
  {
    if (letters.charAt(h) + letters.charAt(h + 1) + letters.charAt(h + 2) == "wuw")
    {
      h++;
      h++;
      output += " ";
    }


    else if (letters.charAt(h) + letters.charAt(h + 1) == "qc") 
    {
      h++;
      output += "k";
    }

    else 
    {
      output += letters[h];
    }
  }


  let rxCodeOutput = document.getElementById("rx-code");
  rxCodeOutput.innerHTML = starCode;

  let rxTranslatedOutput = document.getElementById("rx-translated");
  rxTranslatedOutput.innerHTML = output;
}
