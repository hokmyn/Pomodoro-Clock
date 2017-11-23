var timerID,
				sessionTime = $("#sessionTime").text(),
				breakTime 	= $("#breakTime").text(),
				continueTime;				

		function startTimer() {
			let myTimer 		 		 = $("#time").text(),    
    			arr 				 		 = myTimer.split(":"),    			    
    			m 					 		 = arr[0],
    			s 					 		 = arr[1],
    	    continueTime = false,
    	    percent;
    	    			
    	if (s == 0) {
      	if (m == 0) {
      		if($("#type").text() == "Session") {
           	$("#type").text("Break");
           	if(breakTime[0] != 0 && breakTime < 10) {					
							breakTime = "0" + breakTime;										
						}
           	$("#time").text(breakTime + ":00");
           	m = breakTime;           	
          } else {
          	$("#type").text("Session");
          	$("#time").text(sessionTime + ":00");
          	m = sessionTime;           	
          } 
          s = "00";    
      	} else {
      		m-=1;
      		m = (m < 10) ? ("0" + m) : m;      		
      		s = 59;
      	}      	
    	}
    	else {
    		s-=1;
    		s = (s < 10) ? ("0" + s) : s;   		
    	}    	
    	$("#time").text(m+":"+s);

    	if($("#type").text() == "Session") {
    		percent = 100 - ((m * 60 + s) * 100 / (sessionTime * 60));
    		$(".inner").css("background", "linear-gradient(0deg, #C7F2FF " + percent + "%, #D5D5D5 " + percent + "%)");
    	} else {    		
    		percent = 100 - ((m * 60 + s) * 100 / (breakTime * 60));
    		$(".inner").css("background", "linear-gradient(0deg, #00FFA9 " + percent + "%, #D5D5D5 " + percent + "%)");
    	}
    	
    	timerID = setTimeout(startTimer, 1000);
  	}

		$(document).ready(function() {
					
			$("#session button:first-child").on( "click", function() {
				if(sessionTime <= 60) {
					$("#sessionTime").text(++sessionTime);
				}
			});

			$("#break button:first-child").on( "click", function() {
				if(breakTime <= 60) {
					$("#breakTime").text(++breakTime);
				}
			});

			$("#session button:last-child").on( "click", function() {
				if(sessionTime > 1) {
					$("#sessionTime").text(--sessionTime);
				}
			});

			$("#break button:last-child").on( "click", function() {
				if(breakTime > 1) {
					$("#breakTime").text(--breakTime);
				}
			});

			$("#buttons button:first-child").on( "click", function() {
				if(!continueTime && typeof timerID != "number") {
					$("#time").text(sessionTime + ":00");					
				}
				if(typeof timerID != "number" || continueTime) {
					startTimer();
				}
				var arr = $("#time").text().split(":");

			});

			$("#buttons button:nth-child(2)").on( "click", function() {
				if(typeof timerID == "number") {
					clearTimeout(timerID);
				}
				continueTime = true;
			});

			$("#buttons button:last-child").on( "click", function() {
				if(timerID) {
					clearTimeout(timerID);
					timerID = undefined;
				}
				$("#type").text("Session");				
				if(sessionTime[0] != 0 && sessionTime < 10) {					
					sessionTime = "0" + sessionTime;										
				}
				$("#time").text(sessionTime + ":00");

				$(".inner").css("background", "#D5D5D5");
			});
		});
