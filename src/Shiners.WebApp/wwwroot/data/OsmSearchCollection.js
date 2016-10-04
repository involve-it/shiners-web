import Backbone from 'backbone';
import _ from 'underscore';

export default Backbone.Collection.extend({
    url:'http://nominatim.openstreetmap.org/search',
    parse(resp) {
        return resp;
    }
});