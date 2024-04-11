	xmlDoc=loadXMLDoc("players.xml");

	function getPlayer(cell)
	{

		$( ".active" ).toggleClass( "active" );
		// Used for selecting number from table:
		// document.getElementById(cell.toString()).setAttribute("class", "active");

		// console.log(xmlDoc);

		player=xmlDoc.getElementById(cell);

		// console.log(player);

		jersey=player.getElementsByTagName("jersey")[0].childNodes[0].nodeValue;

		// console.log(jersey);

		name=player.getElementsByTagName("name")[0].childNodes[0].nodeValue;

		// console.log(name);

		bio=player.getElementsByTagName("bio")[0].childNodes[0].nodeValue;

		// console.log(bio);

		photo=player.getElementsByTagName("photo")[0].childNodes[0].nodeValue;

		// console.log(photo);

		link=player.getElementsByTagName("link")[0].childNodes[0].nodeValue;

		// console.log(link);

		// document.getElementById("lookupAnswer").innerHTML="You are "+name+" years old!";

		document.getElementById("lookupTitle").innerHTML=jersey+". "+name;		

		document.getElementById("lookupBody").innerHTML=bio;

		document.getElementById("photo").src=photo;

		document.getElementById("playerLink").href=link;

		document.getElementById("playerLink").innerHTML="Read more about "+name;

		document.getElementById("playerLink").style.visibility="visible";
		
	}