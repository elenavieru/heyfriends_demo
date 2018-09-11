(function (blink) {
	'use strict';

	var heyfriends_demoStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	heyfriends_demoStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_heyfriends_demo',
		ckEditorStyles: {
			name: 'heyfriends_demo',
			styles: [

				{ name: 'Título verde', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Título amarillo', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Título azul', element: 'h4', attributes: { 'class': 'bck-title3'} },
				{ name: 'Título guess', element: 'h4', attributes: { 'class': 'bck-title4'} },
				{ name: 'Título wendy', element: 'h4', attributes: { 'class': 'bck-title5'} },
				{ name: 'Título CLIL', element: 'h4', attributes: { 'class': 'bck-title6'} },
				{ name: 'Título Cool', element: 'h4', attributes: { 'class': 'bck-title7'} },
				{ name: 'Título Project', element: 'h4', attributes: { 'class': 'bck-title8'} },

				{ name: 'Ejemplo', element: 'span', attributes: { 'class': 'bck-example' }},

				{ name: 'Lista ordenada1', element: 'ol', attributes: { 'class': 'bck-ol1' } },
				{ name: 'Lista ordenada2', element: 'ol', attributes: { 'class': 'bck-ol2' } },
				{ name: 'Lista ordenada3', element: 'ol', attributes: { 'class': 'bck-ol3' } },

				{ name: 'Lista desordenada', element: 'ul', attributes: { 'class': 'bck-ul1' } },
				{ name: 'Lista desordenada2', element: 'ul', attributes: { 'class': 'bck-ul2' } },

				{ name: 'Tabla sin bordes', element: 'table', attributes: { 'class': 'bck-table bck-table-borderless' } },
				{ name: 'Tabla normal', element: 'table', attributes: { 'class': 'bck-table bck-table-normal' } },
				{ name: 'Tabla borde azul', element: 'table', attributes: { 'class': 'bck-table bck-table-bordered' } },
				{ name: 'Celda azul', element: 'td', attributes: { 'class': 'bck-td' } },

				{ name: 'Caja1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-1' } },
				{ name: 'Caja2', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-2' } },


				{ name: 'Icono Escuchar', element: 'span', attributes: { 'class': 'icon icon-escuchar' } },
				{ name: 'Icono Lupa', element: 'span', attributes: { 'class': 'icon icon-lupa' } },
				{ name: 'Icono Leer', element: 'span', attributes: { 'class': 'icon icon-leer' } },
				{ name: 'Icono Travieso', element: 'span', attributes: { 'class': 'icon icon-travieso' } },
				{ name: 'Icono Check', element: 'span', attributes: { 'class': 'icon icon-check' } },
				{ name: 'Icono Conversación', element: 'span', attributes: { 'class': 'icon icon-conversacion' } },
				{ name: 'Icono A', element: 'span', attributes: { 'class': 'icon icon-A' } },
				{ name: 'Icono 2', element: 'span', attributes: { 'class': 'icon icon-2' } },
				{ name: 'Icono Círculo', element: 'span', attributes: { 'class': 'icon icon-circulo' } },
				{ name: 'Icono Question', element: 'span', attributes: { 'class': 'icon icon-question' } },
				{ name: 'Icono Recortar', element: 'span', attributes: { 'class': 'icon icon-recortar' } },
				{ name: 'Icono Pegar', element: 'span', attributes: { 'class': 'icon icon-pegar' } },
				{ name: 'Icono Unir Lápiz', element: 'span', attributes: { 'class': 'icon icon-unir' } },
				{ name: 'Icono Actuar', element: 'span', attributes: { 'class': 'icon icon-actuar' } },
				{ name: 'Icono Dibujar', element: 'span', attributes: { 'class': 'icon icon-dibujar' } },
				{ name: 'Icono Cantar', element: 'span', attributes: { 'class': 'icon icon-cantar' } }

			]
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			if(window.esWeb) return;
			this.removeFinalSlide();
			this.addSlideNavigators();
			this.handleScrollEnd();
			window.editar && this.configEditor();

			if ($('.navbar-bottom').length > 0) {
 				$('.navbar-bottom ol').wrapAll('<div id="bottom-navigator"></div>');
		 		var width = 0;
		 		$('.navbar-bottom li').each(function(i, elem){ width += $(elem).outerWidth(true); });
		 		$('.navbar-bottom ol').css('width', width * 1.1);
		 		var scroll = new IScroll('#bottom-navigator', {
		 			scrollX: true,
		 			scrollY: false,
		 			eventPassthrough: true
		 		});
		 		scroll.on('scrollEnd', this.handleScrollEnd);
		 		this.handleScrollEnd.call(scroll);
	 		}

		},

		removeFinalSlide: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.removeFinalSlide.call(this, true);
		},

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				var initials =  blink.activity.name.match(/\b(\w)/g);

				initials = initials.slice(0, 2);
				return $(this).html().trim() + ' - ' + initials.join('') + ' > ' + blink.courseInfo.unit;
			});
		},

		handleScrollEnd: function () {
 			$('#bottom-navigator')
 				.removeClass('show_left')
 				.removeClass('show_right');

 			if (this.x < 0) {
 				$('#bottom-navigator').addClass('show_left');
 			}
 			if (this.x > this.maxScrollX) {
 				$('#bottom-navigator').addClass('show_right');
 			}

 		},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	heyfriends_demoStyle.prototype = _.extend({}, new blink.theme.styles.basic(), heyfriends_demoStyle.prototype);

	blink.theme.styles.heyfriends_demo = heyfriends_demoStyle;

})( blink );

$(document).ready(function () {

    $('.box-2').each(function(){
    	$(this).prepend('<div class="box-title">' +
    		'<span class="box-title-main">PROJECT</span>' +
    		'<span class="box-pico"></span>' +
    		'<span class="box-title-secondary">Preview</span>' +
    	'</div>' +
    	'<div class="box-back-title">' +
    		'<span class="box-title-main">PROJECT</span>' +
    		'<span class="box-pico"></span>' +
    		'<span class="box-title-secondary">Preview</span>' +
    	'</div>');
    });

    $('.box-3, .box-4, .box-5, .box-8').each(function(){
    	$(this).prepend('<div class="box-title">' +
    		'<span class="box-title-main">What about <strong>you</strong>?</span>' +
    		'<span class="box-pico"></span>' +
    	'</div>').promise().done(function(){
    		if( $(this).hasClass('box-4') ) {
    			$(this).find('.box-title-main').html('Writing rule');
    		} else if ($(this).hasClass('box-5')) {
    			$(this).find('.box-title-main').html('I can...');
    		} else if ($(this).hasClass('box-8')) {
    			$(this).find('.box-title-main').html('Pronunciation');
    		}
    	});
    });

    $('.box-6, .box-7').each(function(){
    	$(this).prepend('<div class="box-title">!</div>')
    		   .promise().done(function(){
		    		if( $(this).hasClass('box-7') ) {
		    			$(this).find('.box-title').html('>');
		    		}
		    	});
    });

    $('.ultima h3').each(function(){
    	$(this).prepend('<div class="shadow-title">' +
    		'END OF PROJECT' +
    		'<span class="shadow-pico"></span>' +
    	'</div>');
    });

});
