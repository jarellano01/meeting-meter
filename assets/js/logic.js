$(function(){
	var attendeeArray = [];
	var hourlyCost = 0;
	var curCost = 0;
	var meterState = "reset";
	var interval;

	$("#collapse").click(function(){
		$("#demo").fadeToggle();
	})

	function Attendie(jobTitle, hourlyRate, count){
		this.jobTitle = jobTitle;
		this.hourlyRate = hourlyRate;
		this.count = count;
	}

	function initialize(){
		attendeeArray[0] = new Attendie("PM", "150", "3");
		attendeeArray[1] = new Attendie("PE", "75", "1");
		attendeeArray[2] = new Attendie("CEO", "200", "1");
		attendeeArray[3] = new Attendie("APM", "150", "5");
	}

	function resetTable()
	{
		$("#attendee-rows").empty();

		for(i=0; i<attendeeArray.length; i++){
			var a = attendeeArray[i];
			var newRow = $("<tr>");
			var dJobTitle = $("<td>");
			dJobTitle.html(a.jobTitle + "(s)");

			var dHourlyRate = $("<td>");
			dHourlyRate.html(a.hourlyRate);

			var dCount = $("<td>");
			dCount.html(a.count);


			newRow.append(dCount).append(dJobTitle).append(dHourlyRate);
			$("#attendee-rows").append(newRow);

		}
	}

	function resetCosts(){
		hourlyCost = 0;
		for(var i in attendeeArray)
		{
			hourlyCost += parseInt(attendeeArray[i].hourlyRate) * parseInt(attendeeArray[i].count);
		}

		var aCount = attendeeArray

		$("#cost-hour").text("$" + hourlyCost.toFixed(2));
		$("#cost-minute").text("$" + (hourlyCost / 60).toFixed(2));
		$("#cost-day").text("$" + (hourlyCost * 8).toFixed(2));

	}

	function addAttendee(jobTitle, hourlyRate, count){
		attendeeArray[attendeeArray.length] = new Attendie(jobTitle, hourlyRate, count);
	}

	$("#btn-new-attendee").click(function(){
		addAttendee($("#new-job-title").val(), $("#new-hourly-rate").val(), $("#new-count").val());
		resetTable();
		resetCosts();
		closeModal("#modal-id")
	})

	function closeModal(modalID){
   		$(modalID).modal('toggle');
   		$("#new-job-title").val("");
   		$("#new-hourly-rate").val(""); 
   		$("#new-count").val("");
	}

	function meetingMeterStart(){
		curCost += hourlyCost/3600 / 4;
		$("#meter-display").text("$" + curCost.toFixed(2));
	}
	$("#start-meter").click(function(){
		if(meterState !== "running"){
			interval = setInterval(meetingMeterStart, 250);
			meterState = "running";
		}
	})
	$("#pause-meter").click(function(){
		if(meterState == "running"){
			clearInterval(interval);
			meterState = "paused";
		}
	})
	$("#reset-meter").click(function(){
		if(meterState !== "reset"){
			clearInterval(interval);
			curCost = 0;
			$("#meter-display").text("$" + curCost.toFixed(2));
			meterState = "reset";
		}
	})

	initialize();
	resetTable();
	resetCosts();



})
