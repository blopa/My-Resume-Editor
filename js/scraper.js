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
				var inner = data.innerText;
				if (inner == "")
					inner = data.tagName + " - " + data.className;
				if (inner.length >= 42)
					inner = inner.substring(0, 42);
				
				if (data.tagName == "UL")
					return;
				else if (i == 0)
					content = entry.id;
				else if (content == "title")
					content = [content, inner];
				else if (content.includes("subtitle"))
					content = [content.replace("subtitle ", ""), inner];
				else
					content = [data.className, inner];
				temp.push(content);
				i++;
			});
			items[entry.id] = temp;
		}
	});
	var div = document.createElement('div');
	div.id = "editor";
	div.className = "hidden-print";
	div.style.width = "400px";
	div.style.padding = "5px";
	div.style.background = "#ddd";
	div.style.float = "right";
	var h1 = document.createElement('h1');
	debugger;
	var btn = document.createElement('input');
	btn.type = "button";
	btn.style.width = "100%";
	btn.setAttribute("onclick", "window.print()");
	btn.value = "Print!";
	h1.appendChild(document.createTextNode("Menu"));
	var editor = document.createElement('div');
	editor.id = "editor-content";
	div.appendChild(h1);
	div.appendChild(btn);
	div.appendChild(editor);
	document.body.appendChild(div);
	var cover = document.getElementById("cover-letter");
	var alias = ["{recruiter}", "{company}", "{seen_on}", "{current_company}", "{position}"]; // ADD YOUR ALIAS HERE
	var i;
	var content = "<b>Alias</b><br/>";
	for (i = 0; i < alias.length; i++)
	{
		cover.innerHTML = cover.innerHTML.replace(alias[i], '<abbr class="' + alias[i] + '">' + alias[i] + '</abbr>', "g");
		content += "<p>" + alias[i] + ": <input type='text' placeholder='" + alias[i] + "' oninput='updateCover(this)'></p>";
	}
	content += "<hr>";
	var j;
	var len = Object.keys(items).length;
	for (i = 0; i < len; i++)
	{
		var len2 = items[Object.keys(items)[i]].length;
		for (j = 0; j < len2; j++)
		{
			var data;
			var desc = items[Object.keys(items)[i]][j];
			if (j == 0)
			{
				data = "'" + desc + ";'";
				content += "<input type=" + '"' + "checkbox" + '"' + " onchange=" + '"' + "toggleItem(" + data + ")" + '"' + "> <b>DIV: " + desc + "</b><br/>";
			}
			else if (typeof(desc) == "object")
			{
				data = "'" + items[Object.keys(items)[i]][0] + ";" + desc[0] + "'";
				if ((desc[0] == "title") || (desc[0].includes("sub-")))
					desc = "<b>" + desc[1] + "</b>";
				else
					desc = desc[1];
				content += "<input type=" + '"' + "checkbox" + '"' + " onchange=" + '"' + "toggleItem(" + data + ")" + '"' + "> " + desc + "<br/>";
			}
			else
			{
				data = "'" + items[Object.keys(items)[i]][0] + ";" + desc + "'";
				content += "<input type=" + '"' + "checkbox" + '"' + " onchange=" + '"' + "toggleItem(" + data + ")" + '"' + "> " + desc + "<br/>";
			}
		}
	}
	
	editor.innerHTML = content;
}

function updateCover(data){
	debugger;
	var cover = document.getElementById("cover-letter");
	var classes = cover.getElementsByClassName(data.placeholder);
	var len = Object.keys(classes).length;
	for (var i = 0; i < len; i++)
		classes[i].innerText = data.value;
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