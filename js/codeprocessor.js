/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */

var listenData = {
    blackWhite: [0],
    timeTaken: [0],
};
var time1 = 0, time2 = 0;

_listen = function(event)
{

    let  gsArray = [],bwArray = []; //gsArray is the greyscale array, bwArray is the black and white array
    for (var i=0;i<(event.detail.data.length)/4;i++)//finding the greyscale translation of the RGBA data
     {
        gsArray[i] = (event.detail.data[0+4*i]+event.detail.data[1+4*i]+event.detail.data[2+4*i])/3;
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


    
    if(total > 127.5 && listenData.blackWhite[listenData.blackWhite.length-1]===0) //was black and is now white
        {
            listenData.blackWhite.push(1); //record that image is now white
            
            time1 = event.timeStamp; //record time
            
            if(time2 != 0) //accounting for the first case where time2 = 0 
            {
                listenData.timeTaken.push(Math.abs(time2 - time1)); //record time passed for the tap  
            } 
        }
    
    else if(total < 127.5 && listenData.blackWhite[listenData.blackWhite.length-1]===1) //was white and is now black
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
clear = function()
{
	// your code here
};

/**
 * Your header documentation here for translate
 */
translate = function()
{
    listenData.halfGap = listenData.tapTime;
    listenData.fullGap = 3 * listenData.tapTime;
    
	// Creating the tap code array
	let array = [["e", "t", "a", "n", "d"],["o", "i", "r", "u", "c"],["s", "h", "m", "f", "p"],
		     ["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]];
};

/**
 * Your header documentation here for translate
 */
translate = function()
{
	console.log(    
	// Creating the tap code array
	let array = [["e", "t", "a", "n", "d"],["o", "i", "r", "u", "c"],["s", "h", "m", "f", "p"],
		     ["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]];
};
