/**
 * PermaPlan
 * By Patrick Herzberg and Stefan Wehrmeyer
 * Licensed under the MIT license.
 *
 */
(function(){

vbb_permalink_init();

function vbb_permalink_init() {
	/* add head */
	var tbody = document.getElementsByClassName('overviewTableHead');
	if(vbb_permalink_has_class(tbody[0],'vbb-permalink')) {
		return false;
	}

	tbody[0].className += " vbb-permalink";

	var rows = tbody[0].getElementsByTagName("tr");
	var cell = document.createElement("td");
		cell.innerHTML = "Permalink";
		cell.style.padding = "2px 10px";
		rows[0].appendChild(cell);


	/* apply share link */
	tbody = document.getElementById('conGroup_Foot');

	var thead = tbody.getElementsByClassName('separatorSmall');
	thead[0].colSpan += 1;

	rows = tbody.getElementsByClassName('tpOverview');

	for(i = 0; i < rows.length; i++) {
		if(!vbb_permalink_has_class(rows[i],'navi')) {

			cell = document.createElement("td");
			cell.innerHTML = "<a href=\""+vbb_permalink_get_url(rows[i])+"\">share this</a>";
			cell.style.padding = "2px 10px";
			rows[i].appendChild(cell);
		} else {
			var navi = rows[i].getElementsByClassName('last');
			navi[0].colSpan +=1;
		}
	}
}

function vbb_permalink_get_url(row) {
	var from = document.getElementById('HFS_from').value,
		to = document.getElementById('HFS_to').value,
		date = document.getElementById('HFS_date_REQ0').value,
		hwai = "C0-0";//row.id.substring(10),
		url = '',
		details = document.getElementsByClassName('details');

		var timeDom = row.getElementsByClassName('planed');
		time = timeDom[0].innerHTML.substring(1,6);

	url = 'dn?From=' + from + '%21&To=' + to + '%21&time=' + time + '&date=' + date + '&start=1' ;
	url += '&HWAI=CONNECTION$' + hwai + '!id=' + hwai + '!HwaiConId=' + hwai + '!HwaiDetailStatus=details';

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
