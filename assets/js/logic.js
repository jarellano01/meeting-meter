$(function(){
	var attendeeArray = [];
	var hourlyCost = 0;
	var curCost = 0;
	var meterState = "reset";
	var interval;
	var timeInterval = .05;

	$("#collapse").click(function(){
		$("#demo").fadeToggle();
	})

	function Attendie(jobTitle, hourlyRate, count){
		this.jobTitle = jobTitle;
		this.hourlyRate = hourlyRate;
		this.count = count;
	}

	function initialize(){
		// attendeeArray[0] = new Attendie("PM", 100, 1);
		// attendeeArray[1] = new Attendie("PE", 50, 2);
		// attendeeArray[2] = new Attendie("CEO", 150, 1);
		// attendeeArray[3] = new Attendie("APM", 80, 2);
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
			dHourlyRate.html("$" + a.hourlyRate.toFixed(2));

			var dCount = $("<td>");
			dCount.html(a.count);

			newRow.attr("data-id", i);
			newRow.append(dCount).append(dJobTitle).append(dHourlyRate);
			$("#attendee-rows").append(newRow);

		}
		$("tbody > tr").click(function(){
			editAttendee($(this).data("id"));
		})
	}

	function editAttendee(rowId){
		$("#btn-modify").attr("data-id", rowId);
		$("#btn-delete").attr("data-id", rowId);
		$("#existing-job-title").val(attendeeArray[rowId].jobTitle);
		$("#existing-hourly-rate").val(attendeeArray[rowId].hourlyRate);
		$("#existing-count").val(attendeeArray[rowId].count);
		$("#modal-edit").modal('toggle');
	}


	$("#btn-modify").click(function(){
		var existingID = $(this).data("id");
		var jobTitle = $("#existing-job-title").val();
		var hourlyRate = $("#existing-hourly-rate").val();
		var count = $("#existing-count").val();
		attendeeArray[existingID] = new Attendie(jobTitle, parseInt(hourlyRate), parseInt(count));		
		resetTable();
		resetCosts();
		closeModal("#modal-edit");
	})
	$("#btn-delete").click(function(){
		var existingID = $(this).data("id");
		var jobTitle = $("#existing-job-title").val();
		var hourlyRate = $("#existing-hourly-rate").val();
		var count = $("#existing-count").val();
		attendeeArray.splice(existingID,1);
		resetTable();
		resetCosts();
		closeModal("#modal-edit");
	})


	function resetCosts(){
		hourlyCost = 0;
		for(var i in attendeeArray)
		{
			hourlyCost += attendeeArray[i].hourlyRate * attendeeArray[i].count;
		}

		var aCount = attendeeArray

		$("#cost-hour").text("$" + hourlyCost.toFixed(2));
		$("#cost-minute").text("$" + (hourlyCost / 60).toFixed(2));
		$("#cost-day").text("$" + (hourlyCost * 8).toFixed(2));

	}

	function addAttendee(jobTitle, hourlyRate, count){
		attendeeArray[attendeeArray.length] = new Attendie(jobTitle, parseInt(hourlyRate), parseInt(count));
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
		var divider = 1 / timeInterval;
		curCost += hourlyCost/3600 / divider;
		$("#meter-display").text("$" + curCost.toFixed(2));
	}
	$("#start-meter").click(function(){
		if(meterState !== "running"){
			interval = setInterval(meetingMeterStart, 1000 * timeInterval);
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
