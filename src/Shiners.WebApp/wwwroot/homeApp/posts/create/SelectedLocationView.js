import Marionette from 'backbone.marionette';
import template from './SelectedLocationView.hbs.html'
export default Marionette.View.extend({
    template:template,
    modelEvents: {
        'change':'render'
    }
});

//locations=userId,
//              name,
//              accurateAddress="asfasf",
//              coords = {lat,lng,timestamp},
//              placeType=dynamic | static,
//              public=false,
//              _id,
//              obscuredCoords