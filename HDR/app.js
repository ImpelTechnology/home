'use strict';
var idsesion, password, loginName, imagenfoto, notificationWidget;

(function () {
	var app = {
		data: {}
	};

	var bootstrap = function () {
		$(function () {
			app.mobileApp = new kendo.mobile.Application(document.body, {
				transition: 'slide',
				skin: 'nova',
				initial: 'components/home/ingreso.html'
			});
		});
	};

	$(document).ready(function () {
		var navigationShowMoreView = $('#navigation-show-more-view').find('ul'),
			allItems = $('#navigation-container-more').find('a'),
			navigationShowMoreContent = '';

		allItems.each(function (index) {
			navigationShowMoreContent += '<li>' + allItems[index].outerHTML + '</li>';
		});

		navigationShowMoreView.html(navigationShowMoreContent);

		notificationWidget = $("#notification").kendoNotification().data("kendoNotification");
	});

	app.listViewClick = function _listViewClick(item) {
		var tabstrip = app.mobileApp.view().footer.find('.km-tabstrip').data('kendoMobileTabStrip');
		tabstrip.clear();
	};

	if (window.cordova) {
		document.addEventListener('deviceready', function () {
			if (navigator && navigator.splashscreen) {
				navigator.splashscreen.hide();
			}
			bootstrap();
		}, false);
	} else {
		bootstrap();
	}

	app.keepActiveState = function _keepActiveState(item) {
		var currentItem = item;
		$('#navigation-container li.active').removeClass('active');
		currentItem.addClass('active');
	};

	window.app = app;

	app.isOnline = function () {
		if (!navigator || !navigator.connection) {
			return true;
		} else {
			return navigator.connection.type !== 'none';
		}
	};

	app.openLink = function (url) {
		if (url.substring(0, 4) === 'geo:' && device.platform === 'iOS') {
			url = 'http://maps.apple.com/?ll=' + url.substring(4, url.length);
		}

		window.open(url, '_system');
		if (window.event) {
			window.event.preventDefault && window.event.preventDefault();
			window.event.returnValue = false;
		}
	};

	/// start appjs functions
	/// end appjs functions
	app.showFileUploadName = function (itemViewName) {
		$('.' + itemViewName).off('change', 'input[type=\'file\']').on('change', 'input[type=\'file\']', function (event) {
			var target = $(event.target),
				inputValue = target.val(),
				fileName = inputValue.substring(inputValue.lastIndexOf('\\') + 1, inputValue.length);

			$('#' + target.attr('id') + 'Name').text(fileName);
		});

	};

	app.clearFormDomData = function (formType) {
		$.each($('.' + formType).find('input:not([data-bind]), textarea:not([data-bind])'), function (key, value) {
			var domEl = $(value),
				inputType = domEl.attr('type');

			if (domEl.val().length) {

				if (inputType === 'file') {
					$('#' + domEl.attr('id') + 'Name').text('');
				}

				domEl.val('');
			}
		});
	};

} ());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function inspeccionar(obj) {
	try {
		var msg = '';
		for (var property in obj) {
			if (typeof obj[property] == 'function') {
				var inicio = obj[property].toString().indexOf('function');
				var fin = obj[property].toString().indexOf(')') + 1;
				var propertyValue = obj[property].toString().substring(inicio, fin);
				msg += (typeof obj[property]) + ' ' + property + ' : ' + propertyValue + ' ;\n';
			} else if (typeof obj[property] == 'unknown') {
				msg += 'unknown ' + property + ' : unknown ;\n';
			} else {
				msg += (typeof obj[property]) + ' ' + property + ' : ' + obj[property] + ' ;\n';
			}
		}
		return msg;
	} catch (e) {
		alert(e);
	}
}
function beforeDrawerShow(e) {
	if ((e.view.currentView.id == "components/home/ingreso.html") || (e.view.currentView.id == "components/Menu/menu.html") || (e.view.currentView.id == "components/CrearCuenta/creacuenta.html")) {
		e.preventDefault();
	}
}
function mens(Mensaje, Tipo) {
	var valorIzq=(Mensaje.length)*4;
	notificationWidget.setOptions({
		position: {
			top: Math.floor($(window).width() / 2),
			left: Math.floor($(window).width() / 2 - valorIzq),
			bottom: 0,
			right: 0
		}
	});
	notificationWidget.showText(Mensaje, Tipo);
}
// END_CUSTOM_CODE_kendoUiMobileApp