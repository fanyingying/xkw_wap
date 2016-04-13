 /*
     index.js
     by fanyy 2016.4.11
     */
 $(document).ready(function() {
     var common = xkw.common;
     var ui = xkw.ui;
     var event = xkw.event;
     var bindEvent = {
         init: function() {
             event.searchbar();
             this.menu();
             ui.slider.banner();
             ui.slider.toutiao();
         }, 
         menu: function() {
             $('.ui-list li,.ui-tiled li').click(function() {
                 if ($(this).data('href')) {
                     location.href = $(this).data('href');
                 }
             });
             $('.ui-header .ui-btn').click(function() {
                 location.href = 'index.html';
             });
         }
     }


     bindEvent.init();
 });
