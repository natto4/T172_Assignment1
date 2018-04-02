/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */
_listen = function(event)
{
    let  gsArray,bwArray; //gsArray is the greyscale array, bwArray is the black and white array
    for (var i=0;i<=(event.detail.data.length)/4;i++)//finding the greyscale translation of the RGBA data
         {
            gsArray[i] = (event.detail.data[0+4*i]+event.detail.data[1+4*i]+event.detail.data[2+4*i])/3;
            //variable i represents each set of four numbers,
            //the first three being important, are averaged to find the greyscale equivalent
            //the fourth number is discarded
            //examples:
            //when i=0, data numbers 1, 2 and 3 are averaged. 
            //when i=3, data numbers 12, 13 and 14 (4*3, 4*3+1 and 4*3+2) are averaged.
         }
    for (var i = 0; i < gsArray.length; i++)//finding the black or white equivalent of the greyscale data
    {
      if (gsArray[i]<127.5)
      {
        bwArray[i] = 0; // if the greyscale is less than half, it is black, i.e 0
      }
      else
      {
        bwArray[i] = 1; // if the greyscale is more than half, it is white, i.e 1
      }
    }
    return bwArray
};

/**
 * Your header documentation here for clear 
 */
clear = function()
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
 hi*/
translate = function()

	
	
///step 4 and 6 
let datatT = listenData.timeTaken;
let dataunit = datatT[1]; // data unit is the time of 1 tap. The time of one tap is the unit of measurement as 
	// half gap = time of 1 tap, full gap = time of 3 taps. It is taken at the 2nd element of the datatT array as the first element
	// should be describing a gap of an abitrary length of time. 
let databW = listenData.blackWhite;

let i = 1;
console.log(dataunit);
let starCode = "";
while (i <= datatT.length) {
   if (databW[i]===0 && datatT[i]== dataunit){
  starCode += ""; //this is a halfgap
  }
  else if (databW[i]===0 && Math.round(datatT[i]%dataunit) === 0){
	  //javascript doesn't work well with floating points so we can't do *3 but instead must do the rounded
	  //remainder when divided by the dataunit
    starCode +=" ";
  } 
  
  else {
    if ((i == datatT.length) && (databW[i-1]== 1)) //if the last element of databW is 1 an early termination alert will show
    {
    alert("Early termination detected. Refresh.");
    console.log("early termination");
  
    }
    else if (databW[i] == 1)
    { 
    starCode += "*";
    }
     
   }
i++;

}
{
// Creating the tap code array
let array = [["e", "t", "a", "n", "d"],["o", "i", "r", "u", "c"],["s", "h", "m", "f", "p"],
		["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]];
	// e.g. array[0][1] is "e"

let j=0,count=0,number = [];
while(j<=starCode.length)
{
	if (starCode.charAt(j)=== "*")//checking if character j is a star or not
 	{
      		count++;//adding to the count
  	}
  	else//if it is not a star, count will be output to variable number as a series of numbers, denoting the length of each chain of stars
  	{
      		number.push(count-1);//minus 1 so that 1 star will refer to the 0th row/column instead of the 1st.
      		count = 0;//resetting count to 0 for the next string of stars.
  	}
  	j++;//moving to the next character
}
let i, letters = "";

for(i=0;i<=number.length-2;i=i+2) //each loop reads two sets of values from the array number
{
  	letters += array[number[i]][number[i+1]];
}

	
let rxCodeOutput = document.getElementById("rx-code");
    rxCodeOutput.innerHTML = starCode;

let rxTranslatedOutput = document.getElementById("rx-translated");
    rxTranslatedOutput.innerHTML = output;
	
	
//
	//still need to integrate the code
	let letters = "testingwuwwithwuwwordswuwoqc"; 
let output="";

for(let i=0;i<letters.length;i++) //letters is the outputted array of letters
   { 
      if(letters.charAt(i)+letters.charAt(i+1)+letters.charAt(i+2)== "wuw")
      {
		  i++;
		  i++;
		  output+=" ";
		  
	 }
    else if ( letters.charAt(i)+letters.charAt(i+1)== "qc")
      {
   		i++;
		output+="k";
      }
 
	else
	{
		output+=letters[i];
	}
}
    
    
outputAreaRef.innerHTML= output;


	
};




