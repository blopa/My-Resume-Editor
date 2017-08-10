window.onload = function(){
	loadMenu();
};

function loadMenu(){
	var items = [];
	var allIds = document.querySelectorAll('*[id]');
	allIds.forEach(function(entry){
		if (entry.className != "exclude")
		{
			//console.log(entry);
			var classes = entry.querySelectorAll('*[class]');
			var temp = [];
			var i = 0;
			classes.forEach(function(data){
				var content = data.className;
				if (i == 0)
					content = entry.id;
				else if (content == "title")
					content = [content, data.innerText];
				else if (content.includes("subtitle"))
					content = [content.replace("subtitle ", ""), data.innerText];
				temp.push(content);
				i++;
			});
			items[entry.id] = temp;
		}
	});
	debugger;
	var div = document.createElement('div');
	div.id = "editor";
	div.style.width = "400px";
	div.style.background = "#ddd";
	div.style.float = "right";
	var h1 = document.createElement('h1');
	h1.appendChild(document.createTextNode("Menu"));
	div.appendChild(h1);
	var editor = document.createElement('div');
	editor.id = "editor-content";
	div.appendChild(editor);
	document.body.appendChild(div);
	var content = "";
	var i;
	var j;
	var len = Object.keys(items).length;
	for (i = 0; i < len; i++)
	{
		var len2 = items[Object.keys(items)[i]].length;
		for (j = 0; j < len2; j++)
		{
			var data;
			if (j == 0)
			{
				data = "'" + items[Object.keys(items)[i]][j] + ";'";
				content += "<input type=" + '"' + "checkbox" + '"' + " onchange=" + '"' + "toggleItem(" + data + ")" + '"' + "> <b>DIV: " + items[Object.keys(items)[i]][j] + "</b><br/>";
			}
			else if (typeof(items[Object.keys(items)[i]][j]) == "object")
			{
				if ((items[Object.keys(items)[i]][j][0] == "title") || (items[Object.keys(items)[i]][j][0].includes("sub-")))
				{
					data = "'" + items[Object.keys(items)[i]][0] + ";" + items[Object.keys(items)[i]][j][0] + "'"
					content += "<input type=" + '"' + "checkbox" + '"' + " onchange=" + '"' + "toggleItem(" + data + ")" + '"' + "> " + items[Object.keys(items)[i]][j][1] + "<br/>";
				}
			}
			else
			{
				data = "'" + items[Object.keys(items)[i]][0] + ";" + items[Object.keys(items)[i]][j] + "'"
				content += "<input type=" + '"' + "checkbox" + '"' + " onchange=" + '"' + "toggleItem(" + data + ")" + '"' + "> " + items[Object.keys(items)[i]][j] + "<br/>";
			}
		}
	}
	
	editor.innerHTML = content;
}

function toggleItem(data){
	debugger;
	var id = data.split(";")[0];
	var cla = data.split(";")[1];
	var doc = document.getElementById(id);
	if (cla != "")
	{
		var claitem = doc.getElementsByClassName(cla)[0];
		if (claitem.style.display == "none")
			claitem.style.display = "";
		else
			claitem.style.display = "none";
		
		var att = doc.querySelectorAll("[for]");
		if (att)
		{
			var len = Object.keys(att).length;
			var i = 0;
			for (i = 0; i < len; i++){
				if (att[i].getAttribute("for") == cla)
				{
					if (att[i].style.display == "none")
						att[i].style.display = "";
					else
						att[i].style.display = "none";
				}
			}
		}
	}
	else
	{
		if (doc.style.display == "none")
			doc.style.display = "";
		else
			doc.style.display = "none";
	}				
}