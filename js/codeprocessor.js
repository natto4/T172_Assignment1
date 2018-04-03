/*
 * Purpose:
 * Team: 172 
 * Authors: Graydon Forbes, Briana Barker, Natalin Lin, Chamil Kaluthanthri
 * Last Modified: 03/04/18
 * Version: 1.0.0
 */

// listenData is a globally declared variable as it is to be used by more than one function. 
var listenData = 
{
  blackWhite: [0],
  timeTaken: [0]
};
var time1 = 0, time2 = 0;

/*
This function interprets data recieved from the camera and turns the flashes into two data arrays: blackWhite and timeTaken
It does this by first translating the image into greyscale by translating the RGBA data for each pixel. 

argument: event: holds an Event object with the pixels in	event.detail.data and the timestamp in event.timeStampsquare

preconditions: 
      image must exist as a 400 x 400 pixel array
      pixel data must be in RGBA format
returns: 
      listenData object which contains
        - blackWhite array : array indicating either white or black as 1 or 0 respectively 
        - timeTaken array: array indicating the time of each black or white screen
*/
_listen = function (event) 
{

  let gsArray = [], bwArray = []; //gsArray = greyscale array, bwArray = black and white array
  for (var i = 0; i < (event.detail.data.length) / 4; i++)//finding the greyscale translation of the RGBA data
  {
    gsArray[i] = (event.detail.data[0 + 4 * i] + event.detail.data[1 + 4 * i] + event.detail.data[2 + 4 * i]) / 3;
    //variable i represents each set of four numbers,
    //the first three being important, are averaged to find the greyscale equivalent
    //the fourth number is discarded as it denotes the opacity of the pixel
    //examples:
    //when i=0, data numbers 1, 2 and 3 are averaged. 
    //when i=3, data numbers 12, 13 and 14 (4*3, 4*3+1 and 4*3+2) are averaged.
  }
  for (var i = 0; i < gsArray.length; i++)//combines the average values of the greyscale data
  {
    var total = 0;
    total = total + gsArray[i]
  }


  if (total > 127.5 && listenData.blackWhite[listenData.blackWhite.length - 1] === 0) // image was black and is now white
  {
    listenData.blackWhite.push(1); //record that image is now white

    time1 = event.timeStamp; //record time

    if (time2 != 0) //accounting for the first case where time2 = 0 
    {
      listenData.timeTaken.push(Math.abs(time2 - time1)); //record time passed for the tap  
    }
  }

  else if (total < 127.5 && listenData.blackWhite[listenData.blackWhite.length - 1] === 1) // image was white and is now black
  {
    listenData.blackWhite.push(0); //record that image is now black 
    time2 = event.timeStamp; //Record time
    listenData.timeTaken.push(Math.abs(time2 - time1)); //record time passed for the half-gap/full-gap 
  }

  return listenData
};


/**
This function clears the existing data so that the app can be used multiple times without the need for refreshing the webpage

argument: this function does not take any arguments
preconditions: none
postconditions:
      The return must be identical to the initial conditions of listenData
return: 
	empty template object listenData
	empty strings in the rx-code and rx-translated regions of the app
	  
	  */

clear = function ()
{//listenData matches initial listenData object
  listenData =
    {
      blackWhite: [0],
      timeTaken: [0],
    }
  time1 = 0, time2 = 0;
  let rxCodeOutput = document.getElementById("rx-code");
  rxCodeOutput.innerHTML = " ";

  let rxTranslatedOutput = document.getElementById("rx-translated");
  rxTranslatedOutput.innerHTML = " ";
};

/**
This function...

argument: this function does not take any arguments
preconditions: 
      blackWhite and timeTaken arrays must be of equal type
      array length of timeTaken must be one less than the array length of blackWhite
/////////postcondition?
return:
      variable output is of string type 
      output is the translated encoded message



* Your header documentation here for translate
*/
translate = function () 
{
  let datatT = listenData.timeTaken;
  let dataunit = datatT[1]; // data unit is the time of 1 tap. The time of one tap is the unit of measurement as 
  // half gap = time of 1 tap, full gap = time of 3 taps. It is taken at the 2nd element of the datatT array as the first element
  // should be describing a gap of an abitrary length of time. 
  let databW = listenData.blackWhite;
  let starCode = "";	

  let i = 1;
 // creates the starCode from analysis of the blackWhite and timeTaken data arrays of the listenData object.
  while (i <= datatT.length) 
  {
    if (databW[i] === 0 && datatT[i] == dataunit)
    {
      starCode += ""; //this is a halfgap
    }
    else if (databW[i] === 0 && datatT[i] > 2 * dataunit) 
    {
     
      starCode += " ";// this is a full gap
    }

    else 
    {
      if ((i == datatT.length) && (databW[i] == 1)) //if the last element of databW is 1 an early termination alert will show
      {
        alert("Early termination detected. Refresh.");
       
      }

      else if (databW[i] == 1) 
      {
        starCode += "*"; // this is a tap
      }

    }
    i++;

  }

	
	
  // Creating the tap code array
  let array = [["e", "t", "a", "n", "d"], ["o", "i", "r", "u", "c"], ["s", "h", "m", "f", "p"],
  ["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]];

  let j = 0, count = 0, number = [];
	
  //check if each value is a * or a space and creates an array of numbers that will correlate to coordinates of the tap code array
  while (j <= starCode.length)
  {
    if (starCode.charAt(j) === "*")//checking if character j is a star or not
    {
      count++;//adding to the count
      if (count > 5) // maximum number of sequential taps is 5
      { 
      	return alert("too many successive taps. Refresh");
      }
    }
    else //if it is not a star (ie: a space), count will be append to the end of the array 'number', 
		 //denoting the length of each chain of stars
    {
      number.push(count - 1);//minus 1 so that 1 star will refer to the 0th row/column instead of the 1st.
      count = 0;//resetting count to 0 for the next string of stars.
    }
    j++;
  }
	
	
	
  let letters = ""; //'letters' is the placeholder for the outputted string of letters
  // translates the coordinates of the tap code array given by the variable 'number' into letters
  for (var g = 0; g <= number.length - 2; g = g + 2) //each loop reads two sets of values from the array number
  {
    letters += array[number[g]][number[g + 1]];
  }

  let output = "";

	
  // checks for special characters (qc = 'k' and wuw = ' ') and finalises output 
  for (let h = 0; h < letters.length; h++) 
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

 // displays the starCode output
  let rxCodeOutput = document.getElementById("rx-code");
  rxCodeOutput.innerHTML = starCode;
// displays the final translated output
  let rxTranslatedOutput = document.getElementById("rx-translated");
  rxTranslatedOutput.innerHTML = output;
}
