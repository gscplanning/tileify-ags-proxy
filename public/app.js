(function(){
  var base_layer = new L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
  	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: 'abcd',
  	minZoom: 0,
  	maxZoom: 20,
  	ext: 'png'
  });
  var map_options = {
    center: [38.209940, -84.559847],
    zoom: 13,
    layers: [base_layer],
    maxZoom: 20
  };
  var map = new L.Map($('.map')[0], map_options);

  var ags_layer;

  function updateLayer(event) {
    if (event) {
      event.preventDefault();
    }
    var url = window.location.origin + '/tiles/{z}/{x}/{y}';
    var params = (function() {
      var encoded_ags_url = window.encodeURIComponent($('#ags_url').val());
      var key_vals = ['url=' + encoded_ags_url];
      $('.params').each(function (index, object) {
        var $param = $(object);
        var key = $param.find('.param-key').val();
        var value = $param.find('.param-value').val();
        if (key.length && value.length) {
          key_vals.push(key + '=' + window.encodeURIComponent(value));
        }
      });
      return key_vals;
    }());
    var url_template = url + '?' + params.join('&');
    $('#proxy_url_template').val(url_template);
    if (ags_layer) {
      ags_layer.setUrl(url_template);
    } else {
      ags_layer = new L.TileLayer(url_template, {maxZoom: 21});
      map.addLayer(ags_layer);
    }
  }

  $('#update-layer').on('click', updateLayer);

  updateLayer();
}());
