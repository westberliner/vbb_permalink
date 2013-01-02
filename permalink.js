/**
 * PermaPlan
 * By Patrick Herzberg and Stefan Wehrmeyer
 * Licensed under the MIT license.
 *
 */
(function(){

var vbb = true;
vbb_permalink_init();

function vbb_permalink_init() {
	/* corret website? */
	if(window.location.host != "reiseauskunft.bahn.de" && window.location.host!= "fahrinfo.vbb.de") {
		/* alert why it failed */
		alert('PermaPlan is only usable on following websites: reiseauskunft.bahn.de and fahrinfo.vbb.de.');
		return false;
	}
	/* vbb? */
	vbb = (window.location.host == "fahrinfo.vbb.de")?true:false;

	/* add head */
	var tableclass = (vbb)?'overviewTableHead':'result';
			tbody = document.getElementsByClassName(tableclass);
	if(vbb_permalink_has_class(tbody[0],'vbb-permalink')) {
		/* alert why it failed */
		alert('PermaPlan already applied.');
		return false;
	}

	tbody[0].className += " vbb-permalink";

	var rows = tbody[0].getElementsByTagName("tr");
	var cell = document.createElement("th");
	cell.innerHTML = "Permalink";
	cell.style.padding = "2px 10px";
	rows[0].appendChild(cell);


	/* apply share link */
	tbody = (vbb)?document.getElementById('conGroup_Foot'):tbody[0].getElementsByTagName("tbody")[0];

	if(vbb) {
		var thead = tbody.getElementsByClassName('separatorSmall');
		thead[0].colSpan += 1;
	}

	var rowclass = (vbb)?'tpOverview':'firstrow'
	rows = tbody.getElementsByClassName(rowclass);
	var activeUrl, count = 0, noPropagate = function(e) {
		e.stopPropagation();
	};

	/* addept link and detail rows */
	if(!vbb) {
		var links = tbody.getElementsByClassName('links'),
				details = tbody.getElementsByClassName('details');

		links = Array.prototype.slice.call(links);
		details = Array.prototype.slice.call(details);
		var extras = links.concat(details);
	
		for(var i = 0; i < extras.length; i++) {
			/** 	
			 *	cannot use lastChild (readonly) 
			 * 	http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-61AD09FB
			 */
			var children = extras[i].children;
			if(children.length == 1) {
				extras[i].children[0].colSpan += 1;
			} else {
				extras[i].children[children.length-1].colSpan +=1;
			}
		}
	}

	for(var i = 0; i < rows.length; i++) {
		if(!vbb_permalink_has_class(rows[i],'navi')) {
			count += 1;
			if(vbb_permalink_has_class(rows[i],'active')) {
				activeUrl = vbb_permalink_get_url(rows[i]);
			}
			cell = document.createElement("td");
			cell.innerHTML = '<a href="' + vbb_permalink_get_url(rows[i]) + '">Permalink</a>';
			cell.style.padding = "2px 10px";
			cell.addEventListener("click", noPropagate);
			if(!vbb) {
				cell.rowSpan = 2;
			}
			rows[i].appendChild(cell);
		} else if(vbb){
			rows[i].getElementsByClassName('last')[0].colSpan +=1;
		}
	}
	if (count === 3) {
		if (activeUrl) {
			history.pushState(null, null, activeUrl);
		} else {
			history.pushState(null, null, vbb_permalink_get_url());
		}
	}
}

function vbb_permalink_get_url(row) {
	var ids = (vbb)?['HFS_from','HFS_to','HFS_date_REQ0','HFS_time_REQ0']:['locS0','locZ0','REQ0JourneyDate','REQ0JourneyTime'];
	var from = document.getElementById(ids[0]).value,
		to = document.getElementById(ids[1]).value,
		time = document.getElementById(ids[3]).value,
		date,
		hwai,
		url = '',
		details = document.getElementsByClassName('details');
	/* bahn.de date input has no id */
	if(vbb) {
		date = document.getElementById(ids[2]).value;
	} else {
		date = document.getElementsByName(ids[2])[0].value;
	}

	if (row){
		if(vbb) {
			hwai = row.id.substring(10);
		} else {
			hwai = row.children[0].children[0].id.substring(7);
		}
		var cellclass = (vbb)?'planed':'time';
		var timeDom = row.getElementsByClassName(cellclass);
		time = timeDom[0].innerHTML.substring(1,6);
	}

	url = 'dn?From=' + from + '%21&To=' + to + '%21&time=' + time + '&date=' + date + '&start=1' ;
	if (hwai) {
		url += '&HWAI=CONNECTION$' + hwai + '!id=' + hwai + '!HwaiConId=' + hwai + '!HwaiDetailStatus=details';
	}
	url += '#focus';

	return url;
}

function vbb_permalink_has_class(el, selector) {
   var className = " " + selector + " ";
   if ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
    return true;
   }
   return false;
 }

}());
