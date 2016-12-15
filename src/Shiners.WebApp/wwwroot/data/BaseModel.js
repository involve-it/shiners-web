import _ from 'underscore'
import validation from 'backbone-validation'
import Backbone from 'backbone'
import '../helpers/ConfigureBackboneValidation.js'
export default Backbone.Model.extend(validation.mixin);