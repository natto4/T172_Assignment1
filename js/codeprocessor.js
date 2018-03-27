/**
 * Your header documentation here for _listen
 *    For your reference...
 * 		event will hold an Event object with the pixels in
 *   	event.detail.data and the timestamp in event.timeStamp
 */

var listenData = { //data that will be used by the translator
    blackWhite: [0],
    timeTaken: [0],
};

_listen = function(event)
{
    
	// Declaring variables
    var greyAverage = (event.detail.data[0] + event.detail.data[1] + event.detail.data[2])/3 //converts pixel data to black and white
    var time1 = 0, time2 = 0;

    if(greyAverage > 127.5 && listenData.blackWhite[listenData.blackwhite.length-1]===0) //was black and is now white
        {
            listenData.blackWhite.push(1); //record that image is now white
            
            time1 = event.timeStamp; //record time
            
            if(time2 != 0) //accounting for the first case where time2 = 0
            {
                listenData.timeTaken.push(Math.abs(time2 - time1)); //record time passed for the tap    
            } 
        }
    
    else if(greyAverage < 127.5 && listenData.blackWhite[listenData.blackWhite.length-1]===1) //was white and is now black
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
	console.log(    
	// Creating the tap code array
	let array = [["e", "t", "a", "n", "d"],["o", "i", "r", "u", "c"],["s", "h", "m", "f", "p"],
		     ["l", "y", "g", "v", "j"], ["w", "b", "x", "q", "z"]];
};
