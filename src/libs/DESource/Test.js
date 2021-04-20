/* eslint-disable no-underscore-dangle */
(function () {
  define('Test', ['./newVueInstance', '../../store'], (newVueInstance, store) => {
    const Test = {
      VERSION: '1.0',
    };
    let viewer;
    // var Cesium = newVueInstance.Cesium;
    debugger;
    const { Cesium, $axios } = newVueInstance.config.globalProperties;
    console.log('11111', newVueInstance, store.default._state.data.common, $axios);
    function flyTo(viewer, options) {
      const duration = typeof (options.duration) !== 'undefined' ? options.duration : 2;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(options.lng, options.lat, options.height),
        orientation: {
          heading: Cesium.Math.toRadians(options.heading),
          pitch: Cesium.Math.toRadians(options.pitch),
          roll: Cesium.Math.toRadians(options.roll),
        },
        duration,
      });
    }
    Test.flyTo = flyTo;

    return Test;
  });
}());
