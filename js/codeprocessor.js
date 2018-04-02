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
	// your code here
};

/**
 * Your header documentation here for translate
 hi*/
translate = function()
{
	// Creating the tap code array
	let array = [["e", "t", "a", "n", "d"],["o", "i", "r", "u", "c"],["s", "h", "m", "f", "p"],
		     ["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]];
	// array[0][1]

    /*
    table =
    {

    }
    */
	
	
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
    else if (databW[i] == 1){ 
    starCode += "*";
    }
     
   }


i++;

}
; 

	
	
	
	
};




