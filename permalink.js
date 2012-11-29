/**
 * todo:  	later (geht nicht)
 *			on bookmark click share dom
 *			share dom with url of current row
 *			safari plugin
 */
vbb_permalink_init();

function vbb_permalink_init() {
	/* apply share link */
	var table = document.getElementsByClassName('resultTable');
	table.getElementsByClassName('');
}

function vbb_permalink_get_url(row) {
	var from = document.getElementById('HFS_from').value,
		to = document.getElementById('HFS_to').value,
		time = document.getElementById('HFS_time_REQ0').value,
		date = document.getElementById('HFS_date_REQ0').value,
		timesel = !!document.getElementById('HFS_timesel_REQ0_1').checked ? 'depart' : 'arrive',
		hwai = [],
		url = '',
		details = document.getElementsByClassName('details');

	for(var i = 0; i < details.length; i++) {
	  if (details[i].className.indexOf('menuLinks') !== -1 || details[i].className.indexOf('hide') !== -1) {
	    continue;
	  }
	  hwai.push(details[i].id.substring(2));
	}
	url = 'dn?From=' + from + '%21&To=' + to + '%21&time=' + time + '&date=' + date + '&start=1&timesel=' + timesel;

	if(hwai.length) {
		for(i = 0; i < hwai.length; i++) {
			url += '&HWAI=CONNECTION$' + hwai[i] + '!id=' + hwai[i] + '!HwaiConId=' + hwai[i] + '!HwaiDetailStatus=details&seqnr=25';
		}
	}
	return url;
	//history.pushState({}, "", url);
}
