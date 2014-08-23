var chart,
	inputs = document.getElementsByTagName('input'),
	svg = document.getElementsByTagName('svg')[0],
	units = document.getElementsByTagName('select');

nv.addGraph(function() {
	chart = nv.models.line()
	.margin({ top: 15, right: 15, bottom: 15, left: 15 })
	.interpolate('cardinal-closed');
	
	nv.utils.windowResize(resize);
	viewbox();
	
	return chart;
});

function viewbox() {
	var w = window.innerWidth, h = window.innerHeight;
	
	chart.width(w).height(h);
	svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
	
	resize();
}

function resize() {
	
	document.getElementsByClassName('input')[0].style.margin = window.innerHeight * .01 + 'px 10px';
}

function gcd(a, b) {
	return b ? gcd(b, a % b) : Math.abs(a);
}

function data(io) {
	var f1 = io[0], f2 = io[2],
	p1 = io[1] * Math.PI / 180, p2 = io[3] * Math.PI / 180,
	t_max = 1 / gcd (f1, f2), v = [];
	
	for(var t = 0; t < t_max; t += t_max / 1200)
		v.push({ x: Math.sin(2 * Math.PI * f1 * t + p1), y: Math.sin(2 * Math.PI * f2 * t + p2) });
	
	return [{ values: v, color: '#33FF33' }];
}

function pattern() {
	var io = [];
	
	for(var i = 0; i < 4; i++) {
		var finite = parseFloat(inputs[i].value);
		
		io.push(finite ? finite : 0);
	}
	
	for(var i = 0; i < 2; i++) {
		var finite = parseInt(units[i].value);
		
		io[2 * i] = parseInt(io[2 * i] * Math.pow(10, finite ? finite : 0));
	}
	
	d3.select('svg').datum(data(io)).call(chart);
}
