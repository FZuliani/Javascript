var nombre_a_trouver; //variable qui contiendra le nombre à trouver

var nb1;
var essai;
document.getElementById("rechercher").setAttribute("disabled", " ");

document.getElementById("rechercher").onkeypress = chercher;
document.getElementById("start").onclick = start;



//début de la partie
function start()
{
	nb1 = 0;
	essai = 0;
	document.getElementById("start").textContent = "Jouer!";
	//génère le nombre random
	nombre_a_trouver = Math.floor((Math.random() * 9999) + 1);
	document.getElementById("rechercher").removeAttribute("disabled");
	//crée le nombre entre 0000 et 9999
	if (nombre_a_trouver < 10)
	{
		nombre_a_trouver = "000" + nombre_a_trouver;
	}	
	else if (nombre_a_trouver < 100)
	{
		nombre_a_trouver = "00" +nombre_a_trouver; 
	}
	else if (nombre_a_trouver < 1000)
	{
		nombre_a_trouver = "0" + nombre_a_trouver;
	}
	else
	{
		nombre_a_trouver = nombre_a_trouver.toString();
	}
	//disparition du bouton
	document.getElementById("start").setAttribute("hidden", " ");

	//création du tableau
	var table = document.createElement("table");
	table.id = "essai";
	document.getElementById("div").append(table);
	document.getElementById("essai").setAttribute("border", "solide");
	var caption = document.createElement("caption");
	caption.id = "caption";
	document.getElementById("essai").append(caption);
	document.getElementById("caption").textContent = "les essais";

	//crée et ajoute les paragraphes où serront affiché les indice
	var p = document.createElement("p");
	p.id = "p0";
	p.className = "indice";
	document.body.append(p);
	var p = document.createElement("p");
	p.id = "p1";
	p.className = "indice";
	document.body.append(p);
	var p = document.createElement("p");
	p.id = "p2";
	p.className = "indice";
	document.body.append(p);
	var p = document.createElement("p");
	p.id = "p3";
	p.className = "indice";
	document.body.append(p);

	alert("Un nombre a été généré!");

}

//vérifie chaque chiffre et dit le nombre qu'il y a dans le nombre à trouver
function chercher(e)
{

	nombre = document.getElementById("rechercher").value; //valeur de l'input

	if (e.key == "Enter")
	{
		if (essai <9) //si il ne trouve pas à la 10eme fois, alors il perd
		{

			//Création du tr pour le premier essai
			var tr = document.createElement("tr");
			tr.id = "tr" + essai;
			document.getElementById("essai").append(tr);
			//test de chaque élément de l'input par rapport au nombre à trouver
			for (var i = 0; i < nombre.length; i++) 
			{
				var nb = 0;
				var position = false;
				for (var j = 0; j < nombre_a_trouver.length; j++) 
				{

					if (nombre_a_trouver[j] == nombre[i])
					{
						nb += 1;
						if (i == j)
						{
							position = true;
						}
					}
				}

				//crée et ajoute les nombres dans le tableau
				var td = document.createElement("td");
				td.id = "td" + i+essai;
				document.getElementById("tr"+essai).append(td)
				document.getElementById("td" + i +essai).textContent = nombre[i];


				//affiche les indices et color les fonds des chiffres qui sont bon (jaune: bon chiffre, pas bon endroit et rouge: bon chiffre et bon endroit)
				if (position == true)
				{
					document.getElementById("p" + i).textContent = "il y a " + nb + " fois le nombre " + nombre[i] + " dans le nombre à trouver et il est bien placé!";
					document.getElementById(td.id).setAttribute("bgcolor", "red");

				}
				else
				{
					document.getElementById("p" + i).textContent = "il y a " + nb + " fois le nombre " + nombre[i] + " dans le nombre à trouver";
					if (nb >= 1)
					{
						document.getElementById(td.id).setAttribute("bgcolor", "yellow"); 
					}
				}
				
			}

			//si il a trouvé tout les nombres et les bonnes positions
			if (nombre_a_trouver == nombre)
			{
				alert("bravo, le nombre à trouver était bien: " + nombre_a_trouver);
				document.getElementById("start").textContent = "Rejouer?";
				document.getElementById("rechercher").setAttribute("disabled", " ");
				document.getElementById("start").removeAttribute("hidden");
				document.getElementById("essai").remove();
				//supprime les indices
			 	document.getElementsByClassName("indice")[3].remove();
			 	document.getElementsByClassName("indice")[2].remove();
			 	document.getElementsByClassName("indice")[1].remove();
			 	document.getElementsByClassName("indice")[0].remove();
			}
			
			essai++;
		}
		else //si il n'a pas trouvé au bout de 10 essais
		{
			
			alert("désolé, vous avez perdu, le nombre à trouver était : " + nombre_a_trouver);
			document.getElementById("start").textContent = "Rejouer?";
			document.getElementById("start").removeAttribute("hidden");
			document.getElementById("rechercher").setAttribute("disabled", " ");

			document.getElementById("essai").remove(); //supprime le tableau

			//supprime les indices
			document.getElementsByClassName("indice")[3].remove();
			document.getElementsByClassName("indice")[2].remove();
			document.getElementsByClassName("indice")[1].remove();
			document.getElementsByClassName("indice")[0].remove();
			
		}	
	document.getElementById("rechercher").value = "";
	}
}
