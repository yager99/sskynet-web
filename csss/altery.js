/*! legenddigital.com.au - v1.0.0 - 2017-06-26 */

$(document).ready(function(){
	// var t1 = window.setInterval(getData,3000); 
	// var t2 = window.setInterval(freshData,5000); 
}); 

function getData(){
	
	$.ajax({
		type: 'get',
		url: www_path+'?con=web&ctl=timer&act=fresh_data',
		success: function(data){
			if(data!="")
			{
				var obj = eval('(' + data + ')');
				if(obj.data.ETH>0)
					$("#eth").html(obj.data.ETH);
				if(obj.data.BTC>0)
					$("#btc").html(obj.data.BTC);
			}
		},
		error: function(){
			console.log('error');
		}
	});
}
function freshData(){
	$.ajax({
		type: 'get',
		url: www_path+'?con=web&ctl=timer&act=index',
		success: function(data){
		},
		error: function(){
			console.log('error');
		}
	});
}


function checkData()
{
	var tp = $("input[name='wallet_address_type']:checked").val();
	var how_much = $("input[name='how_much']").val();
	var wallet_address = $("input[name='wallet_address']").val();
	if(how_much==''){
		alert("请输入合法的认购金额");
		$("input[name='how_much']").focus();
		return;
	}
	if(isNaN(how_much)){
		alert("请输入合法的认购金额");
		$("input[name='how_much']").focus();
		return;
	}
		
	if(tp=="BTC"||tp=="ETH")
	{
		$('.response').empty();
		$.ajax({
			type: 'post',
			url: www_path+'member/investment',
			data:{'wallet_address_type':tp, 'how_much':how_much, 'wallet_address':wallet_address, 'step':1},
			success: function(data){
				var obj = eval('(' + data + ')');
				if (obj.status == 200) {
					$('#confirm').attr('onclick',"confirmBuy();");
					$("input[name='buy']").val(obj.data.payment);
					$("input[name='pay']").val(obj.data.hcash);
					$("input[name='wallet_address']").val(obj.data.wallet_address);
					$('#tp').html(obj.data.wallet_address_type);
				}
				else{
					var str = '';
					if (obj.error) str += '<p class="investment_top">'+ obj.error +'</p>';
					if (obj.msg) str += '<p class="investment_top">'+ obj.msg +'</p>';
					$('.response').html(str);
					$('#confirm').removeAttr('onclick');
				}
				popOpen('inves-order');
			},
			error: function(){
				console.log('error');
			}
		});
	}
	else
	{
		alert("请选择支付币种");
	}

}
function resetData(){
	var tp = $("input[name='wallet_address_type']:checked").val();
	var how_much = $("input[name='pay']").val();
	var wallet_address = $("input[name='wallet_address']").val();
	if(how_much==''){
		alert("请输入合法的认购金额");
		$("input[name='pay']").focus();
		return;
	}
	if(isNaN(how_much)){
		alert("请输入合法的认购金额");
		$("input[name='pay']").focus();
		return;
	}
		
	if(tp=="BTC"||tp=="ETH")
	{
		$('.response').empty();
		$.ajax({
			type: 'post',
			url: www_path+'member/investment',
			data:{'wallet_address_type':tp, 'how_much':how_much, 'wallet_address':wallet_address, 'step':2},
			success: function(data){
				var obj = eval('(' + data + ')');
				if (obj.status == 200) {
					$('#confirm').attr('onclick',"confirmBuy();");
					var obj = eval('(' + data + ')');
					$("input[name='buy']").val(obj.data.payment);
					$("input[name='pay']").val(obj.data.hcash);
					$("input[name='wallet_address']").val(obj.data.wallet_address);
					$('#tp').html(obj.data.wallet_address_type);
				}
				else{
					var str = '';
					if (obj.error) str += '<p class="investment_top">'+ obj.error +'</p>';
					if (obj.msg) str += '<p class="investment_top">'+ obj.msg +'</p>';
					$('.response').html(str);
					$('#confirm').removeAttr('onclick');
				}
				popOpen('inves-order');
			},
			error: function(){
				console.log('error');
			}
		});
	}
	else
	{
		alert("请选择支付币种");
	}

}

function fresh(){
	
	$.ajax({
		type: 'get',
		url: www_path+'member/fresh',
		success: function(data){
			if(data!="")
			{
				var obj = eval('(' + data + ')');
				if(obj.data.surplus>=0)
					$("#_today").html(obj.data.surplus);
				if(obj.data.progress>=0)
				{
					$(".cur").attr('style','width:'+obj.data.progress+'%;');
					$(".cur-txt").attr('style','left:'+obj.data.progress+'%;').html(obj.data.progress+'%');
				}
				if(obj.data.btc>=0)
					$("#_btc").html(obj.data.btc+' btc');
				if(obj.data.eth>=0)
					$("#_eth").html(obj.data.eth+' eth');
			}
		},
		error: function(){
			console.log('error');
		}
	});
}


var pageTime = 0;
function showTime() {
	var _day0 = $('.day'),
	_hours0 = $('.hour'),
	_minute0 = $('.minute'),
	_second0 = $('.second');
	var dist = tmDistance - pageTime * 1000;
	if ( dist >= 0 ) {
		var d = Math.floor( dist / ( 1000 * 60 * 60 * 24 ) );
		var h = Math.floor( dist / ( 1000 * 60 * 60 ) ) % 24;
		var m = Math.floor( dist / ( 1000 * 60 ) ) % 60;
		var s = Math.floor( dist / ( 1000 ) ) % 60;
		if (d < 10) d = '0'+d;
		if (h < 10) h = '0'+h;
		if (m < 10) m = '0'+m;
		if (s < 10) s = '0'+s;

		_day0.html(d.toString());
		_hours0.html(h.toString());
		_minute0.html(m.toString());
		_second0.html(s.toString());

		pageTime++;
		if ( dist > 0 ) {
			setTimeout(function(){ showTime(); }, 1000);
		}
		else {
		_day0.html("00");
		_hours0.html("00");
		_minute0.html("00");
		_second0.html("00");
			//window.location.href = window.location.href;
		}
	}
}


function showIndexTime() {
	var _day0 = $('._day'),
	_hours0 = $('._hour'),
	_minute0 = $('._minute'),
	_second0 = $('._second');
	var dist = _tmDistance - pageTime * 1000;
	if ( dist >= 0 ) {
		var d = Math.floor( dist / ( 1000 * 60 * 60 * 24 ) );
		var h = Math.floor( dist / ( 1000 * 60 * 60 ) ) % 24;
		var m = Math.floor( dist / ( 1000 * 60 ) ) % 60;
		var s = Math.floor( dist / ( 1000 ) ) % 60;
		if (d < 10) d = '0'+d;
		if (h < 10) h = '0'+h;
		if (m < 10) m = '0'+m;
		if (s < 10) s = '0'+s;

		_day0.html(d.toString());
		_hours0.html(h.toString());
		_minute0.html(m.toString());
		_second0.html(s.toString());

		pageTime++;
		if ( dist > 0 ) {
			setTimeout(function(){ showIndexTime(); }, 1000);
		}
		else {
		_day0.html("00");
		_hours0.html("00");
		_minute0.html("00");
		_second0.html("00");
			//window.location.href = window.location.href;
		}
	}
}

