var sendToLed = function(acao) {
	$.ajax({
		type: "POST",
		url: "http://192.168.0.106:3000/led",
		data: { acao: acao },
		success: function(data) {
			mudarStatus(data);
		}
	});
};

var mudarStatus = function(res) {
	if (res=="error") {
		$('#sts').html("Error");
	} else {
		$('#sts').html(res);
	}
};