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
    let i,space=[], k=[];
    for(i==0;i<=letters.length-2,i++) //letters is the outputted array of letters
    {
      if(letters.charAt(i)+letters.charAt(i+1)+letters.charAt(i+2) == "wuw"
      {
        space.push(i);
      }
    }
    for(i==0;i<=letters.length-1,i++) //letters is the outputted array of letters
    {
      if(msg[i]+msg[i+1] == "qc")
      {
        k.push(i)
      }
    }
    
};
