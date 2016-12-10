var helper = {
    getDistance: function(lat1, lon1, lat2, lon2,measure) {
        measure = measure || 'km';
        var radlat1 = lat1 * Math.PI/180;
        var radlon1 = lon1 * Math.PI/180;
        var radlat2 = lat2 * Math.PI/180;
        var radlon2 = lon2 * Math.PI/180;

        var dlat = radlat2 - radlat1;
        var dlon = radlon2 - radlon1;

        var a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.pow(Math.sin(dlon/2),2);
        var c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
        // great circle distance in miles
        return c * (measure==='km'? this.earthRadiusKm:this.earthRadius);
    },
    earthRadius : 3961,
    earthRadiusKm:6371 ,
    MAXRADIUS :10000
}
export default helper;