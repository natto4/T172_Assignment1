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
/* I think that this is all bullocks but hopefully github will allow me access to edit and then everything will be fine and dandy in the world.
*/
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
	// your code here

    /*
    table =
    {

    }
    */
};
