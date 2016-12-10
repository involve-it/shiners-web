import _ from 'underscore'
import validation from 'backbone-validation'
var DeepModel = require('backbone-nested-model').extend(validation.mixin);
export default DeepModel;