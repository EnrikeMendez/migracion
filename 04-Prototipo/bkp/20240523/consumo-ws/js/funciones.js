var	url_ws	=	"http://192.168.0.181:8085/ServicioLogis/";

function init_page()
{
	create_token();
	validate_session();
}
function create_token()
{
	var	token	=	"";
	var	body	=	JSON.stringify(
									{
										"username":"MOMK951014PWA",
										"passwordUsername":"Logis2024#"
									}
					);
	$.ajax(
			{
				type:	"POST",
				dataType:	"json",
				contentType:	"application/json; charset=utf-8",
				contentType:	"application/json",
				crossDomain:	true,
				url:	url_ws + "usuario",
				data:	body,
				success:	function(data)
							{
								token = data.token;
								/*console.log('Token => ' + token);*/
								create_cookie("tkn",token);
							},
				error:	function(xhr)
						{
							console.log(xhr);
							alert('Error: ' + xhr.responseText);
							token = "-1";
						}
			}
	);
	
	return token;
}
function validate_session()
{
	const d = new Date();
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	var total_secs = 0;
	var total_mins = 0;
	var total_days = 0;
	var total_hours = 0;
	var data_number = 0;
	var session_init = "";
	var ini_date = new Date();
	var end_date = new Date();
	
	session_init = get_cookie("tkn_time");
	/*d.M.y.H.m.s*/
	
	total_secs = 1000 * 60;
	total_mins = 1000 * 60 * 60;
	total_hours = 1000 * 60;
	total_days = 1000 * 60 * 24;
	
	d.setDate(session_init.split(".")[0]);
	d.setMonth(session_init.split(".")[1]);
	d.setFullYear(session_init.split(".")[2]);
	d.setHours(session_init.split(".")[3]);
	d.setMinutes(session_init.split(".")[4]);
	d.setSeconds(session_init.split(".")[5]);
	
	ini_date = d;
	end_date = new Date();
	data_number = end_date - ini_date;
	
	console.log("ini_date: " + ini_date);
	console.log("end_date: " + end_date);
	
	seconds = data_number / 1000;
	minutes = seconds / 60;
	hours = minutes / 60;
	days = hours / 24;
	
	/*
	Estas instrucciones se utilizarán para controlar el tiempo que puede mantenerse activa una sesión:
	if(hours > 3)
	{
		sessionStorage.removeItem("tkn");
	}
	*/
	if(minutes > 30)
	{
		sessionStorage.removeItem("tkn");
	}
}
function create_cookie(name,value)
{
	const cookie_date = new Date();
	sessionStorage.setItem(name, value);
	sessionStorage.setItem(name + "_time", getDateNow());
}
function get_cookie(name)
{
	var cookie_value = "";
	
	try
	{
		cookie_value = sessionStorage.getItem(name);
	}
	catch ({ errname, errmessage })
	{
		console.log("Error " + errname + ": " + errmessage);
	}
	
	return cookie_value;
}
function getDateNow()
{
	var result = "";
	var separator = ".";
	const d = new Date();
	/*Format: d.M.y.H.m.s*/
	
	result += d.getDate().toString();
	result += separator;
	result += d.getMonth().toString();
	result += separator;
	result += d.getFullYear().toString();
	result += separator;
	result += d.getHours().toString();
	result += separator;
	result += d.getMinutes().toString();
	result += separator;
	result += d.getSeconds().toString();
	
	return result;
}

function ws_cursor()
{
	var result	=	new Object();
	var tblRes	=	null;
	var token	=	get_cookie("tkn");
	var body	=	JSON.stringify(
									{
										"parametroUno":"0",
										"parametroDos":"50"
									}
					);
	/*
	if(token == null)
	{
		redirect("login");
	}
	*/
	$.ajax(
			{
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				contentType: "application/json",
				crossDomain: true,
				url: url_ws + "refCursor",
				data: body,
				beforeSend:	function(xhr, settings)
							{
								xhr.setRequestHeader('Authorization','Bearer ' + token );
							},
				success:	function(data)
							{
								result.resultado = data.resultado;
								result.mensaje = data.mensaje;
								result.codigo = data.codigo;
								result.ListRefCursor = data.listRefCursor;
								
								console.log(result);
							},
				error:	function(xhr)
						{
							console.log(xhr);
							alert('Error: ' + xhr.responseText);
							result = null;
						}
			}
	);
	
	return result;
}