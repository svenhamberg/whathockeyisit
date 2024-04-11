//initial time
var d_current = -1;
var h_current = -1;
var m_current = -1;
var s_current = -1;


function flip (upperId, lowerId, changeNumber, pathUpper, pathLower){
	var upperBackId = upperId+"Back";
	$(upperId).src = $(upperBackId).src;
	$(upperId).setStyle("height", "80px");
	$(upperId).setStyle("visibility", "visible");
	$(upperBackId).src = pathUpper+parseInt(changeNumber)+".png";

	$(lowerId).src = pathLower+parseInt(changeNumber)+".png";
	$(lowerId).setStyle("height", "0px");
	$(lowerId).setStyle("visibility", "visible");

	var flipUpper = new Fx.Tween(upperId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
	flipUpper.addEvents({
		'complete': function(){
			var flipLower = new Fx.Tween(lowerId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
			flipLower.addEvents({
				'complete': function(){	
					lowerBackId = lowerId+"Back";
					$(lowerBackId).src = $(lowerId).src;
					$(lowerId).setStyle("visibility", "hidden");
					$(upperId).setStyle("visibility", "hidden");
					}				});					
					flipLower.start('height', 80);

				}
			});
			flipUpper.start('height', 0);


			}//flip

			function flipDate (upperId, lowerId, changeNumber, pathUpper, pathLower){
				var upperBackId = upperId+"Back";
				$(upperId).src = $(upperBackId).src;
				$(upperId).setStyle("height", "30px");
				$(upperId).setStyle("visibility", "visible");
				$(upperBackId).src = pathUpper+parseInt(changeNumber)+".png";

				$(lowerId).src = pathLower+parseInt(changeNumber)+".png";
				$(lowerId).setStyle("height", "0px");
				$(lowerId).setStyle("visibility", "visible");

				var flipUpper = new Fx.Tween(upperId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
				flipUpper.addEvents({
					'complete': function(){
						var flipLower = new Fx.Tween(lowerId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
						flipLower.addEvents({
							'complete': function(){	
								lowerBackId = lowerId+"Back";
								$(lowerBackId).src = $(lowerId).src;
								$(lowerId).setStyle("visibility", "hidden");
								$(upperId).setStyle("visibility", "hidden");
								}				});					
								flipLower.start('height', 30);

							}
						});
						flipUpper.start('height', 0);


						}//flip


						function hockeyClock(){

							// get new time
							now = new Date();
							d = now.getDate();
							h = now.getHours();
							m = now.getMinutes();
							s = now.getSeconds();


							//change pads

							if(d != d_current){
								flipDate('dateUp', 'dateDown', d, 'faces/upper/', 'faces/lower/');
								d_current = d;
							}

							if( h == 9 && m == 9){
								h = 991;
								m = 992;
							}

							if( h != h_current){
								flip('hoursUp', 'hoursDown', h, 'faces/upper/', 'faces/lower/');
								h_current = h;
							}

							if( m != m_current){
								flip('minutesUp', 'minutesDown', m, 'faces/upper/', 'faces/lower/');
								m_current = m;
							}


							if (s != s_current){
								flip('secondsUp', 'secondsDown', s, 'faces/upper/', 'faces/lower/');
								s_current = s;
							}





						}

						setInterval('hockeyClock()', 1000);