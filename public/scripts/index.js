
function isLastDigit(value, arr)
{
	var valueAsString = value.toString() ;
	if (valueAsString.length >= 1) {
		
		console.log("valueAsString: " + valueAsString) ;

		var lastDigit = parseInt(valueAsString[valueAsString.length-1]) ;

		return arr.filter(function(obj) {
				return obj === lastDigit ;
			}).length > 0 ;
	}
	return false ;
}

function getTimeString(timestamp)
{
	var now = Date.now() ;
	console.log(now) ;
	var time = new Date(timestamp) ;

	var seconds = Math.floor((now - timestamp) / 1000) ;
	var minutes = Math.floor(seconds / 60) ;
	var hours = Math.floor(minutes / 60) ;
	var days = Math.floor(hours / 24) ;

	var timeString = '';

	if (days > 0) {
		if (days == 1) {
			timeString = days + ' dzień temu';
		} 
		else {
			timeString = days + ' dni temu' ;
		}
	}
	else if (hours > 0) {
		if (hours == 1) {
			timeString = hours + ' godzinę temu' ;
		} 
		else if (isLastDigit(hours, [2,3,4])) {
			timeString = hours + ' godziny temu' ;
		}
		else {
			timeString = hours + ' godzin temu'
		}
	}
	else if (minutes > 0) {
		if (minutes == 1) {
			timeString = minutes + ' minutę temu';
		} 
		else if (isLastDigit(minutes, [2,3,4])) {
			timeString = minutes + ' minuty temu' ;
		}
		else {
			timeString = minutes + ' minut temu';
		}
	}
	else if (seconds < 15) {
		timeString = 'przed chwilą' ;
	} 
	else if (seconds <= 30) {
		timeString = 'pół minuty temu' ;
	} 
	else {
		timeString = 'prawie minutę temu' ;
	}
	
	return timeString ;
}

$(document).ready(function() {
	
	$('.message-toggle').click(function () {
		var checked = $(this).prop('checked');
		var id = $(this).attr('data-message-id');
		var userid = $(this).attr('data-user-id');
		var action = checked ? 'checked' : 'unchecked';

		$.ajax({
			url: "/api/user/" + userid + "/message/" + action + "/" + id,
			method: 'PUT'
		}).done(function(){
			console.log('toggle ' + checked) ;
		}) 

		console.log('toggle ' + checked) ;
	}) ;

	$('.message-time').each(function(){
		var timestamp = parseInt($(this).text()) ;
		$(this).text(getTimeString(timestamp)) ;
	}) ;

	$('.message-delete').click(function(){
		var userid = $(this).attr('data-user-id') ;
		var messageid = $(this).attr('data-message-id');

		$.ajax({
			url: "/api/user/" + userid + "/message/delete/" + messageid,
			method: 'POST'
		}).done(function(){
			$('#'+messageid).hide();
		})
	}) ;

	$('.message-removeall').click(function(e){
		$.ajax({
			url: $(this).attr('href'),
			method: 'POST'
		}).done(function(){
			$('.list-group').empty();
			$('.items-counter').each(function(){
				$(this).text('0');
			}) ;
		}) ;

		e.preventDefault();
	}) ;
}) ;