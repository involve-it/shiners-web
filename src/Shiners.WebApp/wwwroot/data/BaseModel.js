import _ from 'underscore'
import Backbone from 'backbone'
import validation from 'backbone-validation'
_.extend(Backbone.Model.prototype, validation.mixin);
export default Backbone.Model;
