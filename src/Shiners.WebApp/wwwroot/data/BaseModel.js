import _ from 'underscore'
import validation from 'backbone-validation'
import Backbone from 'backbone'
import './backbone-deffered.js'
import '../helpers/ConfigureBackboneValidation.js'

export default Backbone.Model.extend(validation.mixin);