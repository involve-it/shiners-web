var Helpers = {}
/**
 * This function is for constructing namespace objects from a string, attaching it to a global window object.
 * If some objects already exist, it will extend them. Dependant on the underscore.js library.
 * this can span multiple lines.
 *
 * @method makeNamespace
 * @param {Object} initialObject - main config object, containing:
 *    - path: names of objects in the chain, delimited by '.'
 *    - object: the object that will be placed into the namespace end.
 *      if object is not provided, just create the namespace, if it does not exist yet.
 *    OR initialObject can be a string, in which case consider it as a new namespace,
 *      and the second parameter is the original object (or non-defined).
 * @return {Object} final object assigned to the namespace.
 */
Helpers.makeNamespace = function (initialObject) {
    if (initialObject && typeof initialObject === 'string') {
        initialObject = {
            path: initialObject,
            object: arguments[1]
        }
    }
    ;
    var buildFromName, first, foreverFirst, global, l1, l2, namespace, retObj, sc, subPaths;
    //if (Meteor.isClient) {
    global = typeof window !== 'undefined' && window !== null ? window : {};
    //} else if (Meteor.isServer) {
    //    global = typeof GLOBAL !== 'undefined' && GLOBAL !== null ? GLOBAL : {};
    //}

    if (typeof global === 'string') {
        global = eval(global);
    }
    subPaths = initialObject.path.split('.').reverse();
    foreverFirst = subPaths[0];
    first = subPaths.pop();
    namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
    if (subPaths.length === 0) {
        if (typeof global[first] !== 'undefined' && global[first]) {
            _.extend(global[first], initialObject);
        } else {
            global[first] = initialObject.object;
        }
        return namespace;
    }
    retObj = null;
    l1 = l2 = subPaths.length;
    buildFromName = function (paths, ns) {
        var retns;
        if (paths.length <= 0) {
            return ns;
        }
        first = subPaths.pop();
        retns = typeof ns[first] !== 'undefined' && ns[first] || {};
        ns[first] = buildFromName(paths, retns);
        if (l1 === l2) {
            if (typeof initialObject.object !== 'undefined') {
                if (!_.isObject(initialObject.object)) {
                    ns[foreverFirst] = initialObject.object;
                } else {
                    ns[foreverFirst] = _.extend(ns[foreverFirst], initialObject.object);
                }
            }
            retObj = _.extend(ns[foreverFirst] != null ? ns[foreverFirst] : ns[foreverFirst] = {}, retObj != null ? retObj : retObj = {});
        }
        l1 = l1 - 1;
        return ns;
    };
    namespace = buildFromName(subPaths, namespace);
    return retObj;
};
Helpers.getUrlParams = function () {
    var queries = {};
    $.each(document.location.search.substr(1).split('&'), function (c, q) {
        var i = q.split('=');
        if (i[0] && i[1]) {
            queries[i[0].toString()] = i[1].toString();
        }
    });
    return queries;
}

Helpers.makeNamespace({
    path: '$h.help',
    object: Helpers
});

Helpers.getParamURL = function () {
    var queries = {};
    $.each(document.location.search.substr(1).split('&'), function (c, q) {
        var i = q.split('=');
        if (i[0] && i[1]) {
            queries[i[0].toString()] = i[1].toString();
        }
    });
    return queries;
}

module.exports = Helpers;